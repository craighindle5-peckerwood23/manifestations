export type Language = "javascript" | "python" | "html";

export interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface FileSnippet {
  id: string;
  name: string;
  language: Language;
  code: string;
  description: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  status: "success" | "error" | "timeout" | "idle" | "running";
  error?: string;
  executionTimeMs?: number;
}

export type AgentType = "architect" | "frontend" | "backend" | "ops_healing";

export interface CustomSkill {
  id: string;
  name: string;
  description: string;
  category: "payments" | "database" | "auth" | "crm" | "custom_api";
  spec: string;
  enabled: boolean;
}

export interface TestCase {
  id: string;
  name: string;
  targetFile: string;
  status: "passed" | "failed" | "running" | "idle";
  assertionDetails: string;
  errorTrace?: string;
  suggestedPatch?: string;
}

export interface RepoSymbol {
  id: string;
  name: string;
  type: "route" | "component" | "function" | "schema" | "type";
  filePath: string;
  line: number;
}

export interface AgentOutput {
  id: string;
  agentType: AgentType;
  prompt: string;
  content: string;
  timestamp: string;
}
