import { Component,ViewChild, ElementRef, Input, Output } from '@angular/core';
import { FilesService } from "./services/files.service";
import { Router } from "@angular/router";
import { body } from './animations'
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [body.body]
})
export class AppComponent {
  title = 'jmhalire';
  public sidenavShow  = false;
  @ViewChild('asideleft') asideleft: ElementRef;
  @ViewChild('asideright') asideright: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild(HeaderComponent) header: HeaderComponent;

  @Output() forSide:boolean;
  constructor(
    public _fileService:FilesService,
    public router: Router
    ){
      this.forSide = false;
  }

  ngAfterViewInit (user:any) {
    
    // Ahora puedes utilizar el componente hijo
  }
  public eventSidenav(e:boolean){
    if(e === true) {
      this.sidenavShow = true;
    }
    else this.sidenavShow  = false;
  }
  
  public sidenavHidden(){
    console.log('jaime');
    
    this.header.openSidenav();
  }
}
