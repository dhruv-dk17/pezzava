/**
 * Pezzava Subdomain Routing and Link Resolution Utility
 * 
 * Supports production multi-subdomain routing:
 * - pezzava.in -> Brand House Landing Page & Hub
 * - skirts.pezzava.in -> Skirts Atelier & Catalog
 * - mugs.pezzava.in -> Ceramic & Custom Mug Printing Studio
 * 
 * In development or preview environments, seamlessly falls back to path routes:
 * - / -> Main Brand House
 * - /skirts -> Skirts Atelier
 * - /mugs -> Ceramic Mugs Studio
 */

export type SubdomainTarget = 'hub' | 'skirts' | 'mugs';

export function getPortalUrl(target: SubdomainTarget, path: string = ''): string {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';

  if (typeof window === 'undefined') {
    // Server-side rendering fallback
    if (target === 'skirts') return `/skirts${cleanPath}`;
    if (target === 'mugs') return `/mugs${cleanPath}`;
    return cleanPath || '/';
  }

  const hostname = window.location.hostname.toLowerCase();

  // If running in production on pezzava.in
  if (hostname.endsWith('pezzava.in')) {
    const protocol = window.location.protocol;
    if (target === 'skirts') {
      return `${protocol}//skirts.pezzava.in${cleanPath}`;
    }
    if (target === 'mugs') {
      return `${protocol}//mugs.pezzava.in${cleanPath}`;
    }
    return `${protocol}//pezzava.in${cleanPath}`;
  }

  // Localhost or preview domains
  if (target === 'skirts') {
    return `/skirts${cleanPath}`;
  }
  if (target === 'mugs') {
    return `/mugs${cleanPath}`;
  }
  return cleanPath || '/';
}

export function getCurrentPortal(): SubdomainTarget {
  if (typeof window === 'undefined') return 'hub';

  const hostname = window.location.hostname.toLowerCase();
  const pathname = window.location.pathname.toLowerCase();

  if (hostname.startsWith('mugs.') || pathname.startsWith('/mugs')) {
    return 'mugs';
  }
  if (hostname.startsWith('skirts.') || pathname.startsWith('/skirts')) {
    return 'skirts';
  }
  return 'hub';
}
