import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';

import * as core from '../core';
import * as strategy from '../strategy';

@NgModule({
  imports: [
    strategy.StrategyRoutingModule,
    SharedModule,
  ],
  declarations: [
    strategy.StrategyViewComponent,
    strategy.StrategyBacktestComponent,
    strategy.StrategyListComponent,
    strategy.StrategyComponent,
  ],
  providers: [
    //   core.httpServiceProvider,
    strategy.StrategyResolveService,
    strategy.StrategyDataService,
  ],
})
export class StrategyModule {
}
