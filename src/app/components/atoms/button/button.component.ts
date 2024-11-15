import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ComponentSize } from 'src/app/shared/enum/component-size.enum';
import { ComponentType } from 'src/app/shared/enum/component-type.enum';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  ngOnInit(): void {
  }


  @Input() labelButton: string = 'Button';
  @Input() type: ComponentType = ComponentType.PRIMARY;
  @Input() disabled: boolean = false;
  @Input() icon?: IconDefinition;
  @Input() size!: ComponentSize;


  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }

}
