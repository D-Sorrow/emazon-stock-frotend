import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import{faSortAlphaDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  icon = faSortAlphaDown;

  

  @Output() nextPagination: EventEmitter<void> = new EventEmitter();
  @Output() previousPagination: EventEmitter<void> = new EventEmitter();
  @Output() sortPagination: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  goToNextPage() {
    this.nextPagination.emit(); // Emitimos el evento cuando se hace clic en "Siguiente"
  }

  goToPreviousPage() {
    this.previousPagination.emit(); // Emitimos el evento cuando se hace clic en "Anterior"
  }

  sort() {
    this.sortPagination.emit(); // Emitimos el evento cuando se hace clic en "Ordenar"
  }

}
