import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() dirImg: string[] = [];;
  @Input() size!: string;
  @Input() dirImgSrc!: string;

  randomImage!: string;

  constructor() { }

  ngOnInit(): void {
    this.randomImage = this.getRandomImage();
  }

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.dirImg.length);
    return this.dirImg[randomIndex];
  }

}
