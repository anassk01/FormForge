import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Folder } from '../interfaces/workspace.interface'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
;

@Injectable({
  providedIn: 'root'
})
export class FolderManagementService {
  private apiUrl = `${environment.apiUrl}/workspaces`;

  constructor(private http: HttpClient) {}

  getFolders(workspaceId: string): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.apiUrl}/${workspaceId}/folders`).pipe(
      map(response => response || []),
      catchError(this.handleError)
    );
  }

  addFolder(workspaceId: string, folderName: string, parentFolderId?: string): Observable<Folder> {
    return this.http.post<Folder>(`${this.apiUrl}/${workspaceId}/folders`, { name: folderName, parentFolderId }).pipe(
      catchError(this.handleError)
    );
  }

  editFolder(workspaceId: string, folderId: string, folderName: string): Observable<Folder> {
    return this.http.put<Folder>(`${this.apiUrl}/${workspaceId}/folders/${folderId}`, { name: folderName }).pipe(
      catchError(this.handleError)
    );
  }

  deleteFolder(workspaceId: string, folderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${workspaceId}/folders/${folderId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.status === 404) {
      console.warn('Folders endpoint not found or no folders exist. Returning empty array.');
      return [];
    }
    return throwError(() => new Error(`Error: ${error.message}`));
  }

}