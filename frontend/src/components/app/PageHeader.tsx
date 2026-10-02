import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function PageHeader({
  eyebrow, title, description, actions,
}: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        {eyebrow && <div className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</div>}
        <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </motion.div>
  );
}
