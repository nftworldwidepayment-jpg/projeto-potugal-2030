import type { Assessment } from "@/types/diagnostic";

/**
 * Avaliação fictícia, usada exclusivamente na pré-visualização do painel.
 *
 * Não corresponde a nenhuma empresa real nem a resultados da plataforma.
 * Qualquer componente que a apresente deve indicar "Exemplo demonstrativo".
 */
export const demoAssessment: Assessment = {
  isDemo: true,
  company: {
    name: "Empresa Exemplo, S.A.",
    sector: "Indústria transformadora",
    size: "PME",
  },
  opportunityIndex: 72,
  opportunityLabel: "Potencial elevado",
  scores: [
    { dimension: "colaboradores", current: 58, potential: 81 },
    { dimension: "operacional", current: 52, potential: 84 },
    { dimension: "financeiro", current: 66, potential: 79 },
    { dimension: "estrategico", current: 44, potential: 80 },
  ],
  indicators: [
    {
      id: "produtividade",
      label: "Volume de negócios por colaborador",
      value: "82,4 mil €",
      trend: [71, 72, 70, 73, 74, 73, 75, 77, 76, 78, 80, 82],
    },
    {
      id: "margem",
      label: "Margem operacional",
      value: "9,6%",
      trend: [8.1, 8.4, 8.2, 8.6, 8.5, 8.9, 9.0, 8.8, 9.2, 9.1, 9.4, 9.6],
    },
    {
      id: "digitalizacao",
      label: "Processos digitalizados",
      value: "38%",
      trend: [24, 25, 25, 27, 28, 30, 30, 32, 33, 35, 36, 38],
    },
  ],
  recommendations: [
    {
      id: "mercados",
      dimension: "estrategico",
      title: "Definir estratégia de entrada em novos mercados europeus",
      priority: "alta",
    },
    {
      id: "automatizacao",
      dimension: "operacional",
      title: "Automatizar processos administrativos e de faturação",
      priority: "alta",
    },
    {
      id: "competencias",
      dimension: "colaboradores",
      title: "Mapear competências e reorganizar funções",
      priority: "media",
    },
  ],
};
