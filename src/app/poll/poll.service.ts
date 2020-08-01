import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }

  fetchAllPolls(host: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/poll/load-poll/${host}`).pipe(delay(3000));
  }
}
