import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [MessageService, AuthService]
})
export class CoreModule {}
