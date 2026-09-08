"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import CeoAvatar from "@/components/ui/CeoAvatar";
import type { DiscoveryAnswer, DiscoveryQuestion } from "@/lib/types";

export default function DiscoveryState({
  questions,
  onComplete,
  onBack,
}: {
  questions: DiscoveryQuestion[];
  onComplete: (answers: DiscoveryAnswer[]) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [texts, setTexts] = useState<Record<string, string>>({});

  const isAnswered = (q: DiscoveryQuestion) => {
    const sel = selected[q.id];
    if (!sel) return false;
    if (sel.endsWith("-other")) return Boolean(texts[q.id]?.trim());
    return true;
  };

  const answeredCount = questions.filter(isAnswered).length;
  const allAnswered = answeredCount === questions.length;

  const handleContinue = () => {
    if (!allAnswered) return;
    const answers: DiscoveryAnswer[] = questions.map((q) => {
      const sel = selected[q.id];
      const option = q.options.find((o) => o.id === sel);
      return {
        questionId: q.id,
        question: q.question,
        answer:
          sel.endsWith("-other") && !option
            ? texts[q.id].trim()
            : option?.label ?? "",
      };
    });
    onComplete(answers);
  };

  return (
    <div className="py-14 sm:py-16">
      <div className="flex items-start gap-4">
        <CeoAvatar size={44} />
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400/90">
            CEO · Discovery
          </div>
          <p className="mt-2 max-w-2xl font-display text-xl leading-snug text-mist-100 sm:text-2xl">
            “I understand the direction. I need a little more context before I
            build the plan.”
          </p>
        </div>
      </div>

      <div className="mt-10 max-w-3xl space-y-4">
        {questions.map((q, i) => (
          <div
            key={q.id}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-lg text-gold-400/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[15px] font-medium text-mist-100">
                {q.question}
              </h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {q.options.map((opt) => {
                const isSelected = selected[q.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, [q.id]: opt.id }))
                    }
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-all ${
                      isSelected
                        ? "border-gold-500/50 bg-gold-500/[0.1] text-gold-200"
                        : "border-white/[0.09] bg-white/[0.02] text-mist-300 hover:border-white/20 hover:text-mist-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {selected[q.id]?.endsWith("-other") && (
              <input
                value={texts[q.id] ?? ""}
                autoFocus
                onChange={(e) =>
                  setTexts((prev) => ({ ...prev, [q.id]: e.target.value }))
                }
                placeholder="Tell the CEO in your own words…"
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-mist-100 placeholder:text-mist-500/70 focus:border-gold-500/40 focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft size={15} /> Revise objective
        </Button>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-xs text-mist-500">
            {answeredCount}/{questions.length} answered
          </span>
          <Button variant="primary" size="lg" onClick={handleContinue} disabled={!allAnswered}>
            Continue <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
