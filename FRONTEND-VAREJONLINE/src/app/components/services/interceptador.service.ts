import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthApiService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })

  export class AuthHtppInterceptorService implements HttpInterceptor {

    constructor() { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
  
      if (sessionStorage.getItem('email') && sessionStorage.getItem('jwttoken')) {
        req = req.clone({
          setHeaders: {
            Authorization: sessionStorage.getItem('jwttoken')
          }
        })
      }
      return next.handle(req);
    }
  }