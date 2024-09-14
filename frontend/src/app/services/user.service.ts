// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  _id: string;
  name: string;
  email: string;
  credits: number;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  updateUser(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/me`, userData);
  }

  getUserCreditHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/me/credit-history`);
  }
}