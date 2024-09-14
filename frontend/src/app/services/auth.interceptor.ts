import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

// Define the AuthResponse interface
interface AuthResponse {
  token: string;
  user: any; 
}

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isRefreshing = false;
  let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  const addToken = (request: HttpRequest<unknown>, token: string) => {
    console.log('Adding token to request:', token);
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  };


  const handleError = (error: HttpErrorResponse, request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    if (error.status === 401) {
      const currentUser = authService.currentUserValue;
      if (currentUser && currentUser.role === 'admin') {
        console.log('Admin user encountered 401, logging out');
        authService.logout();
        return throwError(() => error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.refreshToken().pipe(
          switchMap((response: AuthResponse) => {
            isRefreshing = false;
            refreshTokenSubject.next(response.token);
            console.log('Token refreshed, retrying request with new token');
            return next(addToken(request, response.token));
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            console.error('Token refresh failed, logging out');
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      } else {
        return refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => {
            console.log('Using newly refreshed token for queued request');
            return next(addToken(request, token));
          })
        );
      }
    }
    return throwError(() => error);
  };

  const token = authService.getToken();
  console.log('Current token:', token);
  
  if (token && !req.url.includes('/auth/refresh-token') && !req.url.includes('/auth/login')) {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  } else {
    console.log('Not adding token to request:', req.url);
  }
  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.log('401 error encountered, handling error');
        return handleError(error, req, next);
      }
      return throwError(() => error);
    })
  );
}