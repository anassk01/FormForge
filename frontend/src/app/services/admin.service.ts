// frontend/src/app/services/admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams,HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap ,map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export interface AnalyticsData {
  activeSubscribers: number;
  monthlyRecurringRevenue: number;
  churnRate: number;
  newSubscribers: number;
  averageRevenuePerUser: number;
  subscriptionGrowthRate: number;
}


export interface User {
  id: string;
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  createdAt: Date;
  lastLoginAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  packageId: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  stripeSubscriptionId: string;
}
export interface CreditPackage {
  _id?: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  isSubscription: boolean;
  durationDays: number;
  stripePriceId: string;
}
export interface CreditPackageUpdate extends CreditPackage {
  _id: string;  // Make _id required for updates
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  
  getSubscriptionAnalytics(): Observable<AnalyticsData> {
    console.log('Fetching subscription analytics');
    const token = this.authService.getToken();
    console.log('Current token:', token); // Add this line for debugging
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<AnalyticsData>(`${this.apiUrl}/subscription-analytics`, { headers }).pipe(
      tap(response => console.log('Received analytics:', response)),
      catchError(error => {
        console.error('Error fetching analytics:', error);
        return throwError(() => error);
      })
    );
  }
  getAllUsers(page: number = 1, limit: number = 10, sort: string = 'name', order: string = 'asc', search?: string): Observable<{ users: User[], total: number, page: number, totalPages: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort)
      .set('order', order);
  
    if (search && search.trim() !== '') {
      params = params.set('search', search.trim());
    }
  
    return this.http.get<{ users: User[], total: number, page: number, totalPages: number }>(`${this.apiUrl}/users`, { params }).pipe(
      map(response => ({
        ...response,
        users: response.users.map(user => ({
          ...user,
          id: user._id // Ensure id is set to _id for consistency
        }))
      })),
      tap(response => console.log('Received response:', response)),
      catchError(error => {
        console.error('Error in getAllUsers:', error);
        return throwError(() => error);
      })
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(() => new Error('Failed to fetch user details'));
      })
    );
  }

  updateUser(id: string, update: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, update);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.statusText}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


  suspendUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/suspend`, {}).pipe(
      catchError(this.handleError)
    );
  }
  
  activateUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/activate`, {}).pipe(
      catchError(this.handleError)
    );
  }

  getAllSubscriptions(page: number = 1, limit: number = 10): Observable<{ subscriptions: Subscription[], total: number }> {
    return this.http.get<{ subscriptions: Subscription[], total: number }>(`${this.apiUrl}/subscriptions`, {
      params: { page: page.toString(), limit: limit.toString() }
    });
  }

  getSubscription(id: string): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/subscriptions/${id}`);
  }

  cancelSubscription(id: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiUrl}/subscriptions/${id}/cancel`, {});
  }

  getAllCreditPackages(): Observable<CreditPackage[]> {
    return this.http.get<CreditPackage[]>(`${this.apiUrl}/credit-packages`);
  }

  createCreditPackage(packageData: Omit<CreditPackage, 'id'>): Observable<CreditPackage> {
    console.log('Creating credit package:', packageData);
    return this.http.post<CreditPackage>(`${this.apiUrl}/credit-packages`, packageData)
      .pipe(catchError(this.handleError));
  }

  updateCreditPackage(id: string, packageData: Partial<CreditPackage>): Observable<CreditPackage> {
    return this.http.put<CreditPackage>(`${this.apiUrl}/credit-packages/${id}`, packageData);
  }

  deleteCreditPackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/credit-packages/${id}`);
  }

  testAdminRoute(): Observable<any> {
    const url = `${this.apiUrl}/test`;
    console.log('Testing admin route:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Admin route test response:', response)),
      catchError(error => {
        console.error('Error testing admin route:', error);
        return throwError(() => error);
      })
    );

  }

  testUsersRoute(): Observable<any> {
    const url = `${this.apiUrl}/users-test`;
    console.log('Testing users route:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Users route test response:', response)),
      catchError(error => {
        console.error('Error testing users route:', error);
        return throwError(() => error);
      })
    );
  }

}