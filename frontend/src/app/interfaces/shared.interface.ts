// src/app/interfaces/shared.interface.ts
export interface FieldConfig {
    name: string;
    type: string;
    description: string;
    required: boolean;
    options: FieldOptions;
  }
  
  export interface FieldOptions {
    default?: any;
    range?: { min: number; max: number };
    min?: number;
    max?: number;
    columns?: FieldConfig[];
    laps?: number;
    minLaps?: number;
    maxLaps?: number;
    workDuration?: number;
    breakDuration?: number;
    sessions?: number;
    longBreakDuration?: number;
    longBreakInterval?: number;
    listFields?: FieldConfig[];
    maxLength?: number;
    multiline?: boolean;
    sessionLabels?: { [key: number]: { work?: string; break?: string } };
    minItems?: number;
    maxItems?: number;
  }
  
  export interface FormFieldData {
    type: string;
    value: any;
    options: FieldOptions;
    details?: any;
    range?: { min: number; max: number };
  }
  
  export interface FormData {
    [key: string]: FormFieldData;
  }
  
  export interface FormStructure {
    entryName: string;
    fields: FieldConfig[];
  }
  
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
    sessionLabels?: { [key: number]: { work?: string; break?: string } };
  }
  
  export interface ExtendedTimerSettings extends TimerSettings {
    sessionLabels?: { [key: number]: { work?: string; break?: string } };
  }