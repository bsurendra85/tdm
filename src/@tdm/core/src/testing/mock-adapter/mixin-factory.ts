/* tslint:disable:max-line-length */
import { Tixin, Type } from '@tdm/tixin';
import { BaseActiveRecord, store } from '@tdm/core';
import { MockAdapter } from './core';

import { BaseMockResource, BaseMockResourceStatic  } from './base-mock-resource';


/* GENERATED BY scripts/generic_codegen.js */
export function MockMixin<Model, TypeofModel>(): Type<Model & BaseActiveRecord<Model> & BaseMockResource> & BaseMockResourceStatic<Model> & typeof BaseMockResource & TypeofModel;
export function MockMixin<Model, TypeofModel>(model: TypeofModel & Type<Model>): Type<Model & BaseActiveRecord<Model> & BaseMockResource> & BaseMockResourceStatic<Model> & typeof BaseMockResource & TypeofModel;
export function MockMixin<Model, TypeofModel, T1, C1>(model: TypeofModel & Type<Model>, m1: C1 & Type<T1>): Type<Model & BaseActiveRecord<Model> & BaseMockResource & T1> & BaseMockResourceStatic<Model> & typeof BaseMockResource & TypeofModel & C1;
export function MockMixin<Model, TypeofModel, T1, C1, T2, C2>(model: TypeofModel & Type<Model>, m1: C1 & Type<T1>, m2: C2 & Type<T2>): Type<Model & BaseActiveRecord<Model> & BaseMockResource & T1 & T2> & BaseMockResourceStatic<Model> & typeof BaseMockResource & TypeofModel & C1 & C2;
export function MockMixin<Model, TypeofModel, T1, C1, T2, C2, T3, C3>(model: TypeofModel & Type<Model>, m1: C1 & Type<T1>, m2: C2 & Type<T2>, m3: C3 & Type<T3>): Type<Model & BaseActiveRecord<Model> & BaseMockResource & T1 & T2 & T3> & BaseMockResourceStatic<Model> & typeof BaseMockResource & TypeofModel & C1 & C2 & C3;
export function MockMixin<Model, TypeofModel, T1, C1, T2, C2, T3, C3, T4, C4>(model: TypeofModel & Type<Model>, m1: C1 & Type<T1>, m2: C2 & Type<T2>, m3: C3 & Type<T3>, m4: C4 & Type<T4>): Type<Model & BaseActiveRecord<Model> & BaseMockResource & T1 & T2 & T3 & T4> & BaseMockResourceStatic<Model> & typeof BaseMockResource & TypeofModel & C1 & C2 & C3 & C4;
export function MockMixin<Model, TypeofModel, T1, C1, T2, C2, T3, C3, T4, C4, T5, C5>(model: TypeofModel & Type<Model>, m1: C1 & Type<T1>, m2: C2 & Type<T2>, m3: C3 & Type<T3>, m4: C4 & Type<T4>, m5: C5 & Type<T5>): Type<Model & BaseActiveRecord<Model> & BaseMockResource & T1 & T2 & T3 & T4 & T5> & BaseMockResourceStatic<Model> & typeof BaseMockResource & TypeofModel & C1 & C2 & C3 & C4 & C5;
export function MockMixin<Model, TypeofModel, T1, C1, T2, C2, T3, C3, T4, C4, T5, C5, T6, C6>(model: TypeofModel & Type<Model>, m1: C1 & Type<T1>, m2: C2 & Type<T2>, m3: C3 & Type<T3>, m4: C4 & Type<T4>, m5: C5 & Type<T5>, m6: C6 & Type<T6>): Type<Model & BaseActiveRecord<Model> & BaseMockResource & T1 & T2 & T3 & T4 & T5 & T6> & BaseMockResourceStatic<Model> & typeof BaseMockResource & TypeofModel & C1 & C2 & C3 & C4 & C5 & C6;
export function MockMixin<Model, TypeofModel, T1, C1, T2, C2, T3, C3, T4, C4, T5, C5, T6, C6, T7, C7>(model: TypeofModel & Type<Model>, m1: C1 & Type<T1>, m2: C2 & Type<T2>, m3: C3 & Type<T3>, m4: C4 & Type<T4>, m5: C5 & Type<T5>, m6: C6 & Type<T6>, m7: C7 & Type<T7>): Type<Model & BaseActiveRecord<Model> & BaseMockResource & T1 & T2 & T3 & T4 & T5 & T6 & T7> & BaseMockResourceStatic<Model> & typeof BaseMockResource & TypeofModel & C1 & C2 & C3 & C4 & C5 & C6 & C7;


export function MockMixin<Model, TypeofModel, TMIXIN, CMIXIN>(model?: TypeofModel & Type<Model>, ...mixins: Array<CMIXIN & Type<TMIXIN>>): Type<Model & BaseActiveRecord<Model> & BaseMockResource & TMIXIN> & BaseMockResourceStatic<Model> & typeof BaseMockResource & CMIXIN & TypeofModel {
  model = model || <any>class {};

  /**
   * Marking the mixin BaseRestResource for model.
   * Since model is an extending class, it's type will be traversed and looked up for mixins
   * so the deriving class (base) will get all the actions from the BaseRestResource
   *
   */
  store.markMixins(model, MockAdapter, BaseMockResource, ...mixins);

  // we can't send ...mixin to Tixin since the type limits the ..mixins amount
  const result = (Tixin as any)(model, BaseMockResource, ...mixins);

  store.buildIfReady(result, MockAdapter);

  return result as any;
}
export type MockMixin<Model> = Model & BaseActiveRecord<Model> & BaseMockResource;

/* tslint:disable:max-line-length */
