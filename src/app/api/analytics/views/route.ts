import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (replace with database in production)
let totalViews = 0;
const uniqueVisitors = new Set<string>();

const dailyViews = new Map<string, number>();

// Helper to get visitor identifier
function getVisitorId(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  return `${ip}-${userAgent}`;
}

// Helper to get today's date key
function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

// GET - Retrieve visitor statistics
export async function GET() {
  const today = getTodayKey();
  const todayViews = dailyViews.get(today) || 0;

  return NextResponse.json({
    success: true,
    data: {
      totalViews,
      uniqueVisitors: uniqueVisitors.size,
      todayViews,
    },
  });
}

// POST - Record a new visit
export async function POST(request: NextRequest) {
  try {
    const visitorId = getVisitorId(request);
    const today = getTodayKey();

    // Increment total views
    totalViews++;

    // Track unique visitors
    uniqueVisitors.add(visitorId);

    // Track daily views
    dailyViews.set(today, (dailyViews.get(today) || 0) + 1);

    // Clean old daily data (keep last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    for (const [date] of dailyViews) {
      if (new Date(date) < thirtyDaysAgo) {
        dailyViews.delete(date);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        totalViews,
        uniqueVisitors: uniqueVisitors.size,
        todayViews: dailyViews.get(today),
      },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record visit' },
      { status: 500 }
    );
  }
}
