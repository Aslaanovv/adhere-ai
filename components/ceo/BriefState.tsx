"use client";

import { useState } from "react";
import { ArrowLeft, Check, Pencil, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { useToday } from "@/lib/hooks";
import { domainLabels } from "@/lib/mock/discovery";
import type { Brief } from "@/lib/types";

const FIELDS: { key: keyof Brief; label: string; wide?: boolean }[] = [
  { key: "objective", label: "Objective", wide: true },
  { key: "context", label: "Context" },
  { key: "audience", label: "Audience" },
  { key: "desiredOutcome", label: "Desired outcome" },
  { key: "constraints", label: "Constraints" },
  { key: "successCriteria", label: "Success criteria", wide: true },
];

export default function BriefState({
  brief,
  onApprove,
  onBack,
}: {
  brief: Brief;
  onApprove: (brief: Brief) => void;
  onBack: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Brief>(brief);
  const today = useToday();

  const setField = (key: keyof Brief, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const approve = () => {
    setEditing(false);
    onApprove(draft);
  };

  return (
    <div className="py-14 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400/90">
            CEO Core · Internal brief
          </div>
          <h2 className="mt-2 font-display text-3xl text-mist-100 sm:text-4xl">
            CEO Brief
          </h2>
          <p className="mt-2 text-sm text-mist-500">
            Prepared for Mr. Aslaan{today ? ` · ${today}` : ""} · Supervised —
            nothing runs until you approve.
          </p>
        </div>
        <span className="rounded-full border border-gold-500/25 bg-gold-500/[0.07] px-3 py-1 text-xs text-gold-300">
          {domainLabels[brief.domain]}
        </span>
      </div>

      <div className="mt-8 max-w-3xl space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <div
              key={field.key}
              className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 ${
                field.wide ? "sm:col-span-2" : ""
              }`}
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-mist-500">
                {field.label}
              </div>
              {editing ? (
                <textarea
                  rows={field.key === "objective" ? 2 : 3}
                  value={draft[field.key]}
                  onChange={(e) => setField(field.key, e.target.value)}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm leading-relaxed text-mist-100 focus:border-gold-500/40 focus:outline-none"
                />
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-mist-200">
                  {draft[field.key]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-gold-500/20 bg-gradient-to-b from-gold-500/[0.07] to-transparent p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-gold-300">
            <Sparkles size={13} /> CEO recommendation
          </div>
          {editing ? (
            <textarea
              rows={4}
              value={draft.recommendation}
              onChange={(e) => setField("recommendation", e.target.value)}
              className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm leading-relaxed text-mist-100 focus:border-gold-500/40 focus:outline-none"
            />
          ) : (
            <p className="mt-3 text-[15px] leading-relaxed text-mist-200">
              {draft.recommendation}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft size={15} /> Revise answers
        </Button>
        <div className="ml-auto flex items-center gap-3">
          {editing ? (
            <Button onClick={() => setEditing(false)}>Done editing</Button>
          ) : (
            <Button onClick={() => setEditing(true)}>
              <Pencil size={14} /> Edit
            </Button>
          )}
          <Button variant="primary" size="lg" onClick={approve}>
            <Check size={16} /> Approve Brief
          </Button>
        </div>
      </div>
    </div>
  );
}
