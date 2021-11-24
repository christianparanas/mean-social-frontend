import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) return next.handle(request);

    const cloned = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + jwtToken),
    });

    return next.handle(cloned);
  }
}
