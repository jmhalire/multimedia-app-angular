import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { userlogin, user } from "../interface/response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  public signin(user:any){
    return this.http.post<userlogin>('https://jmhalire-api.herokuapp.com/signin',user);
  }

  public signup(newuser:any){
    return this.http.post<userlogin>('https://jmhalire-api.herokuapp.com/signup',newuser);
  }

  public dateUser(){
    return this.http.get('https://jmhalire-api.herokuapp.com/user/date', this.httpOptions());
  }

  public updateUser(dateUser:user){
    return this.http.post<any>('https://jmhalire-api.herokuapp.com/user/update',dateUser, this.httpOptions());
  }

  public loggedIn(){
    return !!localStorage.getItem('token'); //si existe devuelve un true o false
  }

  public logout(){
    localStorage.removeItem('token');
  }

  public getToken(){
    return localStorage.getItem('token'); 
  }
  public getUser(){
    return localStorage.getItem('User');
  }

  /**
   * httpOptions
   */
  public httpOptions():any {
    return {headers: new HttpHeaders({'Authorization': `Bearer ${this.getToken()}`})};
  }
}
