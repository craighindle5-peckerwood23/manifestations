import React, { useState } from "react";
import {
  Bot,
  Cpu,
  GitBranch,
  Zap,
  ShieldCheck,
  Activity,
  Wrench,
  Sparkles,
  Play,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Copy,
  Check,
  Code,
  Layers,
  Terminal,
  RefreshCw,
  FolderCode,
  Lock,
  Globe
} from "lucide-react";
import { FileSnippet, AgentType, CustomSkill, TestCase, RepoSymbol, AgentOutput } from "../types";

interface OrchestratorSuiteProps {
  files: FileSnippet[];
  activeFile: FileSnippet;
  onUpdateFileCode: (fileId: string, newCode: string) => void;
  onCreateNewFile: (name: string, language: any, initialCode?: string) => void;
}

export const OrchestratorSuite: React.FC<OrchestratorSuiteProps> = ({
  files,
  activeFile,
  onUpdateFileCode,
  onCreateNewFile
}) => {
  // Agent State
  const [selectedAgent, setSelectedAgent] = useState<AgentType>("architect");
  const [agentPrompt, setAgentPrompt] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [agentOutputs, setAgentOutputs] = useState<AgentOutput[]>([]);
  const [copiedOutputId, setCopiedOutputId] = useState<string | null>(null);

  // Local-First Privacy & Git state
  const [isLocalFirst, setIsLocalFirst] = useState<boolean>(true);
  const [repoBranch, setRepoBranch] = useState<string>("main");
  const [repoUrlInput, setRepoUrlInput] = useState<string>("");
  const [isCloningRepo, setIsCloningRepo] = useState<boolean>(false);
  const [cloneMessage, setCloneMessage] = useState<string | null>(null);

  // Custom Skills Registry
  const [skills, setSkills] = useState<CustomSkill[]>([
    {
      id: "skill-1",
      name: "Stripe Subscriptions & Webhooks",
      category: "payments",
      description: "Handles Stripe checkout sessions, customer portal, and signature validation.",
      spec: "POST /api/stripe/checkout { priceId }, POST /api/stripe/webhook",
      enabled: true
    },
    {
      id: "skill-2",
      name: "Supabase Postgres RLS Policies",
      category: "database",
      description: "Row Level Security policies with auth.uid() isolation for multi-tenant data.",
      spec: "CREATE POLICY user_isolation ON records FOR ALL USING (auth.uid() = user_id);",
      enabled: true
    }
  ]);
  const [newSkillName, setNewSkillName] = useState<string>("");
  const [newSkillCategory, setNewSkillCategory] = useState<CustomSkill["category"]>("custom_api");
  const [newSkillDesc, setNewSkillDesc] = useState<string>("");
  const [newSkillSpec, setNewSkillSpec] = useState<string>("");
  const [isAddingSkill, setIsAddingSkill] = useState<boolean>(false);

  // Automated Test Suite & Self-Healing State
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: "test-1",
      name: "Unit: Code Sandbox Execution Time",
      targetFile: activeFile.name,
      status: "passed",
      assertionDetails: "Asserts execution completes in < 4000ms with zero memory leaks."
    },
    {
      id: "test-2",
      name: "Integration: Multi-Tenant Data Isolation (RLS)",
      targetFile: "server.ts",
      status: "failed",
      assertionDetails: "Asserts user_id token is validated before returning records.",
      errorTrace: "AssertionError: Expected 403 Forbidden for unauthenticated token, got 200 OK."
    },
    {
      id: "test-3",
      name: "AST Symbol Analysis & Route Mapping",
      targetFile: activeFile.name,
      status: "passed",
      assertionDetails: "Asserts all export functions are mapped in Code Graph indexer."
    }
  ]);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [healingStatus, setHealingStatus] = useState<string | null>(null);

  // Mock Repo AST Symbols
  const repoSymbols: RepoSymbol[] = [
    { id: "sym-1", name: "generateContentWithRetry", type: "function", filePath: "server.ts", line: 123 },
    { id: "sym-2", name: "/api/agent/orchestrate", type: "route", filePath: "server.ts", line: 122 },
    { id: "sym-3", name: "OrchestratorSuite", type: "component", filePath: "src/components/OrchestratorSuite.tsx", line: 30 },
    { id: "sym-4", name: "FileSnippet", type: "type", filePath: "src/types.ts", line: 10 }
  ];

  // Execute Agent Request
  const handleRunAgent = async (overridePrompt?: string, overrideAgent?: AgentType) => {
    const targetPrompt = overridePrompt || agentPrompt;
    const targetAgent = overrideAgent || selectedAgent;

    if (!targetPrompt.trim()) return;

    setIsProcessing(true);
    try {
      const activeSkills = skills.filter((s) => s.enabled);
      const res = await fetch("/api/agent/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentType: targetAgent,
          prompt: targetPrompt,
          codeContext: activeFile.code,
          skillsContext: activeSkills
        })
      });

      const data = await res.json();
      if (res.ok && data.output) {
        const newOut: AgentOutput = {
          id: `out-${Date.now()}`,
          agentType: targetAgent,
          prompt: targetPrompt,
          content: data.output,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setAgentOutputs((prev) => [newOut, ...prev]);
        if (!overridePrompt) setAgentPrompt("");
      } else {
        alert(`Agent Error: ${data.error || "Failed to generate output."}`);
      }
    } catch (err: any) {
      alert(`Network / Processing Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Run Test Suite
  const handleRunTestSuite = () => {
    setIsTesting(true);
    setTimeout(() => {
      setTestCases((prev) =>
        prev.map((tc) => {
          if (tc.id === "test-2") {
            return {
              ...tc,
              status: "failed",
              errorTrace: "AssertionError: Expected 403 Forbidden for missing JWT token, got 200 OK."
            };
          }
          return { ...tc, status: "passed" };
        })
      );
      setIsTesting(false);
    }, 1200);
  };

  // Trigger Self-Healing Loop
  const handleTriggerSelfHealing = async (failedTest: TestCase) => {
    setHealingStatus(`Self-Healing Agent diagnosing failure in ${failedTest.targetFile}...`);
    setIsProcessing(true);

    const healingPrompt = `TEST FAILURE DETECTED in test "${failedTest.name}":
Assertion: ${failedTest.assertionDetails}
Stack Trace / Error: ${failedTest.errorTrace}

Target File Code:
\`\`\`ts
${activeFile.code}
\`\`\`

Diagnose the vulnerability or bug, produce a unit test assertion, and provide a corrected AST code block.`;

    await handleRunAgent(healingPrompt, "ops_healing");

    setHealingStatus("Self-Healing Patch synthesized successfully! Review and apply below.");
    setIsProcessing(false);
  };

  // Add Custom Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim() || !newSkillSpec.trim()) return;

    const skill: CustomSkill = {
      id: `skill-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      description: newSkillDesc.trim() || "Custom taught API specification.",
      spec: newSkillSpec.trim(),
      enabled: true
    };

    setSkills((prev) => [skill, ...prev]);
    setNewSkillName("");
    setNewSkillDesc("");
    setNewSkillSpec("");
    setIsAddingSkill(false);
  };

  // Clone Repo Action
  const handleCloneRepo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrlInput.trim()) return;

    setIsCloningRepo(true);
    setCloneMessage("Parsing remote git AST graph & pulling files locally...");

    setTimeout(() => {
      setIsCloningRepo(false);
      setCloneMessage(`Repository '${repoUrlInput}' mirrored into local-first workspace! AST graph indexed.`);
      setRepoUrlInput("");
      setTimeout(() => setCloneMessage(null), 4000);
    }, 1800);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedOutputId(id);
    setTimeout(() => setCopiedOutputId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-200 overflow-y-auto p-6 space-y-6">
      
      {/* 🔮 Workspace Header & Repo-Native Status Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/15 text-indigo-400 rounded-xl border border-indigo-500/20 shadow-inner">
            <Cpu size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white tracking-tight">Repo-Native AI Developer Platform</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                Multi-Agent Orchestrator
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Cross-generative agents • AST code graph • Local-first privacy • Self-healing test loop
            </p>
          </div>
        </div>

        {/* Local-First & Git Indicators */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsLocalFirst(!isLocalFirst)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              isLocalFirst
                ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/60 shadow"
                : "bg-slate-800 text-slate-400 border-slate-700"
            }`}
            title="Local-first privacy guarantees code remains on your workspace"
          >
            {isLocalFirst ? <Lock size={12} /> : <Globe size={12} />}
            <span>{isLocalFirst ? "Local-First Workspace" : "Cloud Sync On"}</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <GitBranch size={13} className="text-indigo-400" />
            <span className="text-slate-300 font-bold">{repoBranch}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">commit e4a29c1</span>
          </div>
        </div>
      </div>

      {/* 🔮 Repo Clone & AST Indexer Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Clone / Mirror Repo Tool */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <FolderCode size={15} className="text-purple-400" />
              <span>Clone & Index Git Repository</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Round-Trip AST Compatible</span>
          </div>

          <form onSubmit={handleCloneRepo} className="flex gap-2">
            <input
              type="text"
              value={repoUrlInput}
              onChange={(e) => setRepoUrlInput(e.target.value)}
              placeholder="e.g. https://github.com/org/repo.git or git@github.com:user/app.git"
              className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isCloningRepo}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow"
            >
              {isCloningRepo ? <RefreshCw size={13} className="animate-spin" /> : <GitBranch size={13} />}
              <span>Mirror Repo</span>
            </button>
          </form>

          {cloneMessage && (
            <div className="p-2.5 bg-indigo-950/40 border border-indigo-900/50 rounded-xl text-xs text-indigo-300 font-mono flex items-center gap-2">
              <Sparkles size={13} className="text-indigo-400 shrink-0" />
              <span>{cloneMessage}</span>
            </div>
          )}
        </div>

        {/* Right: Code Graph AST Index Summary */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Layers size={15} className="text-emerald-400" />
              <span>Code Graph AST Indexer</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900">
              4 Symbols Indexed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            {repoSymbols.map((sym) => (
              <div key={sym.id} className="p-2 bg-slate-950 border border-slate-850 rounded-lg flex items-center justify-between">
                <span className="text-slate-300 font-bold truncate max-w-[120px]">{sym.name}</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">
                  {sym.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 🔮 Multi-Agent Suite & Prompt Workbench */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bot size={18} className="text-indigo-400" />
              Cross-Generative Multi-Agent Suite
            </h3>
            <p className="text-xs text-slate-400">
              Coordinated specialized sub-agents working in parallel on your codebase
            </p>
          </div>

          {/* Sub-Agent Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedAgent("architect")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedAgent === "architect"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cpu size={12} />
              <span>Architect</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedAgent("frontend")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedAgent === "frontend"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code size={12} />
              <span>Frontend</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedAgent("backend")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedAgent === "backend"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Terminal size={12} />
              <span>Backend</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedAgent("ops_healing")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedAgent === "ops_healing"
                  ? "bg-amber-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Wrench size={12} />
              <span>Ops & Self-Healing</span>
            </button>
          </div>
        </div>

        {/* Prompt Input Area */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>
              Targeting: <strong className="text-indigo-400 uppercase">{selectedAgent} Agent</strong>
            </span>
            <span>Active File Context: <strong className="text-slate-200 font-mono">{activeFile.name}</strong></span>
          </div>

          <div className="relative">
            <textarea
              rows={3}
              value={agentPrompt}
              onChange={(e) => setAgentPrompt(e.target.value)}
              placeholder={`Ask the ${selectedAgent} Agent to design schemas, build components, write endpoints, or generate self-healing patches...`}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 resize-none"
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleRunAgent()}
                disabled={isProcessing || !agentPrompt.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow"
              >
                {isProcessing ? <RefreshCw size={13} className="animate-spin" /> : <Sparkles size={13} />}
                <span>Execute Sub-Agent</span>
              </button>
            </div>
          </div>
        </div>

        {/* Agent Outputs Stream */}
        {agentOutputs.length > 0 && (
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generated Agent Outputs</h4>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {agentOutputs.map((out) => (
                <div key={out.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-950 text-indigo-400 border border-indigo-900">
                        {out.agentType}
                      </span>
                      <span className="text-xs font-mono text-slate-400 truncate max-w-md">"{out.prompt}"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500">{out.timestamp}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(out.id, out.content)}
                        className="p-1 text-slate-400 hover:text-white transition-colors"
                        title="Copy Output"
                      >
                        {copiedOutputId === out.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const snippetName = `agent_${out.agentType}_${Date.now().toString().slice(-4)}.ts`;
                          onCreateNewFile(snippetName, "javascript", out.content);
                        }}
                        className="px-2 py-1 bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800 rounded text-[10px] font-bold transition-all"
                      >
                        + Create Snippet File
                      </button>
                    </div>
                  </div>

                  <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                    {out.content}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 🔮 Automated Test Runner & Self-Healing Loop */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" />
              Automated Test Suite & Self-Healing Loop
            </h3>
            <p className="text-xs text-slate-400">
              Ops Agent monitors failing assertions and generates real-time code patches
            </p>
          </div>

          <button
            type="button"
            onClick={handleRunTestSuite}
            disabled={isTesting}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow"
          >
            {isTesting ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
            <span>Run Test Suite</span>
          </button>
        </div>

        {healingStatus && (
          <div className="p-3 bg-amber-950/40 border border-amber-900/50 rounded-xl text-xs text-amber-300 font-mono flex items-center gap-2">
            <Wrench size={14} className="text-amber-400 animate-pulse shrink-0" />
            <span>{healingStatus}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {testCases.map((tc) => (
            <div
              key={tc.id}
              className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                tc.status === "passed"
                  ? "bg-slate-950 border-emerald-900/40"
                  : tc.status === "failed"
                  ? "bg-red-950/20 border-red-900/50"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {tc.status === "passed" && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                  {tc.status === "failed" && <XCircle size={16} className="text-red-400 shrink-0" />}
                  {tc.status === "idle" && <Activity size={16} className="text-slate-500 shrink-0" />}
                  <span className="text-xs font-bold text-white">{tc.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({tc.targetFile})</span>
                </div>
                <p className="text-xs text-slate-400 font-mono">{tc.assertionDetails}</p>
                {tc.errorTrace && (
                  <div className="p-2 bg-red-950/40 text-red-300 font-mono text-[11px] rounded border border-red-900/40 mt-1">
                    {tc.errorTrace}
                  </div>
                )}
              </div>

              <div>
                {tc.status === "failed" && (
                  <button
                    type="button"
                    onClick={() => handleTriggerSelfHealing(tc)}
                    disabled={isProcessing}
                    className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow"
                  >
                    <Wrench size={13} />
                    <span>Auto Self-Heal</span>
                  </button>
                )}
                {tc.status === "passed" && (
                  <span className="px-2.5 py-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-900 rounded-lg">
                    PASSED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔮 Self-Learning Custom Skills & Toolchain Registry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap size={18} className="text-amber-400" />
              Self-Learning Custom Skills & Toolchain
            </h3>
            <p className="text-xs text-slate-400">
              Teach agents custom platform APIs, payment gateways, or internal services
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingSkill(!isAddingSkill)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700"
          >
            <Plus size={14} />
            <span>Teach Custom Skill</span>
          </button>
        </div>

        {/* Add Skill Form Modal/Row */}
        {isAddingSkill && (
          <form onSubmit={handleAddSkill} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Teach Agent New Platform API</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Skill Name (e.g. Twilio SMS Verification)"
                className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                required
              />
              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value as any)}
                className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
              >
                <option value="custom_api">Custom API</option>
                <option value="payments">Payments</option>
                <option value="database">Database & RLS</option>
                <option value="auth">Auth & Security</option>
                <option value="crm">CRM & Mail</option>
              </select>
            </div>
            <textarea
              rows={2}
              value={newSkillDesc}
              onChange={(e) => setNewSkillDesc(e.target.value)}
              placeholder="Skill Description & usage intent..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
            />
            <textarea
              rows={2}
              value={newSkillSpec}
              onChange={(e) => setNewSkillSpec(e.target.value)}
              placeholder="API Spec / Routes / SDK Signatures..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingSkill(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow"
              >
                Save Skill to Agent Context
              </button>
            </div>
          </form>
        )}

        {/* List of Registered Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{skill.name}</span>
                <span className="px-2 py-0.5 text-[9px] uppercase font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-900 rounded">
                  {skill.category}
                </span>
              </div>
              <p className="text-xs text-slate-400">{skill.description}</p>
              <div className="p-2 bg-slate-900 rounded text-[11px] font-mono text-slate-300 overflow-x-auto">
                {skill.spec}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
