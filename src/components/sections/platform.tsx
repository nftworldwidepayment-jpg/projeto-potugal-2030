import { Eyebrow, Lead, SectionTitle } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { dimensions, totalFocusAreas } from "@/lib/dimensions";
import { journeySteps } from "@/lib/platform-modules";

const facts = [
  { value: String(dimensions.length), label: "Dimensões de análise" },
  { value: String(totalFocusAreas), label: "Áreas de avaliação" },
  { value: String(journeySteps.length), label: "Etapas, do diagnóstico à ação" },
];

export function Platform() {
  return (
    <section id="plataforma" aria-labelledby="plataforma-title" className="bg-surface pt-20 sm:pt-24 lg:pt-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>A Plataforma</Eyebrow>
            <SectionTitle id="plataforma-title" className="mt-6">
              Uma visão integrada do potencial de cada empresa.
            </SectionTitle>
          </div>
          <div className="lg:col-span-6 lg:pt-12">
            <Lead>
              O PORTUGAL POTENTIAL 2030 propõe uma abordagem estruturada ao diagnóstico empresarial, cruzando
              diferentes dimensões da organização para identificar oportunidades concretas de desenvolvimento.
            </Lead>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line-strong/70 pt-8">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse justify-end gap-2">
                  <dt className="text-xs leading-snug text-muted sm:text-sm">{fact.label}</dt>
                  <dd className="text-3xl font-semibold tracking-[-0.02em] text-navy sm:text-4xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
