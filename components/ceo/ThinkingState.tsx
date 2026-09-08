"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import CeoAvatar from "@/components/ui/CeoAvatar";

const STEPS = [
  "Understanding the objective",
  "Identifying missing context",
  "Preparing discovery",
];

const TIMINGS = [1100, 1300, 1000];

export default function ThinkingState({
  objectiveText,
  onDone,
}: {
  objectiveText: string;
  onDone: () => void;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= STEPS.length) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), TIMINGS[current]);
    return () => clearTimeout(t);
  }, [current, onDone]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center py-24 text-center">
      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/20 [animation-duration:2s]" />
        <CeoAvatar size={56} />
      </div>
      <h2 className="mt-8 font-display text-2xl text-mist-100 sm:text-3xl">
        CEO is understanding the objective
      </h2>
      <p className="mt-3 max-w-md text-sm italic leading-relaxed text-mist-400">
        “{objectiveText}”
      </p>

      <ul className="mt-10 w-full max-w-sm space-y-1 text-left">
        {STEPS.map((step, i) => (
          <li
            key={step}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-500 ${
              i === current
                ? "bg-white/[0.05] text-mist-100"
                : i < current
                  ? "text-mist-400"
                  : "text-mist-500/60"
            }`}
          >
            {i < current ? (
              <Check size={16} className="shrink-0 text-gold-400" />
            ) : i === current ? (
              <Loader2 size={16} className="shrink-0 animate-spin text-gold-400" />
            ) : (
              <span className="h-4 w-4 shrink-0 rounded-full border border-white/15" />
            )}
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}
