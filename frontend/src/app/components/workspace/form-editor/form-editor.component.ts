
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  template: `
    <textarea [(ngModel)]="code" rows="10" cols="50"></textarea>
    <button mat-raised-button color="primary" (click)="onSave()">Save Changes</button>
  `,
  styles: [`
    textarea {
      width: 100%;
      margin-bottom: 10px;
    }
  `]
})
export class FormEditorComponent {
  @Input() code: string = '';
  @Output() codeChanged = new EventEmitter<string>();

  onSave() {
    this.codeChanged.emit(this.code);
  }
}