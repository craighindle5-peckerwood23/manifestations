import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Code,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  Radio,
  Activity,
  Send,
  Trash2,
  Copy,
  Play
} from "lucide-react";
import { FileSnippet, Message } from "../types";

interface HeroVoiceStudioProps {
  files: FileSnippet[];
  activeFile: FileSnippet;
  messages: Message[];
  isThinking: boolean;
  chatInput: string;
  onChatInputChange: (val: string) => void;
  onSendChatMessage: (text?: string) => void;
  onClearChat?: () => void;
  renderMessageContent?: (content: string) => React.ReactNode;
  onNavigateToTab: (tab: "chat" | "editor" | "files" | "orchestrator" | "hero") => void;
}

export const HeroVoiceStudio: React.FC<HeroVoiceStudioProps> = ({
  files,
  activeFile,
  messages,
  isThinking,
  chatInput,
  onChatInputChange,
  onSendChatMessage,
  onClearChat,
  renderMessageContent,
  onNavigateToTab
}) => {
  // Voice & AI State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  const [voiceMuted, setVoiceMuted] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Canvas visualizer & chat scroll refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat pane to bottom when messages update
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Initialize Web Speech Recognition & Synthesis Voices
  useEffect(() => {
    // Populate available TTS voices
    if ("speechSynthesis" in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
          voices.find(
            (v) =>
              (v.lang.startsWith("en") && v.name.includes("Natural")) ||
              v.name.includes("Google") ||
              v.name.includes("Samantha") ||
              v.name.includes("Daniel")
          ) || voices[0];
        setSelectedVoice(preferredVoice || null);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    // Initialize Web Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        onChatInputChange(currentTranscript);
      };

      recognition.onerror = (err: any) => {
        console.warn("Speech recognition error:", err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Neural Orb Hypnotic Visualizer Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let step = 0;

    const renderCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      step += isSpeaking ? 0.08 : isListening ? 0.05 : 0.02;

      // Draw background ambient ethereal glow rings
      const baseRadius = Math.min(width, height) * 0.28;
      const pulseMultiplier = isSpeaking
        ? 1 + Math.sin(step * 4) * 0.12
        : isListening
        ? 1 + Math.sin(step * 6) * 0.08
        : 1 + Math.sin(step * 2) * 0.03;

      const currentRadius = baseRadius * pulseMultiplier;

      // Outer Aura Gradient
      const auraGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        currentRadius * 0.2,
        centerX,
        centerY,
        currentRadius * 2.2
      );

      if (isSpeaking) {
        auraGradient.addColorStop(0, "rgba(99, 102, 241, 0.8)"); // Indigo
        auraGradient.addColorStop(0.5, "rgba(168, 85, 247, 0.4)"); // Purple
        auraGradient.addColorStop(1, "rgba(15, 23, 42, 0)");
      } else if (isListening) {
        auraGradient.addColorStop(0, "rgba(16, 185, 129, 0.85)"); // Emerald
        auraGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.45)"); // Cyan-Blue
        auraGradient.addColorStop(1, "rgba(15, 23, 42, 0)");
      } else {
        auraGradient.addColorStop(0, "rgba(99, 102, 241, 0.4)"); // Soft Indigo
        auraGradient.addColorStop(0.6, "rgba(139, 92, 246, 0.15)");
        auraGradient.addColorStop(1, "rgba(15, 23, 42, 0)");
      }

      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Fluid Dynamic Particles & Sinusoidal Nodes
      const nodeCount = 36;
      ctx.save();
      ctx.translate(centerX, centerY);

      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        const layerRadius = currentRadius * (0.7 + layer * 0.25);
        const color =
          layer === 0
            ? "rgba(255, 255, 255, 0.9)"
            : layer === 1
            ? "rgba(129, 140, 248, 0.7)"
            : "rgba(192, 132, 252, 0.5)";

        ctx.strokeStyle = color;
        ctx.lineWidth = 2 + layer;

        for (let i = 0; i <= nodeCount; i++) {
          const angle = (i / nodeCount) * Math.PI * 2;
          const offset =
            Math.sin(angle * 5 + step * (layer + 1) * 2) *
            (isSpeaking ? 18 : isListening ? 12 : 6);

          const r = layerRadius + offset;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Inner Core Glow Orb
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius * 0.5);
      coreGrad.addColorStop(0, "#ffffff");
      coreGrad.addColorStop(0.6, isSpeaking ? "#818cf8" : isListening ? "#34d399" : "#a7f3d0");
      coreGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, currentRadius * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(renderCanvas);
    };

    renderCanvas();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isListening, isSpeaking]);

  // Toggle Microphone
  const handleToggleMic = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      if (transcript.trim()) {
        onSendChatMessage(transcript);
        setTranscript("");
      }
    } else {
      setTranscript("");
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.warn("Recognition start error:", e);
        }
      } else {
        // Fallback prompt if SpeechRecognition is unsupported in container
        const simulatedText = prompt(
          "Enter your voice command or request below:",
          "Explain codebase structure and build a new feature"
        );
        if (simulatedText) {
          onSendChatMessage(simulatedText);
        }
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isThinking) return;
    onSendChatMessage();
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* 🍏 Top Apple-style Minimal Glass Navigation Header */}
      <header className="sticky top-0 z-20 backdrop-blur-2xl bg-slate-950/70 border-b border-slate-800/60 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Sparkles size={14} className="text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-tight">GearShift OS Studio</h1>
            <p className="text-[10px] text-slate-400 font-medium">Apple-Inspired Neural Intelligence & Chat</p>
          </div>
        </div>

        {/* Quick Tabs & Audio Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setVoiceMuted(!voiceMuted)}
            className={`p-2 rounded-xl text-xs transition-all border ${
              voiceMuted
                ? "bg-red-950/40 text-red-400 border-red-900/50"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
            }`}
            title={voiceMuted ? "Unmute Speech Feedback" : "Mute Speech Feedback"}
          >
            {voiceMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            type="button"
            onClick={() => onNavigateToTab("editor")}
            className="px-4 py-1.5 bg-white text-slate-950 hover:bg-slate-100 rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-1.5"
          >
            <span>Open Playground</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </header>

      {/* 🍏 Hero Showcase Section with Captivating Floating Futuristic Neural Orb */}
      <section className="relative pt-8 pb-4 px-6 text-center overflow-hidden flex flex-col items-center">
        
        {/* Hypnotic Background Glow Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-indigo-300 font-semibold shadow-inner">
            <Radio size={12} className="text-emerald-400 animate-pulse" />
            <span>AI Studio Voice & Chat • Gemini 3.6 Engine</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Code at the speed of <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">thought and voice.</span>
          </h2>

          <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto font-normal leading-relaxed">
            Speak naturally or type your instructions below to refactor code, run scripts, generate specs, and self-heal errors.
          </p>

          {/* 🍏 Floating Futuristic Neural Visualizer Orb */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-pointer transition-transform hover:scale-105"
                onClick={handleToggleMic}
              />
            </div>

            {/* Central Tap-to-Speak Control Orb */}
            <button
              type="button"
              onClick={handleToggleMic}
              className={`absolute p-5 rounded-full shadow-2xl transition-all border-2 backdrop-blur-xl ${
                isListening
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-400 scale-110 shadow-emerald-500/30"
                  : isSpeaking
                  ? "bg-indigo-500/20 text-indigo-300 border-indigo-400 scale-105 shadow-indigo-500/30"
                  : "bg-slate-950/80 text-white border-slate-700 hover:border-indigo-400 hover:scale-105"
              }`}
            >
              {isListening ? (
                <MicOff size={26} className="animate-pulse text-emerald-400" />
              ) : (
                <Mic size={26} className="text-indigo-400" />
              )}
            </button>
          </div>

          {/* Orb Status Label */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-200">
              {isListening
                ? "Listening... Speak your command"
                : isSpeaking
                ? "Speaking response..."
                : isThinking
                ? "Synthesizing AI answer..."
                : "Tap orb to speak or use chat below"}
            </p>
            {transcript && (
              <p className="text-xs font-mono text-indigo-300 bg-indigo-950/40 px-4 py-1.5 rounded-xl border border-indigo-900/50 max-w-md mx-auto">
                "{transcript}"
              </p>
            )}
          </div>

        </div>
      </section>

      {/* 💬 Integrated Interactive Chat Box Directly Below Floating Futuristic Orb */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 mb-12 relative z-10">
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col">
          
          {/* Chat Header Bar */}
          <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <Sparkles size={16} />
              </div>
              <span className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">
                Conversational AI Chat Workspace
              </span>
              <span className="text-[10px] text-slate-500 font-mono px-2 py-0.5 bg-slate-900 rounded-md border border-slate-800">
                Context: {activeFile.name}
              </span>
            </div>

            {onClearChat && (
              <button
                type="button"
                onClick={onClearChat}
                className="text-xs text-slate-500 hover:text-red-400 transition-colors font-semibold flex items-center gap-1"
                title="Reset chat conversation"
              >
                <Trash2 size={13} />
                <span>Clear Chat</span>
              </button>
            )}
          </div>

          {/* Quick Prompt Suggestion Pills Shelf */}
          <div className="px-5 py-3 bg-slate-950/50 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 font-mono shrink-0">
              Suggestions:
            </span>
            {[
              "Explain codebase structure",
              "Add local storage state",
              "Refactor active function",
              "Run tests & heal errors",
              "Create new React component"
            ].map((cmd, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSendChatMessage(cmd)}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 rounded-full text-[11px] font-semibold text-slate-300 hover:text-white transition-all whitespace-nowrap shrink-0"
              >
                "{cmd}"
              </button>
            ))}
          </div>

          {/* Chat Messages Stream */}
          <div className="p-6 space-y-6 max-h-[460px] min-h-[220px] overflow-y-auto scrollbar-thin bg-slate-950/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1.5 max-w-[92%] ${
                  msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                {/* Bubble role header */}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                  <span className="font-bold uppercase tracking-wider">
                    {msg.role === "user" ? "You" : "AI Assistant"}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp || "Just now"}</span>
                </div>

                {/* Message Body Bubble */}
                <div
                  className={`rounded-2xl p-4 shadow-md ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none border border-indigo-500/30"
                      : "bg-slate-900/90 text-slate-200 rounded-tl-none border border-slate-800/90"
                  }`}
                >
                  {renderMessageContent ? (
                    renderMessageContent(msg.content)
                  ) : (
                    <p className="text-xs font-normal leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex flex-col gap-1.5 mr-auto max-w-[85%] animate-pulse">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                  <span className="font-bold uppercase tracking-wider">AI Assistant</span>
                  <span>•</span>
                  <span>thinking...</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl rounded-tl-none p-4 text-slate-400 text-sm flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin"></div>
                  <span>Drafting code edits & updating AST workspace...</span>
                </div>
              </div>
            )}
            <div ref={chatMessagesEndRef} />
          </div>

          {/* Interactive Chat Input Form */}
          <form onSubmit={handleFormSubmit} className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col gap-2">
            {isListening && (
              <div className="px-3 py-1.5 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2 animate-pulse">
                <Mic size={14} className="text-emerald-400 animate-spin" />
                <span>Listening to your voice command... Speak now</span>
              </div>
            )}

            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => onChatInputChange(e.target.value)}
                placeholder="Type or click the microphone to speak your command..."
                className="w-full pl-4 pr-24 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500 text-white shadow-inner"
              />

              {/* Speech Microphone Button */}
              <button
                type="button"
                onClick={handleToggleMic}
                className={`absolute right-16 p-2 rounded-xl transition-all ${
                  isListening
                    ? "bg-emerald-600 text-white animate-pulse"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                }`}
                title={isListening ? "Stop Voice Listening" : "Talk to Text (Speak Command)"}
              >
                {isListening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!chatInput.trim() || isThinking}
                className="absolute right-2 px-3.5 py-1.5 bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-600 text-white font-extrabold rounded-xl text-xs transition-all hover:bg-indigo-500 cursor-pointer shadow-md flex items-center gap-1"
              >
                <span>Send</span>
                <Send size={12} />
              </button>
            </div>

            <div className="flex items-center justify-between px-2 text-[11px] text-slate-500 font-mono">
              <span>Supports Voice-to-Text, Code Generation & Multi-Agent Execution</span>
              <span>Gemini 3.6 Flash Engine</span>
            </div>
          </form>

        </div>
      </section>

      {/* 🍏 Apple-Style Feature Grid Cards */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl space-y-3 hover:border-indigo-500/50 transition-all group">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl w-fit group-hover:scale-110 transition-transform">
            <Mic size={20} />
          </div>
          <h4 className="text-sm font-bold text-white">Voice & Chat Orchestration</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Command multi-agent architect, frontend, and backend routines purely using conversational speech or text.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl space-y-3 hover:border-purple-500/50 transition-all group">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl w-fit group-hover:scale-110 transition-transform">
            <Cpu size={20} />
          </div>
          <h4 className="text-sm font-bold text-white">Repo-Native Autonomy</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Real codebase AST graphs, round-trip editing, and clean idiomatic TypeScript stack generation.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl space-y-3 hover:border-emerald-500/50 transition-all group">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl w-fit group-hover:scale-110 transition-transform">
            <ShieldCheck size={20} />
          </div>
          <h4 className="text-sm font-bold text-white">Local-First & Self-Healing</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zero cloud lock-in. Automatic test monitoring and real-time self-healing AST code patch synthesis.
          </p>
        </div>

      </section>

    </div>
  );
};
