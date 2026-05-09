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

export function calculateVerificationDate(duration: string | null | undefined, createdAt: string): Date {
  if (!duration) return new Date(createdAt);
  
  try {
    const parts = duration.split(" to ");
    if (parts.length === 2) {
      const endDateStr = parts[1].trim();
      // Handle DD-MM-YYYY format
      const dateParts = endDateStr.split("-").map(Number);
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          // JavaScript Date months are 0-indexed
          const date = new Date(year, month - 1, day);
          date.setDate(date.getDate() + 2);
          return date;
        }
      }
    }
  } catch (e) {
    console.error("Error calculating verification date:", e);
  }
  
  return new Date(createdAt);
}
