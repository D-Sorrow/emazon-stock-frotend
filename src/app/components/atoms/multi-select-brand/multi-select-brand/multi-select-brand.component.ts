import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBrand } from 'src/app/core/models/IBrand';

@Component({
  selector: 'app-multi-select-brand',
  templateUrl: './multi-select-brand.component.html',
  styleUrls: ['./multi-select-brand.component.scss']
})
export class MultiSelectBrandComponent implements OnInit {

  @Input() titleSelect: String = '';

  @Input() brands: IBrand [] = [];

  @Output() scrollDown = new EventEmitter<void>();

  @Output() selectedBrandsChange = new EventEmitter<number[]>();

  selectedBrands: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  blockCheckboxCategory(brandId: number): boolean {
    return this.selectedBrands.length == 1 && !this.selectedBrands.includes(brandId);
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

  getValueToCategory(brandId: number) {

    if(this.selectedBrands.includes(brandId)) {

      const index = this.selectedBrands.indexOf(brandId);
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brandId);
    }
  }

}
