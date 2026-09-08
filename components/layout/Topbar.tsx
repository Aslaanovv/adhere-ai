"use client";

import { ChevronDown, Folder, Menu } from "lucide-react";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.07] bg-ink-950/30 px-4 sm:px-6">
      <button
        onClick={onMenu}
        aria-label="Open navigation"
        className="rounded-lg p-2 text-mist-300 hover:bg-white/[0.06] hover:text-mist-100 lg:hidden"
      >
        <Menu size={18} />
      </button>

      <div className="flex min-w-0 items-center gap-2.5">
        <Folder size={15} className="shrink-0 text-gold-400" />
        <span className="truncate text-sm font-medium text-mist-100">
          Adhere Studio
        </span>
        <span className="hidden text-sm text-mist-500 sm:block">
          · Internal HQ
        </span>
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-jade-400" />
          </span>
          <span className="text-xs text-mist-300">All systems nominal</span>
        </div>

        <div className="hidden h-5 w-px bg-white/10 sm:block" />

        <button className="flex items-center gap-2.5 rounded-xl p-1 pr-1.5 hover:bg-white/[0.05]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-[11px] font-semibold tracking-wide text-gold-300">
            MA
          </div>
          <div className="hidden text-left leading-tight md:block">
            <div className="text-[13px] font-medium text-mist-100">
              Mr. Aslaan
            </div>
            <div className="text-[11px] text-mist-500">Founder &amp; CEO</div>
          </div>
          <ChevronDown size={14} className="hidden text-mist-500 md:block" />
        </button>
      </div>
    </header>
  );
}
