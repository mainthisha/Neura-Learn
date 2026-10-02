import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

export function AppShell({ children }: { children?: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="hidden md:flex">
        <AppSidebar />
      </div>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <AppSidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar onMenu={() => setMobileOpen(true)} />
        <main className="min-w-0 flex-1 p-4 md:p-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
