export function normalizeImageSrc(src: any): string {
  if (!src || typeof src !== 'string') return '/next.svg';
  
  const trimmedSrc = src.trim();
  if (!trimmedSrc) return '/next.svg';

  // If it's already an absolute URL, return it
  if (trimmedSrc.startsWith('http')) return trimmedSrc;
  
  // Ensure it starts with a leading slash for relative paths
  const path = trimmedSrc.startsWith('/') ? trimmedSrc : `/${trimmedSrc}`;
  
  // Encode special characters but keep slashes and colons (for safety)
  // Actually encodeURI is better than encodeURIComponent for full paths
  try {
    return encodeURI(path);
  } catch (e) {
    return '/next.svg';
  }
}
