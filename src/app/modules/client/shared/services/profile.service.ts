import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getCurrentUserId() {
    return this.http.get(`${baseURL}/api/users/profile`).pipe(
      map((response: any) => {
        return {
          userId: response.id,
        };
      })
    );
  }
}
