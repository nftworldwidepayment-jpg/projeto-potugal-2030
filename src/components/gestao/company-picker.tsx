"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { sectorShort } from "@/lib/model";
import { companyRows, sectorMatrix } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { heatFor } from "./heat";

const sortedRows = [...companyRows].sort((a, b) =>
  a.company.profile.name.localeCompare(b.company.profile.name, "pt"),
);

/**
 * Escolha da empresa. Desktop: lista com pesquisa e filtro por setor.
 * Telemóvel e tablet: um seletor simples, como no projeto Santander.
 */
export function CompanyPicker() {
  const selectedId = useSelectedLayoutSegment();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");
  const listRef = useRef<HTMLUListElement>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortedRows.filter(
      (row) =>
        (!sector || row.company.profile.sector === sector) &&
        (!q || row.company.profile.name.toLowerCase().includes(q)),
    );
  }, [query, sector]);

  // Mantém a empresa selecionada visível na lista (sem mexer no scroll da página).
  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!list || !active) return;
    const top = active.offsetTop - list.offsetTop;
    if (top < list.scrollTop || top + active.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = top - (list.clientHeight - active.offsetHeight) / 2;
    }
  }, [selectedId]);

  return (
    <>
      <div className="lg:hidden">
        <label htmlFor="empresa-seletor" className="mb-1.5 block text-xs font-semibold text-muted">
          Empresa
        </label>
        <div className="relative">
          <select
            id="empresa-seletor"
            value={selectedId ?? ""}
            onChange={(e) => router.push(`/gestao/empresas/${e.target.value}`)}
            className="min-h-12 w-full appearance-none rounded-xl border border-line bg-white pr-10 pl-3.5 text-[16px] font-medium text-ink focus:border-steel focus:outline-none"
          >
            {sortedRows.map((row) => (
              <option key={row.company.id} value={row.company.id}>
                {row.company.profile.name} · {row.realized}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted" />
        </div>
      </div>

      <Card aria-label="Empresas da carteira" className="hidden overflow-hidden lg:sticky lg:top-6 lg:block">
        <div className="space-y-2 border-b border-line p-3">
          <label className="relative block">
            <span className="sr-only">Pesquisar empresa</span>
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar empresa"
              className="min-h-10 w-full rounded-lg border border-line bg-white pr-3 pl-9 text-sm text-ink focus:border-steel focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="sr-only">Setor</span>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="min-h-10 w-full rounded-lg border border-line bg-white px-2.5 text-sm text-ink focus:border-steel focus:outline-none"
            >
              <option value="">Todos os setores</option>
              {sectorMatrix.map((s) => (
                <option key={s.sector} value={s.sector}>
                  {s.short}
                </option>
              ))}
            </select>
          </label>
          <p className="px-0.5 text-xs text-muted tabular-nums">
            {rows.length} de {sortedRows.length} empresas
          </p>
        </div>
        <ul ref={listRef} className="max-h-[calc(100dvh-16rem)] divide-y divide-line overflow-y-auto overscroll-contain">
          {rows.map((row) => {
            const active = row.company.id === selectedId;
            const color = heatFor(row.realized);
            return (
              <li key={row.company.id}>
                <Link
                  href={`/gestao/empresas/${row.company.id}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 border-l-2 px-3 py-2.5 transition-colors",
                    active ? "border-navy bg-mist" : "border-transparent hover:bg-surface",
                  )}
                >
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold tabular-nums"
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    {row.realized}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">{row.company.profile.name}</span>
                    <span className="block truncate text-xs text-muted">
                      {sectorShort[row.company.profile.sector]} · {row.company.region}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
          {rows.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">Sem resultados.</li>}
        </ul>
      </Card>
    </>
  );
}
