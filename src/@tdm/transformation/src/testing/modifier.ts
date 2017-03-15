import {
  Constructor,
  Prop,
  PropMetadataArgs,
  Exclude,
  ExcludeMetadataArgs,
  Relation,
  RelationMetadataArgs
} from '@tdm/transformation';

import {
  ClassMetadata,
  PropMetadata,
  ExcludeMetadata,
  RelationMetadata,
  TargetStore,
  TargetMetadata,
  targetStore as targetStore_,
  stringify,
  isString,
  isFunction
} from '@tdm/transformation/ext';

const targetStore: TestTargetStore = targetStore_;

function getTargetMetaStore(target: any): TestTargetMetadataStore {
  return targetStore.getTargetMeta(target) as any;
}

class TestTargetStore extends TargetStore {

  static getTargetMeta(target: any): TestTargetMetadataStore | undefined {
    return targetStore.builtTargets.get(target);
  }

  static clear(target: any): void {
    const meta = targetStore.builtTargets.get(target);
    if (meta) {
      targetStore.namedTargets.delete(meta.name);
      targetStore.builtTargets.delete(target);
      targetStore.targets.get(target).clear();

    }
  }

  static removeClassProp(target: Constructor<any>, key: keyof ClassMetadata) {
    if (targetStore.targets.has(target)) {
      return targetStore.targets.get(target).delete(ClassMetadata, key);
    }
  }

  static setClassProp<P extends keyof ClassMetadata>(target: Constructor<any>, key: P, value: ClassMetadata[P]): void {
    if (targetStore.targets.has(target)) {
      targetStore.targets.get(target).set(ClassMetadata, key, value as any);  // why TS needs help here?
    }
  }
}

class TestTargetMetadataStore extends TargetMetadata {
  static getFactory<T, Z>(type: Z & Constructor<T>): (target: any, key: any) => T | undefined {
    return (target: any, key: string) => {
      const t = getTargetMetaStore(target);
      if (t) {
        return t.config.get(type, key);
      }
    }
  }

  static removeFactory<T, Z>(type: Z & Constructor<T>): (target: any, key: any) => boolean {
    return (target: any, key: string) => {
      const t = TestTargetStore.getTargetMeta(target);
      if (t) {
        return t.config.delete(type, key);
      }
    }
  }

  static getRelation = TestTargetMetadataStore.getFactory(RelationMetadata);
  static getProp = TestTargetMetadataStore.getFactory(PropMetadata);
  static getExclude = TestTargetMetadataStore.getFactory(ExcludeMetadata);

  static removeRelation = TestTargetMetadataStore.removeFactory(RelationMetadata);
  static removeProp = TestTargetMetadataStore.removeFactory(PropMetadata);
  static removeExclude = TestTargetMetadataStore.removeFactory(ExcludeMetadata);

  static removeClassProp(target: Constructor<any>, propName: keyof ClassMetadata): boolean {
    const t = getTargetMetaStore(target);
    if (t) {
      delete t[propName];
    }
    return TestTargetStore.removeClassProp(target, propName);
  }

  static setClassProp<P extends keyof ClassMetadata>(target: Constructor<any>, propName: P, value: ClassMetadata[P]): void {
    const t = getTargetMetaStore(target);
    if (t) {
      t[propName] = value;
    }
    return TestTargetStore.setClassProp(target, propName, value);
  }

  static setName(target: Constructor<any>, name?: string): void {
    targetStore.setName(target, name || stringify(target));
  }

  static setIdentity(target: Constructor<any>, key?: string): void {
    targetStore.setIdentity(target, key || undefined);
  }

  static setFactory(target: Constructor<any>, fn?: (isColl: boolean) => any): void {
    targetStore.setFactory(target, fn || undefined);
  }

  static addRelation(target: Constructor<any>, key: string, meta?: RelationMetadataArgs): void {
    Relation(meta)(target.prototype, key);
  }

