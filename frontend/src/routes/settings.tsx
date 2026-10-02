import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/PageHeader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Neura Learn" },
      { name: "description", content: "Manage your Neura Learn preferences, notifications and account." },
      { property: "og:title", content: "Settings — Neura Learn" },
      { property: "og:description", content: "Control your experience." },
    ],
  }),
  component: Settings,
});

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-soft">
      <h3 className="text-base font-semibold">{title}</h3>
      {desc && <p className="mt-1 text-xs text-muted-foreground">{desc}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function Row({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t pt-4 first:border-0 first:pt-0">
      <div className="min-w-0">
        <div className="text-sm font-medium">{title}</div>
        {desc && <div className="text-xs text-muted-foreground">{desc}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Settings() {
  return (
    <AppShell>
      <PageHeader eyebrow="Settings" title="Preferences" description="Tune Neura Learn to how you learn best." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Notifications" desc="Choose what you'd like to hear about.">
          <Row title="Daily study reminder" desc="A gentle nudge at your preferred time"><Switch defaultChecked /></Row>
          <Row title="Weekly AI review" desc="Get a summary every Sunday"><Switch defaultChecked /></Row>
          <Row title="Streak alerts"><Switch /></Row>
          <Row title="Marketing emails"><Switch /></Row>
        </Section>

        <Section title="Learning preferences">
          <Row title="Preferred difficulty">
            <Select defaultValue="medium">
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row title="Daily target">
            <Select defaultValue="30">
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row title="Focus mode by default"><Switch defaultChecked /></Row>
        </Section>

        <Section title="Appearance">
          <Row title="Theme">
            <Select defaultValue="light">
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row title="Animations"><Switch defaultChecked /></Row>
        </Section>

        <Section title="Danger zone" desc="Irreversible actions.">
          <Row title="Export your data"><Button variant="outline" size="sm">Export</Button></Row>
          <Row title="Delete account" desc="This cannot be undone.">
            <Button variant="destructive" size="sm">Delete</Button>
          </Row>
        </Section>
      </div>
    </AppShell>
  );
}
