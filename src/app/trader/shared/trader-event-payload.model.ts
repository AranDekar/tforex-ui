import * as core from '../../core';

export interface TraderEventPayload {
    /**
     * the trader's strategy
     */
    strategyId?: string;
    /**
     * the owner of the trader
     */
    userId?: string;
    instrument?: core.InstrumentEnum;
}