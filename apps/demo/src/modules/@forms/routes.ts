import { Routes } from '@angular/router';

import { FormsAppComponent } from './forms-app';
import { TutorialPageComponent } from '@shared';

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', component: FormsAppComponent },
      { path: 'tutorial/:name', component: TutorialPageComponent }
    ]
  }
];
