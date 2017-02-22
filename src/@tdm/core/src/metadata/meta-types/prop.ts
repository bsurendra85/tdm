import {
  TransformFn,
  propAliasConfig,
  PropAliasConfig,
  propTransformConfig,
  PropTransformConfig,
  Validator
} from './schema';
import { MemberDecoratorMetadata, DecoratorInfo } from './core';

import { Relationship, RelationshipType, BelongsToMetadata } from './relations';
import { isFunction, reflection, Constructor } from '../../utils';

export interface PropMetadataArgs {
  alias?: string | Partial<PropAliasConfig>;
  transform?: TransformFn | Partial<PropTransformConfig>;

  validation?: Validator | Validator[];

  /**
   * A Getter function that returns the type of the property.
   * In most cases, the framework will identify the type using the metadata supplied by TypeScript.
   * However, in some scenarios it is not possible to detect the type, the most common are:
   *
   * A) Circular module dependency, i.e. where A import B and B import A. Especially common in related types.
   *    From 2 circular dependencies, the first one to load will not know the type of the 2nd.
   *
   * B) When using "this" type. TypeScript will emit the type "Object" when using this so it is not
   *    known and the user must supply it.
   *
   * C) When using "any" type. TypeScript will emit the type "Object" when using this so it is not
   *    known and the user must supply it.
   *
   * D): When the type T in an Array of T, TypeScript will emit the type Array without the array
   *     element type. https://github.com/Microsoft/TypeScript/issues/7169
   */
  typeGetter?: () => any;
}

export class PropMetadata extends MemberDecoratorMetadata {
  alias: PropAliasConfig;
  validation: Validator[];
  transform?: Partial<PropTransformConfig>;

  rel: RelationshipType;

  type: Function | Constructor<any>;
  typedArray: boolean | undefined;
  foreignKeyOf?: PropMetadata;

  constructor(obj: PropMetadataArgs, target: any, info: DecoratorInfo)  {
    super(info);

    // TODO: throw if name is not a string (can be symbol)
    this.alias = propAliasConfig(obj.alias, info.name as any);

    if (obj.transform) {
      this.transform = propTransformConfig(obj.transform);
    }

    this.validation = Array.isArray(obj.validation)
      ? obj.validation.slice()
      : obj.validation && isFunction(obj.validation.validate) ? [obj.validation] : []
    ;

    const type = reflection.designType(target.prototype, info.name as any);

    // user supplied type getter will work only if
    // A. Type is unknown
    // B. Type is the base type and not the TDModel type that extended the base type.
    //    The ResourceDecorator will replace the type with the TDModel in this case
    // C. Type is Object, when the type is "this" TS will return Object as type.
    // D. Type is Array, when the type is Array of TS will return Array as type.
    if (isFunction(obj.typeGetter)) {
      if (type === target || TYPE_GETTER_EXCEPTIONS.indexOf(type) > -1) {
        // WHY configurable: true -> see decorator-factories#resource
        Object.defineProperty(this, 'type', { configurable: true, get: obj.typeGetter });
        this.isTypeGetter = true;
        if (type === Array) {
          this.typedArray = true;
        }
      }
    }

    if (type && !this.hasOwnProperty('type')) {
      this.type = type;
    }

  }


  setRelationship(rel: Relationship): void {
    if (!this.isTypeGetter) {
      if (!this.type || this.type === Object || this.type === Array) {
        throw new Error(`Property ${this.decoratorInfo.name} with relation but without a type, please set a type.`);
      }
    }

    if (rel instanceof BelongsToMetadata) {
      this.rel = 'belongsTo';
    } else {
      this.rel = this.typedArray ? 'hasMany': 'hasOne';
    }
  }


  private isTypeGetter?: boolean;

  static DEFAULTS: PropMetadataArgs = {} as any;

  static VALIDATE(obj: PropMetadataArgs): void {
  }
}

const TYPE_GETTER_EXCEPTIONS = [
  Array,
  undefined,
  Object
];
