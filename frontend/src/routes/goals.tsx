import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "Goals — Neura Learn" },
      { name: "description", content: "Set outcomes. Neura Learn breaks them into daily action steps." },
      { property: "og:title", content: "Goals — Neura Learn" },
      { property: "og:description", content: "Turn ambitions into daily action." },
    ],
  }),
  component: Goals,
});

type Goal = { id: string; title: string; description: string | null; due_date: string | null; progress: number; milestones_total: number; milestones_done: number };

function Goals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [milestones, setMilestones] = useState(5);

  useEffect(() => {
    if (!user) return;
    supabase.from("goals").select("*").order("created_at", { ascending: false }).then(({ data }) => setGoals(data ?? []));
  }, [user]);

  const create = async () => {
    if (!user || !title.trim()) return;
    const { data, error } = await supabase.from("goals").insert({
      user_id: user.id, title, due_date: due || null, milestones_total: milestones, progress: 0, milestones_done: 0,
    }).select().single();
    if (error) { toast.error(error.message); return; }
    setGoals((g) => [data, ...g]);
    setOpen(false); setTitle(""); setDue(""); setMilestones(5);
  };

  const bump = async (g: Goal) => {
    const done = Math.min(g.milestones_done + 1, g.milestones_total);
    const progress = g.milestones_total ? Math.round((done / g.milestones_total) * 100) : 0;
    setGoals((all) => all.map((x) => (x.id === g.id ? { ...x, milestones_done: done, progress } : x)));
    await supabase.from("goals").update({ milestones_done: done, progress }).eq("id", g.id);
  };

  const remove = async (id: string) => {
    setGoals((g) => g.filter((x) => x.id !== id));
    await supabase.from("goals").delete().eq("id", id);
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Goals"
        title="What you're chasing"
        description="Big outcomes, broken into small daily wins."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-white"><Plus className="mr-2 h-4 w-4" /> New goal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create a goal</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ace calculus final" className="mt-1.5" /></div>
                <div><Label>Due date</Label><Input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="mt-1.5" /></div>
                <div><Label>Milestones</Label><Input type="number" min={1} max={50} value={milestones} onChange={(e) => setMilestones(Number(e.target.value))} className="mt-1.5" /></div>
              </div>
              <DialogFooter><Button onClick={create} className="bg-gradient-primary text-white">Create goal</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {goals.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border bg-card p-12 text-center shadow-soft">
          <div>
            <Target className="mx-auto h-8 w-8 text-primary" />
            <div className="mt-2 text-lg font-semibold">No goals yet</div>
            <p className="mt-1 text-sm text-muted-foreground">Set your first outcome — Neura Learn will help you get there.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {goals.map((g, i) => (
            <motion.div key={g.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group rounded-2xl border bg-card p-6 shadow-soft transition-shadow hover:shadow-elegant">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary text-white"><Target className="h-5 w-5" /></div>
                {g.due_date && <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">Due {new Date(g.due_date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{g.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{g.milestones_total} milestones · {g.milestones_done} done</p>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs font-medium"><span>Progress</span><span className="text-primary">{g.progress}%</span></div>
                <Progress value={g.progress} className="h-2" />
              </div>
              <div className="mt-5 flex gap-2">
                <Button onClick={() => bump(g)} size="sm" className="bg-gradient-primary text-white" disabled={g.milestones_done >= g.milestones_total}>Mark milestone done</Button>
                <Button onClick={() => remove(g.id)} size="sm" variant="outline" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
