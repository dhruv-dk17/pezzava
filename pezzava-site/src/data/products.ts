import productsRaw from './products.json';

export type Category = 'mini' | 'knee' | 'calf' | 'long';

export interface MarketplaceStoreInfo {
  sourceId: string;
  title: string;
  url: string;
  price: number;
  originalPrice: number | null;
  discount: string | null;
  rating: number;
  reviews: number;
}

export interface Product {
  id: string;
  canonicalId: string;
  sourceIds: string[];
  displayName: string;
  officialTitle: string;
  listingTitles: Record<string, string>;
  color: string;
  price: number;
  originalPrice: number | null;
  discount: string | null;
  fabric: string;
  length: string;
  size: string;
  category: Category;
  store: string;
  storeAvailability: string[];
  stores: Record<string, MarketplaceStoreInfo>;
  marketplace: {
    amazon: string | null;
    flipkart: string | null;
  };
  linkVerified: boolean;
  rawMarketplace: {
    amazon: string | null;
    flipkart: string | null;
  };
  description: string;
  care: string;
  images: string[];
  tags: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  sortRank: number;
  details: Record<string, string> | null;
  about: string[];
  extraInfo: string[] | null;
  showcase: string[];
}

const CATEGORY_LABELS: Record<Category, string> = {
  mini: 'Mini',
  knee: 'Knee Length',
  calf: 'Calf Length',
  long: 'Long'
};

function uniq<T>(values: T[]): T[] {
  return [...new Set(values.filter(Boolean))];
}

function inferCategoryFromText(text: string): Category | '' {
  const value = String(text || '').toLowerCase();
  if (!value) return '';
  if (/\bmini\b/.test(value)) return 'mini';
  if (/\bcalf\b|\bmidi\b/.test(value)) return 'calf';
  if (/\bknee\b/.test(value)) return 'knee';
  if (/\blong\b|\bmaxi\b/.test(value)) return 'long';
  return '';
}

function inferCategory(product: any): Category {
  const candidates = [
    product.shortName,
    product.length,
    product.description,
    product.name,
    product.category
  ];

  for (const candidate of candidates) {
    const inferred = inferCategoryFromText(candidate);
    if (inferred) return inferred;
  }

  return (product.category as Category) || 'knee';
}

function inferColorFromText(text: string): string {
  const colorMatchers: [string, RegExp][] = [
    ['Black & White', /(black\s*&\s*white|white\s*&\s*black|b&w|black\s+white|white\s+black)/i],
    ['Multicolor', /\bmulti(color)?\b/i],
    ['Maroon', /\bmaroon|marron\b/i],
    ['Navy', /\bnavy\b/i],
    ['Blue', /\bblue\b/i],
    ['Green', /\bgreen\b/i],
    ['Red', /\bred\b/i],
    ['Black', /\bblack\b/i],
    ['Beige', /\bbeige\b/i],
    ['White', /\bwhite\b/i]
  ];

  const value = String(text || '');
  for (const [label, matcher] of colorMatchers) {
    if (matcher.test(value)) return label;
  }

  return '';
}

function inferColor(product: any): string {
  const candidates = [
    product.shortName,
    product.description,
    product.color,
    product.name
  ];

  for (const candidate of candidates) {
    const inferred = inferColorFromText(candidate);
    if (inferred) return inferred;
  }

  return product.color || 'Multicolor';
}

function getDisplayName(product: any): string {
  return product.shortName || product.name;
}

function buildDescription(product: Partial<Product>): string {
  const stores = product.storeAvailability || [];
  const storeLabel = stores.map(s => s === 'amazon' ? 'Amazon' : 'Flipkart').join(' and ');
  const exactMatchCopy = stores.length
    ? `The Pezzava gallery matches the ${storeLabel} page linked below so shoppers land on the same product.`
    : 'Marketplace link is being checked so shoppers are not sent to a similar but different skirt.';

  return `${product.displayName} in ${product.fabric || '100% Cotton'} with an adjustable wrap-around fit. ${exactMatchCopy}`;
}

