import React, { useState } from "react";
import {
  Maximize2,
  Minimize2,
  X,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
  Zap,
  CheckCircle2,
  Compass,
  Cpu,
  Layers,
  ExternalLink
} from "lucide-react";
import { FileSnippet, ExecutionResult, MetacognitiveReflection } from "../types";

interface LivePiPPreviewProps {
  activeFile: FileSnippet;
  execResult: ExecutionResult | null;
  onRunScript: () => void;
  metacognitiveData: MetacognitiveReflection;
  onApplyRoadmapStep: (stepTitle: string) => void;
  onOpenFullPreview: () => void;
}

export const LivePiPPreview: React.FC<LivePiPPreviewProps> = ({
  activeFile,
  execResult,
  onRunScript,
  metacognitiveData,
  onApplyRoadmapStep,
  onOpenFullPreview
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [position, setPosition] = useState<"bottom-right" | "top-right" | "split">("bottom-right");
  const [activeTab, setActiveTab] = useState<"preview" | "next_roadmap">("preview");

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl flex items-center gap-2.5 font-bold text-xs hover:scale-105 transition-all border border-white/20 animate-bounce cursor-pointer"
      >
        <Eye size={16} />
        <span>Live Demo PiP ({activeFile.name})</span>
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>
    );
  }

  // Position styles
  let containerPositionClass = "fixed bottom-6 right-6 z-40 w-96 h-[460px]";
  if (position === "top-right") {
    containerPositionClass = "fixed top-20 right-6 z-40 w-96 h-[460px]";
  } else if (position === "split") {
    containerPositionClass = "fixed top-16 right-0 bottom-0 z-40 w-[450px] border-l border-slate-800";
  }

  return (
    <div
      className={`${containerPositionClass} bg-slate-950/95 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 transition-all duration-300`}
    >
      {/* Top Header Controls Bar */}
      <div className="p-3 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Eye size={14} />
          </div>
          <div>
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <span>Picture-in-Picture Demo</span>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-900">
                LIVE
              </span>
            </div>
            <p className="text-[9px] text-slate-400 font-mono truncate max-w-[180px]">
              {activeFile.name}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
              activeTab === "preview"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("next_roadmap")}
            className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
              activeTab === "next_roadmap"
                ? "bg-purple-600 text-white"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Compass size={11} className="text-amber-300" />
            <span>What's Next ({metacognitiveData.suggestedRoadmap.length})</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setPosition((p) =>
                p === "bottom-right" ? "top-right" : p === "top-right" ? "split" : "bottom-right"
              )
            }
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 text-[10px]"
            title="Cycle Docking Position"
          >
            <Maximize2 size={13} />
          </button>

          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            title="Minimize to Floating Button"
          >
            <Minimize2 size={13} />
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-hidden flex flex-col bg-slate-950">
        {activeTab === "preview" ? (
          <div className="flex-1 flex flex-col">
            {/* Live Render Area */}
            {activeFile.language === "html" ? (
              <iframe
                title="PiP Live Render"
                srcDoc={activeFile.code}
                className="w-full flex-1 bg-white border-0"
                sandbox="allow-scripts allow-modals allow-forms"
              />
            ) : (
              <div className="flex-1 p-3 bg-slate-950 font-mono text-[11px] overflow-y-auto space-y-2">
                <div className="text-[10px] text-slate-500 uppercase font-bold flex items-center justify-between border-b border-slate-900 pb-1">
                  <span>Console & Sandbox Output</span>
                  <button
                    type="button"
                    onClick={onRunScript}
                    className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-bold rounded flex items-center gap-1 cursor-pointer"
                  >
                    <Play size={10} />
                    <span>Run</span>
                  </button>
                </div>

                {execResult ? (
                  <div className="space-y-1.5">
                    {execResult.stdout && (
                      <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 border border-slate-800">
                        <pre className="whitespace-pre-wrap">{execResult.stdout}</pre>
                      </div>
                    )}
                    {execResult.stderr && (
                      <div className="p-2 bg-red-950/40 rounded-lg text-red-300 border border-red-900/50">
                        <pre className="whitespace-pre-wrap">{execResult.stderr}</pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-center text-slate-600 space-y-1">
                    <p>Click "Run" to execute this code snippet.</p>
                  </div>
                )}
              </div>
            )}

            {/* PiP Toolbar Footer */}
            <div className="p-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2 text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Auto-Refreshed</span>
              </div>
              <button
                type="button"
                onClick={onOpenFullPreview}
                className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Full Workspace</span>
                <ExternalLink size={11} />
              </button>
            </div>
          </div>
        ) : (
          /* What's Next Metacognitive Roadmap View */
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin">
            <div className="p-3 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 border border-indigo-800/50 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-indigo-300 font-bold text-xs">
                <Sparkles size={14} className="text-amber-400" />
                <span>Inferred Intent & Next Iterations</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Based on your vision and global public code domain synthesis:
              </p>
            </div>

            <div className="space-y-2.5">
              {metacognitiveData.suggestedRoadmap.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2 hover:border-indigo-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-900">
                      STEP 0{step.stepNumber}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {step.highYieldImpact}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {step.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => onApplyRoadmapStep(step.title)}
                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <span>Build This Next</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
