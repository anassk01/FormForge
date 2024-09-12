//backend/src/services/socket.service.ts
import { Server } from 'socket.io';

let io: Server;

export const initializeIo = (server: Server) => {
  io = server;
};

export const getIo = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

export const emitWorkspaceUpdate = (workspaceId: string, data: any) => {
  io.to(`workspace:${workspaceId}`).emit('workspace:update', data);
};


export const joinWorkspace = (socketId: string, workspaceId: string) => {
  io.sockets.sockets.get(socketId)?.join(`workspace:${workspaceId}`);
};


export const leaveWorkspace = (socketId: string, workspaceId: string) => {
  io.sockets.sockets.get(socketId)?.leave(`workspace:${workspaceId}`);
};

export const emitCursorPosition = (workspaceId: string, userId: string, position: { x: number, y: number }) => {
  io.to(`workspace:${workspaceId}`).emit('workspace:cursorMove', { userId, position });
};
