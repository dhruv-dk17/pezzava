import fs from 'fs';
import path from 'path';

export interface ProductMetric {
  id: string;
  name: string;
  category?: string;
  views: number;
  amazonClicks: number;
  flipkartClicks: number;
  totalClicks: number;
  lastActive: number;
}

export interface ActivityItem {
  id: string;
  timestamp: number;
  type: string;
  details: string;
  marketplace?: string;
}

export interface AnalyticsData {
  totalPageViews: number;
  uniqueSessions: string[];
  pageViews: Record<string, number>;
  referrers: Record<string, number>;
  products: Record<string, ProductMetric>;
  daily: Record<string, { views: number; clicks: number }>;
  recentActivity: ActivityItem[];
  lastUpdated: number;
}

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'analytics_store.json');

// In-memory cache for ultra-fast response & zero disk lockups
let memoryStore: AnalyticsData | null = null;
let isDirty = false;
let saveScheduled = false;

function getDefaultData(): AnalyticsData {
  return {
    totalPageViews: 0,
    uniqueSessions: [],
    pageViews: {},
    referrers: {},
    products: {},
    daily: {},
    recentActivity: [],
    lastUpdated: Date.now(),
  };
}

/**
 * Loads analytics data from file or returns memory cache
 */
export function getAnalyticsData(): AnalyticsData {
  if (memoryStore) return memoryStore;

  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      memoryStore = JSON.parse(raw);
      return memoryStore!;
    }
  } catch (err) {
    console.error('Error reading analytics store:', err);
  }

  memoryStore = getDefaultData();
  return memoryStore;
}

/**
 * Schedules debounced atomic write to disk
 */
function scheduleSave() {
  if (saveScheduled) return;
  saveScheduled = true;

  setTimeout(() => {
    saveScheduled = false;
    if (!isDirty || !memoryStore) return;

    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Keep uniqueSessions bounded to last 5,000 to prevent infinite growth
      if (memoryStore.uniqueSessions.length > 5000) {
        memoryStore.uniqueSessions = memoryStore.uniqueSessions.slice(-5000);
      }

      // Atomic write: write to temp file then rename
      const tempPath = `${DATA_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(memoryStore, null, 2), 'utf-8');
      fs.renameSync(tempPath, DATA_FILE);
      isDirty = false;
    } catch (err) {
      console.error('Error writing analytics store:', err);
    }
  }, 1000);
}

/**
 * Records an analytics event safely
 */
export function recordAnalyticsEvent(event: {
  eventName: string;
  sessionId: string;
  path?: string;
  referrer?: string;
  productId?: string;
  productName?: string;
  category?: string;
  marketplace?: 'amazon' | 'flipkart';
  targetUrl?: string;
  timestamp: number;
}): void {
  const store = getAnalyticsData();
  const dateKey = new Date(event.timestamp).toISOString().slice(0, 10);

  if (!store.daily[dateKey]) {
    store.daily[dateKey] = { views: 0, clicks: 0 };
  }

  // Track session
  if (event.sessionId && !store.uniqueSessions.includes(event.sessionId)) {
    store.uniqueSessions.push(event.sessionId);
  }

  // Handle Event Types
  if (event.eventName === 'page_view') {
    store.totalPageViews += 1;
    store.daily[dateKey].views += 1;

    const pagePath = event.path || '/';
    store.pageViews[pagePath] = (store.pageViews[pagePath] || 0) + 1;

    if (event.referrer) {
      try {
        const refHost = new URL(event.referrer).hostname || 'Direct';
        store.referrers[refHost] = (store.referrers[refHost] || 0) + 1;
      } catch {
        store.referrers['Direct / Internal'] = (store.referrers['Direct / Internal'] || 0) + 1;
      }
    } else {
      store.referrers['Direct / Bookmark'] = (store.referrers['Direct / Bookmark'] || 0) + 1;
    }
  } else if (event.eventName === 'product_view' && event.productId) {
    const pid = event.productId;
    if (!store.products[pid]) {
      store.products[pid] = {
        id: pid,
        name: event.productName || pid,
        category: event.category || 'General',
        views: 0,
        amazonClicks: 0,
        flipkartClicks: 0,
        totalClicks: 0,
        lastActive: event.timestamp,
      };
    }
    store.products[pid].views += 1;
    store.products[pid].lastActive = event.timestamp;
    if (event.productName) store.products[pid].name = event.productName;
  } else if (event.eventName === 'outbound_click' && event.productId) {
    const pid = event.productId;
    if (!store.products[pid]) {
      store.products[pid] = {
        id: pid,
        name: event.productName || pid,
        views: 1,
        amazonClicks: 0,
        flipkartClicks: 0,
        totalClicks: 0,
        lastActive: event.timestamp,
      };
    }

    if (event.marketplace === 'amazon') {
      store.products[pid].amazonClicks += 1;
    } else if (event.marketplace === 'flipkart') {
      store.products[pid].flipkartClicks += 1;
    }
    store.products[pid].totalClicks += 1;
    store.products[pid].lastActive = event.timestamp;
    store.daily[dateKey].clicks += 1;

    // Log to Recent Activity
    store.recentActivity.unshift({
      id: Math.random().toString(36).substring(2, 9),
      timestamp: event.timestamp,
      type: 'Outbound Purchase Intent',
      details: `${store.products[pid].name} -> ${event.marketplace?.toUpperCase() || 'MARKETPLACE'}`,
      marketplace: event.marketplace,
    });

    if (store.recentActivity.length > 30) {
      store.recentActivity = store.recentActivity.slice(0, 30);
    }
  } else if (event.eventName === 'whatsapp_click') {
    store.recentActivity.unshift({
      id: Math.random().toString(36).substring(2, 9),
      timestamp: event.timestamp,
      type: 'WhatsApp Custom Order Inquiry',
      details: event.productId ? `Inquiry on ${event.productId}` : 'General Studio Inquiry',
    });

    if (store.recentActivity.length > 30) {
      store.recentActivity = store.recentActivity.slice(0, 30);
    }
  }

  store.lastUpdated = Date.now();
  isDirty = true;
  scheduleSave();
}
