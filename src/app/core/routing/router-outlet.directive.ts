import {
    ComponentFactoryResolver, ResolvedReflectiveProvider,
    Directive, Injector,
} from '@angular/core';


import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[tfrxRouterOutlet]',
})

export class TForextRouterOutletDirective extends RouterOutlet {
    public activateWith(activatedRoute: ActivatedRoute, loadedResolver: ComponentFactoryResolver): void {
        activatedRoute.url.subscribe(x => {
            const route = <any>activatedRoute;
            const url = route._routerState.snapshot.url;
            super.activateWith(activatedRoute, loadedResolver);
        });
    }
}
