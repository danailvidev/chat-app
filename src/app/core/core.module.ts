import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MessageService } from './services/message.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [MessageService]
})
export class CoreModule {}
