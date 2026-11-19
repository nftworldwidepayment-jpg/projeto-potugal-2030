"use client";

import { useEffect, useState } from "react";

/**
 * Devolve o identificador da secção visível no centro do ecrã.
 * Quando várias secções se sobrepõem (p. ex. secções aninhadas),
 * prevalece a última na ordem indicada. Fora de qualquer secção
 * (p. ex. no rodapé), mantém a última secção conhecida.
 */
export function useActiveSection(sectionIds: readonly string[], enabled = true): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = sectionIds.join("|");

  useEffect(() => {
    if (!enabled) return;

    const ids = key.split("|");
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = [...ids].reverse().find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, enabled]);

  return enabled ? activeId : null;
}
