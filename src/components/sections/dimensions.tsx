import { Container } from "@/components/ui/container";
import { Eyebrow, SectionTitle } from "@/components/ui/section";
import { DimensionsCarousel } from "./dimensions-carousel";

export function Dimensions() {
  return (
    <section
      id="dimensoes"
      aria-labelledby="dimensoes-title"
      className="bg-surface pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-32"
    >
      <Container>
        <div className="flex flex-col gap-5 border-t border-line-strong/70 pt-12 sm:gap-6 sm:pt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pt-20">
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

        <DimensionsCarousel />
      </Container>
    </section>
  );
}
