import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
export interface StopwatchData {
  totalDuration: number;
  startTime: string;
  endTime: string;
  laps: LapData[];
  isRunning: boolean;
}
export interface LapData {
  lapNumber: number;
  lapTime: number;
  cumulativeTime: number;
  timestamp: string;
}
export interface TimerData {
  totalDuration: number;
  startTime: string;
  endTime: string;
  currentPhase: 'work' | 'break' | 'longBreak';
  currentSession: number;
  remainingTime: number;
  sessions: SessionData[];
  isRunning: boolean;
}
export interface SessionData {
  sessionNumber: number;
  workDuration: number;
  breakDuration: number;
  workStartTime: string;
  workEndTime: string;
  breakStartTime: string;
  breakEndTime: string;
  completed: boolean;
}
export interface TimerSettings {
  workDuration: number;
  breakDuration: number;
  sessions: number;
  longBreakDuration?: number;
  longBreakInterval?: number;
}
@Injectable({
  providedIn: 'root'
})
export class TimeManagementService {
  private stopwatchSubject = new BehaviorSubject<StopwatchData | null>(null);
  private timerSubject = new BehaviorSubject<TimerData | null>(null);
  private stopwatchData: StopwatchData | null = null;
  private timerData: TimerData | null = null;
  private timerSettings: TimerSettings | null = null;
  private stopwatchInterval: Subscription | null = null;
  private timerInterval: Subscription | null = null;
  constructor() {
    console.log('TimeManagementService initialized');
  }
  // Common methods
  start(type: 'stopwatch' | 'timer'): void {
    if (type === 'stopwatch') {
      this.startStopwatch();
    } else {
      this.startTimer();
    }
  }
  stop(type: 'stopwatch' | 'timer'): void {
    if (type === 'stopwatch') {
      this.stopStopwatch();
    } else {
      this.stopTimer();
    }
  }
  reset(type: 'stopwatch' | 'timer'): void {
    if (type === 'stopwatch') {
      this.resetStopwatch();
    } else {
      this.resetTimer();
    }
  }
  // Stopwatch methods
  private startStopwatch(): void {
    if (this.stopwatchInterval) {
      console.warn('Stopwatch is already running');
      return;
    }
    const startTime = Date.now() - (this.stopwatchData?.totalDuration || 0);
    this.stopwatchData = this.stopwatchData || {
      totalDuration: 0,
      startTime: new Date(startTime).toISOString(),
      endTime: '',
      laps: [],
      isRunning: true
    };
    this.stopwatchInterval = interval(10).subscribe(() => {
      if (this.stopwatchData) {
        this.stopwatchData.totalDuration = Date.now() - startTime;
        this.updateStopwatchSubject();
      }
    });
    console.log('Stopwatch started');
  }
  private stopStopwatch(): void {
    if (this.stopwatchInterval) {
      this.stopwatchInterval.unsubscribe();
      this.stopwatchInterval = null;
      if (this.stopwatchData) {
        this.stopwatchData.endTime = new Date().toISOString();
        this.stopwatchData.isRunning = false;
        this.updateStopwatchSubject();
      }
      console.log('Stopwatch stopped');
    } else {
      console.warn('Stopwatch is not running');
    }
  }
  private resetStopwatch(): void {
    this.stopStopwatch();
    this.stopwatchData = {
      totalDuration: 0,
      startTime: '',
      endTime: '',
      laps: [],
      isRunning: false
    };
    this.updateStopwatchSubject();
    console.log('Stopwatch reset');
  }
  lap(): void {
    if (this.stopwatchData && this.stopwatchData.isRunning) {
      const lastLap = this.stopwatchData.laps[this.stopwatchData.laps.length - 1];
      const lapTime = this.stopwatchData.totalDuration - (lastLap?.cumulativeTime || 0);
      this.stopwatchData.laps.push({
        lapNumber: this.stopwatchData.laps.length + 1,
        lapTime: lapTime,
        cumulativeTime: this.stopwatchData.totalDuration,
        timestamp: new Date().toISOString()
      });
      this.updateStopwatchSubject();
      console.log('Lap recorded');
    } else {
      console.warn('Cannot record lap: Stopwatch is not running');
    }
  }
  private updateStopwatchSubject(): void {
    this.stopwatchSubject.next(this.stopwatchData);
  }
  // Timer methods
  setTimerSettings(settings: TimerSettings): void {
    this.timerSettings = settings;
    this.resetTimer();
    console.log('Timer settings updated', settings);
  }
  private startTimer(): void {
    if (!this.timerSettings) {
      console.error('Cannot start timer: settings not set');
      return;
    }
    if (this.timerInterval) {
      console.warn('Timer is already running');
      return;
    }
    if (!this.timerData) {
      this.initializeTimerData();
    }
    this.timerData!.isRunning = true;
    this.timerInterval = interval(1000).subscribe(() => {
      if (this.timerData) {
        this.timerData.remainingTime--;
        this.timerData.totalDuration++;
        if (this.timerData.remainingTime <= 0) {
          this.moveToNextPhase();
        }
        this.updateTimerSubject();
      }
    });
    console.log('Timer started');
  }
  private stopTimer(): void {
    if (this.timerInterval) {
      this.timerInterval.unsubscribe();
      this.timerInterval = null;
      if (this.timerData) {
        this.timerData.endTime = new Date().toISOString();
        this.timerData.isRunning = false;
        this.updateTimerSubject();
      }
      console.log('Timer stopped');
    } else {
      console.warn('Timer is not running');
    }
  }
  private resetTimer(): void {
    this.stopTimer();
    this.initializeTimerData();
    console.log('Timer reset');
  }
  skipPhase(): void {
    if (this.timerData && this.timerData.isRunning) {
      this.moveToNextPhase();
      console.log('Skipped to next phase');
    } else {
      console.warn('Cannot skip phase: Timer is not running');
    }
  }
  private initializeTimerData(): void {
    if (!this.timerSettings) {
      console.error('Cannot initialize timer data: settings not set');
      return;
    }
    this.timerData = {
      totalDuration: 0,
      startTime: new Date().toISOString(),
      endTime: '',
      currentPhase: 'work',
      currentSession: 1,
      remainingTime: this.timerSettings.workDuration,
      sessions: [],
      isRunning: false
    };
    this.timerData.sessions.push(this.createNewSession(1));
    this.updateTimerSubject();
    console.log('Timer data initialized', this.timerData);
  }
  private moveToNextPhase(): void {
    if (!this.timerData || !this.timerSettings) {
      console.error('Cannot move to next phase: timer data or settings not set');
      return;
    }
    const currentSession = this.timerData.sessions[this.timerData.currentSession - 1];
    if (this.timerData.currentPhase === 'work') {
      currentSession.workEndTime = new Date().toISOString();
      if (this.timerData.currentSession < this.timerSettings.sessions) {
        this.timerData.currentPhase = this.shouldTakeLongBreak() ? 'longBreak' : 'break';
        this.timerData.remainingTime = this.getBreakDuration();
        currentSession.breakStartTime = new Date().toISOString();
      } else {
        this.completeTimer();
        return;
      }
    } else {
      currentSession.breakEndTime = new Date().toISOString();
      currentSession.completed = true;
      if (this.timerData.currentSession < this.timerSettings.sessions) {
        this.timerData.currentSession++;
        this.timerData.currentPhase = 'work';
        this.timerData.remainingTime = this.timerSettings.workDuration;
        this.timerData.sessions.push(this.createNewSession(this.timerData.currentSession));
      } else {
        this.completeTimer();
        return;
      }
    }
    this.updateTimerSubject();
    console.log('Moved to next phase', this.timerData);
  }
  private getBreakDuration(): number {
    if (!this.timerSettings || !this.timerData) {
      console.error('Timer settings or data is not initialized');
      return 0;
    }
  
    const { longBreakDuration, longBreakInterval, breakDuration } = this.timerSettings;
  
    if (this.shouldTakeLongBreak()) {
      console.log(`Long break triggered at session ${this.timerData.currentSession}`);
      return longBreakDuration || breakDuration;
    }
  
    console.log(`Regular break duration returned: ${breakDuration}`);
    return breakDuration;
  }
  private shouldTakeLongBreak(): boolean {
    if (!this.timerSettings || !this.timerData) return false;
    const { longBreakInterval } = this.timerSettings;
    return !!longBreakInterval && this.timerData.currentSession % longBreakInterval === 0;
  }
  private createNewSession(sessionNumber: number): SessionData {
    return {
      sessionNumber,
      workDuration: this.timerSettings?.workDuration || 0,
      breakDuration: this.getBreakDuration(),
      workStartTime: new Date().toISOString(),
      workEndTime: '',
      breakStartTime: '',
      breakEndTime: '',
      completed: false
    };
  }
  private completeTimer(): void {
    if (this.timerData) {
      this.timerData.endTime = new Date().toISOString();
      this.timerData.isRunning = false;
      this.stopTimer();
      console.log('Timer completed', this.timerData);
    }
  }
  private updateTimerSubject(): void {
    this.timerSubject.next(this.timerData);
  }
  // Data retrieval methods
  getStopwatchData(): Observable<StopwatchData | null> {
    return this.stopwatchSubject.asObservable();
  }
  getTimerData(): Observable<TimerData | null> {
    return this.timerSubject.asObservable();
  }
}