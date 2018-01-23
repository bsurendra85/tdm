import { NgModule, ModuleWithProviders } from '@angular/core';

import { MODULES, ROOT_MODULES } from './modules';
import { UiBlockService } from './services/ui-block';
import { UiBlock } from './components/ui-block.component';
import { TdmCodeViewComponent } from './components/code-view/code-view.component';
import { CdkDetailRowDirective } from './cdk-detail-row.directive';
import { DataSourceDirective } from './data-source';

@NgModule({
  declarations: [ TdmCodeViewComponent, UiBlock, CdkDetailRowDirective, DataSourceDirective ],
  imports: MODULES,
  entryComponents: [ UiBlock ],
  exports: [ TdmCodeViewComponent, UiBlock, CdkDetailRowDirective, DataSourceDirective ]
})
export class DeclarationSharedModule {
}

@NgModule({
  imports: ROOT_MODULES,
  exports: [
    ...MODULES,
    DeclarationSharedModule
  ],
  providers: [ UiBlockService ]
})
export class SharedModuleRoot {}

@NgModule({
  imports: MODULES,
  exports: [
    ...MODULES,
    DeclarationSharedModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModuleRoot };
  }
}
