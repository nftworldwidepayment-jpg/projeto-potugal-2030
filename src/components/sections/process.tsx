import { CircleCheck } from "lucide-react";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { journeySteps } from "@/lib/platform-modules";
import { cn } from "@/lib/utils";

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
          Quatro etapas, por esta ordem. Cada uma tem um resultado concreto, que serve de base à seguinte.
        </Lead>
      </div>

      <ol className="mt-12 grid gap-0 sm:mt-16 lg:mt-20 lg:grid-cols-4 lg:gap-8">
        {journeySteps.map((step, i) => {
          const isLast = i === journeySteps.length - 1;
          return (
            <li key={step.id} className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0">
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
                  "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full text-base font-semibold ring-1 ring-inset",
                  nodeTones[i],
                )}
              >
                {i + 1}
              </span>

              <div className="flex flex-1 flex-col pt-2.5 lg:pt-7 lg:pr-4">
                <h3 className="text-xl font-semibold tracking-[-0.015em] text-navy">
                  <span className="sr-only">Etapa {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.description}</p>
                <p className="mt-5 flex items-start gap-2 rounded-lg bg-surface px-3 py-2.5 text-sm text-ink lg:mt-auto">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-steel" />
                  <span>
                    <span className="font-semibold">Resultado:</span> {step.outcome}
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
