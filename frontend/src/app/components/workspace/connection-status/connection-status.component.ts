import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WebSocketService } from '../../../services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="connection-status">
      <mat-icon [ngClass]="status">
        {{ getStatusIcon() }}
      </mat-icon>
      <span>{{ getStatusText() }}</span>
      <span *ngIf="reconnectionAttempts > 0">(Attempt {{ reconnectionAttempts }})</span>
    </div>
  `,
  styles: [`
    .connection-status {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-right: 16px;
    }
    mat-icon {
      margin-right: 8px;
    }
    .connected { color: #4caf50; }
    .disconnected { color: #f44336; }
    .connecting { color: #ff9800; }
  `]
})
export class ConnectionStatusComponent implements OnInit, OnDestroy {
  status: 'connected' | 'disconnected' | 'connecting' = 'disconnected';
  reconnectionAttempts: number = 0;
  private statusSubscription: Subscription | null = null;
  private attemptsSubscription: Subscription | null = null;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.statusSubscription = this.webSocketService.getConnectionStatus()
      .subscribe(status => this.status = status);
    
    this.attemptsSubscription = this.webSocketService.getReconnectionAttempts()
      .subscribe(attempts => this.reconnectionAttempts = attempts);
  }

  ngOnDestroy() {
    if (this.statusSubscription) this.statusSubscription.unsubscribe();
    if (this.attemptsSubscription) this.attemptsSubscription.unsubscribe();
  }

  getStatusIcon(): string {
    switch (this.status) {
      case 'connected': return 'check_circle';
      case 'disconnected': return 'error';
      case 'connecting': return 'sync';
    }
  }

  getStatusText(): string {
    switch (this.status) {
      case 'connected': return 'Connected';
      case 'disconnected': return 'Disconnected';
      case 'connecting': return 'Connecting';
    }
  }
}