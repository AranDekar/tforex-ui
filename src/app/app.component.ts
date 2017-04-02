import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works hooray!';
  constructor() {
    let a = 2;
    a = a + 2;
  }
}
