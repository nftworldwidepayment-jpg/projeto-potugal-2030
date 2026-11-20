"use client";

import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";
import { prefsActions, usePrefs } from "@/lib/prefs-store";
import { roleFromPath, roleLabels } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Role } from "@/types/diagnostic";

const steps: Record<Role, ReadonlyArray<{ title: string; text: string }>> = {
  gestor: [
    {
      title: "Visão Geral",
      text: "A carteira de empresas acompanhadas: potencial realizado médio, distribuição por nível, áreas mais críticas e o mapa de calor por setor e dimensão.",
    },
    {
      title: "Mapa de calor e lista de empresas",
      text: "Toque num setor do mapa para filtrar a lista. Pode pesquisar, ordenar e exportar a lista para Excel.",
    },
    {
      title: "Visão Empresa",
      text: "O painel de cada empresa, comparado com a média da carteira: resultados por dimensão, próximas ações e plano de ação.",
    },
  ],
  empresa: [
    {
      title: "Painel",
      text: "O potencial realizado da empresa, o resultado em cada dimensão e as próximas ações, cada uma com o porquê.",
    },
    {
      title: "Diagnóstico",
      text: "O perfil da empresa e 16 questões, de Não a Sim, totalmente. O painel é recalculado a cada resposta.",
    },
    {
      title: "Plano de ação",
      text: "Adicione ações ao plano, defina responsável, data limite e notas, e acompanhe o estado. Exporte para Excel ou imprima o relatório.",
    },
  ],
};

/** Guia de primeira visita em três passos, um por perfil. */
export function OnboardingGuide() {
  const role = roleFromPath(usePathname());
  const prefs = usePrefs();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const shouldOpen = !!prefs && !!role && !prefs.guidesSeen.includes(role);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (shouldOpen && dialog && !dialog.open) dialog.showModal();
  }, [shouldOpen]);

  if (!role) return null;
  const roleSteps = steps[role];
  const step = roleSteps[Math.min(index, roleSteps.length - 1)];
  const last = index >= roleSteps.length - 1;

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="guia-titulo"
      onClose={() => {
        prefsActions.markGuideSeen(role);
        setIndex(0);
      }}
      className="m-auto w-[min(100%-2rem,460px)] rounded-2xl bg-white p-0 text-ink shadow-panel backdrop:bg-navy/30 open:animate-sheet print:hidden"
    >
      <div className="flex items-start justify-between gap-4 px-6 pt-6">
        <div className="flex items-center gap-3">
          <LogoMark className="size-9" />
          <div>
            <p className="text-xs font-semibold text-steel">{roleLabels[role]}</p>
            <p className="text-sm text-muted">Guia rápido</p>
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          className="-mt-1 -mr-2 inline-flex size-10 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-navy"
        >
          <X aria-hidden="true" className="size-5" />
          <span className="sr-only">Fechar o guia</span>
        </button>
      </div>

      <div className="px-6 pt-5 pb-2" aria-live="polite">
        <p className="text-xs font-medium text-muted tabular-nums">
          Passo {index + 1} de {roleSteps.length}
        </p>
        <h2 id="guia-titulo" className="mt-1 text-lg font-semibold text-navy">
          {step.title}
        </h2>
        <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-muted">{step.text}</p>
      </div>

      <div className="flex items-center justify-between gap-3 px-6 pt-3 pb-6">
        <div className="flex gap-1.5" aria-hidden="true">
          {roleSteps.map((s, i) => (
            <span key={s.title} className={cn("h-1.5 rounded-full transition-all", i === index ? "w-5 bg-navy" : "w-1.5 bg-line-strong")} />
          ))}
        </div>
        <div className="flex gap-2">
          {!last && (
            <button type="button" onClick={close} className={buttonClasses({ variant: "secondary" })}>
              Saltar
            </button>
          )}
          <button
            type="button"
            onClick={() => (last ? close() : setIndex((i) => i + 1))}
            className={buttonClasses({})}
          >
            {last ? "Começar" : "Seguinte"}
            {!last && <ArrowRight aria-hidden="true" className="size-4" />}
          </button>
        </div>
      </div>
    </dialog>
  );
}
