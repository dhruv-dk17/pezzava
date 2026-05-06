import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById, catalog } from '@/data/products';
import ProductDetailView from './ProductDetailView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found | Pezzava',
      description: 'The product you are looking for does not exist.'
    };
  }

  const keywords = [
    product.displayName,
    product.category,
    product.fabric,
    'Pezzava',
    'Jaipur',
    'Hand-block printed',
    'Cotton wrap skirt',
    'Artisanal fashion',
    'Slow fashion',
    'Sustainable clothing',
    'Rajasthani ethnic wear'
  ];

  return {
    title: `${product.displayName} | Pezzava - Artisanal Jaipur Cotton`,
    description: `${product.description.slice(0, 150)}... Discover handcrafted elegance from Jaipur.`,
    openGraph: {
      title: product.displayName,
      description: product.description.slice(0, 160),
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
    keywords: keywords,
  };
}

const getProductJsonLd = (product: any) => ({
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": product.displayName,
  "image": product.images,
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": "Pezzava"
  },
  "offers": {
    "@type": "Offer",
    "url": `https://pezzava.com/product/${product.id}`,
    "priceCurrency": "INR",
    "price": "1499", // Placeholder price, ideally should come from product data
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "material": product.fabric,
  "color": product.color || "Multi"
});

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = catalog
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProductJsonLd(product)) }}
      />
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </>
  );
}