  static addProp(target: Constructor<any>, key: string, meta?: PropMetadataArgs): void {
    Prop(meta)(target.prototype, key);
  }

  static setExcludeClass(target: Constructor<any>): void {
    Exclude()(target);
  }

  static addExclude(target: Constructor<any>, key: string, meta?: ExcludeMetadataArgs): void {
    Exclude(meta)(target.prototype, key);
  }

}

export class TargetMetaModifier<T, Z> {
  constructor(public target: Z & Constructor<T>) {
  }

  clear(): this {
    TestTargetStore.clear(this.target);
    return this;
  }

  /**
   * Set/Update the identity field.
   * If key is empty will set to default name
   * @param key
   * @returns {TargetMetaModifier}
   */
  setName(name?: string): this {
    TestTargetMetadataStore.setName(this.target, name);
    return this;
  }

  /**
   * Set/Update/Remove the identity field.
   * If key is empty will remove identity.
   * @param key
   * @returns {TargetMetaModifier}
   */
  setIdentity(key?: keyof T): this {
    TestTargetMetadataStore.setIdentity(this.target, key);
    return this;
  }

  setFactory(fn?: (isColl: boolean) => any): this {
    TestTargetMetadataStore.setFactory(this.target, fn);
    return this;
  }

  /**
   * Set exclusion/inclusion at the class level
   * @param exclude
   * @returns {TargetMetaModifier}
   */
  setExclude(exclude: boolean): this {
    if (!exclude) {
      TestTargetMetadataStore.removeClassProp(this.target, 'transformStrategy');
    } else {
      TestTargetMetadataStore.setExcludeClass(this.target);
    }
    return this;
  }

  getProp<P extends keyof T>(key: P): PropMetadata {
    return TestTargetMetadataStore.getProp(this.target, key);
  }

  getRelation<P extends keyof T>(key: P): RelationMetadata {
    return TestTargetMetadataStore.getRelation(this.target, key);
  }

  getExclude<P extends keyof T>(key: P): ExcludeMetadata {
    return TestTargetMetadataStore.getExclude(this.target, key);
  }

  classProp<P extends keyof ClassMetadata>(key: P, value?: ClassMetadata[P] | false): this {
    TestTargetMetadataStore.removeClassProp(this.target, key);
    if (typeof value !== 'boolean') {
      TestTargetMetadataStore.setClassProp(this.target, key, value);
    }
    return this;
  }

  relation(key: keyof T, meta?: RelationMetadataArgs | false): this {
    TestTargetMetadataStore.removeRelation(this.target, key);

    if (typeof meta !== 'boolean') {
      TestTargetMetadataStore.addRelation(this.target, key, meta);
    }

    return this;
  }

  /**
   * Add or remove prop, to remove set meta to false
   * @param key
   * @param meta
   * @param type
   * @returns {any}
   */
  prop(key: keyof T, meta?: PropMetadataArgs | false | Function, type?: Function): this {
    TestTargetMetadataStore.removeProp(this.target, key);

    if (typeof meta !== 'boolean' && !isFunction(meta)) {
      TestTargetMetadataStore.addProp(this.target, key, meta);
    } else if (isFunction(meta)) {
      type = meta;
    }

    if (isFunction(type)) {
      (Reflect as any).defineMetadata("design:type", type, this.target.prototype, key);
    }

    return this;
  }

  props(...args: Array<keyof T>): this {
    args.forEach(a => this.prop(a));
    return this;
  }

  /**
   * Add or remove exclude, to remove set meta to false
   * @param key
   * @param meta
   * @returns {any}
   */
  exclude(key: keyof T, meta?: ExcludeMetadataArgs | false): this {
    TestTargetMetadataStore.removeExclude(this.target, key);
    if (typeof meta !== 'boolean') {
      TestTargetMetadataStore.addExclude(this.target, key, meta);
    }
    return this;
  }

  static create<T, Z>(target: Z & Constructor<T>): TargetMetaModifier<T, Z> {
    return new TargetMetaModifier(target);
  }
}
