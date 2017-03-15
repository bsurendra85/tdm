import { Constructor, decoratorFactory, registerEvent, TargetStoreEvents } from './fw';
import { targetStore, ExcludeMetadata, ExcludeMetadataArgs, PropMetadata, PropMetadataArgs, RelationMetadata, RelationMetadataArgs } from './metadata';

function onCreateMetadata(target: Constructor<any>) {
  const meta = targetStore.getTargetMeta(target);

  meta.getValues(RelationMetadata)
    .forEach( relation => {
      // Its possible to set @Relation() without @Prop(), so make sure to create one if not set by the user.
      const prop = meta.getCreateProp(relation.decoratorInfo);
      prop.setRelationship(relation);

      // if the fk is a different key, attach a reference to the foreign key PropMetadata (and create one if not there)
      if (relation.name !== relation.foreignKey) {
        meta.getCreateProp(relation.foreignKey).foreignKeyOf = prop;
      }
    });
}
registerEvent(TargetStoreEvents.onCreateMetadata, onCreateMetadata);

/**
 * @propertyDecorator instance
 * @param def
 */
export const Prop = decoratorFactory<PropMetadataArgs>(PropMetadata, true);

/**
 * @propertyDecorator instance
 * @param def
 */
export const Exclude: (metaArgs?: ExcludeMetadataArgs) => (target: Object | Function, key?: PropertyKey, desc?: PropertyDescriptor) => any
  = <any>decoratorFactory<any>(ExcludeMetadata);

/**
 * @propertyDecorator instance
 * @param def
 */
export const Relation = decoratorFactory<RelationMetadataArgs>(RelationMetadata, true);

/**
 * @propertyDecorator instance
 */
export function Identity(): Function {
  return (target: Object, key: PropertyKey) => {
    targetStore.setClassProp(target.constructor as any, 'identity', key);
  }
}
