/**
 * Modelo de domínio do diagnóstico empresarial.
 *
 * Partilhado entre o website institucional (pré-visualizações) e os módulos
 * previstos da plataforma: perfil da empresa, questionário de diagnóstico,
 * motor de avaliação, painel de potencial, recomendações, plano de ação e
 * relatório exportável.
 */

export type DimensionId = "colaboradores" | "operacional" | "financeiro" | "estrategico";

export interface Dimension {
  id: DimensionId;
  /** Letra de referência usada na comunicação (A–D). */
  letter: "A" | "B" | "C" | "D";
  /** Nome completo, p. ex. "Potencial dos Colaboradores". */
  title: string;
  /** Nome curto para gráficos e etiquetas, p. ex. "Colaboradores". */
  shortTitle: string;
  /** Pergunta simples que resume o que a dimensão avalia. */
  question: string;
  focusAreas: readonly string[];
}

/** Pontuação de uma dimensão, numa escala de 0 a 100. */
export interface DimensionScore {
  dimension: DimensionId;
  /** Nível atual estimado. */
  current: number;
  /** Nível alcançável identificado no diagnóstico. */
  potential: number;
}

export type Priority = "alta" | "media" | "baixa";

export interface Recommendation {
  id: string;
  dimension: DimensionId;
  title: string;
  priority: Priority;
}

export interface Indicator {
  id: string;
  label: string;
  /** Valor já formatado para apresentação (pt-PT). */
  value: string;
  /** Série curta para a minitendência (sparkline). */
  trend?: readonly number[];
}

export interface CompanyProfile {
  name: string;
  sector: string;
  size: string;
}

export interface Assessment {
  company: CompanyProfile;
  /** Índice agregado de oportunidade, de 0 a 100. */
  opportunityIndex: number;
  opportunityLabel: string;
  scores: readonly DimensionScore[];
  indicators?: readonly Indicator[];
  recommendations: readonly Recommendation[];
  /**
   * Verdadeiro para dados fictícios usados em demonstrações.
   * Qualquer avaliação com `isDemo` deve ser apresentada como tal.
   */
  isDemo: boolean;
}
