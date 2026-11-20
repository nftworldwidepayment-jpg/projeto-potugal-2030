/** Modelo de domínio do diagnóstico empresarial. */

export type DimensionId = "colaboradores" | "operacional" | "financeiro" | "estrategico";

/** Resposta numa escala de 1 (não) a 5 (sim, totalmente). */
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export interface Area {
  id: string;
  /** Nome curto da área de análise, p. ex. "Automatização". */
  name: string;
  /** Afirmação que a empresa avalia no questionário. */
  statement: string;
  /** Ação recomendada quando a área tem margem de melhoria. */
  action: string;
}

export interface Dimension {
  id: DimensionId;
  letter: "A" | "B" | "C" | "D";
  title: string;
  shortTitle: string;
  /** Pergunta simples que resume o que a dimensão avalia. */
  question: string;
  areas: readonly Area[];
}

export interface CompanyProfile {
  name: string;
  sector: string;
  size: string;
}

export type ActionStatus = "por-iniciar" | "em-curso" | "concluida";

export interface PlanItem {
  areaId: string;
  status: ActionStatus;
  /** Pessoa ou função responsável pela ação. */
  owner?: string;
  /** Data limite (AAAA-MM-DD). */
  dueDate?: string;
  notes?: string;
}

export type Answers = Partial<Record<string, AnswerValue>>;

export interface AssessmentState {
  profile: CompanyProfile;
  answers: Answers;
  plan: readonly PlanItem[];
  /** Verdadeiro enquanto os dados de demonstração não forem alterados. */
  isDemo: boolean;
  /** Data da última alteração (ISO), ou null para os dados de demonstração. */
  updatedAt: string | null;
}

export type Priority = "alta" | "media";

export type Role = "gestor" | "empresa";

/** Empresa fictícia da carteira de demonstração (vista da entidade gestora). */
export interface PortfolioCompany {
  id: string;
  profile: CompanyProfile;
  region: string;
  /** Data do diagnóstico (AAAA-MM-DD). */
  assessedOn: string;
  answers: Answers;
  plan: readonly PlanItem[];
}

export interface Recommendation {
  area: Area;
  dimension: Dimension;
  answer: AnswerValue;
  score: number;
  priority: Priority;
  timeframe: string;
}
