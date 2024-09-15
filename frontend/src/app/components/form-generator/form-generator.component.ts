//src/app/components/form-generator/form-generator.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TimeManagementComponent } from '../time-management/time-management.component';
import { TimeManagementService } from '../../services/time-management.service';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { FieldConfig } from '../../interfaces/field-config';
import { TimerSettings } from '../time-management/time-management.types';
import { FormatTimePipe } from '../../pipes/format-time.pipe';

interface StopwatchSettings {
  laps?: number;
  minLaps?: number;
  maxLaps?: number;
}

interface ExtendedTimerSettings extends TimerSettings {
  sessionLabels?: { [key: number]: { work?: string, break?: string } };
}

interface StopwatchFieldOptions {
  laps?: number;
  minLaps?: number;
  maxLaps?: number;
}

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TimeManagementComponent,
    DynamicFieldComponent,
    FormatTimePipe
  ],
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGeneratorComponent implements OnChanges {
  @Input() parsedCode: any;
  @Input() isTemplate: boolean = true;
  @Input() initialValues: any = {};
  @Input() readOnly: boolean = false;
  @Input() formId!: string;
  @Output() formSaved = new EventEmitter<{ formData: any, structure: any }>();
  @Output() formSubmitted = new EventEmitter<{ formData: any, structure: any }>();
  @Output() templateSaved = new EventEmitter<{ formData: any, structure: any }>();
  @Output() instanceSubmitted = new EventEmitter<{ formData: any, structure: any }>();

  form!: FormGroup;
  fields: FieldConfig[] = [];
  entryName: string = '';

  private tableDataSources: { [key: string]: MatTableDataSource<FormGroup> } = {};
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);
  private timeManagementService = inject(TimeManagementService);

  @Input() isSubmittedInstance: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parsedCode'] && this.parsedCode) {
      console.log('FormGeneratorComponent: Parsed code changed:', this.parsedCode);
      this.entryName = this.parsedCode.entryName || 'Dynamic Form';
      this.fields = this.parsedCode.parsedFields || this.parsedCode.fields || [];
      this.createForm();
      this.initializeTableData();
      
      if (this.initialValues) {
        console.log('FormGeneratorComponent: Applying initial values:', this.initialValues);
        this.applyInitialValues();
      }

      if (changes['readOnly']) {
        if (this.form) {
          if (this.readOnly) {
            this.form.disable();
          } else {
            this.form.enable();
          }
        }
      }

      this.updateFormControlsState();
    }
  }

  private updateFormControlsState(): void {
    if (this.form) {
      if (this.readOnly) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  private applyInitialValues(): void {
    Object.keys(this.initialValues).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        const field = this.fields.find(f => f.name === key);
        if (field && (field.type === 'STOPWATCH' || field.type === 'TIMER')) {
          control.setValue(this.initialValues[key]);
        } else {
          control.patchValue(this.initialValues[key]);
        }
      }
    });
  }

  getFormControl(fieldName: string): AbstractControl {
    const control = this.form.get(fieldName);
    if (!control) {
      console.error(`Control ${fieldName} not found`);
      return new FormControl(); // Return a new FormControl as a fallback
    }
    return control;
  }

  private setTimeManagementValue(field: any, value: any): void {
    const control = this.form.get(field.name);
    if (control) {
      control.setValue(value);
      control.disable(); // Disable the control to prevent further interaction
    }
  }

  getFormArray(fieldName: string): FormArray | null {
    const control = this.form.get(fieldName);
    return control instanceof FormArray ? control : null;
  }

  getListItemControl(listName: string, index: number, fieldName: string): AbstractControl {
    const listArray = this.form.get(listName) as FormArray;
    if (listArray && listArray.length > index) {
      const listItemGroup = listArray.at(index) as FormGroup;
      if (listItemGroup) {
        const control = listItemGroup.get(fieldName);
        if (control) {
          return control;
        }
      }
    }
    console.error(`Control ${listName}[${index}].${fieldName} not found`);
    return new FormControl(); // Return a new FormControl as a fallback
  }
  createForm(): void {
    console.log('FormGeneratorComponent: Creating form');
    const group: { [key: string]: AbstractControl } = {};

    this.fields.forEach(field => {
      if (!field.name || !field.type) {
        console.error('FormGeneratorComponent: Invalid field structure: missing name or type', field);
        return;
      }

      console.log(`FormGeneratorComponent: Processing field: ${field.name} (${field.type})`);
      const validators = this.getValidators(field);

      switch (field.type.toUpperCase()) {
        case 'TEXT':
          // Log the multiline option if it's set
          if (field.options && field.options['multiline']) {
            console.log(`Multiline option set for field: ${field.name}`);
          }
          group[field.name] = new FormControl(this.getDefaultValue(field), validators);
          break;
        case 'NUMBER':
        case 'DATE':
        case 'SCALE':
        case 'BOOLEAN':
          group[field.name] = new FormControl(this.getDefaultValue(field), validators);
          break;
        case 'LIST':
          group[field.name] = this.createListFormArray(field);
          break;
          case 'TABLE':
            group[field.name] = this.createTableFormArray(field);
            if (field.required && !this.isTemplate) {
              group[field.name].setValidators(this.tableRequiredValidator());
            }
            break;

        case 'STOPWATCH':
          group[field.name] = new FormControl({
            laps: [],
            completed: false
          }, { validators: this.getStopwatchValidators(field) });
          break;
        case 'TIMER':
          group[field.name] = new FormControl({
            completedSessions: [],
            currentPhase: 'work',
            currentSession: 1,
            completed: false
          }, { validators: this.getTimerValidators(field) });
          break;
        default:
          console.error(`FormGeneratorComponent: Unsupported field type: ${field.type}`);
      }
    });

    this.form = this.fb.group(group);
    console.log('FormGeneratorComponent: Created form:', this.form);
  }

  tableRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const tableArray = control as FormArray;
      return tableArray.length === 0 ? { 'requiredTable': true } : null;
    };
  }


  onSave(): void {
    if (this.isFillable()) {
      const formData = this.prepareFormData();
      const structure = {
        entryName: this.parsedCode?.entryName || 'Untitled Form',
        fields: this.fields
      };
      
      if (this.isTemplate) {
        const defaultValues = this.getDefaultValues(this.fields);
        this.templateSaved.emit({ formData: defaultValues, structure });
      } else {
        this.instanceSubmitted.emit({ formData, structure });
      }
    } else {
      this.form.markAllAsTouched();
      this.snackBar.open('Please fill all required fields correctly.', 'Close', { duration: 3000 });
    }
  }

  isFillable(): boolean {
    if (this.isTemplate) {
      // For templates, we consider the form fillable as long as all non-table fields are valid
      return this.areNonTableFieldsValid();
    } else {
      // For instances, we require all fields to be valid and required tables to have data
      return this.form.valid && this.areRequiredTablesFilled();
    }
  }


  isValidForm(): boolean {
    if (this.isTemplate) {
      // For templates, we don't require table data
      return this.form.valid;
    } else {
      // For instances, we need to check if required tables have data
      return this.form.valid && this.areRequiredTablesFilled();
    }
  }


  areRequiredTablesFilled(): boolean {
    let allTablesFilled = true;
    this.fields.forEach(field => {
      if (field.type === 'TABLE' && field.required) {
        const tableArray = this.form.get(field.name) as FormArray;
        if (tableArray.length === 0) {
          allTablesFilled = false;
        }
      }
    });
    return allTablesFilled;
  }


  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.prepareFormData();
      const structure = {
        entryName: this.parsedCode?.entryName || 'Untitled Form',
        fields: this.fields
      };
      this.instanceSubmitted.emit({ formData, structure });
    } else {
      this.form.markAllAsTouched();
      console.log('Form is invalid:', this.form);
      this.snackBar.open('Please fill all required fields correctly.', 'Close', { duration: 3000 });
    }
  }

  private prepareFormData(): any {
    const formData: any = {};
    this.fields.forEach(field => {
      const control = this.form.get(field.name);
      if (control) {
        formData[field.name] = {
          type: field.type,
          value: control.value,
          options: field.options || {},
        };
  
        // Add specific details based on field type
        switch (field.type) {
          case 'TIMER':
            formData[field.name].details = this.prepareTimerDetails(control.value, field.options);
            break;
          case 'STOPWATCH':
            formData[field.name].details = this.prepareStopwatchDetails(control.value, field.options);
            break;
          case 'SCALE':
          case 'NUMBER':
            formData[field.name].range = field.options?.range;
            break;
          // Add cases for other field types as needed
        }
      }
    });
    return formData;
  }

  
  private prepareTimerDetails(value: any, options: any): any {
    return {
      totalProgrammedTime: this.calculateTotalProgrammedTime(options),
      sessionsCompleted: value.completedSessions.length,
      totalSessionsPlanned: options.sessions,
      sessions: value.completedSessions.map((session: any, index: number) => ({
        sessionNumber: index + 1,
        label: this.getSessionLabel(options, index + 1, session.phase),
        programmedTime: this.getSessionProgrammedTime(options, session.phase),
        actualTime: session.duration
      }))
    };
  }
  
  private prepareStopwatchDetails(value: any, options: any): any {
    return {
      totalTime: value.totalTime,
      laps: value.laps,
      minLaps: options.minLaps,
      maxLaps: options.maxLaps
    };
  }


  private calculateTotalProgrammedTime(options: any): number {
    return (options.workDuration + options.breakDuration) * options.sessions 
           + (Math.floor((options.sessions - 1) / options.longBreakInterval) * options.longBreakDuration);
  }
  
  private getSessionLabel(options: any, sessionNumber: number, phase: string): string {
    if (options.sessionLabels && options.sessionLabels[sessionNumber]) {
      return options.sessionLabels[sessionNumber][phase] || `Session ${sessionNumber} ${phase}`;
    }
    return `Session ${sessionNumber} ${phase}`;
  }
  
  private getSessionProgrammedTime(options: any, phase: string): number {
    switch (phase) {
      case 'work': return options.workDuration;
      case 'break': return options.breakDuration;
      case 'long break': return options.longBreakDuration;
      default: return 0;
    }
  }
  //others methods not necesary for our work
  createListItemGroup(field: FieldConfig): FormGroup {
    console.log('Creating list item group for field:', field.name);
    const group: { [key: string]: AbstractControl } = {};

    if (field.options?.listFields && Array.isArray(field.options.listFields)) {
      field.options.listFields.forEach(listField => {
        console.log('Processing list field:', listField.name, 'of type:', listField.type);
        if (listField.name) {
          group[listField.name] = new FormControl(
            this.getDefaultValue(listField),
            this.getValidators(listField)
          );
        }
      });
    } else {
      console.warn('No listFields found for:', field.name);
    }

    console.log('Created group:', group);
    console.log('FormGeneratorComponent: Form created:', this.form);
    return this.fb.group(group);
  }

  createTableRowGroup(field: FieldConfig): FormGroup {
    const rowGroup: { [key: string]: AbstractControl } = {};

    if (field.options?.columns && Array.isArray(field.options.columns)) {
      field.options.columns.forEach((column: FieldConfig) => {
        rowGroup[column.name] = this.fb.control(
          this.getDefaultValue(column),
          { validators: this.getValidators(column) }
        );
      });
    } else {
      console.error(`Invalid or missing columns for TABLE field: ${field.name}, field`);
    }

    return this.fb.group(rowGroup);
  }

  onTimerValueChange(fieldName: string, value: any) {
    console.log(`Timer ${fieldName} value changed:`, value);
    this.form.get(fieldName)?.setValue(value);
  }

  private getBooleanDefaultValue(field: FieldConfig): boolean {
    if (field.options?.default !== undefined) {
      return field.options.default === true || field.options.default === 'true';
    }
    return false;
  }

  initializeTableDataSources(): void {
    this.fields.forEach(field => {
      if (field.type === 'TABLE') {
        const tableArray = this.form.get(field.name) as FormArray;
        if (tableArray) {
          this.tableDataSources[field.name] = new MatTableDataSource<FormGroup>(tableArray.controls as FormGroup[]);
        }
      }
    });
  }

  getStopwatchValidators(field: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    const options = field.options as StopwatchFieldOptions;

    if (options.laps !== undefined) {
      validators.push(this.exactLapsValidator(options.laps));
    }
    if (options.minLaps !== undefined) {
      validators.push(this.minLapsValidator(options.minLaps));
    }
    if (options.maxLaps !== undefined) {
      validators.push(this.maxLapsValidator(options.maxLaps));
    }

    return validators;
  }

  getTimerValidators(field: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    const options = field.options as TimerSettings;

    if (options.sessions !== undefined) {
      validators.push(this.sessionsValidator(options.sessions));
    }
    // Add more timer-specific validators here if needed
    return validators;
  }

  sessionsValidator(requiredSessions: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value || !value.completedSessions) return null;
      return value.completedSessions.length <= requiredSessions ? null :
        { 'sessions': { required: requiredSessions, actual: value.completedSessions.length } };
    };
  }

  getSavedTimeManagementData(fieldName: string): any {
    const control = this.form.get(fieldName);
    return control ? control.value : null;
  }

  exactLapsValidator(requiredLaps: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const laps = control.value.laps;
      return laps.length === requiredLaps ? null : { 'exactLaps': { required: requiredLaps, actual: laps.length } };
    };
  }

  minLapsValidator(minLaps: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const laps = control.value.laps;
      return laps.length >= minLaps ? null : { 'minLaps': { required: minLaps, actual: laps.length } };
    };
  }

  maxLapsValidator(maxLaps: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const laps = control.value.laps;
      return laps.length <= maxLaps ? null : { 'maxLaps': { allowed: maxLaps, actual: laps.length } };
    };
  }

  getValidators(field: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
  
    if (field.required) {
      validators.push(Validators.required);
    }
  
    if (field.type.toUpperCase() === 'NUMBER' && field.options?.range) {
      if (field.options.range.min !== undefined) {
        validators.push(Validators.min(field.options.range.min));
      }
      if (field.options.range.max !== undefined) {
        validators.push(Validators.max(field.options.range.max));
      }
    }
  
    // Add custom validator for TEXT fields with maxLength
    if (field.type.toUpperCase() === 'TEXT' && field.options?.maxLength) {
      validators.push(Validators.maxLength(field.options.maxLength));
    }
  
    return validators;
  }
  
  getDefaultValue(field: FieldConfig): string | number | boolean | null {
    if (field.options?.default !== undefined) {
      return field.options.default;
    }
  
    switch (field.type.toUpperCase()) {
      case 'BOOLEAN':
        return false;
      case 'NUMBER':
      case 'SCALE':
        return null; // Changed to null to allow for empty initial state
      case 'DATE':
        return null;
      default:
        return '';
    }
  }
  
  getListControls(listName: string): AbstractControl[] {
    const listArray = this.form.get(listName);
    return listArray instanceof FormArray ? listArray.controls : [];
  }
  
  createListFormArray(field: FieldConfig): FormArray {
    console.log('Creating list form array for field:', field.name);
    const minItems = field.options?.minItems || 1;
    const listArray = this.fb.array([] as AbstractControl[]);
  
    for (let i = 0; i < minItems; i++) {
      const itemGroup = this.createListItemGroup(field);
      listArray.push(itemGroup as unknown as AbstractControl);
    }
  
    return listArray;
  }
  
  addListItem(field: FieldConfig): void {
    console.log('Adding list item for field:', field.name);
    const listArray = this.getFormArray(field.name);
  
    if (listArray) {
      if (field.options?.maxItems && listArray.length >= field.options.maxItems) {
        this.snackBar.open(`Maximum of ${field.options.maxItems} items allowed.`, 'Close', { duration: 3000 });
        return;
      }
  
      const newGroup = this.createListItemGroup(field);
      console.log('New group created:', newGroup);
      listArray.push(newGroup);
      console.log('List array after push:', listArray);
      this.cdr.detectChanges();
    } else {
      console.error(`FormArray not found for field: ${field.name}`);
    }
  }
  
  removeListItem(fieldName: string, index: number): void {
    const listArray = this.form.get(fieldName) as FormArray;
  
    if (listArray) {
      const field = this.fields.find(f => f.name === fieldName);
      if (field?.options?.minItems && listArray.length <= field.options.minItems) {
        this.snackBar.open(`Minimum of ${field.options.minItems} items required.`, 'Close', { duration: 3000 });
        return;
      }
  
      listArray.removeAt(index);
      this.cdr.detectChanges();
    }
  }
  
  createTableFormArray(field: FieldConfig): FormArray {
    const tableArray = this.fb.array([] as FormGroup[]);
  
    if (field.options?.columns) {
      const initialRow = this.createTableRowGroup(field);
      tableArray.push(initialRow);
      
      // Initialize the data source with the initial row
      this.initializeTableDataSource(field.name, [initialRow]);
    } else {
      console.error(`Missing columns for TABLE field: ${field.name}`);
    }
  
    return tableArray;
  }
  

