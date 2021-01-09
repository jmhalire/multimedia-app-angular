import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { user } from 'src/app/interface/response';
import { profile } from "../../animations";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [ profile ]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  public message: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUser();

  }

  /**
   * getUser
   */
  public getUser() {
    this.authService.dateUser().subscribe(
      (data: any) => {
        let user: user = data.user;
        this.showUser(user);
      },
      err => console.log(err)
    )
  }

  /**
   * fecha
   */
  public fecha(date: string): string {
    let f: string[] = date.split('T');
    let h: string[] = f[1].split('.');
    return f[0] + ' - ' + h[0];

  }

  /**
   * updateUser
   */
  public updateUser() {
    console.log(this.profileForm.value);

    this.authService.updateUser(this.profileForm.value).subscribe(
      (res: any) => {
        this.message = res.message;
        localStorage.setItem('User', res.names)
        this.getUser();
      }, err => console.log(err)
    );
  }

  /**
   * showUser
user:user   */
  public showUser(user: user) {
    this.profileForm = this.formBuilder.group(
      {
        id: user.id,
        names: new FormControl(user.names, Validators.required),
        surnames: new FormControl(user.surnames, Validators.required),
        email: new FormControl(user.email, Validators.compose([Validators.email, Validators.required])),
        createdAt: new FormControl(user.createdAt, Validators.required),
        updatedAt: new FormControl(user.updatedAt, Validators.required)
      }
    )
  }

  /**
   * closeMessage
   */
  public closeMessage() {
    this.message = null;
  }
}
