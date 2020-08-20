import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class PollService {

  constructor(private http: HttpClient) { }

  fetchAllPolls(host: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/poll/load-poll/${host}`);
  }

  savePollDetails(pollData: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/poll/save-poll`, pollData);
  }

  fetchPollById(pollId: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/poll/fetch-poll/${pollId}`);
  }

  updatePollDetails(pollData: any): Observable<any> {
    return this.http.put(`${environment.apiURL}/poll/update-poll/${pollData._id}`, pollData)
  }

  deletePollDetails(pollId: string): Observable<any> {
    return this.http.delete(`${environment.apiURL}/poll/delete-poll/${pollId}`)
  }
}
