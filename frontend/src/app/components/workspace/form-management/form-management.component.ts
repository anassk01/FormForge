//src/app/components/workspace/form-management/form-management.component.ts
import { Component, Input, Output, inject,Injector, OnInit, signal, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, computed, effect, runInInjectionContext } from '@angular/core';import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormDialogComponent } from '../../../dialogs/workspaces/form-dialog.component';
import { ConfirmDialogComponent } from '../../../dialogs/workspaces/confirm-dialog.component';
import { FormManagementService } from '../../../services/form-management.service';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { CodeAnalysisComponent } from '../../code-analysis/code-analysis.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatListModule } from '@angular/material/list'; 
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from '../../../pipes/format-time.pipe';
import { StopwatchComponent } from '../../time-management/stopwatch.component';
import { TimerComponent } from '../../time-management/timer.component'
import { Form, FormTemplate, FormInstance, FormSubmission } from '../../../interfaces/workspace.interface';

@Component({
  selector: 'app-form-management',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,  
    FormsModule, 
    MatListModule,        
    MatSlideToggleModule,
    FormGeneratorComponent,
    CodeAnalysisComponent,
    DatePipe,             
    JsonPipe  ,
    FormatTimePipe  ,
    StopwatchComponent, TimerComponent        
  ],


  template: `
<div class="form-management">
  @if (folderId) {
    <h3>Forms in {{folderName()}}</h3>
    <button mat-raised-button color="primary" (click)="addForm()">Add Form Template</button>
    
    <mat-accordion>
      @for (template of templates(); track template._id) {
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{template.name}} (Template)
            </mat-panel-title>
          </mat-expansion-panel-header>
          <div class="template-actions">
            <button mat-button (click)="viewForm(template, true)">View</button>
            <button mat-button (click)="editForm(template)">Edit</button>
            <button mat-button (click)="deleteForm(template)">Delete</button>
            <button mat-button (click)="createInstance(template)">Create Instance</button>
          </div>
          <div class="instances">
            <h4>Instances</h4>
            @if (getInstancesForTemplate(template._id).length > 0) {
              <mat-list>
                @for (instance of getInstancesForTemplate(template._id); track instance._id) {
                  <mat-list-item>
                    <span matListItemTitle>{{instance.name}}</span>
                    <button mat-icon-button (click)="viewForm(instance, false)">
                      <mat-icon>visibility</mat-icon>
                    </button>
                  </mat-list-item>
                }
              </mat-list>
            } @else {
              <p>No instances for this template.</p>
            }
          </div>
        </mat-expansion-panel>
      }
    </mat-accordion>

    @if (selectedFormSignal()) {
      <h3>{{ selectedFormSignal()?.name || selectedFormSignal()?.structure?.entryName || 'Untitled Form' }}</h3>
      
      <mat-slide-toggle [ngModel]="isEditable()" (ngModelChange)="onEditableToggle()" 
                        [disabled]="selectedFormSignal()?.state === 'submitted_instance'">
        {{ isEditable() ? 'Editable' : 'Read-only' }}
      </mat-slide-toggle>

      @if (selectedFormStructure() && selectedFormStructure().fields?.length > 0) {
        @if (isViewingSubmittedInstance()) {
          <div class="submitted-instance-view">
            @for (field of selectedFormStructure().fields; track field.name) {
              <div class="field-container mat-elevation-z2">
                <h4>{{ field.description }}</h4>
                @switch (field.type) {
                  @case ('TEXT') {
                    <p>{{ selectedFormSignal()?.values?.[field.name] || 'N/A' }}</p>
                  }
                  @case ('DATE') {
                    <p>{{ selectedFormSignal()?.values?.[field.name] | date:'mediumDate' || 'N/A' }}</p>
                  }
                  @case ('STOPWATCH') {
                    <div class="stopwatch-data">
                      <p><strong>Total Time:</strong> {{ selectedFormSignal()?.values?.[field.name]?.totalTime | formatTime:'ms' }}</p>
                      <p><strong>Completed:</strong> {{ selectedFormSignal()?.values?.[field.name]?.completed ? 'Yes' : 'No' }}</p>
                      <h3>Laps:</h3>
                      <ul>
                        @for (lap of selectedFormSignal()?.values?.[field.name]?.laps; track lap.number) {
                          <li>Lap {{ lap.number }}: {{ lap.time | formatTime:'ms' }}</li>
                        }
                      </ul>
                    </div>
                  }
                  @case ('TIMER') {
                    <div class="timer-data">
                      <p><strong>Total Time:</strong> {{ selectedFormSignal()?.values?.[field.name]?.totalTime | formatTime:'ms' }}</p>
                      <p><strong>Current Phase:</strong> {{ selectedFormSignal()?.values?.[field.name]?.currentPhase }}</p>
                      <p><strong>Current Session:</strong> {{ selectedFormSignal()?.values?.[field.name]?.currentSession }}</p>
                      <p><strong>Completed:</strong> {{ selectedFormSignal()?.values?.[field.name]?.completed ? 'Yes' : 'No' }}</p>
                      <h3>Completed Sessions:</h3>
                      <ul>
                        @for (session of selectedFormSignal()?.values?.[field.name]?.completedSessions; track session.id) {
                          <li>
                            Session {{ session.sessionNumber }}: 
                            {{ session.label }} - 
                            {{ session.phase }} - 
                            {{ session.duration | formatTime:'ms' }}
                          </li>
                        }
                      </ul>
                    </div>
                  }
                  @case ('SCALE') {
                    <p>{{ selectedFormSignal()?.values?.[field.name] || 'N/A' }}</p>
                  }
                  @case ('BOOLEAN') {
                    <p>{{ selectedFormSignal()?.values?.[field.name] ? 'Yes' : 'No' }}</p>
                  }
                  @case ('LIST') {
                    <ul>
                      @for (item of selectedFormSignal()?.values?.[field.name]; track $index) {
                        <li>{{ item | json }}</li>
                      }
                    </ul>
                  }
                  @default {
                    <pre>{{ selectedFormSignal()?.values?.[field.name] | json }}</pre>
                  }
                }
              </div>
            }
          </div>
        } @else {
          <app-form-generator
            [parsedCode]="selectedFormStructure()"
            [initialValues]="selectedFormSignal()?.values"
            [isTemplate]="selectedFormSignal()?.isTemplate ?? false"
            [readOnly]="!isEditable() || selectedFormSignal()?.state === 'submitted_instance'"
            (templateSaved)="onFormSaved($event)"
            (instanceSubmitted)="onFormSubmitted($event)">
          </app-form-generator>
        }
      } @else {
        <p>No form structure available or no fields defined. Please try reloading the form or add fields to the form structure.</p>
      }

      @if (!selectedFormSignal()?.isTemplate) {
        <h4>Submissions</h4>
        
        @if (submissions().length > 0) {
          <mat-list>
            @for (submission of submissions(); track submission._id) {
              <mat-list-item>
                <span matListItemTitle>Submitted on: {{ submission.submissionDate | date:'medium' }}</span>
                <pre matListItemLine>{{ submission.values | json }}</pre>
              </mat-list-item>
            }
          </mat-list>
        } @else {
          <p>No submissions for this form yet.</p>
        }
      }
    } @else {
      <p>No form selected. Please select a form to view or edit.</p>
    }

    <div class="debug-info">
      <h4>Debug Information:</h4>
      <div>
        <strong>Selected Form:</strong>
        <pre>{{ selectedFormSignal() | json }}</pre>
      </div>
      <div>
        <strong>Form Structure:</strong>
        <pre>{{ selectedFormStructure() | json }}</pre>
      </div>
      <p><strong>Is Editing Template:</strong> {{ isEditingTemplate() }}</p>
      <p><strong>Is Editable:</strong> {{ isEditable() }}</p>
    </div>

    <app-code-analysis 
      [workspaceId]="workspaceId"
      [folderId]="folderId"
      (formGenerated)="onFormGenerated($event)">
    </app-code-analysis>
  } @else {
    <p>Please select a folder to manage forms.</p>
  }
</div>
  `
  ,
  styles : [`
    .form-management {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title, .form-title {
  color: #333;
  margin-bottom: 20px;
}

.templates-accordion {
  margin-bottom: 30px;
}

.template-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.selected-form {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
}

.submitted-instance-view {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.field-container {
  background-color: #ffffff;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.field-title {
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.field-content {
  font-size: 14px;
}

.stopwatch-data ul, .timer-data ul, .list-data {
  padding-left: 20px;
  margin-bottom: 10px;
}

.stopwatch-data li, .timer-data li, .list-data li {
  margin-bottom: 5px;
}

.json-data {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
}

.submissions-title {
  margin-top: 30px;
  color: #333;
}

.submissions-list {
  margin-top: 15px;
}

.submission-item {
  background-color: #ffffff;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.submission-date {
  color: #666;
  margin-bottom: 10px;
}

.submission-values {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
}

.no-fields-message, .no-submissions-message, .no-form-selected-message, .no-folder-selected-message {
  color: #666;
  font-style: italic;
}

.debug-info {
  margin-top: 30px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.debug-info pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 12px;
}
    `]
})


