import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Search,
  Globe,
  Compass,
  Zap,
  CheckCircle2,
  Cpu,
  BarChart2,
  RefreshCw,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { MetacognitiveReflection } from "../types";

interface MetacognitiveInferenceHubProps {
  data: MetacognitiveReflection;
  onRefreshReflection: () => void;
  onSelectPromptSuggestion: (prompt: string) => void;
}

export const MetacognitiveInferenceHub: React.FC<MetacognitiveInferenceHubProps> = ({
  data,
  onRefreshReflection,
  onSelectPromptSuggestion
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"metacognition" | "web_synthesis" | "yield_ideas">("metacognition");

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 text-slate-100 shadow-xl backdrop-blur-xl">
      
      {/* Header with Metacognitive Score */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
            <Brain size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>Metacognitive Inference Engine</span>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded-full border border-purple-800">
                AI Cognitive Self-Reflection
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Inferring user thought patterns & gathering global web intelligence
            </p>
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[9px] text-slate-400 font-mono">User Alignment</div>
            <div className="text-sm font-black text-emerald-400 font-mono">
              {data.confidenceScore}% Score
            </div>
          </div>

          <button
            type="button"
            onClick={onRefreshReflection}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Re-run Metacognitive Reflection"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2 text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveSubTab("metacognition")}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
            activeSubTab === "metacognition"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Brain size={14} />
          <span>Internal Thought Stream</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("web_synthesis")}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
            activeSubTab === "web_synthesis"
              ? "bg-purple-600 text-white shadow-md"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Globe size={14} />
          <span>Global Public Web Synthesis</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("yield_ideas")}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
            activeSubTab === "yield_ideas"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Lightbulb size={14} />
          <span>High-Yield Ideation</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeSubTab === "metacognition" && (
        <div className="space-y-3">
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-indigo-900/40 space-y-2">
            <div className="text-[10px] font-bold font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={12} />
              <span>Metacognitive Reflection Stream</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans italic">
              "{data.thoughtProcess}"
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[10px] font-bold font-mono text-emerald-400 uppercase tracking-wider">
              Ideological & Pattern Alignment:
            </div>
            <p className="text-xs text-slate-300 font-sans">{data.userIntentAlignment}</p>
          </div>
        </div>
      )}

      {activeSubTab === "web_synthesis" && (
        <div className="space-y-2.5">
          <p className="text-xs text-slate-400 font-sans">
            Gathered intelligence from public repositories, technical documentations, and design benchmarks across the web:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {data.webInferenceInsights.map((insight, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-start gap-2 text-xs text-slate-300 hover:border-purple-500/40 transition-colors"
              >
                <Globe size={15} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === "yield_ideas" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 font-sans">
            Curated high-yielding architectural ideas tailored to expand your product's potential:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Local-First Multi-User Sync",
                desc: "Combine offline indexedDB with WebSockets to offer instant offline editing and real-time live collaboration.",
                prompt: "Build a local-first multi-user synchronization layer with offline support and live state conflicts resolution."
              },
              {
                title: "Voice-To-Code AST Refactoring",
                desc: "Speak complex refactoring rules to let AI parse abstract syntax trees and perform non-breaking code transformations.",
                prompt: "Implement a Voice-to-Code AST refactoring module that generates non-breaking patches."
              },
              {
                title: "Enterprise Multi-LLM Consensus",
                desc: "Route queries through GPT-4o, Claude 3.5, and Gemini simultaneously for error checking and consensus voting.",
                prompt: "Create an Enterprise Multi-LLM consensus engine that validates code using Gemini and OpenAI simultaneously."
              },
              {
                title: "Hardware & IoT Sensor Telemetry",
                desc: "Connect Bluetooth LE peripherals and display live sensor telemetry streaming inside an Apple-style dashboard.",
                prompt: "Build an IoT Web Bluetooth dashboard streaming live sensor data into animated canvas gauges."
              }
            ].map((idea, i) => (
              <div
                key={i}
                className="p-3.5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-2 hover:border-emerald-500/50 transition-all group"
              >
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {idea.title}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{idea.desc}</p>
                <button
                  type="button"
                  onClick={() => onSelectPromptSuggestion(idea.prompt)}
                  className="w-full py-1.5 bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-xl text-[11px] font-bold transition-all border border-slate-800 hover:border-emerald-500 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Use This High-Yield Idea</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
