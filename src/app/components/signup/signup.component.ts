import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { signupAnimation } from "../../animations";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [ signupAnimation.signup, signupAnimation.logo]
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup

  public message: string
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _buider: FormBuilder
  ) { 
    this.message = '';
  }

  ngOnInit(): void {

    this.signupForm = this._buider.group(
      {
        names: new FormControl('',Validators.required),
        surnames: new FormControl('',Validators.required),
        email: new FormControl('',Validators.compose([Validators.email,Validators.required])),
        password: new FormControl('',Validators.required),
        confirmpassword: new FormControl('',Validators.required)
      }
    )
  }

  public signup() {
    this._authService.signup(this.signupForm.value).subscribe(
      res => { 
        if(res.value==true){
          localStorage.setItem('token',res.token);
          localStorage.setItem('User',res.user.names); 
          console.log(res.user);       
          this._router.navigate(['files']);
        }  
        else{
          this.message = res.message;
          this.signupForm.reset();
        } 
      },
      err => console.log(err)
    );
  }
  public closeMessage(){
    this.message = null;
  }
}
