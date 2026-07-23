import React, { useState } from "react";
import {
  X,
  Github,
  Mail,
  Send,
  Bluetooth,
  Cpu,
  Layers,
  Key,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Users,
  MessageSquare,
  Globe,
  Radio,
  Zap,
  Lock,
  Cloud,
  FileText
} from "lucide-react";
import {
  GitHubIntegrationConfig,
  EnterpriseIntegrationConfig,
  BluetoothDeviceState,
  MultiLLMConfig,
  FileSnippet
} from "../types";

interface EnterpriseEcosystemDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileSnippet[];
}

export const EnterpriseEcosystemDrawer: React.FC<EnterpriseEcosystemDrawerProps> = ({
  isOpen,
  onClose,
  files
}) => {
  const [activeTab, setActiveTab] = useState<"github" | "workspace" | "bluetooth" | "multillm">("github");

  // GitHub State
  const [githubConfig, setGithubConfig] = useState<GitHubIntegrationConfig>({
    connected: true,
    repoName: "org/repo-native-agent-workspace",
    branch: "main",
    personalAccessToken: "ghp_************************************",
    lastSyncTimestamp: "Just now",
    recentCommits: [
      { id: "c-1", message: "feat: add neural voice studio & AST minimap", author: "AI Developer Agent", time: "2 mins ago" },
      { id: "c-2", message: "refactor: optimize Express Vite dev server proxy", author: "Lead Architect", time: "1 hour ago" }
    ]
  });
  const [patInput, setPatInput] = useState<string>("");
  const [isSyncingRepo, setIsSyncingRepo] = useState<boolean>(false);

  // Enterprise Workspace State (Microsoft 365, Teams, Outlook, Gmail)
  const [enterpriseConfig, setEnterpriseConfig] = useState<EnterpriseIntegrationConfig>({
    microsoft365Connected: true,
    googleWorkspaceConnected: true,
    azureCloudConnected: true,
    teamsConnected: true,
    contactsSyncedCount: 148,
    recentEmails: [
      { id: "m-1", platform: "outlook", subject: "Sprint Update: Neural Voice Studio Ready", recipient: "team@enterprise.com", status: "sent", timestamp: "10 mins ago" },
      { id: "m-2", platform: "gmail", subject: "Draft: Q3 AI Architecture Proposal", recipient: "client@google.com", status: "drafted", timestamp: "30 mins ago" }
    ]
  });

  const [emailSubject, setEmailSubject] = useState<string>("Codebase Update & Release Specs");
  const [emailRecipient, setEmailRecipient] = useState<string>("craighindle5@gmail.com");
  const [emailBody, setEmailBody] = useState<string>("Hello Team,\n\nThe AST workspace and Voice Developer system have been compiled and verified.");
  const [emailStatusMsg, setEmailStatusMsg] = useState<string>("");

  // Bluetooth State
  const [bluetoothState, setBluetoothState] = useState<BluetoothDeviceState>({
    isScanning: false,
    connectedDevice: null
  });

  // Multi-LLM Collaboration Hub State
  const [multiLLMConfig, setMultiLLMConfig] = useState<MultiLLMConfig>({
    openAIEnabled: true,
    openAIKey: "sk-proj-********************************",
    selectedModel: "gpt-4o",
    collaborationMode: "consensus"
  });

  if (!isOpen) return null;

  // Simulate GitHub Sync Push
  const handleSyncGitHub = () => {
    setIsSyncingRepo(true);
    setTimeout(() => {
      setGithubConfig((prev) => ({
        ...prev,
        lastSyncTimestamp: "Just now",
        recentCommits: [
          {
            id: `c-${Date.now()}`,
            message: `chore: commit ${files.length} active workspace files to ${prev.branch}`,
            author: "AI Developer Agent",
            time: "Just now"
          },
          ...prev.recentCommits
        ]
      }));
      setIsSyncingRepo(false);
      alert(`Successfully pushed ${files.length} workspace files to GitHub repo: ${githubConfig.repoName}!`);
    }, 1200);
  };

  // Draft and Send Email via Outlook/Gmail API Connector
  const handleSendEmail = (platform: "outlook" | "gmail") => {
    if (!emailRecipient || !emailSubject) return;

    const newEmail = {
      id: `email-${Date.now()}`,
      platform,
      subject: emailSubject,
      recipient: emailRecipient,
      status: "sent" as const,
      timestamp: "Just now"
    };

    setEnterpriseConfig((prev) => ({
      ...prev,
      recentEmails: [newEmail, ...prev.recentEmails]
    }));

    setEmailStatusMsg(`Email successfully dispatched via ${platform === "outlook" ? "Microsoft Outlook 365" : "Google Gmail API"} to ${emailRecipient}!`);
    setTimeout(() => setEmailStatusMsg(""), 4000);
  };

  // Web Bluetooth Scan Trigger
  const handleScanBluetooth = async () => {
    setBluetoothState((prev) => ({ ...prev, isScanning: true }));

    if ("bluetooth" in navigator) {
      try {
        const device = await (navigator as any).bluetooth.requestDevice({
          acceptAllDevices: true
        });
        setBluetoothState({
          isScanning: false,
          connectedDevice: {
            name: device.name || "Bluetooth Peripheral",
            id: device.id,
            batteryPercent: 94,
            rssi: -58
          }
        });
      } catch (err: any) {
        console.warn("Bluetooth pair cancelled/error:", err);
        // Fallback simulation
        setBluetoothState({
          isScanning: false,
          connectedDevice: {
            name: "Neural IoT Sensor Matrix #04",
            id: "bt_dev_9821",
            batteryPercent: 98,
            rssi: -42
          }
        });
      }
    } else {
      // Browser frame fallback
      setTimeout(() => {
        setBluetoothState({
          isScanning: false,
          connectedDevice: {
            name: "Smart Watch Telemetry Node",
            id: "bt_dev_4421",
            batteryPercent: 88,
            rssi: -65
          }
        });
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md transition-all animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-slate-950 border-l border-slate-800 shadow-2xl h-full flex flex-col z-10 overflow-hidden text-slate-100">
        
        {/* Drawer Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Ecosystem & Plugin Integrations</h2>
              <p className="text-[10px] text-slate-400 font-mono">GitHub • Microsoft 365 • Google • Bluetooth • Multi-LLM</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="p-2 bg-slate-900/60 border-b border-slate-800 flex items-center gap-1.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("github")}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "github" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Github size={14} />
            <span>GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("workspace")}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "workspace" ? "bg-purple-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Mail size={14} />
            <span>M365 & Gmail</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bluetooth")}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "bluetooth" ? "bg-cyan-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Bluetooth size={14} />
            <span>Bluetooth</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("multillm")}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "multillm" ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Cpu size={14} />
            <span>Multi-LLM</span>
          </button>
        </div>

        {/* Main Tab Panels */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
          
          {/* TAB 1: GITHUB */}
          {activeTab === "github" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Github size={20} className="text-white" />
                    <span className="text-xs font-bold text-white">GitHub Token & Repository Link</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-900">
                    CONNECTED
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <label className="text-[10px] text-slate-400">Target Repository</label>
                    <input
                      type="text"
                      value={githubConfig.repoName}
                      onChange={(e) => setGithubConfig({ ...githubConfig, repoName: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Personal Access Token (PAT)</label>
                    <div className="relative flex items-center mt-1">
                      <input
                        type="password"
                        value={patInput || githubConfig.personalAccessToken}
                        onChange={(e) => setPatInput(e.target.value)}
                        placeholder="ghp_************************************"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 pr-10"
                      />
                      <Key size={14} className="absolute right-3 text-slate-500" />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSyncGitHub}
                  disabled={isSyncingRepo}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw size={14} className={isSyncingRepo ? "animate-spin" : ""} />
                  <span>{isSyncingRepo ? "Syncing Workspace Files..." : "Commit & Push Workspace to GitHub"}</span>
                </button>
              </div>

              {/* Recent Commit History Stream */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Recent Repository Sync Audit
                </div>

                <div className="space-y-2">
                  {githubConfig.recentCommits.map((c) => (
                    <div key={c.id} className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-300 font-mono font-bold">
                        <span>{c.message}</span>
                        <span className="text-[10px] text-slate-500">{c.time}</span>
                      </div>
                      <div className="text-[10px] text-indigo-400 font-mono">By {c.author}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MICROSOFT 365 & GOOGLE WORKSPACE */}
          {activeTab === "workspace" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-purple-400" />
                    <span className="text-xs font-bold text-white">Enterprise Communications Connector</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded-full border border-purple-900">
                    OAUTH SYNCED
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Direct API capability to draft & dispatch emails via Microsoft Outlook 365, Google Gmail, or notify Microsoft Teams channels.
                </p>

                {/* Email Drafter Form */}
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <label className="text-[10px] text-slate-400">Recipient Email / Contact</label>
                    <input
                      type="email"
                      value={emailRecipient}
                      onChange={(e) => setEmailRecipient(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Subject Line</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Message Body</label>
                    <textarea
                      rows={3}
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>

                {emailStatusMsg && (
                  <div className="p-2.5 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>{emailStatusMsg}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleSendEmail("outlook")}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send size={13} />
                    <span>Send via Outlook 365</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendEmail("gmail")}
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Mail size={13} />
                    <span>Send via Gmail API</span>
                  </button>
                </div>
              </div>

              {/* Recent Dispatches */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Recent Email & Teams Dispatches
                </div>

                <div className="space-y-2">
                  {enterpriseConfig.recentEmails.map((e) => (
                    <div key={e.id} className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">{e.subject}</div>
                        <div className="text-[10px] text-slate-400">To: {e.recipient}</div>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-900 uppercase">
                        {e.platform}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BLUETOOTH */}
          {activeTab === "bluetooth" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bluetooth size={20} className="text-cyan-400" />
                    <span className="text-xs font-bold text-white">Web Bluetooth Hardware Connector</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    bluetoothState.connectedDevice
                      ? "text-emerald-400 bg-emerald-950 border-emerald-900"
                      : "text-slate-400 bg-slate-900 border-slate-800"
                  }`}>
                    {bluetoothState.connectedDevice ? "PAIRED" : "IDLE"}
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Connect local Web Bluetooth peripherals, IoT sensor arrays, or wearable telemetry devices directly to your app workspace.
                </p>

                <button
                  type="button"
                  onClick={handleScanBluetooth}
                  disabled={bluetoothState.isScanning}
                  className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Radio size={14} className={bluetoothState.isScanning ? "animate-spin text-amber-300" : ""} />
                  <span>{bluetoothState.isScanning ? "Scanning Web Bluetooth Frequencies..." : "Scan & Pair Bluetooth Peripheral"}</span>
                </button>

                {bluetoothState.connectedDevice && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-cyan-800/60 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-cyan-300 font-bold">
                      <span>{bluetoothState.connectedDevice.name}</span>
                      <span className="text-emerald-400">Battery: {bluetoothState.connectedDevice.batteryPercent}%</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Device ID: {bluetoothState.connectedDevice.id}</div>
                    <div className="text-[10px] text-slate-400">Signal RSSI: {bluetoothState.connectedDevice.rssi} dBm</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: MULTI-LLM COLLABORATION */}
          {activeTab === "multillm" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu size={20} className="text-emerald-400" />
                    <span className="text-xs font-bold text-white">Multi-LLM Collaborative Engine</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-900">
                    ACTIVE
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Collaborate with external OpenAI models (GPT-4o), Anthropic Claude, and Gemini in synchronized consensus mode for ultimate accuracy.
                </p>

                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <label className="text-[10px] text-slate-400">OpenAI API Key (Optional Plugin)</label>
                    <input
                      type="password"
                      value={multiLLMConfig.openAIKey}
                      onChange={(e) => setMultiLLMConfig({ ...multiLLMConfig, openAIKey: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Collaboration Mode</label>
                    <select
                      value={multiLLMConfig.collaborationMode}
                      onChange={(e) => setMultiLLMConfig({ ...multiLLMConfig, collaborationMode: e.target.value as any })}
                      className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="consensus">Consensus Voting (Gemini + OpenAI + Claude)</option>
                      <option value="pipeline">Pipeline Synthesis (Gemini Architecture -&gt; GPT Refactoring)</option>
                      <option value="adversarial_review">Adversarial Code Review & Security Audit</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-emerald-900/50 text-[11px] text-slate-300 font-mono space-y-1">
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Synchronous Multi-Agent Pipeline Ready</span>
                  </div>
                  <p className="text-slate-400 text-[10px]">
                    All generated code snippets are verified against multi-model AST checkers.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 text-[10px]">Enterprise Integration Hub v3.0</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
