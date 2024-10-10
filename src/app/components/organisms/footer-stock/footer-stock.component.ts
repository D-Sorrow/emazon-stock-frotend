import { Component, OnInit } from '@angular/core';
import{faFacebook, faVk, faTwitter} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer-stock',
  templateUrl: './footer-stock.component.html',
  styleUrls: ['./footer-stock.component.scss']
})
export class FooterStockComponent implements OnInit {

  faFacebook = faFacebook;
  faVk = faVk;
  faTwitter = faTwitter;  

  constructor() { }

  ngOnInit(): void {
  }

}
