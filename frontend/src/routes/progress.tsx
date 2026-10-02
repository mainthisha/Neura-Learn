import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/PageHeader";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis,
} from "recharts";
import { Counter } from "@/components/marketing/Counter";
import { Flame, Clock, Trophy, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Neura Learn" },
      { name: "description", content: "Track mastery, streaks and momentum across every subject." },
      { property: "og:title", content: "Progress — Neura Learn" },
      { property: "og:description", content: "Data-driven insight into your learning." },
    ],
  }),
  component: ProgressPage,
});

const trend = Array.from({ length: 12 }).map((_, i) => ({
  w: `W${i + 1}`, mastery: Math.round(30 + i * 4 + Math.sin(i) * 6),
}));
const radar = [
  { s: "Math", v: 82 }, { s: "Physics", v: 61 }, { s: "History", v: 44 },
  { s: "Bio", v: 73 }, { s: "CS", v: 91 }, { s: "English", v: 68 },
];

function ProgressPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Progress" title="Your learning trajectory" description="Insight into what's working — and what's next." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: Flame, l: "Longest streak", v: 27, s: "d" },
          { Icon: Clock, l: "Total study hours", v: 214, s: "h" },
          { Icon: Trophy, l: "Quizzes passed", v: 84, s: "" },
          { Icon: TrendingUp, l: "Avg. weekly gain", v: 8, s: "%" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-white">
                <s.Icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">{s.l}</span>
            </div>
            <div className="mt-4 text-3xl font-bold"><Counter to={s.v} suffix={s.s} /></div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-2">
          <h2 className="text-base font-semibold">Mastery over time</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <LineChart data={trend}>
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="w" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Line type="monotone" dataKey="mastery" stroke="#2563EB" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h2 className="text-base font-semibold">Subject balance</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <RadarChart data={radar}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="s" fontSize={11} />
                <PolarRadiusAxis stroke="#e2e8f0" fontSize={10} />
                <Radar dataKey="v" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
