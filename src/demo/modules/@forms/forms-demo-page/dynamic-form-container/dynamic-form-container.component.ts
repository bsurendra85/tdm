import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Constructor } from '@tdm/transformation';

export interface DynamicFormContainerData<T> {
  instance: T;
  type?: Constructor<T>;
}

@Component({
  selector: 'dynamic-form-container',
  template: '<dynamic-form [model]="model"></dynamic-form>'
})
export class DynamicFormContainerComponent<T> {

  model: T | [T, Constructor<T>];

  constructor(public dialogRef: MdDialogRef<any>, @Inject(MD_DIALOG_DATA) public data: DynamicFormContainerData<any>) {
    this.model = data.type
      ? [data.instance, data.type]
      : data.instance
    ;
  }
}
