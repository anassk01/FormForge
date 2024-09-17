//src/app/components/code-analysis/code-analysis.component.ts
import { Component, Input, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CodeService } from '../../services/code.service';
import { CreditService } from '../../services/credit.service';
import { CodeInputComponent } from '../code-input/code-input.component';
import { ResultDisplayComponent } from '../result-display/result-display.component';
import { Form  } from '../../interfaces/workspace.interface';
export interface ParsedStructure {
  entryName: string;
  fields: ParsedField[];
}
export interface ParsedField {
  type: string;
  name: string;
  description: string;
  required: boolean;
  options: FieldOptions;
  fields?: ParsedField[]; // For nested structures like LIST and TABLE
}
interface FieldOptions {
  default?: any;
  range?: { min: number; max: number };
  min?: number;
  max?: number;
  columns?: ParsedField[];
  laps?: number;
  minLaps?: number;
  maxLaps?: number;
  workDuration?: number;
  breakDuration?: number;
  sessions?: number;
  longBreakDuration?: number;
  longBreakInterval?: number;
  listFields: ParsedField[];
}
@Component({
  selector: 'app-code-analysis',
  standalone: true,
  imports: [CommonModule, CodeInputComponent, ResultDisplayComponent, MatSnackBarModule],
  template: `
    @if (loading()) {
      <div class="loading">Interpreting code...</div>
    }
    <div>
      <app-code-input (codeSubmitted)="interpretCode($event)"></app-code-input>
      @if (interpretedStructure()) {
        <app-result-display [result]="interpretedStructure()"></app-result-display>

      }
      @if (error()) {
        <div class="error">{{ error() }}</div>
      }
    </div>
    <div class="credit-info">
      Available Credits: {{ credits() }}
    </div>
  `,
  styles: [/* ... styles remain the same ... */]
})
export class CodeAnalysisComponent {
  @Input() workspaceId: string = '';
  @Input() folderId: string = '';
  @Output() formGenerated = new EventEmitter<any>();
  private interpretedStructureSignal = signal<ParsedStructure | null>(null);
  private errorSignal = signal<string | null>(null);
  private loadingSignal = signal(false);
  private creditsSignal = signal(0);
  interpretedStructure = computed(() => this.interpretedStructureSignal());
  error = computed(() => this.errorSignal());
  loading = computed(() => this.loadingSignal());
  credits = computed(() => this.creditsSignal());

  private codeService = inject(CodeService);
  private creditService = inject(CreditService);
  private snackBar = inject(MatSnackBar);
  constructor() {
    this.loadCredits();
  }
  interpretCode(code: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    if (this.credits() < 1) {
      this.snackBar.open('Insufficient credits. Please purchase more credits to continue.', 'Close', { duration: 5000 });
      this.loadingSignal.set(false);
      return;
    }

    this.codeService.interpretCode(code).subscribe({
      next: (response) => {
        this.processInterpretedStructure(response.structure);
        this.loadingSignal.set(false);
        this.snackBar.open('Code interpreted successfully', 'Close', { duration: 3000 });
        this.useCredits(1, 'Code Analysis');
      },
      error: (error) => {
        this.interpretedStructureSignal.set(null);
        this.errorSignal.set(this.getDetailedErrorMessage(error));
        this.loadingSignal.set(false);
        this.snackBar.open('Error interpreting code. See details below.', 'Close', { duration: 5000 });
      }
    });
  }

  private loadCredits(): void {
    this.creditService.getCreditBalance().subscribe({
      next: (response) => {
        this.creditsSignal.set(response.credits);
        if (response.credits < 5) {
          this.snackBar.open('Low credit balance. Please consider purchasing more credits.', 'Close', { duration: 5000 });
        }
      },
      error: (error) => console.error('Error loading credits', error)
    });
  }
  private useCredits(amount: number, description: string): void {
    this.creditService.useCredits(amount, description).subscribe({
      next: (response) => {
        this.creditsSignal.set(response.credits);
        if (response.credits < 5) {
          this.snackBar.open('Low credit balance. Please consider purchasing more credits.', 'Close', { duration: 5000 });
        }
      },
      error: (error) => console.error('Error using credits', error)
    });
  }

  private processInterpretedStructure(structure: ParsedStructure): void {
    console.log('CodeAnalysisComponent: Processing interpreted structure:', structure);
    if (structure.fields && Array.isArray(structure.fields)) {
      structure.fields = structure.fields.map(field => this.processField(field));
    } else {
      console.warn('CodeAnalysisComponent: No fields found in the interpreted structure');
    }
    console.log('CodeAnalysisComponent: Processed fields:', structure.fields);
    this.interpretedStructureSignal.set(structure);
    
    const templateForm: Form = {
      _id: 'temp_' + Date.now(),
      name: structure.entryName || 'New Template',
      structure: structure,
      isTemplate: true,
      state: 'template',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.formGenerated.emit(templateForm);
  }
    
  private processField(field: ParsedField): ParsedField {
    console.log('CodeAnalysisComponent: Processing field:', field);
    switch (field.type.toUpperCase()) {
      case 'TEXT':
      case 'NUMBER':
      case 'DATE':
      case 'BOOLEAN':
      case 'SCALE':
        console.log(`CodeAnalysisComponent: Processing ${field.type} field`);
        break;
      case 'LIST':
        console.log('CodeAnalysisComponent: Processing LIST field');
        if ('listFields' in field.options && Array.isArray(field.options.listFields)) {
          field.options.listFields = field.options.listFields.map(listField => this.processField(listField));
        }
        break;
      case 'TABLE':
        console.log('CodeAnalysisComponent: Processing TABLE field');
        if ('columns' in field.options && Array.isArray(field.options.columns)) {
          field.options.columns = field.options.columns.map(column => this.processField(column));
        }
        break;
      case 'STOPWATCH':
        console.log('CodeAnalysisComponent: Processing STOPWATCH field');
        break;
      case 'TIMER':
        console.log('CodeAnalysisComponent: Processing TIMER field');
        break;
      default:
        console.warn(`CodeAnalysisComponent: Unknown field type: ${field.type}`);
    }
    return field;
  }


  private getDetailedErrorMessage(error: any): string {
    if (error.name === 'ParserError' || error.name === 'LexerError') {
      return `${error.name} at line ${error.line}, column ${error.column}: ${error.message}`;
    }
    return error.message || 'An unexpected error occurred';
  }
}