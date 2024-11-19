import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  IconDefinition,
  faSortAlphaUp
} from '@fortawesome/free-solid-svg-icons';
import { ComponentSize } from 'src/app/shared/enum/component-size.enum';
@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.scss']
})
export class PaginationBarComponent implements OnInit {

  nextButton: IconDefinition = faChevronCircleRight;
  prevButton: IconDefinition = faChevronCircleLeft;
  sortButton: IconDefinition = faSortAlphaUp;
  sizeButton: ComponentSize = ComponentSize.XS;
  size: ComponentSize = ComponentSize.MEDIUM;
  pageCount: number = 1;
  @Input() pageSize: number = 1;
  @Output() nextPage = new  EventEmitter<void>();
  @Output() prevPage = new  EventEmitter<void>();
  @Output() sortItem = new  EventEmitter<void>();

  
  constructor() { }

  ngOnInit(): void {
  }

  nextPageClick() {
    if(this.pageCount < this.pageSize){
      this.pageCount++;
      this.nextPage.emit();
    }
  }

  prevPageClick(){
    if(this.pageCount > 1){
      this.pageCount--;
      this.prevPage.emit();
    }
  }

  sortClick(){
    this.sortItem.emit();
  }

}
