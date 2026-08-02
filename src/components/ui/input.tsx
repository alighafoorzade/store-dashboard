import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export function Input({
  className,
  type = "text",
  ...props
}: ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "border-border bg-surface text-foreground placeholder:text-muted-foreground focus-visible:border-focus focus-visible:ring-focus/25 aria-invalid:border-danger aria-invalid:ring-danger/20 h-11 w-full rounded-lg border px-3 text-base shadow-sm outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}
