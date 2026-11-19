import { Coins, Globe, Info, Lightbulb, TrendingUp, type LucideIcon } from "lucide-react";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";

const outcomes: ReadonlyArray<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: "Maior produtividade",
    description: "Equipas, competências e processos organizados para gerar mais valor.",
    icon: TrendingUp,
  },
  {
    title: "Melhor rentabilidade",
    description: "Recursos aplicados onde produzem maior retorno para a empresa.",
    icon: Coins,
  },
  {
    title: "Mais inovação",
    description: "Novas oportunidades identificadas, estruturadas e transformadas em projetos.",
    icon: Lightbulb,
  },
  {
    title: "Maior competitividade e capacidade de expansão",
    description: "Empresas mais bem preparadas para crescer e chegar a novos mercados.",
    icon: Globe,
  },
];

export function Impact() {
  return (
    <Section id="impacto" tone="surface" aria-labelledby="impacto-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Impacto</Eyebrow>
            <SectionTitle id="impacto-title" className="mt-6">
              Mais potencial desbloqueado. Empresas mais competitivas.
            </SectionTitle>
            <Lead className="mt-6">
              A iniciativa foi concebida para gerar impacto em quatro áreas determinantes para a competitividade
              das empresas portuguesas.
            </Lead>
            <aside
              aria-label="Nota sobre os resultados"
              className="mt-8 flex gap-3 rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-muted"
            >
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-steel" />
              <p>
                <strong className="font-semibold text-ink">Resultados pretendidos.</strong> Os impactos
                apresentados correspondem aos objetivos da iniciativa e não a resultados já alcançados ou
                comprovados.
              </p>
            </aside>
          </div>
        </div>

        <ul className="divide-y divide-line-strong/70 border-y border-line-strong/70 lg:col-span-7">
          {outcomes.map((outcome) => {
            const Icon = outcome.icon;
            return (
              <li key={outcome.title} className="flex gap-6 py-8 sm:gap-8 sm:py-10">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-navy shadow-card">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.015em] text-navy sm:text-2xl">{outcome.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted sm:text-base">{outcome.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
