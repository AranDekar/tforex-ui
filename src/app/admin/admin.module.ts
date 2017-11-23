import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';

import { routing, AdminComponent, InstrumentListComponent } from '../admin';

@NgModule({
    imports: [
        routing,
        SharedModule,
    ],
    declarations: [
        AdminComponent,
        InstrumentListComponent,
    ],
    providers: [
    ],
})
export class AdminModule {
}
