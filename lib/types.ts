export type Phase =
  | "objective"
  | "thinking"
  | "discovery"
  | "brief"
  | "workflow"
  | "results";

export type Domain = "website" | "research" | "content" | "general";

export interface Objective {
  id: string;
  text: string;
  domain: Domain;
}

export interface DiscoveryOption {
  id: string;
  label: string;
}

export interface DiscoveryQuestion {
  id: string;
  question: string;
  options: DiscoveryOption[];
}

export interface DiscoveryAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export interface Brief {
  objective: string;
  domain: Domain;
  context: string;
  audience: string;
  desiredOutcome: string;
  constraints: string;
  successCriteria: string;
  recommendation: string;
}

export type NodeStatus = "pending" | "running" | "completed" | "skipped";

export interface WorkflowNode {
  id: string;
  kind: string;
  agent: string;
  role: string;
  task: string;
  status: NodeStatus;
}

export interface Workflow {
  id: string;
  title: string;
  createdAt: string;
  nodes: WorkflowNode[];
}

export interface AgentResult {
  nodeId: string;
  agent: string;
  role: string;
  summary: string;
  highlights: string[];
  confidence: number;
}

export interface CeoResults {
  results: AgentResult[];
  recommendations: string[];
  nextAction: {
    title: string;
    description: string;
  };
}
