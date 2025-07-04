import { Service, ServiceEvent } from "@/types/service";

// Mock data for demonstration
export const mockServices: Service[] = [
  {
    id: '1',
    name: 'User Authentication API',
    type: 'API',
    status: 'Online',
    url: 'https://auth.monitocorp.com',
    description: 'Handles user authentication and authorization',
    lastChecked: new Date().toISOString(),
    uptime: 99.8,
    responseTime: 145
  },
  {
    id: '2',
    name: 'Main Database',
    type: 'Database',
    status: 'Online',
    description: 'Primary PostgreSQL database cluster',
    lastChecked: new Date().toISOString(),
    uptime: 99.9,
    responseTime: 23
  },
  {
    id: '3',
    name: 'Payment Processing',
    type: 'API',
    status: 'Degraded',
    url: 'https://payments.monitocorp.com',
    description: 'Stripe payment processing service',
    lastChecked: new Date().toISOString(),
    uptime: 97.2,
    responseTime: 2340
  },
  {
    id: '4',
    name: 'Redis Cache',
    type: 'Cache',
    status: 'Online',
    description: 'Primary Redis cache cluster',
    lastChecked: new Date().toISOString(),
    uptime: 99.95,
    responseTime: 12
  },
  {
    id: '5',
    name: 'Email Queue',
    type: 'Queue',
    status: 'Offline',
    description: 'RabbitMQ email processing queue',
    lastChecked: new Date().toISOString(),
    uptime: 94.1,
    responseTime: undefined
  }
];

// Simulate realistic status changes
export const getRandomStatus = (): Service['status'] => {
  const statuses: Service['status'][] = ['Online', 'Online', 'Online', 'Online', 'Degraded', 'Offline'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

export function generateMockEvents(
  serviceId: string,
  page: number = 0,
  limit: number = 10
): ServiceEvent[] {
  const events: ServiceEvent[] = [];
  const statuses: Service['status'][] = ['Online', 'Degraded', 'Offline'];
  const messages = {
    Online: ['Service restored', 'Health check passed', 'All systems operational'],
    Degraded: ['High response time detected', 'Partial outage reported', 'Performance issues detected'],
    Offline: ['Service unavailable', 'Connection timeout', 'Health check failed']
  };

  const baseIndex = page * limit;

  for (let i = 0; i < 50; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const messageOptions = messages[status];

    // currently we are using a globally unique ID pattern to avoid collisions
    // This ensures that even if the same serviceId and index are used, the ID remains unique
    // by appending a timestamp and random number.

    const uniqueIndex = baseIndex + i;

    events.push({
      id: `event-${serviceId}-${uniqueIndex}-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      serviceId,
      timestamp: new Date(Date.now() - i * 1000 * 60 * Math.random() * 60).toISOString(),
      status,
      message: messageOptions[Math.floor(Math.random() * messageOptions.length)],
      details: Math.random() > 0.7 ? 'Additional diagnostic information available' : undefined
    });
  }

  events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const start = page * limit;
  return events.slice(start, start + limit);
}
