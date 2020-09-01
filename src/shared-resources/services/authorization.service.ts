import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  getAuthToken(payload: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/login`, payload);
  }
}
