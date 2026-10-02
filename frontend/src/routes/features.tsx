import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Brain, MessageSquare, Calendar, Zap, BookOpen, BarChart3, Target,
  Notebook, GraduationCap, Sparkles, ShieldCheck, Layers,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Neura Learn" },
      { name: "description", content: "Explore every Neura Learn feature: AI tutor chat, adaptive study planner, quiz generator, smart flashcards, notes, goals and progress tracking." },
      { property: "og:title", content: "Features — Neura Learn" },
      { property: "og:description", content: "One AI workspace for planning, studying, practicing and tracking progress." },
    ],
  }),
  component: FeaturesPage,
});

const groups = [
  {
    title: "Learn",
    items: [
      { Icon: MessageSquare, name: "AI Tutor Chat", desc: "Ask anything. Get patient, contextual answers." },
      { Icon: Notebook, name: "Smart Notes", desc: "Capture, summarize and re-use in a click." },
      { Icon: BookOpen, name: "AI Flashcards", desc: "Spaced repetition tuned to your recall." },
    ],
  },
  {
    title: "Plan",
    items: [
      { Icon: Calendar, name: "Study Planner", desc: "Adaptive weekly plans built around your life." },
      { Icon: Target, name: "Goal Coaching", desc: "Break outcomes into daily steps." },
      { Icon: Layers, name: "Curriculum Builder", desc: "Turn any topic into a full syllabus." },
    ],
  },
  {
    title: "Practice",
    items: [
      { Icon: Zap, name: "Quiz Generator", desc: "Instant quizzes on any topic, any difficulty." },
      { Icon: GraduationCap, name: "Exam Prep", desc: "Mock tests with detailed explanations." },
      { Icon: Sparkles, name: "Weak-spot Drills", desc: "Focus practice where it counts." },
    ],
  },
  {
    title: "Track",
    items: [
      { Icon: BarChart3, name: "Progress Analytics", desc: "Mastery, streaks, momentum, at a glance." },
      { Icon: Brain, name: "Insight Reports", desc: "AI-written weekly reviews of your learning." },
      { Icon: ShieldCheck, name: "Private by Design", desc: "Your data stays yours. Always." },
    ],
  },
];

function FeaturesPage() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-mesh" />
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            One workspace for the way you actually <span className="text-gradient">learn</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Plan, learn, practice and track — Neura Learn brings every part of studying together with AI at the core.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-primary text-white shadow-elegant">
              <Link to="/register">Try Neura Learn free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/dashboard">Explore dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-16 px-4 pb-24 sm:px-6 lg:px-8">
        {groups.map((g, gi) => (
          <div key={g.title}>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-gradient-primary" />
              <h2 className="text-2xl font-bold">{g.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {g.items.map((it, i) => (
                <motion.div
                  key={it.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (gi * 3 + i) * 0.03, duration: 0.5 }}
                  className="group rounded-3xl border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary text-white">
                    <it.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{it.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </MarketingLayout>
  );
}
