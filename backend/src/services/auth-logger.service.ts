// Create a new file: backend/src/services/auth-logger.service.ts

import { createLogger, format, transports } from 'winston';

const authLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/auth.log' }),
    new transports.Console()
  ]
});

export const logAuthEvent = (event: string, userId: string, details: any = {}) => {
  authLogger.info({
    event,
    userId,
    ...details,
  });
};