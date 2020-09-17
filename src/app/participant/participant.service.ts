import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ParticipantService {

  constructor(private http: HttpClient) { }

  castVote(vote: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/participate/vote`, vote);
  }

  fetchPoll(pollData: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/participate/poll`, pollData);
  }
}
