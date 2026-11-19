"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, LayoutDashboard } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useAssessment } from "@/lib/assessment-store";
import { totalQuestions } from "@/lib/model";
import { appTabs } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = { "/": LayoutDashboard, "/diagnostico": ClipboardList } as const;

/** Separadores no topo (tablet e desktop). */
export function AppTabs() {
  const pathname = usePathname();
  const { answers } = useAssessment();
  const answered = Object.keys(answers).length;

  return (
    <nav aria-label="Separadores" className="hidden border-b border-line bg-white sm:block print:hidden">
      <Container>
        <ul className="-mb-px flex gap-2">
          {appTabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block border-b-2 px-4 py-3 transition-colors",
                    active
                      ? "border-navy text-navy"
                      : "border-transparent text-muted hover:border-line-strong hover:text-ink",
                  )}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    {tab.label}
                    {tab.href === "/diagnostico" && (
                      <span className="rounded-full bg-surface px-1.5 py-0.5 text-[11px] font-medium text-muted tabular-nums">
                        {answered}/{totalQuestions}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">{tab.description}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}

/** Barra de separadores no fundo do ecrã (telemóvel), ao alcance do polegar. */
export function AppTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Separadores"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md sm:hidden print:hidden"
    >
      <ul className="grid grid-cols-2">
        {appTabs.map((tab) => {
          const active = pathname === tab.href;
          const Icon = icons[tab.href as keyof typeof icons];
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                  active ? "text-navy" : "text-muted",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-14 items-center justify-center rounded-full transition-colors",
                    active && "bg-mist",
                  )}
                >
                  <Icon aria-hidden="true" className="size-5" strokeWidth={active ? 2.25 : 1.75} />
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
