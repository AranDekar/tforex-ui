import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import * as crisis from '../crisis';

import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    crisis.routing,
  ],
  declarations: [
    crisis.CrisisDetailComponent,
    crisis.CrisisListComponent,
  ],
  providers: [
    crisis.CrisisService,
  ],
})

export default class CrisisModule { }