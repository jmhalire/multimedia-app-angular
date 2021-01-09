import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { weatherInput } from "../../animations";

@Component({
  selector: 'app-apiweather',
  templateUrl: './apiweather.component.html',
  styleUrls: ['./apiweather.component.css'],
  animations: [ weatherInput ]
}) 
export class ApiweatherComponent implements OnInit {

  public cityes: any[];
  constructor(
    private apiService: ApiService
  ) { 
    this.cityes = []
  }

  ngOnInit(): void {
  }
  public weather(namecity: HTMLInputElement) {
    //this.cityes.push({name:namecity.value,main:{temp:18,humidity:45,pressure:95,temMin:12,temMax:23},sys:{country:'Peru'}})
    this.apiService.getWeather(namecity.value).subscribe(
      data => {
        this.cityes.push(data)
        console.log(this.cityes);
      },
      err => console.log(err)
    )
    namecity.value = '';
    return false;
  }

  /**
   * removedate
e   */
  public removedate(e:any) {
    let index:number
    for (let i = 0; i < this.cityes.length; i++) {
      if(this.cityes[i].name === e.name){
        index = i;
        break;
      }
    }
    this.cityes.splice(index,1)    
  }
}
