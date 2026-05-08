import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pezzava.com'),
  title: {
    default: "Pezzava — Artisanal Cotton Wrap Around Skirts from Jaipur",
    template: "%s | Pezzava"
  },
  description: "Premium, hand-block printed cotton wrap around skirts crafted by artisans in Jaipur. Discover ethnic elegance with our breathable, free-size bohemian silhouettes.",
  keywords: [
    "Pezzava", 
    "Cotton Wrap Around Skirts", 
    "Jaipur Hand Block Print", 
    "Rajasthani Skirts", 
    "Bohemian Wrap Skirts", 
    "Indian Ethnic Wear", 
    "Sustainable Fashion Jaipur", 
    "Cotton Maxi Skirts Online",
    "Sanganeri Print Skirts",
    "Wrap Skirts for Women",
    "Handmade Cotton Clothing India",
    "Slow Fashion India",
    "Ethical Artisanal Clothing",
    "Heritage Craft Textiles",
    "Botanical Block Prints",
    "Jaipur Handicrafts",
    "Authentic Bagru Prints",
    "Artisan Made Skirts",
    "Breathable Cotton Apparel",
    "Premium Jaipur Cotton"
  ],
  authors: [{ name: "Pezzava" }],
  creator: "Pezzava",
  publisher: "Pezzava",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Pezzava — Artisanal Cotton Wrap Around Skirts from Jaipur",
    description: "Premium cotton wrap around skirts for women crafted in Jaipur, Rajasthan. Intersection of tradition and high-fashion editorial.",
    url: "https://pezzava.com",
    siteName: "Pezzava",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pezzava Artisanal Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pezzava — Artisanal Cotton Wrap Around Skirts from Jaipur",
    description: "Discover the art of the Jaipur wrap skirt. 100% pure cotton, artisanal prints.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Pezzava",
  "url": "https://pezzava.com",
  "logo": "https://pezzava.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": "en"
  },
  "sameAs": [
    "https://www.instagram.com/pezzava",
    "https://www.facebook.com/pezzava"
  ]
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Pezzava",
  "url": "https://pezzava.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://pezzava.com/shop?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

import Footer from "@/components/layout/Footer";
import ClientLayout from "@/components/layout/ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${manrope.variable} selection:bg-primary-container selection:text-on-primary`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-on-surface flex flex-col min-h-screen">
        <ClientLayout>
          {children}
        </ClientLayout>
        <Footer />
      </body>
    </html>
  );
}

