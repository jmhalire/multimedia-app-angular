import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { token_api_weather } from "../tokens";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey : string;
  private URI_API : string;

  constructor(private http : HttpClient) {
    this.apiKey  = token_api_weather;  
  }


  public getWeather(cityName: string){
    this.URI_API = `http://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&q=`;
    return this.http.get(`${this.URI_API}${cityName}`);
  }

}
