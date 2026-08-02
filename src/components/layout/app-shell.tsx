import { Headphones, PackageSearch, ShoppingBag } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface AppShellProps {
  readonly children: ReactNode;
}

function OrdersLink() {
  return (
    <Link
      href="/"
      aria-current="page"
      className="bg-muted text-foreground focus-visible:ring-focus flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold outline-none focus-visible:ring-2"
    >
      <PackageSearch aria-hidden="true" className="size-5" />
      Orders
    </Link>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-muted/50 text-foreground min-h-screen overflow-x-hidden">
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground sr-only z-50 rounded-md px-4 py-3 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <header className="border-border bg-surface border-b">
        <div className="mx-auto flex min-h-16 max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3 font-semibold">
            <span className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl">
              <ShoppingBag aria-hidden="true" className="size-5" />
            </span>
            <span>Shop Admin</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Headphones aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Support operations</span>
          </div>
        </div>
        <nav aria-label="Mobile navigation" className="px-4 pb-3 md:hidden">
          <OrdersLink />
        </nav>
      </header>
      <div className="mx-auto flex max-w-screen-2xl">
        <aside className="border-border bg-surface hidden w-64 shrink-0 border-r p-4 md:block">
          <p className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wide uppercase">
            Workspace
          </p>
          <nav aria-label="Primary navigation">
            <OrdersLink />
          </nav>
        </aside>
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 px-4 py-8 outline-none sm:px-6 lg:px-8"
        >
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
