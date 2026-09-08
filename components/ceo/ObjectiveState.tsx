"use client";

import { useRef, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { useGreeting } from "@/lib/hooks";

const EXAMPLES = [
  "Build Adhere's new website",
  "Research the Egyptian digital studio market",
  "Create this week's content strategy",
  "Turn our Rabtek project into a case study",
];

export default function ObjectiveState({
  onStart,
}: {
  onStart: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const greeting = useGreeting();

  const submit = () => {
    const text = value.trim();
    if (text) onStart(text);
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-16 sm:py-20">
      <p className="mt-6 text-lg text-mist-300">
        {greeting}, Mr. Aslaan.
      </p>
      <h1 className="mt-2 font-display text-[42px] leading-[1.06] text-mist-100 sm:text-6xl">
        What do you want to{" "}
        <em className="italic text-gold-300">accomplish</em>?
      </h1>

      <div className="mt-10 max-w-2xl">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-200 focus-within:border-gold-500/40 focus-within:bg-white/[0.045] focus-within:shadow-[0_0_0_4px_rgba(255,215,0,0.07)]">
          <textarea
            ref={inputRef}
            rows={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="e.g. Build a new website for Adhere"
            className="w-full resize-none bg-transparent px-5 py-4 text-[17px] leading-relaxed text-mist-100 placeholder:text-mist-500/70 focus:outline-none"
          />
          <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-2.5">
            <span className="text-xs text-mist-500">
              Enter to start · Shift + Enter for a new line
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-mist-500/70">
              Objective
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={submit}
            disabled={!value.trim()}
          >
            Start with CEO <ArrowRight size={17} />
          </Button>
          <span className="text-xs text-mist-500">
            The CEO will ask before it acts.
          </span>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist-500">
          Or begin from an example
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              onClick={() => {
                setValue(example);
                inputRef.current?.focus();
              }}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 text-[13px] text-mist-400 transition-all hover:border-gold-500/30 hover:bg-gold-500/[0.06] hover:text-gold-200"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14 flex items-center gap-2 text-xs text-mist-500">
        <ShieldCheck size={14} className="text-gold-500/70" />
        Supervised mode — the CEO confirms the brief with you before anything
        runs.
      </div>
    </div>
  );
}
