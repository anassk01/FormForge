import { Component, Input, Output, OnInit,EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchComponent } from './stopwatch.component';
import { TimerComponent } from './timer.component';
import { TimerSettings, StopwatchSettings } from './time-management.types';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
@Component({
  selector: 'app-time-management',
  standalone: true,
  imports: [CommonModule, StopwatchComponent, TimerComponent, FormatTimePipe],
  template: `
    <div class="time-management" (click)="handleClick($event)">
      <h3>{{ label }}</h3>
      @if (description) {
        <p class="description">{{ description }}</p>
      }
      @if (type === 'stopwatch') {
        <app-stopwatch
          [settings]="stopwatchSettings()"
          [savedData]="savedDataValue()"
          [readOnly]="readOnly || isSubmittedInstance"
          (valueChange)="onValueChange($event)">
        </app-stopwatch>
          }
@if (type === 'timer') {
        <app-timer
            [settings]="timerSettings()"
          [savedData]="savedDataValue()"
          [readOnly]="readOnly || isSubmittedInstance"
          (valueChange)="onValueChange($event)">
        </app-timer>
      }
    </div>
  `,
  styleUrls: ['./time-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeManagementComponent implements OnInit {
  @Input() label: string = 'Time Management';
  @Input() description: string = '';
  @Input() type: 'stopwatch' | 'timer' = 'stopwatch';
  @Input() settings: TimerSettings | StopwatchSettings | undefined;
  @Input() readOnly: boolean = false;
  @Input() savedData: any = null;
  @Input() isSubmittedInstance: boolean = false;
  @Output() valueChange = new EventEmitter<any>();
  private _savedData = signal<any>(null);
  savedDataValue = computed(() => this._savedData());
  ngOnInit() {
    if (this.isSubmittedInstance && this.savedData) {
      this._savedData.set(this.savedData);
    }
  }
  private DEFAULT_STOPWATCH_SETTINGS: StopwatchSettings = {
    laps: undefined,
    minLaps: undefined,
    maxLaps: undefined
  };
  private DEFAULT_TIMER_SETTINGS: TimerSettings = {
    workDuration: 25 * 60 * 1000,
    breakDuration: 5 * 60 * 1000,
    sessions: 4,
    longBreakDuration: 15 * 60 * 1000,
    longBreakInterval: 4
  };

  
  error = signal<string | null>(null);
  stopwatchSettings = computed<StopwatchSettings>(() => {
    const settings = this.settings;
    if (this.type === 'stopwatch' && settings && 'laps' in settings) {
      return this.validateStopwatchSettings(settings);
    }
    return this.DEFAULT_STOPWATCH_SETTINGS;
  });
  timerSettings = computed<TimerSettings>(() => {
    const settings = this.settings;
    if (this.type === 'timer' && settings && 'workDuration' in settings) {
      return this.validateTimerSettings(settings);
    }
    return this.DEFAULT_TIMER_SETTINGS;
  });
  constructor() {
    effect(() => {
      this.validateSettings();
    });
  }
  private validateSettings() {
    const settings = this.settings;
    if (this.type === 'stopwatch' && settings && 'laps' in settings) {
      this.validateStopwatchSettings(settings);
    } else if (this.type === 'timer' && settings && 'workDuration' in settings) {
      this.validateTimerSettings(settings);
    } else {
      this.error.set(null);
    }
  }
  private validateStopwatchSettings(settings: StopwatchSettings): StopwatchSettings {
    if (settings.minLaps !== undefined && settings.maxLaps !== undefined && settings.minLaps > settings.maxLaps) {
      this.error.set('Invalid stopwatch settings: minLaps cannot be greater than maxLaps');
      return this.DEFAULT_STOPWATCH_SETTINGS;
    }
    return settings;
  }
  private validateTimerSettings(settings: TimerSettings): TimerSettings {
    if (settings.workDuration <= 0 || settings.breakDuration <= 0 || settings.sessions <= 0) {
      this.error.set('Invalid timer settings: durations and sessions must be positive');
      return this.DEFAULT_TIMER_SETTINGS;
    }
    return settings;
  }
  onValueChange(event: any) {
    this.valueChange.emit(event);
  }
  handleClick(event: Event) {
    if (event.target instanceof HTMLButtonElement) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
