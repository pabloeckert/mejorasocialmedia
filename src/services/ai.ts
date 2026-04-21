// src/services/ai.ts
// Cliente para las Edge Functions de Supabase

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  apikey: SUPABASE_ANON_KEY,
};

// ═══════════════════════════════════════
// AI GATEWAY
// ═══════════════════════════════════════

export async function callAI(params: {
  provider: "groq" | "deepseek" | "gemini";
  model?: string;
  messages: { role: string; content: string }[];
  system?: string;
  temperature?: number;
  max_tokens?: number;
}) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/ai-gateway`, {
    method: "POST",
    headers,
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error en AI Gateway");
  }

  return res.json();
}

export async function generateEmbeddings(texts: string[]) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/ai-gateway`, {
    method: "POST",
    headers,
    body: JSON.stringify({ action: "embed", texts }),
  });

  const data = await res.json();
  return data.embeddings as number[][];
}

// ═══════════════════════════════════════
// ORCHESTRATOR (Mesa de Diálogo)
// ═══════════════════════════════════════

export async function startDialogue(topic: string) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/orchestrator`, {
    method: "POST",
    headers,
    body: JSON.stringify({ action: "start", topic }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error iniciando diálogo");
  }

  return res.json() as Promise<{
    sessionId: string;
    estrategia: string;
    contenido: string;
    evaluacion: { aprobado: boolean; feedback: string };
    proposal: { hook: string; body: string; cta: string; hashtags: string[]; format: string };
    aprobado: boolean;
  }>;
}

export async function continueDialogue(sessionId: string, feedback: string) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/orchestrator`, {
    method: "POST",
    headers,
    body: JSON.stringify({ action: "continue", sessionId, feedback }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error continuando diálogo");
  }

  return res.json() as Promise<{
    contenido: string;
    evaluacion: { aprobado: boolean; feedback: string };
    aprobado: boolean;
  }>;
}

// ═══════════════════════════════════════
// VAULT (Bóveda de Conocimiento)
// ═══════════════════════════════════════

export async function processDocument(documentId: string) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/vault-process`, {
    method: "POST",
    headers,
    body: JSON.stringify({ action: "process", documentId }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error procesando documento");
  }

  return res.json() as Promise<{
    documentId: string;
    chunksCreated: number;
    totalTokens: number;
  }>;
}

export async function searchVault(query: string, limit = 5) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/vault-process`, {
    method: "POST",
    headers,
    body: JSON.stringify({ action: "search", query, limit }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error buscando en bóveda");
  }

  return res.json() as Promise<{ results: string[] }>;
}
