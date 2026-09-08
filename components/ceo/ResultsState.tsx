"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useToday } from "@/lib/hooks";
import { domainLabels } from "@/lib/mock/discovery";
import { buildResults } from "@/lib/mock/results";
import type { Domain, Workflow } from "@/lib/types";

export default function ResultsState({
  objectiveText,
  domain,
  workflow,
  onRestart,
}: {
  objectiveText: string;
  domain: Domain;
  workflow: Workflow;
  onRestart: () => void;
}) {
  const { results, recommendations, nextAction } = useMemo(
    () => buildResults(domain, workflow),
    [domain, workflow],
  );
  const [noteShown, setNoteShown] = useState(false);
  const today = useToday();

  const avgConfidence = Math.round(
    results.reduce((sum, r) => sum + r.confidence, 0) / results.length,
  );
  const agentsCount = new Set(results.map((r) => r.agent)).size;

  const stats = [
    { value: `${results.length}/${workflow.nodes.length}`, label: "Steps completed" },
    { value: String(agentsCount), label: "Agents involved" },
    { value: `${avgConfidence}%`, label: "Avg confidence" },
    { value: "1", label: "CEO approvals" },
  ];

  return (
    <div className="py-14 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400/90">
            CEO Core · Results
          </div>
          <h2 className="mt-2 font-display text-3xl text-mist-100 sm:text-4xl">
            Workflow complete
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist-400">
            <span className="italic">“{objectiveText}”</span>
            {today ? ` · ${today}` : ""}
          </p>
        </div>
        <span className="rounded-full border border-gold-500/25 bg-gold-500/[0.07] px-3 py-1 text-xs text-gold-300">
          {domainLabels[domain]}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5"
          >
            <div className="font-display text-2xl text-gold-300 sm:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-mist-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist-500">
          Agent outputs
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {results.map((result, i) => {
            const node = workflow.nodes[i];
            return (
              <div
                key={result.nodeId}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gold-300">
                      <FileText size={15} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[15px] font-medium text-mist-100">
                        {result.agent}
                      </div>
                      <div className="text-xs text-mist-500">{result.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gold-300">
                      {result.confidence}%
                    </div>
                    <div className="mt-1.5 h-1 w-16 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gold-500/80"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-mist-300">
                  {result.summary}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {result.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-[13px] text-mist-400"
                    >
                      <Check
                        size={13}
                        className="mt-0.5 shrink-0 text-gold-500/80"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
                {node && (
                  <div className="mt-4 border-t border-white/[0.06] pt-3 text-[11px] text-mist-500">
                    Step {i + 1} · {node.task}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mist-500">
            <Sparkles size={13} className="text-gold-400" /> CEO recommendations
          </h3>
          <ol className="mt-4 space-y-4">
            {recommendations.map((rec, i) => (
              <li key={rec} className="flex gap-4">
                <span className="font-display text-xl leading-none text-gold-400/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-mist-300">{rec}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-6 max-w-3xl">
        <div className="rounded-2xl border border-gold-500/25 bg-gradient-to-b from-gold-500/[0.08] to-transparent p-5 sm:p-6">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-300">
            Next action
          </h3>
          <div className="mt-3 font-display text-xl text-mist-100">
            {nextAction.title}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-mist-400">
            {nextAction.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg" onClick={() => setNoteShown(true)}>
              <CheckCircle2 size={16} /> Open full report
            </Button>
            <Button size="lg" onClick={onRestart}>
              Start a new objective <ArrowRight size={15} />
            </Button>
          </div>
          {noteShown && (
            <p className="animate-fade mt-4 text-xs leading-relaxed text-gold-200/80">
              Full report generation arrives with the Knowledge Base milestone —
              this prototype ends here.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
