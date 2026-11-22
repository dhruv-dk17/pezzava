"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { trackPageView } from "@/lib/analytics";

const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });
const PageWrapper = dynamic(() => import("@/components/layout/PageWrapper"), { ssr: false });
const CursorFollower = dynamic(() => import("@/components/ui/CursorFollower").then(mod => mod.CursorFollower), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return (
    <SmoothScroll>
      <CursorFollower />
      <Header />
      <main className="flex-1 flex flex-col">
        <PageWrapper>
          {children}
        </PageWrapper>
      </main>
    </SmoothScroll>
  );
}
