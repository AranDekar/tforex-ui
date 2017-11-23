import { Component, Input, OnInit, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import * as core from '../../core';
import * as shared from '../../shared';

@Component({
    moduleId: module.id,
    selector: 'tfrx-instrument',
    templateUrl: 'instrument.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InstrumentComponent), multi: true },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstrumentComponent implements ControlValueAccessor, OnInit {
    private _selectedInstruments: core.Instrument[];
    private _instruments$: Observable<core.Instrument[]>;

    constructor(private _service: core.InstrumentDataService, private _changeDetectorRef: ChangeDetectorRef) { }
    public ngOnInit() {
        this._instruments$ = this._service.instruments$;
        this._service.loadAll();
    }

    public writeValue(value?: core.Instrument[]) {
        if (value != null && value !== undefined) {
            this._selectedInstruments = value;
        }
    }

    public registerOnChange(fn: (_: core.Instrument[]) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
    public onChange = (_: core.Instrument[]) => { return null; };
    public onTouched = () => { return null; };

    private onSelectedItemsChanged(nodes: core.Instrument[]) {
        this.onChange(nodes);
    }
}