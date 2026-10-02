import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Brain, Target, MessageSquare, BookOpen, BarChart3,
  Calendar, Zap, Check, Star, Play, ShieldCheck, Rocket, GraduationCap,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroIllustration } from "@/components/marketing/HeroIllustration";
import { Counter } from "@/components/marketing/Counter";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neura Learn — AI Personal Learning Coach" },
      { name: "description", content: "Meet Neura Learn: an AI coach that plans your studies, quizzes you, and keeps you on track. Learn smarter. Achieve faster." },
      { property: "og:title", content: "Neura Learn — Learn Smarter. Achieve Faster." },
      { property: "og:description", content: "AI-powered learning platform with adaptive study plans, quizzes, flashcards, and a personal AI tutor." },
    ],
  }),
  component: Landing,
});

const features = [
  { Icon: MessageSquare, title: "AI Tutor Chat", desc: "24/7 personal tutor that explains any concept in your style." },
  { Icon: Calendar, title: "Smart Study Planner", desc: "Adaptive schedules that fit your goals, energy and calendar." },
  { Icon: Zap, title: "Instant Quizzes", desc: "Turn any topic into a quiz in seconds — with instant feedback." },
  { Icon: BookOpen, title: "AI Flashcards", desc: "Spaced repetition powered by intelligent difficulty tuning." },
  { Icon: BarChart3, title: "Progress Tracker", desc: "See mastery, streaks, weak spots and momentum at a glance." },
  { Icon: Target, title: "Goal Coaching", desc: "Set outcomes — Neura Learn breaks them into daily action steps." },
];

const stats = [
  { value: 250000, suffix: "+", label: "Learners" },
  { value: 1200000, suffix: "+", label: "Questions answered" },
  { value: 98, suffix: "%", label: "Would recommend" },
  { value: 40, suffix: "%", label: "Faster mastery" },
];

const steps = [
  { Icon: Target, title: "Set your goal", desc: "Tell Neura Learn what you want to master and by when." },
  { Icon: Sparkles, title: "Get your plan", desc: "AI builds an adaptive weekly plan tuned to your level." },
  { Icon: GraduationCap, title: "Learn & practice", desc: "Chat, quiz, review — all in one focused workspace." },
  { Icon: Rocket, title: "Achieve faster", desc: "Track streaks, celebrate wins, and level up daily." },
];

const testimonials = [
  { name: "Ananya S.", role: "Med student", quote: "Neura Learn replaced 4 apps. The AI planner alone saved me 10+ hours a week." },
  { name: "Marcus L.", role: "Software engineer", quote: "It's like having a patient senior who quizzes me before every interview." },
  { name: "Priya K.", role: "PhD candidate", quote: "The flashcard system is scary good. My retention doubled in a month." },
];

const faqs = [
  { q: "How is Neura Learn different from ChatGPT?", a: "Neura Learn is purpose-built for learning — with study plans, spaced-repetition flashcards, progress tracking, and adaptive quizzes woven into one workspace." },
  { q: "Do I need to know what to study?", a: "No. Tell it your goal and Neura Learn designs the curriculum, milestones and daily practice for you." },
  { q: "Is there a free plan?", a: "Yes — you can start free and upgrade whenever you want deeper AI features and unlimited practice." },
  { q: "Can I use it on mobile?", a: "Absolutely. Neura Learn works beautifully on desktop, tablet and mobile." },
];

function Landing() {
  return (
    <MarketingLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-mesh" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pt-24 lg:pb-32 lg:px-8">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-primary shadow-soft backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Introducing Neura Learn 2.0 — smarter, faster, adaptive
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Your <span className="text-gradient">AI personal</span> learning coach.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              Neura Learn turns any goal into a personalized study plan — with an AI tutor, adaptive quizzes,
              smart flashcards, and progress tracking that keeps you moving every day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="bg-gradient-primary text-white shadow-elegant hover:opacity-95">
                <Link to="/register">
                  Start learning free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/60 backdrop-blur">
                <Link to="/features">
                  <Play className="mr-2 h-4 w-4" /> See features
                </Link>
              </Button>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> No credit card</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Free forever plan</span>
              <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Loved by 250k+ learners</span>
            </div>
          </div>

          <div className="relative">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border bg-white p-6 shadow-soft md:grid-cols-4 md:p-10">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-gradient sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Everything you need to learn faster</h2>
          <p className="mt-4 text-muted-foreground">
            A complete AI workspace for students, self-learners, and professionals.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-soft transition-shadow hover:shadow-elegant"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-soft opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary text-white shadow-soft">
                  <f.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-3xl bg-gradient-primary p-8 text-white shadow-glow md:grid-cols-2 md:p-14">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Why learners choose Neura Learn</h2>
            <p className="mt-4 max-w-md text-white/85">
              We combine cognitive science with modern AI to make every minute you study count.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { Icon: Brain, t: "Adaptive", d: "Learns your pace and gaps." },
              { Icon: ShieldCheck, t: "Private", d: "Your data stays yours." },
              { Icon: Zap, t: "Fast", d: "Answers, plans and quizzes instantly." },
              { Icon: Rocket, t: "Effective", d: "Real, measurable progress." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="glass rounded-2xl p-4 text-foreground">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-sm font-semibold">{t}</div>
                <div className="text-xs text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING PROCESS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">How it works</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">A simple learning process</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-3xl border bg-white p-6 shadow-soft"
            >
              <div className="absolute -top-3 left-6 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-white">
                Step {i + 1}
              </div>
              <div className="mt-3 grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-primary">
                <s.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Loved worldwide</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">What learners are saying</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-3xl border bg-white p-6 shadow-soft"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 rounded-3xl border bg-white px-4 shadow-soft">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-white shadow-glow md:p-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to learn smarter?</h2>
              <p className="mt-3 max-w-md text-white/85">
                Join 250,000+ learners using Neura Learn every day. Free forever plan — no credit card required.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/register">Create free account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                <Link to="/dashboard">See the dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
