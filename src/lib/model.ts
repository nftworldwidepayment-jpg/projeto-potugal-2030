import type {
  ActionStatus,
  AnswerValue,
  Answers,
  AssessmentState,
  Dimension,
  DimensionId,
  Priority,
  Recommendation,
} from "@/types/diagnostic";

/* ------------------------------------------------------------------ */
/* Dimensões e áreas                                                   */
/* ------------------------------------------------------------------ */

export const dimensions: readonly Dimension[] = [
  {
    id: "colaboradores",
    letter: "A",
    title: "Potencial dos Colaboradores",
    shortTitle: "Colaboradores",
    question: "As competências da equipa estão a ser bem aproveitadas?",
    areas: [
      {
        id: "competencias",
        name: "Competências",
        statement: "As competências de cada colaborador estão identificadas e são conhecidas pelas chefias.",
        action: "Criar uma matriz de competências por colaborador e por função.",
      },
      {
        id: "talento",
        name: "Talento subaproveitado",
        statement: "As pessoas trabalham em funções que aproveitam a sua experiência e formação.",
        action: "Rever a afetação de pessoas às funções com base na matriz de competências.",
      },
      {
        id: "organizacao",
        name: "Organização",
        statement: "As responsabilidades de cada equipa estão definidas e não há sobreposições.",
        action: "Definir responsabilidades por equipa e eliminar sobreposições de funções.",
      },
      {
        id: "produtividade",
        name: "Produtividade",
        statement: "A empresa mede a produtividade das equipas e acompanha a sua evolução.",
        action: "Definir indicadores de produtividade por equipa e acompanhá-los todos os meses.",
      },
    ],
  },
  {
    id: "operacional",
    letter: "B",
    title: "Potencial Operacional",
    shortTitle: "Operacional",
    question: "Os processos funcionam de forma eficiente e sem desperdício?",
    areas: [
      {
        id: "processos",
        name: "Processos",
        statement: "Os principais processos estão documentados e são seguidos por todos.",
        action: "Documentar os processos críticos e nomear um responsável por cada um.",
      },
      {
        id: "ineficiencias",
        name: "Ineficiências",
        statement: "Os atrasos, erros e retrabalho são registados e analisados com regularidade.",
        action: "Registar atrasos, erros e retrabalho e analisar as causas todos os meses.",
      },
      {
        id: "custos",
        name: "Estrutura de custos",
        statement: "A empresa conhece o custo real de cada produto ou serviço.",
        action: "Implementar o cálculo do custo real por produto ou serviço.",
      },
      {
        id: "automatizacao",
        name: "Automatização",
        statement: "As tarefas repetitivas estão automatizadas ou apoiadas por software.",
        action: "Identificar as tarefas repetitivas com mais peso e avaliar a sua automatização.",
      },
    ],
  },
  {
    id: "financeiro",
    letter: "C",
    title: "Potencial Financeiro",
    shortTitle: "Financeiro",
    question: "Os recursos financeiros estão a gerar todo o retorno possível?",
    areas: [
      {
        id: "rentabilidade",
        name: "Rentabilidade",
        statement: "A margem de cada linha de negócio é conhecida e acompanhada todos os meses.",
        action: "Implementar um relatório mensal de margem por linha de negócio.",
      },
      {
        id: "investimento",
        name: "Capacidade de investimento",
        statement: "A empresa tem capacidade para financiar novos investimentos.",
        action: "Avaliar a capacidade de investimento e as fontes de financiamento disponíveis.",
      },
      {
        id: "eficiencia",
        name: "Eficiência financeira",
        statement: "Os prazos de recebimento e de pagamento são geridos de forma ativa.",
        action: "Rever os prazos médios de recebimento e de pagamento e fixar metas.",
      },
      {
        id: "expansao",
        name: "Oportunidades de expansão",
        statement: "Existe um plano financeiro para os próximos três anos.",
        action: "Elaborar um plano financeiro a três anos.",
      },
    ],
  },
  {
    id: "estrategico",
    letter: "D",
    title: "Potencial Estratégico",
    shortTitle: "Estratégico",
    question: "A empresa está preparada para inovar e chegar a novos mercados?",
    areas: [
      {
        id: "inovacao",
        name: "Inovação",
        statement: "A empresa lançou novos produtos, serviços ou processos nos últimos dois anos.",
        action: "Criar um processo regular para testar novos produtos, serviços ou processos.",
      },
      {
        id: "posicionamento",
        name: "Posicionamento",
        statement: "Os clientes reconhecem o que distingue a empresa da concorrência.",
        action: "Clarificar a proposta de valor e validá-la junto dos clientes.",
      },
      {
        id: "internacionalizacao",
        name: "Internacionalização",
        statement: "A empresa vende, ou tem planos concretos para vender, fora de Portugal.",
        action: "Estudar os mercados externos prioritários e os requisitos de entrada.",
      },
      {
        id: "crescimento",
        name: "Crescimento",
        statement: "Existem objetivos de crescimento definidos e partilhados com as equipas.",
        action: "Definir objetivos de crescimento a três anos e comunicá-los às equipas.",
      },
    ],
  },
];

export const allAreas = dimensions.flatMap((d) => d.areas.map((area) => ({ area, dimension: d })));
export const totalQuestions = allAreas.length;

export function getDimension(id: DimensionId): Dimension {
  const dimension = dimensions.find((d) => d.id === id);
  if (!dimension) throw new Error(`Dimensão desconhecida: ${id}`);
  return dimension;
}

export function findArea(areaId: string) {
  return allAreas.find((entry) => entry.area.id === areaId);
}

