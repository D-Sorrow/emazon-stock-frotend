import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from 'src/app/core/models/ICategory';

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements OnInit {

  @Input() categories!: ICategory;

  constructor() { }

  ngOnInit(): void {
  }

}
