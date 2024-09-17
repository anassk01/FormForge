//src/app/utils/use-form-management.ts
import { FormBuilder, FormGroup, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FieldConfig, FormData } from '../interfaces/shared.interface';
import { FormUtils } from './form-utils';


export function useFormManagement() {
  const fb = new FormBuilder();
  let tableDataSources: { [key: string]: MatTableDataSource<FormGroup> } = {};

  function createForm(fields: FieldConfig[]): FormGroup {
    const group: { [key: string]: any } = {};

    fields.forEach(field => {
      if (!field.name || !field.type) {
        console.error('Invalid field structure: missing name or type', field);
        return;
      }

      const validators = FormUtils.getValidators(field);

      switch (field.type.toUpperCase()) {
        case 'TEXT':
        case 'NUMBER':
        case 'DATE':
        case 'SCALE':
        case 'BOOLEAN':
          group[field.name] = [FormUtils.getDefaultValue(field), validators];
          break;
        case 'LIST':
          group[field.name] = FormUtils.createListFormArray(field);
          break;
          case 'TABLE':
            group[field.name] = FormUtils.createTableFormArray(field);
            if (field.required) {
              group[field.name].setValidators(tableRequiredValidator());
            }
            break;
        case 'STOPWATCH':
          group[field.name] = [{
            laps: [],
            completed: false
          }, { validators: getStopwatchValidators(field) }];
          break;
        case 'TIMER':
          group[field.name] = [{
            completedSessions: [],
            currentPhase: 'work',
            currentSession: 1,
            completed: false
          }, { validators: getTimerValidators(field) }];
          break;
        default:
          console.error(`Unsupported field type: ${field.type}`);
      }
    });

    return fb.group(group);
  }

  function isFormValid(form: FormGroup, fields: FieldConfig[], isTemplate: boolean): boolean {
    if (isTemplate) {
      return areNonTableFieldsValid(form, fields);
    } else {
      return form.valid && areRequiredTablesFilled(form, fields);
    }
  }

  function prepareFormData(form: FormGroup, fields: FieldConfig[]): FormData {
    const formData: FormData = {};
    fields.forEach(field => {
      const control = form.get(field.name);
      if (control) {
        formData[field.name] = {
          type: field.type,
          value: control.value,
          options: field.options || {},
        };

        switch (field.type) {
          case 'TIMER':
            formData[field.name].details = prepareTimerDetails(control.value, field.options);
            break;
          case 'STOPWATCH':
            formData[field.name].details = prepareStopwatchDetails(control.value, field.options);
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

  function initializeTableData(fields: FieldConfig[], form: FormGroup): void {
    fields.forEach(field => {
      if (field.type === 'TABLE') {
        updateTableDataSource(field.name, form);
      }
    });
  }

  function updateTableDataSource(fieldName: string, form: FormGroup): void {
    const tableArray = form.get(fieldName) as FormArray;
    if (tableArray) {
      if (!tableDataSources[fieldName]) {
        tableDataSources[fieldName] = new MatTableDataSource(tableArray.controls as FormGroup[]);
      } else {
        tableDataSources[fieldName].data = tableArray.controls as FormGroup[];
      }
    }
  }

  function getTableDataSource(fieldName: string): MatTableDataSource<FormGroup> {
    return tableDataSources[fieldName];
  }

  // Private helper functions
  function tableRequiredValidator(): any {
    return (control: FormArray): { [key: string]: any } | null => {
      return control.length === 0 ? { 'requiredTable': true } : null;
    };
  }

  function getStopwatchValidators(field: FieldConfig): any[] {
    // Implement stopwatch validators
    return [];
  }

  function getTimerValidators(field: FieldConfig): any[] {
    // Implement timer validators
    return [];
  }

  function areNonTableFieldsValid(form: FormGroup, fields: FieldConfig[]): boolean {
    return fields.every(field => {
      const control = form.get(field.name);
      return field.type !== 'TABLE' || (control && control.valid);
    });
  }

  function areRequiredTablesFilled(form: FormGroup, fields: FieldConfig[]): boolean {
    return fields.every(field => {
      if (field.type === 'TABLE' && field.required) {
        const tableArray = form.get(field.name) as FormArray;
        return tableArray && tableArray.length > 0;
      }
      return true;
    });
  }

  function prepareTimerDetails(value: any, options: any): any {
    // Implement timer details preparation
    return {};
  }

  function prepareStopwatchDetails(value: any, options: any): any {
    // Implement stopwatch details preparation
    return {};
  }

  return {
    createForm,
    isFormValid,
    prepareFormData,
    initializeTableData,
    updateTableDataSource,
    getTableDataSource,
  };
}