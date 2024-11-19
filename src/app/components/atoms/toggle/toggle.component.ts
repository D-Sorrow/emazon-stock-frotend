import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  @Input() toggleLabel: string = 'Por Categoría';

  @Input() checked: boolean = false;

  @Output() toggleChange = new EventEmitter<[string, boolean]>();

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(event: Event, toggleLabel: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.toggleChange.emit([toggleLabel, isChecked ]);
  }

}
