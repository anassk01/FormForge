// src/app/shared/interfaces/field-config.interface.ts

export interface FieldConfig {
    name: string;
    type: string;
    description: string;
    required: boolean;
    options: {
      range?: { min: number; max: number };
      default?: any;
      multiline?: boolean;
      columns?: FieldConfig[];
      minItems?: number;
      maxItems?: number;
      listFields?: FieldConfig[];
      laps?: number;
      minLaps?: number;
      maxLaps?: number;
      workDuration?: number;
      breakDuration?: number;
      sessions?: number;
      longBreakDuration?: number;
      longBreakInterval?: number;
      maxLength?: number;
      sessionLabels?: Map<number, string> | { [key: number]: string };
            };
  }