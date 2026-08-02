import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        neutral: "border-border bg-muted text-muted-foreground",
        pending:
          "border-status-pending/30 bg-status-pending/10 text-status-pending",
        processing:
          "border-status-processing/30 bg-status-processing/10 text-status-processing",
        completed:
          "border-status-completed/30 bg-status-completed/10 text-status-completed",
        cancelled:
          "border-status-cancelled/30 bg-status-cancelled/10 text-status-cancelled",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
