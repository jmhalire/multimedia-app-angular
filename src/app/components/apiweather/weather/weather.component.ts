import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { weatherDate } from '../../../animations';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  animations: [ weatherDate ]
})
export class WeatherComponent implements OnInit {

  @Input() city:any;
  @Output() date = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * removeCity
   */
  public removeDate(city:any) {
    this.date.emit(city)
  }
}
