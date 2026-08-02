import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface EmptyStateProps {
  readonly action?: ReactNode;
  readonly className?: string;
  readonly description: string;
  readonly icon?: ReactNode;
  readonly title: string;
}

export function EmptyState({
  action,
  className,
  description,
  icon,
  title,
}: EmptyStateProps) {
  return (
    <section
      data-slot="empty-state"
      aria-label={title}
      className={cn(
        "border-border bg-surface flex flex-col items-center rounded-xl border border-dashed p-8 text-center",
        className,
      )}
    >
      {icon ? <div className="text-muted-foreground mb-4">{icon}</div> : null}
      <h2 className="text-foreground text-base font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-1 max-w-md text-sm">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  );
}
