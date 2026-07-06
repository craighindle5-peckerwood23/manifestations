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
