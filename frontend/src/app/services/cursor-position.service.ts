import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursorPositionService {
  constructor(private webSocketService: WebSocketService) {}

  updatePosition(workspaceId: string, position: {x: number, y: number}) {
    this.webSocketService.updateCursorPosition(workspaceId, position);
  }

  getCursorPositions(): Observable<{[userId: string]: {x: number, y: number}}> {
    return this.webSocketService.getCursorPositions();
  }
}