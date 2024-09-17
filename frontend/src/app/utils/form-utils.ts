// src/app/utils/form-utils.ts
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { FieldConfig, FieldOptions } from '../interfaces/shared.interface';

export class FormUtils {
  private static fb = new FormBuilder();

  static getValidators(field: FieldConfig): ValidatorFn[] {
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
    if (field.type.toUpperCase() === 'TEXT' && field.options?.maxLength) {
      validators.push(Validators.maxLength(field.options.maxLength));
    }
    return validators;
  }

  static getDefaultValue(field: FieldConfig): any {
    if (field.options?.default !== undefined) {
      return field.options.default;
    }
    switch (field.type.toUpperCase()) {
      case 'BOOLEAN':
        return false;
      case 'NUMBER':
      case 'SCALE':
      case 'DATE':
        return null;
      default:
        return '';
    }
  }

  static createListFormArray(field: FieldConfig): FormArray {
    const minItems = field.options?.minItems || 1;
    const listArray = this.fb.array([] as AbstractControl[]);
    for (let i = 0; i < minItems; i++) {
      const itemGroup = this.createListItemGroup(field);
      listArray.push(itemGroup);
    }
    return listArray;
  }

  static createTableFormArray(field: FieldConfig): FormArray {
    const tableArray = this.fb.array([] as FormGroup[]);
    if (field.options?.columns) {
      const initialRow = this.createTableRowGroup(field);
      tableArray.push(initialRow);
    }
    return tableArray;
  }

  public static createListItemGroup(field: FieldConfig): FormGroup {
    const group: { [key: string]: AbstractControl } = {};
    if (field.options?.listFields && Array.isArray(field.options.listFields)) {
      field.options.listFields.forEach(listField => {
        if (listField.name) {
          group[listField.name] = new FormControl(
            this.getDefaultValue(listField),
            this.getValidators(listField)
          );
        }
      });
    }
    return this.fb.group(group);
  }

  public static createTableRowGroup(field: FieldConfig): FormGroup {
    const rowGroup: { [key: string]: AbstractControl } = {};
    if (field.options?.columns && Array.isArray(field.options.columns)) {
      field.options.columns.forEach((column: FieldConfig) => {
        rowGroup[column.name] = this.fb.control(
          this.getDefaultValue(column),
          { validators: this.getValidators(column) }
        );
      });
    }
    return this.fb.group(rowGroup);
  }

  static applyInitialValues(form: FormGroup, initialValues: any, fields: FieldConfig[]): void {
    Object.keys(initialValues).forEach(key => {
      const control = form.get(key);
      if (control) {
        const field = fields.find(f => f.name === key);
        if (field && (field.type === 'STOPWATCH' || field.type === 'TIMER')) {
          control.setValue(initialValues[key]);
        } else {
          control.patchValue(initialValues[key]);
        }
      }
    });
  }

  static getDefaultValues(fields: FieldConfig[]): any {
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