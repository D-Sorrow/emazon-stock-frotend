import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/core/models/IArticle';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  @Input() articles: IArticle[] = [];

  dirImagen: string[] = [
    'article_mock_img.jpg', 
    'article_mock2_img.jpg', 
    'article_mock3_img.jpg', 
    'article_mock4_img.jpg', 
  ];

  constructor() { }

  ngOnInit(): void {
  }

  numerModified(number: number): number { 

    let formattedNumber = number*1.3;
    return parseFloat(formattedNumber.toFixed(2));

  }

}
