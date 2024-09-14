//src/app/app.component.ts
import { Component, inject, PLATFORM_ID, OnInit ,ViewEncapsulation , OnDestroy} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth.service';
import { CreditService ,CreditInfo } from '../app/services/credit.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { switchMap } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { ConnectionStatusComponent } from './components/workspace/connection-status/connection-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    ConnectionStatusComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  authService = inject(AuthService);
  private creditService = inject(CreditService);

  creditInfo: CreditInfo | null = null;
  private creditSubscription: Subscription | null = null;

  credits: number = 0;

  ngOnInit() {
    this.authService.checkStoredAuthData();
    if (this.authService.currentUserValue) {
      this.startCreditUpdates();
    }
  }
  ngOnDestroy() {
    this.stopCreditUpdates();
  }

  private startCreditUpdates() {
    this.creditSubscription = timer(0, 60000) // Initial call and then every minute
      .pipe(
        switchMap(() => this.creditService.getCreditBalance())
      )
      .subscribe({
        next: (info) => this.creditInfo = info,
        error: (error) => console.error('Error loading credits', error)
      });
  }

  private stopCreditUpdates() {
    if (this.creditSubscription) {
      this.creditSubscription.unsubscribe();
      this.creditSubscription = null;
    }
  }

  getCreditsTooltip(): string {
    if (!this.creditInfo) return 'Loading credit information...';
    const lastUpdated = new Date(this.creditInfo.lastUpdated).toLocaleString();
    return `Last updated: ${lastUpdated}\nRecent transactions: ${this.creditInfo.recentTransactions.length}`;
  }


  isLargeScreen(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth > 1200;
    }
    return true;
  }

  logout(): void {
    this.authService.logout();
    // Optionally, redirect to login page or home page after logout
  }

  loadCredits(): void {
    this.creditService.getCreditBalance().subscribe({
      next: (response) => this.credits = response.credits,
      error: (error) => console.error('Error loading credits', error)
    });
  }
}
