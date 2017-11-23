import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

import * as shared from '../shared';

@Directive({
    selector: '[tfrxClickTracker]',
})

/**
 * this directive tracks the click event of the host component and document 
 * and informs the component whether the click event was triggered inside or outside
 */

export class ClickTrackerDirective {
    @Output() public clickTracked = new EventEmitter();
    private _hostEventRef: any;

    @HostListener('click', ['$event.target']) public onClick(ev) {
        this._hostEventRef = ev;
    }

    @HostListener('document:click', ['$event.target']) public onDocumentClick(ev) {
        if (this._hostEventRef === ev) {
            this.clickTracked.emit(ClickTracking.inside);
        } else {
            this.clickTracked.emit(ClickTracking.outside);
        }
    }
}
export enum ClickTracking {
    inside,
    outside
}
