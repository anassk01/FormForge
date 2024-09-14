//backend/src/app/services/web-socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivityLog } from '../interfaces/activity-log.interface';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;
  private workspaceUpdateSubject = new BehaviorSubject<any>(null);
  private activeUsersSubject = new BehaviorSubject<string[]>([]);
  private activityLogSubject = new BehaviorSubject<ActivityLog | null>(null);
  private reconnectionSubject = new BehaviorSubject<boolean>(false);
  private cursorPositionsSubject = new BehaviorSubject<{[userId: string]: {x: number, y: number}}>({});
  private connectionStatusSubject = new BehaviorSubject<'connected' | 'disconnected' | 'connecting'>('disconnected');
  private reconnectionAttemptsSubject = new BehaviorSubject<number>(0);
  private reconnectionAttempts = 0;
  private maxReconnectionAttempts = 5;
  private formUpdateSubject = new BehaviorSubject<any>(null);
  
  constructor() {
    this.socket = io(environment.apiUrl, {
      transports: ['websocket'],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectionAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5
    });
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectionSubject.next(false);
      this.reconnectionAttempts = 0;
      this.connectionStatusSubject.next('connected');
      this.reconnectionAttemptsSubject.next(0);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.reconnectionSubject.next(true);
      this.connectionStatusSubject.next('disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.reconnectionAttempts++;
      this.reconnectionAttemptsSubject.next(this.reconnectionAttempts);
      this.connectionStatusSubject.next('connecting');
      if (this.reconnectionAttempts > this.maxReconnectionAttempts) {
        this.reconnectionSubject.next(false);
        console.error('Max reconnection attempts reached');
      }
    });


  

    this.socket.on('workspace:update', (data) => {
      this.workspaceUpdateSubject.next(data);
    });

    this.socket.on('workspace:userJoined', (username: string) => {
      const currentUsers = this.activeUsersSubject.value;
      if (!currentUsers.includes(username)) {
        this.activeUsersSubject.next([...currentUsers, username]);
      }
    });

    this.socket.on('workspace:userLeft', (username: string) => {
      const currentUsers = this.activeUsersSubject.value;
      this.activeUsersSubject.next(currentUsers.filter(user => user !== username));
    });

    this.socket.on('activityLog:new', (activityLog: ActivityLog) => {
      this.activityLogSubject.next(activityLog);
    });

    this.socket.on('workspace:cursorMove', ({ userId, position }) => {
      this.cursorPositionsSubject.next({
        ...this.cursorPositionsSubject.value,
        [userId]: position
      });
    });

    
    this.socket.on('form:update', (data) => {
      this.formUpdateSubject.next(data);
    });

    this.socket.on('form:create', (data) => {
      this.formUpdateSubject.next({ ...data, action: 'create' });
    });

    this.socket.on('form:delete', (data) => {
      this.formUpdateSubject.next({ ...data, action: 'delete' });
    });
  }

  getFormUpdates(): Observable<any> {
    return this.formUpdateSubject.asObservable();
  }

  joinWorkspace(workspaceId: string) {
    this.socket.emit('joinWorkspace', workspaceId);
  }

  leaveWorkspace(workspaceId: string) {
    this.socket.emit('leaveWorkspace', workspaceId);
  }

  getWorkspaceUpdates(): Observable<any> {
    return this.workspaceUpdateSubject.asObservable();
  }

  getActiveUsers(): Observable<string[]> {
    return this.activeUsersSubject.asObservable();
  }

  getActivityLogUpdates(): Observable<ActivityLog | null> {
    return this.activityLogSubject.asObservable();
  }

  getSocketId(): string {
    if (this.socket.id) {
      return this.socket.id;
    }
    throw new Error('Socket ID is not available');
  }

  getCursorPositions(): Observable<{[userId: string]: {x: number, y: number}}> {
    return this.cursorPositionsSubject.asObservable();
  }

  updateCursorPosition(workspaceId: string, position: {x: number, y: number}) {
    this.socket.emit('workspace:cursorMove', { workspaceId, position });
  }

  getReconnectionStatus(): Observable<boolean> {
    return this.reconnectionSubject.asObservable();
  }

  reconnect() {
    if (this.socket.disconnected) {
      this.socket.connect();
    }
  }

  getConnectionStatus(): Observable<'connected' | 'disconnected' | 'connecting'> {
    return this.connectionStatusSubject.asObservable();
  }

  getReconnectionAttempts(): Observable<number> {
    return this.reconnectionAttemptsSubject.asObservable();
  }
  
}