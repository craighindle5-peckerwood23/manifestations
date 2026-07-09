import React, { useState, useEffect, useRef } from "react";
import {
  Terminal as TerminalIcon,
  Play,
  FileCode,
  Plus,
  Trash2,
  Sparkles,
  RefreshCw,
  Layers,
  Check,
  Copy,
  AlertTriangle,
  Monitor,
  ExternalLink,
  HelpCircle,
  Code,
  ChevronRight,
  Download,
  Info,
  Layers3,
  Bookmark,
  Bug,
  FolderCode,
  Cloud,
  LogOut,
  Upload,
  FolderOpen,
  FolderArchive,
  MessageSquare,
  LayoutGrid,
  LayoutList
} from "lucide-react";
import { FileSnippet, Message, ExecutionResult, Language } from "./types";
import JSZip from "jszip";
import {
  initAuth,
  googleSignIn,
  logoutDrive,
  listDriveFiles,
  downloadDriveFile,
  uploadDriveFile,
  formatBytes,
  DriveFile
} from "./drive";

const INITIAL_FILES: FileSnippet[] = [
  {
    id: "file-html",
    name: "index.html",
    language: "html",
    description: "Web preview canvas file with interactive elements",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Interactive Preview</title>
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Tailwind Config -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f5f3ff',
              500: '#8b5cf6',
              600: '#7c3aed',
            }
          }
        }
      }
    }
  </script>
  <style>
    @keyframes pulse-slow {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: .8; transform: scale(1.05); }
    }
    .animate-pulse-slow {
      animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  </style>
</head>
<body class="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-6 selection:bg-purple-500/30 selection:text-purple-200">
  <!-- Glowing Ambient Background -->
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

  <div class="relative w-full max-w-lg bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center space-y-6">
    <div class="inline-flex p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 animate-pulse-slow">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    </div>

    <div class="space-y-2">
      <h1 class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
        Interactive Sandbox
      </h1>
      <p class="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
        Ask the AI Assistant in the chat pane to design a custom game, widget, or component, and watch it render instantly!
      </p>
    </div>

    <!-- Live Counter Widget -->
    <div class="bg-slate-950/80 rounded-2xl p-5 border border-slate-800/60 max-w-xs mx-auto space-y-4 shadow-inner">
      <div class="text-xs text-slate-500 font-mono">LIVE COMPONENT STATE</div>
      <div id="counter-value" class="text-4xl font-black text-white font-mono tracking-wider">0</div>
      <div class="flex gap-2 justify-center">
        <button onclick="decrement()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all text-sm font-semibold rounded-xl border border-slate-700/50">
          - Decrement
        </button>
        <button onclick="increment()" class="px-4 py-2 bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all text-sm font-semibold rounded-xl shadow-lg shadow-purple-600/20">
          + Increment
        </button>
      </div>
    </div>

    <div class="pt-4 text-xs text-slate-500">
      Click to change theme color or try other examples in the toolbar.
    </div>
  </div>

  <script>
    let count = 0;
    const counterEl = document.getElementById("counter-value");

    function increment() {
      count++;
      updateDisplay();
    }

    function decrement() {
      count--;
      updateDisplay();
    }

    function updateDisplay() {
      counterEl.textContent = count;
      
      // Dynamic scaling effects
      counterEl.classList.remove("scale-110", "text-purple-400", "text-pink-400");
      void counterEl.offsetWidth; // Force reflow
      
      if (count > 0) {
        counterEl.classList.add("scale-110", "text-purple-400");
      } else if (count < 0) {
        counterEl.classList.add("scale-110", "text-pink-400");
      } else {
        counterEl.classList.add("scale-110");
      }
    }
  </script>
</body>
</html>`
  },
  {
    id: "file-js",
    name: "main.js",
    language: "javascript",
    description: "JavaScript server-side backend / utility script",
    code: `// 🚀 Server-Side Node.js Sandbox Execution
console.log("=========================================");
console.log("   🚀 RUNNING JAVASCRIPT CONSOLE CODE   ");
console.log("=========================================");

// Let's compute a Fibonacci series with performance metrics
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

const nValue = 40;
console.log(\`Calculating Fibonacci(\${nValue})...\`);

const start = Date.now();
const result = fibonacci(nValue);
const duration = Date.now() - start;

console.log(\`Result of Fibonacci(\${nValue}): \`, result);
console.log(\`Calculation Duration: \${duration}ms\`);

console.log("\\n-----------------------------------------");
console.log("📊 SYSTEM INFO SUMMARY");
console.log("Node version :", process.version);
console.log("CWD          :", process.cwd());
console.log("Timestamp    :", new Date().toLocaleString());
console.log("=========================================");`
  },
  {
    id: "file-py",
    name: "app.py",
    language: "python",
    description: "Python data analyzer or mathematical script",
    code: `# 🐍 Server-Side Python Sandbox Execution
import sys
import math
import json

print("=========================================")
print("    🐍 RUNNING PYTHON CONSOLE SCRIPT     ")
print("=========================================")

print(f"Python Runtime Engine Version: {sys.version.split()[0]}")
print("-" * 41)

# Simulating database metrics or log parse operation
raw_logs = [
    {"ip": "192.168.1.1", "endpoint": "/api/chat", "status": 200, "bytes": 1420},
    {"ip": "10.0.0.5", "endpoint": "/api/execute", "status": 500, "bytes": 0},
    {"ip": "192.168.1.10", "endpoint": "/api/health", "status": 200, "bytes": 240},
    {"ip": "172.16.0.44", "endpoint": "/api/chat", "status": 403, "bytes": 120},
    {"ip": "192.168.1.1", "endpoint": "/api/chat", "status": 200, "bytes": 3550}
]

print(f"Processing raw network events (count: {len(raw_logs)})...")

total_bytes = sum(log["bytes"] for log in raw_logs)
endpoints = {}
error_count = 0

for log in raw_logs:
    ep = log["endpoint"]
    endpoints[ep] = endpoints.get(ep, 0) + 1
    if log["status"] >= 400:
        error_count += 1

print("\\n[+] Network Traffic Breakdown:")
print(f"    - Total bytes transmitted: {total_bytes} bytes")
print(f"    - Error requests (>=400): {error_count} ({(error_count/len(raw_logs))*100:.1f}%)")

print("\\n[+] Top Visited Endpoints:")
for ep, count in sorted(endpoints.items(), key=lambda x: x[1], reverse=True):
    print(f"    - {ep:<15} : {count} hit(s)")

# Geometry sandbox
r = 6.5
volume = (4.0 / 3.0) * math.pi * (r ** 3)
print(f"\\n[+] Geometry: Sphere Volume of radius {r} is {volume:.2f} cubic units")
print("=========================================")`
  }
];

interface ChatBlock {
  type: "text" | "code";
  content: string;
  language?: string;
  fileName?: string;
}

