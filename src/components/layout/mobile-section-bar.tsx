"use client";

import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { platformHref, sectionNav } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Barra de secções para telemóvel e tablet, ao alcance do polegar.
 * Mostra em que secção está o leitor e quanto já leu; ao tocar, abre o
 * índice de secções. Aparece depois do início e desaparece no fim da página.
 */
export function MobileSectionBar({
  activeId,
  onOpenMenu,
}: {
  activeId: string | null;
  onOpenMenu: () => void;
}) {
  const progress = useScrollProgress();
  const [pastHero, setPastHero] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    // Aparece quando os botões do início saem do ecrã; esconde-se sobre a
    // chamada final e o rodapé, onde já há ações próprias.
    const start = document.querySelector("[data-bar-start]");
    const ends = Array.from(document.querySelectorAll("[data-page-end]"));
    const endsInView = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === start) {
          setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        } else {
          if (entry.isIntersecting) endsInView.add(entry.target);
          else endsInView.delete(entry.target);
          setAtEnd(endsInView.size > 0);
        }
      }
    });
    if (start) observer.observe(start);
    ends.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const index = Math.max(
    0,
    sectionNav.findIndex((item) => item.sectionId === activeId),
  );
  const current = sectionNav[index];
  const visible = pastHero && !atEnd;

  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={cn(
        "px-gutter pb-safe pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-[translate,opacity] duration-300 ease-out xl:hidden",
        visible ? "translate-y-0 opacity-100" : "translate-y-[calc(100%+1rem)] opacity-0",
      )}
    >
      <div className="pointer-events-auto mx-auto flex max-w-md items-center gap-1.5 rounded-2xl border border-line bg-white/90 p-1.5 shadow-panel backdrop-blur-md">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-haspopup="dialog"
          aria-controls="menu-movel"
          className="flex min-h-12 min-w-0 flex-1 items-center gap-3 rounded-xl px-2.5 text-left transition-colors active:bg-surface"
        >
          <ProgressRing value={progress} />
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] leading-tight text-muted tabular-nums">
              Secção {index + 1} de {sectionNav.length}
            </span>
            <span className="block truncate text-sm leading-tight font-semibold text-navy">{current.label}</span>
          </span>
          <ChevronUp aria-hidden="true" className="size-4 shrink-0 text-muted" />
          <span className="sr-only">Abrir o índice de secções</span>
        </button>
        <Link
          href={platformHref}
          aria-label="Explorar a Plataforma"
          className="inline-flex min-h-12 shrink-0 items-center rounded-xl bg-navy px-4 text-sm font-medium text-white transition-[background-color,scale] hover:bg-navy-hover active:scale-[0.97]"
        >
          Explorar
        </Link>
      </div>
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  const radius = 13;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg viewBox="0 0 32 32" className="size-8 shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="16" cy="16" r={radius} fill="none" strokeWidth="3" className="stroke-mist" />
      <circle
        cx="16"
        cy="16"
        r={radius}
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - value)}
        className="stroke-navy transition-[stroke-dashoffset] duration-150"
      />
    </svg>
  );
}
