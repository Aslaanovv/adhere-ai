import type { AgentResult, CeoResults, Domain, Workflow } from "@/lib/types";

interface ResultsTemplate {
  results: Omit<AgentResult, "nodeId">[];
  recommendations: string[];
  nextAction: { title: string; description: string };
}

const DATA: Record<Domain, ResultsTemplate> = {
  website: {
    results: [
      {
        agent: "CEO Core",
        role: "Chief of Staff",
        summary:
          "Converted the approved brief into a five-step supervised plan with clear handoffs and a single approval gate before any external work.",
        highlights: [
          "Plan locked: research → strategy → brand → website",
          "One approval gate before production",
          "No external actions without sign-off",
        ],
        confidence: 97,
      },
      {
        agent: "Scout",
        role: "Research Agent",
        summary:
          "Mapped 14 competitor and reference sites. Premium studios lean minimal-dark; most underinvest in typography and case-study depth — an opening for Adhere.",
        highlights: [
          "14 references analyzed across 3 segments",
          "Common gap: weak case-study storytelling",
          "Visual benchmark set for the brand step",
        ],
        confidence: 92,
      },
      {
        agent: "Vector",
        role: "Strategy Agent",
        summary:
          "Positioning recommendation: “Design + Technology, engineered end-to-end.” The site narrative leads with outcomes for founders, not with services.",
        highlights: [
          "Primary message: design plus engineering under one roof",
          "Narrative ordered by client outcome, not by discipline",
          "Tone: editorial, precise, confident",
        ],
        confidence: 89,
      },
      {
        agent: "Ember",
        role: "Brand Agent",
        summary:
          "Visual direction: deep navy canvas, gold accents, serif display type. Restrained motion; no generic AI aesthetics.",
        highlights: [
          "Palette anchored on #0A1128 with gold accents",
          "Editorial serif for headlines, sans for interface",
          "Motion budget: subtle transitions only",
        ],
        confidence: 91,
      },
      {
        agent: "Forge",
        role: "Web Agent",
        summary:
          "Sitemap: Home, Work, Services, Studio, Contact. Homepage concept structured around one objective-first hero and a proof-driven work section.",
        highlights: [
          "5-page sitemap with case-study system",
          "Hero concept: objective-first, one clear CTA",
          "Build plan ready for client review",
        ],
        confidence: 93,
      },
    ],
    recommendations: [
      "Approve the positioning line before design begins — it constrains every screen that follows.",
      "Turn Rabtek into the flagship case study; it proves the design-plus-engineering story.",
      "Keep the build supervised: review the homepage concept before any full-page design.",
    ],
    nextAction: {
      title: "Review the homepage direction",
      description:
        "Approve the visual benchmark and homepage concept so Forge can move from structure to design.",
    },
  },
  research: {
    results: [
      {
        agent: "CEO Core",
        role: "Chief of Staff",
        summary:
          "Framed the research questions and kept the sprint scoped to the Egyptian market, with global benchmarks as context.",
        highlights: [
          "Three research questions locked",
          "Scope: Egypt first, MENA as context",
          "Findings routed through CEO review",
        ],
        confidence: 96,
      },
      {
        agent: "Scout",
        role: "Research Agent",
        summary:
          "Catalogued 22 active digital studios in Egypt — Cairo and Alexandria — across premium, mid and volume segments.",
        highlights: [
          "22 studios profiled",
          "Service mix and pricing signals captured",
          "Premium segment is the thinnest — and the most defensible",
        ],
        confidence: 90,
      },
      {
        agent: "Vector",
        role: "Strategy Agent",
        summary:
          "Positioning landscape: most studios sell deliverables, not outcomes. Differentiation is available at the strategy layer.",
        highlights: [
          "Deliverable-first messaging dominates",
          "Few studios publish process or case depth",
          "White space: outcome-led, engineering-backed positioning",
        ],
        confidence: 88,
      },
      {
        agent: "Prism",
        role: "Insights Agent",
        summary:
          "Insight: trust is the real currency. Clients choose studios that demonstrate judgment — case studies and clear process outperform portfolios.",
        highlights: [
          "Case depth beats visual volume",
          "Process transparency correlates with premium pricing",
          "Referrals hinge on demonstrated judgment",
        ],
        confidence: 91,
      },
      {
        agent: "Scribe",
        role: "Analyst Agent",
        summary:
          "Report compiled: market map, positioning matrix, and three recommended moves for Adhere's next quarter.",
        highlights: [
          "Market map with segment analysis",
          "Positioning matrix included",
          "Three prioritized recommendations",
        ],
        confidence: 94,
      },
    ],
    recommendations: [
      "Claim the outcome-led positioning — the scan shows the lane is open in Egypt.",
      "Publish two deep case studies before any paid promotion.",
      "Revisit pricing after positioning is set, not before.",
    ],
    nextAction: {
      title: "Review the positioning white space",
      description:
        "Decide whether Adhere leads with outcome-led positioning next quarter — the research says the lane is open.",
    },
  },
  content: {
    results: [
      {
        agent: "CEO Core",
        role: "Chief of Staff",
        summary:
          "Scoped the sprint to one week of output with a clear goal: authority that compounds into inbound interest.",
        highlights: [
          "Goal locked: authority → inbound",
          "One-week scope, fully supervised",
          "All drafts gated by review",
        ],
        confidence: 95,
      },
      {
        agent: "Scout",
        role: "Research Agent",
        summary:
          "Audience review: founders and product leaders respond to process transparency and sharp opinions; generic tips underperform.",
        highlights: [
          "Top formats: teardown, process, point of view",
          "Best windows: Tuesday–Thursday mornings",
          "Competitor content is largely promotional",
        ],
        confidence: 89,
      },
      {
        agent: "Quill",
        role: "Content Agent",
        summary:
          "Drafted three narrative angles: “Why premium studios say no”, “Design decisions are business decisions”, and the Rabtek build story.",
        highlights: [
          "Three distinct angles drafted",
          "Each angle maps to a studio strength",
          "Rabtek story drafted as the flagship",
        ],
        confidence: 90,
      },
      {
        agent: "Vector",
        role: "Strategy Agent",
        summary:
          "Prioritized: lead with the Rabtek build story — proof first, opinions second, tips last.",
        highlights: [
          "Rabtek story ranked first",
          "Opinion pieces scheduled mid-week",
          "Tips deprioritized to the newsletter",
        ],
        confidence: 87,
      },
      {
        agent: "Scribe",
        role: "Analyst Agent",
        summary:
          "Publishing plan: two LinkedIn posts, one newsletter issue, one case-study teaser — all reviewed before scheduling.",
        highlights: [
          "Full week mapped with owners",
          "Review gate before anything publishes",
          "Teaser drives to the Rabtek case study",
        ],
        confidence: 92,
      },
    ],
    recommendations: [
      "Publish the Rabtek story first — proof compounds faster than opinions.",
      "Keep a strict review gate; a premium studio cannot ship rushed content.",
      "Repurpose each piece twice before creating anything new.",
    ],
    nextAction: {
      title: "Approve the Rabtek teaser draft",
      description:
        "Sign off the flagship teaser so this week's publishing plan can move to scheduling.",
    },
  },
  general: {
    results: [
      {
        agent: "CEO Core",
        role: "Chief of Staff",
        summary:
          "Decomposed the objective into a supervised plan with explicit success criteria and a single approval gate.",
        highlights: [
          "Objective decomposed into four steps",
          "Success criteria agreed up front",
          "Nothing external without approval",
        ],
        confidence: 95,
      },
      {
        agent: "Scout",
        role: "Research Agent",
        summary:
          "Context gathered: constraints, prior art and internal material relevant to the objective.",
        highlights: [
          "Internal material indexed",
          "Constraints confirmed with you",
          "Prior art collected for reference",
        ],
        confidence: 90,
      },
      {
        agent: "Vector",
        role: "Strategy Agent",
        summary:
          "Approach defined: smallest credible scope first, expand only after validation.",
        highlights: [
          "Scope minimized to reduce risk",
          "Decision points scheduled",
          "Definition of done written",
        ],
        confidence: 88,
      },
      {
        agent: "Ember",
        role: "Brand Agent",
        summary:
          "Creative direction drafted in line with Adhere's premium editorial standard.",
        highlights: [
          "Direction matches the studio standard",
          "No clichés or template aesthetics",
          "Ready for your review",
        ],
        confidence: 89,
      },
      {
        agent: "Forge",
        role: "Delivery Agent",
        summary: "Delivery plan assembled with owners, sequence and review gates.",
        highlights: [
          "Step-by-step plan with owners",
          "Review gates between phases",
          "Ready to execute on approval",
        ],
        confidence: 92,
      },
    ],
    recommendations: [
      "Approve the smallest credible scope before expanding.",
      "Keep every external touchpoint behind a review gate.",
      "Capture what you learn this cycle — it compounds.",
    ],
    nextAction: {
      title: "Review the delivery plan",
      description:
        "Approve the plan so execution can begin under supervision.",
    },
  },
};

export function buildResults(domain: Domain, workflow: Workflow): CeoResults {
  const template = DATA[domain];
  const results: AgentResult[] = template.results.map((result, i) => ({
    ...result,
    nodeId: workflow.nodes[i]?.id ?? `${domain}-${i}`,
  }));
  return {
    results,
    recommendations: template.recommendations,
    nextAction: template.nextAction,
  };
}
