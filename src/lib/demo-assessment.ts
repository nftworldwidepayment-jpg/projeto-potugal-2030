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
