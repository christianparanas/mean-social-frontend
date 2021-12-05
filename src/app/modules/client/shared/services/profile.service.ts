import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

// baseURL
const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfileData() {
    return this.http.get(`${baseURL}/api/users/profile`);
  }
}