export default function App() {
  // Application State
  const [files, setFiles] = useState<FileSnippet[]>(() => {
    const saved = localStorage.getItem("sandbox_workspace_files");
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });
  const [activeFileId, setActiveFileId] = useState<string>("file-html");
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("sandbox_workspace_chat");
    return saved ? JSON.parse(saved) : [
      {
        id: "msg-welcome",
        role: "model",
        content: `👋 Hello! Welcome to the **AI Code Sandbox**. 

I am your interactive workspace assistant. You can chat with me, and I can generate custom programs, web layouts, and interactive applications for you!

Here's how you can make the most of this sandbox:
1. **Interactive Webpages**: Type \`Create an interactive Tic Tac Toe game\` or \`Build a pomodoro timer with responsive sounds\`. I will produce full-scale HTML/Tailwind web preview code.
2. **Backend Node.js & Python Scripts**: Try asking \`Write a bubble sort algorithm in JavaScript\` or \`Make a Python frequency analysis calculator\`.
3. **One-Click Sandbox Loading**: Code blocks returned in my messages have a **"Load Into Workspace"** button to load the code into your current file workspace instantly.
4. **Execute & Preview**: 
   - Click **Run Script** in the console tab to compile Python and JS on the server.
   - Switch to the **Interactive Preview** tab to run full HTML layout apps directly.

What should we build first?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  
  const [chatInput, setChatInput] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [runMode, setRunMode] = useState<"preview" | "terminal">("preview");
  const [execResult, setExecResult] = useState<ExecutionResult>({
    stdout: "",
    stderr: "",
    status: "idle"
  });

  // Modal / File actions state
  const [layoutMode, setLayoutMode] = useState<"dashboard" | "tabs">("tabs");
  const [activeMainTab, setActiveMainTab] = useState<"chat" | "editor" | "files">("editor");
  const [isCreatingFile, setIsCreatingFile] = useState<boolean>(false);
  const [newFileName, setNewFileName] = useState<string>("");
  const [newFileLang, setNewFileLang] = useState<Language>("javascript");
  const [fileSearch, setFileSearch] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved" | "saving">("saved");

  // ZIP Import State
  const [isImportingZip, setIsImportingZip] = useState<boolean>(false);
  const [zipSuccessMessage, setZipSuccessMessage] = useState<string | null>(null);
  const [zipError, setZipError] = useState<string | null>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // GOOGLE DRIVE SYNC STATES & INTEGRATION
  // ==========================================
  const [explorerTab, setExplorerTab] = useState<"local" | "drive">("local");
  const [driveUser, setDriveUser] = useState<any | null>(null);
  const [driveToken, setDriveToken] = useState<string | null>(null);
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [driveSearch, setDriveSearch] = useState<string>("");
  const [isFetchingDrive, setIsFetchingDrive] = useState<boolean>(false);
  const [driveError, setDriveError] = useState<string | null>(null);
  const [isExportingDrive, setIsExportingDrive] = useState<boolean>(false);
  const [driveSyncStatus, setDriveSyncStatus] = useState<string | null>(null);
  const [importedFilesMap, setImportedFilesMap] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("sandbox_imported_files_map");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist mapping between local file ID and Google Drive file ID
  useEffect(() => {
    localStorage.setItem("sandbox_imported_files_map", JSON.stringify(importedFilesMap));
  }, [importedFilesMap]);

  // Listen to Auth state changes on load
  useEffect(() => {
    const unsubscribe = initAuth(
      async (user, token) => {
        setDriveUser(user);
        setDriveToken(token);
        setIsFetchingDrive(true);
        try {
          const files = await listDriveFiles(token);
          setDriveFiles(files);
        } catch (err: any) {
          console.error("Auto load drive files failed:", err);
          setDriveError(err.message || "Failed to load files from Google Drive.");
        } finally {
          setIsFetchingDrive(false);
        }
      },
      () => {
        setDriveUser(null);
        setDriveToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleDriveLogin = async () => {
    setDriveError(null);
    setIsFetchingDrive(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setDriveUser(result.user);
        setDriveToken(result.accessToken);
        setDriveSyncStatus("Authenticated successfully!");
        const files = await listDriveFiles(result.accessToken);
        setDriveFiles(files);
        setTimeout(() => setDriveSyncStatus(null), 4000);
      }
    } catch (err: any) {
      setDriveError(err.message || "Authentication with Google Drive failed.");
    } finally {
      setIsFetchingDrive(false);
    }
  };

  const handleDriveLogout = async () => {
    try {
      await logoutDrive();
      setDriveUser(null);
      setDriveToken(null);
      setDriveFiles([]);
      setDriveSyncStatus("Signed out of Google Drive.");
      setTimeout(() => setDriveSyncStatus(null), 3000);
    } catch (err: any) {
      setDriveError(err.message || "Sign out failed.");
    }
  };

  const handleRefreshDriveFiles = async () => {
    if (!driveToken) return;
    setIsFetchingDrive(true);
    setDriveError(null);
    try {
      const files = await listDriveFiles(driveToken, driveSearch);
      setDriveFiles(files);
    } catch (err: any) {
      setDriveError(err.message || "Could not retrieve files from Google Drive.");
    } finally {
      setIsFetchingDrive(false);
    }
  };

  const handleImportDriveFile = async (driveFile: DriveFile) => {
    if (!driveToken) return;
    setDriveError(null);
    setDriveSyncStatus(`Importing "${driveFile.name}"...`);
    try {
      const rawContent = await downloadDriveFile(driveToken, driveFile.id);
      
      // Determine file language from name
      let lang: Language = "javascript";
      if (driveFile.name.endsWith(".html") || driveFile.name.endsWith(".htm")) {
        lang = "html";
      } else if (driveFile.name.endsWith(".py")) {
        lang = "python";
      }

      // Check if file already exists in local sandbox list
      const existing = files.find(f => f.name.toLowerCase() === driveFile.name.toLowerCase());
      if (existing) {
        if (confirm(`A file named "${driveFile.name}" already exists in your local sandbox workspace.\n\nDo you want to OVERWRITE its content with the Google Drive version?`)) {
          setFiles(prev => prev.map(f => f.id === existing.id ? { ...f, code: rawContent, language: lang } : f));
          setImportedFilesMap(prev => ({ ...prev, [existing.id]: driveFile.id }));
          setActiveFileId(existing.id);
          setExplorerTab("local");
          setDriveSyncStatus(`Successfully imported & merged "${driveFile.name}"`);
          setTimeout(() => setDriveSyncStatus(null), 4000);
        }
        return;
      }

      // Create new file
      const newId = `file-${Date.now()}`;
      const newSnippet: FileSnippet = {
        id: newId,
        name: driveFile.name,
        language: lang,
        description: `Imported from Google Drive (${formatBytes(driveFile.size)})`,
        code: rawContent
      };

      setFiles(prev => [...prev, newSnippet]);
      setImportedFilesMap(prev => ({ ...prev, [newId]: driveFile.id }));
      setActiveFileId(newId);
      setExplorerTab("local");
      setDriveSyncStatus(`Imported "${driveFile.name}" into local sandbox.`);
      setTimeout(() => setDriveSyncStatus(null), 4000);
    } catch (err: any) {
      setDriveError(err.message || "Failed to import file.");
    } finally {
      setTimeout(() => setDriveSyncStatus(null), 4000);
    }
  };

  const getMimeType = (fileName: string): string => {
    if (fileName.endsWith(".html") || fileName.endsWith(".htm")) return "text/html";
    if (fileName.endsWith(".py")) return "text/x-python";
    if (fileName.endsWith(".js")) return "application/javascript";
    if (fileName.endsWith(".ts")) return "application/typescript";
    if (fileName.endsWith(".json")) return "application/json";
    return "text/plain";
  };

  const handleSaveActiveToDrive = async () => {
    if (!driveToken) {
      alert("Please sign in to Google Drive first.");
      return;
    }
    setDriveError(null);
    const linkedId = importedFilesMap[activeFile.id];

    if (linkedId) {
      // Prompt/Confirm before overwrite (Crucial Turn Rule!)
      const confirmed = confirm(`Are you sure you want to save changes and OVERWRITE "${activeFile.name}" on Google Drive?`);
      if (!confirmed) return;

      setDriveSyncStatus(`Updating "${activeFile.name}" on Google Drive...`);
      try {
        await uploadDriveFile(driveToken, activeFile.name, activeFile.code, getMimeType(activeFile.name), linkedId);
        setDriveSyncStatus(`Successfully updated "${activeFile.name}" on Google Drive!`);
        setTimeout(() => setDriveSyncStatus(null), 4000);
        handleRefreshDriveFiles();
      } catch (err: any) {
        setDriveError(err.message || "Failed to update file on Google Drive.");
      }
    } else {
      // Create new file
      const driveFileName = prompt("Enter a name to save this file on Google Drive:", activeFile.name);
      if (!driveFileName) return;

      setDriveSyncStatus(`Uploading "${driveFileName}" to Google Drive...`);
      try {
        const result = await uploadDriveFile(driveToken, driveFileName, activeFile.code, getMimeType(driveFileName));
        setImportedFilesMap(prev => ({ ...prev, [activeFile.id]: result.id }));
        setDriveSyncStatus(`Successfully saved "${driveFileName}" to Google Drive!`);
        setTimeout(() => setDriveSyncStatus(null), 4000);
        handleRefreshDriveFiles();
      } catch (err: any) {
        setDriveError(err.message || "Failed to upload new file to Google Drive.");
      }
    }
  };

  const handleExportAllToDrive = async () => {
    if (!driveToken) {
      alert("Please sign in to Google Drive first.");
      return;
    }
    setDriveError(null);
    
    const zipName = prompt("Enter a name for the project backup ZIP on Google Drive:", "sandbox-project-backup.zip");
    if (!zipName) return;

    setDriveSyncStatus("Packaging sandbox files as ZIP...");
    setIsExportingDrive(true);

    try {
      const zip = new JSZip();
      files.forEach(f => {
        zip.file(f.name, f.code);
      });
      const contentBlob = await zip.generateAsync({ type: "blob" });

      setDriveSyncStatus(`Uploading "${zipName}" ZIP to Google Drive...`);
      await uploadDriveFile(driveToken, zipName, contentBlob, "application/zip");
      setDriveSyncStatus(`Project backup "${zipName}" successfully uploaded to Google Drive!`);
      setTimeout(() => setDriveSyncStatus(null), 5000);
      handleRefreshDriveFiles();
    } catch (err: any) {
      setDriveError(err.message || "Failed to export ZIP to Google Drive.");
    } finally {
      setIsExportingDrive(false);
    }
  };

  // Onboarding Tutorial Pop-up States
  const [showTutorial, setShowTutorial] = useState<boolean>(() => {
    const seen = localStorage.getItem("sandbox_tutorial_seen");
    return seen !== "true";
  });
  const [tutorialStep, setTutorialStep] = useState<number>(1);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("sandbox_tutorial_seen", "true");
  };

  const handleOpenTutorial = () => {
    setTutorialStep(1);
    setShowTutorial(true);
  };

  const chatEndRef = useRef<HTMLDivElement>(null);
  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  // Save workspace to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("sandbox_workspace_files", JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem("sandbox_workspace_chat", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle active file modification
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedCode = e.target.value;
    setSaveStatus("saving");
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, code: updatedCode } : f));
    setTimeout(() => setSaveStatus("saved"), 400);
  };

  // Run script code via server endpoint
  const handleExecuteScript = async () => {
    if (activeFile.language === "html") {
      setRunMode("preview");
      return;
    }

    setIsExecuting(true);
    setRunMode("terminal");
    setExecResult({ stdout: "", stderr: "", status: "running" });

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: activeFile.language,
          code: activeFile.code
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Server-side execution failed.");
      }

      const data = await response.json();
      setExecResult({
        stdout: data.stdout,
        stderr: data.stderr,
        status: data.status,
        error: data.error,
        executionTimeMs: data.executionTimeMs
      });
    } catch (err: any) {
      setExecResult({
        stdout: "",
        stderr: err.message || "An unexpected execution error occurred.",
        status: "error",
        error: err.message
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // Reset sandbox files to original defaults
  const handleResetWorkspace = () => {
    if (confirm("Are you sure you want to reset all workspace files to defaults? Your current modifications will be replaced.")) {
      setFiles(INITIAL_FILES);
      setActiveFileId("file-html");
      setRunMode("preview");
      setExecResult({ stdout: "", stderr: "", status: "idle" });
    }
  };

  // Clear chat logs
  const handleClearChat = () => {
    if (confirm("Clear all conversation logs with the AI assistant?")) {
      setMessages([
        {
          id: "msg-welcome-reset",
          role: "model",
          content: "Workspace conversations reset. Ready for your instructions! Ask me to write, optimize, or fix some code.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  // Handle creation of new code snippet file
  const handleCreateFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    // Sanitize and resolve extension
    let name = newFileName.trim();
    let detectedLang: Language = newFileLang;
    if (name.endsWith(".html") || name.endsWith(".htm")) {
      detectedLang = "html";
    } else if (name.endsWith(".py")) {
      detectedLang = "python";
    } else if (name.endsWith(".js") || name.endsWith(".ts")) {
      detectedLang = "javascript";
    } else {
      // Append correct extension based on selection
      if (detectedLang === "html") name += ".html";
      else if (detectedLang === "python") name += ".py";
      else name += ".js";
    }

    // Check duplicate
    if (files.some(f => f.name.toLowerCase() === name.toLowerCase())) {
      alert("A file with this name already exists in your sandbox workspace.");
      return;
    }

    const newId = `file-${Date.now()}`;
    const starterTemplate = detectedLang === "html" 
      ? `<!DOCTYPE html>\n<html>\n<head>\n  <script src="https://cdn.tailwindcss.com"></script>\n</head>\n<body class="bg-slate-900 text-white flex items-center justify-center min-h-screen">\n  <h1 class="text-3xl font-bold">New Canvas Page: ${name}</h1>\n</body>\n</html>`
      : detectedLang === "python"
        ? `# Python script for ${name}\nprint("Hello from ${name}!")`
        : `// JavaScript utility script ${name}\nconsole.log("Running ${name}");`;

    const newSnippet: FileSnippet = {
      id: newId,
      name,
      language: detectedLang,
      description: `Custom ${detectedLang.toUpperCase()} file created by user`,
      code: starterTemplate
    };

    setFiles(prev => [...prev, newSnippet]);
    setActiveFileId(newId);
    setNewFileName("");
    setIsCreatingFile(false);
  };

  // Delete file
  const handleDeleteFile = (id: string, name: string) => {
    if (files.length <= 1) {
      alert("Your sandbox workspace must contain at least one file.");
      return;
    }
    if (confirm(`Are you sure you want to delete file "${name}"?`)) {
      const remaining = files.filter(f => f.id !== id);
      setFiles(remaining);
      if (activeFileId === id) {
        setActiveFileId(remaining[0].id);
      }
    }
  };

  // Handle uploading and extracting a .zip archive
  const handleZipFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".zip") && file.type !== "application/zip") {
      setZipError("Please select a valid .zip archive file.");
      setTimeout(() => setZipError(null), 5000);
      return;
    }

    setZipError(null);
    setZipSuccessMessage(null);
    setIsImportingZip(true);

    try {
      const zip = await JSZip.loadAsync(file);
      const extractedFiles: FileSnippet[] = [];
      const promises: Promise<void>[] = [];

      zip.forEach((relativePath, fileEntry) => {
        if (fileEntry.dir) return;
        if (relativePath.includes("__MACOSX") || relativePath.startsWith(".") || relativePath.includes("/.")) return;

        const fileName = relativePath.split("/").pop() || relativePath;
        if (fileName.startsWith(".") || fileName === "Thumbs.db") return;

        let lang: Language = "javascript";
        if (fileName.endsWith(".html") || fileName.endsWith(".htm")) {
          lang = "html";
        } else if (fileName.endsWith(".py")) {
          lang = "python";
        } else if (fileName.endsWith(".js") || fileName.endsWith(".ts") || fileName.endsWith(".jsx") || fileName.endsWith(".tsx")) {
          lang = "javascript";
        } else {
          const ext = fileName.split(".").pop()?.toLowerCase();
          const allowedExts = ["js", "ts", "py", "html", "htm", "css", "json", "md", "txt", "jsx", "tsx"];
          if (ext && !allowedExts.includes(ext)) {
            return;
          }
          lang = "javascript";
        }

        const readPromise = fileEntry.async("string").then((codeContent) => {
          extractedFiles.push({
            id: `zip-file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: fileName,
            language: lang,
            description: `Extracted from ${file.name}`,
            code: codeContent
          });
        });
        promises.push(readPromise);
      });

      await Promise.all(promises);

      if (extractedFiles.length === 0) {
        throw new Error("No readable source files (.html, .py, .js, etc.) found in the ZIP archive.");
      }

      const mergeChoice = confirm(
        `Successfully loaded ZIP archive "${file.name}"!\n\n` +
        `Found ${extractedFiles.length} file(s):\n` +
        extractedFiles.map(f => `  • ${f.name} (${f.language})`).join("\n") +
        `\n\n- Click OK to MERGE these files into your current workspace.\n` +
        `- Click Cancel to REPLACE your current workspace entirely with these files.`
      );

      if (mergeChoice) {
        setFiles(prev => {
          const merged = [...prev];
          extractedFiles.forEach(newFile => {
            const idx = merged.findIndex(f => f.name.toLowerCase() === newFile.name.toLowerCase());
            if (idx > -1) {
              merged[idx] = newFile;
            } else {
              merged.push(newFile);
            }
          });
          return merged;
        });
        setZipSuccessMessage(`Successfully merged ${extractedFiles.length} file(s) into your sandbox workspace!`);
      } else {
        setFiles(extractedFiles);
        setZipSuccessMessage(`Successfully replaced workspace with ${extractedFiles.length} file(s) from ZIP!`);
      }

      if (extractedFiles.length > 0) {
        setActiveFileId(extractedFiles[0].id);
      }
      setTimeout(() => setZipSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error("ZIP import failed:", err);
      setZipError(err.message || "Failed to extract code files from the selected archive.");
      setTimeout(() => setZipError(null), 6000);
    } finally {
      setIsImportingZip(false);
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  // Helper template selectors
  const loadTemplate = (preset: "game" | "timer" | "matrix" | "sort") => {
    if (preset === "game") {
      const gameCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sandbox Tic-Tac-Toe</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white min-h-screen flex flex-col items-center justify-center p-4">
  <div class="max-w-md w-full bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl backdrop-blur-md text-center space-y-6">
    <div>
      <h1 class="text-3xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">TIC-TAC-TOE</h1>
      <p id="status" class="text-sm text-slate-300 mt-2 font-mono">Player X's Turn</p>
    </div>

    <div class="grid grid-cols-3 gap-3 max-w-xs mx-auto">
      <button onclick="cellClick(0)" class="cell h-24 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl text-4xl font-extrabold flex items-center justify-center border border-slate-800"></button>
      <button onclick="cellClick(1)" class="cell h-24 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl text-4xl font-extrabold flex items-center justify-center border border-slate-800"></button>
      <button onclick="cellClick(2)" class="cell h-24 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl text-4xl font-extrabold flex items-center justify-center border border-slate-800"></button>
      <button onclick="cellClick(3)" class="cell h-24 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl text-4xl font-extrabold flex items-center justify-center border border-slate-800"></button>
      <button onclick="cellClick(4)" class="cell h-24 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl text-4xl font-extrabold flex items-center justify-center border border-slate-800"></button>
      <button onclick="cellClick(5)" class="cell h-24 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl text-4xl font-extrabold flex items-center justify-center border border-slate-800"></button>
      <button onclick="cellClick(6)" class="cell h-24 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl text-4xl font-extrabold flex items-center justify-center border border-slate-800"></button>
      <button onclick="cellClick(7)" class="cell h-24 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl text-4xl font-extrabold flex items-center justify-center border border-slate-800"></button>
      <button onclick="cellClick(8)" class="cell h-24 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl text-4xl font-extrabold flex items-center justify-center border border-slate-800"></button>
    </div>

    <button onclick="resetGame()" class="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold tracking-wide active:scale-[0.98] transition-all">
      Reset Game Board
    </button>
  </div>

  <script>
    let board = ["", "", "", "", "", "", "", "", ""];
    let isGameActive = true;
    let currentPlayer = "X";
    const statusEl = document.getElementById("status");
    const cells = document.querySelectorAll(".cell");

    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function cellClick(index) {
      if (board[index] !== "" || !isGameActive) return;
      
      board[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
      cells[index].classList.add(currentPlayer === 'X' ? 'text-purple-400' : 'text-emerald-400');
      
      checkResult();
    }

    function checkResult() {
      let roundWon = false;
      for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        statusEl.textContent = "🏆 Player " + currentPlayer + " Wins!";
        statusEl.className = "text-sm text-green-400 font-bold font-mono animate-bounce";
        isGameActive = false;
        return;
      }

      if (!board.includes("")) {
        statusEl.textContent = "🤝 Game Draw!";
        statusEl.className = "text-sm text-yellow-400 font-bold font-mono";
        isGameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusEl.textContent = "Player " + currentPlayer + "'s Turn";
      statusEl.className = "text-sm text-slate-300 font-mono";
    }

    function resetGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      isGameActive = true;
      currentPlayer = "X";
      statusEl.textContent = "Player X's Turn";
      statusEl.className = "text-sm text-slate-300 font-mono";
      cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell h-24 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl text-4xl font-extrabold flex items-center justify-center border border-slate-800";
      });
    }
  </script>
</body>
</html>`;
      setFiles(prev => prev.map(f => f.name === "index.html" ? { ...f, code: gameCode } : f));
      setActiveFileId("file-html");
      setRunMode("preview");
    } else if (preset === "timer") {
      const timerCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Minimal Countdown Clock</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-950 text-white min-h-screen flex items-center justify-center font-sans">
  <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-sm w-full text-center space-y-6">
    <h2 class="text-lg text-zinc-500 font-semibold tracking-wider font-mono">COUNTDOWN INTERVAL</h2>
    <div id="display" class="text-6xl font-black tracking-widest font-mono text-indigo-400">05:00</div>
    
    <div class="flex gap-3">
      <button onclick="startTimer()" class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all">Start</button>
      <button onclick="pauseTimer()" class="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold transition-all">Pause</button>
      <button onclick="resetTimer()" class="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl font-semibold transition-all">Reset</button>
    </div>
  </div>

  <script>
    let timer;
    let timeLeft = 300; // 5 mins in seconds
    let isRunning = false;

    function updateDisplay() {
      const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
      const secs = (timeLeft % 60).toString().padStart(2, '0');
      document.getElementById('display').textContent = mins + ':' + secs;
    }

    function startTimer() {
      if (isRunning) return;
      isRunning = true;
      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateDisplay();
        } else {
          clearInterval(timer);
          alert('⏰ Time is up!');
          resetTimer();
        }
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(timer);
      isRunning = false;
    }

    function resetTimer() {
      clearInterval(timer);
      isRunning = false;
      timeLeft = 300;
      updateDisplay();
    }
  </script>
</body>
</html>`;
      setFiles(prev => prev.map(f => f.name === "index.html" ? { ...f, code: timerCode } : f));
      setActiveFileId("file-html");
      setRunMode("preview");
    } else if (preset === "matrix") {
      const matrixCode = `// Matrix terminal shower
console.log("⚡ INITIALIZING DIGITAL STREAM MODULE...");

const chars = "010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+";
const cols = 80;

function generateLine() {
  let line = "";
  for (let i = 0; i < cols; i++) {
    if (Math.random() > 0.85) {
      // Pick random char
      line += chars[Math.floor(Math.random() * chars.length)];
    } else {
      line += " ";
    }
  }
  return line;
}

// Print stream simulation lines
for (let i = 0; i < 25; i++) {
  console.log(generateLine());
}
console.log("\\n[!] Streaming completed. Connection established secure tunnel.");`;
      setFiles(prev => prev.map(f => f.name === "main.js" ? { ...f, code: matrixCode } : f));
      setActiveFileId("file-js");
      setRunMode("terminal");
    } else if (preset === "sort") {
      const sortCode = `# Python Sorting Visualizer Simulation
import time
import random

print("Sorting Engine Simulator")
print("=" * 40)

def bubble_sort(arr):
    n = len(arr)
    print(f"Original Array: {arr}\\n")
    for i in range(n):
        swapped = False
        print(f"Pass {i+1}:")
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                print(f"  -> Swapped: {arr[j]} & {arr[j+1]} | State: {arr}")
        if not swapped:
            print("  -> Array is already sorted. Breaking early.")
            break
        print("-" * 30)
    return arr

# Seed random integers
data = random.sample(range(1, 30), 8)
sorted_data = bubble_sort(data)

print("\\n" + "=" * 40)
print(f"🎉 SUCCESS! Final Sorted Array: {sorted_data}")
print("=" * 40)`;
      setFiles(prev => prev.map(f => f.name === "app.py" ? { ...f, code: sortCode } : f));
      setActiveFileId("file-py");
      setRunMode("terminal");
    }
  };

  // One-click function to insert code from Chat messages into the current active file
  const handleLoadCodeIntoWorkspace = (snippetCode: string, lang: Language, recommendedName?: string) => {
    // Check if filename recommendation matches any existing file
    let targetId = activeFileId;
    if (recommendedName) {
      const found = files.find(f => f.name.toLowerCase() === recommendedName.toLowerCase());
      if (found) {
        targetId = found.id;
      } else {
        // Create it
        const newId = `file-${Date.now()}`;
        const newSnippet: FileSnippet = {
          id: newId,
          name: recommendedName,
          language: lang,
          description: `Extracted from chat conversation`,
          code: snippetCode
        };
        setFiles(prev => [...prev, newSnippet]);
        setActiveFileId(newId);
        alert(`Created a new file "${recommendedName}" and loaded the code.`);
        return;
      }
    }

    setFiles(prev => prev.map(f => f.id === targetId ? { ...f, code: snippetCode, language: lang } : f));
    setActiveFileId(targetId);
    
    // Auto-select visual mode
    if (lang === "html") {
      setRunMode("preview");
    } else {
      setRunMode("terminal");
    }

    // Elegant toast or flash status
    alert(`Loaded code block into file: ${files.find(f => f.id === targetId)?.name || "active file"}`);
  };

  // Run script code on load/insert directly
  const handleRunImmediately = (codeToRun: string, lang: Language) => {
    // Set code in active file or matching extension file
    const targetFile = files.find(f => f.language === lang);
    if (targetFile) {
      setFiles(prev => prev.map(f => f.id === targetFile.id ? { ...f, code: codeToRun } : f));
      setActiveFileId(targetFile.id);
    } else {
      // Create and switch
      const newId = `file-${Date.now()}`;
      const name = lang === "python" ? "run_immediate.py" : "run_immediate.js";
      const newSnippet: FileSnippet = {
        id: newId,
        name,
        language: lang,
        description: `Running immediately`,
        code: codeToRun
      };
      setFiles(prev => [...prev, newSnippet]);
      setActiveFileId(newId);
    }

    // Trigger run
    setTimeout(() => {
      handleExecuteScript();
    }, 100);
  };

  // Chat Submission
  const handleSendChat = async (e?: React.FormEvent, presetPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = presetPrompt || chatInput;
    if (!promptToSend.trim() || isThinking) return;

    const userMsgId = `msg-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      role: "user",
      content: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!presetPrompt) setChatInput("");
    setIsThinking(true);

    try {
      // Gather current workspace files context to provide to Gemini so it is aware of active edits
      const context = files.map(f => `FILE: ${f.name} (${f.language})\n\`\`\`${f.language}\n${f.code}\n\`\`\``).join("\n\n");
      
      const payloadMessages = [
        {
          role: "user",
          content: `Here is the current state of my workspace files. Please keep these in mind when answering:\n${context}`
        },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: "user", content: promptToSend }
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to communicate with AI server.");
      }

      const data = await response.json();
      
      const replyMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "model",
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: `msg-err-${Date.now()}`,
        role: "model",
        content: `❌ **Error connecting with AI service:** ${err.message || "An unexpected error occurred. Please ensure GEMINI_API_KEY is configured in your Secrets panel."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  // Custom regex-based Markdown/Code Block Parser to render interactive buttons for code snippets
  const renderMessageContent = (text: string) => {
    const blocks: ChatBlock[] = [];
    // Match code blocks with syntax: ```lang [name="filename"]
    const regex = /```(\w+)?(?:\s+name="([^"]+)"|\s+filename="([^"]+)"|\s+file="([^"]+)")?\s*\n([\s\S]*?)```/g;
    
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const txt = text.substring(lastIndex, match.index);
        if (txt.trim()) {
          blocks.push({ type: "text", content: txt });
        }
      }
      
      const lang = (match[1] || "javascript").toLowerCase();
      const filename = match[2] || match[3] || match[4] || "";
      const code = match[5];
      
      blocks.push({
        type: "code",
        content: code,
        language: lang as Language,
        fileName: filename
      });
      
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      const txt = text.substring(lastIndex);
      if (txt.trim()) {
        blocks.push({ type: "text", content: txt });
      }
    }

    if (blocks.length === 0) {
      // Basic fallback to detect normal ``` blocks if regex name attributes aren't outputted
      const fallbackRegex = /```(\w*)\n([\s\S]*?)```/g;
      let fbLastIndex = 0;
      let fbMatch;
      
      while ((fbMatch = fallbackRegex.exec(text)) !== null) {
        if (fbMatch.index > fbLastIndex) {
          const txt = text.substring(fbLastIndex, fbMatch.index);
          if (txt.trim()) {
            blocks.push({ type: "text", content: txt });
          }
        }
        
        const lang = (fbMatch[1] || "javascript").toLowerCase();
        const code = fbMatch[2];
        
        blocks.push({
          type: "code",
          content: code,
          language: lang as Language
        });
        
        fbLastIndex = fallbackRegex.lastIndex;
      }
      
      if (fbLastIndex < text.length) {
        const txt = text.substring(fbLastIndex);
        if (txt.trim()) {
          blocks.push({ type: "text", content: txt });
        }
      }
    }

    if (blocks.length === 0) {
      blocks.push({ type: "text", content: text });
    }

    return (
      <div className="space-y-3 text-slate-200 text-[14px] leading-relaxed">
        {blocks.map((block, idx) => {
          if (block.type === "text") {
            // Helper to render simple inline markdown such as bold (**), inline codes (`), and bullet lists
            return (
              <div key={idx} className="whitespace-pre-wrap leading-relaxed space-y-2">
                {block.content.split("\n").map((line, lIdx) => {
                  let parsedLine = line;
                  
                  // Simple list items starting with - or * or digit.
                  const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
                  const isNumbered = /^\d+\.\s/.test(line.trim());
                  
                  if (isBullet) {
                    parsedLine = line.trim().substring(2);
                  } else if (isNumbered) {
                    const matchNum = line.trim().match(/^(\d+\.\s)/);
                    if (matchNum) {
                      parsedLine = line.trim().substring(matchNum[0].length);
                    }
                  }

                  // Handle bold (**text**)
                  const boldRegex = /\*\*([^*]+)\*\*/g;
                  const parts: React.ReactNode[] = [];
                  let lastBoldIdx = 0;
                  let boldMatch;
                  
                  while ((boldMatch = boldRegex.exec(parsedLine)) !== null) {
                    if (boldMatch.index > lastBoldIdx) {
                      parts.push(parsedLine.substring(lastBoldIdx, boldMatch.index));
                    }
                    parts.push(<strong key={boldMatch.index} className="text-white font-semibold">{boldMatch[1]}</strong>);
                    lastBoldIdx = boldRegex.lastIndex;
                  }
                  if (lastBoldIdx < parsedLine.length) {
                    parts.push(parsedLine.substring(lastBoldIdx));
                  }

                  // Handle inline code (`code`)
                  const inlineParts = parts.flatMap((part) => {
                    if (typeof part !== "string") return [part];
                    
                    const codeRegex = /`([^`]+)`/g;
                    const subParts: React.ReactNode[] = [];
                    let lastCodeIdx = 0;
                    let codeMatch;
                    
                    while ((codeMatch = codeRegex.exec(part)) !== null) {
                      if (codeMatch.index > lastCodeIdx) {
                        subParts.push(part.substring(lastCodeIdx, codeMatch.index));
                      }
                      subParts.push(
                        <code key={codeMatch.index} className="px-1.5 py-0.5 bg-slate-950 border border-slate-800 text-purple-300 font-mono text-xs rounded">
                          {codeMatch[1]}
                        </code>
                      );
                      lastCodeIdx = codeRegex.lastIndex;
                    }
                    if (lastCodeIdx < part.length) {
                      subParts.push(part.substring(lastCodeIdx));
                    }
                    return subParts;
                  });

                  if (isBullet) {
                    return (
                      <div key={lIdx} className="flex items-start gap-2 pl-2">
                        <span className="text-purple-400 mt-1.5 select-none text-[8px]">●</span>
                        <span className="flex-1">{inlineParts.length > 0 ? inlineParts : line}</span>
                      </div>
                    );
                  }

                  if (isNumbered) {
                    return (
                      <div key={lIdx} className="flex items-start gap-2 pl-2">
                        <span className="text-indigo-400 font-mono font-bold text-xs mt-0.5 select-none">{lIdx + 1}.</span>
                        <span className="flex-1">{inlineParts.length > 0 ? inlineParts : line}</span>
                      </div>
                    );
                  }

                  return (
                    <p key={lIdx} className="min-h-[0.75rem]">
                      {inlineParts.length > 0 ? inlineParts : line}
                    </p>
                  );
                })}
              </div>
            );
          } else {
            // Render beautiful Interactive Code block with actions
            const displayLang = block.language || "javascript";
            const codeVal = block.content.trim();
            const showName = block.fileName || (displayLang === "html" ? "index.html" : displayLang === "python" ? "app.py" : "main.js");
            
            return (
              <div key={idx} className="my-4 border border-slate-800 rounded-2xl overflow-hidden shadow-lg bg-slate-950 font-mono text-xs">
                {/* Header bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                    <span className="text-slate-400 font-semibold">{showName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-500 rounded font-mono uppercase">{displayLang}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(codeVal)}
                      className="p-1 text-slate-500 hover:text-slate-300 transition-colors rounded hover:bg-slate-800"
                      title="Copy code"
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadCodeIntoWorkspace(codeVal, displayLang as Language, showName)}
                      className="flex items-center gap-1 px-2 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded border border-purple-500/20 transition-all font-semibold"
                    >
                      <Layers size={11} />
                      <span>Load File</span>
                    </button>
                    {displayLang !== "html" && (
                      <button
                        type="button"
                        onClick={() => handleRunImmediately(codeVal, displayLang as Language)}
                        className="flex items-center gap-1 px-2 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 rounded border border-emerald-500/20 transition-all font-semibold"
                      >
                        <Play size={11} />
                        <span>Run Now</span>
                      </button>
                    )}
                  </div>
                </div>
                {/* Raw Code representation */}
                <pre className="p-4 overflow-x-auto text-slate-300 max-h-72 overflow-y-auto leading-relaxed scrollbar-thin">
                  <code>{codeVal}</code>
                </pre>
              </div>
            );
          }
        })}
      </div>
    );
  };

  // Filtered files in Explorer
  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(fileSearch.toLowerCase()) ||
    f.language.toLowerCase().includes(fileSearch.toLowerCase())
  );

  return (
    <div id="main-sandbox-container" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* 🚀 Main Header */}
      <header className="bg-slate-900 border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/25 border border-purple-500/30">
            <Sparkles size={20} className="text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">AI Code Sandbox</span>
              <span className="text-[10px] bg-slate-800 border border-slate-700 font-bold px-2 py-0.5 rounded-full text-indigo-400">V1.4 PRO</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Multi-language interactive workspace with server execution sandbox</p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-4">
          {/* Status indicators */}
          <div className="hidden md:flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800/80 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
              <span className="font-semibold text-slate-300">Sandbox Core:</span> Ready
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <span className="text-purple-400">HTML</span> (Live View)
            </span>
            <span className="text-slate-800">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <span className="text-yellow-400">JS</span> (Node.js)
            </span>
            <span className="text-slate-800">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <span className="text-emerald-400">Py</span> (Python 3)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleOpenTutorial}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all border border-purple-900/30 hover:border-purple-800/40"
              title="Open Sandbox Onboarding Tutorial"
            >
              <HelpCircle size={13} className="text-purple-400" />
              <span className="hidden sm:inline">Tutorial Guide</span>
            </button>
            <button
              type="button"
              onClick={handleResetWorkspace}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all border border-slate-700/50"
              title="Reset workspace to default template files"
            >
              <RefreshCw size={13} />
              <span className="hidden sm:inline">Reset Sandbox</span>
            </button>
            <a 
              href="https://ai.studio/build" 
              target="_blank" 
              rel="noreferrer" 
              className="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-purple-600/10 transition-all border border-purple-400/20"
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">AI Studio Build</span>
            </a>
          </div>
        </div>
      </header>

      {/* 🔮 Sub-Header Navigation Bar (Tabs & Layout Switcher) */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 shadow-sm select-none">
        
        {/* Left Side: Tabs Switcher (Only active when layoutMode === "tabs") */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
          <button
            type="button"
            onClick={() => {
              setLayoutMode("tabs");
              setActiveMainTab("editor");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              layoutMode === "tabs" && activeMainTab === "editor"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/45"
            }`}
          >
            <Code size={13} />
            <span>💻 Code Playground</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setLayoutMode("tabs");
              setActiveMainTab("chat");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 relative ${
              layoutMode === "tabs" && activeMainTab === "chat"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/15"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/45"
            }`}
          >
            <MessageSquare size={13} />
            <span>💬 AI Chat Companion</span>
            {messages.length > 1 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-500 px-1 text-[9px] font-bold text-white border border-slate-900">
                {messages.length - 1}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setLayoutMode("tabs");
              setActiveMainTab("files");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              layoutMode === "tabs" && activeMainTab === "files"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/45"
            }`}
          >
            <FolderCode size={13} />
            <span>📁 Explorer & Sync</span>
          </button>
        </div>

        {/* Right Side: Layout Controller (Grid vs Tabbed view) */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
          <button
            type="button"
            onClick={() => setLayoutMode("tabs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              layoutMode === "tabs"
                ? "bg-slate-850 text-white border border-slate-700/60 shadow"
                : "text-slate-500 hover:text-slate-300"
            }`}
            title="Focus on a single page tab cleanly"
          >
            <LayoutList size={13} />
            <span className="hidden sm:inline">Clean Tab Focus</span>
          </button>
          
          <button
            type="button"
            onClick={() => setLayoutMode("dashboard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              layoutMode === "dashboard"
                ? "bg-slate-850 text-white border border-slate-700/60 shadow"
                : "text-slate-500 hover:text-slate-300"
            }`}
            title="Show all panels side-by-side (Ideal for widescreen displays)"
          >
            <LayoutGrid size={13} />
            <span className="hidden sm:inline">Multi-Panel Grid</span>
          </button>
        </div>

      </div>

      {/* 🔮 Dashboard Layout Grid */}
      <main className={`flex-1 grid overflow-hidden ${
        layoutMode === "dashboard"
          ? "grid-cols-1 lg:grid-cols-12 h-[calc(100vh-121px)]"
          : "grid-cols-1 h-[calc(100vh-121px)]"
      }`}>
        
        {/* ========================================================= */}
        {/* PANEL 1: AI Chat Assistant */}
        {/* ========================================================= */}
        {(layoutMode === "dashboard" || activeMainTab === "chat") && (
          <section 
            id="chat-assistant-panel" 
            className={`flex flex-col bg-slate-900/45 overflow-hidden h-full ${
              layoutMode === "dashboard" ? "lg:col-span-4 border-r border-slate-800/70" : "col-span-1"
            }`}
          >
          {/* Chat Panel Title */}
          <div className="px-5 py-4 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-500/10 text-purple-400 rounded-lg">
                <Sparkles size={16} />
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">Chat & Generate</span>
            </div>
            <button
              type="button"
              onClick={handleClearChat}
              className="text-xs text-slate-500 hover:text-red-400 transition-colors font-semibold flex items-center gap-1"
              title="Reset chat logging"
            >
              <Trash2 size={13} />
              <span>Clear</span>
            </button>
          </div>

          {/* Quick Suggestions Shelf */}
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800/50 flex gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <button 
              type="button"
              onClick={() => handleSendChat(undefined, "Build a dynamic retro stopwatch in HTML with start and lap functions using Tailwind CSS.")}
              className="flex-shrink-0 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors rounded-lg font-medium"
            >
              ⏱️ Stopwatch Game
            </button>
            <button 
              type="button"
              onClick={() => handleSendChat(undefined, "Write a Python script that calculates matrix statistics and prints structural analysis of sales data.")}
              className="flex-shrink-0 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors rounded-lg font-medium"
            >
              📊 Python Log parser
            </button>
            <button 
              type="button"
              onClick={() => handleSendChat(undefined, "Build an elegant, interactive color palette scheme generator in HTML.")}
              className="flex-shrink-0 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors rounded-lg font-medium"
            >
              🎨 Theme generator
            </button>
            <button 
              type="button"
              onClick={() => handleSendChat(undefined, "Write a JavaScript benchmark that compares standard loops with Map/Filter operations.")}
              className="flex-shrink-0 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors rounded-lg font-medium"
            >
              ⚡ JS Benchmark
            </button>
          </div>

          {/* Chat Bubbles Scroll Pane */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col gap-1.5 max-w-[90%] ${
                  msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                {/* Bubble role label */}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                  <span className="font-bold uppercase tracking-wider">
                    {msg.role === "user" ? "You" : "AI Assistant"}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Bubble body container */}
                <div 
                  className={`rounded-2xl p-4 shadow-md ${
                    msg.role === "user" 
                      ? "bg-indigo-600/90 text-white rounded-tr-none border border-indigo-500/20" 
                      : "bg-slate-900/90 text-slate-200 rounded-tl-none border border-slate-800/80"
                  }`}
                >
                  {renderMessageContent(msg.content)}
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
                  <span>Drafting code and organizing sandbox workspace...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Form Area */}
          <form onSubmit={handleSendChat} className="p-4 bg-slate-900 border-t border-slate-800/80 flex flex-col gap-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask to write code or build interactive apps..."
                className="w-full pl-4 pr-12 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 text-white"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isThinking}
                className="absolute right-2 px-3 py-1.5 bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold rounded-lg text-xs transition-colors hover:bg-indigo-500"
              >
                Send
              </button>
            </div>
            <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
              <span>Supports HTML, Python, & JavaScript generation</span>
              <span className="font-mono">Gemini 3.5 Flash Model</span>
            </div>
          </form>
          </section>
        )}

        {/* ========================================================= */}
        {/* PANEL 2: File Explorer & Code Editor */}
        {/* ========================================================= */}
        {(layoutMode === "dashboard" || activeMainTab === "files") && (
          <section 
            id="workspace-editor-panel" 
            className={`flex flex-col bg-slate-950 h-full overflow-hidden ${
              layoutMode === "dashboard" ? "lg:col-span-4 border-r border-slate-800/70" : "col-span-1"
            }`}
          >
          
          {/* File Explorer Header */}
          <div className="px-5 py-4 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderCode size={16} className="text-indigo-400" />
              <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">Workspace Files</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              {/* ZIP import uploader (hidden input) */}
              <input
                type="file"
                ref={zipInputRef}
                onChange={handleZipFileChange}
                accept=".zip"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => zipInputRef.current?.click()}
                disabled={isImportingZip}
                className="p-1.5 bg-slate-800 hover:bg-purple-600/20 hover:text-purple-400 text-slate-300 rounded-lg transition-colors border border-slate-700/50 flex items-center gap-1 text-xs font-bold cursor-pointer"
                title="Import files from a ZIP archive"
              >
                {isImportingZip ? (
                  <span className="w-3.5 h-3.5 border border-white border-t-transparent animate-spin rounded-full"></span>
                ) : (
                  <FolderArchive size={14} />
                )}
                <span>Import ZIP</span>
              </button>

              {/* Create new file action */}
              <button
                type="button"
                onClick={() => setIsCreatingFile(!isCreatingFile)}
                className="p-1.5 bg-slate-800 hover:bg-indigo-600/20 hover:text-indigo-400 text-slate-300 rounded-lg transition-colors border border-slate-700/50 flex items-center gap-1 text-xs font-bold cursor-pointer"
                title="Create custom file snippet"
              >
                <Plus size={14} />
                <span>New</span>
              </button>
            </div>
          </div>

          {/* Sub-header Tabs for Local vs Google Drive */}
          <div className="flex border-b border-slate-800 bg-slate-900/60 text-[11px] font-mono select-none">
            <button
              type="button"
              onClick={() => setExplorerTab("local")}
              className={`flex-1 py-2.5 text-center font-bold border-b-2 transition-all ${
                explorerTab === "local"
                  ? "border-indigo-500 text-white bg-slate-950/20"
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
              }`}
            >
              💻 Local Sandbox ({files.length})
            </button>
            <button
              type="button"
              onClick={() => setExplorerTab("drive")}
              className={`flex-1 py-2.5 text-center font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                explorerTab === "drive"
                  ? "border-purple-500 text-white bg-slate-950/20"
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
              }`}
            >
              <Cloud size={12} className={explorerTab === "drive" ? "text-purple-400 animate-pulse" : ""} />
              Google Drive Sync
            </button>
          </div>

          {explorerTab === "local" ? (
            <>
              {/* ZIP status notifications */}
              {zipSuccessMessage && (
                <div className="p-3 bg-emerald-600/15 border-b border-emerald-500/20 text-xs text-emerald-400 font-medium font-mono animate-fade-in">
                  ✅ {zipSuccessMessage}
                </div>
              )}
              {zipError && (
                <div className="p-3 bg-red-600/15 border-b border-red-500/20 text-xs text-red-400 font-medium font-mono animate-fade-in">
                  ⚠️ {zipError}
                </div>
              )}
              {/* New File Inline Form Container */}
              {isCreatingFile && (
                <form onSubmit={handleCreateFileSubmit} className="p-4 bg-slate-900 border-b border-slate-800 space-y-3 animate-fade-in">
                  <div className="text-xs font-bold text-slate-400 font-mono">CREATE FILE SNIPPET</div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-mono block">FILE NAME (e.g., test.js, run.py)</label>
                    <input
                      type="text"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      placeholder="e.g., utils.js"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500 font-mono block mb-1">LANGUAGE</label>
                      <select
                        value={newFileLang}
                        onChange={(e) => setNewFileLang(e.target.value as Language)}
                        className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 font-mono focus:outline-none"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="html">HTML Layout</option>
                      </select>
                    </div>
                    <div className="flex items-end gap-1">
                      <button
                        type="button"
                        onClick={() => setIsCreatingFile(false)}
                        className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg text-xs font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* File Lists shelf */}
              <div className="p-3 border-b border-slate-800/40 bg-slate-900/30">
                <input
                  type="text"
                  value={fileSearch}
                  onChange={(e) => setFileSearch(e.target.value)}
                  placeholder="Search files..."
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-slate-950">
                {filteredFiles.map((file) => {
                  const isSelected = file.id === activeFileId;
                  const isLinked = !!importedFilesMap[file.id];
                  
                  return (
                    <div
                      key={file.id}
                      onClick={() => setActiveFileId(file.id)}
                      className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                        isSelected 
                          ? "bg-indigo-600/15 border border-indigo-500/20 text-white font-medium" 
                          : "hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* File language badge color */}
                        <div className={`p-1.5 rounded-lg ${
                          file.language === "html" 
                            ? "bg-purple-500/10 text-purple-400" 
                            : file.language === "python"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-yellow-500/10 text-yellow-400"
                        }`}>
                          <FileCode size={14} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold font-mono truncate">{file.name}</span>
                            {isLinked && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Synced with Google Drive"></span>
                            )}
                          </div>
                          <div className="text-[9px] text-slate-500 truncate font-mono uppercase">{file.language} file</div>
                        </div>
                      </div>

                      {/* Delete button */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.id, file.name);
                          }}
                          className="p-1 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                          title="Delete file"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {filteredFiles.length === 0 && (
                  <div className="p-6 text-center text-slate-600 text-xs">
                    No workspace files found matching filter.
                  </div>
                )}
              </div>

              {/* Quick template seeds */}
              <div className="p-4 bg-slate-900 border-t border-slate-800/80 space-y-2">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">WORKSPACE TEMPLATES</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => loadTemplate("game")}
                    className="p-2 bg-slate-950 hover:bg-purple-500/10 border border-slate-800 hover:border-purple-500/30 transition-all rounded-xl text-left"
                  >
                    <div className="text-[11px] font-bold text-white">🎮 Tic-Tac-Toe</div>
                    <div className="text-[9px] text-slate-500 font-mono">HTML + Tailwind</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => loadTemplate("timer")}
                    className="p-2 bg-slate-950 hover:bg-indigo-500/10 border border-slate-800 hover:border-indigo-500/30 transition-all rounded-xl text-left"
                  >
                    <div className="text-[11px] font-bold text-white">⏱️ Pomodoro</div>
                    <div className="text-[9px] text-slate-500 font-mono">HTML Layout</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => loadTemplate("sort")}
                    className="p-2 bg-slate-950 hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/30 transition-all rounded-xl text-left"
                  >
                    <div className="text-[11px] font-bold text-white">🐍 Bubble Sort</div>
                    <div className="text-[9px] text-slate-500 font-mono">Python Script</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => loadTemplate("matrix")}
                    className="p-2 bg-slate-950 hover:bg-yellow-500/10 border border-slate-800 hover:border-yellow-500/30 transition-all rounded-xl text-left"
                  >
                    <div className="text-[11px] font-bold text-white">⚡ Matrix Terminal</div>
                    <div className="text-[9px] text-slate-500 font-mono">JS Simulation</div>
                  </button>
                </div>
              </div>
            </>
          ) : (
            // ==========================================
            // GOOGLE DRIVE SYNC PANEL
            // ==========================================
            <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
              {!driveUser ? (
                /* Drive Not Logged In View */
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-5 animate-fade-in">
                  <div className="p-4 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 animate-pulse-slow">
                    <Cloud size={32} />
                  </div>
                  <div className="space-y-1.5 max-w-xs">
                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Connect Google Drive</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Securely link your Google account to fetch files, backup workspace codes, or export files to Drive.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDriveLogin}
                    disabled={isFetchingDrive}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-purple-600/20 border border-purple-400/20 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    {isFetchingDrive ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></span>
                    ) : (
                      <Cloud size={14} />
                    )}
                    <span>{isFetchingDrive ? "Connecting..." : "Sign in with Google"}</span>
                  </button>
                  {driveError && (
                    <p className="text-[10px] text-red-400 bg-red-950/20 px-3 py-1.5 rounded-lg border border-red-900/30 max-w-xs truncate">
                      ⚠️ {driveError}
                    </p>
                  )}
                </div>
              ) : (
                /* Drive Logged In Panel */
                <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
                  {/* Connected Profile Area */}
                  <div className="p-3 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      {driveUser.photoURL ? (
                        <img
                          src={driveUser.photoURL}
                          alt="Google Profile"
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full border border-purple-500/30"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-xs">
                          {driveUser.email?.charAt(0).toUpperCase() || "G"}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-slate-200 truncate">{driveUser.displayName || "Google User"}</div>
                        <div className="text-[9px] text-slate-500 font-mono truncate">{driveUser.email}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleDriveLogout}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Disconnect Google Drive"
                    >
                      <LogOut size={14} />
                    </button>
                  </div>

                  {/* Sync status alert notification */}
                  {driveSyncStatus && (
                    <div className="px-4 py-2 bg-indigo-500/10 border-b border-indigo-500/20 text-[10px] text-indigo-300 font-semibold flex items-center gap-2 animate-fade-in">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                      <span className="truncate">{driveSyncStatus}</span>
                    </div>
                  )}

                  {/* Operational Sync Toolbar */}
                  <div className="p-3 bg-slate-900/40 border-b border-slate-800/60 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleSaveActiveToDrive}
                      className="py-2 px-2.5 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 hover:border-purple-500/40 transition-all rounded-xl text-left flex flex-col justify-between h-[68px] cursor-pointer"
                    >
                      <Upload size={16} className="text-purple-400" />
                      <div>
                        <div className="text-[10px] font-bold text-white">Save Current File</div>
                        <div className="text-[8px] text-slate-400 truncate">Upload {activeFile.name}</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={handleExportAllToDrive}
                      disabled={isExportingDrive}
                      className="py-2 px-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 hover:border-indigo-500/40 transition-all rounded-xl text-left flex flex-col justify-between h-[68px] cursor-pointer"
                    >
                      <FolderOpen size={16} className="text-indigo-400" />
                      <div>
                        <div className="text-[10px] font-bold text-white">Export All (ZIP)</div>
                        <div className="text-[8px] text-slate-400 truncate">
                          {isExportingDrive ? "Zipping..." : "Package full sandbox"}
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Google Drive Search Bar */}
                  <div className="p-3 bg-slate-900/20 border-b border-slate-800/60 flex items-center gap-2">
                    <input
                      type="text"
                      value={driveSearch}
                      onChange={(e) => setDriveSearch(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleRefreshDriveFiles()}
                      placeholder="Search Drive files..."
                      className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                    />
                    <button
                      type="button"
                      onClick={handleRefreshDriveFiles}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-lg transition-all cursor-pointer"
                      title="Refresh file list"
                    >
                      <RefreshCw size={13} className={isFetchingDrive ? "animate-spin" : ""} />
                    </button>
                  </div>

                  {/* Drive Files list */}
                  <div className="flex-1 overflow-y-auto p-2 bg-slate-950 space-y-1">
                    {driveError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[11px] text-red-300">
                        ⚠️ Error: {driveError}
                      </div>
                    )}

                    {isFetchingDrive && driveFiles.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 text-xs flex flex-col items-center gap-2 font-mono">
                        <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent animate-spin rounded-full"></div>
                        <span>Scanning Google Drive metadata...</span>
                      </div>
                    ) : driveFiles.length === 0 ? (
                      <div className="p-8 text-center text-slate-600 text-xs font-mono space-y-1">
                        <div>No files found on Google Drive.</div>
                        <p className="text-[10px] text-slate-700">Click Save Current File to upload your first workspace snippet!</p>
                      </div>
                    ) : (
                      driveFiles.map((driveFile) => {
                        const isImported = Object.values(importedFilesMap).includes(driveFile.id);
                        
                        return (
                          <div
                            key={driveFile.id}
                            className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-900 hover:border-slate-800 hover:bg-slate-900/40 transition-all"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-400">
                                <FileCode size={14} />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold font-mono text-slate-200 truncate flex items-center gap-1.5">
                                  <span className="truncate">{driveFile.name}</span>
                                  {isImported && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Imported in workspace"></span>
                                  )}
                                </div>
                                <div className="text-[9px] text-slate-500 font-mono">
                                  {formatBytes(driveFile.size)} • {new Date(driveFile.modifiedTime).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleImportDriveFile(driveFile)}
                              className="px-2 py-1 bg-slate-900 group-hover:bg-purple-600/20 hover:!bg-purple-600 hover:!text-white border border-slate-800 hover:border-purple-500/30 text-slate-400 hover:text-slate-200 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                            >
                              Import
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
        )}

        {/* ========================================================= */}
        {/* PANEL 3: Dual Execution Panel & Canvas Runner */}
        {/* ========================================================= */}
        {(layoutMode === "dashboard" || activeMainTab === "editor") && (
          <section 
            id="interactive-editor-preview-panel" 
            className={`flex flex-col bg-slate-900 overflow-hidden h-full ${
              layoutMode === "dashboard" ? "lg:col-span-4" : "col-span-1"
            }`}
          >
          
          {/* Active file Code edit pane & Live results panel */}
          <div className="flex-1 flex flex-col min-h-[50%] border-b border-slate-800/80">
            {/* Editor file tabs header */}
            <div className="bg-slate-950 border-b border-slate-800 flex items-center justify-between overflow-hidden">
              {/* Horizontal scrollable row of tabs */}
              <div className="flex-1 flex items-center overflow-x-auto scrollbar-none border-r border-slate-800/80">
                {files.map((f) => {
                  const isActive = f.id === activeFileId;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveFileId(f.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-xs font-mono border-r border-slate-800/50 transition-all select-none ${
                        isActive
                          ? "bg-slate-900 text-white font-bold border-b-2 border-indigo-500"
                          : "text-slate-500 hover:text-slate-300 bg-slate-950/40 hover:bg-slate-900/10"
                      }`}
                    >
                      <div className={`p-0.5 rounded-sm ${
                        f.language === "html" 
                          ? "text-purple-400" 
                          : f.language === "python"
                            ? "text-emerald-400"
                            : "text-yellow-400"
                      }`}>
                        <FileCode size={12} />
                      </div>
                      <span className="truncate max-w-[120px]">{f.name}</span>
                    </button>
                  );
                })}
                
                {/* Quick Add file tab */}
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingFile(true);
                    if (layoutMode === "tabs") {
                      setActiveMainTab("files");
                    }
                  }}
                  className="p-3 text-slate-500 hover:text-indigo-400 hover:bg-slate-900/30 transition-all flex items-center justify-center border-r border-slate-800/50"
                  title="Create new file snippet"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Action Buttons on the right of the tab row */}
              <div className="px-4 py-2 flex items-center gap-3">
                {/* Save status */}
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                  {saveStatus === "saving" && <span className="text-indigo-400 animate-pulse">saving...</span>}
                  {saveStatus === "saved" && <span className="text-slate-600">✓ saved</span>}
                </div>
                {/* Run button */}
                <button
                  type="button"
                  onClick={handleExecuteScript}
                  disabled={isExecuting}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeFile.language === "html"
                      ? "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/15"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/15"
                  }`}
                >
                  {activeFile.language === "html" ? <Monitor size={12} /> : <Play size={12} />}
                  <span>{activeFile.language === "html" ? "Show Preview" : isExecuting ? "Executing..." : "Run Script"}</span>
                </button>
              </div>
            </div>

            {/* Code Textarea editor panel */}
            <div className="flex-1 relative flex font-mono text-xs">
              {/* Fake gutter line numbers */}
              <div className="bg-slate-950/60 text-slate-600 p-3 select-none text-right border-r border-slate-900/80 text-[11px] font-mono leading-relaxed space-y-0.5">
                {activeFile.code.split("\n").map((_, lineIdx) => (
                  <div key={lineIdx} className="min-h-[1.1rem]">{lineIdx + 1}</div>
                ))}
              </div>
              <textarea
                value={activeFile.code}
                onChange={handleCodeChange}
                placeholder="// Write or paste your code snippet here..."
                className="flex-1 w-full p-3 bg-slate-950/30 text-slate-300 focus:outline-none focus:ring-0 resize-none font-mono text-[11px] leading-relaxed select-text"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Dual Sandbox result view tab bar */}
          <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setRunMode("preview")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  runMode === "preview" 
                    ? "bg-slate-800 text-white shadow" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Monitor size={12} />
                <span>Web Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setRunMode("terminal")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  runMode === "terminal" 
                    ? "bg-slate-800 text-white shadow" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <TerminalIcon size={12} />
                <span>Terminal Output</span>
              </button>
            </div>

            {runMode === "terminal" && (
              <button
                type="button"
                onClick={() => setExecResult({ stdout: "", stderr: "", status: "idle" })}
                className="text-[10px] font-semibold text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear Terminal
              </button>
            )}
          </div>

          {/* Live sandbox result representation frame */}
          <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden relative">
            
            {/* Mode A: Interactive Web Preview (via srcDoc) */}
            {runMode === "preview" && (
              <div className="flex-1 flex flex-col bg-white">
                {activeFile.language === "html" ? (
                  <iframe
                    title="Sandbox Web Preview"
                    srcDoc={activeFile.code}
                    className="w-full h-full border-0 bg-slate-900 select-text"
                    sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
                  />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-950 space-y-3">
                    <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
                      <Monitor size={24} />
                    </div>
                    <div className="text-sm font-bold text-white">Active File is not HTML</div>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                      Select <strong>index.html</strong> or click "Templates" to load a responsive web-view template, then interact with it here!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const htmlF = files.find(f => f.language === "html");
                        if (htmlF) setActiveFileId(htmlF.id);
                      }}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 transition-all rounded-lg border border-slate-700/50 text-xs font-semibold text-white"
                    >
                      Switch to HTML File
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mode B: Python / Node.js script Execution Terminal */}
            {runMode === "terminal" && (
              <div className="flex-1 flex flex-col bg-slate-950 font-mono text-xs overflow-hidden">
                {/* Console Log Panel */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 select-text scrollbar-thin">
                  {execResult.status === "idle" && (
                    <div className="text-slate-600 italic animate-fade-in">
                      Terminal is idle. Select an executable script (JavaScript or Python file) and click <strong>"Run Script"</strong> to begin process execution.
                    </div>
                  )}

                  {execResult.status === "running" && (
                    <div className="flex items-center gap-2 text-indigo-400 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                      <span>$ executing sandbox binary execution container...</span>
                    </div>
                  )}

                  {/* Stdout Output Stream */}
                  {execResult.stdout && (
                    <pre className="text-slate-200 whitespace-pre-wrap font-mono leading-relaxed select-text animate-fade-in">
                      {execResult.stdout}
                    </pre>
                  )}

                  {/* Stderr Output Stream */}
                  {execResult.stderr && (
                    <pre className="text-red-400 whitespace-pre-wrap font-mono leading-relaxed select-text bg-red-950/20 p-3 rounded-lg border border-red-900/30">
                      {execResult.stderr}
                    </pre>
                  )}

                  {/* Failure errors */}
                  {execResult.error && (
                    <div className="p-3.5 bg-red-500/10 border border-red-500/25 rounded-xl flex items-start gap-3 text-red-300">
                      <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-red-400" />
                      <div>
                        <div className="font-bold">Execution Error Status:</div>
                        <div className="text-[11px] leading-relaxed mt-1 font-mono">{execResult.error}</div>
                      </div>
                    </div>
                  )}

                  {/* Success metrics bar */}
                  {execResult.status !== "idle" && execResult.status !== "running" && (
                    <div className="pt-3 border-t border-slate-900 text-[11px] text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                      <span>• Execution: <strong className="text-slate-400 font-bold uppercase">{execResult.status}</strong></span>
                      {execResult.executionTimeMs !== undefined && (
                        <span>• Duration: <strong className="text-slate-400 font-bold">{execResult.executionTimeMs}ms</strong></span>
                      )}
                      <span>• Memory Limit: <strong className="text-slate-400 font-bold">128MB</strong></span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          </section>
        )}

      </main>

      {/* 🌌 Interactive Onboarding & Tutorial Guide Popup */}
      {showTutorial && (
        <div id="tutorial-overlay" className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none animate-fade-in">
          <div className="bg-slate-900/95 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col relative animate-scale-up">
            
            {/* Top Glow bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
            
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={handleCloseTutorial}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-slate-800/80 rounded-full transition-colors"
              title="Close Tutorial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body */}
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              
              {/* Header Status / Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                  Sandbox Tutorial Guide • Step {tutorialStep} of 4
                </span>
              </div>

              {/* Step Dynamic Rendering */}
              <div className="flex-1 space-y-6 min-h-[280px]">
                {tutorialStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="p-3.5 bg-purple-600/20 text-purple-400 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/10">
                        <Sparkles size={24} className="text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-white tracking-tight">AI Code Sandbox V1.4 Pro</h3>
                        <p className="text-xs text-slate-500">High-Performance Multilingual Environment</p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Welcome to your full-scale prototyping and system scaffolding environment! This application is designed to help you construct fully-fledged codebases.
                    </p>

                    <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase">✨ Next-Gen Systems & HDC Ready</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Optimized to define, test, and ladder sophisticated scripts including **Next.js web setups**, **Nest.js server configurations**, and advanced mathematics like **Hyperdimensional Computing (HDC/VSA)**, global numerical mesh tensor networks, and hyperbolic graphs.
                      </p>
                    </div>
                  </div>
                )}

                {tutorialStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="p-3.5 bg-blue-600/20 text-blue-400 rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-500/10">
                        <Code size={24} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-white tracking-tight">Chat & Scaffolding Workspace</h3>
                        <p className="text-xs text-slate-500">Conversational Blueprint Generator</p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Interact directly with the AI Assistant using the chat panel. Ask the AI to build widgets, full scripts, or directory configurations (e.g. <code className="text-purple-300 bg-slate-950 px-1 py-0.5 rounded font-mono text-xs">"Create a Python NumPy HDC reasoning library"</code>).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
                        <span className="text-xs font-bold text-white block">📂 Instant Load File</span>
                        <span className="text-[11px] text-slate-400 block leading-relaxed">Click the <strong>"Load File"</strong> button on any generated code block to load it directly into your workspace.</span>
                      </div>
                      <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
                        <span className="text-xs font-bold text-white block">⚡ Direct Execution</span>
                        <span className="text-[11px] text-slate-400 block leading-relaxed">Click <strong>"Run Now"</strong> to execute server-side scripts immediately inside the terminal sandbox!</span>
                      </div>
                    </div>
                  </div>
                )}

                {tutorialStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="p-3.5 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
                        <Monitor size={24} className="text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-white tracking-tight">Split Preview & Sandbox Console</h3>
                        <p className="text-xs text-slate-500">Interactive Web Apps & Script Execution</p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Toggle the run views dynamically using the top control bar in the execution pane:
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex gap-3 items-start">
                        <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded font-mono text-xs mt-0.5">Interactive Preview</span>
                        <p className="text-xs text-slate-400 flex-1 leading-relaxed">
                          Renders fully interactive HTML markup with standard client scripts and dynamic Tailwind UI layouts instantly in real-time.
                        </p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded font-mono text-xs mt-0.5">Terminal Console</span>
                        <p className="text-xs text-slate-400 flex-1 leading-relaxed">
                          Fires up sandboxed secure Node.js and Python processes directly on our container cluster to execute calculations, print metrics, and view real console output.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {tutorialStep === 4 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="p-3.5 bg-emerald-600/20 text-emerald-400 rounded-2xl border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                        <Download size={24} className="text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-white tracking-tight">Mock Repo & Zip Download</h3>
                        <p className="text-xs text-slate-500">Scaffold Locally, Run Online</p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Build nested file directory maps mirroring a standard GitHub repository (such as React, Nest.js, Next.js setups).
                    </p>

                    <div className="bg-slate-950/85 rounded-xl p-4 border border-slate-800/80 space-y-2 text-xs text-slate-400 leading-relaxed">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <FolderCode size={14} className="text-indigo-400" />
                        <span>Offline Scaffold Deployment Pattern:</span>
                      </div>
                      <ol className="list-decimal pl-4 space-y-1 font-mono text-[11px] text-slate-300">
                        <li>Instruct AI to construct a project framework directory ladder</li>
                        <li>Export your workspace using the zip download function</li>
                        <li>Unpack on a local drive (thumb drive, cloud backup, or SD Card)</li>
                        <li>Push files to your remote GitHub repo and execute cleanly</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress and controls footer */}
              <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                
                {/* Dots */}
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setTutorialStep(step)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        tutorialStep === step ? "bg-purple-500 w-6" : "bg-slate-700 hover:bg-slate-600"
                      }`}
                      title={`Go to step ${step}`}
                    />
                  ))}
                </div>

                {/* Control buttons */}
                <div className="flex gap-2">
                  {tutorialStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setTutorialStep(prev => prev - 1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all border border-slate-700/50"
                    >
                      Back
                    </button>
                  )}

                  {tutorialStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => setTutorialStep(prev => prev + 1)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-purple-600/10"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCloseTutorial}
                      className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold rounded-xl transition-all shadow-lg shadow-purple-600/25 border border-purple-400/20"
                    >
                      Got It, Let's Code!
                    </button>
                  )}
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* 🚀 Simple status footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 px-6 py-2 flex flex-wrap items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Docker execution container: <strong>Active</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <span>Storage: <strong>Local Workspace Saved</strong></span>
          <span>Security Engine: <strong>Sandboxed Sandbox Isolator</strong></span>
        </div>
      </footer>
    </div>
  );
}
