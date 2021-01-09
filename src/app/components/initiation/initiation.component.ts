import { Component, OnInit } from '@angular/core';
import { initiation } from "../../animations";

@Component({
  selector: 'app-initiation',
  templateUrl: './initiation.component.html',
  styleUrls: ['./initiation.component.css'],
  animations: [ initiation.logo, initiation.welcome, initiation.definition]
})
export class InitiationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
