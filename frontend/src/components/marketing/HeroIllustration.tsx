import { motion } from "framer-motion";
import { Sparkles, BookOpen, Brain, Target, Zap } from "lucide-react";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Mesh backdrop */}
      <div className="absolute inset-0 rounded-[40%] bg-gradient-soft blur-3xl" />

      {/* Orbit rings */}
      <motion.div
        className="absolute inset-6 rounded-full border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-16 rounded-full border border-accent/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Center card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-gradient-primary shadow-glow"
      >
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/20 backdrop-blur-md animate-pulse-ring">
            <Brain className="h-10 w-10 text-white" strokeWidth={1.6} />
          </div>
        </div>
      </motion.div>

      {/* Floating chips */}
      {[
        { Icon: Sparkles, label: "AI Coach", cls: "top-4 left-8 text-primary", delay: 0 },
        { Icon: BookOpen, label: "Smart Notes", cls: "top-10 right-6 text-secondary-foreground", delay: 0.2 },
        { Icon: Target, label: "Goals", cls: "bottom-12 left-4 text-accent-foreground", delay: 0.4 },
        { Icon: Zap, label: "Quiz", cls: "bottom-6 right-10 text-primary", delay: 0.6 },
      ].map(({ Icon, label, cls, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute glass-strong flex items-center gap-2 rounded-2xl px-3 py-2 shadow-soft ${cls}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + delay, duration: 0.6 }}
        >
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-semibold">{label}</span>
        </motion.div>
      ))}

      {/* Small floaters */}
      <motion.div
        className="absolute right-2 top-1/2 h-3 w-3 rounded-full bg-accent"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-6 bottom-1/3 h-2 w-2 rounded-full bg-primary"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}
