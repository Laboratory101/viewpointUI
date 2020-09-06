import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private userEmail: string;

  constructor(private http: HttpClient, private auth: AuthenticateService) {
    this.auth.user$.pipe().subscribe(data => this.userEmail = data ? data.email : null)
  }

  getAuthToken(payload: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/login`, payload);
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/refresh`, { token: sessionStorage.getItem('refreshToken'), email: this.userEmail })
  }

  revokeToken(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { token: sessionStorage.getItem('refreshToken'), email: this.userEmail }
    }
    return this.http.delete(`${environment.apiURL}/auth/logout`, options);
  }
}
