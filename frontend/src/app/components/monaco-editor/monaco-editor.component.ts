import { Component, ElementRef, Input, OnInit, ViewChild, forwardRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  imports: [FormsModule],
  template: `<div #editorContainer class="editor-container"></div>`,
  styles: [`
    .editor-container {
      height: 400px;
      border: 1px solid #ccc;
    }
  `],
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
  @Input() options: any = {};
  
  private editor: any = null;
  private _value: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMonaco();
    }
  }

  private async initMonaco() {
    if (!this.editorContainer) {
      throw new Error('Editor container not found.');
    }

    const monaco = await import('monaco-editor');
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this._value,
      language: 'plaintext',
      theme: 'vs-dark',
      ...this.options
    });

    this.editor.onDidChangeModelContent(() => {
      const newValue = this.editor?.getValue();
      this._value = newValue || '';
      this.onChange(this._value);
      this.onTouched();
    });
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

  private onChange = (_: any) => {};
  private onTouched = () => {};
}