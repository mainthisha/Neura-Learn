import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Users, Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Neura Learn" },
      { name: "description", content: "Neura Learn is on a mission to make personalized learning available to everyone through modern AI and cognitive science." },
      { property: "og:title", content: "About Neura Learn" },
      { property: "og:description", content: "Our mission, story and values." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-mesh" />
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our story</span>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            We believe every learner deserves a <span className="text-gradient">great coach</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Neura Learn started with a simple idea: the best learners have great coaches. AI finally makes personal coaching
            possible for everyone — patient, adaptive, and available 24/7.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { Icon: Heart, t: "Learner-first", d: "Every decision is measured by learner outcomes." },
            { Icon: Sparkles, t: "AI-native", d: "We build with AI at the core, not bolted on." },
            { Icon: Users, t: "Inclusive", d: "Learning tools that work for everyone, everywhere." },
            { Icon: Trophy, t: "Results", d: "We ship features that move real progress." },
          ].map((v, i) => (
            <motion.div
              key={v.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="rounded-3xl border bg-white p-6 shadow-soft"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary text-white">
                <v.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{v.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-primary p-10 text-white shadow-glow md:p-14">
          <h2 className="text-3xl font-bold">Our mission</h2>
          <p className="mt-3 max-w-2xl text-white/85">
            Democratize world-class learning by giving every student, professional and lifelong learner an AI coach
            that meets them exactly where they are.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/register">Join the mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
