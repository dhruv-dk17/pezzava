"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import PageWrapper from "@/components/layout/PageWrapper";
import { CursorFollower } from "@/components/ui/CursorFollower";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { trackPageView } from "@/lib/analytics";

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
