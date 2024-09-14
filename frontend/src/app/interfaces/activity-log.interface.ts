export interface ActivityLog {
    _id: string;
    workspace: string;
    user: {
      _id: string;
      name: string;
      email: string;
    };
    action: string;
    details: string;
    createdAt: Date;
  }
  
  export interface ActivityLogsResponse {
    activityLogs: ActivityLog[];
    currentPage: number;
    totalPages: number;
    totalLogs: number;
  }