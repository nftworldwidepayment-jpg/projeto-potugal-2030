"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, type Ref } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { legalNav, platformHref, sectionNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Menu móvel em ecrã inteiro, com o índice de todas as secções.
 * Usa o elemento <dialog> nativo: gere o foco, fecha com Escape (ou com o
 * gesto de voltar no Android) e torna o resto da página inerte.
 */
export function MobileMenu({
  ref,
  activeId,
  onNavigate,
  onClosed,
}: {
  ref: Ref<HTMLDialogElement>;
  activeId: string | null;
  onNavigate: () => void;
  onClosed: () => void;
}) {
  // Fecha o menu se a janela passar para a largura de desktop.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) onNavigate();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [onNavigate]);

  return (
    <dialog
      id="menu-movel"
      ref={ref}
      onClose={onClosed}
      aria-label="Menu de navegação"
      className="pt-safe pb-safe fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overscroll-contain bg-white p-0 text-ink backdrop:bg-navy/20 open:flex open:animate-sheet open:flex-col xl:hidden"
    >
      <div className="px-gutter flex h-16 shrink-0 items-center justify-between border-b border-line">
        <Link
          href="/#inicio"
          onClick={onNavigate}
          aria-label={`${siteConfig.name} — Início`}
          className="-m-2 rounded-md p-2"
        >
          <Logo />
        </Link>
        <button
          type="button"
          onClick={onNavigate}
          className="inline-flex size-11 items-center justify-center rounded-xl text-ink ring-1 ring-line transition-[background-color,scale] ring-inset hover:bg-surface active:scale-95"
        >
          <X aria-hidden="true" className="size-5" />
          <span className="sr-only">Fechar menu</span>
        </button>
      </div>

      <nav aria-label="Secções" className="px-gutter flex-1 overflow-y-auto overscroll-contain py-3">
        <ol>
          {sectionNav.map((item, i) => {
            const active = item.sectionId === activeId;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "-mx-3 flex min-h-14 items-center gap-4 rounded-xl px-3 transition-colors active:bg-surface",
                    active ? "bg-mist" : "hover:bg-surface",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-6 text-sm font-semibold tabular-nums",
                      active ? "text-navy" : "text-steel-soft",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-lg font-medium text-ink">{item.label}</span>
                  {active ? (
                    <span className="rounded-full bg-navy px-2 py-0.5 text-[11px] font-semibold text-white">
                      Está aqui
                    </span>
                  ) : (
                    <ArrowRight aria-hidden="true" className="size-4 text-steel-soft" />
                  )}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="px-gutter shrink-0 border-t border-line pt-5">
        <ButtonLink href={platformHref} onClick={onNavigate} size="lg" withArrow className="w-full">
          Explorar a Plataforma
        </ButtonLink>
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-sm text-muted">{siteConfig.tagline}</p>
          <ul className="flex shrink-0 gap-1">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="inline-flex min-h-11 items-center px-1.5 text-xs text-muted hover:text-navy"
                >
                  {item.shortLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  );
}
