import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() isOpen: boolean = false;

  @Output() sectionSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selectCategories() {
    this.sectionSelected.emit('categories'); 
  }

  selectBrands() {
    this.sectionSelected.emit('brands'); 
  }

  selectArticles() {
    this.sectionSelected.emit('articles');
  }

}
