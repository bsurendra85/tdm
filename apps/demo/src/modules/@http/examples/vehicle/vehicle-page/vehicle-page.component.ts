import { Observable } from 'rxjs';
import { filter, map, combineLatest, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TDMCollection } from '@tdm/data';

import { UiBlockService, UiBlock } from '@shared';
import { Model, Make } from '../models';

@Component({
  selector: 'vehicle-page',
  styleUrls: [ './vehicle-page.component.css' ],
  templateUrl: './vehicle-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehiclePageComponent {
  makes: TDMCollection<Make>;

  models: any;
  filtered$: Observable<Make[]>;

  makerCtrl = new FormControl();

  constructor(public uiBlock: UiBlockService) {
    this.makes = Make.query();
    this.uiBlock.closeWithPromise(this.makes.$rc.next()).open(UiBlock);

    const filterCtrl$ = this.makerCtrl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        filter( value => value && value.length > 1)
      );

    this.filtered$ = this.makes.$rc.self$
      .pipe(
        combineLatest(filterCtrl$, (v1, v2) => ([v1, v2])),
        map(combined => this.filterMakes(combined[0], combined[1]))
      );
  }

  filterMakes(list: Make[], filter: string): Make[] {
    try {
      const regEx = new RegExp(`^${filter}`, 'gi');
      return list.filter(make => regEx.test(make.makeName));
    } catch (err) {
      return [];
    }
  }

  displayFn(make: any): string {
    return (make && make.makeName) || make;
  }

  getModels(): void {
    const maker: Make = this.makerCtrl.value;

    if (maker && maker.hasOwnProperty('makeId')) {
      this.models = Model.query(maker.makeId);
      this.uiBlock.closeWithPromise(this.models.$rc.next()).open(UiBlock);
    }
  }

  static tutorial = {
    id: 'vehicle',
    name: 'Vehicle'
  };
}
