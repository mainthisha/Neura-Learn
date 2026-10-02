import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Plus } from "lucide-react";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — Neura Learn" },
      { name: "description", content: "Smart spaced-repetition flashcards that adapt to your recall." },
      { property: "og:title", content: "AI Flashcards — Neura Learn" },
      { property: "og:description", content: "Study smarter with adaptive spaced repetition." },
    ],
  }),
  component: Flashcards,
});

const cards = [
  { q: "Chain rule", a: "d/dx f(g(x)) = f'(g(x)) · g'(x)" },
  { q: "Derivative of ln(x)", a: "1 / x" },
  { q: "Newton's second law", a: "F = m · a" },
  { q: "Photosynthesis equation", a: "6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂" },
];

function Flashcards() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const c = cards[i];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Flashcards"
        title="Calculus & Biology"
        description="Spaced repetition, tuned by AI."
        actions={<Button className="bg-gradient-primary text-white"><Plus className="mr-2 h-4 w-4" /> New deck</Button>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[{ l: "Due today", v: "12" }, { l: "Learned", v: "128" }, { l: "Retention", v: "92%" }].map((s) => (
          <div key={s.l} className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className="mt-1 text-2xl font-bold">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="mb-2 text-xs text-muted-foreground">Card {i + 1} of {cards.length}</div>
        <div
          className="relative h-72 w-full max-w-xl cursor-pointer"
          onClick={() => setFlipped((v) => !v)}
          style={{ perspective: 1200 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i + (flipped ? "b" : "f")}
              initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className={`absolute inset-0 grid place-items-center rounded-3xl border p-8 text-center shadow-elegant ${
                flipped ? "bg-gradient-primary text-white" : "bg-card"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div>
                <div className={`text-xs uppercase tracking-wider ${flipped ? "text-white/70" : "text-muted-foreground"}`}>
                  {flipped ? "Answer" : "Prompt"}
                </div>
                <div className="mt-4 text-2xl font-semibold">{flipped ? c.a : c.q}</div>
                <div className={`mt-6 text-xs ${flipped ? "text-white/70" : "text-muted-foreground"}`}>
                  Tap to {flipped ? "see prompt" : "reveal answer"}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Button variant="outline" onClick={() => { setI((n) => (n - 1 + cards.length) % cards.length); setFlipped(false); }}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setFlipped(false)}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button className="bg-gradient-primary text-white" onClick={() => { setI((n) => (n + 1) % cards.length); setFlipped(false); }}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 flex gap-2">
          {["Again", "Hard", "Good", "Easy"].map((l, k) => (
            <button
              key={l}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium ${
                k === 2 ? "border-success bg-success/10 text-success" : "hover:border-primary hover:text-primary"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
