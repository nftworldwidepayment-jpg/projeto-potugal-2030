"use client";

import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav, platformHref, siteConfig } from "@/lib/site";

/**
 * Menu móvel baseado no elemento <dialog> nativo: gere o foco,
 * fecha com Escape e torna o resto da página inerte enquanto aberto.
 */
export function MobileNav({ activeId }: { activeId: string | null }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  // Fecha o menu se a janela passar para a largura de desktop.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="menu-movel"
        className="inline-flex size-10 items-center justify-center rounded-lg text-ink ring-1 ring-line transition-colors ring-inset hover:bg-surface xl:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
        <span className="sr-only">Abrir menu</span>
      </button>

      <dialog
        id="menu-movel"
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Menu de navegação"
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-white p-0 text-ink backdrop:bg-navy/20 open:flex open:animate-rise open:flex-col xl:hidden"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
          <Link href="/#inicio" onClick={closeMenu} aria-label={`${siteConfig.name} — Início`}>
            <Logo />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex size-10 items-center justify-center rounded-lg text-ink ring-1 ring-line transition-colors ring-inset hover:bg-surface"
          >
            <X aria-hidden="true" className="size-5" />
            <span className="sr-only">Fechar menu</span>
          </button>
        </div>

        <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-5 py-4 sm:px-8">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  data-active={item.sectionId === activeId || undefined}
                  className="flex items-center justify-between py-4 text-lg font-medium text-ink transition-colors hover:text-navy data-active:text-navy"
                >
                  {item.label}
                  <ChevronRight aria-hidden="true" className="size-5 text-steel-soft" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-line px-5 py-6 sm:px-8">
          <ButtonLink href={platformHref} onClick={closeMenu} size="lg" withArrow className="w-full">
            Explorar a Plataforma
          </ButtonLink>
          <p className="mt-4 text-center text-sm text-muted">{siteConfig.tagline}</p>
        </div>
      </dialog>
    </>
  );
}
