import { Component, Input, OnInit } from '@angular/core';
import { DataForm } from 'src/app/shared/utils/DataForm';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() items: DataForm[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
