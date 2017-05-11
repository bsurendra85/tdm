import {
  MapExt,
  DecoratorInfo,
  BaseMetadata,
  metaFactoryFactory,
  targetStore,
  MetaFactoryInstance
} from '@tdm/core';

import { ARHookableMethods } from '../../fw';

export interface StoredHook {
  before?: HookMetadata;
  after?: HookMetadata
}

export interface HookMetadataArgs {
  event: 'before' | 'after';
  action: ARHookableMethods;
}

export class HookMetadata extends BaseMetadata {

  event: 'before' | 'after';
  action: ARHookableMethods;

  constructor(obj: HookMetadataArgs, info: DecoratorInfo) {
    super(info);

    this.event = obj.event;
    this.action = obj.action;
  }

  static metaFactory = metaFactoryFactory<HookMetadataArgs, HookMetadata>(HookMetadata);

  static register(meta: MetaFactoryInstance<HookMetadata>): void {
    const hook: StoredHook = {[meta.metaValue.event]: meta.metaValue};

    const currHook = targetStore.getMetaFor<any, StoredHook>(meta.target, HookMetadata, meta.metaValue.action) || {} as any;
    targetStore.setMetaFor<any, StoredHook>(meta.target, meta.metaClassKey, meta.metaValue.action as any, Object.assign(currHook, hook));
  }

  static extend(from: Map<PropertyKey, StoredHook>, to: Map<PropertyKey, StoredHook> | undefined): Map<PropertyKey, StoredHook> {
    if (!to) {
      to = new Map<PropertyKey, StoredHook>(from.entries());
    } else {
      // TODO: Refactor to support static/instance like ExtendAction in case 2 hooks with same prop name
      MapExt.asKeyValArray(from)
        .forEach(([k, hookFrom]) => {
          if (!to.has(k)) {
            to.set(k, hookFrom);
          } else {
            const hookTo = to.get(k);
            Object.keys(hookFrom).forEach(event => {
              if (!hookTo.hasOwnProperty(event)) {
                hookTo[event] = hookFrom[event];
              }
            });
          }
        });
    }

    return to;
  }
}
