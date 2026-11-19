import { QuadrantGlyph } from "@/components/brand/logo";
import { dimensionIcons } from "@/components/dashboard/dimension-icons";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionTitle } from "@/components/ui/section";
import { dimensions } from "@/lib/dimensions";

export function Dimensions() {
  return (
    <section
      id="dimensoes"
      aria-labelledby="dimensoes-title"
      className="bg-surface pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-32"
    >
      <Container>
        <div className="flex flex-col gap-6 border-t border-line-strong/70 pt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pt-20">
          <div className="max-w-2xl">
            <Eyebrow>As Quatro Dimensões</Eyebrow>
            <SectionTitle id="dimensoes-title" className="mt-6 lg:text-4xl">
              Quatro perguntas simples sobre a sua empresa.
            </SectionTitle>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted">
            Cada dimensão responde a uma pergunta essencial. Em conjunto, mostram onde está o potencial de
            crescimento.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {dimensions.map((dimension, i) => {
            const Icon = dimensionIcons[dimension.id];
            return (
              <li key={dimension.id}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card transition-[box-shadow,border-color,translate] duration-300 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-white">
                      <Icon aria-hidden="true" className="size-[22px]" strokeWidth={1.75} />
                    </span>
                    <QuadrantGlyph active={i} className="size-6" />
                  </div>

                  <p className="mt-8 text-xs font-semibold tracking-[0.16em] text-steel uppercase">
                    Dimensão {dimension.letter}
                  </p>
                  <h3 className="mt-2 text-xl leading-snug font-semibold tracking-[-0.015em] text-navy">
                    {dimension.title}
                  </h3>
                  <p className="mt-4 mb-8 border-l-2 border-steel-soft pl-4 text-base leading-relaxed text-ink">
                    {dimension.question}
                  </p>

                  <div className="mt-auto border-t border-line pt-6">
                    <p className="text-xs font-semibold text-muted">O que é analisado</p>
                    <ul className="mt-3 space-y-2.5">
                      {dimension.focusAreas.map((area) => (
                        <li key={area} className="flex items-center gap-3 text-sm text-ink">
                          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-steel-soft" />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
