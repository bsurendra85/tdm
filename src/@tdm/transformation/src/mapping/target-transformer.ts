import { LazyInit, TransformDir, NamingStrategyConfig, isFunction, array } from '../fw';
import { PropMetadata, ExcludeMetadata, TargetMetadata } from '../metadata';


import {
  SerializeMapper,
  DeserializeMapper,
  CompiledTransformation,
  PoClassPropertyMap,
  PropertyContainer,
  ExclusivePropertyContainer,
  InclusivePropertyContainer,
  transformValueIn
} from './index';


/**
 * Returns an array of 2 property names, first is the name of the transformed output
 * second is the name of the property name to transform.
 * Used for applying NamingStrategyConfig based on the TransformDir
 * @param dir
 * @param transformNameStrategy
 * @returns {[string,string]|[string,string]}
 */
export function namingStrategyMap(dir: TransformDir, transformNameStrategy: NamingStrategyConfig): boolean {
  return transformNameStrategy && isFunction(transformNameStrategy[dir]);
}

/**
 * @internal
 */
export function getInstructions(meta: TargetMetadata, dir: TransformDir): CompiledTransformation {
  // all excluded instructions for this type
  // this array will be filtered to hold only @Exclude without @Prop
  const excluded = meta.getValues(ExcludeMetadata)
    .filter(e => !e.from || e.from === dir);

  // in exclusive mode there is no point in have 2 transformation strategies.
  // incoming is never there since incoming keys are not calculated, only defined Props.
  if (meta.transformStrategy === 'exclusive') {
    dir = 'outgoing';
  }

  // only apply naming strategy on outgoing, incoming has no effect here
  const naming = namingStrategyMap(dir, meta.transformNameStrategy);



  const fkMap = new Map<PropMetadata, PoClassPropertyMap[]>();

  // TODO: move to for loop
  const instructions = meta.getValues(PropMetadata)
    .map(prop => {
      const obj = {
        cls: prop.name,
        obj: prop.alias[dir],
        exclude: array.findRemove(excluded, e => e.name === prop.name),
        prop
      };

      // apply naming strategy when DONT HAVE ALIAS!
      if (!obj.exclude && naming && obj.cls === obj.obj) {
        obj.obj = meta.transformNameStrategy[dir](obj.cls);
      }

      // store the PoClassPropertyMap of a belongsTo PropMetadata relation
      // and the PoClassPropertyMap of all foreign key PropMetadata.
      // These arr actually matching pairs of a belongTo relation and it's fk (not all belongsTo has fk, only different property name is a fk)
      // At the end, go through the stored PropMetadata's and see if matching pairs found (2 values in array)
      // for all of them, swap the prop names so:
      // belongsTo PoClassPropertyMap will output (deserialize) to the original fk property name
      // foreignKey PoClassPropertyMap wil input (serialize) to the belongsTo property name
      // this swap make the deserialize/serialize process transparent to fk mismatch defined on the model.
      // De/Serialize implementations are only responsible to return the right object (e.g. detect when a key is incoming, return obj instead)
      if (prop.relation) {
        const arr = fkMap.get(prop) || [];
        arr[0] = obj;
        fkMap.set(prop, arr);
      } else if (prop.foreignKeyOf) {
        const arr = fkMap.get(prop.foreignKeyOf) || [];
        arr[1] = obj;
        fkMap.set(prop.foreignKeyOf, arr);
      }

      return obj;
    });

  Array.from(fkMap.entries()).forEach(([k, v]) => {
    if (v.length === 2) {
      // this is a swap
      v[0].obj = v[1].cls as any;
      v[1].cls = k.name as any; // v[0].cls === k.name
    }
  });

  return {excluded, instructions};
}

function serializePredicate(p: PoClassPropertyMap) {
  return p.cls === this;
}
function deserializePredicate(p: PoClassPropertyMap) {
  return p.obj === this;
}

export class TargetTransformer {

  @LazyInit(function (this: TargetTransformer): PoClassPropertyMap | undefined {
    const idKey = this.meta.getIdentityKey();
    if (idKey) {
      return (this.hasOwnProperty('incoming') ? this.incoming : this.outgoing)
        .instructions.find(p => p.prop.name === idKey);
    }
  })
  protected identity: PoClassPropertyMap | undefined;

  @LazyInit(function (this: TargetTransformer): CompiledTransformation {
    return getInstructions(this.meta, 'incoming');
  })
  protected incoming: CompiledTransformation;


  @LazyInit(function (this: TargetTransformer): CompiledTransformation {
    return getInstructions(this.meta, 'outgoing');
  })
  protected outgoing: CompiledTransformation;

  @LazyInit(function (this: TargetTransformer): PropertyContainer {
    if (this.meta.transformStrategy === 'exclusive') {
      return new ExclusivePropertyContainer(this.meta.target, this.incoming);
    } else {
      const rename = namingStrategyMap('incoming', this.meta.transformNameStrategy)
        ? (prop) => prop.cls = this.meta.transformNameStrategy.incoming(prop.obj)
        : undefined
      ;
      return new InclusivePropertyContainer(this.meta.target, this.incoming, deserializePredicate, rename);
    }
  })
  protected incomingContainer: PropertyContainer;

  @LazyInit(function (this: TargetTransformer): PropertyContainer {
    if (this.meta.transformStrategy === 'exclusive') {
      return new ExclusivePropertyContainer(this.meta.target, this.outgoing);
    } else {
      const rename = namingStrategyMap('outgoing', this.meta.transformNameStrategy)
        ? (prop) => prop.obj = this.meta.transformNameStrategy.outgoing(prop.cls)
        : undefined
      ;
      return new InclusivePropertyContainer(this.meta.target, this.outgoing, serializePredicate, rename);
    }
  })
  protected outgoingContainer: PropertyContainer;

  constructor(protected meta: TargetMetadata) { }

  serialize(mapper: SerializeMapper): any {
    return mapper.serialize(this.outgoingContainer);
  }

  /**
   * Deserialize a single target.
   * Does not support collection deserialization, if mapper is a collection will throw.
   * @param mapper
   * @param target
   **/
  deserialize(mapper: DeserializeMapper, target: any): void {
    const cb = (prop: PoClassPropertyMap) => {
      const propMeta = (prop.prop && prop.prop.foreignKeyOf) || prop.prop;
      target[prop.cls] = transformValueIn(mapper.getValue(prop.obj, propMeta), propMeta);
    };

    if (isFunction(mapper.setRef)) {
      mapper.setRef(target);
    }

    this.incomingContainer.forEach(mapper.getKeys(), cb);

    if (isFunction(mapper.getIdentity)) {
      if (this.identity) {
        target[this.identity.cls] = transformValueIn(mapper.getIdentity(), this.identity.prop);
      }
    }
  }
}