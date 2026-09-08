import type { Domain, Workflow, WorkflowNode } from "@/lib/types";

type NodeSpec = Omit<WorkflowNode, "id" | "status">;

interface Template {
  title: string;
  nodes: NodeSpec[];
}

const CEO_NODE: NodeSpec = {
  kind: "ceo",
  agent: "CEO Core",
  role: "Chief of Staff",
  task: "Turn the approved brief into a supervised execution plan",
};

const TEMPLATES: Record<Domain, Template> = {
  website: {
    title: "Adhere Website Engagement",
    nodes: [
      CEO_NODE,
      {
        kind: "research",
        agent: "Scout",
        role: "Research Agent",
        task: "Collect references, competitor sites and market cues",
      },
      {
        kind: "strategy",
        agent: "Vector",
        role: "Strategy Agent",
        task: "Define positioning and the site's core narrative",
      },
      {
        kind: "brand",
        agent: "Ember",
        role: "Brand Agent",
        task: "Propose visual direction and design principles",
      },
      {
        kind: "website",
        agent: "Forge",
        role: "Web Agent",
        task: "Draft sitemap, page structure and build plan",
      },
    ],
  },
  research: {
    title: "Market Research Sprint",
    nodes: [
      CEO_NODE,
      {
        kind: "research",
        agent: "Scout",
        role: "Research Agent",
        task: "Scan the Egyptian digital studio landscape",
      },
      {
        kind: "strategy",
        agent: "Vector",
        role: "Strategy Agent",
        task: "Analyze competitor positioning and pricing signals",
      },
      {
        kind: "insights",
        agent: "Prism",
        role: "Insights Agent",
        task: "Synthesize insights and identify white space",
      },
      {
        kind: "report",
        agent: "Scribe",
        role: "Analyst Agent",
        task: "Compile the final research report",
      },
    ],
  },
  content: {
    title: "Content Strategy Sprint",
    nodes: [
      CEO_NODE,
      {
        kind: "research",
        agent: "Scout",
        role: "Research Agent",
        task: "Review audience, channels and past performance",
      },
      {
        kind: "content",
        agent: "Quill",
        role: "Content Agent",
        task: "Draft core themes and narrative angles",
      },
      {
        kind: "strategy",
        agent: "Vector",
        role: "Strategy Agent",
        task: "Prioritize angles against studio goals",
      },
      {
        kind: "report",
        agent: "Scribe",
        role: "Analyst Agent",
        task: "Produce the weekly publishing plan",
      },
    ],
  },
  general: {
    title: "Objective Delivery Plan",
    nodes: [
      CEO_NODE,
      {
        kind: "research",
        agent: "Scout",
        role: "Research Agent",
        task: "Gather context around the objective",
      },
      {
        kind: "strategy",
        agent: "Vector",
        role: "Strategy Agent",
        task: "Define approach and key decisions",
      },
      {
        kind: "brand",
        agent: "Ember",
        role: "Brand Agent",
        task: "Shape the creative direction",
      },
      {
        kind: "plan",
        agent: "Forge",
        role: "Delivery Agent",
        task: "Assemble the step-by-step delivery plan",
      },
    ],
  },
};

export function buildWorkflow(domain: Domain): Workflow {
  const template = TEMPLATES[domain];
  return {
    id: `wf-${Date.now().toString(36)}`,
    title: template.title,
    createdAt: new Date().toISOString(),
    nodes: template.nodes.map((node, i) => ({
      ...node,
      id: `${domain}-${i}`,
      status: "pending",
    })),
  };
}
