import { stringify } from '@tdm/transformation';
import { AdapterStatic, BaseActiveRecord, ValidationError } from './interfaces';


export class TDMError extends Error {

}

export class DecoratorError extends TDMError {
  constructor(target: any, propertyName: PropertyKey, message: string) {
    super(`Invalid decorator @ ${stringify(target)}#${stringify(propertyName)}: ${message}`);
  }

  static hookNoStatic(target: any, propertyName: PropertyKey, action: string): DecoratorError {
   return new DecoratorError(target, propertyName, `Hook '${action}' can only decorate instance methods`);
  }

  static hookNoInstance(target: any, propertyName: PropertyKey, action: string): DecoratorError {
    return new DecoratorError(target, propertyName, `Hook '${action}' can only decorate instance methods`);
  }
}


export class AdapterError extends TDMError {
  constructor(public adapterClass: AdapterStatic<any, any>, message: string) {
    super(message);
  }

  static notRegistered(adapterClass: AdapterStatic<any, any>): AdapterError {
    return new AdapterError(adapterClass, `Adapter '${stringify(adapterClass)}' is not a registered Adapter`);
  }

  static notRegisteredFor(adapterClass: AdapterStatic<any, any>, target: any): AdapterError {
    return new AdapterError(adapterClass, `Adapter '${stringify(adapterClass)}' is not a registered Adapter for target '${target}'`);
  }

  static registered(adapterClass: AdapterStatic<any, any>, existsIn: string): AdapterError {
    return new AdapterError(adapterClass, `Adapter '${stringify(adapterClass)}' already registered for '${existsIn}'`);
  }
}

export class TargetError extends TDMError {
  constructor(public target: any, message: string) {
    super(message);
  }

  static built(target: any, adapterClass: AdapterStatic<any, any>): TargetError {
    return new TargetError(target, `Target/Adapter ${stringify(target)}/${stringify(adapterClass)} is already built`);
  }
}

export class ResourceError extends TDMError {
  constructor(public readonly ar: BaseActiveRecord<any>, message?: string) {
    super(message)
  }

  static coll_obj(ar: BaseActiveRecord<any>, expectedCol: boolean): ResourceError {
    return new ResourceError(null, expectedCol
      ? `Expected a collection but got an object`
      : `Expected an object but got a collection`
    );
  }
}

export class ResourceValidationError extends ResourceError {
  constructor(ar: BaseActiveRecord<any>, public readonly validationErrors: ValidationError[]) {
    super(ar)
  }
}

export class ValidationConfigError extends Error {
  constructor(validationName: string, message: string) {
    super(`Invalid validation configuration params for "${validationName}": ${message}`);
  }
}
