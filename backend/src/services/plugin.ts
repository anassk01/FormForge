// plugin.ts

import { FieldParserBase, ParsingContext } from './parser-types';
import { ValidationRule } from './validator';

export interface FieldTypePlugin {
  typeName: string;
  parser: new (context: ParsingContext) => FieldParserBase;
  validationRules?: ValidationRule[];
}

export class PluginManager {
  private plugins: Map<string, FieldTypePlugin> = new Map();

  registerPlugin(plugin: FieldTypePlugin): void {
    this.plugins.set(plugin.typeName.toUpperCase(), plugin);
  }

  getPlugin(typeName: string): FieldTypePlugin | undefined {
    return this.plugins.get(typeName.toUpperCase());
  }

  getAllPlugins(): FieldTypePlugin[] {
    return Array.from(this.plugins.values());
  }
}