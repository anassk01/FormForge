export interface StopwatchSettings {
    laps?: number;
    minLaps?: number;
    maxLaps?: number;
  }
  
  export interface TimerSettings {
    workDuration: number;
    breakDuration: number;
    sessions: number;
    longBreakDuration: number;
    longBreakInterval: number;
    sessionLabels?: { [key: number]: { work?: string, break?: string } };
  }

  export interface ExtendedTimerSettings extends TimerSettings {
    sessionLabels?: { [key: number]: { work?: string, break?: string } };
  }
  