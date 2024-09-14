import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-view-submit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <h2>{{ formData.name }}</h2>
      @for (field of formData.structure.fields; track field.name) {
        <mat-form-field>
          <mat-label>{{ field.name }}</mat-label>
          <input matInput [formControlName]="field.name" [placeholder]="field.description">
        </mat-form-field>
      }
      <button mat-raised-button color="primary" type="submit">Submit</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 400px;
      margin: 0 auto;
    }
  `]
})
export class FormViewSubmitComponent implements OnInit {
    @Input() formData: any;
    @Output() formSubmitted = new EventEmitter<any>();
  
    form!: FormGroup;
  
    constructor(private fb: FormBuilder) {}
  
    ngOnInit() {
      this.createForm();
    }
  
    createForm() {
      const group: any = {};
      this.formData.structure.fields.forEach((field: any) => {
        group[field.name] = [''];
      });
      this.form = this.fb.group(group);
    }
  
    onSubmit() {
      if (this.form.valid) {
        this.formSubmitted.emit(this.form.value);
      }
    }
  }