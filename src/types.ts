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

export interface BuildLogEntry {
  id: string;
  timestamp: string;
  trigger: string;
  status: "success" | "error" | "building";
  durationMs: number;
  filesModified: number;
  stdout?: string;
  stderr?: string;
  agentRole?: string;
}

export interface MetacognitiveReflection {
  id: string;
  timestamp: string;
  thoughtProcess: string;
  userIntentAlignment: string;
  confidenceScore: number; // 0 to 100
  webInferenceInsights: string[];
  suggestedRoadmap: {
    stepNumber: number;
    title: string;
    description: string;
    highYieldImpact: string;
  }[];
}

export interface GitHubIntegrationConfig {
  connected: boolean;
  repoName: string;
  branch: string;
  personalAccessToken?: string;
  lastSyncTimestamp?: string;
  recentCommits: {
    id: string;
    message: string;
    author: string;
    time: string;
  }[];
}

export interface EnterpriseIntegrationConfig {
  microsoft365Connected: boolean;
  googleWorkspaceConnected: boolean;
  azureCloudConnected: boolean;
  teamsConnected: boolean;
  contactsSyncedCount: number;
  recentEmails: {
    id: string;
    platform: "outlook" | "gmail" | "teams";
    subject: string;
    recipient: string;
    status: "drafted" | "sent" | "received";
    timestamp: string;
  }[];
}

export interface BluetoothDeviceState {
  isScanning: boolean;
  connectedDevice: {
    name: string;
    id: string;
    batteryPercent: number;
    rssi: number;
  } | null;
}

export interface MultiLLMConfig {
  openAIEnabled: boolean;
  openAIKey: string;
  selectedModel: "gpt-4o" | "claude-3-5-sonnet" | "gemini-3.6-flash";
  collaborationMode: "consensus" | "pipeline" | "adversarial_review";
}

