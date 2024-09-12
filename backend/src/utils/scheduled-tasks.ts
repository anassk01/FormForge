// src/utils/scheduled-tasks.ts

import * as cron from 'node-cron';
import { checkExpiredGracePeriods } from '../controllers/payment.controller';

export const setupScheduledTasks = () => {
  // Run daily at midnight
  cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled task: Check expired grace periods');
    try {
      await checkExpiredGracePeriods();
    } catch (error) {
      console.error('Error in scheduled task:', error);
    }
  });
};