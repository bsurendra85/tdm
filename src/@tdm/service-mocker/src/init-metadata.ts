import * as extensions from './core/metadata/method-extensions';

export function initMetadata(): void {
  extensions.registerMethodExtensions('httpCodeMeta', extensions.HttpCodeMetadata);
  extensions.registerMethodExtensions('forwardMeta', extensions.ForwardMetadata);
  extensions.registerMethodExtensions('routeHandlerParams', extensions.RouteHandlerParamMetadata);
}
