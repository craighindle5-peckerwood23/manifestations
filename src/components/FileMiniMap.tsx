import React from "react";
import { FileSnippet } from "../types";
import { Code2, Layers, MapPin, Hash, Sparkles } from "lucide-react";

interface FileMiniMapProps {
  code: string;
  language: string;
  onSelectLine?: (lineIndex: number) => void;
}

export const FileMiniMap: React.FC<FileMiniMapProps> = ({
  code,
  language,
  onSelectLine
}) => {
  const lines = code.split("\n");

  // Extract key symbols for map outline
  const symbols = lines.map((lineText, idx) => {
    const trimmed = lineText.trim();
    let type: "function" | "import" | "component" | "style" | "default" = "default";

    if (trimmed.startsWith("import") || trimmed.startsWith("from") || trimmed.startsWith("#import")) {
      type = "import";
    } else if (
      trimmed.includes("function") ||
      trimmed.includes("def ") ||
      trimmed.includes("const ") ||
      trimmed.includes("=>")
    ) {
      type = "function";
    } else if (trimmed.startsWith("<") || trimmed.includes("</")) {
      type = "component";
    } else if (trimmed.includes("class ") || trimmed.includes("style")) {
      type = "style";
    }

    return {
      index: idx,
      text: lineText,
      trimmed,
      length: lineText.length,
      type
    };
  });

  const totalLines = lines.length;
  const functionCount = symbols.filter((s) => s.type === "function").length;
  const importCount = symbols.filter((s) => s.type === "import").length;

  return (
    <div className="w-36 bg-slate-950 border-l border-slate-800/80 flex flex-col justify-between select-none h-full overflow-hidden text-[9px] font-mono">
      {/* MiniMap Top Header */}
      <div className="p-2 border-b border-slate-900 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-400">
          <MapPin size={11} />
          <span>MiniMap</span>
        </div>
        <span className="text-[9px] text-slate-500 font-mono">{totalLines} L</span>
      </div>

      {/* MiniMap Symbol Stats pill */}
      <div className="px-2 py-1 bg-slate-900/30 border-b border-slate-900 flex items-center justify-around text-[8px] text-slate-400">
        <span title="Functions/Methods">⚡ {functionCount} fn</span>
        <span title="Imports">📦 {importCount} imp</span>
      </div>

      {/* Scaled Line Canvas Stream */}
      <div className="flex-1 overflow-y-auto p-1.5 space-y-[2px] scrollbar-thin">
        {symbols.map((s) => {
          // Color coding by symbol type
          let colorClass = "bg-slate-700/40";
          if (s.type === "import") colorClass = "bg-purple-400/80";
          if (s.type === "function") colorClass = "bg-emerald-400/90";
          if (s.type === "component") colorClass = "bg-cyan-400/80";
          if (s.type === "style") colorClass = "bg-amber-400/80";

          // Calculate line width fill percentage (max 100 char basis)
          const fillWidthPercent = Math.min(100, Math.max(8, (s.length / 80) * 100));

          return (
            <div
              key={s.index}
              onClick={() => onSelectLine && onSelectLine(s.index)}
              title={`Line ${s.index + 1}: ${s.trimmed.slice(0, 40)}`}
              className="group flex items-center gap-1 cursor-pointer hover:bg-indigo-500/20 px-0.5 py-[1px] rounded transition-colors"
            >
              <span className="text-[7px] text-slate-600 w-4 text-right group-hover:text-indigo-300">
                {s.index + 1}
              </span>
              <div
                className={`h-[2px] rounded-full transition-all ${colorClass} group-hover:bg-indigo-400`}
                style={{ width: `${fillWidthPercent}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* MiniMap Footer indicator */}
      <div className="p-1.5 bg-slate-900/80 border-t border-slate-900 text-[8px] text-slate-500 text-center font-mono flex items-center justify-center gap-1">
        <Sparkles size={9} className="text-indigo-400 animate-pulse" />
        <span>Live AST Synced</span>
      </div>
    </div>
  );
};
