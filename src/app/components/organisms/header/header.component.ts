import { Component, Input, OnInit } from '@angular/core';
import{faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import { ComponentSize } from 'src/app/shared/enum/component-size.enum';
import { Rol } from 'src/app/shared/enum/rol.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false;

  icon = faBars;

  sizeButton = ComponentSize.SMALL;

  @Input() rol!: Rol;

  options: [string, string][]= [];

  constructor() { }

  ngOnInit(): void {
    this.initMenu();
  }

  initMenu(){
    if(this.rol == Rol.ADMIN) {
      this.options = [
        ["Categoría", "/categoria"],
        ["Marca", "/marca"],
        ["Artículo", "/articulo"],
      ]
    }
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
