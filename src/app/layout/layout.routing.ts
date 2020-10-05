import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DefaultLayoutComponent } from './default-layout';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
      }
    ]
  }
];

export const LayoutRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);

export class LayoutComponents {
  public static components = [DefaultLayoutComponent, LayoutComponent];
}
