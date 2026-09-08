"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  BadgeCheck,
  BookOpen,
  Folder,
  Settings,
  Sparkles,
  Users,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";

interface NavItemSpec {
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

const WORKSPACE_NAV: NavItemSpec[] = [
  { label: "CEO", icon: Sparkles, active: true },
  { label: "Projects", icon: Folder },
  { label: "AI Team", icon: Users },
  { label: "Knowledge", icon: BookOpen },
];

const OPERATIONS_NAV: NavItemSpec[] = [
  { label: "Workflows", icon: Workflow },
  { label: "Approvals", icon: BadgeCheck },
  { label: "Activity", icon: Activity },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 2600);
    return () => clearTimeout(t);
  }, [notice]);

  const showNotice = (label: string) =>
    setNotice(`${label} arrives in a later milestone.`);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] shrink-0 flex-col border-r border-white/[0.07] bg-ink-950/90 backdrop-blur-md transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 lg:bg-ink-950/40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.07] px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-gold-300 to-gold-600 font-display text-lg text-ink-900 shadow-[0_6px_18px_-6px_rgba(255,215,0,0.6)]">
            A
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-[13px] font-semibold tracking-[0.14em] text-mist-100">
              ADHERE AI
            </div>
            <div className="truncate text-[11px] text-mist-500">
              أدير · Adhere Studio
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="ml-auto rounded-lg p-1.5 text-mist-400 hover:bg-white/[0.06] hover:text-mist-100 lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <NavGroup label="Workspace" items={WORKSPACE_NAV} onSoon={showNotice} />
          <NavGroup
            label="Operations"
            items={OPERATIONS_NAV}
            onSoon={showNotice}
          />
        </nav>

        {notice && (
          <div className="animate-fade mx-3 mb-2 rounded-lg border border-gold-500/20 bg-gold-500/[0.07] px-3 py-2 text-xs leading-relaxed text-gold-200">
            {notice}
          </div>
        )}

        <div className="shrink-0 border-t border-white/[0.07] p-3">
          <button
            onClick={() => showNotice("Settings")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-mist-500 transition-colors hover:bg-white/[0.04] hover:text-mist-200"
          >
            <Settings size={16} />
            Settings
          </button>
          <div className="px-3 pb-1 pt-3 text-[11px] text-mist-500/70">
            Foundation v0.1 · Supervised mode
          </div>
        </div>
      </aside>
    </>
  );
}

function NavGroup({
  label,
  items,
  onSoon,
}: {
  label: string;
  items: NavItemSpec[];
  onSoon: (label: string) => void;
}) {
  return (
    <div className="mb-7">
      <div className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-mist-500/70">
        {label}
      </div>
      <div className="space-y-0.5">
        {items.map((item) => (
          <NavItem key={item.label} item={item} onSoon={onSoon} />
        ))}
      </div>
    </div>
  );
}

function NavItem({
  item,
  onSoon,
}: {
  item: NavItemSpec;
  onSoon: (label: string) => void;
}) {
  const Icon = item.icon;
  if (item.active) {
    return (
      <div
        aria-current="page"
        className="relative flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-2 text-sm text-mist-100"
      >
        <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-gold-500" />
        <Icon size={16} className="text-gold-400" />
        {item.label}
      </div>
    );
  }
  return (
    <button
      onClick={() => onSoon(item.label)}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-mist-500 transition-colors hover:bg-white/[0.04] hover:text-mist-200"
    >
      <Icon size={16} />
      {item.label}
    </button>
  );
}
