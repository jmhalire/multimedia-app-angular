import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FilesService } from "../../../services/files.service";
import { listFileAnimation } from "../../../animations";

//interfaces
import { File } from "../../../interface/response";


@Component({
  selector: 'app-listfiles',
  templateUrl: './listfiles.component.html',
  styleUrls: ['./listfiles.component.css'],
  animations: [listFileAnimation.table, listFileAnimation.InsertRemove]
})
export class ListfilesComponent implements OnInit {

  public visualizar: string;
  public fileData: any;
  public onefile: any;
  public view: boolean;
  public select: boolean;
  private rowselec: any;
  public classe: string;
  public title: string;
  public namefile: string;
  public message: string;

  public fileForEdit: any;
  public length: number;
  public NotFile: boolean;
  public path: any;
  public loadingList: boolean;
  public loading:boolean;
  public datefile: File[];

  @ViewChild('nameEdit') nameEdit: ElementRef;
  @ViewChild('typeEdit') typeEdit: ElementRef;
  @ViewChild('uploadEdit') uploadEdit: ElementRef;
  @ViewChild('updateEdit') updateEdit: ElementRef;
  @ViewChild('sizeEdit') sizeEdit: ElementRef;


  constructor(
    public _fileService: FilesService,
    private routes: ActivatedRoute
  ) {
    this.select = false;
    this.namefile = '';
    this.length = 0;
    this.datefile = [];
    this.loading = false;
    this.NotFile = false;
    this.loadingList = true;
  }
  ngOnInit(): void {

    setTimeout(()=>{
      this.loadingList = false;
      this.startComponent();
    },1000)
    
  }

/**
 * startComponent
 */
public startComponent() {
  let type = this.routes.snapshot.routeConfig.path;
    if (type == 'video') {
      this.datefile = this._fileService.listfiles('video');
      if (this.datefile.length > 0) {
        this.visualizar = 'Reproduce';
        this.classe = 'fa-video';
        this.title = 'VIDEOS';
      }
    }else if (type == 'image') {
      this.datefile = this._fileService.listfiles('image');
      if(this.datefile.length>0){
        this.visualizar = "Visualize";
        this.classe = 'fa-image';
        this.title = 'IMAGES';
      }
      
    }else if (type == 'audio') {
      this.datefile = this._fileService.listfiles('audio');
      if(this.datefile.length>0){
        this.visualizar = 'Reproduce';
        this.classe = 'fa-music';
        this.title = 'AUDIOS';
      }
      
    }else if (type == 'pdf') {
      this.datefile = this._fileService.listfiles('pdf');
      if(this.datefile.length>0){
        this.visualizar = 'Visualize';
        this.classe = 'fa-file';
        this.title = 'PDFs';
      }
     
    }else {
      this.datefile = this._fileService.listfiles('other');
      if(this.datefile.length>0){
        this.visualizar = 'Descargar';
        this.classe = 'fa-download';
        this.title = 'OTHER FILE';
      }
    }

    if(this.datefile.length===0){
      this.NotFile = true;
    }
    this.view = false;
    this.pantalla();
}

  public pantalla() {
    if (screen.width < 700) {
      this.visualizar = "";
    }
  }

  public viewfile(file: File) {
    // console.log('funcion view');
    this.closeViewfile();
    this.loading = true;
    this._fileService.viewFile(file.id_bucket).subscribe(
      (res: any) => {
        if (res.path == '') {
          this._fileService.viewFile(file.id_bucket).subscribe(
            (res: any) => {
              this.loading = false;
              this.path = res.path;
              this.onefile = file;
              this.view = true;
            });
        }
        else {
          this.loading = false;
          this.path = res.path;
          this.onefile = file;
          this.view = true;
        }
      },
      err => console.log(err)
    )    
  }

  public rowselect(row:any) {
    //before
    this.leavetable();
    row.style.backgroundColor = '#0055c5';
    row.style.textAlign = 'center';
    this.rowselec = row;
    this.select = true;
  }

  public closeViewfile() {
    this.onefile = null;
    this.view = false;
  }

  public leavetable() {
    if (this.select) {
      this.rowselec.style.color = '';
      this.rowselec.style.backgroundColor = '';
      this.rowselec.style.textAlign = '';
    }
  }

  public moreOptionsOver(options: HTMLDivElement) {
    options.style.display = 'block'
  }

  public moreOptionsLeave(options: HTMLDivElement) {
    options.style.display = 'none';
  }


  public EditOrDelete(file: File) {
    this.fileForEdit = file;
    this.nameEdit.nativeElement.value = this.fileForEdit.name;
    this.typeEdit.nativeElement.value = this.fileForEdit.type;
    this.uploadEdit.nativeElement.value = this.fileForEdit.createdAt;
    this.updateEdit.nativeElement.value = this.fileForEdit.updatedAt;
    this.sizeEdit.nativeElement.value = this.fileForEdit.size;
    this.namefile = this.fileForEdit.name;
  }

  /**
   * updatefile
   */
  public updatefile() {
    if (this.fileForEdit) {
      let file = {
        id: this.fileForEdit._id,
        name: this.nameEdit.nativeElement.value
      }
      this._fileService.EditFile(file).subscribe(
        res => {
          this._fileService.getFiles();
        },
        err => console.log(err)
      );
    }
  }

  /**
   * delete
   */
  public delete() {
    if (this.fileForEdit) {
      this._fileService.delete(this.fileForEdit._id, this.fileForEdit.id_bucket).subscribe(
        (res: any) => {
          console.log(res.message);
          this._fileService.getFiles();
        },
        err => console.log(err)
      )
    }
  }
}
