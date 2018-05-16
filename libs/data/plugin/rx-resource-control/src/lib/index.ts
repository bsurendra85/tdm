import { Observable } from 'rxjs';
import { PluginStore } from '@tdm/data';

import { init } from './rc-ext';

declare module '@tdm/data/lib/resource-control' {
  interface ResourceControl<T> {
    busy$: Observable<boolean>;
    self$: Observable<T>;
    disconnect(): void;
  }
}

export class RxResourceControlPlugin {
  /**
   * Init the plugin
   */
  init(): void {
    init();
  }
}

PluginStore.register('RxResourceControl', RxResourceControlPlugin);

declare module '@tdm/data/lib/fw/plugin' {
  interface PluginStore {
    /**
     * @extension '@tdm/data/plugin/rx-resource-control'
     */
    readonly RxResourceControl: RxResourceControlPlugin;
  }
}
