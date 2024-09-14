// src/app/services/subscription.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreditPackage } from './credit-package.service';

export interface Subscription {
  packageId: CreditPackage;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'cancelled' | 'expired';
  stripeSubscriptionId: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = `${environment.apiUrl}/subscriptions`;

  constructor(private http: HttpClient) {}

  getCurrentSubscription(): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/current`);
  }

  subscribe(packageId: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiUrl}/subscribe`, { packageId });
  }

  cancelSubscription(): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiUrl}/cancel`, {});
  }

  upgradeSubscription(newPackageId: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiUrl}/upgrade`, { packageId: newPackageId });
  }
}