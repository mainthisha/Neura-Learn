import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Neura Learn" },
      { name: "description", content: "Manage your Neura Learn profile and public information." },
      { property: "og:title", content: "Profile — Neura Learn" },
      { property: "og:description", content: "Update your name, avatar and bio." },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <AppShell>
      <PageHeader eyebrow="Profile" title="Your public profile" description="How other learners see you." />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="rounded-2xl border bg-card p-6 text-center shadow-soft">
          <div className="relative mx-auto h-24 w-24">
            <div className="grid h-full w-full place-items-center rounded-full bg-gradient-primary text-2xl font-bold text-white shadow-glow">JD</div>
            <button className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full border bg-white shadow-soft">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h3 className="mt-4 text-lg font-semibold">Jane Doe</h3>
          <p className="text-xs text-muted-foreground">Lifelong learner · Since 2024</p>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            {[{ k: "27", l: "Streak" }, { k: "84", l: "Quizzes" }, { k: "12", l: "Goals" }].map((s) => (
              <div key={s.l} className="rounded-xl bg-secondary p-2">
                <div className="text-sm font-bold text-primary">{s.k}</div>
                <div className="text-[10px] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <form className="rounded-2xl border bg-card p-6 shadow-soft" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fn">First name</Label>
              <Input id="fn" defaultValue="Jane" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="ln">Last name</Label>
              <Input id="ln" defaultValue="Doe" className="mt-1.5" />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="em">Email</Label>
            <Input id="em" type="email" defaultValue="jane@example.com" className="mt-1.5" />
          </div>
          <div className="mt-4">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={4} defaultValue="Curious learner. Loves math, code, and stories." className="mt-1.5" />
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" type="button">Cancel</Button>
            <Button type="submit" className="bg-gradient-primary text-white">Save changes</Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
