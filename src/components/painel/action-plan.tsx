"use client";

import { CalendarDays, ChevronDown, FileSpreadsheet, UserRound, X } from "lucide-react";
import { useId, useSyncExternalStore } from "react";
import { Card, CardHeader, Chip } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { toast } from "@/components/ui/toast";
import { assessmentActions } from "@/lib/assessment-store";
import { downloadCsv, formatDate, slugify } from "@/lib/csv";
import { findArea, recommendationsFor, statusLabels } from "@/lib/model";
import { cn } from "@/lib/utils";
import type { ActionStatus, Answers, PlanItem } from "@/types/diagnostic";

const statuses = Object.keys(statusLabels) as ActionStatus[];

const noopSubscribe = () => () => {};

/** Data de hoje (AAAA-MM-DD), calculada apenas no navegador. */
function useToday(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    },
    () => "",
  );
}

/** Exporta o plano de ação para CSV (Excel). */
export function exportPlanCsv(companyName: string, plan: readonly PlanItem[], answers: Answers) {
  const recs = new Map(recommendationsFor(answers).map((r) => [r.area.id, r]));
  const rows = plan.flatMap((item) => {
    const entry = findArea(item.areaId);
    if (!entry) return [];
    const rec = recs.get(item.areaId);
    return [
      [
        entry.area.action,
        entry.dimension.title,
        entry.area.name,
        rec ? (rec.priority === "alta" ? "Alta" : "Média") : "",
        rec?.timeframe ?? "",
        statusLabels[item.status],
        item.owner ?? "",
        formatDate(item.dueDate),
        item.notes ?? "",
      ],
    ];
  });
  downloadCsv(
    `plano-de-acao-${slugify(companyName || "empresa")}.csv`,
    ["Ação", "Dimensão", "Área", "Prioridade", "Prazo sugerido", "Estado", "Responsável", "Data limite", "Notas"],
    rows,
  );
  toast(`Plano exportado (${rows.length} ${rows.length === 1 ? "ação" : "ações"}).`);
}

