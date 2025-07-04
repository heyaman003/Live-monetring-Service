import { NextRequest, NextResponse } from 'next/server';
import { mockServices, getRandomStatus } from '@/lib/mockApi';
import { Service } from '@/types/service';

// Randomly update some service statuses to simulate live changes we can implement the
// logic to update the status of services in a more realistic way by adding event listeners.

export async function GET(req: NextRequest) {
  console.log('Fetching services...',req.url);
  await new Promise(res => setTimeout(res, 200));
  const services = mockServices.map(service => ({
    ...service,
    status: Math.random() > 0.9 ? getRandomStatus() : service.status,
    lastChecked: new Date().toISOString(),
    responseTime: service.status === 'Offline' ? undefined : Math.floor(Math.random() * 500) + 50
  }));
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  await new Promise(res => setTimeout(res, 300));
  const body = await req.json();
  const newService: Service = {
    ...body,
    id: Date.now().toString(),
    lastChecked: new Date().toISOString(),
    uptime: 100
  };
  mockServices.push(newService);
  return NextResponse.json(newService, { status: 201 });
}
