import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Neura Learn" },
      { name: "description", content: "Get in touch with the Neura Learn team. We usually reply within one business day." },
      { property: "og:title", content: "Contact Neura Learn" },
      { property: "og:description", content: "Questions, feedback, partnerships — we'd love to hear from you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [loading, setLoading] = useState(false);

  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-mesh" />
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Contact</span>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Let's <span className="text-gradient">talk</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Questions, feedback or partnerships — the Neura Learn team is here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4 md:col-span-1">
            {[
              { Icon: Mail, t: "Email", d: "hello@learniq.app" },
              { Icon: MessageSquare, t: "Live chat", d: "Mon–Fri, 9am–6pm" },
              { Icon: MapPin, t: "Office", d: "San Francisco · Bengaluru" },
            ].map((c) => (
              <div key={c.t} className="flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-soft">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-white">
                  <c.Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{c.t}</div>
                  <div className="text-sm text-muted-foreground">{c.d}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            className="rounded-3xl border bg-white p-6 shadow-soft md:col-span-2 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                toast.success("Message sent — we'll be in touch soon!");
                (e.target as HTMLFormElement).reset();
              }, 800);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Jane Doe" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jane@example.com" required className="mt-1.5" />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" required className="mt-1.5" />
            </div>
            <div className="mt-4">
              <Label htmlFor="msg">Message</Label>
              <Textarea id="msg" rows={6} placeholder="Tell us a bit more…" required className="mt-1.5" />
            </div>
            <Button type="submit" disabled={loading} className="mt-6 w-full bg-gradient-primary text-white shadow-elegant sm:w-auto">
              {loading ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </section>
    </MarketingLayout>
  );
}
