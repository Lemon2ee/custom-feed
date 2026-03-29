"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cable, BellRing, LayoutDashboard, Newspaper, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/sources", label: "Sources", icon: Cable },
  { href: "/outputs", label: "Outputs", icon: BellRing },
  { href: "/events", label: "Events", icon: Newspaper },
  { href: "/poll-log", label: "Poll Log", icon: ScrollText },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="px-4 py-5">
        <h1 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Custom Feed
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Middleware</p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
