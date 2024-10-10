import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import{faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-stock',
  templateUrl: './header-stock.component.html',
  styleUrls: ['./header-stock.component.scss']
})
export class HeaderStockComponent implements OnInit {

  icon = faBars;

  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  // Método que emite el evento al hacer clic en el ícono
  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
