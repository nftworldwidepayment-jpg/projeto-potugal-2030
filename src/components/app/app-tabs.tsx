"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ClipboardList, LayoutDashboard, LayoutGrid, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useAssessment } from "@/lib/assessment-store";
import { totalQuestions } from "@/lib/model";
import { portfolioStats } from "@/lib/portfolio";
import { isTabActive, roleFromPath, roleTabs, type AppTab } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<AppTab["icon"], LucideIcon> = {
  geral: LayoutGrid,
  empresa: Building2,
  painel: LayoutDashboard,
  diagnostico: ClipboardList,
};

function useTabs() {
  const pathname = usePathname();
  const role = roleFromPath(pathname);
  return { pathname, tabs: role ? roleTabs[role] : [] };
}

/** Separadores no topo (tablet e desktop). */
export function AppTabs() {
  const { pathname, tabs } = useTabs();
  const { answers } = useAssessment();
  if (tabs.length === 0) return null;

  const badge = (tab: AppTab) => {
    if (tab.icon === "diagnostico") return `${Object.keys(answers).length}/${totalQuestions}`;
    if (tab.icon === "empresa") return String(portfolioStats.companies);
    return null;
  };

  return (
    <nav aria-label="Separadores" className="hidden border-b border-line bg-white sm:block print:hidden">
      <Container>
        <ul className="-mb-px flex gap-2">
          {tabs.map((tab) => {
            const active = isTabActive(tab, pathname, tabs);
            const count = badge(tab);
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
                    {count && (
                      <span className="rounded-full bg-surface px-1.5 py-0.5 text-[11px] font-medium text-muted tabular-nums">
                        {count}
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
  const { pathname, tabs } = useTabs();
  if (tabs.length === 0) return null;

  return (
    <nav
      aria-label="Separadores"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md sm:hidden print:hidden"
    >
      <ul className="grid grid-cols-2">
        {tabs.map((tab) => {
          const active = isTabActive(tab, pathname, tabs);
          const Icon = icons[tab.icon];
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
