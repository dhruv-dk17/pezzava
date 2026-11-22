import crypto from 'crypto';

/**
 * Known web scrapers, scanners, and bot patterns to discard from analytics
 */
const BOT_USER_AGENTS = [
  /bot/i,
  /crawl/i,
  /spider/i,
  /slurp/i,
  /headlesschrome/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /postman/i,
  /httpx/i,
  /ahrefs/i,
  /semrush/i,
  /bytespider/i,
  /yandex/i,
  /baidu/i,
  /facebookexternalhit/i,
  /twitterbot/i,
];

/**
 * Checks if the request is from a known bot or crawler
 */
export function isKnownBot(userAgent?: string | null): boolean {
  if (!userAgent || typeof userAgent !== 'string') return true;
  if (userAgent.length < 5) return true;
  return BOT_USER_AGENTS.some((pattern) => pattern.test(userAgent));
}

/**
 * In-memory sliding window rate limiter to prevent echo/replay attacks and spam flooding
 */
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up stale IP records every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

/**
 * Checks if an IP or session exceeds the allowed rate limit
 * @param identifier IP or Session ID
 * @param maxRequests Maximum requests allowed in the window
 * @param windowMs Window duration in milliseconds (default: 60 seconds)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 45,
  windowMs = 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: maxRequests - record.count };
}

/**
 * Constant-time string equality check to prevent timing attacks on admin keys
 */
export function secureTimingCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Sanitize text inputs to eliminate injection vectors and restrict max length
 */
export function sanitizeInput(input: unknown, maxLength = 250): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>'"`;\\]/g, '') // Strip script and injection characters
    .trim()
    .slice(0, maxLength);
}
