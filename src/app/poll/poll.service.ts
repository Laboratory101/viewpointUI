import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient, private storage: AngularFireStorage) { }

  fetchAllPolls(host: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/poll/load-poll/${host}`).pipe(delay(3000));
  }

  uploadImage(file: File, path: string) {
    const metaData = { contentType: file.type };
    const storageRef = this.storage.upload(path, file, metaData);
    console.log('File name: ', file.name);
  }
}
