import { TargetFactoryParams } from './interfaces';
import { ActiveRecordCollection } from '../active-record/active-record-collection';
import { TargetTransformer } from './target-transformer';
import { TargetValidator } from './target-validator';
import { defaultConfig  } from '../default-config';
import { LazyInit } from '../utils/decorators';
import { findProp } from "../utils";
import { TransformStrategy, ValidationError } from '../metadata/meta-types/schema/interfaces';
import { TargetAdapterMetadataStore } from '../metadata/reflection/target-adapter-metadata-store';
import { BaseActiveRecord } from '../active-record/active-record-interfaces';
import { MapperFactory } from '../mapping';

export class TargetController<T /* extends ActiveRecord<any, any> */> {

  @LazyInit(function (this: TargetController<any>): TargetTransformer {
    const resource = this.adapterStore.globalResource;
    const transformNameStrategy = findProp('transformNameStrategy', defaultConfig, resource);

    return new TargetTransformer(this.adapterStore.target, transformNameStrategy, this.strategy);
  })
  private transformer: TargetTransformer;

  @LazyInit(function (this: TargetController<any>): TransformStrategy {
    return findProp('transformStrategy', defaultConfig, this.adapterStore.globalResource);
  })
  private strategy: TransformStrategy;

  @LazyInit(function (this: TargetController<any>): TargetValidator {
    return new TargetValidator(this.adapterStore.target);
  })
  private validator: TargetValidator;

  private mapper: MapperFactory;

  constructor(private adapterStore: TargetAdapterMetadataStore) {
    this.mapper = findProp('mapper', defaultConfig, this.adapterStore.resource);
  }

  createCollection(): ActiveRecordCollection<T> {
    return new ActiveRecordCollection<T>();
  }

  create(params: TargetFactoryParams = {} as any): T {
    const instance = params.ctorArgs
        ? new this.adapterStore.target(...params.ctorArgs)
        : new this.adapterStore.target()
      ;

    if (params.hasOwnProperty('identity')) {
      instance[this.adapterStore.identity] = params.identity;
    }

    if (params.data) {
      this.deserialize(instance, params.data, false);
    }

    return instance;
  }

  serialize(instance: BaseActiveRecord<any> | ActiveRecordCollection<any>): any {
    const mapper = instance instanceof ActiveRecordCollection
      ? this.mapper.serializer(instance.collection)
      : this.mapper.serializer(instance)
    ;

    return this.transformer.serialize(mapper);
  }

  deserialize(source: any, target: BaseActiveRecord<any> | ActiveRecordCollection<any>, isCollection: boolean): void {
    const mapper = this.mapper.deserializer(source);
    if (mapper.isCollection !== !!isCollection) {
      throw new Error(`Expected ${isCollection ? 'Collection' : 'Object'} but got ${isCollection ? 'Object' : 'Collection'}`);
    }

    if (mapper.isCollection) {
      while(mapper.next()) {
        const t = this.create();
        this.transformer.deserialize(mapper, t);
        (target as ActiveRecordCollection<any>).collection.push(t);
      }
    } else {
      this.transformer.deserialize(mapper, target);
    }
  }

  validate(instance: any): Promise<ValidationError[]> {
    return this.validator.validate(instance);
  }
}
