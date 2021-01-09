import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { File } from "../interface/response";


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private videos: File[];
  private image: File[];
  private audio: File[];
  private pdf: File[];
  private other: File[];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.videos = [];
    this.image = [];
    this.audio = [];
    this.pdf = [];
    this.other = [];
    
  }

  /**
   * getFiles
   */
  public getFiles() {
    this.videos.splice(0);
    this.image.splice(0);
    this.audio.splice(0);
    this.pdf.splice(0);
    this.other.splice(0);

    this.http.get('https://jmhalire-api.herokuapp.com/files', this.httpOptions()).subscribe((res: any) => {
      let files: File[] = res.archive;
      files.map((file, i) => {
        let type = file.type;
        if (type === 'video')
          this.videos.push(file);
        else if (type === 'image')
          this.image.push(file);
        else if (type === 'audio')
          this.audio.push(file);
        else if (type === 'pdf')
          this.pdf.push(file);
        else
          this.other.push(file);
      });
    })
  }
  /**
   * listfiles
   */
  public listfiles(type: string) {
    if (type === 'video')
      return this.videos;
    else if (type === 'image')
      return this.image;
    else if (type === 'audio')
      return this.audio;
    else if (type === 'pdf')
      return this.pdf
    else
      return this.other;
  }

  public get_img() {
    return this.http.get('http://jmhalire-api.herokuapp.com/image', this.httpOptions());
  }

  public get_aud() {
    return this.http.get('https://jmhalire-api.herokuapp.com/audio', this.httpOptions());
  }

  public get_vid() {
    return this.http.get('https://jmhalire-api.herokuapp.com/video', this.httpOptions());
  }

  public get_pdf() {
    return this.http.get<any>('https://jmhalire-api.herokuapp.com/pdf', this.httpOptions());
  }

  public get_other() {
    return this.http.get<any>('https://jmhalire-api.herokuapp.com/other', this.httpOptions());
  }

  /**
   * UploadFile
   */
  public UploadFile(file: FormData): Observable<any> {
    return this.http.post('https://jmhalire-api.herokuapp.com/upload', file, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.authService.getToken()}` }),
      reportProgress: true,
      observe: 'events'
    })
  }

  /**
     * viewFile
     */
  public viewFile(id) {
    return this.http.get<any>(`https://jmhalire-api.herokuapp.com/file/${id}`, this.httpOptions())
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  /**
   * editFile
   */
  public EditFile(file) {
    return this.http.post<any>('https://jmhalire-api.herokuapp.com/edit', file, this.httpOptions());
  }

  /**
   * delete
   */
  public delete(id, id_bucket) {
    const ids_file = { id, id_bucket }
    return this.http.post<any>('https://jmhalire-api.herokuapp.com/delete', ids_file, this.httpOptions())
  }

  /**
   * getHTTPoptons
   */
  public httpOptions(): any {
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.authService.getToken()}` }) };
  }
  
}

