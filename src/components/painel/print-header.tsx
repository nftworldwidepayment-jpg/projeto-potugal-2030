"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/site";

const noopSubscribe = () => () => {};

/** Cabeçalho que só aparece no relatório impresso (ou em PDF). */
export function PrintHeader({ note }: { note?: string }) {
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().toLocaleDateString("pt-PT"),
    () => "",
  );

  return (
    <div className="hidden border-b border-line-strong pb-4 print:block">
      <p className="text-xs font-semibold text-steel">{siteConfig.name}</p>
      <p className="mt-1 text-lg font-semibold text-navy">Relatório de diagnóstico</p>
      <p className="text-xs text-muted">
        Emitido a {today}
        {note && ` · ${note}`}
      </p>
    </div>
  );
}
