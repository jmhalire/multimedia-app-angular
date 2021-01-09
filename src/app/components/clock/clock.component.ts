import { Component, OnInit } from '@angular/core';
import {ClockService} from '../../services/clock.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  datos: any;
  hora: number;
  minutos: string;
  dia: string;
  fecha: string;
  ampm: string;
  segundos: string;

  hourInit: number;
  minInit: number;
  secondInit:number;

  constructor(private hours: ClockService) { 
    this.hourInit = 0;
    this.minInit = 0;
    this.secondInit = 0;
  }


  ngOnInit() {
    this.timer();
    this.datos=this.hours.getInfoReloj();
    this.datos.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.ampm = x.ampm;
      this.segundos = x.segundo
    });
  }

  /**
   * timer
 :void  */
  public timer():void {
    ;this.secondInit += 1;
    if(this.secondInit===60){
      this.minInit += 1;
      this.secondInit = 0;
    }
    if(this.minInit===60){
      this.hourInit +=1
      this.minInit = 0;
      this.secondInit = 0;
    }
    setTimeout(()=>{this.timer()},1000);

  }
}
