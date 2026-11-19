"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { mainNav, platformHref, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader({
  activeId,
  menuOpen,
  onOpenMenu,
}: {
  activeId: string | null;
  menuOpen: boolean;
  onOpenMenu: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "pt-safe sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-line shadow-[0_1px_12px_-6px_rgb(23_44_72/0.12)]" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 xl:h-[72px]">
        <Link href="/#inicio" aria-label={`${siteConfig.name} — Início`} className="-m-2 rounded-md p-2">
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const active = item.sectionId === activeId;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={active || undefined}
                    className="relative rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-200 hover:text-navy data-active:text-navy"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-navy transition-opacity duration-300",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href={platformHref}>Explorar a Plataforma</ButtonLink>
          </div>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="menu-movel"
            className="inline-flex size-11 items-center justify-center rounded-xl text-ink ring-1 ring-line transition-[background-color,scale] ring-inset hover:bg-surface active:scale-95 xl:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
            <span className="sr-only">Abrir menu</span>
          </button>
        </div>
      </Container>
    </header>
  );
}
