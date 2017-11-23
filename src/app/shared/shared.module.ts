import {
    NgModule,
    ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as shared from '../shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        shared.TreeNodeFilterPipe,
        shared.TreeSearchFilterPipe,
        shared.TreeComponent,
        shared.InstrumentComponent,
        shared.ClickTrackerDirective,
    ],
    exports: [
        CommonModule,
        FormsModule,
        shared.InstrumentComponent,
        shared.ClickTrackerDirective,
    ],
})
export class SharedModule { }
