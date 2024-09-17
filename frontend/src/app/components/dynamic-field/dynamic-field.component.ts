// src/app/components/dynamic-field/dynamic-field.component.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FieldConfig } from '../../interfaces/shared.interface';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  template: `
    @if (field.description && !hideDescription) {
      <p class="field-description">{{ field.description }}</p>
    }
    @switch (field.type) {
      @case ('TEXT') {
        <mat-form-field>
          @if (field.options.multiline) {
            <textarea matInput [formControl]="formControl" [placeholder]="field.name" 
                      [required]="field.required" [attr.maxlength]="field.options.maxLength"
                      rows="3"></textarea>
          } @else {
            <input matInput [formControl]="formControl" [placeholder]="field.name" 
                   [required]="field.required" [attr.maxlength]="field.options.maxLength">
          }
          @if (formControl.invalid) {
            <mat-error>{{getErrorMessage()}}</mat-error>
          }
        </mat-form-field>
      }
      @case ('NUMBER') {
        <mat-form-field>
          <input matInput type="number" [formControl]="formControl" [placeholder]="field.name" 
                 [required]="field.required" [min]="field.options.range?.min ?? null" [max]="field.options.range?.max ?? null">
          @if (formControl.invalid) {
            <mat-error>{{getErrorMessage()}}</mat-error>
          }
        </mat-form-field>
      }
      @case ('DATE') {
        <mat-form-field>
          <input matInput [matDatepicker]="picker" [formControl]="formControl" [placeholder]="field.name" [required]="field.required">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          @if (formControl.invalid) {
            <mat-error>{{getErrorMessage()}}</mat-error>
          }
        </mat-form-field>
      }
      @case ('BOOLEAN') {
        <mat-checkbox [formControl]="formControl">
          {{field.name}}
        </mat-checkbox>
      }
      @case ('SCALE') {
        <mat-form-field>
          <mat-select [formControl]="formControl" [placeholder]="field.name" [required]="field.required">
            @for (value of getScaleRange(); track value) {
              <mat-option [value]="value">{{value}}</mat-option>
            }
          </mat-select>
          @if (formControl.invalid) {
            <mat-error>{{getErrorMessage()}}</mat-error>
          }
        </mat-form-field>
      }
    }
  `,
  styles: [`
    .field-description {
      margin-bottom: 8px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.54);
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class DynamicFieldComponent implements OnInit, OnDestroy {
  @Input() field!: FieldConfig;

  private destroy$ = new Subject<void>();
  @Input() control!: AbstractControl;
  @Input() readOnly: boolean = false;
  @Input() hideDescription: boolean = false;
  
  get formControl(): FormControl {
    if (this.control instanceof FormControl) {
      return this.control;
    }
    if (this.control instanceof AbstractControl) {
      return new FormControl(this.control.value, this.control.validator);
    }
    console.warn(`No valid control for ${this.field.name}. Creating a new FormControl.`);
    return new FormControl();
  }

  ngOnInit() {
    this.setValidators();
    this.listenForChanges();
    this.updateReadOnlyState();
  }

  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private updateReadOnlyState() {
    if (this.readOnly) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
  
  setValidators() {
    const validators: ValidatorFn[] = [];
    if (this.field.required) {
      validators.push(Validators.required);
    }
    if (this.field.type === 'NUMBER' && this.field.options.range) {
      if (this.field.options.range.min !== undefined) {
        validators.push(Validators.min(this.field.options.range.min));
      }
      if (this.field.options.range.max !== undefined) {
        validators.push(Validators.max(this.field.options.range.max));
      }
    }
    if (this.field.type === 'TEXT' && this.field.options.maxLength) {
      validators.push(Validators.maxLength(this.field.options.maxLength));
    }
    this.formControl.setValidators(validators);
    this.formControl.updateValueAndValidity();
  }

  listenForChanges() {
    if (!this.control) {
      console.warn(`No control found for ${this.field.name}. Cannot listen for changes.`);
      return;
    }
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        console.log(`${this.field.name} value changed:`, value);
        if (this.control && !(this.control instanceof FormControl)) {
          this.control.setValue(value, { emitEvent: false });
        }
      });
  }

  getErrorMessage(): string {
    if (this.formControl.hasError('required')) {
      return 'This field is required';
    }
    if (this.formControl.hasError('min')) {
      return `Minimum value is ${this.field.options.range?.min}`;
    }
    if (this.formControl.hasError('max')) {
      return `Maximum value is ${this.field.options.range?.max}`;
    }
    if (this.formControl.hasError('maxlength')) {
      return `Maximum length is ${this.field.options.maxLength} characters`;
    }
    return 'Invalid input';
  }

  getScaleRange(): number[] {
    const min = this.field.options.range?.min ?? 1;
    const max = this.field.options.range?.max ?? 5;
    return Array.from({length: max - min + 1}, (_, i) => i + min);
  }
}