export class FormManagementComponent implements OnChanges, OnInit {  

  @Input() workspaceId!: string;
  @Input() folderId!: string;
  @Input() selectedForm: Form | null = null;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formSelected = new EventEmitter<Form>();

  templates = signal<FormTemplate[]>([]);
  instances = signal<FormInstance[]>([]);
  submissions = signal<FormSubmission[]>([]);
  folderName = signal<string>('');
  private _selectedFormSignal = signal<Form | null>(null);


  
  selectedFormSignal = computed(() => this._selectedFormSignal());
  private _selectedFormStructure = signal<any>(null);
  private dialog = inject(MatDialog);

  isEditingTemplate = computed(() => this._isEditingTemplate());
    private _isEditable = signal<boolean>(false);
  isEditable = computed(() => this._isEditable());


  isSubmittedInstance = computed(() => !this.isEditingTemplate() && !this.isEditable());

  formReadOnly = computed(() => {
    if (this.isEditingTemplate()) {
      return true; // Template editing is always read-only
    }
    if (this.isSubmittedInstance()) {
      return true; // Viewing submitted instance is read-only
    }
    return !this.isEditable(); // For new instances, respect the editable toggle
  });


  constructor(
    private formManagementService: FormManagementService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private injector: Injector
  ) {
    runInInjectionContext(this.injector, () => {
      this.setupEffects();
    });
  }
  

