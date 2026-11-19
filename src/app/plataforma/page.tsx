import type { Metadata } from "next";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  type LucideIcon,
} from "lucide-react";
import { DashboardPreview } from "@/components/dashboard/dashboard-preview";
import { ReadingMarker } from "@/components/dashboard/reading-marker";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { demoAssessment } from "@/lib/demo-assessment";
import { journeySteps, platformModules } from "@/lib/platform-modules";

export const metadata: Metadata = {
  title: "A Plataforma",
  description:
    "Como vai funcionar a plataforma de diagnóstico empresarial do PORTUGAL POTENTIAL 2030, atualmente em desenvolvimento.",
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

const readingGuide = [
  {
    title: "Índice de oportunidade",
    text: "Um único número, de 0 a 100, que resume a margem de crescimento identificada. Quanto mais alto, mais potencial há por explorar.",
  },
  {
    title: "Potencial por dimensão",
    text: "Uma barra por dimensão. A parte escura mostra a situação atual; a parte clara mostra até onde a empresa pode chegar.",
  },
  {
    title: "Recomendação prioritária",
    text: "A ação por onde começar, de acordo com as margens de crescimento identificadas.",
  },
];

export default function PlataformaPage() {
  return (
    <>
      <PageHeader
        eyebrow="A Plataforma"
        title="Como vai funcionar a plataforma."
        description={
          <p>
            A plataforma de diagnóstico está em desenvolvimento. Nesta página pode ver, passo a passo, o que vai
            permitir fazer e como serão apresentados os resultados.
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
          <Eyebrow>Passo a passo</Eyebrow>
          <SectionTitle id="modulos-title" className="mt-6 lg:text-4xl">
            O que a plataforma vai permitir fazer.
          </SectionTitle>
          <Lead className="mt-6">
            As funcionalidades estão organizadas pelas quatro etapas do diagnóstico, pela ordem em que serão
            usadas.
          </Lead>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {journeySteps.map((step, i) => (
            <li key={step.id} className="flex flex-col bg-white p-7">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-8 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white"
                >
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-navy">
                  <span className="sr-only">Etapa {i + 1}: </span>
                  {step.title}
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {platformModules[step.id].map((module) => {
                  const Icon = moduleIcons[module.id] ?? ClipboardList;
                  return (
                    <li key={module.id} className="rounded-xl border border-line bg-surface/60 p-4">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-white text-navy ring-1 ring-line">
                        <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
                      </span>
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
            <Eyebrow>Como ler o painel</Eyebrow>
            <SectionTitle id="painel-title" className="mt-6 lg:text-4xl">
              Três informações, de leitura imediata.
            </SectionTitle>
            <ol className="mt-10 space-y-6">
              {readingGuide.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-0.5">
                    <ReadingMarker n={i + 1} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm leading-relaxed text-muted">
              Exemplo demonstrativo, com dados fictícios. Não corresponde a uma empresa real nem a resultados da
              plataforma.
            </p>
          </div>
          <div className="lg:col-span-7">
            <DashboardPreview assessment={demoAssessment} annotated />
          </div>
        </div>
      </Section>

      <Container className="flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center">
        <ButtonLink href="/#inicio" variant="secondary">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Voltar ao início
        </ButtonLink>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/#perguntas" variant="secondary">
            Perguntas frequentes
          </ButtonLink>
          <ButtonLink href="/#dimensoes" withArrow>
            Conhecer as Quatro Dimensões
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
