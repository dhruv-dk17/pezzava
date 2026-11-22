import { NextRequest, NextResponse } from 'next/server';
import { secureTimingCompare, checkRateLimit } from '@/lib/security';
import { getAnalyticsData } from '@/lib/analytics-storage';

// Default secure key if environment variable not explicitly provided
const MASTER_ADMIN_KEY = process.env.ADMIN_ANALYTICS_KEY || 'pezzava-atelier-2026';

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // Rate limit stats queries against brute force (max 15 attempts / min)
    const rateCheck = checkRateLimit(`admin_${ip}`, 15, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many authentication attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const candidateKey = body.adminKey || req.headers.get('x-admin-key') || '';

    // Secure timing-safe verification
    const isValid = secureTimingCompare(candidateKey, MASTER_ADMIN_KEY);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Unauthorized access. Invalid Admin Key.' },
        { status: 401 }
      );
    }

    const data = getAnalyticsData();

    // Compute aggregate metrics
    const totalViews = data.totalPageViews;
    const uniqueVisitors = data.uniqueSessions.length;
    
    let totalMarketplaceClicks = 0;
    let amazonClicks = 0;
    let flipkartClicks = 0;

    const productList = Object.values(data.products).map((p) => {
      totalMarketplaceClicks += p.totalClicks;
      amazonClicks += p.amazonClicks;
      flipkartClicks += p.flipkartClicks;
      const ctr = p.views > 0 ? ((p.totalClicks / p.views) * 100).toFixed(1) : '0.0';
      return {
        ...p,
        ctr: `${ctr}%`,
      };
    });

    // Sort products by total clicks then views
    productList.sort((a, b) => b.totalClicks - a.totalClicks || b.views - a.views);

    const overallConversionRate =
      totalViews > 0 ? ((totalMarketplaceClicks / totalViews) * 100).toFixed(1) : '0.0';

    return NextResponse.json({
      success: true,
      summary: {
        totalViews,
        uniqueVisitors,
        totalMarketplaceClicks,
        amazonClicks,
        flipkartClicks,
        overallConversionRate: `${overallConversionRate}%`,
        lastUpdated: data.lastUpdated,
      },
      products: productList,
      pageViews: data.pageViews,
      referrers: data.referrers,
      daily: data.daily,
      recentActivity: data.recentActivity,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
