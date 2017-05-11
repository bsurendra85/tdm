import { isPrimitive } from '@tdm/core';
import { TDMCollection as ARecordColl, IdentityValueType, ExecuteContext, ActionMethodType } from '@tdm/data';

import { MockActionOptions } from './interfaces';
import { MockActionMetadata } from '../metadata';
import { MockAction } from '../metadata/decorators';

export class MockDao {
  @MockAction({
    method: ActionMethodType.READ,
    isCollection: true,
    collInstance: true,
    validation: 'incoming' as 'incoming'
  })
  query: (options?: MockActionOptions) => ARecordColl<any>;

  @MockAction({
    method: ActionMethodType.READ,
    validation: 'incoming' as 'incoming',
    pre: (ctx: ExecuteContext<MockActionMetadata>, id: IdentityValueType, options?: MockActionOptions) => {
      ctx.setIdentity(id);
      return options;
    }
  })
  find: (id: IdentityValueType, options?: MockActionOptions) => any;

  @MockAction({
    method: ActionMethodType.DELETE,
    validation: 'skip' as 'skip',
    pre: (ctx: ExecuteContext<MockActionMetadata>, id: IdentityValueType | any, options?: MockActionOptions) => {

      if (isPrimitive(id)) {
        ctx.setIdentity(id);
      } else if (ctx.instanceOf(id)) {
        ctx.setInstance(id);
      } else {
        ctx.deserialize(id);
      }

      return options;
    }
  })
  remove: (id: IdentityValueType | any, options?: MockActionOptions) => any;

  @MockAction({
    method: ActionMethodType.CREATE,
    validation: 'both' as 'both',
    pre: (ctx: ExecuteContext<MockActionMetadata>, data: any, options?: MockActionOptions) => {
      if (ctx.instanceOf(data)) {
        ctx.setInstance(data);
      } else {
        ctx.deserialize(data);
      }

      ctx.body = ctx.serialize();

      return options;
    }
  })
  create: (data: any, options?: MockActionOptions) => any;

  @MockAction({
    method: ActionMethodType.UPDATE,
    validation: 'both' as 'both',
    pre: (ctx: ExecuteContext<MockActionMetadata>, data: any, options?: MockActionOptions) => {
      if (ctx.instanceOf(data)) {
        ctx.setInstance(data);
      } else {
        ctx.deserialize(data);
      }

      ctx.body = ctx.serialize();

      return options;
    }
  })
  update: (data: any, options?: MockActionOptions) => any;
}
