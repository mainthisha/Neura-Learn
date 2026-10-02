import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, X, ArrowRight, RotateCcw, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { generateQuiz } from "@/lib/ai.functions";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz Generator — Neura Learn" },
      { name: "description", content: "Turn any topic into an instant quiz with AI, and get feedback that helps you improve." },
      { property: "og:title", content: "Quiz Generator — Neura Learn" },
      { property: "og:description", content: "Instant quizzes on any topic — powered by AI." },
    ],
  }),
  component: Quiz,
});

type Q = { q: string; opts: string[]; correct: number };
const DIFFS = ["Easy", "Medium", "Hard", "Exam-style"] as const;

function Quiz() {
  const { user } = useAuth();
  const [topic, setTopic] = useState("Calculus – Derivatives");
  const [difficulty, setDifficulty] = useState<(typeof DIFFS)[number]>("Medium");
  const [questions, setQuestions] = useState<Q[] | null>(null);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const start = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await generateQuiz({ data: { topic, difficulty, count: 5 } });
      setQuestions(res.questions); setQuizId(res.id);
      setIdx(0); setScore(0); setSelected(null); setAnswered(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Quiz generation failed");
    } finally { setLoading(false); }
  };

  const reset = async () => {
    if (quizId && user && questions) {
      await supabase.from("quiz_attempts").insert({ user_id: user.id, quiz_id: quizId, score, total: questions.length });
    }
    setQuestions(null); setQuizId(null); setSelected(null); setScore(0); setAnswered(false); setIdx(0);
  };

  const q = questions?.[idx];
  const done = questions && idx >= questions.length - 1 && answered;

  return (
    <AppShell>
      <PageHeader eyebrow="Quiz Generator" title="AI-powered practice" description="Type a topic. Get a smart quiz in seconds." />

      {!questions ? (
        <div className="mx-auto max-w-xl rounded-3xl border bg-card p-8 shadow-soft">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-white"><Sparkles className="h-5 w-5" /></div>
          <h2 className="mt-5 text-xl font-semibold">Generate a new quiz</h2>
          <p className="mt-1 text-sm text-muted-foreground">Any topic, any difficulty. AI does the rest.</p>
          <div className="mt-5">
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Photosynthesis" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {DIFFS.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${difficulty === d ? "border-primary bg-primary/10 text-primary" : "hover:border-primary hover:text-primary"}`}
              >
                {d}
              </button>
            ))}
          </div>
          <Button onClick={start} disabled={loading} className="mt-6 w-full bg-gradient-primary text-white shadow-elegant">
            {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…</>) : (<>Generate quiz <ArrowRight className="ml-2 h-4 w-4" /></>)}
          </Button>
        </div>
      ) : done ? (
        <div className="mx-auto max-w-xl rounded-3xl border bg-card p-8 text-center shadow-soft">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-white"><Check className="h-6 w-6" /></div>
          <h2 className="mt-4 text-2xl font-bold">Great job!</h2>
          <p className="mt-1 text-sm text-muted-foreground">You scored</p>
          <div className="mt-2 text-5xl font-bold text-gradient">{score}/{questions.length}</div>
          <Button onClick={reset} className="mt-6 bg-gradient-primary text-white"><RotateCcw className="mr-2 h-4 w-4" /> New quiz</Button>
        </div>
      ) : q ? (
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Question {idx + 1} of {questions.length}</span>
            <span>Topic: {topic}</span>
          </div>
          <Progress value={((idx + (answered ? 1 : 0)) / questions.length) * 100} className="h-2" />
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6 rounded-3xl border bg-card p-6 shadow-soft">
              <h3 className="text-lg font-semibold">{q.q}</h3>
              <div className="mt-5 space-y-3">
                {q.opts.map((opt, i) => {
                  const isCorrect = answered && i === q.correct;
                  const isWrong = answered && selected === i && i !== q.correct;
                  return (
                    <button
                      key={i}
                      disabled={answered}
                      onClick={() => { setSelected(i); setAnswered(true); if (i === q.correct) setScore((s) => s + 1); }}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                        isCorrect ? "border-success bg-success/10 text-foreground" :
                        isWrong ? "border-destructive bg-destructive/10 text-foreground" :
                        selected === i ? "border-primary" : "hover:border-primary"
                      }`}
                    >
                      <span>{opt}</span>
                      {isCorrect && <Check className="h-4 w-4 text-success" />}
                      {isWrong && <X className="h-4 w-4 text-destructive" />}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => { setIdx((n) => n + 1); setSelected(null); setAnswered(false); }}
                    className="bg-gradient-primary text-white"
                    disabled={idx >= questions.length - 1}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : null}
    </AppShell>
  );
}
