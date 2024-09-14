// src/app/services/stripe.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private apiUrl = `${environment.apiUrl}/payments`;
  private stripePromise: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(environment.stripePublicKey);
  }

  createPaymentIntent(amount: number): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(`${this.apiUrl}/create-payment-intent`, { amount });
  }

  async confirmPayment(clientSecret: string): Promise<void> {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          token: 'tok_visa' // Use a test token in development
        }
      }
    });

    if (result.error) {
      throw result.error;
    }
  }
}