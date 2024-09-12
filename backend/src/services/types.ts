// types.ts

export interface ParsedStructure {
    entryName: string;
    fields: ParsedField[];
    validationErrors: ValidationError[];
  }
  
  export interface ParsedField {
    type: string;
    name: string;
    description: string;
    required: boolean;
    options: FieldOptions;
  }
  
  export type FieldOptions =
    | TextFieldOptions
    | NumberFieldOptions
    | DateFieldOptions
    | BooleanFieldOptions
    | ScaleFieldOptions
    | ListFieldOptions
    | TableFieldOptions
    | StopwatchFieldOptions
    | TimerFieldOptions;
  
  export interface TextFieldOptions {
    multiline?: boolean;
    default?: string;
  }
  
  export interface NumberFieldOptions {
    range?: { min: number; max: number };
    default?: number;
  }
  
  export interface DateFieldOptions {
    default?: string;
  }
  
  export interface BooleanFieldOptions {
    default?: boolean;
  }
  
  export interface ScaleFieldOptions {
    range: { min: number; max: number };
    default?: number;
  }
  
  export interface ListFieldOptions {
    minItems: number;
    maxItems: number;
    listFields: ParsedField[];
  }
  
  export interface TableFieldOptions {
    columns: ParsedField[];
  }
  
  export interface StopwatchFieldOptions {
    laps?: number;
    minLaps?: number;
    maxLaps?: number;
  }
  
  export interface ColumnFieldOptions {
    range?: { min: number; max: number };
    default?: any;
    multiline?: boolean;
  }
  
  export interface TimerFieldOptions {
    workDuration: number;
    breakDuration: number;
    sessions: number;
    longBreakDuration?: number;
    longBreakInterval?: number;
    sessionLabels?: { [key: number]: { work?: string; break?: string } };
  }
  
  export interface ValidationError {
    field: string;
    message: string;
  }
  