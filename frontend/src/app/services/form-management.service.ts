

// src/app/services/form-management.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Form, FormTemplate, FormInstance, FormSubmission, SavedForm ,AnyForm} from '../interfaces/workspace.interface';


@Injectable({
  providedIn: 'root'
})
export class FormManagementService {
  private apiUrl = `${environment.apiUrl}/workspaces`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('FormManagementService: An error occurred:', error);
    return throwError(() => new Error(`Error: ${error.message}`));
  }

  getFormsInFolder(workspaceId: string, folderId: string): Observable<{templates: FormTemplate[], instances: FormInstance[]}> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (Array.isArray(response)) {
          // If the response is an array, we need to filter it
          return {
            templates: response.filter((form): form is FormTemplate => form.isTemplate === true),
            instances: response.filter((form): form is FormInstance => form.isTemplate === false)
          };
        } else if (response && typeof response === 'object' && 'templates' in response && 'instances' in response) {
          // If the response is already in the correct format, return it as is
          return response as {templates: FormTemplate[], instances: FormInstance[]};
        } else {
          // If the response is in an unexpected format, throw an error
          throw new Error('Unexpected response format from API');
        }
      }),
      catchError(this.handleError)
    );
  }
  

  createForm(workspaceId: string, folderId: string, formData: Partial<FormTemplate> | Partial<FormInstance>): Observable<Form> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms`;
    return this.http.post<Form>(url, formData).pipe(
      catchError(this.handleError)
    );
  }




  updateForm(workspaceId: string, folderId: string, formId: string, formData: Partial<FormTemplate> | Partial<FormInstance>): Observable<Form> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}`;
    return this.http.put<Form>(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteForm(workspaceId: string, folderId: string, formId: string): Observable<void> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  saveForm(workspaceId: string, folderId: string, formId: string, formData: any): Observable<Form> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}/save`;
    return this.http.post<Form>(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  submitForm(workspaceId: string, folderId: string, formId: string, submissionData: any): Observable<{ instance: FormInstance }> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}/submit`;
    return this.http.post<{ instance: FormInstance }>(url, submissionData).pipe(
      catchError(this.handleError)
    );
  }

  getFormSubmissions(workspaceId: string, folderId: string, formId: string): Observable<FormSubmission[]> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}/submissions`;
    return this.http.get<FormSubmission[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  loadSavedForms(workspaceId: string, folderId: string): Observable<SavedForm[]> {
    return this.http.get<Form[]>(`${this.apiUrl}/${workspaceId}/folders/${folderId}/forms`).pipe(
      map(forms => forms.map(form => ({
        ...form,
        workspaceId,
        folderId
      }))),
      catchError(this.handleError)
    );
  }
  getFormInstances(workspaceId: string, folderId: string, templateId: string): Observable<Form[]> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${templateId}/instances`;
    return this.http.get<Form[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  viewForm(workspaceId: string, folderId: string, formId: string): Observable<SavedForm> {
    return this.http.get<Form>(`${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}`).pipe(
      map(form => ({
        ...form,
        workspaceId,
        folderId
      })),
      catchError(this.handleError)
    );
  }

  getFormTemplate(workspaceId: string, folderId: string, templateId: string): Observable<FormTemplate> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${templateId}`;
    return this.http.get<FormTemplate>(url).pipe(
      catchError(this.handleError)
    );
  }
  getSubmittedInstance(workspaceId: string, folderId: string, formId: string): Observable<FormInstance> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}/submitted-instance`;
    return this.http.get<FormInstance>(url).pipe(
      catchError(this.handleError)
    );
  }


}