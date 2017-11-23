import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Observable }                   from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { Crisis, CrisisService } from './crisis.service';
import { DialogService } from '../core';

const idConst = 'id';

@Component({
  template: `
  <div *ngIf="_crisis">
    <h3>"{{editName}}"</h3>
    <div>
      <label>Id: </label>{{_crisis.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="_editName" placeholder="name"/>
    </div>
    <p> 
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  </div>
  `,
  styles: ['input {width: 20em}'],
})

export class CrisisDetailComponent implements OnInit {
  private _crisis: Crisis;
  private _editName: string;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {
  }

  public ngOnInit() {
    let id = parseInt(this.route.snapshot.params['id'], 10);
    this.service.getCrisis(id)
      .then(crisis => {
        if (crisis) {
          this._editName = crisis.name;
          this._crisis = crisis;
        } else { // id not found
          this.gotoCrises();
        }
      });
  }

  public cancel() {
    this.gotoCrises();
  }

  public save() {
    this._crisis.name = this._editName;
    this.gotoCrises();
  }

  public canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this._crisis || this._crisis.name === this._editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    let p = this.dialogService.confirm('Discard changes?');
    let o = Observable.fromPromise(p);
    return o;
  }

  public gotoCrises() {
    let crisisId = this._crisis ? this._crisis.id : null;
    // Pass along the hero id if available
    // so that the CrisisListComponent can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    // Absolute link
    this.router.navigate(['/crises', { id: crisisId, foo: 'foo' }]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
