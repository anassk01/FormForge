import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
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
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { FieldConfig, FormData, FormStructure } from '../../interfaces/shared.interface';
import { TimerSettings } from '../time-management/time-management.types';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { FormUtils } from '../../utils/form-utils';
import { useFormManagement } from '../../utils/use-form-management';

interface StopwatchSettings {
  laps?: number;
  minLaps?: number;
  maxLaps?: number;
}

interface ExtendedTimerSettings extends TimerSettings {
  sessionLabels?: { [key: number]: { work?: string, break?: string } };
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
  @Input() isTemplate = true;
  @Input() initialValues: any = {};
  @Input() readOnly = false;
  @Input() formId!: string;
  @Input() isSubmittedInstance = false;

  @Output() formSaved = new EventEmitter<{ formData: FormData; structure: FormStructure }>();
  @Output() formSubmitted = new EventEmitter<{ formData: FormData; structure: FormStructure }>();
  @Output() templateSaved = new EventEmitter<{ formData: FormData; structure: FormStructure }>();
  @Output() instanceSubmitted = new EventEmitter<{ formData: FormData; structure: FormStructure }>();

  form!: FormGroup;
  fields: FieldConfig[] = [];
  entryName = '';

  private tableDataSources: { [key: string]: MatTableDataSource<FormGroup> } = {};
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);
  private formManagement = useFormManagement();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parsedCode'] && this.parsedCode) {
      this.initializeForm();
    }
    if (changes['readOnly']) {
      this.updateFormControlsState();
    }
  }

  private initializeForm(): void {
    this.entryName = this.parsedCode.entryName || 'Dynamic Form';
    this.fields = this.parsedCode.parsedFields || this.parsedCode.fields || [];
    this.form = this.formManagement.createForm(this.fields);
    this.initializeTableData();
    
    if (this.initialValues) {
      FormUtils.applyInitialValues(this.form, this.initialValues, this.fields);
    }
    this.updateFormControlsState();
  }

  private updateFormControlsState(): void {
    if (this.form) {
      this.readOnly ? this.form.disable() : this.form.enable();
    }
  }

  onSave(): void {
    if (this.isFillable()) {
      const formData = this.prepareFormData();
      const structure = { entryName: this.entryName, fields: this.fields };
      
      if (this.isTemplate) {
        this.templateSaved.emit({ formData, structure });
      } else {
        this.instanceSubmitted.emit({ formData, structure });
      }
    } else {
      this.form.markAllAsTouched();
      this.snackBar.open('Please fill all required fields correctly.', 'Close', { duration: 3000 });
    }
  }


  
  isReadOnly(): boolean {
    return this.readOnly || this.isSubmittedInstance;
  }

  isFillable(): boolean {
    // Allow saving template regardless of required fields
    if (this.isTemplate) {
      return true;
    }
    // For instances, require all fields to be valid and required tables to have data
    return this.form.valid && this.areRequiredTablesFilled();
  }


  private areRequiredTablesFilled(): boolean {
    return this.fields.every(field => {
      if (field.type === 'TABLE' && field.required) {
        const tableArray = this.form.get(field.name) as FormArray;
        return tableArray && tableArray.length > 0;
      }
      return true;
    });
  }

  private prepareFormData(): FormData {
    const formData: FormData = {};
    this.fields.forEach(field => {
      const control = this.form.get(field.name);
      if (control) {
        formData[field.name] = {
          type: field.type,
          value: control.value,
          options: field.options || {},
        };

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

  getFormControl(fieldName: string): AbstractControl {
    const control = this.form.get(fieldName);
    if (!control) {
      console.error(`Control ${fieldName} not found`);
      return new FormControl();
    }
    return control;
  }

  getFormArray(fieldName: string): FormArray | null {
    const control = this.form.get(fieldName);
    return control instanceof FormArray ? control : null;
  }

  getListControls(fieldName: string): AbstractControl[] {
    const listArray = this.getFormArray(fieldName);
    return listArray ? listArray.controls : [];
  }

  addListItem(field: FieldConfig): void {
    const listArray = this.getFormArray(field.name);
    if (listArray) {
      if (field.options?.maxItems && listArray.length >= field.options.maxItems) {
        this.snackBar.open(`Maximum of ${field.options.maxItems} items allowed.`, 'Close', { duration: 3000 });
        return;
      }
      const newGroup = FormUtils.createListItemGroup(field);
      listArray.push(newGroup);
      this.cdr.detectChanges();
    }
  }

  removeListItem(fieldName: string, index: number): void {
    const listArray = this.getFormArray(fieldName);
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

  addTableRow(field: FieldConfig): void {
    const tableArray = this.getFormArray(field.name);
    if (tableArray) {
      const newRow = FormUtils.createTableRowGroup(field);
      tableArray.push(newRow);
      this.updateTableDataSource(field.name);
      this.cdr.detectChanges();
    }
  }

  removeTableRow(field: FieldConfig, index: number): void {
    const tableArray = this.getFormArray(field.name);
    if (tableArray) {
      tableArray.removeAt(index);
      this.updateTableDataSource(field.name);
      this.cdr.detectChanges();
    }
  }

  getTableDataSource(fieldName: string): MatTableDataSource<FormGroup> {
    if (!this.tableDataSources[fieldName]) {
      const tableArray = this.form.get(fieldName) as FormArray;
      this.initializeTableDataSource(fieldName, tableArray?.controls as FormGroup[] || []);
    }
    return this.tableDataSources[fieldName];
  }

  getTableColumns(field: FieldConfig): string[] {
    return [...(field.options.columns?.map((column: FieldConfig) => column.name) || []), 'actions'];
  }

  private initializeTableDataSource(fieldName: string, initialData: FormGroup[]): void {
    this.tableDataSources[fieldName] = new MatTableDataSource<FormGroup>(initialData);
  }

  private updateTableDataSource(fieldName: string): void {
    const tableArray = this.form.get(fieldName) as FormArray;
    if (tableArray) {
      if (!this.tableDataSources[fieldName]) {
        this.initializeTableDataSource(fieldName, tableArray.controls as FormGroup[]);
      } else {
        this.tableDataSources[fieldName].data = tableArray.controls as FormGroup[];
      }
    }
  }

  initializeTableData(): void {
    this.fields.forEach(field => {
      if (field.type === 'TABLE') {
        this.updateTableDataSource(field.name);
      }
    });
  }

  onTimeManagementValueChange(fieldName: string, value: any): void {
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
    return {
      workDuration: field.options.workDuration || 25 * 60 * 1000,
      breakDuration: field.options.breakDuration || 5 * 60 * 1000,
      sessions: field.options.sessions || 4,
      longBreakDuration: field.options.longBreakDuration || 15 * 60 * 1000,
      longBreakInterval: field.options.longBreakInterval || 4,
      sessionLabels: field.options.sessionLabels
    };
  }

  getSavedTimeManagementData(fieldName: string): any {
    const control = this.form.get(fieldName);
    return control ? control.value : null;
  }

  // Additional utility methods
  isFormControl(fieldName: string): boolean {
    return this.form.get(fieldName) instanceof FormControl;
  }

  isFormArray(fieldName: string): boolean {
    return this.form.get(fieldName) instanceof FormArray;
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
    return new FormControl();
  }

  getScaleRange(range?: { min: number; max: number }): number[] {
    const min = range?.min ?? 1;
    const max = range?.max ?? 5;
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }

  onStopwatchValueChange(fieldName: string, value: any) {
    console.log(`Stopwatch ${fieldName} value changed:`, value);
    this.form.get(fieldName)?.setValue(value);
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

  isFieldEditable(field: FieldConfig): boolean {
    // If the form is in read-only mode, no field is editable
    if (this.readOnly) {
      return false;
    }
  
    // For templates, allow editing of non-required fields
    if (this.isTemplate) {
      return !field.required;
    }
  
    // For submitted instances, no field is editable
    if (this.isSubmittedInstance) {
      return false;
    }
  
    // In all other cases, the field is editable
    return true;
  }
  
    

  // Validators
  getStopwatchValidators(field: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    const options = field.options;
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
    return validators;
  }

  private exactLapsValidator(requiredLaps: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const laps = control.value.laps;
      return laps.length === requiredLaps ? null : { 'exactLaps': { required: requiredLaps, actual: laps.length } };
    };
  }

  private minLapsValidator(minLaps: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const laps = control.value.laps;
      return laps.length >= minLaps ? null : { 'minLaps': { required: minLaps, actual: laps.length } };
    };
  }

  private maxLapsValidator(maxLaps: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const laps = control.value.laps;
      return laps.length <= maxLaps ? null : { 'maxLaps': { allowed: maxLaps, actual: laps.length } };
    };
  }

  private sessionsValidator(requiredSessions: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value || !value.completedSessions) return null;
      return value.completedSessions.length <= requiredSessions ? null :
        { 'sessions': { required: requiredSessions, actual: value.completedSessions.length } };
    };
  }

  // Table required validator
  tableRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const tableArray = control as FormArray;
      return tableArray.length === 0 ? { 'requiredTable': true } : null;
    };
  }

  // Method to check if a field is required
  isFieldRequired(fieldName: string): boolean {
    const field = this.fields.find(f => f.name === fieldName);
    return field?.required || false;
  }

  // Method to get field error message
  getFieldErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control || !control.errors) return '';
    
    if (control.errors['required']) return 'This field is required.';
    if (control.errors['min']) return `Minimum value is ${control.errors['min'].min}.`;
    if (control.errors['max']) return `Maximum value is ${control.errors['max'].max}.`;
    if (control.errors['minlength']) return `Minimum length is ${control.errors['minlength'].requiredLength}.`;
    if (control.errors['maxlength']) return `Maximum length is ${control.errors['maxlength'].requiredLength}.`;
    
    return 'Invalid input.';
  }

  // Method to reset the form
  resetForm() {
    this.form.reset();
    this.fields.forEach(field => {
      if (field.type === 'TABLE') {
        const tableArray = this.form.get(field.name) as FormArray;
        tableArray.clear();
        this.updateTableDataSource(field.name);
      }
    });
    this.cdr.detectChanges();
  }

  // Utility method for debugging
  logFormState() {
    console.log('Current form state:', this.form.value);
    console.log('Form validity:', this.form.valid);
    console.log('Form errors:', this.form.errors);
  }
}