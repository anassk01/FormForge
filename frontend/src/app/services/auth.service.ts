  // src/app/services/auth.service.ts
  import { Injectable, inject, PLATFORM_ID } from '@angular/core';
  import { BehaviorSubject, Observable,throwError,of } from 'rxjs';
  import { environment } from '../../environments/environment';
  import { isPlatformBrowser } from '@angular/common';
  import { Router } from '@angular/router';
  import { JwtHelperService } from '@auth0/angular-jwt';
  import { catchError, switchMap, tap,map } from 'rxjs/operators';
  import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    requires2FA: boolean;
    twoFactorCompleted: boolean;
    isEmailVerified: boolean;
  }

  interface AuthResponse {
    token: string;
    user: User;
    refreshToken: string; 
    requiresVerification?: boolean
    
  }

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private platformId = inject(PLATFORM_ID);
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;
    private jwtHelper: JwtHelperService = new JwtHelperService();
    private refreshTokenTimeout: any;
    private  STORAGE_KEY = 'auth_data';

    constructor(
      private http: HttpClient,
      private router: Router
    ) {
      this.currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
      this.currentUser = this.currentUserSubject.asObservable();
      console.log('AuthService initialized with user:', this.currentUserSubject.value);
    }
    
    getTwoFAStatus(): Observable<{ enabled: boolean }> {
      return this.http.get<{ enabled: boolean }>(`${environment.apiUrl}/auth/2fa-status`);
    }
    public get currentUserValue(): User | null {
      return this.currentUserSubject.value;
    }

    private getStoredUser(): User | null {
      if (isPlatformBrowser(this.platformId)) {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
      }
      return null;
    }

    enable2FA(): Observable<{ secret: string; otpauthUrl: string; qrCodeDataUrl: string }> {
      return this.http.post<{ secret: string; otpauthUrl: string; qrCodeDataUrl: string }>(`${environment.apiUrl}/auth/enable-2fa`, {});
    }
  verify2FA(token: string): Observable<{ verified: boolean; message: string }> {
    console.log('Verifying 2FA with token:', token);
    return this.http.post<{ verified: boolean; message: string }>(`${environment.apiUrl}/auth/verify-2fa`, { token })
      .pipe(
        tap(response => console.log('2FA verification response:', response)),
        catchError(error => {
          console.error('Error during 2FA verification:', error);
          return throwError(() => error);
        })
      );
  }
    disable2FA(): Observable<{ disabled: boolean; message: string }> {
      return this.http.post<{ disabled: boolean; message: string }>(`${environment.apiUrl}/auth/disable-2fa`, {});
    }
    

    login2FA(email: string, password: string, token: string): Observable<User> {
      return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login-2fa`, { email, password, token })
        .pipe(
          tap(response => {
            if (!response.user.requires2FA) {
              this.handleAuthentication(response, true);
            }
          }),
          map(response => response.user)
        );
    }
    private checkEmailVerificationStatus(userId: string): Observable<boolean> {
      const url = `${environment.apiUrl}/auth/email-verification-status/${userId}`;
      console.log('Checking email verification status:', url);
      return this.http.get<{ isVerified: boolean }>(url)
        .pipe(
          tap(response => console.log('Email verification response:', response)),
          map(response => response.isVerified),
          catchError(error => {
            console.error('Error checking email verification status:', error);
            if (error.status === 404) {
              console.error('Route not found. Make sure the backend route is correctly set up.');
            }
            // If there's an error, assume the email is not verified
            return of(false);
          })
        );
    }
    
    login(email: string, password: string, rememberMe: boolean): Observable<User> {
      console.log('Attempting login for email:', email);
      return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, password, rememberMe })
        .pipe(
          tap(response => {
            console.log('Login response received:', response);
            this.handleAuthentication(response, rememberMe);
          }),
          switchMap(response => {
            return this.checkEmailVerificationStatus(response.user.id).pipe(
              map(isVerified => {
                response.user.isEmailVerified = isVerified;
                return response.user;
              })
            );
          })
        );
    }
    isTokenValid(): boolean {
      const token = this.getToken();
      console.log('Checking token validity for token:', token);
      const isValid = !!token && !this.jwtHelper.isTokenExpired(token);
      console.log('Is token valid?', isValid);
      return isValid;
    }

    private handleAdminAuthentication(authResult: AuthResponse, rememberMe: boolean): void {
      console.log('Handling admin authentication:', authResult);
      const expirationDate = this.jwtHelper.getTokenExpirationDate(authResult.token);
      this.setAuthData(authResult.token, authResult.refreshToken, authResult.user, expirationDate!, rememberMe);
      this.currentUserSubject.next(authResult.user);
      console.log('Admin token stored:', authResult.token);
    }
    

    private handleAuthentication(authResult: AuthResponse, rememberMe: boolean): void {
      console.log('Handling authentication:', authResult);
      const expiresIn = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
      const expirationDate = new Date(new Date().getTime() + expiresIn);
      console.log('Expiration date:', expirationDate);
      this.setAuthData(authResult.token, authResult.refreshToken, authResult.user, expirationDate, rememberMe);
      this.startRefreshTokenTimer();
    }
    private setAuthData(token: string, refreshToken: string, user: User, expirationDate: Date, rememberMe: boolean): void {
      const authData = { token, refreshToken, user, expirationDate: expirationDate.toISOString() };
      console.log('Setting auth data:', authData);
      if (isPlatformBrowser(this.platformId)) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(this.STORAGE_KEY, JSON.stringify(authData));
        console.log('Auth data stored in', rememberMe ? 'localStorage' : 'sessionStorage');
      }
      this.currentUserSubject.next(user);
    }
    
    private startRefreshTokenTimer() {
      const token = this.getToken();
      if (!token) return;

      const expires = this.jwtHelper.getTokenExpirationDate(token)!.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken().subscribe();
      }, Math.max(0, expires));
    }


    private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    }


  private storeAuthData(token: string, user: User, expirationDate: Date | null, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(user));
    if (expirationDate) {
      storage.setItem('expirationDate', expirationDate.toISOString());
    }
    console.log('Auth data stored:', { token, user, expirationDate });
  }

    register(userData: { name: string; email: string; password: string }): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/register`, userData).pipe(
        catchError(this.handleError)
      );
    }
    
    

    sendVerificationEmail(email: string): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/send-verification-email`, { email });
    }
    verifyEmail(token: string): Observable<any> {
      return this.http.get(`${environment.apiUrl}/auth/verify-email/${token}`).pipe(
        catchError(this.handleVerificationError)
      );
    }
    
    private handleVerificationError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'An error occurred during email verification.';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else if (error.status === 400) {
        errorMessage = error.error.message || 'Invalid or expired verification token';
      }
      return throwError(() => new Error(errorMessage));
    }
    

    requestPasswordReset(email: string): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/request-password-reset`, { email });
    }
    resendVerificationEmail(email: string): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/resend-verification-email`, { email }).pipe(
        catchError(this.handleError)
      );
    }
    
    resetPassword(token: string, newPassword: string): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/reset-password`, { token, newPassword });
    }
    changePassword(currentPassword: string, newPassword: string): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/change-password`, { currentPassword, newPassword });
    }
      



    logout(): void {
      console.log('Logging out user:', this.currentUserValue?.email);
      this.stopRefreshTokenTimer();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expirationDate');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('expirationDate');
        console.log('Cleared auth data from storage');
      }
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']); 
    }

    checkStoredAuthData(): void {
      if (isPlatformBrowser(this.platformId)) {
        const authData = JSON.parse(localStorage.getItem('authData') || sessionStorage.getItem('authData') || 'null');
        if (authData && new Date(authData.expirationDate) > new Date()) {
          this.setAuthData(authData.token, authData.refreshToken, authData.user, new Date(authData.expirationDate), true);
          this.autoLogout(new Date(authData.expirationDate));
        } else {
          this.logout();
        }
      }
    }
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
    
    private autoLogout(expirationDate: Date | null): void {
      if (expirationDate) {
        const expiresIn = expirationDate.getTime() - Date.now();
        setTimeout(() => this.logout(), expiresIn);
      }
    }

    isLoggedIn(): boolean {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      return !!token && !this.jwtHelper.isTokenExpired(token);
    }
    getToken(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        const authDataString = localStorage.getItem(this.STORAGE_KEY) || sessionStorage.getItem(this.STORAGE_KEY);
        if (authDataString) {
          const authData = JSON.parse(authDataString);
          return authData?.token || null;
        }
      }
      return null;
    }
    
    private getRefreshToken(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        const authDataString = localStorage.getItem(this.STORAGE_KEY) || sessionStorage.getItem(this.STORAGE_KEY);
        if (authDataString) {
          const authData = JSON.parse(authDataString);
          return authData.refreshToken || null;
        }
      }
      return null;
    }
    
    refreshToken(): Observable<AuthResponse> {
      console.log('Attempting to refresh token');
      const currentUser = this.currentUserValue;
      if (currentUser && currentUser.role === 'admin') {
        console.log('Admin user, skipping token refresh');
        return throwError(() => new Error('Token refresh not required for admin'));
      }
      
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        console.error('No refresh token available');
        this.logout();
        return throwError(() => new Error('No refresh token available'));
      }
  
      return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh-token`, { refreshToken }).pipe(
        tap(response => {
          console.log('Refresh token response:', response);
          this.handleAuthentication(response, true);
        }),
        catchError(error => {
          console.error('Error refreshing token:', error);
          this.logout();
          return throwError(() => error);
        })
      );
    }


    isAdmin(): boolean {
      const currentUser = this.currentUserValue;
      return currentUser?.role === 'admin';
    }

  }
