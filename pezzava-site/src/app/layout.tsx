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
  title: "Pezzava — Modern Royal Rajasthan",
  description: "Premium cotton wrap around skirts for women crafted in Jaipur, Rajasthan. Discover the intersection of tradition and high-fashion editorial.",
  keywords: "Pezzava, Cotton Skirts, Wrap Around Skirts, Jaipur Fashion, Rajasthani Craftsmanship, Ethnic Wear India",
  authors: [{ name: "Pezzava" }],
  openGraph: {
    title: "Pezzava — Modern Royal Rajasthan",
    description: "Premium cotton wrap around skirts for women crafted in Jaipur, Rajasthan.",
    url: "https://pezzava.com",
    siteName: "Pezzava",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import { CursorFollower } from "@/components/ui/CursorFollower";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${manrope.variable} selection:bg-primary-container selection:text-on-primary`}>
      <body className="antialiased bg-background text-on-surface flex flex-col min-h-screen">
        <CursorFollower />

        <Header />
        <main className="flex-1 flex flex-col">
          <PageWrapper>
            {children}
          </PageWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}

