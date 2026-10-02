import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Bot, User as UserIcon, Plus, Loader2 } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { chatCompletion } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Tutor Chat — Neura Learn" },
      { name: "description", content: "Chat with your personal AI tutor. Ask anything, learn faster." },
      { property: "og:title", content: "AI Chat — Neura Learn" },
      { property: "og:description", content: "Your 24/7 AI tutor is here to help." },
    ],
  }),
  component: Chat,
});

type Msg = { role: "user" | "assistant"; content: string };
type Session = { id: string; title: string };

const suggestions = [
  "Explain gradient descent in simple terms",
  "Give me a 10-question quiz on Kinematics",
  "Summarize World War II in 200 words",
  "Create flashcards for cellular respiration",
];

function Chat() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("chat_sessions").select("id, title").order("updated_at", { ascending: false });
      setSessions(data ?? []);
      if (data && data.length > 0) setActiveId(data[0].id);
    })();
  }, [user]);

  useEffect(() => {
    if (!activeId) { setMessages([]); return; }
    (async () => {
      const { data } = await supabase.from("chat_messages").select("role, content").eq("session_id", activeId).order("created_at");
      setMessages((data ?? []).filter((m) => m.role !== "system").map((m) => ({ role: m.role as "user" | "assistant", content: m.content })));
    })();
  }, [activeId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const newChat = async () => {
    if (!user) return;
    const { data, error } = await supabase.from("chat_sessions").insert({ user_id: user.id, title: "New chat" }).select("id, title").single();
    if (error) { toast.error(error.message); return; }
    setSessions((s) => [data, ...s]);
    setActiveId(data.id);
    setMessages([]);
  };

  const send = async (text: string) => {
    if (!text.trim() || !user || sending) return;
    let sessionId = activeId;
    if (!sessionId) {
      const { data, error } = await supabase.from("chat_sessions").insert({ user_id: user.id, title: text.slice(0, 40) }).select("id, title").single();
      if (error) { toast.error(error.message); return; }
      sessionId = data.id;
      setSessions((s) => [data, ...s]);
      setActiveId(data.id);
    } else if (messages.length === 0) {
      await supabase.from("chat_sessions").update({ title: text.slice(0, 40) }).eq("id", sessionId);
      setSessions((s) => s.map((x) => (x.id === sessionId ? { ...x, title: text.slice(0, 40) } : x)));
    }

    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setSending(true);
    await supabase.from("chat_messages").insert({ session_id: sessionId, user_id: user.id, role: "user", content: text });

    try {
      const { content } = await chatCompletion({ data: { messages: next } });
      const aiMsg: Msg = { role: "assistant", content };
      setMessages((m) => [...m, aiMsg]);
      await supabase.from("chat_messages").insert({ session_id: sessionId, user_id: user.id, role: "assistant", content });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "AI request failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden rounded-2xl border bg-card p-4 shadow-soft lg:block">
          <Button onClick={newChat} className="w-full bg-gradient-primary text-white shadow-soft">
            <Plus className="mr-2 h-4 w-4" /> New chat
          </Button>
          <div className="mt-4 space-y-1">
            {sessions.length === 0 && <div className="px-3 py-2 text-xs text-muted-foreground">No chats yet</div>}
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`block w-full truncate rounded-lg px-3 py-2 text-left text-sm ${
                  s.id === activeId ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:bg-secondary/60"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex h-[calc(100vh-9rem)] flex-col overflow-hidden rounded-2xl border bg-card shadow-soft">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Neura Learn Tutor</div>
                <div className="text-xs text-muted-foreground">Online · adaptive to your level</div>
              </div>
            </div>
            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <Sparkles className="h-4 w-4 text-primary" /> Powered by Neura Learn AI
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.length === 0 && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-primary text-white"><Bot className="h-4 w-4" /></div>
                <div className="max-w-[75%] rounded-2xl bg-secondary px-4 py-3 text-sm shadow-soft">
                  Hi 👋 I'm your AI tutor. What would you like to learn today?
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-primary text-white"><Bot className="h-4 w-4" /></div>
                )}
                <div className={`max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-soft ${
                  m.role === "user" ? "bg-gradient-primary text-white" : "bg-secondary text-foreground"
                }`}>
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary"><UserIcon className="h-4 w-4" /></div>
                )}
              </motion.div>
            ))}
            {sending && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-primary text-white"><Bot className="h-4 w-4" /></div>
                <div className="rounded-2xl bg-secondary px-4 py-3 text-sm shadow-soft"><Loader2 className="h-4 w-4 animate-spin" /></div>
              </div>
            )}
          </div>

          {messages.length === 0 && (
            <div className="border-t px-5 py-3">
              <div className="mb-2 text-xs font-semibold text-muted-foreground">Suggestions</div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t p-3">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" className="flex-1" disabled={sending} />
            <Button type="submit" disabled={sending} className="bg-gradient-primary text-white">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
