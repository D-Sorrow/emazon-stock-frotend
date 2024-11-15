import { Component, OnInit } from '@angular/core';
import{faFacebook, faVk, faTwitter} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faFacebook = faFacebook;
  faVk = faVk;
  faTwitter = faTwitter;  
  constructor() { }

  ngOnInit(): void {
  }

}
