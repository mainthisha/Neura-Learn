import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, Calendar, Zap, BookOpen, Notebook,
  BarChart3, Target, User, Settings, LogOut,
} from "lucide-react";
import { Wordmark } from "@/components/brand/Logo";

const items = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/chat", label: "AI Chat", Icon: MessageSquare },
  { to: "/planner", label: "Study Planner", Icon: Calendar },
  { to: "/quiz", label: "Quiz Generator", Icon: Zap },
  { to: "/flashcards", label: "Flashcards", Icon: BookOpen },
  { to: "/notes", label: "Notes", Icon: Notebook },
  { to: "/progress", label: "Progress", Icon: BarChart3 },
  { to: "/goals", label: "Goals", Icon: Target },
  { to: "/profile", label: "Profile", Icon: User },
  { to: "/settings", label: "Settings", Icon: Settings },
] as const;

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r bg-sidebar">
      <div className="flex h-16 items-center px-5">
        <Link to="/"><Wordmark /></Link>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {items.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-gradient-primary text-white shadow-soft"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-primary"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <item.Icon className={`h-4 w-4 ${active ? "text-white" : "text-muted-foreground group-hover:text-foreground"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-3">
        <Link
          to="/login"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
        >
          <LogOut className="h-4 w-4" /> Log out
        </Link>
      </div>
    </aside>
  );
}
