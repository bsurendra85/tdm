import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import {
  Component,
  Input,
  EventEmitter,
  Output,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  Type,
  TemplateRef,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  KeyValueDiffer,
  KeyValueDiffers,
  KeyValueChangeRecord, ElementRef, ViewChild, Renderer2, AfterViewInit, DoCheck, OnChanges, SimpleChanges, SimpleChange
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { Omit } from '@tdm/core/tdm';
import { TDMModelForm, TDMModelFormService, RenderInstruction } from '../tdm-model-form/index';
import { DynamicFormOverrideDirective, DynamicFormOverrideContext } from './dynamic-form-override.directive';
import { BeforeRenderEventHandler } from './before-render-event-handler';
import {
  ArrayActionRequestEvent,
  ArrayActionAddRequestEvent,
  ArrayActionMoveRequestEvent,
  ArrayActionRemoveRequestEvent
} from './array-action-request';

export interface LocalRenderInstruction extends RenderInstruction {
  /**
   * User to show/hide controls
   * @internal
   */
  display: 'none' | undefined;
}

/**
 * Represents a single change in a form.
 * This type is an alias of KeyValueChangeRecord<string, any>
 */
export interface TdmFormChange extends KeyValueChangeRecord<string, any> {
  /**
   * When true indicates that the `key` property contains a path and not a name, i.e it's a dot delimited path to a
   * property through nested object (or objects)
   */
  deep?: boolean;
}

/**
 * Represents a collection of changes in a form
 * This type is an alias of Array<KeyValueChangeRecord<string, any>> (TdmFormChange[])
 */
export type TdmFormChanges = TdmFormChange[];

/**
 * Allow rendering a form using @tdm/ngx-dynamic-forms and DynamicFormElementComponent
 */
@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent<T = any> implements AfterContentInit, AfterViewInit, OnChanges, DoCheck, OnDestroy {
  /**
   * The [[TDMModelForm]] instance that is used by the component
   * > This is created after a model is set.
   */
  tdmForm: TDMModelForm<any>;

  /**
   * The [[FormGroup]] instance used by [[TDMModelForm]].
   * Available after [[TDMModelForm]] instance is created.
   */
  get form(): FormGroup | undefined {
    return this.tdmForm && this.tdmForm.form;
  }

  @ContentChildren(DynamicFormOverrideDirective) overrides: QueryList<DynamicFormOverrideDirective>;

  @ViewChild('formElRef') formElRef: ElementRef;

  /**
   * Real time binding between the form and the model.
   *
   * When true, every value change event emitted from the from will trigger and update to the model.
   *
   * When false (default) the form data model and the model instance are not bound, to update the model
   * you need to invoke the TDMModelForm.commitToModel
   *
   * > A hot bind is one way, from form update to the model.
   *
   * @default false
   */
  @Input() hotBind: boolean;

  /**
   * A expression to apply on the form control container class.
   *
   * Use as if this was an `ngClass` directive.
   *
   * > The class will apply on the container that wraps the rendered control and not on the control itself.
   */
  @Input() controlClass: string|string[]|Set<string>|{[klass: string]: any};

  /**
   * Pass through for @angular/forms `ngNativeValidate` attribute that enables native browser validation
   *
   */
  @Input() get ngNativeValidate(): any { return this._ngNativeValidate; };
  set ngNativeValidate(value: any) { // tslint:disable-line
    const native = value != null && `${value}` !== 'false';
    if (this._ngNativeValidate !== native) {
      this._ngNativeValidate = native;
      this.setNativeValidation();
    }
  };

  /**
   * The instance and type (class) to dynamically render as form.
   * You can supply the instance only, in that case the type is the constructor property (instance.constructor)
   * To supply both instance and type use a tuple.
   *
   * @example
   * `<dynamic-form [model]="user"></dynamic-form>`
   * `<dynamic-form [model]="[user, User]"></dynamic-form>`
   *
   * @param value {*|[*, *]}
   */
  @Input() set model(value: T | [T, Type<T>]) {
    if (this.slaveMode) {
      throw new Error('Setting a model is not allowed when in slave mode.');
    }
    this.slaveMode = false;

    const [instance, type] = Array.isArray(value) ? value : [value, <any> value.constructor];
    this.instance = instance;
    this.type = type;

    this.valueDiffer = undefined;

    if (!this.tdmForm) {
      this.tdmForm = this.tdmModelFormService.create(this.instance, this.type);
      const formValue = this.tdmForm.form.getRawValue();
      this.valueDiffer = this.kvDiffers.find(formValue).create();
      this.valueDiffer.diff(formValue); // for some reason objects do not commit the 1st time
      this.applyFormListener();
    } else {
      this.tdmForm.setContext(this.instance, this.type);
    }
    this.update();
  }

  /**
   * Setting the dynamic form as a slave of another dynamic form.
   * You can this feature to split forms of complex models.
   *
   * A form in slave mode has very limited functionality, it can only exclude controls and override controls.
   * All other options (hidden state, disabled state, hot binding etc..) are not supported in the slave and should be
   * handled in the master.
   *
   * Make sure you are not rendering the same controls more then once. A group of master and all of it's slave should
   * render only one instance of a control across the whole group. If you render the same control multiple times
   * you will get unexpected behaviour and unsynced controls.
   *
   * You can set any number of slaves.
   * You can not change or remove the master.
   * You can not set a model when using slave mode.
   *
   * A slave does not handle form state, it only handles internal rendering and this is why only exclude and override
   * are supported, hidden and disabled are drived by the form state...
   * @param dynForm
   */
  @Input() set slaveOf(dynForm: DynamicFormComponent<T>) {
    if (this.slaveMode === true) {
      return; // TODO: warn? error? slave mode can only be set once.
    } else if (this.slaveMode === false) {
      throw new Error('Slave mode does not work when setting a model');
    }
    this.tdmForm = dynForm.tdmForm;
    this.instance = dynForm.instance;
    this.type = dynForm.type;
    this.overrideMap = dynForm.overrideMap;
    this.slaveMode = true;
  }

  @Input() set exclude(value: string[]) {
    this.filters.exc = value;
    this.update();
  }

  /**
   * An array of form control names, each name in this array will be disabled.
   */
  @Input() disabledState: Array<keyof T>;

  /**
   * An array of form control names, each name in this array will be hidden.
   */
  @Input() hiddenState: Array<keyof T>;

  /**
   * Event emitted when a form value changes.
   *
   * When a change occurs in a child property of a flattened property (nested objects) the `key` property in the change
   * represents a path (not the name) to the value from the root object.
   *
   * > Note that each event is emitted synchronously and all listeners will run in sequence. While listeners run new
   * change events are blocked which means you can change form values without the event firing again. If you do want
   * a re-fire change the value async.
   */
  @Output() valueChanges = new EventEmitter<TdmFormChanges>();

  /**
   * Event emitted before rendering a form control.
   *
   *   - Excluded controls are not emitted.
   *   - Overridden controls are not emitted {@link DynamicFormOverrideDirective}
   *
   * Use this event to modify form control/s rendering instructions (metadata) before they are rendered.
   * For example, given a `select` form control, you can use this event to create dynamic, ad-hoc, select options.
   *
   * ```html
   *  <dynamic-form [model]="model" (beforeRender)="beforeRender($event)">
   * ```
   *
   * ```ts
   * @Component({ ... })
   * export class MyComponent {
   *   beforeRender(event: BeforeRenderEventHandler) {
   *     event.selections = [ { value: 'X', label: 'Y' } ] // more...
   *   }
   * }
   * ```
   * You can modify all the of properties in {@link RenderInstruction}... the render type, order and more.
   *
   * ### Asynchronous rendering logic
   * There are scenarios where the modification logic is asynchronous, for example, populating the
   * selections (options) of a form control from a remote server
   *
   * ```ts
   * @Component({ ... })
   * export class MyComponent {
   *   beforeRender(event: BeforeRenderEventHandler) {
   *     let resolve, p = new Promise( (res, rej) => { resolve = res; });
   *
   *     event.async(p); // notify to use async logic
   *
   *     // do some async stuff...
   *     setTimeout(() => {
   *       event.selections = [ { value: 'X', label: 'Y' } ] // more...
   *       resolve();
   *     }, 1000);
   *   }
   * }
   * ```
   *
   * > You can use the `renderState` event to reflect asynchronous rendering in the UI.
   *
   * NOTE:  Instructions are immutable and does not persist between rendering.
   *        Each `beforeRender` event requires re-applying the logic.
   *
   */
  @Output() beforeRender = new EventEmitter<BeforeRenderEventHandler>();

  /**
   * Event emitted when the rendering state changes.
   * True states that the form is rendering, False states and idle, the form is rendered.
   *
   * Since rendering in angular is synchronous a True rendering state can only occur when implementing
   * async logic within `beforeRender` event {@link BeforeRenderEventHandler}
   *
   * Use this event to reflect (UX/UI) in that the form is not ready.
   */
  @Output() renderState: Observable<boolean>;

  /**
   * Event emitted when an internal request to add/remove/move an item from a [[FormArray]] is submitted.
   * Array actions request are not managed by the library, this API exists to allow flexibility when handling
   * form arrays.
   *
   * Components that implement [[DynamicFormControlRenderer]] and are set to be used by <dynamic-form> are responsible
   * for array action request submission.
   * This is because they implement the way a form array looks, they might implement multiple list styles some editable
   * and some not. They encapsulate buttons and so have access to click events.
   * These components must implement [[DynamicFormControlRenderer]] and so they have access to the API.
   *
   * An implementation might choose to emit events so handlers on the outside can handle the logic for add/remove/move
   * or it can be a local implementation without exposing events, this is up to the developer.
   *
   * This event should be treated as external and handled by the developer.
   *
   * > Developers should use the `emitArrayActionRequest` method in this class to invoke events, the method requires a
   * partial event object as input and will complete the missing information.
   */
  @Output() arrayActionRequest: Observable<ArrayActionRequestEvent>;

  /**
   * The instructions to render
   * @internal
   */
  controls = new BehaviorSubject<LocalRenderInstruction[]>([]);

  private instance: T;
  private type: Type<T>;
  private subscriptions: Subscription[] = [];
  private freezeValueChanges: boolean;
  private valueDiffer: KeyValueDiffer<string, any>;
  private stateDiffer: { disabled?: IterableDiffer<keyof T>; hidden?: IterableDiffer<keyof T>; } = {};
  private filters = { exc: [] as string[], ow: [] as string[] };
  private afterInit: boolean;
  private rendering$ = new BehaviorSubject<boolean>(false);
  private _ngNativeValidate: any = false;
  private slaveMode: boolean;
  private overrideMap = new Map<RenderInstruction, DynamicFormOverrideDirective>();
  private _arrayActionRequest = new EventEmitter<ArrayActionRequestEvent>();

  /**
   * Indicates the number of update() calls that are running/queued
   * A number n that is > 1 does not mean the update will run n times, it will run one more time only.
   */
  private pendingUpdates: number = 0;
  /**
   * Overrides that are injected by code (addOverride) and not by content projection
   */
  private codeOverrides: DynamicFormOverrideDirective[] = [];

  constructor(private tdmModelFormService: TDMModelFormService,
              private kvDiffers: KeyValueDiffers,
              private itDiffers: IterableDiffers,
              private renderer: Renderer2) {
    this.renderState = this.rendering$.asObservable();
    this.arrayActionRequest = this._arrayActionRequest.asObservable();
  }

  getOverride(item: RenderInstruction): DynamicFormOverrideDirective | undefined {
    return this.overrideMap.get(item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabledState) {
      this.onStateChange('disabled', changes.disabledState);
    }

    if (changes.hiddenState) {
      this.onStateChange('hidden', changes.hiddenState);
    }
  }

  ngDoCheck() {
    if (this.disabledState && this.stateDiffer.disabled) {
      const diff = this.stateDiffer.disabled.diff(this.disabledState);
      if (diff) {
        this.handleDiff('disabled', diff);
      }
    }

    if (this.hiddenState && this.stateDiffer.hidden) {
      const diff = this.stateDiffer.hidden.diff(this.hiddenState);
      if (diff) {
        this.handleDiff('hidden', diff);
      }
    }
  }

  ngAfterContentInit(): void {
    this.afterInit = true;
    this.updateOverrides();

    const s = this.overrides.changes.subscribe(() => this.updateOverrides());
    this.subscriptions.push(s);
  }

  ngAfterViewInit(): void {
    if (this._ngNativeValidate === true) {
      this.setNativeValidation();
    }
  }

  ngOnDestroy(): void {
    let subs: Subscription;
    while (subs = this.subscriptions.pop()) { // tslint:disable-line
      subs.unsubscribe();
    }
    this.beforeRender.complete();
    this.valueChanges.complete();
  }

  /**
   * Returns the form control for a given key
   * @param key
   * @returns
   */
  getControl(key: keyof T): AbstractControl | null {
    return this.tdmForm.get(key);
  }

  /**
   * API to manually add field override templates, use this if you want to apply overrides but can not
   * set the content projection in the tempalte.
   */
  addOverride(name: string, tRef: TemplateRef<DynamicFormOverrideContext>, update: boolean = true): void {
    const d = new DynamicFormOverrideDirective(tRef, this);
    d.dynamicFormOverride = name;
    this.codeOverrides.push(d);
    if (update) {
      this.update();
    }
  }

  emitArrayActionRequest(renderInstruction: RenderInstruction,
                         request: Omit<ArrayActionAddRequestEvent, 'tdmForm' | 'staticPath' | 'runtimePath'>): void;
  emitArrayActionRequest(renderInstruction: RenderInstruction,
                         request: Omit<ArrayActionRemoveRequestEvent, 'tdmForm' | 'staticPath' | 'runtimePath'>): void;
  emitArrayActionRequest(renderInstruction: RenderInstruction,
                         request: Omit<ArrayActionMoveRequestEvent, 'tdmForm' | 'staticPath' | 'runtimePath'>): void;
  emitArrayActionRequest(renderInstruction: RenderInstruction, request: Partial<ArrayActionRequestEvent>): void {
    // TODO: validate input.
    request.tdmForm = this.tdmForm;
    request.staticPath = renderInstruction.getStaticPath();
    request.runtimePath = renderInstruction.getRuntimePath(request.formArray);
    this._arrayActionRequest.emit(<any> request);
  }

  private updateOverrides(): void {
    this.filters.ow = this.overrides
      .map(ow => ow.dynamicFormOverride).concat(this.codeOverrides.map( ow => ow.dynamicFormOverride));
    this.update();
  }

  private update(): void {
    if (!this.tdmForm || !this.afterInit) {
      return;
    }

    if (this.pendingUpdates > 0) {
      this.pendingUpdates += 1;
      return;
    }

    // we wmit the rendering state async
    const controlsReady: Array<Promise<any>> = [new Promise((resolve) => setTimeout(() => {
      this.emitRenderingState(true);
      resolve();
    }))];
    const controls: LocalRenderInstruction[] = [];
    const controlsPromiseSetter = done => controlsReady.push(done);
    this.overrideMap.clear();

    const overrides = this.overrides.toArray().concat(this.codeOverrides);
    const processInstructions = (rd: RenderInstruction) => {
      if (!this.filters.exc || this.filters.exc.indexOf(rd.name) === -1) {
        const localRd: LocalRenderInstruction = Object.create(rd);
        const override = overrides.find(ow => ow.dynamicFormOverride === localRd.name);
        if (override) {
          this.overrideMap.set(localRd, override);
        }
        const renderEvent = new BeforeRenderEventHandler(localRd, controlsPromiseSetter);
        this.beforeRender.emit(renderEvent);

        // update hidden state of each item
        const name = localRd.flattened ? localRd.flattened.join('.') + `.${localRd.name}` : localRd.name;
        if (this.hiddenState && this.hiddenState.indexOf(<any> name) > -1) {
          localRd.display = 'none';
        }

        controls.push(localRd);
      }
    };

    this.tdmForm.renderData.forEach(processInstructions);

    this.pendingUpdates += 1;
    Promise.all(controlsReady)
      // tslint:disable-next-line
      .catch( err => {}) // we swallow errors, these should be handled by the user
      .then( () => {
        this.pendingUpdates -= 1;

        if (this.pendingUpdates > 0) {
          this.pendingUpdates = 0;
          this.update();
          return;
        } else {
          this.controls.next(controls.sort((a, b) => a.ordinal - b.ordinal));
          this.emitRenderingState(false);
        }
      });
  }

  private emitRenderingState(state: boolean): void {
    if (this.rendering$.getValue() === !state) {
      this.rendering$.next(state);
    }
  }

  private applyFormListener(): void {
    let freeze: boolean;
    const s = this.tdmForm.form.valueChanges.subscribe(formValue => {
      const diff = this.valueDiffer.diff(formValue);
      // we diff before freeze check so we won't pile changes to next step.
      if (freeze || this.freezeValueChanges) {
        return;
      }
      if (diff) {
        const arr: TdmFormChanges = [];
        diff.forEachChangedItem(change => {
          if (this.hotBind === true) {
            this.instance[change.key] = change.currentValue;
          }
          if (this.isFlattenedProp(change.key)) {
            arr.push(...this.drillDownChange(change, [change.key]));
          } else {
            arr.push(change);
          }
        });
        if (arr.length > 0) {
          freeze = true;
          this.valueChanges.next(arr);
          freeze = false;
        }
      }
    });
    this.subscriptions.push(s);
  }

  private isFlattenedProp(key: string, level: number = 0): boolean {
    return this.tdmForm.renderData.some( r => !!r.flattened && r.flattened[level] === key );
  }

  /**
   * Drills down a change in an object of a `flattened` property and returns the changes in the object.
   * The drill down is recursive so nested flattened properties will reflect the changes as well.
   *
   * The `key` of each change will be in the dot notation format.
   *
   * ## Why?
   * The form `valueChanges` stream will emit changes to controls on the first level, if a nested control
   * (i.e FormGroup or FormArray) has child that changed the stream will not reflect that and will only emit an event
   * for the top-level control itself.
   *
   * This resolution is an issue when using flattened rendering.
   * While UI shows a flat form the underlying structure is left intact and each flattened property gets a `FormGroup`
   * attached to it, emitting [[DynamicFormComponent.valueChanges]] events for flattened properties will have low
   * resolution because the change event will include the top-level key only and the current/previous values will be
   * the top-level objects themselves and not the actual child value that changed.
   *
   * To enhance the resolution this method will drill down the value of a change to find the internal changes in the
   * object and return them, this is done by diffing the previous value with the current value.
   * Each drill down is recursive so a flattened object with a nested flattened object will also get proper resolution.
   *
   * You must call this function with a change for a property that is known to be defined as flattened and include
   * it in the `path` parameter as the first (and only) item.
   *
   * > Make sure not to confuse flattened nested objects with nested objects that are not defined as flattened by the
   * user, those will not apply here.
   * @param change
   * @param path
   */
  private drillDownChange(change: KeyValueChangeRecord<string, any>,
                          path: Array<string |  number>): Array<KeyValueChangeRecord<string, any>> {
    const result: Array<KeyValueChangeRecord<string, any>> = [];
    if (change.previousValue) {
      const differ = this.kvDiffers.find(change.previousValue).create();
      differ.diff(change.previousValue);
      const diff = differ.diff(change.currentValue);
      if (diff) {
        diff.forEachChangedItem((c: any) => {
          if (this.isFlattenedProp(c.key, path.length)) {
            result.push(...this.drillDownChange( <any> c, path.concat([c.key]) ));
          } else {
            c = Object.create(c, { deep: { value: true }, key: { value: path.join('.') + `.${c.key}` } });
            result.push(c);
          }
        });
      }
    } else if (change.currentValue) {
      change = Object.create(change, { deep: { value: true }, key: { value: path.join('.') + `.${change.key}` } });
      result.push(change);
    }
    return result;
  }

  private setNativeValidation(): void {
    if (this.formElRef) {
      if (this._ngNativeValidate === true) {
        this.renderer.removeAttribute(this.formElRef.nativeElement, 'novalidate');
      } else {
        this.renderer.setAttribute(this.formElRef.nativeElement, 'novalidate', '');
      }
    }
  }

  private onStateChange(type: 'disabled' | 'hidden', state: SimpleChange): void {
    let differ: IterableDiffer<keyof T> = this.stateDiffer[type];
    if (!state.currentValue && differ) {
      const diff = differ.diff([]);
      if (diff) {
        this.handleDiff(type, diff);
      }
      differ = undefined;
    } else if (!state.previousValue && state.currentValue) {
      differ = this.itDiffers.find(state.currentValue).create();
    }
    this.stateDiffer[type] = differ;
  }

  private handleDiff(type: 'disabled' | 'hidden', diff: IterableChanges<keyof T>): void {
    switch (type) { // tslint:disable-line
      case 'disabled':
        this.freezeValueChanges = true;
        diff.forEachAddedItem( record => this.getControl(record.item).disable());
        diff.forEachRemovedItem( record => this.getControl(record.item).enable());
        this.freezeValueChanges = false;
        break;
      case 'hidden':
        diff.forEachAddedItem( record => {
          const item = this.findControlByKey(record.item);
          if (item) {
            item.display = 'none';
          }
        });
        diff.forEachRemovedItem( record => {
          const item = this.findControlByKey(record.item);
          if (item) {
            item.display = undefined;
          }
        });
        break;
    }
  }

  private findControlByKey(dotProperty: string) {
    const path = dotProperty.split('.');
    const name = path.pop();
    return this.controls.value.find( c => {
      if (c.name === name) {
        if (!c.flattened && path.length === 0) {
          return true;
        } else {
          return c.flattened.join('.') + `.${name}` === dotProperty;
        }
      }
      return false;
    });
  }
}
