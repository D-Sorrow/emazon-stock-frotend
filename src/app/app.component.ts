import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isSidenavOpen: boolean = false;

  onToggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  constructor(){}

  ngOnInit(): void {
  }

  title = 'com.emazon.stock';
}
