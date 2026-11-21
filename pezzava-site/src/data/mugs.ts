import mugsRaw from './mugs.json';

export type MugCategory = 'blockprint' | 'heritage' | 'mandala' | 'custom' | 'luxury';

export interface MugProduct {
  id: string;
  name: string;
  shortName: string;
  theme: string;
  price: number;
  originalPrice: number;
  discount: string;
  capacity: string;
  material: string;
  finish: string;
  color: string;
  category: MugCategory;
  storeAvailability: ('amazon' | 'flipkart')[];
  marketplace: {
    amazon: string | null;
    flipkart: string | null;
  };
  rating: number;
  reviews: number;
  featured: boolean;
  description: string;
  features: string[];
  images: string[];
  tags: string[];
}

export const mugCatalog: MugProduct[] = mugsRaw as MugProduct[];

export function getMugById(id: string): MugProduct | undefined {
  return mugCatalog.find(m => m.id === id);
}

export const MUG_CATEGORIES: { id: MugCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Mugs' },
  { id: 'blockprint', label: 'Jaipur Blockprint' },
  { id: 'heritage', label: 'Blue Pottery' },
  { id: 'mandala', label: 'Mandala Art' },
  { id: 'custom', label: 'Custom Personalized' },
  { id: 'luxury', label: 'Gold Rim & Luxury' }
];
