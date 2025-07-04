
export interface Service {
  id: string;
  name: string;
  type: 'API' | 'Database' | 'Queue' | 'Cache' | 'Storage';
  status: 'Online' | 'Offline' | 'Degraded';
  url?: string;
  description?: string;
  lastChecked: string;
  uptime: number;
  responseTime?: number;
}

export interface ServiceEvent {
  id: string;
  serviceId: string;
  timestamp: string;
  status: Service['status'];
  message: string;
  details?: string;
}

export interface ServiceFilters {
  status?: Service['status'] | 'All';
  search?: string;
}
