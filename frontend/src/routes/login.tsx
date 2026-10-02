import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { Wordmark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Neura Learn" },
      { name: "description", content: "Log in to your Neura Learn account and continue learning." },
      { property: "og:title", content: "Log in — Neura Learn" },
      { property: "og:description", content: "Access your AI learning workspace." },
    ],
  }),
  component: Login,
});

function Login() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-mesh" />
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:gap-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden lg:block">
          <Link to="/"><Wordmark /></Link>
          <div className="mt-10 rounded-3xl bg-gradient-primary p-10 text-white shadow-glow">
            <Sparkles className="h-8 w-8" />
            <h2 className="mt-6 text-3xl font-bold leading-tight">Welcome back to your AI learning coach.</h2>
            <p className="mt-3 text-white/85">Your streaks, notes, and plans are waiting — pick up right where you left off.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto w-full max-w-md">
          <div className="lg:hidden"><Link to="/"><Wordmark /></Link></div>
          <div className="glass-strong mt-6 rounded-3xl border p-8 shadow-elegant">
            <h1 className="text-2xl font-bold">Log in</h1>
            <p className="mt-1 text-sm text-muted-foreground">Continue your learning journey.</p>
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Input id="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
                  <button type="button" onClick={() => setShow((v) => !v)} className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground" aria-label="Toggle password">
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-white shadow-elegant">
                {loading ? "Signing in…" : (<>Log in <ArrowRight className="ml-2 h-4 w-4" /></>)}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              New to Neura Learn?{" "}
              <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
