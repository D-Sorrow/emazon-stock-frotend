import { Component, OnInit } from '@angular/core';
import{faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-stock',
  templateUrl: './header-stock.component.html',
  styleUrls: ['./header-stock.component.scss']
})
export class HeaderStockComponent implements OnInit {

  icon = faBars;

  constructor() { }

  ngOnInit(): void {
  }

}
