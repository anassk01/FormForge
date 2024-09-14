import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-code-input',
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule],
  template: `
    <div class="editor-container" #editorContainer></div>
    <button mat-raised-button color="primary" (click)="submitCode()">Analyze Code</button>
  `,
  styles: [`
    .editor-container {
      height: 400px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
    }
  `]
})
export class CodeInputComponent implements AfterViewInit {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Output() codeSubmitted = new EventEmitter<string>();

  private editor: monaco.editor.IStandaloneCodeEditor | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.initMonaco();
  }

  private initMonaco() {
    this.ngZone.runOutsideAngular(() => {
      this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
        value: '// Enter your code here',
        language: 'plaintext',
        theme: 'vs-dark',
        minimap: { enabled: false }
      });
    });
  }

  submitCode() {
    if (this.editor) {
      const code = this.editor.getValue();
      this.codeSubmitted.emit(code);
    }
  }
}