export function ActionPlan({
  plan,
  answers,
  companyName,
  readOnly = false,
}: {
  plan: readonly PlanItem[];
  answers: Answers;
  companyName: string;
  /** Sem edição (vista da entidade gestora). */
  readOnly?: boolean;
}) {
  const today = useToday();
  const titleId = useId();
  const timeframeByArea = new Map(recommendationsFor(answers).map((r) => [r.area.id, r.timeframe]));
  const counts = statuses.map((status) => ({
    status,
    count: plan.filter((item) => item.status === status).length,
  }));
  const done = counts.find((c) => c.status === "concluida")?.count ?? 0;

  const remove = (item: PlanItem) => {
    const index = plan.findIndex((p) => p.areaId === item.areaId);
    assessmentActions.removeFromPlan(item.areaId);
    toast("Ação removida do plano.", {
      label: "Anular",
      onClick: () => assessmentActions.insertPlanItem(item, index),
    });
  };

  return (
    <Card aria-labelledby={titleId} data-plan>
      <CardHeader
        id={titleId}
        title={
          <span className="inline-flex items-center gap-1.5">
            Plano de ação
            <InfoTooltip
              label="Plano de ação"
              text="As ações que a empresa decidiu executar. Cada uma tem estado, responsável, data limite e notas. Pode exportar o plano para Excel."
            />
          </span>
        }
        description={
          plan.length
            ? counts
                .map((c) => {
                  const label = statusLabels[c.status].toLowerCase();
                  return `${c.count} ${c.status === "concluida" && c.count !== 1 ? `${label}s` : label}`;
                })
                .join(" · ")
            : undefined
        }
        action={
          plan.length > 0 && (
            <button
              type="button"
              onClick={() => exportPlanCsv(companyName, plan, answers)}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-navy ring-1 ring-line transition-colors ring-inset hover:bg-surface print:hidden"
            >
              <FileSpreadsheet aria-hidden="true" className="size-4" />
              Excel
              <span className="sr-only">: exportar o plano de ação em CSV</span>
            </button>
          )
        }
      />

      {plan.length > 0 && (
        <div className="flex items-center gap-3 px-4 pt-3 sm:px-5">
          <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-mist" aria-hidden="true">
            <div className="h-full bg-navy" style={{ width: `${(done / plan.length) * 100}%` }} />
          </div>
          <span className="text-xs font-medium text-navy tabular-nums">
            {Math.round((done / plan.length) * 100)}% concluído
          </span>
        </div>
      )}

      {plan.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-muted sm:px-5">
          {readOnly
            ? "Esta empresa ainda não tem ações no plano."
            : "O plano está vazio. Use \"Adicionar ao plano\" nas próximas ações."}
        </p>
      ) : (
        <ul className="divide-y divide-line">
          {plan.map((item) => {
            const entry = findArea(item.areaId);
            if (!entry) return null;
            const timeframe = timeframeByArea.get(item.areaId);
            const overdue = !!today && !!item.dueDate && item.dueDate < today && item.status !== "concluida";
            const label = entry.area.action;

            return (
              <li key={item.areaId} className="px-4 py-3.5 sm:px-5">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p
                      className={
                        item.status === "concluida"
                          ? "text-sm leading-snug text-muted line-through decoration-line-strong"
                          : "text-sm leading-snug font-medium text-ink"
                      }
                    >
                      {label}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {entry.dimension.shortTitle}
                      {timeframe && ` · ${timeframe}`}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
                      {readOnly ? (
                        <Chip tone={item.status === "concluida" ? "soft" : item.status === "em-curso" ? "strong" : "neutral"}>
                          {statusLabels[item.status]}
                        </Chip>
                      ) : (
                        <label className="inline-flex items-center print:hidden">
                          <span className="sr-only">Estado de: {label}</span>
                          <select
                            value={item.status}
                            onChange={(e) => assessmentActions.setPlanStatus(item.areaId, e.target.value as ActionStatus)}
                            className="min-h-9 rounded-lg border border-line bg-white px-2.5 text-xs font-medium text-ink focus:border-steel focus:outline-none"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {statusLabels[status]}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                      {!readOnly && <span className="hidden font-medium text-ink print:inline">{statusLabels[item.status]}</span>}
                      {item.owner && (
                        <span className="inline-flex items-center gap-1">
                          <UserRound aria-hidden="true" className="size-3.5" />
                          {item.owner}
                        </span>
                      )}
                      {item.dueDate && (
                        <span className={cn("inline-flex items-center gap-1", overdue && "font-semibold text-navy")}>
                          <CalendarDays aria-hidden="true" className="size-3.5" />
                          {formatDate(item.dueDate)}
                          {overdue && <Chip tone="strong">Em atraso</Chip>}
                        </span>
                      )}
                    </div>

                    {item.notes && (
                      <p className="mt-2 rounded-lg bg-surface px-3 py-2 text-xs leading-relaxed whitespace-pre-line text-muted">
                        {item.notes}
                      </p>
                    )}
                    {!readOnly && <PlanItemDetails item={item} label={label} />}
                  </div>

                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => remove(item)}
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-navy print:hidden"
                    >
                      <X aria-hidden="true" className="size-4" />
                      <span className="sr-only">Remover do plano: {label}</span>
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

const inputClass =
  "mt-1 block min-h-10 w-full rounded-lg border border-line bg-white px-3 text-[16px] text-ink placeholder:text-muted/70 focus:border-steel focus:outline-none sm:text-sm";

/** Responsável, data limite e notas de uma ação (guardados ao escrever). */
function PlanItemDetails({ item, label }: { item: PlanItem; label: string }) {
  const filled = [item.owner, item.dueDate, item.notes].filter(Boolean).length;

  return (
    <details className="group mt-2 print:hidden">
      <summary className="inline-flex min-h-8 cursor-pointer list-none items-center gap-1 text-xs font-medium text-steel hover:text-navy [&::-webkit-details-marker]:hidden">
        {filled ? "Editar detalhes" : "Adicionar responsável, data e notas"}
        <ChevronDown aria-hidden="true" className="size-3.5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-2 grid gap-3 rounded-lg border border-line bg-surface/60 p-3 sm:grid-cols-2">
        <label className="block text-xs font-medium text-ink">
          Responsável
          <input
            type="text"
            value={item.owner ?? ""}
            onChange={(e) => assessmentActions.updatePlanItem(item.areaId, { owner: e.target.value })}
            placeholder="Ex.: Direção Financeira"
            aria-label={`Responsável por: ${label}`}
            className={inputClass}
          />
        </label>
        <label className="block text-xs font-medium text-ink">
          Data limite
          <input
            type="date"
            value={item.dueDate ?? ""}
            onChange={(e) => assessmentActions.updatePlanItem(item.areaId, { dueDate: e.target.value })}
            aria-label={`Data limite de: ${label}`}
            className={inputClass}
          />
        </label>
        <label className="block text-xs font-medium text-ink sm:col-span-2">
          Notas
          <textarea
            value={item.notes ?? ""}
            onChange={(e) => assessmentActions.updatePlanItem(item.areaId, { notes: e.target.value })}
            rows={3}
            placeholder="Ponto de situação, próximos passos, decisões tomadas..."
            aria-label={`Notas sobre: ${label}`}
            className={cn(inputClass, "py-2 leading-relaxed")}
          />
        </label>
      </div>
    </details>
  );
}
