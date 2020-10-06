import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { UserListModule } from './user-list/user-list.module';
import { CreateModalModule } from './create-modal/create-modal.module';

@NgModule({
  imports: [CommonModule, FormsModule, DashboardRoutingModule, UserListModule, CreateModalModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
