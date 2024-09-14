// src/app/services/credit-package.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreditPackage {
  _id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  isSubscription: boolean;
  durationDays?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreditPackageService {
  private apiUrl = `${environment.apiUrl}/credit-packages`;

  constructor(private http: HttpClient) {}

  getCreditPackages(): Observable<CreditPackage[]> {
    return this.http.get<CreditPackage[]>(this.apiUrl);
  }

  getCreditPackage(id: string): Observable<CreditPackage> {
    return this.http.get<CreditPackage>(`${this.apiUrl}/${id}`);
  }

  createCreditPackage(packageData: Omit<CreditPackage, '_id'>): Observable<CreditPackage> {
    return this.http.post<CreditPackage>(this.apiUrl, packageData);
  }

  updateCreditPackage(id: string, packageData: Partial<CreditPackage>): Observable<CreditPackage> {
    return this.http.put<CreditPackage>(`${this.apiUrl}/${id}`, packageData);
  }

  deleteCreditPackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  purchasePackage(packageId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/purchase`, { packageId });
  }
}