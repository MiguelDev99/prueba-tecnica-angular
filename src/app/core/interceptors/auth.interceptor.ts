import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor,  HttpRequest, HttpErrorResponse, } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    let authReq = req;

    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }       

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && req.url.includes('api.spotify.com')) {
          return this.auth.refreshAccessToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('access_token');
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              return next.handle(retryReq);
            }),
            catchError((err) => {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              return throwError(() => err);
            })
          );
        }
      
        return throwError(() => error);
      })      
    );
  }
}
