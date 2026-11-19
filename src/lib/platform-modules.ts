/**
 * Módulos previstos da plataforma de diagnóstico, organizados pelas quatro
 * etapas do percurso "Do diagnóstico à ação". Nenhum destes módulos está
 * implementado nesta fase.
 */

export type ModuleStatus = "previsto";

export interface PlatformModule {
  id: string;
  title: string;
  description: string;
  status: ModuleStatus;
  /** Rota reservada para o módulo, a criar em fases seguintes. */
  plannedRoute: string;
}

export interface JourneyStep {
  id: string;
  number: string;
  title: string;
  description: string;
  /** O que a empresa obtém no final da etapa. */
  outcome: string;
}

export const journeySteps: readonly JourneyStep[] = [
  {
    id: "conhecer",
    number: "01",
    title: "Conhecer",
    description: "Recolher informação relevante sobre a realidade da empresa.",
    outcome: "Um retrato claro da empresa.",
  },
  {
    id: "diagnosticar",
    number: "02",
    title: "Diagnosticar",
    description: "Avaliar as quatro dimensões e identificar áreas com potencial de melhoria.",
    outcome: "Uma leitura do potencial em cada dimensão.",
  },
  {
    id: "identificar",
    number: "03",
    title: "Identificar oportunidades",
    description: "Transformar os resultados do diagnóstico em oportunidades concretas.",
    outcome: "Uma lista de oportunidades, por ordem de prioridade.",
  },
  {
    id: "agir",
    number: "04",
    title: "Agir e crescer",
    description: "Definir prioridades e estruturar um plano de ação adaptado à empresa.",
    outcome: "Um plano de ação concreto, pronto a aplicar.",
  },
];

export const platformModules: Record<JourneyStep["id"], readonly PlatformModule[]> = {
  conhecer: [
    {
      id: "perfil",
      title: "Perfil empresarial e registo",
      description: "Caracterização da empresa: setor, dimensão, estrutura e contexto de atuação.",
      status: "previsto",
      plannedRoute: "/plataforma/perfil",
    },
    {
      id: "questionario",
      title: "Questionário de diagnóstico",
      description: "Questionário interativo e orientado, organizado pelas quatro dimensões.",
      status: "previsto",
      plannedRoute: "/plataforma/diagnostico",
    },
  ],
  diagnosticar: [
    {
      id: "avaliacao",
      title: "Motor de avaliação",
      description: "Pontuação estruturada de cada dimensão, do nível atual ao potencial identificado.",
      status: "previsto",
      plannedRoute: "/plataforma/avaliacao",
    },
    {
      id: "painel",
      title: "Painel de potencial",
      description: "Visão consolidada dos resultados, com indicadores e leitura por dimensão.",
      status: "previsto",
      plannedRoute: "/plataforma/painel",
    },
  ],
  identificar: [
    {
      id: "recomendacoes",
      title: "Recomendações personalizadas",
      description: "Oportunidades concretas, priorizadas de acordo com a realidade de cada empresa.",
      status: "previsto",
      plannedRoute: "/plataforma/recomendacoes",
    },
  ],
  agir: [
    {
      id: "plano",
      title: "Plano de ação",
      description: "Prioridades, responsáveis e etapas para converter oportunidades em resultados.",
      status: "previsto",
      plannedRoute: "/plataforma/plano-de-acao",
    },
    {
      id: "relatorio",
      title: "Relatório exportável",
      description: "Síntese do diagnóstico em formato de relatório, pronta a partilhar internamente.",
      status: "previsto",
      plannedRoute: "/plataforma/relatorio",
    },
  ],
};
