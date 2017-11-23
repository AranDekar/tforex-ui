import * as core from '../../core';

export interface ErrorResponse {
    message?: string;
}

export class Error {
    public type: core.ErrorTypeEnum;
    public errorCode: string;
    public statusCode: string;
    public message: any;
}
