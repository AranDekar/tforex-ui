import { Component, Input, OnInit, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import * as core from '../../core';
import * as proxy from '../../proxy';
import * as shared from '../../shared';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'tfrx-instrument',
    templateUrl: 'instrument.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InstrumentComponent), multi: true },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstrumentComponent implements ControlValueAccessor, OnInit {
    private _selectedInstrument: proxy.Instrument;
    private _instruments$: Observable<proxy.Instrument[]>;

    constructor(private _service: core.InstrumentDataService, private _changeDetectorRef: ChangeDetectorRef) { }
    public ngOnInit() {
        this._instruments$ = this._service.instruments$;
        this._service.loadAll();
    }

    public writeValue(value?: proxy.Instrument) {
        if (value != null && value !== undefined) {
            this._selectedInstrument = value;
        }
    }

    public registerOnChange(fn: (_: proxy.Instrument) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
    public onChange = (_: proxy.Instrument) => null;
    public onTouched = () => null;

    private onSelectedItemsChanged(node: proxy.Instrument) {
        this.onChange(node);
    }
}
