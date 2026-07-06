import express from "express";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: "5mb" }));

// Lazy-loaded Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please set it in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

const systemInstruction = `You are an expert programming assistant and interactive AI sandbox coordinator.
Your goal is to help users write, run, explain, and debug code in JavaScript, Python, and Web Technologies (HTML/CSS/JS).

When you output code blocks, you MUST adhere to these guidelines:
1. Always specify the language tag at the start of code blocks (e.g., \`\`\`html, \`\`\`javascript, \`\`\`python).
2. For interactive UI projects (like calculators, dashboards, games, timers), prefer a single self-contained \`\`\`html code block containing Tailwind CSS (via CDN) and script blocks so the user can immediately preview and interact with it.
3. Make your descriptions concise, highlighting what the code does and how it runs.
4. Ensure code is fully complete, functional, and production-ready. Avoid comments like "// TODO".
5. Create elegant, responsive interfaces using Tailwind CSS classes.
`;

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", pythonAvailable: true });
});

// Execute code on server (JS, Python)
app.post("/api/execute", (req, res) => {
  const { language, code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided for execution." });
  }

  const tempDir = path.join(process.cwd(), "temp_runs");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  let filename = "";
  let command = "";

  const cleanLang = (language || "").toLowerCase().trim();

  if (cleanLang === "javascript" || cleanLang === "js") {
    filename = `run_${Date.now()}_${Math.random().toString(36).substring(7)}.js`;
    command = `node "${path.join(tempDir, filename)}"`;
  } else if (cleanLang === "python" || cleanLang === "py") {
    filename = `run_${Date.now()}_${Math.random().toString(36).substring(7)}.py`;
    command = `python3 "${path.join(tempDir, filename)}"`;
  } else {
    return res.status(400).json({ error: `Language '${language}' is not supported for server-side execution. Use 'javascript' or 'python'.` });
  }

  const filePath = path.join(tempDir, filename);

  fs.writeFile(filePath, code, "utf8", (err) => {
    if (err) {
      console.error("Write Error:", err);
      return res.status(500).json({ error: "Failed to write code to execution sandbox." });
    }

    const startTime = process.hrtime();

    // Limit execution to 4000ms, max output 1MB
    exec(command, { timeout: 4000, maxBuffer: 1024 * 1024 }, (execErr: any, stdout, stderr) => {
      const diff = process.hrtime(startTime);
      const executionTimeMs = Math.round((diff[0] * 1e9 + diff[1]) / 1e6);

      // Clean up file async
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error("Unlink error:", unlinkErr);
      });

      let status = "success";
      let error = "";

      if (execErr) {
        if (execErr.killed) {
          status = "timeout";
          error = "Process timed out. Execution limit is 4 seconds to prevent infinite loops.";
        } else {
          status = "error";
          error = execErr.message;
        }
      }

      res.json({
        stdout: stdout || "",
        stderr: stderr || "",
        status,
        error,
        executionTimeMs,
      });
    });
  });
});

// Chat with Gemini API (Server-side to hide keys)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages payload." });
    }

    const client = getGeminiClient();

    // Map roles: Gemini roles are strictly "user" or "model"
    const geminiContents = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: geminiContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I was unable to formulate a response. Please try again.";
    res.json({
      role: "model",
      content: reply,
    });
  } catch (error: any) {
    console.error("Gemini API server-side error:", error);
    res.status(500).json({
      error: error.message || "An unexpected error occurred during your request with Gemini.",
    });
  }
});

// Vite server setup & routing
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Failed to start server:", err);
});
