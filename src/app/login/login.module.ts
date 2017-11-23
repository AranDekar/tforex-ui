import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import * as login from '../login';

@NgModule({
  imports: [SharedModule, login.LoginRoutingModule],
  declarations: [login.LoginComponent],
})
export class LoginModule { }
