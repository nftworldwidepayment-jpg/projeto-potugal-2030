import type { Metadata } from "next";
import { ArrowLeft, BarChart3, ClipboardList, FileText, LayoutDashboard, Lightbulb, ListChecks, Building2, type LucideIcon } from "lucide-react";
import { DashboardPreview } from "@/components/dashboard/dashboard-preview";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { demoAssessment } from "@/lib/demo-assessment";
import { journeySteps, platformModules } from "@/lib/platform-modules";

export const metadata: Metadata = {
  title: "A Plataforma",
  description:
    "Os módulos previstos da plataforma de diagnóstico empresarial do PORTUGAL POTENTIAL 2030, atualmente em desenvolvimento.",
};

const moduleIcons: Record<string, LucideIcon> = {
  perfil: Building2,
  questionario: ClipboardList,
  avaliacao: BarChart3,
  painel: LayoutDashboard,
  recomendacoes: Lightbulb,
  plano: ListChecks,
  relatorio: FileText,
};

export default function PlataformaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Explorar a Plataforma"
        title="Do diagnóstico integrado ao plano de ação."
        description={
          <p>
            A plataforma interativa de diagnóstico empresarial encontra-se em desenvolvimento. Apresentamos os
            módulos previstos e a forma como se articulam ao longo do percurso de cada empresa.
          </p>
        }
      >
        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-steel ring-1 ring-steel-pale ring-inset">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-steel" />
          Em desenvolvimento · Nenhum dado empresarial é recolhido nesta fase
        </p>
      </PageHeader>

      <Section aria-labelledby="modulos-title">
        <div className="max-w-2xl">
          <Eyebrow>Módulos previstos</Eyebrow>
          <SectionTitle id="modulos-title" className="mt-6 lg:text-4xl">
            Sete módulos, organizados em quatro etapas.
          </SectionTitle>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {journeySteps.map((step) => (
            <li key={step.id} className="flex flex-col bg-white p-7">
              <p className="text-xs font-semibold tracking-[0.16em] text-steel uppercase">Etapa {step.number}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em] text-navy">{step.title}</h3>
              <ul className="mt-6 space-y-3">
                {platformModules[step.id].map((module) => {
                  const Icon = moduleIcons[module.id] ?? ClipboardList;
                  return (
                    <li key={module.id} className="rounded-xl border border-line bg-surface/60 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-white text-navy ring-1 ring-line">
                          <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
                        </span>
                        <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-muted uppercase ring-1 ring-line ring-inset">
                          Previsto
                        </span>
                      </div>
                      <h4 className="mt-4 text-[15px] font-semibold text-ink">{module.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{module.description}</p>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" aria-labelledby="painel-title">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Painel de potencial</Eyebrow>
            <SectionTitle id="painel-title" className="mt-6 lg:text-4xl">
              Uma leitura clara, dimensão a dimensão.
            </SectionTitle>
            <Lead className="mt-6">
              O painel previsto reunirá o índice de oportunidade, o potencial identificado em cada dimensão, os
              indicadores relevantes e as recomendações prioritárias.
            </Lead>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              A pré-visualização apresentada é um exemplo demonstrativo, com dados fictícios. Não corresponde a
              uma empresa real nem a resultados da plataforma.
            </p>
          </div>
          <div className="lg:col-span-7">
            <DashboardPreview assessment={demoAssessment} />
          </div>
        </div>
      </Section>

      <Container className="flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center">
        <ButtonLink href="/#inicio" variant="secondary">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Voltar ao início
        </ButtonLink>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/#dimensoes" variant="secondary">
            As Quatro Dimensões
          </ButtonLink>
          <ButtonLink href="/#como-funciona" withArrow>
            Como Funciona
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