private initializeTableDataSource(fieldName: string, initialData: FormGroup[]): void {
  this.tableDataSources[fieldName] = new MatTableDataSource<FormGroup>(initialData);
}

getTableDataSource(fieldName: string): MatTableDataSource<FormGroup> {
  if (!this.tableDataSources[fieldName]) {
    const tableArray = this.form.get(fieldName) as FormArray;
    this.initializeTableDataSource(fieldName, tableArray?.controls as FormGroup[] || []);
  }
  return this.tableDataSources[fieldName];
}

updateTableDataSource(fieldName: string): void {
  const tableArray = this.form.get(fieldName) as FormArray;

  if (tableArray) {
    if (!this.tableDataSources[fieldName]) {
      this.initializeTableDataSource(fieldName, tableArray.controls as FormGroup[]);
    } else {
      this.tableDataSources[fieldName].data = tableArray.controls as FormGroup[];
    }
  }
}
  
  addTableRow(field: FieldConfig): void {
    const tableArray = this.form.get(field.name) as FormArray;
  
    if (tableArray) {
      const newRow = this.createTableRowGroup(field);
      tableArray.push(newRow);
      this.updateTableDataSource(field.name);
      console.log(`Added new row to ${field.name}. Current rows:`, tableArray.length);
      this.cdr.detectChanges();
    } else {
      console.error(`FormArray not found for field: ${field.name}`);
    }
  }
  initializeTableData(): void {
    this.fields.forEach(field => {
      if (field.type === 'TABLE') {
        this.updateTableDataSource(field.name);
      }
    });
  }
  
  removeTableRow(field: FieldConfig, index: number): void {
    const tableArray = this.form.get(field.name) as FormArray;
  
    if (tableArray) {
      tableArray.removeAt(index);
      this.updateTableDataSource(field.name);
      console.log(`Removed row ${index} from ${field.name}. Current rows:`, tableArray.length);
      this.cdr.detectChanges();
    } else {
      console.error(`FormArray not found for field: ${field.name}`);
    }
  }
  
  getTableColumns(field: FieldConfig): string[] {
    return [...(field.options.columns?.map((column: FieldConfig) => column.name) || []), 'actions'];
  }

  areNonTableFieldsValid(): boolean {
    let allValid = true;
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      const field = this.fields.find(f => f.name === key);
      if (field && field.type !== 'TABLE' && control && control.invalid) {
        allValid = false;
      }
    });
    return allValid;
  }
  
  getScaleRange(range?: { min: number; max: number }): number[] {
    const min = range?.min ?? 1;
    const max = range?.max ?? 5;
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }
  
  isFormControl(fieldName: string): boolean {
    return this.form.get(fieldName) instanceof FormControl;
  }
  
  isFormArray(fieldName: string): boolean {
    return this.form.get(fieldName) instanceof FormArray;
  }
  
  onStopwatchValueChange(fieldName: string, value: any) {
    console.log(`Stopwatch ${fieldName} value changed:`, value);
    this.form.get(fieldName)?.setValue(value);
  }
  
  onTimeManagementValueChange(fieldName: string, value: any): void {
    console.log(`Time management field ${fieldName} value changed:`, value);
    const control = this.form.get(fieldName);
    if (control) {
      control.setValue(value);
      control.markAsDirty();
    }
  }
  
  getStopwatchSettings(field: FieldConfig): StopwatchSettings {
    return {
      laps: field.options.laps,
      minLaps: field.options.minLaps,
      maxLaps: field.options.maxLaps
    };
  }
  
  getTimerSettings(field: FieldConfig): ExtendedTimerSettings {
    const settings: ExtendedTimerSettings = {
      workDuration: field.options.workDuration || 25 * 60 * 1000,
      breakDuration: field.options.breakDuration || 5 * 60 * 1000,
      sessions: field.options.sessions || 4,
      longBreakDuration: field.options.longBreakDuration || 15 * 60 * 1000,
      longBreakInterval: field.options.longBreakInterval || 4,
      sessionLabels: {}
    };
  
    // Transform sessionLabels if necessary
    if (typeof field.options.sessionLabels === 'object' && field.options.sessionLabels !== null) {
      const transformedLabels: { [key: number]: { work?: string, break?: string } } = {};
      for (const [key, value] of Object.entries(field.options.sessionLabels)) {
        const sessionNumber = parseInt(key, 10);
        if (!transformedLabels[sessionNumber]) {
          transformedLabels[sessionNumber] = {};
        }
        if (typeof value === 'object' && value !== null) {
          if ('work' in value) {
            transformedLabels[sessionNumber].work = (value as any).work as string;
          }
          if ('break' in value) {
            transformedLabels[sessionNumber].break = (value as any).break as string;
          }
        } else if (typeof value === 'string') {
          // Handle the case where it's a string (old format)
          transformedLabels[sessionNumber].work = value;
        }
      }
      settings.sessionLabels = transformedLabels;
    }
  
    return settings;
  }
  private getDefaultValues(fields: FieldConfig[]): any {
    const defaultValues: any = {};
    fields.forEach(field => {
      if (field.options && field.options.default !== undefined) {
        defaultValues[field.name] = field.options.default;
      }
      if (field.type === 'LIST' && field.options && field.options.listFields) {
        defaultValues[field.name] = [this.getDefaultValues(field.options.listFields)];
      }
      if (field.type === 'TABLE' && field.options && field.options.columns) {
        defaultValues[field.name] = [this.getDefaultValues(field.options.columns)];
      }
    });
    return defaultValues;
  }
  
}