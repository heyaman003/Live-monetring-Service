import { NextRequest, NextResponse } from 'next/server';
import { mockServices } from '@/lib/mockApi';


export async function GET(
  req: NextRequest,
  { params } : { params: Promise<{ id: string }> }
) {
  console.log('Fetching service details for ID:', req.url);
  await new Promise(res => setTimeout(res, 150));
  const id= (await params).id;
  if (!id) return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
  const service = mockServices.find(s => s.id === id);
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({
    ...service,
    lastChecked: new Date().toISOString(),
    responseTime: service.status === 'Offline' ? undefined : Math.floor(Math.random() * 500) + 50
  });
}

export async function PUT(req: NextRequest,  { params } : { params: Promise<{ id: string }> }) {
  await new Promise(res => setTimeout(res, 250));
  const id = (await params).id;
  if (!id) return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
  const index = mockServices.findIndex(s => s.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const updates = await req.json();
  mockServices[index] = { ...mockServices[index], ...updates, lastChecked: new Date().toISOString() };
  return NextResponse.json(mockServices[index]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  console.log('Deleting service with ID:', req.url);
  await new Promise(res => setTimeout(res, 200));
  const id = (await params).id;
  const index = mockServices.findIndex(s => s.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  mockServices.splice(index, 1);
  return NextResponse.json({ success: true });
} 