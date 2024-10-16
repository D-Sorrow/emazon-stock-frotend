import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isSidenavOpen: boolean = false;

  selectedSection: string = 'categories';

  constructor(){}

  onToggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  onSectionSelected(section: string){
    this.selectedSection = section;
  }

  ngOnInit(): void {
  }


  title = 'com.emazon.stock';
}
