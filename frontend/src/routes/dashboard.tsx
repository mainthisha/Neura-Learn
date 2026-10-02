import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, TrendingUp, Flame, Clock, Target, ArrowRight, Calendar,
  MessageSquare, Zap, BookOpen, CheckCircle2, Circle,
} from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/PageHeader";
import { Counter } from "@/components/marketing/Counter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Neura Learn" },
      { name: "description", content: "Your personalized learning dashboard: goals, progress, streaks, and AI recommendations." },
      { property: "og:title", content: "Dashboard — Neura Learn" },
      { property: "og:description", content: "See today's plan, streaks, and AI recommendations." },
    ],
  }),
  component: Dashboard,
});

const weekData = [
  { d: "Mon", m: 42 }, { d: "Tue", m: 58 }, { d: "Wed", m: 30 },
  { d: "Thu", m: 74 }, { d: "Fri", m: 65 }, { d: "Sat", m: 90 }, { d: "Sun", m: 55 },
];
const masteryData = [
  { s: "Math", v: 82 }, { s: "Physics", v: 61 }, { s: "History", v: 44 },
  { s: "Bio", v: 73 }, { s: "CS", v: 91 },
];

function Dashboard() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Welcome back"
        title="Hi Jane 👋"
        description="Here's your learning snapshot for today."
        actions={
          <>
            <Button variant="outline" asChild><Link to="/planner">Open planner</Link></Button>
            <Button asChild className="bg-gradient-primary text-white shadow-soft">
              <Link to="/chat"><Sparkles className="mr-2 h-4 w-4" /> Ask AI</Link>
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: Flame, label: "Day streak", value: 12, suffix: "d", tint: "from-orange-500 to-rose-500" },
          { Icon: Clock, label: "Studied this week", value: 414, suffix: "m", tint: "from-primary to-secondary" },
          { Icon: Target, label: "Weekly goal", value: 84, suffix: "%", tint: "from-emerald-500 to-teal-500" },
          { Icon: TrendingUp, label: "Mastery gained", value: 27, suffix: "pts", tint: "from-fuchsia-500 to-purple-500" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="rounded-2xl border bg-card p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.tint} text-white`}>
                <s.Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
            </div>
            <div className="mt-4 text-3xl font-bold">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Row: chart + today goals */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Study minutes</h2>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">+18% vs last week</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="d" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="m" stroke="#2563EB" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">Today's goals</h2>
            <span className="text-xs text-muted-foreground">3 of 5</span>
          </div>
          <ul className="space-y-3">
            {[
              { t: "Finish Chapter 4 — Calculus", done: true },
              { t: "Complete 20 flashcards", done: true },
              { t: "AI-generated quiz on Kinematics", done: true },
              { t: "Review notes: World War II", done: false },
              { t: "30-minute focused study", done: false },
            ].map((g, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border p-3">
                {g.done
                  ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
                <span className={`text-sm ${g.done ? "text-muted-foreground line-through" : ""}`}>{g.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Row: mastery + AI rec + calendar */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h2 className="text-base font-semibold">Subject mastery</h2>
          <p className="text-xs text-muted-foreground">Based on recent activity</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer>
              <BarChart data={masteryData}>
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="s" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="v" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-6 text-white shadow-glow">
          <Sparkles className="h-6 w-6" />
          <h2 className="mt-4 text-lg font-semibold">Daily AI recommendation</h2>
          <p className="mt-2 text-sm text-white/90">
            You're 12% away from mastering derivatives. Try a 15-min drill focused on chain rule + practice quiz.
          </p>
          <Button className="mt-6 bg-white text-primary hover:bg-white/90" asChild>
            <Link to="/quiz">Start drill <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <div className="mt-8 rounded-2xl bg-white/10 p-4 text-sm">
            <div className="text-xs text-white/70">Quote of the day</div>
            <div className="mt-1 italic">"The expert in anything was once a beginner."</div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">This week</h2>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"].map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }).map((_, i) => {
              const active = [3, 5, 8, 10, 12, 15, 17, 20, 22, 24, 26].includes(i);
              const today = i === 24;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg text-[10px] font-medium ${
                    today
                      ? "bg-gradient-primary text-white shadow-soft"
                      : active
                      ? "bg-primary/15 text-primary"
                      : "bg-secondary text-muted-foreground"
                  } grid place-items-center`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-xs font-semibold text-muted-foreground">Upcoming</div>
            {[
              { t: "Physics mock test", d: "Tomorrow · 10:00" },
              { t: "1:1 with AI coach", d: "Fri · 4:30 PM" },
              { t: "Weekly review", d: "Sun · 8:00 PM" },
            ].map((u) => (
              <div key={u.t} className="flex items-start gap-3 rounded-xl border p-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-gradient-primary" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{u.t}</div>
                  <div className="text-xs text-muted-foreground">{u.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions + progress bars */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-2">
          <h2 className="text-base font-semibold">Continue learning</h2>
          <div className="mt-4 space-y-4">
            {[
              { t: "Calculus — Chapter 4", p: 72, sub: "Derivatives" },
              { t: "World History — Module 3", p: 45, sub: "20th Century" },
              { t: "Data Structures", p: 88, sub: "Trees & Graphs" },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{c.t}</div>
                    <div className="text-xs text-muted-foreground">{c.sub}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary">{c.p}%</div>
                </div>
                <Progress value={c.p} className="mt-3 h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h2 className="text-base font-semibold">Quick actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { to: "/chat", Icon: MessageSquare, label: "AI Chat" },
              { to: "/quiz", Icon: Zap, label: "Quiz" },
              { to: "/flashcards", Icon: BookOpen, label: "Flashcards" },
              { to: "/planner", Icon: Calendar, label: "Plan" },
            ].map(({ to, Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="group flex flex-col items-start gap-3 rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold">{label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
