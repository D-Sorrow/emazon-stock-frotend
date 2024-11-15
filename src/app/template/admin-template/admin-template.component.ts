import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/shared/enum/rol.enum';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.scss']
})
export class AdminTemplateComponent implements OnInit {


  isAdmin: Rol = Rol.ADMIN;

  constructor() { }

  ngOnInit(): void {
  }

}
