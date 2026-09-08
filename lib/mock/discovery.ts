import type { DiscoveryQuestion, Domain } from "@/lib/types";

export const domainLabels: Record<Domain, string> = {
  website: "Web & Product",
  research: "Research & Insight",
  content: "Content & Story",
  general: "General Objective",
};

export function detectDomain(text: string): Domain {
  const t = text.toLowerCase();
  if (/(website|web site|landing page|redesign|rebuild|\bbuild|site\b)/.test(t))
    return "website";
  if (/(research|market|competitor|benchmark|analysis|study)/.test(t))
    return "research";
  if (/(content|social|linkedin|newsletter|blog|post|article|campaign)/.test(t))
    return "content";
  return "general";
}

function question(
  id: string,
  prompt: string,
  labels: string[],
): DiscoveryQuestion {
  return {
    id,
    question: prompt,
    options: [
      ...labels.map((label, i) => ({ id: `${id}-${i + 1}`, label })),
      { id: `${id}-other`, label: "Other" },
    ],
  };
}

const QUESTION_BANK: Record<Domain, DiscoveryQuestion[]> = {
  website: [
    question("w-outcome", "What is the primary outcome?", [
      "Generate more qualified leads",
      "Improve brand perception",
      "Launch something new",
    ]),
    question("w-audience", "Who is this primarily for?", [
      "Startups",
      "Established companies",
      "Product / Tech companies",
    ]),
    question("w-scope", "What scope should the first release cover?", [
      "Marketing site only",
      "Site + case studies",
      "Full brand refresh",
    ]),
  ],
  research: [
    question("r-decision", "What decision should this research support?", [
      "Positioning & messaging",
      "Pricing & packaging",
      "New service offerings",
    ]),
    question("r-scope", "What scope matters most?", [
      "Local — Egypt",
      "MENA region",
      "Global benchmarks",
    ]),
  ],
  content: [
    question("c-goal", "What is the primary goal?", [
      "Authority & thought leadership",
      "Inbound leads",
      "Community growth",
    ]),
    question("c-channel", "Which channels matter most?", [
      "LinkedIn",
      "X / Twitter",
      "Newsletter & blog",
    ]),
  ],
  general: [
    question("g-outcome", "What is the primary outcome?", [
      "Generate more qualified leads",
      "Improve brand perception",
      "Launch something new",
    ]),
    question("g-audience", "Who is this primarily for?", [
      "Startups",
      "Established companies",
      "Product / Tech companies",
    ]),
  ],
};

export function getQuestions(domain: Domain): DiscoveryQuestion[] {
  return QUESTION_BANK[domain];
}
