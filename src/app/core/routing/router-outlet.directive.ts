import {
    ComponentFactoryResolver, ResolvedReflectiveProvider,
    Directive, Injector,
} from '@angular/core';


import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';

@Directive({
    selector: '[tfrxRouterOutlet]',
})

export class TForextRouterOutletDirective extends RouterOutlet {
    public activateWith(activatedRoute: ActivatedRoute, loadedResolver: ComponentFactoryResolver): void {
        activatedRoute.url.subscribe(x => {
            let route = <any>activatedRoute;
            let url = route._routerState.snapshot.url;
            super.activateWith(activatedRoute, loadedResolver);
        });
    }
}
