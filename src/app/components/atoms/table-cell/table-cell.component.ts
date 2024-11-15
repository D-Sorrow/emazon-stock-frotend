import { Component, Input, OnInit } from '@angular/core';
import { DataForm } from 'src/app/shared/utils/DataForm';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit {

  @Input() name: string = 'name';
  @Input() description: string = 'Description';

  constructor() { }

  ngOnInit(): void {
  }

}
