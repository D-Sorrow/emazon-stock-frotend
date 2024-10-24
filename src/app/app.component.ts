import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isSidenavOpen: boolean = false;

  selectedSection: string = 'categories';

  modalSwitch: boolean = false;

  constructor(){}

  onToggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  onSectionSelected(section: string){
    this.selectedSection = section;
  }

  ngOnInit(): void {
  }

  openModal() {
    this.modalSwitch = true;
  }

  closeModal() {
    this.modalSwitch = false;
  }


  title = 'com.emazon.stock';
}
