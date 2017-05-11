import { isNumber, isStaticDecorator } from './utils';
import { DecoratorInfo } from './interfaces';

export function decoratorInfo(...args: any[]): DecoratorInfo {

  switch (args.length) {
    case 1:
      return { type: 'class' };
    default:
      const type = args.length === 3 && isNumber(args[2]) ? 'param' : 'member';
      return {
        type,
        name: args[1],
        isStatic: isStaticDecorator(args[0]),
        hasDescriptor:  args.length === 3 && type === 'member'
      }
  }
}

export abstract class BaseMetadata {

  /**
   * The property name that the decorator wraps, if it wraps a property, member or constructor param.
   * @returns {PropertyKey}
   */
  readonly name: PropertyKey | undefined;

  constructor(public readonly decoratorInfo: DecoratorInfo) {
    this.name = decoratorInfo.name;
  }
}

