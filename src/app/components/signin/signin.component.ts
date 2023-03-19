import { Component, OnInit, Host, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AppComponent } from 'src/app/app.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { signinAnimations } from 'src/app/animations';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [ signinAnimations.signin, signinAnimations.logo]
})
export class SigninComponent implements OnInit {
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;

  signinForm: FormGroup;


  @Host() private app: AppComponent
  public message: string;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.signinForm = this._builder.group(
      {
        email:new FormControl('',Validators.compose([Validators.email,Validators.required])),
        password: new FormControl('',Validators.required)
      }
    )


  }
  public signin(){

    if(this.signinForm.value.email==='')
      this.email.nativeElement.focus();
    else if(this.signinForm.value.password===''){
      this.password.nativeElement.focus();
    }
    else{
      this._authService.signin(this.signinForm.value).subscribe(
        res => {    
          if(res.value==true){
            localStorage.setItem('token',res.token);
            localStorage.setItem('User',res.user.names);            
            this._router.navigate(['files']);

          }else{
            this.message = res.message;
            this.signinForm.reset();
            this.email.nativeElement.focus();
          }
        },
        err=>console.log(err)
        );
    }
  }

  public closeMessage(){
    this.message = null;
  }
}
