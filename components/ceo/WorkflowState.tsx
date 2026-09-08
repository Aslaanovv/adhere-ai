"use client";

import { useEffect, useState } from "react";
import {
  Check,
  CheckCircle2,
  Code2,
  Compass,
  FileText,
  Lightbulb,
  ListChecks,
  Loader2,
  Minus,
  Palette,
  Pause,
  PenLine,
  Pencil,
  Play,
  RotateCcw,
  Search,
  SkipForward,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";
import type { NodeStatus, Workflow, WorkflowNode } from "@/lib/types";

const STEP_MS = 2400;

const KIND_ICONS: Record<string, LucideIcon> = {
  ceo: Sparkles,
  research: Search,
  strategy: Compass,
  brand: Palette,
  website: Code2,
  insights: Lightbulb,
  report: FileText,
  content: PenLine,
  plan: ListChecks,
};

const STATUS_META: Record<
  NodeStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Queued",
    className: "border-white/10 bg-white/[0.03] text-mist-500",
  },
  running: {
    label: "Running",
    className: "border-gold-500/40 bg-gold-500/[0.1] text-gold-300",
  },
  completed: {
    label: "Done",
    className: "border-jade-400/30 bg-jade-400/[0.08] text-jade-400",
  },
  skipped: {
    label: "Skipped",
    className: "border-white/10 bg-white/[0.05] text-mist-400",
  },
};

export default function WorkflowState({
  workflow,
  objectiveText,
  onComplete,
}: {
  workflow: Workflow;
  objectiveText: string;
  onComplete: () => void;
}) {
  const [nodes, setNodes] = useState<WorkflowNode[]>(() =>
    workflow.nodes.map((n) => ({ ...n })),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [editing, setEditing] = useState(false);

  const done = activeIndex >= nodes.length;
  const settledCount = nodes.filter(
    (n) => n.status === "completed" || n.status === "skipped",
  ).length;

  useEffect(() => {
    if (done || paused) return;
    setNodes((prev) =>
      prev.map((n, i) => (i === activeIndex ? { ...n, status: "running" } : n)),
    );
    const t = setTimeout(() => {
      setNodes((prev) =>
        prev.map((n, i) =>
          i === activeIndex ? { ...n, status: "completed" } : n,
        ),
      );
      setActiveIndex((i) => i + 1);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [activeIndex, paused, done]);

  const skip = () => {
    if (done) return;
    setNodes((prev) =>
      prev.map((n, i) => (i === activeIndex ? { ...n, status: "skipped" } : n)),
    );
    setActiveIndex((i) => i + 1);
  };

  const retry = (i: number) => {
    if (editing) return;
    setNodes((prev) =>
      prev.map((n, idx) => (idx === i ? { ...n, status: "running" } : n)),
    );
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n, idx) =>
          idx === i && n.status === "running"
            ? { ...n, status: "completed" }
            : n,
        ),
      );
    }, 1500);
  };

  const updateTask = (i: number, task: string) =>
    setNodes((prev) =>
      prev.map((n, idx) => (idx === i ? { ...n, task } : n)),
    );

  return (
    <div className="py-14 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400/90">
            CEO Core · Workflow
          </div>
          <h2 className="mt-2 font-display text-3xl text-mist-100 sm:text-4xl">
            {workflow.title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist-400">
            “{objectiveText}” — supervised execution. The CEO coordinates each
            agent; you can pause, skip, edit or retry any step.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!done && (
            <>
              <Button onClick={() => setPaused((p) => !p)}>
                {paused ? <Play size={14} /> : <Pause size={14} />}
                {paused ? "Resume" : "Pause"}
              </Button>
              <Button onClick={skip}>
                <SkipForward size={14} /> Skip
              </Button>
            </>
          )}
          <Button
            variant={editing ? "primary" : "secondary"}
            onClick={() => setEditing((e) => !e)}
          >
            <Pencil size={14} /> {editing ? "Done" : "Edit"}
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between text-xs text-mist-500">
          <span>
            {done
              ? "All steps settled"
              : paused
                ? "Paused"
                : nodes[activeIndex]
                  ? `Running — ${nodes[activeIndex].agent}`
                  : ""}
          </span>
          <span>
            {settledCount}/{nodes.length}
          </span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700"
            style={{ width: `${(settledCount / nodes.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col xl:flex-row">
        {nodes.map((node, i) => {
          const Icon = KIND_ICONS[node.kind] ?? Sparkles;
          return (
            <div key={node.id} className="contents">
              {i > 0 && (
                <div
                  aria-hidden
                  className="flex items-center justify-center xl:w-10"
                >
                  <div
                    className={`h-7 w-px transition-colors duration-500 xl:h-px xl:w-full ${
                      i <= activeIndex ? "bg-gold-500/50" : "bg-white/10"
                    }`}
                  />
                </div>
              )}
              <div
                className={`flex-1 rounded-2xl border p-4 transition-all duration-500 sm:p-5 ${
                  node.status === "running"
                    ? "border-gold-500/40 bg-gold-500/[0.05] shadow-[0_0_40px_-18px_rgba(255,215,0,0.5)]"
                    : node.status === "completed"
                      ? "border-white/[0.09] bg-white/[0.03]"
                      : node.status === "skipped"
                        ? "border-dashed border-white/[0.14] bg-transparent"
                        : "border-white/[0.07] bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-500 ${
                      node.status === "running"
                        ? "border-gold-500/40 bg-gold-500/[0.1] text-gold-300"
                        : "border-white/10 bg-white/[0.04] text-mist-300"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <StatusChip status={node.status} />
                </div>
                <div className="mt-3 text-[15px] font-medium text-mist-100">
                  {node.agent}
                </div>
                <div className="text-xs text-mist-500">{node.role}</div>
                {editing ? (
                  <input
                    value={node.task}
                    onChange={(e) => updateTask(i, e.target.value)}
                    className="mt-2.5 w-full rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[13px] text-mist-200 focus:border-gold-500/40 focus:outline-none"
                  />
                ) : (
                  <p className="mt-2 text-[13px] leading-relaxed text-mist-400">
                    {node.task}
                  </p>
                )}
                {!editing &&
                  (node.status === "completed" ||
                    node.status === "skipped") && (
                    <button
                      onClick={() => retry(i)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-mist-500 transition-colors hover:text-gold-300"
                    >
                      <RotateCcw size={12} /> Retry
                    </button>
                  )}
              </div>
            </div>
          );
        })}
      </div>

      {done && (
        <div className="animate-fade mt-10 flex flex-col items-center rounded-2xl border border-gold-500/20 bg-gradient-to-b from-gold-500/[0.07] to-transparent px-6 py-8 text-center">
          <CheckCircle2 size={28} className="text-gold-400" />
          <h3 className="mt-4 font-display text-2xl text-mist-100">
            All steps complete
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-mist-400">
            The CEO has collected every output and prepared the synthesis.
            Review the results whenever you’re ready.
          </p>
          <Button variant="primary" size="lg" className="mt-6" onClick={onComplete}>
            View results <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}

function StatusChip({ status }: { status: NodeStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${meta.className}`}
    >
      {status === "running" && <Loader2 size={11} className="animate-spin" />}
      {status === "completed" && <Check size={11} />}
      {status === "skipped" && <Minus size={11} />}
      {meta.label}
    </span>
  );
}
