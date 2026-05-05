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

  return {
    title: `${product.displayName} | Pezzava - Handcrafted in Jaipur`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.displayName,
      description: product.description.slice(0, 160),
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
    keywords: [product.category, product.fabric, 'Pezzava', 'Jaipur', 'Wrap-around skirts', 'Cotton apparel'],
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = catalog
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
