"use client";

import { useState } from "react";
import type {
  Brief,
  DiscoveryAnswer,
  Objective,
  Phase,
  Workflow,
} from "@/lib/types";
import { detectDomain, getQuestions } from "@/lib/mock/discovery";
import { buildBrief } from "@/lib/mock/brief";
import { buildWorkflow } from "@/lib/mock/workflow";
import ObjectiveState from "./ObjectiveState";
import ThinkingState from "./ThinkingState";
import DiscoveryState from "./DiscoveryState";
import BriefState from "./BriefState";
import WorkflowState from "./WorkflowState";
import ResultsState from "./ResultsState";

const STEPS = ["Objective", "Discovery", "Brief", "Workflow", "Results"];

const PHASE_INDEX: Record<Phase, number> = {
  objective: 0,
  thinking: 1,
  discovery: 1,
  brief: 2,
  workflow: 3,
  results: 4,
};

export default function CeoCore() {
  const [phase, setPhase] = useState<Phase>("objective");
  const [objective, setObjective] = useState<Objective | null>(null);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [workflow, setWorkflow] = useState<Workflow | null>(null);

  const start = (text: string) => {
    setObjective({
      id: `obj-${Date.now().toString(36)}`,
      text,
      domain: detectDomain(text),
    });
    setPhase("thinking");
  };

  const handleDiscoveryComplete = (answers: DiscoveryAnswer[]) => {
    if (!objective) return;
    setBrief(buildBrief(objective.text, objective.domain, answers));
    setPhase("brief");
  };

  const handleApprove = (approvedBrief: Brief) => {
    setBrief(approvedBrief);
    setWorkflow(buildWorkflow(approvedBrief.domain));
    setPhase("workflow");
  };

  const restart = () => {
    setObjective(null);
    setBrief(null);
    setWorkflow(null);
    setPhase("objective");
  };

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-5 sm:px-8">
      {phase !== "objective" && <Stepper current={PHASE_INDEX[phase]} />}
      <div key={phase} className="animate-rise flex-1">
        {phase === "objective" && <ObjectiveState onStart={start} />}
        {phase === "thinking" && objective && (
          <ThinkingState
            objectiveText={objective.text}
            onDone={() => setPhase("discovery")}
          />
        )}
        {phase === "discovery" && objective && (
          <DiscoveryState
            questions={getQuestions(objective.domain)}
            onComplete={handleDiscoveryComplete}
            onBack={() => setPhase("objective")}
          />
        )}
        {phase === "brief" && brief && (
          <BriefState
            brief={brief}
            onApprove={handleApprove}
            onBack={() => setPhase("discovery")}
          />
        )}
        {phase === "workflow" && objective && workflow && (
          <WorkflowState
            workflow={workflow}
            objectiveText={objective.text}
            onComplete={() => setPhase("results")}
          />
        )}
        {phase === "results" && objective && workflow && (
          <ResultsState
            objectiveText={objective.text}
            domain={objective.domain}
            workflow={workflow}
            onRestart={restart}
          />
        )}
      </div>
    </div>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <div
      className="animate-fade flex flex-wrap items-center justify-center gap-1.5 pt-8 sm:gap-2"
      aria-label="Progress"
    >
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-1.5 sm:gap-2">
          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-wide transition-colors ${
              i === current
                ? "border-gold-500/40 bg-gold-500/[0.08] text-gold-300"
                : i < current
                  ? "border-white/[0.08] bg-white/[0.03] text-mist-400"
                  : "border-transparent text-mist-500/70"
            }`}
          >
            <span
              className={`h-1 w-1 rounded-full ${
                i === current
                  ? "bg-gold-400"
                  : i < current
                    ? "bg-gold-600"
                    : "bg-white/20"
              }`}
            />
            {step}
          </div>
          {i < STEPS.length - 1 && (
            <span className="h-px w-3 bg-white/10 sm:w-5" />
          )}
        </div>
      ))}
    </div>
  );
}
