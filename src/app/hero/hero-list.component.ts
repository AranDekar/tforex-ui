// TODO SOMEDAY: Feature Componetized like CrisisCenter
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';
import { Hero, HeroService } from '../hero';

const idConst = 'id';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  `,
})

export class HeroListComponent implements OnInit, OnDestroy {
  public heroes: Hero[];

  private _selectedId: number;
  private _sub: Subscription;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router) { }

  public ngOnInit() {
    this._sub = this.route
      .queryParams
      .subscribe(params => {
        this._selectedId = +params[idConst];
        this.service.getHeroes()
          .then(heroes => this.heroes = heroes);
      });
  }
  public ngOnDestroy() {
    this._sub.unsubscribe();
  }

  private isSelected(hero: Hero) { return hero.id === this._selectedId; }

  private onSelect(hero: Hero) {
    this.router.navigate(['/heroes', hero.id]);
  }

}
