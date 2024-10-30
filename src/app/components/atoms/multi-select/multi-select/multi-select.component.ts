import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from 'src/app/core/models/ICategory';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

  categories: ICategory[] = [
    { nameCategory: '', descriptionCategory: ''},
    { nameCategory: '', descriptionCategory: '' },
    { nameCategory: '', descriptionCategory: '' },
    { nameCategory: '', descriptionCategory: '' }
    // Agrega más categorías según sea necesario
  ];
    
  

  constructor() {
  }

  ngOnInit(): void {
  }

  selectedCategories: ICategory[] = [];

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onCategoryChange(category: ICategory, isChecked: boolean) {
    if (isChecked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(cat => cat.idCategory !== category.idCategory);
    }
  }

}
