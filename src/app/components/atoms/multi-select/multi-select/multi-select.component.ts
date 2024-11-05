import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ICategory } from 'src/app/core/models/ICategory';
import { IBrand } from 'src/app/core/models/IBrand';



@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {


  @Input() titleSelect: String = '';
    
  @Input() categories: ICategory [] = [];

  @Output() scrollDown = new EventEmitter<void>();

  @Output() selectedCategoriesChange = new EventEmitter<number[]>();

  selectedCategories: number[] = [];


  blockCheckboxCategory(categoryId: number): boolean {
    return this.selectedCategories.length == 3 && !this.selectedCategories.includes(categoryId);
  }

  scrollDownMethod(event: Event) {
    const element = event.target as HTMLElement;
    let scrollHeight = element.scrollHeight;
    let scrollTop = element.scrollTop;
    let clientHeight = element.clientHeight;

    let scrollPosition = scrollHeight - (scrollTop + clientHeight); 

    if (Math.abs(scrollPosition) < 1) {
      this.scrollDown.emit();
    }
    
  }

  getValueToCategory(idCategory: number) {

    if(this.selectedCategories.includes(idCategory)) {

      const index = this.selectedCategories.indexOf(idCategory);
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(idCategory);
    }
    console.log('Array completo:', this.selectedCategories);
  }


  constructor() {
  }

  ngOnInit(): void {
  }

}
