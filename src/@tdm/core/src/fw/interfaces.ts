import { Constructor } from './utils';

/**17
 * The transformation logic defining the input/output of the object.
 *
 * inclusive - include all except explicitly excluded properties.
 * exclusive - exclude all except explicitly included properties.
 *
 * In "inclusive" mode all properties are included, except members decorated with @Exclude
 * In "exclusive" mode everything is excluded except members decorated with @Prop
 */
export type TransformStrategy = 'inclusive' | 'exclusive';

/**
 * The transformation direction.
 * incoming: Plain object to class
 * outgoing: class to plain object
 */
export type TransformDir = 'incoming' | 'outgoing';

export type TransformFn = (value: any) => any;

export type PropAliasConfig = { [ P in TransformDir ]: string };

export type PropTransformConfig = { [ P in TransformDir ]: TransformFn };


/**
 * @public
 */
export interface NamingStrategyFn extends Function{
  (propertyName: string): string;
}

/**
 * @public
 */
export type NamingStrategyConfig =  { [P in TransformDir]: NamingStrategyFn }

export interface DecoratorInfo {
  type: 'class' | 'member' | 'param';
  name?: PropertyKey,
  isStatic?: boolean;
  hasDescriptor?: boolean;
}


/**
 * A list of supported decoration targets for a metadata class.
 *   - class: can decorate a class
 *   - member: can decorate an instance level property or a method
 *   - staticMember: can decorate an class level property or a method
 */
export type MetadataAllowOn = 'class' | 'member' | 'staticMember';

export interface MetaFactoryStatic {
  // TODO: require meta specific constructor: new (metaArgs: any, info) [NOTE: info is not required for class decorating metas]
  new (...args: any[]): any;

  /**
   * Create a new metadata instnace.
   * @param metaArgs
   * @param target
   * @param key
   * @param desc
   */
  metaFactory(metaArgs: any, target: Object | Function, key?: PropertyKey, desc?: PropertyDescriptor): MetaFactoryInstance<any>;

  /**
   * Register the metadata instance.
   * This operation save the instance in the targetStore.
   * @param meta
   */
  register(meta: MetaFactoryInstance<any>): void;

  /**
   * Optional implementation of extend logic, logic that handles one type extending another type.
   * If not set, the Metadata class is not extendable and will not inherit metadata from child types.
   * If the method returns undefined it will also not extend the Metadata class.
   *
   * 'to' can be undefined, if so it means that that Metadata class was never assigned to the type.
   * @param from
   * @param to
   * @param meta
   * @param meta.from the target source
   * @param meta.to the target target
   * @returns the new extended value.
   */
  extend?(from: Map<PropertyKey, any>, to: Map<PropertyKey, any> | undefined, meta?: { from: Constructor<any>, to: Constructor<any> }): Map<PropertyKey, any>;

  /**
   * A list of supported decoration targets for a metadata class.
   * If not set (or empty list) all of the targets are allowed.
   */
  allowOn?: MetadataAllowOn[];
}

export interface MetaFactoryInstance<T> {
  info: DecoratorInfo;
  target: Constructor<any>;
  metaClassKey: MetaFactoryStatic;
  metaPropKey: any;
  metaValue: T;
}
