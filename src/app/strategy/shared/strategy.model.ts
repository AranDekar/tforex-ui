import * as core from '../../core';

export interface Strategy {

    id?: string;

    name?: string;

    description?: string;

    createdTime?: Date;

    isActive?: boolean;

    granularity?: core.GranularityEnum;

    postedBy?: string;
}

export interface StrategyQuery extends Strategy {
    postedBy_displayName?: string;
}