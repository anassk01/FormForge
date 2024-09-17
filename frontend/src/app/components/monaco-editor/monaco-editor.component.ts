import { Component, ElementRef, Input, OnInit, ViewChild, forwardRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div #editorContainer class="editor-container"></div>
  @if (!isBrowser) {
    <textarea [(ngModel)]="_value" (ngModelChange)="onChange($event)"></textarea>
  }
`,

styleUrls: ['./monaco-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonacoEditorComponent),
      multi: true
    }
  ]
})
export class MonacoEditorComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Input() options: any = {}; // Add this line to properly define the input
  isBrowser: boolean;

  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  public _value: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit() {}

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initMonaco();
    }
  }

  private async initMonaco() {
    if (!this.editorContainer) {
      console.error('Editor container not found.');
      return;
    }
    try {
      const monaco = await import('monaco-editor');

    // Define a custom language for syntax highlighting
    monaco.languages.register({ id: 'customLanguage' });
    monaco.languages.setMonarchTokensProvider('customLanguage', {
      keywords: [
        'ENTRY', 'TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'SCALE', 'LIST', 'TABLE', 'TIMER', 'STOPWATCH', 'COLUMN',
        'WORK', 'BREAK', 'SESSIONS', 'LONG_BREAK', 'SESSION_LABELS', 'AFTER'
      ],
      operators: [
        'REQUIRED', 'DEFAULT', 'RANGE', 'MIN', 'MAX', 'LAPS', 'MIN_LAPS', 'MAX_LAPS', 'MULTILINE'
      ],
      tokenizer: {
        root: [
          [/\/\/.*/, 'comment'],
          [/[{}]/, 'delimiter'],
          [/"[^"]*"/, 'string'],
          [/\b\d+\b/, 'number'],
          [/\b(W|B)\b/, 'phase'],
          [/\b(ENTRY|TEXT|NUMBER|DATE|BOOLEAN|SCALE|LIST|TABLE|TIMER|STOPWATCH|COLUMN|WORK|BREAK|SESSIONS|LONG_BREAK|SESSION_LABELS|AFTER)\b/, 'keyword'],
          [/\b(REQUIRED|DEFAULT|RANGE|MIN|MAX|LAPS|MIN_LAPS|MAX_LAPS|MULTILINE)\b/, 'operator'],
          [/[a-zA-Z_]\w*/, 'identifier'],
        ]
      }
    });

    // Create the editor
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this._value,
      language: 'customLanguage',
      theme: 'vs-dark',
      minimap: { enabled: false },
      automaticLayout: true,
      ...this.options
    });

    this.editor.onDidChangeModelContent(() => {
      const newValue = this.editor?.getValue() || '';
      this._value = newValue;
      this.onChange(this._value);
      this.onTouched();
    });
  } catch (error) {
    console.error('Error loading Monaco Editor:', error);
  }
}


  writeValue(value: string): void {
    this._value = value || '';
    if (this.editor) {
      this.editor.setValue(this._value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.editor) {
      this.editor.updateOptions({ readOnly: isDisabled });
    }
  }

  public onChange = (_: any) => {};
  private onTouched = () => {};

  // Ensure _value is public or has a public accessor
    public get value(): string {
      return this._value;
    }
    public set value(v: string) {
      this._value = v;
      this.onChange(v);
    }

}