export interface Instrument {
    _id?: string;
    displayName?: string;
    halted?: boolean;
    title?: string;
    path?: string;
    marginRate?: number;
    maxTradeUnits?: number;
    maxTrailingStop?: number;
    minTrailingStop?: number;
    pip?: string;
    precision?: string;
    granularities?: string[];
}