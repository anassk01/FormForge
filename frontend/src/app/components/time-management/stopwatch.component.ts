//src/app/components/time-management/stopwatch.component.ts
import { Component,OnInit,Output ,Input,ChangeDetectorRef,OnDestroy, EventEmitter, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { StopwatchSettings } from './time-management.types';
@Component({
  selector: 'app-stopwatch',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormatTimePipe],
  template: `
    <div class="stopwatch">
    <div class="time-display">{{ currentTime() | formatTime:'ms' }}</div>
    
    <div class="controls">
      <button mat-raised-button color="primary" (click)="toggleStopwatch($event)" [disabled]="readOnly || isCompleted()">
        {{ isRunning() ? 'Stop' : 'Start' }} Stopwatch
      </button>
      
      <button mat-raised-button (click)="lap($event)" [disabled]="readOnly || !isRunning() || isLapDisabled() || isCompleted()">Lap</button>
    <button mat-raised-button (click)="resetStopwatch($event)" [disabled]="readOnly">Reset</button>
  </div>
  
  @if (laps().length) {
        <div class="laps ng-star-inserted">
          <h4>Laps</h4>
          <ul>
            @for (lap of laps(); track lap.number) {
              <li>Lap {{ lap.number }}: {{ lap.time | formatTime:'ms' }}</li>
            }
          </ul>
        </div>
      }
    </div> 
        `,
  styles: [/* ... existing styles ... */],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopwatchComponent implements OnInit, OnDestroy {
  @Input() settings!: StopwatchSettings;
  @Input() savedData: any = null;
  @Input() readOnly: boolean = false;
  @Output() valueChange = new EventEmitter<any>();
  
  currentTime = signal(0);
  isRunning = signal(false);
  laps = signal<{ number: number; time: number }[]>([]);
  stopwatchState = signal('');
  private startTime = 0;
  private elapsedTime = 0;
  private lastLapTime = 0;
  private animationFrameId: number | null = null;
  private intervalId: number | null = null;
  private pausedTime = 0;
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    if (this.savedData) {
      this.loadSavedData(this.savedData);
    }
  }
  ngOnDestroy() {
    this.stopStopwatch();
  }
  isCompleted = computed(() => {
    const settings = this.settings;
    const lapCount = this.laps().length;
    return (settings.laps !== undefined && lapCount >= settings.laps) ||
           (settings.maxLaps !== undefined && lapCount >= settings.maxLaps);
  });
  toggleStopwatch(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isCompleted()) return;
    
    if (this.isRunning()) {
      this.stopStopwatch();
    } else {
      this.startStopwatch();
    }
    this.updateStopwatchState();
  }
  
  
  lap(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isRunning() && !this.isLapDisabled() && !this.isCompleted()) {
      const currentLapTime = this.currentTime() - this.lastLapTime;
      this.laps.update(laps => [...laps, { number: laps.length + 1, time: currentLapTime }]);
      this.lastLapTime = this.currentTime();
      
      this.valueChange.emit({ laps: this.laps(), totalTime: this.currentTime(), completed: this.isCompleted() });
      
      this.updateStopwatchState();
  
      if (this.isCompleted()) {
        this.stopStopwatch();
      }
    }
  }
  
  
  resetStopwatch(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.stopStopwatch();
    this.currentTime.set(0);
    this.laps.set([]);
    this.elapsedTime = 0;
    this.lastLapTime = 0;
    this.stopwatchState.set('');
    this.valueChange.emit({ laps: [], completed: false });
  }
  
  isLapDisabled = computed(() => {
    if (!this.isRunning()) return true;
    const settings = this.settings;
    if (settings.laps !== undefined) return this.laps().length >= settings.laps;
    if (settings.maxLaps !== undefined) return this.laps().length >= settings.maxLaps;
    return false;
  });
  private startStopwatch(): void {
    this.startTime = Date.now() - this.elapsedTime;
    this.isRunning.set(true);
    this.updateStopwatch();
  }
  private stopStopwatch(): void {
    this.isRunning.set(false);
    this.elapsedTime = Date.now() - this.startTime;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  private updateStopwatch(): void {
    if (!this.isRunning()) return;
    const now = Date.now();
    this.currentTime.set(now - this.startTime);
    this.cdr.detectChanges();
    this.animationFrameId = requestAnimationFrame(() => this.updateStopwatch());
  }


  private updateStopwatchState(): void {
    const settings = this.settings;
    const lapCount = this.laps().length;
    if (settings.laps !== undefined && lapCount === settings.laps) {
      this.stopwatchState.set('Completed: Exact number of laps reached');
    } else if (settings.maxLaps !== undefined && lapCount >= settings.maxLaps) {
      this.stopwatchState.set('Completed: Maximum number of laps reached');
    } else if (settings.minLaps !== undefined && lapCount >= settings.minLaps) {
      this.stopwatchState.set('Minimum number of laps reached');
    } else {
      this.stopwatchState.set('');
    }
  }
  private loadSavedData(data: any): void {
    if (data && typeof data === 'object') {
      if (data.laps) {
        this.laps.set(data.laps);
      }
      if (data.totalTime !== undefined) {
        this.currentTime.set(data.totalTime);
        this.elapsedTime = data.totalTime * 1000;
      }
      if (data.completed !== undefined) {
        this.stopwatchState.set(data.completed ? 'Completed' : '');
      }
    }
  }
}