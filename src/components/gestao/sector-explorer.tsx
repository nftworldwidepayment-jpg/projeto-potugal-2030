"use client";

import Link from "next/link";
import { ChevronRight, FileSpreadsheet, Search, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Card, CardHeader, ScoreBar } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { toast } from "@/components/ui/toast";
import { downloadCsv, formatDate } from "@/lib/csv";
import { dimensions, levelFor, levelHelp, levels, sectorShort, sizeShort } from "@/lib/model";
import { companyRows, regions, sectorMatrix, type CompanyRow } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { heatColors, heatFor } from "./heat";

type SortKey = "potencial-desc" | "potencial-asc" | "nome" | "data";

const sortLabels: Record<SortKey, string> = {
  "potencial-desc": "Potencial (maior primeiro)",
  "potencial-asc": "Potencial (menor primeiro)",
  nome: "Nome",
  data: "Diagnóstico mais recente",
};

const selectClass =
  "min-h-10 w-full rounded-lg border border-line bg-white px-2.5 text-[16px] text-ink focus:border-steel focus:outline-none sm:text-sm";

export function SectorExplorer() {
  const [sector, setSector] = useState("");
  const [region, setRegion] = useState("");
  const [level, setLevel] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("potencial-desc");
  const listRef = useRef<HTMLElement>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = companyRows.filter(
      (row) =>
        (!sector || row.company.profile.sector === sector) &&
        (!region || row.company.region === region) &&
        (!level || levelFor(row.realized) === level) &&
        (!q || row.company.profile.name.toLowerCase().includes(q)),
    );
    const sorted = [...filtered];
    if (sort === "potencial-desc") sorted.sort((a, b) => b.realized - a.realized);
    if (sort === "potencial-asc") sorted.sort((a, b) => a.realized - b.realized);
    if (sort === "nome") sorted.sort((a, b) => a.company.profile.name.localeCompare(b.company.profile.name, "pt"));
    if (sort === "data") sorted.sort((a, b) => b.company.assessedOn.localeCompare(a.company.assessedOn));
    return sorted;
  }, [sector, region, level, query, sort]);

  const pickSector = (value: string) => {
    setSector((current) => (current === value ? "" : value));
    const list = listRef.current;
    if (list && list.getBoundingClientRect().top > window.innerHeight * 0.6) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const filtersActive = !!(sector || region || level || query);

  const exportList = () => {
    downloadCsv(
      "carteira-de-empresas.csv",
      ["Empresa", "Setor", "Dimensão", "Região", "Data do diagnóstico", "Potencial realizado", "Nível", ...dimensions.map((d) => d.title), "Ações no plano", "Ações concluídas"],
      rows.map((row) => [
        row.company.profile.name,
        row.company.profile.sector,
        row.company.profile.size,
        row.company.region,
        formatDate(row.company.assessedOn),
        row.realized,
        levelFor(row.realized),
        ...row.summary.dimensions.map((d) => d.score ?? ""),
        row.company.plan.length,
        row.done,
      ]),
    );
    toast(`Lista exportada (${rows.length} ${rows.length === 1 ? "empresa" : "empresas"}).`);
  };

  return (
    <>
      <Card aria-labelledby="mapa-titulo">
        <CardHeader
          id="mapa-titulo"
          title={
            <span className="inline-flex items-center gap-1.5">
              Mapa de calor: setor × dimensão
              <InfoTooltip
                label="Mapa de calor"
                text={`Média das empresas de cada setor em cada dimensão, de 0 a 100. Quanto mais escura a célula, maior o potencial realizado. ${levelHelp}`}
              />
            </span>
          }
          description="Toque num setor para filtrar a lista de empresas."
        />
        <div className="px-2 pt-2 pb-3 sm:px-4">
          <table className="w-full table-fixed border-separate border-spacing-1 text-sm">
            <thead>
              <tr className="text-xs text-muted">
                <th scope="col" className="w-[6.75rem] px-1 py-1 text-left font-medium sm:w-44 lg:w-56">
                  Setor
                </th>
                {dimensions.map((d) => (
                  <th key={d.id} scope="col" className="py-1 text-center font-medium">
                    <abbr title={d.title} className="no-underline sm:hidden">
                      {d.letter}
                    </abbr>
                    <span className="hidden sm:inline">{d.shortTitle}</span>
                  </th>
                ))}
                <th scope="col" className="py-1 text-center font-semibold text-ink">
                  Global
                </th>
              </tr>
            </thead>
            <tbody>
              {sectorMatrix.map((row) => {
                const selected = sector === row.sector;
                return (
                  <tr key={row.sector}>
                    <th scope="row" className="p-0 text-left font-normal">
                      <button
                        type="button"
                        onClick={() => pickSector(row.sector)}
                        aria-pressed={selected}
                        className={cn(
                          "flex min-h-10 w-full items-center justify-between gap-2 rounded-md px-2 text-left text-sm transition-colors",
                          selected ? "bg-navy text-white" : "text-ink hover:bg-surface",
                        )}
                      >
                        <span className="truncate font-medium" title={`${row.short}: ${row.count} empresas`}>
                          {row.short}
                        </span>
                        <span className={cn("hidden text-xs tabular-nums sm:inline", selected ? "text-white/70" : "text-muted")}>
                          {row.count}
                        </span>
                      </button>
                    </th>
                    {dimensions.map((d) => {
                      const value = row.byDimension[d.id];
                      const color = heatFor(value);
                      return (
                        <td
                          key={d.id}
                          title={`${row.short} · ${d.shortTitle}: ${value} (${levelFor(value)})`}
                          className="h-10 rounded-md text-center font-semibold tabular-nums"
                          style={{ backgroundColor: color.bg, color: color.text }}
                        >
                          {value}
                        </td>
                      );
                    })}
                    <td
                      title={`${row.short} · Global: ${row.overall} (${levelFor(row.overall)})`}
                      className="h-10 rounded-md text-center font-bold tabular-nums ring-2 ring-white ring-inset"
                      style={{ backgroundColor: heatFor(row.overall).bg, color: heatFor(row.overall).text }}
                    >
                      {row.overall}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 px-1 text-xs text-muted" aria-label="Legenda">
            {levels.map((l, i) => (
              <li key={l.label} className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-3 rounded-sm" style={{ backgroundColor: heatColors[i].bg }} />
                {l.label} ({l.min} a {l.max})
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card aria-labelledby="lista-titulo" ref={listRef} className="scroll-mt-4">
        <CardHeader
          id="lista-titulo"
          title="Empresas da carteira"
          description={`${rows.length} de ${companyRows.length} empresas`}
          action={
            <button
              type="button"
              onClick={exportList}
              disabled={rows.length === 0}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-navy ring-1 ring-line transition-colors ring-inset hover:bg-surface disabled:opacity-40"
            >
              <FileSpreadsheet aria-hidden="true" className="size-4" />
              Excel
              <span className="sr-only">: exportar a lista de empresas em CSV</span>
            </button>
          }
        />

        <div className="grid grid-cols-2 gap-2 border-b border-line px-4 py-3 sm:px-5 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
          <label className="relative col-span-2 lg:col-span-1">
            <span className="sr-only">Pesquisar empresa</span>
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar empresa"
              className={cn(selectClass, "pl-9")}
            />
          </label>
          <label>
            <span className="sr-only">Setor</span>
            <select value={sector} onChange={(e) => setSector(e.target.value)} className={selectClass}>
              <option value="">Todos os setores</option>
              {sectorMatrix.map((s) => (
                <option key={s.sector} value={s.sector}>
                  {s.short}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Região</span>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass}>
              <option value="">Todas as regiões</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Nível</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass}>
              <option value="">Todos os níveis</option>
              {levels.map((l) => (
                <option key={l.label} value={l.label}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Ordenar por</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectClass}>
              {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {sortLabels[key]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtersActive && (
          <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-2 text-xs sm:px-5">
            <span className="text-muted">Filtros:</span>
            {sector && <FilterChip label={sectorShort[sector] ?? sector} onClear={() => setSector("")} />}
            {region && <FilterChip label={region} onClear={() => setRegion("")} />}
            {level && <FilterChip label={level} onClear={() => setLevel("")} />}
            {query && <FilterChip label={`"${query}"`} onClear={() => setQuery("")} />}
            <button
              type="button"
              onClick={() => {
                setSector("");
                setRegion("");
                setLevel("");
                setQuery("");
              }}
              className="ml-auto inline-flex min-h-8 items-center font-medium text-steel hover:text-navy"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {rows.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted">Nenhuma empresa corresponde aos filtros.</p>
        ) : (
          <>
            <CompanyTable rows={rows} />
            <CompanyCards rows={rows} />
          </>
        )}
      </Card>
    </>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-mist py-0.5 pr-1 pl-2.5 font-medium text-navy">
      {label}
      <button
        type="button"
        onClick={onClear}
        className="inline-flex size-6 items-center justify-center rounded-full hover:bg-white"
      >
        <X aria-hidden="true" className="size-3.5" />
        <span className="sr-only">Remover filtro {label}</span>
      </button>
    </span>
  );
}

function CompanyTable({ rows }: { rows: CompanyRow[] }) {
  return (
    <div className="hidden md:block">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs text-muted">
            <th scope="col" className="px-5 py-2.5 font-medium">Empresa</th>
            <th scope="col" className="px-3 py-2.5 font-medium">Região</th>
            <th scope="col" className="w-56 px-3 py-2.5 font-medium">Potencial realizado</th>
            <th scope="col" className="px-3 py-2.5 font-medium">Dimensão mais fraca</th>
            <th scope="col" className="px-3 py-2.5 font-medium">Plano</th>
            <th scope="col" className="px-3 py-2.5 font-medium">Diagnóstico</th>
            <th scope="col" className="w-10 px-3 py-2.5">
              <span className="sr-only">Abrir</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={row.company.id} className="group transition-colors hover:bg-surface/70">
              <td className="px-5 py-3">
                <Link href={`/gestao/empresas/${row.company.id}`} className="font-medium text-ink hover:text-navy hover:underline">
                  {row.company.profile.name}
                </Link>
                <p className="text-xs text-muted">
                  {sectorShort[row.company.profile.sector]} · {sizeShort(row.company.profile.size)}
                </p>
              </td>
              <td className="px-3 py-3 text-muted">{row.company.region}</td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 text-right font-semibold text-navy tabular-nums">{row.realized}</span>
                  <ScoreBar value={row.realized} className="flex-1" />
                </div>
                <p className="mt-0.5 pl-[2.375rem] text-xs whitespace-nowrap text-muted">{levelFor(row.realized)}</p>
              </td>
              <td className="px-3 py-3 text-ink">{row.weakestDimension}</td>
              <td className="px-3 py-3 text-muted tabular-nums">
                {row.done}/{row.company.plan.length} concluídas
              </td>
              <td className="px-3 py-3 text-muted tabular-nums">{formatDate(row.company.assessedOn)}</td>
              <td className="px-3 py-3">
                <Link
                  href={`/gestao/empresas/${row.company.id}`}
                  aria-label={`Abrir o painel de ${row.company.profile.name}`}
                  className="inline-flex size-8 items-center justify-center rounded-lg text-steel-soft group-hover:text-navy"
                >
                  <ChevronRight aria-hidden="true" className="size-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompanyCards({ rows }: { rows: CompanyRow[] }) {
  return (
    <ul className="divide-y divide-line md:hidden">
      {rows.map((row) => (
        <li key={row.company.id}>
          <Link
            href={`/gestao/empresas/${row.company.id}`}
            className="flex items-center gap-3 px-4 py-3 transition-colors active:bg-surface"
          >
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-lg text-sm font-semibold tabular-nums"
              style={{ backgroundColor: heatFor(row.realized).bg, color: heatFor(row.realized).text }}
            >
              {row.realized}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink">{row.company.profile.name}</span>
              <span className="block truncate text-xs text-muted">
                {sectorShort[row.company.profile.sector]} · {row.company.region} · {levelFor(row.realized)}
              </span>
              <span className="block text-xs text-muted">
                Mais fraca: {row.weakestDimension} · Plano {row.done}/{row.company.plan.length}
              </span>
            </span>
            <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-steel-soft" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
