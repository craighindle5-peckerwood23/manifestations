import React, { useState } from "react";
import {
  X,
  History,
  Terminal,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Layers,
  RotateCcw,
  Sparkles,
  Server,
  Activity,
  ShieldCheck,
  FileCode,
  Download,
  Filter,
  ChevronRight,
  ExternalLink,
  Code
} from "lucide-react";
import { BuildLogEntry, FileSnippet } from "../types";

interface BuildHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  buildLogs: BuildLogEntry[];
  onClearLogs: () => void;
  onRestoreSnapshot?: (logId: string) => void;
  activeFile: FileSnippet;
  files: FileSnippet[];
}

export const BuildHistoryDrawer: React.FC<BuildHistoryDrawerProps> = ({
  isOpen,
  onClose,
  buildLogs,
  onClearLogs,
  onRestoreSnapshot,
  activeFile,
  files
}) => {
  const [filter, setFilter] = useState<"all" | "success" | "error">("all");
  const [selectedLog, setSelectedLog] = useState<BuildLogEntry | null>(null);

  if (!isOpen) return null;

  const filteredLogs = buildLogs.filter((log) => {
    if (filter === "success") return log.status === "success";
    if (filter === "error") return log.status === "error";
    return true;
  });

  const successCount = buildLogs.filter((l) => l.status === "success").length;
  const errorCount = buildLogs.filter((l) => l.status === "error").length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200">
      
      {/* Backdrop overlay click handler */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer Body */}
      <div className="relative w-full max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl h-full flex flex-col z-10 overflow-hidden text-slate-100">
        
        {/* Drawer Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <History size={18} />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Build History & System Status</h2>
              <p className="text-[10px] text-slate-400 font-mono">Live Sandbox Diagnostics & Audit Stream</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* System Health Diagnostics Card */}
        <div className="p-4 bg-slate-900/40 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Activity size={14} className="text-emerald-400 animate-pulse" />
              <span>System Health Matrix</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-900/60">
              ALL SYSTEMS ONLINE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2">
              <Server size={14} className="text-indigo-400" />
              <div>
                <div className="text-[9px] text-slate-500">Dev Server</div>
                <div className="text-white font-semibold">Port 3000 (0.0.0.0)</div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2">
              <Cpu size={14} className="text-purple-400" />
              <div>
                <div className="text-[9px] text-slate-500">AI Intelligence</div>
                <div className="text-white font-semibold">Gemini 3.6 Flash</div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2">
              <Layers size={14} className="text-amber-400" />
              <div>
                <div className="text-[9px] text-slate-500">AST Indexer</div>
                <div className="text-white font-semibold">{files.length} Snippets Synced</div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400" />
              <div>
                <div className="text-[9px] text-slate-500">Privacy Mode</div>
                <div className="text-white font-semibold">Local-First Sandbox</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                filter === "all" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              All ({buildLogs.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("success")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                filter === "success" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Passed ({successCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("error")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                filter === "error" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Errors ({errorCount})
            </button>
          </div>

          <button
            type="button"
            onClick={onClearLogs}
            className="text-[10px] text-slate-500 hover:text-red-400 transition-colors"
          >
            Clear History
          </button>
        </div>

        {/* Build Logs Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs font-mono space-y-2">
              <Terminal size={24} className="mx-auto text-slate-700" />
              <p>No build logs recorded yet.</p>
              <p className="text-[10px] text-slate-600">Run code scripts or speak voice commands to trigger builds.</p>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isSelected = selectedLog?.id === log.id;

              return (
                <div
                  key={log.id}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    log.status === "success"
                      ? "bg-slate-900/80 border-slate-800 hover:border-emerald-500/40"
                      : "bg-red-950/20 border-red-900/40 hover:border-red-500/50"
                  } ${isSelected ? "ring-1 ring-indigo-500" : ""}`}
                  onClick={() => setSelectedLog(isSelected ? null : log)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {log.status === "success" ? (
                        <CheckCircle2 size={15} className="text-emerald-400" />
                      ) : (
                        <XCircle size={15} className="text-red-400" />
                      )}
                      <span className="text-xs font-bold font-mono text-white">{log.trigger}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {log.durationMs}ms
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FileCode size={10} />
                      {log.filesModified} files
                    </span>
                    {log.agentRole && (
                      <>
                        <span>•</span>
                        <span className="text-indigo-400 uppercase font-bold">{log.agentRole}</span>
                      </>
                    )}
                  </div>

                  {/* Expand stdout / stderr snippet */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 text-[11px] font-mono">
                      {log.stdout && (
                        <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 text-emerald-300 overflow-x-auto max-h-32">
                          <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">STDOUT:</div>
                          <pre className="whitespace-pre-wrap">{log.stdout}</pre>
                        </div>
                      )}
                      {log.stderr && (
                        <div className="p-2.5 bg-slate-950 rounded-xl border border-red-900/50 text-red-300 overflow-x-auto max-h-32">
                          <div className="text-[9px] text-red-400 font-bold uppercase mb-1">STDERR:</div>
                          <pre className="whitespace-pre-wrap">{log.stderr}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="text-slate-400 text-[10px]">
            <span>Build Audit Log v2.4</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