  private setupEffects(): void {
    effect(() => {
      const selectedForm = this._selectedFormSignal();
      console.log('Selected form updated:', selectedForm);
      console.log('Is template:', selectedForm?.isTemplate);
      console.log('Form state:', selectedForm?.state);
    }, { allowSignalWrites: true });
  }

  private initializeForm(): void {
    const selectedForm = this._selectedFormSignal();
    if (selectedForm && selectedForm.structure) {
      this._selectedFormStructure.set(selectedForm.structure);
    } else if (!selectedForm) {
      this._selectedFormStructure.set(null);
    }
    
    if (this.folderId) {
      this.loadForms();
    }
  }

  ngOnInit() {
    this.initializeForm();
  }


onEditableToggle(): void {
  this._isEditable.update(value => !value);
  console.log('Editable mode:', this._isEditable());
}

  selectedFormStructure = computed(() => this._selectedFormStructure());
  private _isEditingTemplate = signal<boolean>(true);



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['folderId'] && this.folderId) {
      this.loadForms();
    }
    if (changes['selectedForm']) {
      this._selectedFormSignal.set(this.selectedForm);
    }


  }

  private loadForms(): void {
    if (!this.workspaceId || !this.folderId) {
      console.error('WorkspaceId or FolderId is missing');
      return;
    }
    this.formManagementService.getFormsInFolder(this.workspaceId, this.folderId).subscribe({
      next: ({templates, instances}) => {
        this.templates.set(templates);
        this.instances.set(instances);
        console.log('Loaded forms:', { templates, instances });
      },
      error: (error) => {
        console.error('Error loading forms:', error);
        this.snackBar.open('Error loading forms. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }

  loadInstancesForTemplate(templateId: string): void {
    this.formManagementService.getFormInstances(this.workspaceId, this.folderId, templateId).subscribe({
      next: (instances) => {
        this.instances.set(instances.filter((instance): instance is FormInstance => 
          !instance.isTemplate && 'submissionDate' in instance
        ));
      },
      error: (error) => {
        console.error('Error loading form instances:', error);
        this.snackBar.open('Error loading form instances. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
  
  createInstance(template: FormTemplate): void {
    this._selectedFormSignal.set({ ...template, isTemplate: false, values: {} });
    this._selectedFormStructure.set(template.structure);
    this._isEditingTemplate.set(false);
    this._isEditable.set(true);  // Ensure new instances are editable
  }

  onFormSaved(event: { formData: any, structure: any }): void {
    const selectedForm = this.selectedFormSignal();
    if (selectedForm) {
      if (this.isEditingTemplate()) {
        if (selectedForm._id.startsWith('temp_')) {
          // This is a new template, so we need to create it
          this.createFormTemplate(selectedForm as FormTemplate, event);
        } else {
          // This is an existing template, so we update it
          this.updateFormTemplate(selectedForm as FormTemplate, event);
        }
      } else {
        this.createFormInstance(selectedForm as FormTemplate, event);
      }
    } else {
      this.snackBar.open('No form selected. Please select a form before saving.', 'Close', { duration: 5000 });
    }
  }
  private createFormTemplate(template: FormTemplate, event: { formData: any, structure: any }): void {
    this.formManagementService.createForm(
      this.workspaceId,
      this.folderId,
      {
        name: template.name,
        structure: event.structure || {}, // Ensure structure is always passed
        isTemplate: true as const
      }
    ).subscribe({
      next: (createdTemplate) => {
        this.snackBar.open('Template created successfully!', 'Close', { duration: 3000 });
        this.loadForms();
        this._selectedFormSignal.set(createdTemplate);
        this._selectedFormStructure.set(createdTemplate.structure);
      },
      error: (error) => {
        console.error('Error creating template:', error);
        this.snackBar.open(`Error creating template: ${error.message}`, 'Close', { duration: 5000 });
      }
    });
  }

  onFormSubmitted(event: { formData: any, structure: any }): void {
    console.log('onFormSubmitted called with event:', event);
    const workspaceId = this.workspaceId;
    const folderId = this.folderId;
    const selectedForm = this._selectedFormSignal();
    
    console.log('Submission context:', { workspaceId, folderId, selectedForm });
  
    if (!workspaceId || !folderId || !selectedForm) {
      this.snackBar.open('Unable to submit form: Workspace, folder, or form not selected', 'Close', { duration: 3000 });
      return;
    }
  
    const formattedData = this.formatFormData(event.formData);
    
    // If the form is a new template (has a temp ID), create it first
    if (selectedForm._id.startsWith('temp_')) {
      const newForm: Partial<FormTemplate> = {
        name: selectedForm.name,
        structure: selectedForm.structure,
        isTemplate: true,
        state: 'template'
      };
  
      this.formManagementService.createForm(workspaceId, folderId, newForm).subscribe({
        next: (createdForm) => {
          console.log('New form created:', createdForm);
          this.submitFormData(workspaceId, folderId, createdForm._id, formattedData);
        },
        error: (error) => {
          console.error('Error creating new form:', error);
          this.snackBar.open('Error creating new form. Please try again.', 'Close', { duration: 5000 });
        }
      });
    } else {
      this.submitFormData(workspaceId, folderId, selectedForm._id, formattedData);
    }
  }

  
  private formatFormData(data: any): any {
    const formatted: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Date) {
        formatted[key] = value.toISOString();
      } else if (typeof value === 'object' && value !== null) {
        if ('laps' in value || 'completedSessions' in value) {
          // This is likely a time management field
          formatted[key] = this.formatTimeManagementField(value);
        } else if (Array.isArray(value)) {
          formatted[key] = value.map(item => this.formatFormData(item));
        } else {
          formatted[key] = this.formatFormData(value);
        }
      } else {
        formatted[key] = value;
      }
    }
    return formatted;
  }

  private formatTimeManagementField(field: any): any {
    if ('laps' in field) {
      // Stopwatch
      return {
        type: 'STOPWATCH',
        laps: field.laps,
        totalTime: field.totalTime,
        completed: field.completed
      };
    } else if ('completedSessions' in field) {
      // Timer
      return {
        type: 'TIMER',
        completedSessions: field.completedSessions,
        currentPhase: field.currentPhase,
        currentSession: field.currentSession,
        totalTime: field.totalTime,
        completed: field.completed
      };
    }
    return field;
  }


  private submitFormData(workspaceId: string, folderId: string, formId: string, formData: any): void {
    console.log('Submitting form data:', { workspaceId, folderId, formId, formData });
    const submissionData = { values: formData };
  
    this.formManagementService.submitForm(workspaceId, folderId, formId, submissionData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        this.snackBar.open('Form submitted successfully!', 'Close', { duration: 3000 });
        
        if (response.instance) {
          this.updateInstances(response.instance);
        }
  
        this.loadFormsInFolder(folderId);
        this._selectedFormSignal.set(response.instance);
        console.log('Updated selected form:', this._selectedFormSignal());
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        this.snackBar.open('Error submitting form. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
  
  private updateInstances(newInstance: Form): void {
    this.instances.update(instances => {
      const index = instances.findIndex(i => i._id === newInstance._id);
      if (index !== -1) {
        // Update existing instance
        return instances.map(i => i._id === newInstance._id ? { ...i, ...newInstance } as FormInstance : i);
      } else {
        // Add new instance
        const newFormInstance: FormInstance = {
          ...newInstance,
          isTemplate: false,
          parentTemplateId: newInstance.parentTemplateId || '',
          submissionDate: new Date(),
          state: 'submitted_instance',
          values: newInstance.values || {} // Ensure values is always defined
        };
        return [...instances, newFormInstance];
      }
    });
  }
  private processFormData(formData: any): any {
    const processedData: any = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value && typeof value === 'object' && 'type' in value && 'data' in value) {
        if (value.type === 'STOPWATCH' || value.type === 'TIMER') {
          processedData[key] = value;
        }
      } else {
        processedData[key] = value;
      }
    }
    return processedData;
  }

  private createFormInstance(template: FormTemplate, event: { formData: any, structure: any }): void {
    const formData = {
      name: `${template.name} - Instance`,
      structure: template.structure,
      isTemplate: false,
      parentTemplateId: template._id.startsWith('temp_') ? undefined : template._id,
      values: event.formData
    };
  
    this.formManagementService.createForm(this.workspaceId, this.folderId, formData).subscribe({
      next: (createdInstance) => {
        this.snackBar.open('Form instance created successfully!', 'Close', { duration: 3000 });
        this.loadForms();
        this.loadInstancesForTemplate(template._id);
      },
      error: (error) => {
        console.error('Error creating form instance:', error);
        this.snackBar.open(`Error creating form instance: ${error.message}`, 'Close', { duration: 5000 });
      }
    });
  }
  

getInstancesForTemplate(templateId: string): FormInstance[] {
  return this.instances().filter(instance => instance.parentTemplateId === templateId);
}

  private updateFormTemplate(template: FormTemplate, event: { formData: any, structure: any }): void {
    this.formManagementService.updateForm(
      this.workspaceId,
      this.folderId,
      template._id,
      { ...event.formData, structure: event.structure, isTemplate: true }
    ).subscribe({
      next: (updatedForm) => {
        this.snackBar.open('Template updated successfully!', 'Close', { duration: 3000 });
        this.loadForms();
      },
      error: (error) => {
        console.error('Error updating template:', error);
        this.snackBar.open(`Error updating template: ${error.message}`, 'Close', { duration: 5000 });
      }
    });
  }

  private updateFormInstance(instance: FormInstance, event: { formData: any, structure: any }): void {
    this.formManagementService.updateForm(
      this.workspaceId,
      this.folderId,
      instance._id,
      { ...event.formData, structure: event.structure }
    ).subscribe({
      next: (updatedForm) => {
        this.snackBar.open('Instance updated successfully!', 'Close', { duration: 3000 });
        this.loadForms();
      },
      error: (error) => {
        console.error('Error updating instance:', error);
        this.snackBar.open('Error updating instance. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
  
  addForm(): void {
    if (!this.workspaceId || !this.folderId) {
      this.snackBar.open('Unable to add form: Workspace or folder not selected', 'Close', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      data: { form: {}, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = {
          name: result.name,
          structure: result.structure || {},
          isTemplate: true
        };

        this.formManagementService.createForm(this.workspaceId, this.folderId, formData).subscribe({
          next: (createdForm) => {
            this.snackBar.open('Form created successfully', 'Close', { duration: 3000 });
            this.loadForms();
            this._selectedFormSignal.set(createdForm);
          },
          error: (error: Error) => {
            console.error('Error creating form:', error);
            this.snackBar.open('Error creating form. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  editForm(form: Form): void {
    if (!this.folderId) return;

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      data: { form: form, isNew: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.folderId) {
        this.formManagementService.updateForm(this.workspaceId, this.folderId, form._id, result).subscribe({
          next: () => {
            this.snackBar.open('Form updated successfully', 'Close', { duration: 3000 });
            this.loadForms();
          },
          error: (error: Error) => {
            console.error('Error updating form:', error);
            this.snackBar.open('Error updating form. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  deleteForm(form: Form): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { 
        title: 'Confirm Deletion', 
        message: `Are you sure you want to delete the form "${form.name}"? This action cannot be undone.` 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formManagementService.deleteForm(this.workspaceId, this.folderId, form._id).subscribe({
          next: () => {
            this.snackBar.open('Form deleted successfully!', 'Close', { duration: 3000 });
            this.loadForms();
            if (this.selectedFormSignal() === form) {
              this._selectedFormSignal.set(null);
            }
          },
          error: (error) => {
            console.error('Error deleting form:', error);
            this.snackBar.open(`Error deleting form: ${error.message}`, 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  private loadSubmissions(formId: string): void {
    this.formManagementService.getFormSubmissions(this.workspaceId, this.folderId, formId).subscribe({
      next: (submissions) => {
        this.submissions.set(submissions);
      },
      error: (error) => {
        console.error('Error loading submissions:', error);
        this.snackBar.open('Error loading submissions. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }

  isViewingSubmittedInstance = computed(() => 
    this.selectedFormSignal()?.state === 'submitted_instance'
  );

  
  viewSubmittedInstance(instance: FormInstance): void {
    this.formManagementService.getSubmittedInstance(this.workspaceId, this.folderId, instance._id)
      .subscribe({
        next: (submittedInstance: FormInstance) => {
          this._selectedFormSignal.set(submittedInstance);
          this._isEditable.set(false);
        },
        error: (error: any) => {
          console.error('Error fetching submitted instance:', error);
          this.snackBar.open('Error fetching submitted instance. Please try again.', 'Close', { duration: 5000 });
        }
      });
  }
  


  viewForm(form: Form, isTemplate: boolean): void {
    console.log('Viewing form:', JSON.stringify(form, null, 2));
    this._selectedFormSignal.set(form);
    this._isEditingTemplate.set(isTemplate);
    this.formSelected.emit(form);
    
    if (form.structure) {
      console.log('Setting form structure:', JSON.stringify(form.structure, null, 2));
      this._selectedFormStructure.set(form.structure);
    } else {
      console.warn('No structure found in the form, setting to empty object');
      this._selectedFormStructure.set({});
    }
    
    if (!isTemplate && form.state === 'submitted_instance') {
      console.log('Viewing submitted instance:', JSON.stringify(form.values, null, 2));
      this._isEditable.set(false);  // Set to read-only mode for submitted instances
      this.loadSubmissions(form._id);
    } else if (!isTemplate) {
      this._isEditable.set(true);  // Set to editable mode for new instances
    } else {
      this._isEditable.set(false);  // Set to read-only mode for templates
    }
  }



  onTemplateSaved(event: { formData: any, structure: any }): void {
    const selectedForm = this.selectedFormSignal();
    if (selectedForm && selectedForm.isTemplate) {
      this.formManagementService.updateForm(
        this.workspaceId,
        this.folderId,
        selectedForm._id,
        { ...event.formData, structure: event.structure }
      ).subscribe({
        next: (updatedForm) => {
          this.snackBar.open('Template saved successfully!', 'Close', { duration: 3000 });
          this.loadForms();
          this._selectedFormSignal.set(updatedForm);
        },
        error: (error) => {
          console.error('Error saving template:', error);
          this.snackBar.open('Error saving template. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }
  


  onInstanceSubmitted(event: { formData: any, structure: any }): void {
    const selectedForm = this.selectedFormSignal();
    if (selectedForm && selectedForm.isTemplate) {
      this.formManagementService.submitForm(
        this.workspaceId,
        this.folderId,
        selectedForm._id,
        { ...event.formData, parentTemplateId: selectedForm._id }
      ).subscribe({
        next: (submittedInstance) => {
          this.snackBar.open('Form instance submitted successfully!', 'Close', { duration: 3000 });
          this.loadForms();
          this.loadSubmissions(selectedForm._id);
        },
        error: (error) => {
          console.error('Error submitting form instance:', error);
          this.snackBar.open('Error submitting form instance. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }

  

  onFormGenerated(generatedForm: any): void {
    console.log('FormManagementComponent: onFormGenerated called', generatedForm);
    if (!generatedForm.name || !generatedForm.structure) {
      console.error('Invalid form data:', generatedForm);
      this.snackBar.open('Error: Form name and structure are required', 'Close', { duration: 5000 });
      return;
    }
  
    const newForm: FormTemplate = {
      _id: `temp_${Date.now()}`,
      name: generatedForm.name,
      structure: generatedForm.structure,
      isTemplate: true,
      state: 'template',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this._selectedFormSignal.set(newForm);
    this._selectedFormStructure.set(newForm.structure);
    console.log('FormManagementComponent: Selected form set', this._selectedFormSignal());
    console.log('FormManagementComponent: Form structure set', this._selectedFormStructure());
    this.cdr.detectChanges();
  }
  
  
getFieldSettings(field: any): any {
  if (field.type === 'STOPWATCH') {
    return {
      laps: field.options?.laps,
      minLaps: field.options?.minLaps,
      maxLaps: field.options?.maxLaps
    };
  } else if (field.type === 'TIMER') {
    return {
      workDuration: field.options?.workDuration,
      breakDuration: field.options?.breakDuration,
      sessions: field.options?.sessions,
      longBreakDuration: field.options?.longBreakDuration,
      longBreakInterval: field.options?.longBreakInterval,
      sessionLabels: field.options?.sessionLabels
    };
  }
  return {};
}

  onTimeManagementValueChange(fieldName: string, value: any): void {
    if (this.selectedFormSignal()) {
      const updatedForm: Form = {
        ...this.selectedFormSignal()!,
        values: {
          ...this.selectedFormSignal()!.values,
          [fieldName]: value
        }
      };
      
      this._selectedFormSignal.set(updatedForm);
    }
  }


  loadFormsInFolder(folderId: string): void {
    if (this.workspaceId) {
      this.formManagementService.getFormsInFolder(this.workspaceId, folderId).subscribe({
        next: ({templates, instances}) => {
          this.templates.set(templates);
          this.instances.set(instances);
          console.log('Loaded templates:', this.templates());
          console.log('Loaded instances:', this.instances());
        },
        error: (error) => {
          console.error('Error loading forms:', error);
          this.snackBar.open('Error loading forms. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }

  
  testFormCreationAndSubmission(): void {
    console.log('Testing form creation and submission');
    const testEvent = {
      formData: {
        testField: 'Test Value'
      },
      structure: {
        fields: [
          { name: 'testField', type: 'TEXT' }
        ]
      }
    };
  // Create a new form template
  const newTemplate: Partial<FormTemplate> = {
    name: 'Test Template',
    structure: testEvent.structure,
    isTemplate: true,
    state: 'template'
  };

  this.formManagementService.createForm(this.workspaceId, this.folderId, newTemplate).subscribe({
    next: (createdForm) => {
      console.log('New form template created:', createdForm);
      
      // Now submit an instance of this template
      this.submitFormData(this.workspaceId, this.folderId, createdForm._id, testEvent.formData);
    },
    error: (error) => {
      console.error('Error creating new form template:', error);
    }
  });
}



  
}
