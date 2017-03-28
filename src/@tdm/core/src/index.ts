import '@tdm/transformation/add/mapping';

export {
  ActionMetadata,
  ActionMetadataArgs,
  ActionMethodType,
  AdapterMetadata,
  AdapterMetadataArgs,
  AfterHook,
  BeforeHook,
  BelongsTo,
  BelongsToMetadata,
  BelongsToMetadataArgs,
  decoratorFactories,
  Exclude,
  ExtendAction,
  ExtendActionMetadata,
  Hook,
  HookMetadata,
  HookMetadataArgs,
  Identity,
  Owns,
  OwnsMetadata,
  OwnsMetadataArgs,
  Prop,
  PostActionHandler,
  PostActionMetadata,
  Relationship,
  RelationshipType,
  Resource,
  ResourceMetadataArgs,
  ValidationContext,
  ValidationError,
  ValidationMetadataArgs,
  ValidationSchedule,
  Validator,
  store
} from './metadata';

import './transformation'; // extending @tdm/transformation
export * from './core';

export { validators } from './core-validators';

export {
  BaseActiveRecord,
  ActiveRecord,
  IdentityValueType,
  ExecuteContext,
  ExecuteResponse,
  Adapter,
  ActionOptions,
  plugins,
  PluginStore
} from './fw';

export {
  events$,
  ResourceEvent,
  ResourceEventType,
  ActionErrorResourceEvent,
  ActionEndResourceEvent,
  eventFactory
} from './events';

export { ActiveRecordCollection } from './active-record';

export {
  findProp,
  PlainSerializer,
  isSymbol,
  isPropertyKey,
  promiser,
} from './utils';

export { Constructor } from '@tdm/transformation';

export { DAO, AdapterDAO } from './dao';
