import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateModalComponent } from './create-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CreateModalComponent, CreateModalComponent],
  exports: [CreateModalComponent]
})
export class CreateModalModule {}
