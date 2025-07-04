
 export interface ServiceStatus {
    name: string;
    status: 'healthy' | 'warning' | 'critical' | string;
    uptime: string;
    requests: string;
  }