function normalizeRawProduct(product: any): Product {
  const category = inferCategory(product);
  const displayName = getDisplayName(product);
  const displayColor = inferColor(product);
  const verifiedLink = true; // Always true as per original logic

  const marketplace = {
    amazon: product.store === 'amazon' && verifiedLink ? product.marketplace?.amazon || null : null,
    flipkart: product.store === 'flipkart' && verifiedLink ? product.marketplace?.flipkart || null : null
  };

  const stores: Record<string, MarketplaceStoreInfo> = {};

  if (marketplace.amazon) {
    stores.amazon = {
      sourceId: product.id,
      title: product.name,
      url: marketplace.amazon,
      price: product.price,
      originalPrice: product.originalPrice || null,
      discount: product.discount || null,
      rating: product.rating || 0,
      reviews: product.reviews || 0
    };
  }

  if (marketplace.flipkart) {
    stores.flipkart = {
      sourceId: product.id,
      title: product.name,
      url: marketplace.flipkart,
      price: product.price,
      originalPrice: product.originalPrice || null,
      discount: product.discount || null,
      rating: product.rating || 0,
      reviews: product.reviews || 0
    };
  }

  const normalized: Product = {
    id: product.id,
    canonicalId: product.id,
    sourceIds: [product.id],
    displayName,
    officialTitle: product.name,
    listingTitles: Object.fromEntries(
      Object.entries(stores).map(([store, storeInfo]) => [store, storeInfo.title])
    ),
    color: displayColor,
    price: product.price,
    originalPrice: product.originalPrice || null,
    discount: product.discount || null,
    fabric: product.fabric || '100% Cotton',
    length: CATEGORY_LABELS[category] || product.length || 'Knee Length',
    size: product.size || 'Free Size',
    category,
    store: product.store,
    storeAvailability: Object.keys(stores),
    stores,
    marketplace,
    linkVerified: verifiedLink,
    rawMarketplace: {
      amazon: product.marketplace?.amazon || null,
      flipkart: product.marketplace?.flipkart || null
    },
    description: product.description || '',
    care: product.care || 'Gentle hand wash recommended.',
    images: uniq((Array.isArray(product.images) ? product.images : []).map((img: any) => {
      const s = (typeof img === 'string' ? img : (img?.image || '')).trim();
      if (!s) return '';
      return s.startsWith('/') || s.startsWith('http') ? s : `/${s}`;
    })).filter(Boolean) as string[],
    tags: uniq(product.tags || []),
    rating: product.rating || 0,
    reviews: product.reviews || 0,
    inStock: product.inStock !== false,
    featured: Boolean(product.featured),
    sortRank: product._sortRank || 0,
    details: product.details || null,
    about: product.about || [],
    extraInfo: product.extraInfo || null,
    showcase: (Array.isArray(product.showcase) ? product.showcase : []).map((item: any) => {
      const s = (typeof item === 'string' ? item : (item?.image || '')).trim();
      if (!s) return '';
      return s.startsWith('/') || s.startsWith('http') ? s : `/${s}`;
    }).filter(Boolean)
  };

  if (!normalized.description) {
    normalized.description = buildDescription(normalized);
  }

  return normalized;
}

const allProducts = (productsRaw as any[]).map(normalizeRawProduct);

// Group variants into canonical products
function buildCatalog(products: Product[]): Product[] {
  const grouped = new Map<string, Product>();

  products.forEach(p => {
    const key = `${p.displayName.toLowerCase()}-${p.color.toLowerCase()}-${p.category}`;
    if (grouped.has(key)) {
      const existing = grouped.get(key)!;
      // Merge stores
      existing.stores = { ...existing.stores, ...p.stores };
      existing.storeAvailability = uniq([...existing.storeAvailability, ...p.storeAvailability]);
      existing.sourceIds = uniq([...existing.sourceIds, ...p.sourceIds]);
      // Prefer longer images list
      if (p.images.length > existing.images.length) {
        existing.images = p.images;
      }
    } else {
      grouped.set(key, { ...p });
    }
  });

  return Array.from(grouped.values()).sort((a, b) => b.sortRank - a.sortRank);
}

export const catalog = buildCatalog(allProducts);

export function getProductById(id: string): Product | undefined {
  return catalog.find(p => p.id === id || p.sourceIds.includes(id));
}

export function getFeaturedProducts(): Product[] {
  return catalog.filter(p => p.featured).slice(0, 8);
}
