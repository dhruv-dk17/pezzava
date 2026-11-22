'use client';

/**
 * Pezzava Analytics Engine - Client Tracker
 * Zero-bloat, privacy-compliant, anti-echo telemetry bus
 */

interface TrackPayload {
  eventName:
    | 'page_view'
    | 'product_view'
    | 'outbound_click'
    | 'carousel_slide'
    | 'whatsapp_click';
  path?: string;
  referrer?: string;
  productId?: string;
  productName?: string;
  category?: string;
  price?: number;
  marketplace?: 'amazon' | 'flipkart';
  targetUrl?: string;
  imageIndex?: number;
  metadata?: Record<string, unknown>;
}

// Memory cache for client-side debouncing (prevents double-clicks / rapid echo clicks)
const debouncedEventCache = new Set<string>();

/**
 * Returns or creates a secure anonymous session ID per browser session
 */
function getAnonymousSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  try {
    let sid = window.sessionStorage.getItem('pz_sid');
    if (!sid) {
      sid = 'pz_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      window.sessionStorage.setItem('pz_sid', sid);
    }
    return sid;
  } catch {
    return 'anonymous';
  }
}

/**
 * Core event dispatcher
 */
export function trackEvent(payload: TrackPayload): void {
  if (typeof window === 'undefined') return;

  // Do-Not-Track respect
  if (navigator.doNotTrack === '1') return;

  const sessionId = getAnonymousSessionId();
  const path = payload.path || window.location.pathname;
  const referrer = payload.referrer || document.referrer || '';

  // Anti-echo debounce key (identifies event type + target within 800ms)
  const debounceKey = `${payload.eventName}_${payload.productId || path}_${payload.marketplace || ''}`;
  if (debouncedEventCache.has(debounceKey)) {
    return; // Discard rapid duplicate
  }
  debouncedEventCache.add(debounceKey);
  setTimeout(() => {
    debouncedEventCache.delete(debounceKey);
  }, 800);

  const fullPayload = {
    ...payload,
    sessionId,
    path,
    referrer: referrer.slice(0, 200),
    timestamp: Date.now(),
    screen: `${window.innerWidth}x${window.innerHeight}`,
  };

  const body = JSON.stringify(fullPayload);
  const endpoint = '/api/analytics/track';

  try {
    // Send beacon if browser supports it for guaranteed delivery on unload
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      const sent = navigator.sendBeacon(endpoint, blob);
      if (sent) return;
    }

    // Fallback to fetch with keepalive
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {
      // Fail silently to never impact customer UX
    });
  } catch {
    // Discard any dispatch error silently
  }
}

/**
 * Helper: Track Page View
 */
export function trackPageView(path: string, referrer?: string): void {
  trackEvent({
    eventName: 'page_view',
    path,
    referrer,
  });
}

/**
 * Helper: Track Product Detail View
 */
export function trackProductView(product: {
  id: string;
  name: string;
  category?: string;
  price?: number;
}): void {
  trackEvent({
    eventName: 'product_view',
    productId: product.id,
    productName: product.name,
    category: product.category,
    price: product.price,
  });
}

/**
 * Helper: Track Outbound Buy Click to Marketplace (Amazon / Flipkart)
 */
export function trackOutboundClick(
  product: { id: string; name: string; price?: number },
  marketplace: 'amazon' | 'flipkart',
  targetUrl: string
): void {
  trackEvent({
    eventName: 'outbound_click',
    productId: product.id,
    productName: product.name,
    price: product.price,
    marketplace,
    targetUrl,
  });
}

/**
 * Helper: Track Carousel Image Slide
 */
export function trackCarouselSlide(productId: string, imageIndex: number): void {
  trackEvent({
    eventName: 'carousel_slide',
    productId,
    imageIndex,
  });
}

/**
 * Helper: Track WhatsApp Custom Order Inquiry
 */
export function trackWhatsAppClick(source: string, productId?: string): void {
  trackEvent({
    eventName: 'whatsapp_click',
    productId,
    metadata: { source },
  });
}
