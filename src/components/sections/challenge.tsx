import { Coins, Gauge, TrendingUp, UserRoundSearch, type LucideIcon } from "lucide-react";
import { QuadrantGlyph } from "@/components/brand/logo";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { getDimension, getDimensionIndex } from "@/lib/dimensions";
import type { DimensionId } from "@/types/diagnostic";

const challenges: ReadonlyArray<{
  title: string;
  description: string;
  icon: LucideIcon;
  dimension: DimensionId;
}> = [
  {
    title: "Talento por aproveitar",
    description: "Competências e capacidades internas que podem gerar mais valor.",
    icon: UserRoundSearch,
    dimension: "colaboradores",
  },
  {
    title: "Ineficiências operacionais",
    description: "Processos e recursos com margem para melhorar.",
    icon: Gauge,
    dimension: "operacional",
  },
  {
    title: "Oportunidades financeiras",
    description: "Potencial de rentabilidade, investimento e expansão por explorar.",
    icon: Coins,
    dimension: "financeiro",
  },
  {
    title: "Crescimento estratégico",
    description: "Oportunidades de inovação, diferenciação e internacionalização.",
    icon: TrendingUp,
    dimension: "estrategico",
  },
];

export function Challenge() {
  return (
    <Section id="desafio" aria-labelledby="desafio-title" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>O desafio</Eyebrow>
            <SectionTitle id="desafio-title" className="mt-6">
              O potencial existe. O desafio está em identificá-lo.
            </SectionTitle>
            <Lead className="mt-6">
              Muitas empresas têm oportunidades de crescimento que permanecem por explorar. Competências
              subaproveitadas, processos ineficientes, recursos mal aproveitados e oportunidades estratégicas
              nem sempre são identificados de forma integrada.
            </Lead>
          </div>
        </div>

        <ul className="grid gap-px self-start overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
          {challenges.map((challenge, i) => {
            const Icon = challenge.icon;
            const dimension = getDimension(challenge.dimension);
            return (
              <li
                key={challenge.title}
                className="group flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-surface/70 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-navy">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-medium text-steel-soft tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="mt-8 text-lg font-semibold tracking-[-0.01em] text-ink">{challenge.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{challenge.description}</p>
                <p className="mt-auto flex items-center gap-2 pt-8 text-xs font-medium text-steel">
                  <QuadrantGlyph active={getDimensionIndex(challenge.dimension)} className="size-3.5" />
                  Dimensão {dimension.letter} · {dimension.shortTitle}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
