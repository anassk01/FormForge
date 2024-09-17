//src/app/components/time-management/timer.component.ts
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { TimerSettings } from './time-management.types';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressBarModule, FormatTimePipe, MatIconModule],
  template: `
    <div class="timer">
      <div class="time-display-container">
        <div class="time-display">{{ currentTime() | formatTime:'ms' }}</div>
        
        <button mat-icon-button 
                class="reset-current-button"
                (click)="resetCurrentPhase($event)"
                [disabled]="isAllSessionsCompleted()"
                aria-label="Reset current phase">
          <mat-icon>refresh</mat-icon>
        </button>
      </div>
      <mat-progress-bar [value]="progress()"></mat-progress-bar>
      <div class="timer-info">
        {{ currentSessionLabel() }} - {{ currentPhase() }}
      </div>
      <div class="controls">
        <button mat-raised-button color="primary" 
                (click)="toggleTimer($event)"
                [disabled]="readOnly || isAllSessionsCompleted()">
          {{ isRunning() ? 'Pause' : 'Start' }}
        </button>
        <button mat-raised-button 
                (click)="skipPhase($event)" 
                [disabled]="readOnly || !isRunning() || isAllSessionsCompleted()">
          Skip
        </button>
        <button mat-raised-button 
                (click)="resetTimer($event)"
                [disabled]="readOnly">
          Reset All
        </button>
      </div>
      <div class="completed-sessions">
        <h4>Completed Sessions</h4>
        <ul>
          @for (session of completedSessions(); track session.id) {
            <li>
              {{ session.label }}: 
              {{ session.phase | titlecase }} - 
              {{ session.duration | formatTime:'ms' }}
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .timer .timer-info {
      font-weight: bold;
      color: #3498db;
    }
    .timer mat-progress-bar {
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
    }
    .time-display-container {
      position: relative;
      padding-bottom: 30px; // Add space for the reset button
    }
    .reset-current-button {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #555;
      background-color: transparent;
      &:hover:not(:disabled) {
        color: #3498db;
      }
      &:disabled {
        opacity: 0.5;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {
  @Input() settings!: TimerSettings;
  @Input() savedData: any = null;
  @Input() readOnly: boolean = false;
  @Output() valueChange = new EventEmitter<any>();
  
  progress = signal(0);
  currentTime = signal(0);
  isRunning = signal(false);
  currentPhase = signal<'work' | 'break' | 'long break'>('work');
  currentSession = signal(1);
  completedSessions = signal<Array<{ id: number, sessionNumber: number, label: string, phase: string, duration: number }>>([]);
  isAllSessionsCompleted = signal(false);
  private intervalId: number | null = null;
  private phaseDuration = 0;
  private phaseStartTime = 0;
  private sessionIdCounter = 0;
  
  constructor() {
    effect(() => {
      if (this.isRunning()) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    });
  }
  
  ngOnInit() {
    if (this.savedData) {
      this.loadSavedData(this.savedData);
    } else {
      this.resetTimer();
    }
  }
  
  currentSessionLabel = computed(() => {
    const sessionLabels = this.settings.sessionLabels;
    const currentSession = this.currentSession();
    const currentPhase = this.currentPhase();
    const totalSessions = this.settings.sessions;
    if (currentSession > totalSessions) {
      return 'All sessions completed';
    }
    if (sessionLabels && sessionLabels[currentSession]) {
      const phaseLabel = currentPhase === 'work' ? sessionLabels[currentSession].work : sessionLabels[currentSession].break;
      if (phaseLabel) {
        return `Session ${currentSession}: ${phaseLabel}`;
      }
    }
    
    return `Session ${currentSession}: ${this.capitalizeFirstLetter(currentPhase)}`;
  });

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  toggleTimer(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isRunning.update(running => !running);
    if (this.isRunning()) {
      this.startTimer();
      console.log('Timer resumed');
    } else {
      this.stopTimer();
      console.log('Timer paused');
    }
  }
  
  skipPhase(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isRunning()) {
      this.completeCurrentPhase();
      this.moveToNextPhase();
    }
  }
  
  resetTimer(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.stopTimer();
    this.currentSession.set(1);
    this.currentPhase.set('work');
    this.progress.set(0);
    this.completedSessions.set([]);
    this.sessionIdCounter = 0;
    this.isAllSessionsCompleted.set(false);
    this.isRunning.set(false);  // Ensure the timer is not running after reset
  
    this.phaseDuration = this.settings.workDuration;
    this.currentTime.set(this.phaseDuration);
    this.phaseStartTime = Date.now();
  
    console.log('Timer reset:', {
      currentPhase: this.currentPhase(),
      currentSession: this.currentSession(),
      phaseDuration: this.phaseDuration,
      currentTime: this.currentTime(),
      isRunning: this.isRunning()
    });
  }
  
  resetCurrentPhase(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.isAllSessionsCompleted()) return;
  
    this.currentTime.set(this.phaseDuration);
    this.phaseStartTime = Date.now();
    this.updateProgress();
  
    console.log('Current phase reset:', {
      currentPhase: this.currentPhase(),
      currentSession: this.currentSession(),
      phaseDuration: this.phaseDuration,
      currentTime: this.currentTime()
    });
  }
  
  private startTimer() {
    if (this.intervalId !== null) return;
    
    this.phaseStartTime = Date.now() - (this.phaseDuration - this.currentTime());
    this.intervalId = window.setInterval(() => {
      const now = Date.now();
      const elapsed = now - this.phaseStartTime;
      if (elapsed >= this.phaseDuration) {
        this.completeCurrentPhase();
        this.moveToNextPhase();
      } else {
        this.currentTime.set(this.phaseDuration - elapsed);
        this.updateProgress();
      }
    }, 100);
    console.log('Timer started');
  }
  
  private stopTimer() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  private completeCurrentPhase() {
    const elapsedTime = this.phaseDuration - this.currentTime();
    this.completedSessions.update(sessions => [
      ...sessions,
      {
        id: ++this.sessionIdCounter,
        sessionNumber: this.currentSession(),
        label: this.currentSessionLabel(),
        phase: this.currentPhase(),
        duration: elapsedTime
      }
    ]);
  }
  
  private moveToNextPhase() {
    if (this.currentPhase() === 'work') {
      if (this.currentSession() % this.settings.longBreakInterval === 0) {
        this.currentPhase.set('long break');
        this.phaseDuration = this.settings.longBreakDuration;
      } else {
        this.currentPhase.set('break');
        this.phaseDuration = this.settings.breakDuration;
      }
    } else {
      this.currentPhase.set('work');
      this.phaseDuration = this.settings.workDuration;
      this.currentSession.update(session => session + 1);
      
      if (this.currentSession() > this.settings.sessions) {
        this.isAllSessionsCompleted.set(true);
        this.isRunning.set(false);
        this.stopTimer();
        return;
      }
      
    }
  
    this.currentTime.set(this.phaseDuration);
    this.phaseStartTime = Date.now();
    this.updateProgress();
  
    console.log('Moved to next phase:', {
      currentPhase: this.currentPhase(),
      currentSession: this.currentSession(),
      phaseDuration: this.phaseDuration,
      currentTime: this.currentTime()
    });
  
    this.valueChange.emit({
      completedSessions: this.completedSessions(),
      currentPhase: this.currentPhase(),
      currentSession: this.currentSession(),
      totalTime: this.currentTime(),
      completed: this.isAllSessionsCompleted()
    });
    console.log('valueChange event emitted:', {
      phase: this.currentPhase(),
      session: this.currentSession(),
      time: Math.round(this.phaseDuration / 1000)
    });
  }
  
  private updateProgress() {
    this.progress.set(((this.phaseDuration - this.currentTime()) / this.phaseDuration) * 100);
  }
  
  private loadSavedData(data: any) {
    if (data && typeof data === 'object') {
      if (data.completedSessions) this.completedSessions.set(data.completedSessions);
      if (data.currentPhase) this.currentPhase.set(data.currentPhase);
      if (data.currentSession) this.currentSession.set(data.currentSession);
      if (data.totalTime !== undefined) this.currentTime.set(data.totalTime);
      if (data.completed !== undefined) this.isAllSessionsCompleted.set(data.completed);
    }
  }
  
  trackSessionId(index: number, session: { id: number }) {
    return session.id;
  }
}