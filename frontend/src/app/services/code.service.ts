import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ParsedStructure } from '../components/code-analysis/code-analysis.component';
@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private apiUrl = 'http://localhost:3000/api/code';

  constructor(private http: HttpClient) { }

  interpretCode(code: string): Observable<{ structure: ParsedStructure }> {
    console.log('CodeService: Interpreting code:', code);
    return this.http.post<{ structure: ParsedStructure }>(`${this.apiUrl}/interpret`, { code })
      .pipe(
        map((response: { structure: ParsedStructure }) => {
          // Transform the sessionLabels structure if it exists
          if (response.structure.fields) {
            response.structure.fields = response.structure.fields.map((field: any) => {
              if (field.type === 'TIMER' && field.options && field.options.sessionLabels) {
                field.options.sessionLabels = this.transformSessionLabels(field.options.sessionLabels);
              }
              return field;
            });
          }
          return response;
        }),
        tap(response => console.log('CodeService: Received response:', response)),
        catchError(this.handleError)
      );
  }

  private transformSessionLabels(sessionLabels: any): { [key: number]: { work?: string, break?: string } } {
    const transformedLabels: { [key: number]: { work?: string, break?: string } } = {};
    for (const [key, value] of Object.entries(sessionLabels)) {
      const sessionNumber = parseInt(key, 10);
      if (!transformedLabels[sessionNumber]) {
        transformedLabels[sessionNumber] = {};
      }
      if (typeof value === 'object' && value !== null) {
        if ('work' in value) {
          transformedLabels[sessionNumber].work = (value as any).work as string;
        }
        if ('break' in value) {
          transformedLabels[sessionNumber].break = (value as any).break as string;
        }
      }
    }
    return transformedLabels;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('CodeService: Error occurred:', error);
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.error || error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}