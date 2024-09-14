//frontend/src/app/services/workspace.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject ,merge} from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError ,map} from 'rxjs/operators';
import { ActivityLogsResponse , ActivityLog } from '../interfaces/activity-log.interface';
import { WebSocketService } from './web-socket.service';
import {Workspace  , WorkspacesResponse  ,FormUpdate} from '../interfaces/workspace.interface'



@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private apiUrl = `${environment.apiUrl}/workspaces`;
  private formUpdateSubject = new BehaviorSubject<FormUpdate | null>(null);

  constructor(private http: HttpClient, private webSocketService: WebSocketService) {
    this.listenForActivityLogUpdates();
    this.handleReconnection();
  }

    private activityLogsSubject = new BehaviorSubject<ActivityLog[]>([]);

    getWorkspaces(page: number = 1, limit: number = 10): Observable<WorkspacesResponse> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
  
      return this.http.get<WorkspacesResponse>(this.apiUrl, { params }).pipe(
        catchError(this.handleError)
      );
    }

    getWorkspace(id: string): Observable<Workspace | null> {
      return this.getWorkspaces().pipe(
        map(response => response.workspaces.find(w => w._id === id) || null),
        catchError(this.handleError)
      );
    }

    loadWorkspace(id: string): Observable<Workspace> {
      return this.http.get<Workspace>(`${this.apiUrl}/${id}`).pipe(
        catchError(this.handleError)
      );
    }
    
  createWorkspace(name: string, description: string): Observable<Workspace> {
    return this.http.post<Workspace>(this.apiUrl, { name, description }).pipe(
      catchError(this.handleError)
    );
  }



  updateWorkspace(id: string, name: string, description: string): Observable<Workspace> {
    return this.http.put<Workspace>(`${this.apiUrl}/${id}`, { name, description }).pipe(
      catchError(this.handleError)
    );
  }


  deleteWorkspace(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserRole(workspace: Workspace, userId: string): 'owner' | 'admin' | 'editor' | 'viewer' | null {
    const member = workspace.members.find(m => m.user === userId);
    return member ? member.role : null;
  }
  inviteMember(workspaceId: string, email: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${workspaceId}/invite`, { email, role });
  }

  updateMemberRole(workspaceId: string, userId: string, role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${workspaceId}/members/${userId}`, { role });
  }

  removeMember(workspaceId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${workspaceId}/members/${userId}`);
  }

  joinWorkspace(id: string): Observable<any> {
    try {
      const headers = new HttpHeaders().set('x-socket-id', this.webSocketService.getSocketId());
      return this.http.post(`${this.apiUrl}/${id}/join`, {}, { headers });
    } catch (error) {
      console.error('Error getting socket ID:', error);
      return throwError(() => new Error('Unable to join workspace: Socket ID not available'));
    }
  }

  leaveWorkspace(id: string): Observable<any> {
    try {
      const headers = new HttpHeaders().set('x-socket-id', this.webSocketService.getSocketId());
      return this.http.post(`${this.apiUrl}/${id}/leave`, {}, { headers });
    } catch (error) {
      console.error('Error getting socket ID:', error);
      return throwError(() => new Error('Unable to leave workspace: Socket ID not available'));
    }
  }


  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status}, message: ${error.message}`;
      if (error.status === 404) {
        errorMessage = 'The requested resource was not found. Please check your workspace and folder IDs.';
      }
    }
    return throwError(() => new Error(errorMessage));
  }


  updateMemberPermissions(workspaceId: string, userId: string, role: string, permissions: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${workspaceId}/members/${userId}/permissions`, { role, permissions }).pipe(
      catchError(this.handleError)
    );
  }
  getActivityLogs(
    workspaceId: string, 
    page: number = 1, 
    limit: number = 20, 
    actionType?: string,
    startDate?: Date | null,
    endDate?: Date | null
  ): Observable<ActivityLogsResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (actionType) {
      params = params.set('actionType', actionType);
    }
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    return this.http.get<ActivityLogsResponse>(`${this.apiUrl}/${workspaceId}/activity-logs`, { params });
    }

  getRealtimeActivityLogs(workspaceId: string): Observable<ActivityLog[]> {
    return merge(
      this.activityLogsSubject.asObservable(),
      this.getActivityLogs(workspaceId).pipe(
        map(response => {
          this.activityLogsSubject.next(response.activityLogs);
          return response.activityLogs;
        })
      )
    );
  }
  private listenForActivityLogUpdates() {
    this.webSocketService.getActivityLogUpdates().subscribe(newLog => {
      if (newLog) {
        this.activityLogsSubject.next([newLog, ...this.activityLogsSubject.value]);
      }
    });
  }
  private handleReconnection() {
    this.webSocketService.getReconnectionStatus().subscribe(isReconnecting => {
      if (!isReconnecting) {
        // Reload data after successful reconnection
        this.reloadWorkspaceData();
      }
    });
  }

  private reloadWorkspaceData() {
    // Implement logic to reload necessary workspace data
    console.log('Reloading workspace data after reconnection');
    // Example: this.loadWorkspaces();
  }
  
  exportActivityLogs(
    workspaceId: string,
    actionType?: string,
    startDate?: Date | null,
    endDate?: Date | null
  ): Observable<Blob> {
    let params = new HttpParams();

    if (actionType) {
      params = params.set('actionType', actionType);
    }
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }

    return this.http.get(`${this.apiUrl}/${workspaceId}/activity-logs/export`, {
      params,
      responseType: 'blob'
    });
  }






  getFormUpdates(): Observable<FormUpdate | null> {
    return this.formUpdateSubject.asObservable();
  }

  submitForm(workspaceId: string, folderId: string, formId: string, formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}/submit`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  
}
