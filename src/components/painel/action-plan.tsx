"use client";

import { X } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { assessmentActions } from "@/lib/assessment-store";
import { findArea, recommendationsFor, statusLabels } from "@/lib/model";
import type { ActionStatus, Answers, PlanItem } from "@/types/diagnostic";

const statuses = Object.keys(statusLabels) as ActionStatus[];

export function ActionPlan({ plan, answers }: { plan: readonly PlanItem[]; answers: Answers }) {
  const timeframeByArea = new Map(recommendationsFor(answers).map((r) => [r.area.id, r.timeframe]));
  const counts = statuses.map((status) => ({
    status,
    count: plan.filter((item) => item.status === status).length,
  }));
  const done = counts.find((c) => c.status === "concluida")?.count ?? 0;

  return (
    <Card aria-labelledby="plano-titulo">
      <CardHeader
        id="plano-titulo"
        title="Plano de ação"
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
            <span className="text-xs font-medium text-navy tabular-nums">
              {Math.round((done / plan.length) * 100)}%
            </span>
          )
        }
      />

      {plan.length > 0 && (
        <div className="px-4 pt-3 sm:px-5">
          <div className="flex h-1.5 overflow-hidden rounded-full bg-mist" aria-hidden="true">
            <div className="h-full bg-navy" style={{ width: `${(done / plan.length) * 100}%` }} />
          </div>
        </div>
      )}

      {plan.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-muted sm:px-5">
          O plano está vazio. Use &quot;Adicionar ao plano&quot; nas próximas ações.
        </p>
      ) : (
        <ul className="divide-y divide-line">
          {plan.map((item) => {
            const entry = findArea(item.areaId);
            if (!entry) return null;
            const timeframe = timeframeByArea.get(item.areaId);
            return (
              <li key={item.areaId} className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
                <div className="min-w-0 flex-1">
                  <p
                    className={
                      item.status === "concluida"
                        ? "text-sm leading-snug text-muted line-through decoration-line-strong"
                        : "text-sm leading-snug font-medium text-ink"
                    }
                  >
                    {entry.area.action}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {entry.dimension.shortTitle}
                    {timeframe && ` · ${timeframe}`}
                  </p>
                  <label className="mt-2 inline-flex items-center gap-2 text-xs text-muted print:hidden">
                    <span className="sr-only">Estado de: {entry.area.action}</span>
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
                  <p className="mt-1 hidden text-xs font-medium text-ink print:block">{statusLabels[item.status]}</p>
                </div>
                <button
                  type="button"
                  onClick={() => assessmentActions.removeFromPlan(item.areaId)}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-navy print:hidden"
                >
                  <X aria-hidden="true" className="size-4" />
                  <span className="sr-only">Remover do plano: {entry.area.action}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
