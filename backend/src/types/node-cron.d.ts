// src/types/node-cron.d.ts

declare module 'node-cron' {
    namespace cron {
      interface ScheduledTask {
        start: () => void;
        stop: () => void;
      }
  
      function schedule(
        cronExpression: string,
        func: () => void,
        options?: { scheduled?: boolean; timezone?: string }
      ): ScheduledTask;
    }
  
    export = cron;
  }