// config.ts

import { ValidationRule } from './validator';
import { FieldParserBase, ParsingContext } from './parser-types';

export interface FieldTypeConfig {
  name: string;
  parser: new (context: ParsingContext) => FieldParserBase;
  validationRules: ValidationRule[];
  options?: {
    [key: string]: {
      type: 'string' | 'number' | 'boolean';
      required?: boolean;
      defaultValue?: any;
    };
  };
}

export interface ParserConfig {
  fieldTypes: FieldTypeConfig[];
}

export class ConfigManager {
  private config: ParserConfig;

  constructor(config: ParserConfig) {
    this.config = config;
  }

  getFieldTypeConfig(typeName: string): FieldTypeConfig | undefined {
    return this.config.fieldTypes.find(ft => ft.name.toUpperCase() === typeName.toUpperCase());
  }

  getAllFieldTypeConfigs(): FieldTypeConfig[] {
    return this.config.fieldTypes;
  }
}