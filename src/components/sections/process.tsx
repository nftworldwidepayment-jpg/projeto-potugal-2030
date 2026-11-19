import { ClipboardList, Lightbulb, Rocket, ScanSearch, type LucideIcon } from "lucide-react";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { journeySteps } from "@/lib/platform-modules";
import { cn } from "@/lib/utils";

const stepIcons: Record<string, LucideIcon> = {
  conhecer: ClipboardList,
  diagnosticar: ScanSearch,
  identificar: Lightbulb,
  agir: Rocket,
};

/** Progressão tonal dos marcadores, do mais claro ao azul-marinho. */
const nodeTones = [
  "bg-white text-navy ring-line-strong",
  "bg-mist text-navy ring-steel-pale",
  "bg-steel text-white ring-steel",
  "bg-navy text-white ring-navy",
];

export function Process() {
  return (
    <Section id="como-funciona" aria-labelledby="como-funciona-title">
      <div className="max-w-2xl">
        <Eyebrow>Como Funciona</Eyebrow>
        <SectionTitle id="como-funciona-title" className="mt-6">
          Do diagnóstico à ação.
        </SectionTitle>
        <Lead className="mt-6">
          Um percurso estruturado em quatro etapas, que transforma informação em decisões e decisões em
          crescimento.
        </Lead>
      </div>

      <ol className="mt-16 grid gap-0 lg:mt-20 lg:grid-cols-4 lg:gap-8">
        {journeySteps.map((step, i) => {
          const Icon = stepIcons[step.id];
          const isLast = i === journeySteps.length - 1;
          return (
            <li key={step.id} className="relative flex gap-6 pb-12 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0">
              {/* Linha de ligação: vertical em móvel, horizontal em desktop */}
              {!isLast && (
                <>
                  <span aria-hidden="true" className="absolute top-12 bottom-0 left-6 w-px bg-line lg:hidden" />
                  <span
                    aria-hidden="true"
                    className="absolute top-6 right-[-2rem] left-16 hidden h-px bg-line lg:block"
                  />
                </>
              )}

              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full ring-1 ring-inset",
                  nodeTones[i],
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </span>

              <div className="pt-1 lg:pt-8 lg:pr-4">
                <p className="text-xs font-semibold tracking-[0.16em] text-steel uppercase">Etapa {step.number}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em] text-navy">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
