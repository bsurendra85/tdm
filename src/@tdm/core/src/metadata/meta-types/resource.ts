import { DeserializerFactory } from '../../core';
import { TransformStrategy } from './schema/interfaces';
import { NamingStrategyConfig } from '../../core/interfaces';
import { MapperFactory } from '../../mapping';

export interface GlobalResourceMetadataArgs {
  /**
   * @link DefaultConfig#transformStrategy
   */
  transformStrategy?: TransformStrategy;

  /**
   * @link DefaultConfig#transformNameStrategy
   */
  transformNameStrategy?: NamingStrategyConfig | undefined;
}

export class GlobalResourceMetadata {
  /**
   * @link DefaultConfig#transformStrategy
   */
  transformStrategy: TransformStrategy | undefined;

  /**
   * @link DefaultConfig#transformNameStrategy
   */
  transformNameStrategy: NamingStrategyConfig | undefined;

  constructor(obj: GlobalResourceMetadata) {
    Object.assign(this, obj);
  }

  static DEFAULTS: GlobalResourceMetadataArgs = {} as any;

  static VALIDATE(obj: GlobalResourceMetadataArgs): void {
  }
}

export interface ResourceMetadataArgs {
  endpoint: string;

  deserializer?: DeserializerFactory;


  /**
   * A name for the resource.
   * Depending on your setup, this property might be used to identify resource from deserialized data. (e.g. JSONAPI)
   * If not set, the default name is the class name (which does not guarantee uniqueness)
   * @optional
   */
  name?: string;

  /**
   * If true will not build the decorated class into a resource.
   * @optional
   * @default false
   */
  noBuild?: boolean;

  mapper?: MapperFactory;
}

export interface ResourceMetadata {
  name: string;

  endpoint: string;

  deserializer?: DeserializerFactory;

  noBuild: boolean;

  mapper: MapperFactory;
}

