import { tdm } from '@tdm/core';

import { ActionMetadata, ActionMetadataArgs } from '@tdm/data';
import { HttpAdapter } from '../core';
import { Params } from '../utils/match-pattern';
import { BaseHttpConfig, TrailingSlashesStrategy } from '../core/interfaces';
import { mapMethod, MappedMethod, HttpActionMethodType } from './method-mapper';

export interface HttpActionMetadataArgs extends ActionMetadataArgs<HttpActionMethodType>, BaseHttpConfig {
  /**
   * action specific url override. The url templating is supported just like for the resource-level urls.
   * @optional
   * @default undefined
   */
  endpoint?: string;
}

export class HttpActionMetadata extends ActionMetadata {
  methodInfo: MappedMethod;

  endpoint?: string;
  urlParams?: Params;
  headers?: { [key: string]: any };
  withCredentials?: boolean;
  trailingSlashes?: TrailingSlashesStrategy;


  constructor(obj: HttpActionMetadataArgs, info: tdm.DecoratorInfo) {
    super(obj, info);

    if (!obj.hasOwnProperty('method')) {
      throw new Error('Resource Action method is mandatory.');
    }

    this.methodInfo = mapMethod(obj.method);
    this.method = this.methodInfo.method;
  }

  static metaFactory = tdm.metaFactoryFactory<HttpActionMetadataArgs, HttpActionMetadata>(HttpActionMetadata);

  static adapterClass = HttpAdapter;
}
