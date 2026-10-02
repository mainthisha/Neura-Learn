import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Sparkles, Loader2, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { summarizeNote } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes — Neura Learn" },
      { name: "description", content: "Smart AI notes that summarize, tag and remix your learning." },
      { property: "og:title", content: "Notes — Neura Learn" },
      { property: "og:description", content: "Capture and summarize learning in one place." },
    ],
  }),
  component: Notes,
});

type Note = { id: string; title: string; content: string; tag: string | null; summary: string | null; updated_at: string };

function Notes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [sel, setSel] = useState<Note | null>(null);
  const [q, setQ] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("notes").select("id, title, content, tag, summary, updated_at").order("updated_at", { ascending: false });
      setNotes(data ?? []);
      if (data && data.length > 0) setSel(data[0]);
    })();
  }, [user]);

  const create = async () => {
    if (!user) return;
    const { data, error } = await supabase.from("notes").insert({ user_id: user.id, title: "Untitled note", content: "", tag: "General" }).select().single();
    if (error) { toast.error(error.message); return; }
    setNotes((n) => [data, ...n]);
    setSel(data);
  };

  const update = async (patch: Partial<Note>) => {
    if (!sel) return;
    const updated = { ...sel, ...patch };
    setSel(updated);
    setNotes((n) => n.map((x) => (x.id === sel.id ? updated : x)));
    await supabase.from("notes").update(patch).eq("id", sel.id);
  };

  const remove = async (id: string) => {
    await supabase.from("notes").delete().eq("id", id);
    const rest = notes.filter((n) => n.id !== id);
    setNotes(rest);
    if (sel?.id === id) setSel(rest[0] ?? null);
  };

  const summarize = async () => {
    if (!sel || !sel.content.trim()) { toast.error("Add content first"); return; }
    setSummarizing(true);
    try {
      const { summary } = await summarizeNote({ data: { noteId: sel.id, content: sel.content } });
      update({ summary });
      toast.success("Summary ready");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Summarize failed");
    } finally {
      setSummarizing(false);
    }
  };

  const filtered = notes.filter((n) => (n.title + " " + n.content).toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell>
      <PageHeader
        eyebrow="Notes"
        title="Your learning library"
        actions={<Button onClick={create} className="bg-gradient-primary text-white"><Plus className="mr-2 h-4 w-4" /> New note</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-2xl border bg-card p-4 shadow-soft">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notes…" className="pl-9" />
          </div>
          <div className="mt-3 space-y-1">
            {filtered.length === 0 && <div className="px-2 py-6 text-center text-xs text-muted-foreground">No notes yet. Create one to get started.</div>}
            {filtered.map((n) => (
              <div key={n.id} className={`group rounded-xl border p-3 transition-all ${sel?.id === n.id ? "border-primary bg-primary/5" : "hover:border-primary/60"}`}>
                <button onClick={() => setSel(n)} className="block w-full text-left">
                  <div className="flex items-center justify-between">
                    <div className="truncate text-sm font-semibold">{n.title}</div>
                    {n.tag && <span className="ml-2 shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-primary">{n.tag}</span>}
                  </div>
                  <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{n.content || "Empty note"}</div>
                </button>
                <button onClick={() => remove(n.id)} className="mt-2 text-[10px] text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100">
                  <Trash2 className="inline h-3 w-3" /> Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {sel ? (
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <Input value={sel.title} onChange={(e) => update({ title: e.target.value })} className="max-w-md border-0 bg-transparent px-0 text-2xl font-bold shadow-none focus-visible:ring-0" />
              <Button onClick={summarize} disabled={summarizing} variant="outline">
                {summarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-primary" />}
                Summarize with AI
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Input value={sel.tag ?? ""} onChange={(e) => update({ tag: e.target.value })} placeholder="Tag" className="h-6 max-w-[120px] rounded-full bg-secondary px-2 py-0 text-[10px] font-medium text-primary" />
            </div>
            <Textarea
              value={sel.content}
              onChange={(e) => update({ content: e.target.value })}
              rows={16}
              className="mt-6 resize-none border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0"
              placeholder="Start writing…"
            />
            {sel.summary && (
              <div className="mt-6 rounded-xl border bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary"><Sparkles className="h-3 w-3" /> AI Summary</div>
                <div className="whitespace-pre-wrap text-sm">{sel.summary}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid place-items-center rounded-2xl border bg-card p-12 text-center shadow-soft">
            <div>
              <div className="text-lg font-semibold">No note selected</div>
              <p className="mt-1 text-sm text-muted-foreground">Create your first note to begin.</p>
              <Button onClick={create} className="mt-4 bg-gradient-primary text-white"><Plus className="mr-2 h-4 w-4" /> New note</Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
