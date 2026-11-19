import { DashboardPreview } from "@/components/dashboard/dashboard-preview";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { demoAssessment } from "@/lib/demo-assessment";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Grelha de fundo, esbatida nas extremidades */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_80%_70%_at_70%_30%,black_10%,transparent_75%)] opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-white"
      />

      <Container className="grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:pb-24 xl:grid-cols-12 xl:gap-16 xl:pt-16">
        <div className="max-w-3xl animate-rise xl:col-span-6 xl:max-w-none">
          <Eyebrow>Uma nova abordagem ao crescimento empresarial</Eyebrow>

          <h1
            id="hero-title"
            className="mt-7 text-[2.375rem] leading-[1.07] font-semibold tracking-[-0.035em] text-navy sm:text-5xl lg:text-[3.25rem] xl:text-[2.9375rem]"
          >
            Todas as empresas têm potencial.{" "}
            <span className="text-steel">Nem todas conseguem identificá-lo.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            O PORTUGAL POTENTIAL 2030 pretende ajudar as empresas portuguesas a descobrir oportunidades
            escondidas, transformar informação em decisões e converter potencial em crescimento.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#plataforma" size="lg" withArrow>
              Descobrir a Plataforma
            </ButtonLink>
            <ButtonLink href="#dimensoes" size="lg" variant="secondary">
              Conhecer as Quatro Dimensões
            </ButtonLink>
          </div>

          <p className="mt-12 max-w-xl border-t border-line pt-6 text-sm leading-relaxed font-medium text-steel">
            Diagnóstico empresarial. Decisões mais inteligentes. Crescimento sustentável.
          </p>
        </div>

        <div className="animate-rise [animation-delay:150ms] xl:col-span-6">
          <DashboardPreview assessment={demoAssessment} className="max-w-3xl xl:max-w-none" />
        </div>
      </Container>
    </section>
  );
}
