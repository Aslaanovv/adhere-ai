"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="relative flex h-dvh overflow-hidden bg-ink-900">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-gold-500/[0.05] blur-[120px]" />
        <div className="absolute -bottom-56 -right-32 h-[420px] w-[520px] rounded-full bg-indigo-500/[0.07] blur-[120px]" />
      </div>

      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setNavOpen(true)} />
        <main className="relative flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
