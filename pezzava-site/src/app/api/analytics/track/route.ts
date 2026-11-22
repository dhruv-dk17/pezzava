import { NextRequest, NextResponse } from 'next/server';
import { isKnownBot, checkRateLimit, sanitizeInput } from '@/lib/security';
import { recordAnalyticsEvent } from '@/lib/analytics-storage';

export async function POST(req: NextRequest) {
  try {
    const userAgent = req.headers.get('user-agent');
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // 1. Bot Shield: Discard scrapers and crawlers
    if (isKnownBot(userAgent)) {
      return NextResponse.json({ ok: true, discarded: 'bot' });
    }

    // 2. Anti-Echo Rate Limiting (max 60 events/min per IP)
    const rateCheck = checkRateLimit(ip, 60, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // 3. Parse and sanitize payload
    const rawBody = await req.json();
    if (!rawBody || typeof rawBody !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const eventName = sanitizeInput(rawBody.eventName, 50);
    const validEvents = ['page_view', 'product_view', 'outbound_click', 'carousel_slide', 'whatsapp_click'];
    if (!validEvents.includes(eventName)) {
      return NextResponse.json({ error: 'Unknown event' }, { status: 400 });
    }

    const sessionId = sanitizeInput(rawBody.sessionId, 64) || 'unknown';
    const path = sanitizeInput(rawBody.path, 150) || '/';
    const referrer = sanitizeInput(rawBody.referrer, 200);
    const productId = sanitizeInput(rawBody.productId, 50);
    const productName = sanitizeInput(rawBody.productName, 120);
    const category = sanitizeInput(rawBody.category, 50);
    const marketplaceRaw = sanitizeInput(rawBody.marketplace, 20).toLowerCase();
    const marketplace = marketplaceRaw === 'amazon' || marketplaceRaw === 'flipkart' ? marketplaceRaw : undefined;
    const targetUrl = sanitizeInput(rawBody.targetUrl, 300);
    const timestamp = typeof rawBody.timestamp === 'number' && rawBody.timestamp > 0 ? rawBody.timestamp : Date.now();

    // 4. Record event
    recordAnalyticsEvent({
      eventName,
      sessionId,
      path,
      referrer,
      productId,
      productName,
      category,
      marketplace,
      targetUrl,
      timestamp,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Return graceful 200/500 without leaking stack trace
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
