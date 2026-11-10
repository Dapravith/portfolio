import type { NextRequest } from 'next/server';
import { handleRecordView, handleViewCount } from '@/features/analytics/server/handler';

export const runtime = 'nodejs';

export function GET() {
  return handleViewCount();
}

export function POST(request: NextRequest) {
  return handleRecordView(request);
}
