"use client";

import { X } from "lucide-react";
import type { Ref } from "react";
import { buttonClasses } from "@/components/ui/button";
import { dimensions } from "@/lib/model";
import { portfolioStats } from "@/lib/portfolio";
import { prefsActions } from "@/lib/prefs-store";
import { siteConfig } from "@/lib/site";
import type { Role } from "@/types/diagnostic";

/** Informação sobre a iniciativa e sobre a forma de cálculo. */
export function AboutDialog({ ref, role }: { ref: Ref<HTMLDialogElement>; role: Role | null }) {
  return (
    <dialog
      ref={ref}
      aria-labelledby="sobre-titulo"
      className="m-auto max-h-[min(90dvh,760px)] w-[min(100%-2rem,640px)] overflow-hidden rounded-2xl bg-white p-0 text-ink shadow-panel backdrop:bg-navy/30 open:flex open:animate-sheet open:flex-col"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
        <h2 id="sobre-titulo" className="text-base font-semibold text-navy">
          Sobre o {siteConfig.name}
        </h2>
        <form method="dialog">
          <button
            type="submit"
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-navy"
          >
            <X aria-hidden="true" className="size-5" />
            <span className="sr-only">Fechar</span>
          </button>
        </form>
      </div>

      <div className="space-y-6 overflow-y-auto overscroll-contain px-5 py-5 text-sm leading-relaxed text-muted sm:px-6">
        <p>
          <span className="font-medium text-ink">{siteConfig.tagline}</span> O {siteConfig.name} pretende ajudar as
          empresas portuguesas a descobrir oportunidades escondidas, transformar informação em decisões e
          converter potencial em crescimento.
        </p>

        <section>
          <h3 className="font-semibold text-ink">As quatro dimensões</h3>
          <ul className="mt-2 divide-y divide-line rounded-lg border border-line">
            {dimensions.map((d) => (
              <li key={d.id} className="flex gap-3 px-3 py-2.5">
                <span className="w-4 shrink-0 font-semibold text-navy">{d.letter}</span>
                <span>
                  <span className="text-ink">{d.title}.</span> {d.areas.map((a) => a.name).join(", ")}.
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-semibold text-ink">Como são calculados os resultados</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Cada uma das 16 questões é respondida numa escala de 1 (Não) a 5 (Sim, totalmente).</li>
            <li>Cada resposta é convertida numa pontuação de 0 a 100 (Não = 0, Em parte = 50, Sim = 100).</li>
            <li>A pontuação de cada dimensão é a média das suas quatro áreas.</li>
            <li>O potencial realizado é a média das quatro dimensões. A margem de crescimento é o que falta para 100.</li>
            <li>
              Cada área respondida com &quot;Em parte&quot; ou menos gera uma ação recomendada. Com &quot;Não&quot;
              ou &quot;Pouco&quot;, a prioridade é alta.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold text-ink">Dados</h3>
          <p className="mt-2">
            Protótipo de demonstração. As respostas ficam guardadas apenas neste navegador e não são enviadas para
            nenhum servidor. Os dados de demonstração são fictícios e não representam uma empresa real.
          </p>
          <p className="mt-2">
            A carteira da entidade gestora tem {portfolioStats.companies} empresas fictícias, com nomes inventados e
            respostas geradas para demonstração.
          </p>
        </section>
      </div>

      {role && (
        <form method="dialog" className="flex justify-end border-t border-line px-5 py-3 sm:px-6">
          <button
            type="submit"
            onClick={() => prefsActions.resetGuide(role)}
            className={buttonClasses({ variant: "secondary" })}
          >
            Ver o guia rápido
          </button>
        </form>
      )}
    </dialog>
  );
}
