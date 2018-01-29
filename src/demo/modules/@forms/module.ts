import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared';

import { DynamicFormsModule } from '@tdm/ngx-dynamic-forms';
import { FormsSharedModule } from './shared';
import { FormsTutorialsModule } from './tutorials';
import { FormsAppComponent } from './forms-app';
import { TutorialPageComponent } from './tutorial-page';
import { ROUTES } from './routes';

@NgModule({
  declarations: [ FormsAppComponent, TutorialPageComponent ],
  imports: [
    SharedModule,
    DynamicFormsModule,
    FormsSharedModule,
    FormsTutorialsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class FormsAppModule { }
