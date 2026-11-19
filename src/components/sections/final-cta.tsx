import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { platformHref } from "@/lib/site";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid-inverse [mask-image:radial-gradient(ellipse_60%_80%_at_50%_100%,black_20%,transparent_80%)]"
      />
      <Container className="py-24 text-center sm:py-28 lg:py-36">
        <h2
          id="cta-title"
          className="mx-auto max-w-3xl text-3xl leading-[1.12] font-semibold tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl"
        >
          O próximo nível de crescimento pode estar dentro da sua empresa.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-on-navy sm:text-lg">
          Descubra como uma visão integrada do potencial empresarial pode ajudar a identificar oportunidades e
          orientar decisões.
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href={platformHref} variant="inverse" size="lg" withArrow>
            Explorar a Plataforma
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
