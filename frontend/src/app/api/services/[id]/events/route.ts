import { NextRequest, NextResponse } from 'next/server';

import { generateMockEvents } from '@/lib/mockApi';

export async function GET(
  req: NextRequest,
  { params } : { params: Promise<{ id: string }> }
) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get('page') || 0);
  const limit = Number(searchParams.get('limit') || 10);

  await new Promise(res => setTimeout(res, 300));
  const id= (await params).id;
  const events = generateMockEvents(id, page, limit);

  return NextResponse.json(events);
}