/* ------------------------------------------------------------------ */
/* Escala de resposta e listas do perfil                               */
/* ------------------------------------------------------------------ */

export const answerScale: ReadonlyArray<{ value: AnswerValue; label: string }> = [
  { value: 1, label: "Não" },
  { value: 2, label: "Pouco" },
  { value: 3, label: "Em parte" },
  { value: 4, label: "Em grande parte" },
  { value: 5, label: "Sim, totalmente" },
];

export function answerLabel(value: AnswerValue): string {
  return answerScale.find((option) => option.value === value)?.label ?? "";
}

export const sectors = [
  "Indústria transformadora",
  "Comércio",
  "Construção",
  "Turismo e restauração",
  "Tecnologias de informação e comunicação",
  "Transportes e logística",
  "Agricultura e agroalimentar",
  "Serviços às empresas",
  "Saúde e ação social",
  "Outro setor",
] as const;

/** Categorias de dimensão da União Europeia (critério do número de colaboradores). */
export const companySizes = [
  "Microempresa (menos de 10 colaboradores)",
  "Pequena empresa (10 a 49 colaboradores)",
  "Média empresa (50 a 249 colaboradores)",
  "Grande empresa (250 ou mais colaboradores)",
] as const;

export const statusLabels: Record<ActionStatus, string> = {
  "por-iniciar": "Por iniciar",
  "em-curso": "Em curso",
  concluida: "Concluída",
};

/* ------------------------------------------------------------------ */
/* Cálculo                                                             */
/* ------------------------------------------------------------------ */

/** Converte uma resposta (1 a 5) numa pontuação de 0 a 100. */
export function areaScore(answer: AnswerValue): number {
  return (answer - 1) * 25;
}

export interface DimensionResult {
  dimension: Dimension;
  /** Média das áreas respondidas (0 a 100), ou null sem respostas. */
  score: number | null;
  answered: number;
  weakest: { name: string; score: number } | null;
}

export function dimensionResult(dimension: Dimension, answers: Answers): DimensionResult {
  const scored = dimension.areas
    .map((area) => ({ area, answer: answers[area.id] }))
    .filter((entry): entry is { area: (typeof dimension.areas)[number]; answer: AnswerValue } => !!entry.answer)
    .map((entry) => ({ name: entry.area.name, score: areaScore(entry.answer) }));

  if (scored.length === 0) return { dimension, score: null, answered: 0, weakest: null };

  const score = Math.round(scored.reduce((sum, s) => sum + s.score, 0) / scored.length);
  const weakest = scored.reduce((min, s) => (s.score < min.score ? s : min));
  return { dimension, score, answered: scored.length, weakest };
}

export interface Summary {
  dimensions: DimensionResult[];
  /** Potencial realizado: média das dimensões com respostas (0 a 100). */
  realized: number | null;
  /** Margem de crescimento: 100 menos o potencial realizado. */
  margin: number | null;
  answered: number;
}

export function summarize(answers: Answers): Summary {
  const results = dimensions.map((d) => dimensionResult(d, answers));
  const scored = results.filter((r) => r.score !== null) as Array<DimensionResult & { score: number }>;
  const realized = scored.length
    ? Math.round(scored.reduce((sum, r) => sum + r.score, 0) / scored.length)
    : null;
  return {
    dimensions: results,
    realized,
    margin: realized === null ? null : 100 - realized,
    answered: results.reduce((sum, r) => sum + r.answered, 0),
  };
}

export function levelFor(score: number): string {
  if (score < 40) return "Inicial";
  if (score < 60) return "Em desenvolvimento";
  if (score < 80) return "Consolidado";
  return "Avançado";
}

const timeframes: Record<Priority, string> = {
  alta: "0 a 3 meses",
  media: "3 a 6 meses",
};

/**
 * Ações recomendadas: uma por cada área respondida com "Em parte" ou menos,
 * ordenadas da área mais fraca para a mais forte.
 */
export function recommendationsFor(answers: Answers): Recommendation[] {
  return allAreas
    .map(({ area, dimension }) => ({ area, dimension, answer: answers[area.id] }))
    .filter((entry): entry is typeof entry & { answer: AnswerValue } => !!entry.answer && entry.answer <= 3)
    .map(({ area, dimension, answer }) => {
      const priority: Priority = answer <= 2 ? "alta" : "media";
      return { area, dimension, answer, score: areaScore(answer), priority, timeframe: timeframes[priority] };
    })
    .sort((a, b) => a.score - b.score);
}

/* ------------------------------------------------------------------ */
/* Dados de demonstração                                               */
/* ------------------------------------------------------------------ */

export const demoState: AssessmentState = {
  isDemo: true,
  updatedAt: null,
  profile: {
    name: "Empresa Demonstração, Lda.",
    sector: "Indústria transformadora",
    size: "Pequena empresa (10 a 49 colaboradores)",
  },
  answers: {
    competencias: 3,
    talento: 2,
    organizacao: 4,
    produtividade: 2,
    processos: 3,
    ineficiencias: 2,
    custos: 3,
    automatizacao: 1,
    rentabilidade: 4,
    investimento: 3,
    eficiencia: 4,
    expansao: 2,
    inovacao: 2,
    posicionamento: 4,
    internacionalizacao: 1,
    crescimento: 3,
  },
  plan: [
    { areaId: "automatizacao", status: "em-curso" },
    { areaId: "internacionalizacao", status: "por-iniciar" },
    { areaId: "talento", status: "por-iniciar" },
  ],
};

export const emptyState: AssessmentState = {
  isDemo: false,
  updatedAt: null,
  profile: { name: "", sector: "", size: "" },
  answers: {},
  plan: [],
};
