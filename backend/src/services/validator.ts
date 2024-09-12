// validator.ts

import { ParsedField, FieldOptions } from './types';

export interface ValidationRule {
  validate(field: ParsedField): ValidationError[];
}

export class ValidationError {
  constructor(public message: string, public field: string) {}
}
export class RequiredFieldValidator implements ValidationRule {
    validate(field: ParsedField): ValidationError[] {
      if (field.required && !('default' in field.options)) {
        return [{ field: field.name, message: `Required field '${field.name}' has no default value` }];
      }
      return [];
    }
  }
  
  export class RangeValidator implements ValidationRule {
    validate(field: ParsedField): ValidationError[] {
      if (field.type === 'NUMBER' && 'range' in field.options) {
        const range = field.options.range;
        if (range && 'default' in field.options) {
          const value = field.options.default as number;
          if (value < range.min || value > range.max) {
            return [{ field: field.name, message: `Default value ${value} is out of range [${range.min}, ${range.max}] for field '${field.name}'` }];
          }
        }
      }
      return [];
    }
  }

export class Validator {
  private rules: ValidationRule[] = [
    new RequiredFieldValidator(),
    new RangeValidator(),
    // Add more validation rules as needed
  ];

  validate(field: ParsedField): ValidationError[] {
    return this.rules.flatMap(rule => rule.validate(field));
  }

  addRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }
}