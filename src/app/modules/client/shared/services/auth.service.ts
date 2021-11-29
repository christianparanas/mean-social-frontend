import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';

// baseURL
const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${baseURL}/api/users/register`, data);
  }

  login(data: any) {
    return this.http.post(`${baseURL}/api/users/login`, data);
  }

  loginWithGoogle(data: any) {
    return this.http.post(`${baseURL}/api/users/loginwithgoogle`, data);
  }

  setSession(data: any) {
    const jwtToken = data.access_token;
    const expiresAt = moment().add(7200, 'second');

    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('jwtExpiresAt', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('jwtExpiresAt');
  }

  public isLoggedIn(): boolean {
    if (moment().isBefore(this.getExpiration()) == false) this.logout();
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration: any = localStorage.getItem('jwtExpiresAt');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
