import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FilesService } from "../../services/files.service";
import { fileAnimation} from '../../animations';
import { File } from "../../interface/response";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  animations: [ fileAnimation.left, fileAnimation.right, fileAnimation.title ]
  
})
export class FilesComponent implements OnInit {


  public visualizar: string;

  public onefile:File;
  public view: boolean;
  public select:boolean;
  public classe: string;
  public title:string;


  //new
  public fileData:File;
  public upload:boolean;
  public path:string;

  constructor( 
    private _fileService: FilesService
    ) { 
      this.fileData = null;
      this.upload = null;
    }

  ngOnInit(): void {
    this._fileService.getFiles();
  }

}
