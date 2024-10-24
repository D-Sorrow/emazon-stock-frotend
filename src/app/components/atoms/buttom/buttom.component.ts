import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buttom',
  templateUrl: './buttom.component.html',
  styleUrls: ['./buttom.component.scss']
})
export class ButtomComponent implements OnInit {

  @Input() disabled: boolean = false;
  @Input() textButton: string ='';
  @Input() buttonClass: string = '';

  constructor() { }

  ngOnInit(): void {
    
  }

}
