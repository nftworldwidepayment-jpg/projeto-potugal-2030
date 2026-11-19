"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useActiveSection } from "@/hooks/use-active-section";
import { mainNav, platformHref, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

const sectionIds = mainNav.map((item) => item.sectionId);

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeId = useActiveSection(sectionIds, isHome);
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
        "sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-line shadow-[0_1px_12px_-6px_rgb(23_44_72/0.12)]" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/#inicio" aria-label={`${siteConfig.name} — Início`} className="rounded-md">
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
          <MobileNav activeId={activeId} />
        </div>
      </Container>
    </header>
  );
}
