import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight, Sparkles, Check } from "lucide-react";
import { Wordmark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — Neura Learn" },
      { name: "description", content: "Create your free Neura Learn account and start learning smarter today." },
      { property: "og:title", content: "Sign up — Neura Learn" },
      { property: "og:description", content: "Join learners using Neura Learn every day." },
    ],
  }),
  component: Register,
});

function Register() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: name, role_type: role },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created — welcome to Neura Learn!");
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
            <h2 className="mt-6 text-3xl font-bold leading-tight">Start your smarter learning journey.</h2>
            <ul className="mt-6 space-y-3 text-sm text-white/90">
              {["Free forever plan", "AI tutor, planner, quizzes & flashcards", "Adaptive to your goals", "Cancel anytime"].map((l) => (
                <li key={l} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-white" /> {l}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto w-full max-w-md">
          <div className="lg:hidden"><Link to="/"><Wordmark /></Link></div>
          <div className="glass-strong mt-6 rounded-3xl border p-8 shadow-elegant">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">It only takes a minute.</p>
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pw">Password</Label>
                <div className="relative mt-1.5">
                  <Input id="pw" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                  <button type="button" onClick={() => setShow((v) => !v)} className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground" aria-label="Toggle password">
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label>I am a…</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="lifelong">Lifelong learner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-white shadow-elegant">
                {loading ? "Creating account…" : (<>Create free account <ArrowRight className="ml-2 h-4 w-4" /></>)}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
