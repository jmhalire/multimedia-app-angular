import { Component, OnInit, EventEmitter, ViewChild, ElementRef, Output, Input } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FilesService } from '../../services/files.service';
import { openClose } from "../../animations";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [ openClose ]
})
export class HeaderComponent implements OnInit {
  public open: string;
  
  public isOpen:boolean;
  public open2: string;
  public display: boolean;
  public display2: boolean;

  @Output() emitEvent = new EventEmitter<boolean>();

  @ViewChild('sidenav') sidenav: ElementRef;
  constructor(
    public authService: AuthService,
    public _fileService: FilesService
    ) {
      this.display = false;
      this.display2 = false;
      this.isOpen = false;
   }
  ngOnInit(): void {
  }
  openSidenav() {
    this.isOpen = !this.isOpen;
    this.emitEvent.emit(this.isOpen);
  }


}
