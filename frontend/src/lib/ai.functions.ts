import { supabase } from "@/integrations/supabase/client";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type QuizQuestion = {
  q: string;
  opts: string[];
  correct: number;
};

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

async function getAccessToken(): Promise<string> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Please log in to use AI features.");
  return token;
}

async function request<T>(path: string, payload: unknown): Promise<T> {
  const token = await getAccessToken();
  const response = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json().catch(() => null)) as { detail?: string } | null;
  if (!response.ok) {
    throw new Error(result?.detail || `Backend request failed (${response.status}).`);
  }
  return result as T;
}

export async function chatCompletion({
  data,
}: {
  data: { messages: ChatMessage[] };
}): Promise<{ content: string }> {
  return request<{ content: string }>("/api/chat", data);
}

export async function generateQuiz({
  data,
}: {
  data: { topic: string; difficulty?: "Easy" | "Medium" | "Hard" | "Exam-style"; count?: number };
}): Promise<{ id: string; topic: string; questions: QuizQuestion[] }> {
  return request<{ id: string; topic: string; questions: QuizQuestion[] }>("/api/quiz", data);
}

export async function summarizeNote({
  data,
}: {
  data: { noteId: string; content: string };
}): Promise<{ summary: string }> {
  return request<{ summary: string }>("/api/notes/summarize", data);
}

export async function generateFlashcards({
  data,
}: {
  data: { topic: string; count?: number };
}): Promise<{ deckId: string; count: number }> {
  return request<{ deckId: string; count: number }>("/api/flashcards", data);
}
