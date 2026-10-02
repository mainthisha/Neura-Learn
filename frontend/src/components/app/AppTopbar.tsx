import { Bell, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function AppTopbar({ onMenu }: { onMenu?: () => void }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const email = user?.email ?? "";
  const name = (user?.user_metadata?.full_name as string) ?? email.split("@")[0] ?? "You";
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const logout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-white/80 px-4 backdrop-blur-md md:px-6">
      <button onClick={onMenu} className="grid h-9 w-9 place-items-center rounded-lg border md:hidden" aria-label="Menu">
        ☰
      </button>
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search topics, notes, quizzes…" className="pl-9" />
      </div>
      <div className="flex flex-1 md:hidden" />
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
          <Link to="/chat"><Sparkles className="mr-2 h-4 w-4 text-primary" /> Ask AI</Link>
        </Button>
        <button className="relative grid h-9 w-9 place-items-center rounded-lg border">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-white shadow-soft">
              {initials || "?"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="font-semibold">{name}</div>
              <div className="text-xs font-normal text-muted-foreground">{email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to="/settings">Settings</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
