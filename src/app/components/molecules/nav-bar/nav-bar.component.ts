import { Component, OnInit } from '@angular/core';
import{faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import { ComponentSize } from 'src/app/shared/enum/component-size.enum';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isMenuOpen = false;

  icon = faBars;

  sizeButton = ComponentSize.BIG;
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if(this.isMenuOpen) {
      this.icon = faTimes;
    } else {
      this.icon = faBars;
    }
  }
}
