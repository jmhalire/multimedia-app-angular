import { Component, OnInit,Input, EventEmitter, Output, Sanitizer, ɵSafeResourceUrl } from '@angular/core';
import { FilesService } from "../../../../services/files.service";
import { DomSanitizer } from '@angular/platform-browser';
import { File } from "../../../../interface/response";

@Component({
  selector: 'app-viewfiles',
  templateUrl: './viewfiles.component.html',
  styleUrls: ['./viewfiles.component.css']
})
export class ViewfilesComponent implements OnInit{
  @Input() onefile:File
  @Input() src:any
  @Output() close = new EventEmitter<string>();

  public descrip: boolean;
  public type:string;

  constructor(
              public _fileService: FilesService, 
              public sanitizer: DomSanitizer) { 
    this.descrip = false;
  }
  ngOnInit(): void {
    this.type = this.onefile.type;
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8080/'+this.src);

  }
  public closeViewfile(){
    this.onefile = null;
    this.close.emit();
    //this._fileService.leavetable(row);
  }

}
