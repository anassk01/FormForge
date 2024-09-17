// src/app/services/credit.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap ,switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';


export interface CreditInfo {
  credits: number;
  lastUpdated: Date;
  recentTransactions: CreditTransaction[];
}
export interface CreditTransaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiUrl = `${environment.apiUrl}/credits`;
  private notificationService = inject(NotificationService);
  private creditInfoSubject = new BehaviorSubject<CreditInfo | null>(null);
  constructor(private http: HttpClient) {}

  getCreditBalance(): Observable<CreditInfo> {
    return this.http.get<CreditInfo>(`${this.apiUrl}/balance`).pipe(
      tap(creditInfo => {
        this.creditInfoSubject.next(creditInfo);
        if (creditInfo.credits < 5) {
          this.notificationService.showWarning('Low credit balance. Please consider purchasing more credits.');
        }
      }),
      catchError(this.handleError)
    );
  }

  get creditInfo$(): Observable<CreditInfo | null> {
    return this.creditInfoSubject.asObservable();
  }

  addCredits(amount: number, description: string): Observable<{ credits: number; message: string }> {
    return this.http.post<{ credits: number; message: string }>(`${this.apiUrl}/add`, { amount, description }).pipe(
      tap(response => {
        this.notificationService.showSuccess(`Successfully added ${amount} credits. New balance: ${response.credits}`);
      }),
      catchError(this.handleError)
    );
  }

  useCredits(amount: number, description: string): Observable<{ credits: number; message: string }> {
    return this.http.post<{ credits: number; message: string }>(`${this.apiUrl}/use`, { amount, description }).pipe(
      tap(response => {
        this.notificationService.showInfo(`Used ${amount} credits for ${description}. Remaining balance: ${response.credits}`);
        if (response.credits < 5) {
          this.notificationService.showWarning('Low credit balance. Please consider purchasing more credits.');
        }
      }),
      catchError(this.handleError)
    );
  }

  getCreditHistory(page: number = 1, pageSize: number = 10): Observable<{ transactions: CreditTransaction[], total: number }> {
    return this.http.get<{ transactions: CreditTransaction[], total: number }>(`${this.apiUrl}/history`, {
      params: { page: page.toString(), pageSize: pageSize.toString() }
    }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.statusText}`;
    }
    console.error(errorMessage);
    this.notificationService.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  purchasePackage(packageId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/purchase-package`, { packageId });
  }

  checkCreditSufficiency(requiredCredits: number): Observable<boolean> {
    return this.getCreditBalance().pipe(
      map(creditInfo => creditInfo.credits >= requiredCredits),
      catchError(() => of(false))
    );
  }

  useCreditsWithCheck(amount: number, description: string): Observable<boolean> {
    return this.checkCreditSufficiency(amount).pipe(
      switchMap(isEnoughCredit => {
        if (isEnoughCredit) {
          return this.useCredits(amount, description).pipe(
            map(() => true),
            catchError(() => of(false))
          );
        }
        return of(false);
      }),
      catchError(() => of(false))
    );
  }

  
}