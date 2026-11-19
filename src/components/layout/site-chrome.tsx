"use client";

import { usePathname } from "next/navigation";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { sectionNav } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";
import { MobileSectionBar } from "./mobile-section-bar";
import { SiteHeader } from "./site-header";

const sectionIds = sectionNav.map((item) => item.sectionId);

/**
 * Elementos de navegação partilhados: cabeçalho, menu móvel (índice de
 * secções) e barra de secções do telemóvel. Um único estado de "secção
 * atual" alimenta os três.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeId = useActiveSection(sectionIds, isHome);

  const menuRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    menuRef.current?.showModal();
    setMenuOpen(true);
  }, []);
  const closeMenu = useCallback(() => menuRef.current?.close(), []);

  return (
    <>
      <SiteHeader activeId={activeId} menuOpen={menuOpen} onOpenMenu={openMenu} />
      {children}
      {isHome && <MobileSectionBar activeId={activeId} onOpenMenu={openMenu} />}
      <MobileMenu
        ref={menuRef}
        activeId={activeId}
        onNavigate={closeMenu}
        onClosed={() => setMenuOpen(false)}
      />
    </>
  );
}
