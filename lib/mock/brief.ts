import type { Brief, DiscoveryAnswer, Domain } from "@/lib/types";
import { domainLabels } from "./discovery";

const CONSTRAINTS: Record<Domain, string> = {
  website:
    "Two active workstreams maximum this week · final copy requires your sign-off · nothing is published externally without approval.",
  research:
    "Desktop research only · no external outreach · findings stay internal until you review them.",
  content:
    "Premium editorial tone at all times · no trend-chasing · every draft is reviewed before scheduling.",
  general:
    "Scoped to internal review · no client-facing output without your approval.",
};

const SUCCESS: Record<Domain, string> = {
  website:
    "Sitemap and narrative approved · homepage direction validated against references · clear next steps toward build.",
  research:
    "Positioning landscape mapped · at least three actionable insights · a clear recommendation for the next move.",
  content:
    "Core angles approved · one month of themes outlined · publishing cadence defined.",
  general:
    "Objective decomposed into clear steps · sequence and owners agreed · definition of done written.",
};

const FIRST_STEP: Record<Domain, string> = {
  website: "strategy and narrative before any design work",
  research: "a focused competitor scan before drawing insights",
  content: "two strong angles before any volume",
  general: "context research before planning",
};

export function buildBrief(
  objective: string,
  domain: Domain,
  answers: DiscoveryAnswer[],
): Brief {
  const find = (re: RegExp) =>
    answers.find((a) => re.test(a.question))?.answer;
  const outcome =
    find(/outcome|goal|decision/i) ?? "a clear, decision-ready outcome";
  const audience = find(/who/i) ?? "Adhere Studio leadership";
  const captured =
    answers.length > 0
      ? `${answers.length} discovery point${answers.length === 1 ? "" : "s"} captured`
      : "no additional context required";

  return {
    objective,
    domain,
    context: `Raised directly by Mr. Aslaan in CEO Core. Classified as ${domainLabels[domain]}. ${captured}.`,
    audience,
    desiredOutcome: outcome,
    constraints: CONSTRAINTS[domain],
    successCriteria: SUCCESS[domain],
    recommendation: `I recommend we move forward with ${audience.toLowerCase()} in mind, optimizing for ${outcome.toLowerCase()}. Start narrow — ${FIRST_STEP[domain]} — then expand once the direction is validated. I will supervise every step and bring decisions to you before anything ships.`,
  };
}
