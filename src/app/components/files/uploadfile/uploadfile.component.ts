import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilesService } from "../../../services/files.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { upload } from "./../../../animations";



@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
  animations: [ upload ]
})
export class UploadfileComponent implements OnInit {

  @ViewChild('file') file: ElementRef;
  @ViewChild('filename') filename: ElementRef;
  @ViewChild('filetype') filetype: ElementRef;
  @ViewChild('filesize') filesize: ElementRef;

  public size: number;
  public message: string;
  public archivo: File;
  public progress: number;
  public porcentaje: string;
  private sizeUp:string;


  constructor(private fileService: FilesService) { 
    this.progress = 0;
  }

  ngOnInit(): void {
  }


  public async fileupload(ev:any) {
    this.archivo = ev.target.files;
    this.size = await (this.file.nativeElement.files[0].size) / 1024;
    if (this.size >= 1024) {
      this.size = await (this.size) / 1024;
      this.sizeUp = this.size.toFixed(3) + ' MB';
      this.filesize.nativeElement.value = this.size.toFixed(3) + ' MB';
    }
    else {
      this.filesize.nativeElement.value = this.size.toFixed(3) + ' KB';
      this.sizeUp = this.size.toFixed(3) + ' KB';
    }
    this.filename.nativeElement.value = this.file.nativeElement.files[0].name.split('.')[0];
    this.filetype.nativeElement.value = this.file.nativeElement.files[0].type;
    this.filename.nativeElement.readOnly = false;
  }

  public upload() {
    if (this.archivo) {
      let form = new FormData();
      form.append('file', this.archivo[0]);
      form.append('filename', this.filename.nativeElement.value);
      form.append('size', this.sizeUp);
      this.fileService.UploadFile(form).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              this.porcentaje = `${this.progress}%`;
              break;
            case HttpEventType.Response:
              this.message = event.body.message;
              this.fileService.getFiles();
              console.log('Archive successfully uploaded!', event.body);
              setTimeout(() => { this.progress = 0; this.cleanfile(); }, 2500);
          }

        });
    }
    else {
      this.message = 'select a file!!!';
    }

  }

  public closeMessage() {
    this.message = null;
  }

  private cleanfile() {
    this.filename.nativeElement.value = '';
    this.filetype.nativeElement.value = '';
    this.filesize.nativeElement.value = '';
    this.file.nativeElement.value = '';
  }

}
