export enum LogLevel {
    DEBUG,
    INFO,
    WARN,
    ERROR
  }
  
  export class Logger {
    private static instance: Logger;
    private level: LogLevel = LogLevel.INFO;
  
    private constructor() {}
  
    static getInstance(): Logger {
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }
  
    setLevel(level: LogLevel): void {
      this.level = level;
    }
  
    debug(message: string, ...args: any[]): void {
      this.log(LogLevel.DEBUG, message, ...args);
    }
  
    info(message: string, ...args: any[]): void {
      this.log(LogLevel.INFO, message, ...args);
    }
  
    warn(message: string, ...args: any[]): void {
      this.log(LogLevel.WARN, message, ...args);
    }
  
    error(message: string, ...args: any[]): void {
      this.log(LogLevel.ERROR, message, ...args);
    }
  
    private log(level: LogLevel, message: string, ...args: any[]): void {
      if (level >= this.level) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${LogLevel[level]}] ${message}`;
        console.log(logMessage, ...args);
      }
    }
  }