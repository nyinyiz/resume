"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHire = pathname.startsWith("/hire");

  return (
    <main
      className={`relative z-10 flex-1 px-4 sm:px-8 lg:px-16 pb-16 w-full max-w-screen-2xl mx-auto ${
        isHire ? "pt-10" : "pt-24"
      }`}
    >
      {children}
    </main>
  );
}
