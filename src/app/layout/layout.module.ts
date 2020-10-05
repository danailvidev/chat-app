import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRouting, LayoutComponents } from './layout.routing';

@NgModule({
  declarations: [LayoutComponents.components],
  imports: [CommonModule, LayoutRouting]
})
export class LayoutModule {}
