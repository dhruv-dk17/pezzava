'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Eye,
  Users,
  ExternalLink,
  TrendingUp,
  RefreshCw,
  LogOut,
  ShoppingBag,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  totalMarketplaceClicks: number;
  amazonClicks: number;
  flipkartClicks: number;
  overallConversionRate: string;
  lastUpdated: number;
}

interface ProductMetric {
  id: string;
  name: string;
  category?: string;
  views: number;
  amazonClicks: number;
  flipkartClicks: number;
  totalClicks: number;
  ctr: string;
}

interface ActivityItem {
  id: string;
  timestamp: number;
  type: string;
  details: string;
  marketplace?: string;
}

export default function AdminAnalyticsDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [products, setProducts] = useState<ProductMetric[]>([]);
  const [pageViews, setPageViews] = useState<Record<string, number>>({});
  const [referrers, setReferrers] = useState<Record<string, number>>({});
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  // Fetch Stats using current admin key
  const fetchStats = useCallback(
    async (keyToUse: string, isBackground = false) => {
      if (!isBackground) setIsLoading(true);
      else setIsRefreshing(true);
      setAuthError('');

      try {
        const res = await fetch('/api/analytics/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminKey: keyToUse }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setIsAuthenticated(true);
          setSummary(data.summary);
          setProducts(data.products || []);
          setPageViews(data.pageViews || {});
          setReferrers(data.referrers || {});
          setRecentActivity(data.recentActivity || []);
          // Save key in session storage for convenience
          sessionStorage.setItem('pz_admin_token', keyToUse);
        } else {
          setIsAuthenticated(false);
          setAuthError(data.error || 'Invalid Admin Passkey');
          sessionStorage.removeItem('pz_admin_token');
        }
      } catch {
        setAuthError('Connection failed. Please check network.');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  // Check saved session on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('pz_admin_token');
    if (saved) {
      setAdminKey(saved);
      fetchStats(saved);
    }
  }, [fetchStats]);

  // Auto-refresh interval
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;
    const interval = setInterval(() => {
      const saved = sessionStorage.getItem('pz_admin_token') || adminKey;
      if (saved) fetchStats(saved, true);
    }, 25000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh, adminKey, fetchStats]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) {
      setAuthError('Please enter your Admin Key');
      return;
    }
    fetchStats(adminKey);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey('');
    sessionStorage.removeItem('pz_admin_token');
  };

  // If not authenticated, render secure login card
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200/90 shadow-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#5C631C]/10 text-[#5C631C] flex items-center justify-center mb-6">
            <Lock size={24} />
          </div>

          <span className="font-manrope text-xs font-bold uppercase tracking-[0.25em] text-[#5C631C] block mb-1">
            Pezzava Atelier
          </span>
          <h1 className="font-display text-2xl text-stone-900 mb-2">
            Secure Analytics Portal
          </h1>
          <p className="font-manrope text-xs text-stone-500 mb-6 leading-relaxed">
            Enter your secret master key to inspect store performance, visitor counts, and Amazon/Flipkart conversion rates.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="adminKey"
                className="block text-xs font-manrope font-semibold text-stone-700 mb-1"
              >
                Admin Master Key
              </label>
              <input
                id="adminKey"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin key..."
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5C631C]/30 focus:border-[#5C631C] font-mono text-sm transition-all"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-rose-600 text-xs font-manrope bg-rose-50 p-3 rounded-xl border border-rose-200">
                <ShieldAlert size={16} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#5C631C] hover:bg-[#4a5016] text-white font-manrope font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Verifying Key...</span>
                </>
              ) : (
                <span>Unlock Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] font-manrope text-stone-400">
            <CheckCircle2 size={13} className="text-[#5C631C]" />
            <span>Encrypted • Rate-Limited • Anti-Tamper Protected</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // Calculate percentages
  const amazonShare =
    summary && summary.totalMarketplaceClicks > 0
      ? Math.round((summary.amazonClicks / summary.totalMarketplaceClicks) * 100)
      : 50;
  const flipkartShare = 100 - amazonShare;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-manrope text-xs font-bold uppercase tracking-[0.25em] text-[#5C631C]">
                Pezzava Live Telemetry
              </span>
              <span className="flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-stone-900 mt-1">
              Store Analytics & Conversion Hub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchStats(adminKey)}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:border-stone-400 text-stone-700 text-xs font-manrope font-semibold shadow-sm transition-all"
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-2 rounded-xl text-xs font-manrope font-semibold border transition-all ${
                autoRefresh
                  ? 'bg-[#5C631C]/10 border-[#5C631C] text-[#5C631C]'
                  : 'bg-white border-stone-200 text-stone-500'
              }`}
            >
              Auto-Refresh: {autoRefresh ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-manrope font-semibold transition-all"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 4 Core Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-3">
              <span className="text-xs font-manrope font-bold uppercase tracking-wider text-stone-500">
                Total Page Views
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Eye size={18} />
              </div>
            </div>
            <div className="font-display text-3xl text-stone-900 mb-1">
              {summary?.totalViews.toLocaleString() || 0}
            </div>
            <p className="text-[11px] font-manrope text-stone-400">
              Across all catalog & editorial pages
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-3">
              <span className="text-xs font-manrope font-bold uppercase tracking-wider text-stone-500">
                Unique Visitors
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users size={18} />
              </div>
            </div>
            <div className="font-display text-3xl text-stone-900 mb-1">
              {summary?.uniqueVisitors.toLocaleString() || 0}
            </div>
            <p className="text-[11px] font-manrope text-stone-400">
              Deduplicated anonymous shopper sessions
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-3">
              <span className="text-xs font-manrope font-bold uppercase tracking-wider text-stone-500">
                Marketplace Clicks
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ExternalLink size={18} />
              </div>
            </div>
            <div className="font-display text-3xl text-stone-900 mb-1">
              {summary?.totalMarketplaceClicks.toLocaleString() || 0}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-manrope text-stone-500">
              <span className="text-[#FF9900] font-bold">Amazon: {summary?.amazonClicks || 0}</span>
              <span>•</span>
              <span className="text-[#2874F0] font-bold">Flipkart: {summary?.flipkartClicks || 0}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-3">
              <span className="text-xs font-manrope font-bold uppercase tracking-wider text-stone-500">
                Intent Conversion Rate
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="font-display text-3xl text-emerald-700 mb-1">
              {summary?.overallConversionRate || '0.0%'}
            </div>
            <p className="text-[11px] font-manrope text-stone-400">
              Shoppers converting to Amazon/Flipkart
            </p>
          </div>
        </div>

        {/* Marketplace Split Bar */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-3 font-manrope text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#232F3E]" />
              <span className="font-bold text-stone-800">Amazon India ({amazonShare}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-800">Flipkart Assured ({flipkartShare}%)</span>
              <div className="w-3 h-3 rounded-full bg-[#2874F0]" />
            </div>
          </div>
          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${amazonShare}%` }}
              className="h-full bg-[#232F3E] transition-all duration-500"
            />
            <div
              style={{ width: `${flipkartShare}%` }}
              className="h-full bg-[#2874F0] transition-all duration-500"
            />
          </div>
        </div>

        {/* Product Leaderboard Table */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl text-stone-900">
                Product Performance Leaderboard
              </h2>
              <p className="text-xs font-manrope text-stone-500 mt-0.5">
                Ranked by customer buying intent and total outbound clicks
              </p>
            </div>
            <span className="text-xs font-manrope font-semibold text-stone-400">
              {products.length} Products Monitored
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-manrope">
              <thead>
                <tr className="bg-stone-50/70 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-6 font-bold">Product</th>
                  <th className="py-3.5 px-4 font-bold text-center">Category</th>
                  <th className="py-3.5 px-4 font-bold text-center">Detail Views</th>
                  <th className="py-3.5 px-4 font-bold text-center">Amazon Clicks</th>
                  <th className="py-3.5 px-4 font-bold text-center">Flipkart Clicks</th>
                  <th className="py-3.5 px-4 font-bold text-center">Total Clicks</th>
                  <th className="py-3.5 px-6 font-bold text-right">Click-Through Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-400">
                      No customer product interactions recorded yet. Browse the store to generate telemetry.
                    </td>
                  </tr>
                ) : (
                  products.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="w-5 font-bold text-stone-400 text-xs">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="font-semibold text-stone-900 line-clamp-1 max-w-sm">
                              {p.name}
                            </div>
                            <div className="text-[10px] text-stone-400 font-mono">
                              ID: {p.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-semibold">
                          {p.category || 'Craft'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-stone-700">
                        {p.views}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-[#FF9900]">
                        {p.amazonClicks}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-[#2874F0]">
                        {p.flipkartClicks}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-extrabold text-stone-900 bg-stone-100 px-2 py-1 rounded-lg">
                          {p.totalClicks}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                          {p.ctr}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2 Column Section: Top Pages & Recent Live Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Top Pages */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm">
            <h3 className="font-display text-lg text-stone-900 mb-4">
              Top Visited Store Pages
            </h3>
            <div className="space-y-3 font-manrope text-xs">
              {Object.entries(pageViews).length === 0 ? (
                <p className="text-stone-400 py-6 text-center">No pageviews recorded yet.</p>
              ) : (
                Object.entries(pageViews)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 6)
                  .map(([path, count]) => (
                    <div
                      key={path}
                      className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100"
                    >
                      <span className="font-mono text-stone-700 font-medium">{path}</span>
                      <span className="font-bold text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {count} views
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Recent Live Activity Stream */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm">
            <h3 className="font-display text-lg text-stone-900 mb-4">
              Live Customer Interaction Feed
            </h3>
            <div className="space-y-3 font-manrope text-xs max-h-80 overflow-y-auto">
              {recentActivity.length === 0 ? (
                <p className="text-stone-400 py-6 text-center">No recent actions recorded.</p>
              ) : (
                recentActivity.slice(0, 10).map((act) => (
                  <div
                    key={act.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100"
                  >
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <ArrowUpRight size={13} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-stone-800">{act.details}</div>
                      <div className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                        <Clock size={10} />
                        <span>{new Date(act.timestamp).toLocaleTimeString()}</span>
                        <span>•</span>
                        <span>{act.type}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
