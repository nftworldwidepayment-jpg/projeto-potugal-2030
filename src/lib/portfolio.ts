import type {
  ActionStatus,
  AnswerValue,
  Answers,
  DimensionId,
  PlanItem,
  PortfolioCompany,
} from "@/types/diagnostic";
import {
  allAreas,
  areaScore,
  dimensions,
  levelIndex,
  levels,
  recommendationsFor,
  sectorShort,
  summarize,
  type Summary,
} from "./model";

/*
 * Carteira de demonstração da entidade gestora: 24 empresas FICTÍCIAS.
 * Os nomes foram inventados e as respostas são geradas de forma
 * determinística (sempre iguais), com tendências por setor, apenas para
 * ilustrar a vista agregada. Não representam empresas nem dados reais.
 */

const SIZES = {
  micro: "Microempresa (menos de 10 colaboradores)",
  pequena: "Pequena empresa (10 a 49 colaboradores)",
  media: "Média empresa (50 a 249 colaboradores)",
} as const;

export const regions = ["Norte", "Centro", "Lisboa", "Alentejo", "Algarve", "Açores", "Madeira"] as const;

type Seed = [id: string, name: string, sector: string, size: keyof typeof SIZES, region: (typeof regions)[number]];

const seeds: Seed[] = [
  ["moldes-atlantida", "Moldes Atlântida, Lda.", "Indústria transformadora", "media", "Centro"],
  ["fio-norte-texteis", "Fio Norte Têxteis, S.A.", "Indústria transformadora", "media", "Norte"],
  ["cortica-valverde", "Cortiça Valverde, Lda.", "Indústria transformadora", "pequena", "Alentejo"],
  ["metalurgica-ribafria", "Metalúrgica Ribafria, Lda.", "Indústria transformadora", "pequena", "Norte"],
  ["armazens-sete-colinas", "Armazéns Sete Colinas, Lda.", "Comércio", "pequena", "Lisboa"],
  ["loja-mar-salgado", "Loja Mar Salgado, Unipessoal Lda.", "Comércio", "micro", "Algarve"],
  ["distribuidora-planalto", "Distribuidora Planalto, S.A.", "Comércio", "media", "Centro"],
  ["construcoes-pedra-alta", "Construções Pedra Alta, Lda.", "Construção", "pequena", "Norte"],
  ["engenharia-vale-fundo", "Engenharia Vale Fundo, Lda.", "Construção", "media", "Lisboa"],
  ["hotel-baia-serena", "Hotel Baía Serena, S.A.", "Turismo e restauração", "media", "Algarve"],
  ["quinta-do-miradouro", "Quinta do Miradouro Turismo, Lda.", "Turismo e restauração", "pequena", "Madeira"],
  ["mare-cheia-restauracao", "Maré Cheia Restauração, Lda.", "Turismo e restauração", "micro", "Açores"],
  ["bytecais-software", "Bytecais Software, Lda.", "Tecnologias de informação e comunicação", "pequena", "Lisboa"],
  ["nordata-sistemas", "Nordata Sistemas, S.A.", "Tecnologias de informação e comunicação", "media", "Norte"],
  ["pixelvinha-digital", "Pixelvinha Digital, Lda.", "Tecnologias de informação e comunicação", "micro", "Centro"],
  ["rota-sul-transportes", "Rota Sul Transportes, Lda.", "Transportes e logística", "media", "Alentejo"],
  ["ponte-nova-logistica", "Ponte Nova Logística, S.A.", "Transportes e logística", "media", "Lisboa"],
  ["horticola-campo-largo", "Hortícola Campo Largo, Lda.", "Agricultura e agroalimentar", "pequena", "Alentejo"],
  ["conservas-ilheu-azul", "Conservas Ilhéu Azul, Lda.", "Agricultura e agroalimentar", "media", "Açores"],
  ["lacticinios-serra-fria", "Lacticínios Serra Fria, Lda.", "Agricultura e agroalimentar", "pequena", "Centro"],
  ["rigor-e-conta", "Rigor e Conta Contabilidade, Lda.", "Serviços às empresas", "micro", "Norte"],
  ["praca-nova-consultores", "Praça Nova Consultores, Lda.", "Serviços às empresas", "pequena", "Lisboa"],
  ["clinica-sol-nascente", "Clínica Sol Nascente, Lda.", "Saúde e ação social", "pequena", "Centro"],
  ["residencias-jardim-oliveiras", "Residências Jardim das Oliveiras, Lda.", "Saúde e ação social", "pequena", "Madeira"],
];

/** Tendência média de resposta (1 a 5) por setor e dimensão. */
const sectorBias: Record<string, Record<DimensionId, number>> = {
  "Indústria transformadora": { colaboradores: 2.8, operacional: 3.3, financeiro: 3.0, estrategico: 2.4 },
  Comércio: { colaboradores: 2.6, operacional: 2.7, financeiro: 3.0, estrategico: 2.3 },
  Construção: { colaboradores: 2.4, operacional: 2.5, financeiro: 2.6, estrategico: 2.0 },
  "Turismo e restauração": { colaboradores: 2.6, operacional: 2.3, financeiro: 2.6, estrategico: 2.9 },
  "Tecnologias de informação e comunicação": { colaboradores: 3.6, operacional: 3.7, financeiro: 3.1, estrategico: 3.6 },
  "Transportes e logística": { colaboradores: 2.7, operacional: 3.2, financeiro: 2.8, estrategico: 2.5 },
  "Agricultura e agroalimentar": { colaboradores: 2.3, operacional: 2.3, financeiro: 2.5, estrategico: 2.7 },
  "Serviços às empresas": { colaboradores: 3.2, operacional: 3.0, financeiro: 3.1, estrategico: 2.8 },
  "Saúde e ação social": { colaboradores: 3.0, operacional: 2.6, financeiro: 2.5, estrategico: 2.2 },
};

/** Desvios por área, comuns a todos os setores. */
const areaBias: Partial<Record<string, number>> = {
  internacionalizacao: -0.7,
  automatizacao: -0.4,
  expansao: -0.3,
  produtividade: -0.3,
  custos: -0.2,
  posicionamento: 0.3,
  organizacao: 0.2,
  eficiencia: 0.2,
};

const ownerByDimension: Record<DimensionId, string> = {
  colaboradores: "Recursos Humanos",
  operacional: "Direção de Operações",
  financeiro: "Direção Financeira",
  estrategico: "Direção-Geral",
};

/** Ajuste global, para a carteira cobrir os quatro níveis. */
const LIFT = 0.45;

/** Gerador pseudoaleatório determinístico (mulberry32). */
function random(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function buildCompany([id, name, sector, size, region]: Seed, index: number): PortfolioCompany {
  const rand = random(2030 + index * 7919);
  const companyOffset = (rand() - 0.5) * 1.2;

  const answers: Answers = {};
  for (const { area, dimension } of allAreas) {
    const base = sectorBias[sector][dimension.id] + (areaBias[area.id] ?? 0) + companyOffset + LIFT;
    const value = Math.round(base + (rand() - 0.5) * 1.8);
    answers[area.id] = Math.min(5, Math.max(1, value)) as AnswerValue;
  }

  const assessedOn = addDays("2026-09-01", Math.floor(rand() * 78));

  const planSize = 2 + Math.floor(rand() * 4);
  const plan: PlanItem[] = recommendationsFor(answers)
    .slice(0, planSize)
    .map((rec) => {
      const roll = rand();
      const status: ActionStatus = roll < 0.25 ? "concluida" : roll < 0.6 ? "em-curso" : "por-iniciar";
      return {
        areaId: rec.area.id,
        status,
        owner: ownerByDimension[rec.dimension.id],
        dueDate: addDays(assessedOn, rec.priority === "alta" ? 90 : 180),
      };
    });

  return { id, profile: { name, sector, size: SIZES[size] }, region, assessedOn, answers, plan };
}

export const portfolio: readonly PortfolioCompany[] = seeds.map(buildCompany);

export function getCompany(id: string): PortfolioCompany | undefined {
  return portfolio.find((company) => company.id === id);
}

/* ------------------------------------------------------------------ */
/* Agregados da carteira                                               */
/* ------------------------------------------------------------------ */

export interface CompanyRow {
  company: PortfolioCompany;
  summary: Summary;
  realized: number;
  weakestDimension: string;
  done: number;
}

export const companyRows: readonly CompanyRow[] = portfolio.map((company) => {
  const summary = summarize(company.answers);
  const weakest = [...summary.dimensions].sort((a, b) => (a.score ?? 0) - (b.score ?? 0))[0];
  return {
    company,
    summary,
    realized: summary.realized ?? 0,
    weakestDimension: weakest.dimension.shortTitle,
    done: company.plan.filter((item) => item.status === "concluida").length,
  };
});

function mean(values: number[]): number {
  return values.length ? Math.round(values.reduce((sum, v) => sum + v, 0) / values.length) : 0;
}

/** Média da carteira por dimensão (para comparar uma empresa com o conjunto). */
export const dimensionAverages = Object.fromEntries(
  dimensions.map((d) => [
    d.id,
    mean(companyRows.map((row) => row.summary.dimensions.find((r) => r.dimension.id === d.id)?.score ?? 0)),
  ]),
) as Record<DimensionId, number>;

const allPlanItems = portfolio.flatMap((company) => company.plan);

export const portfolioStats = {
  companies: portfolio.length,
  sectors: new Set(portfolio.map((c) => c.profile.sector)).size,
  regions: new Set(portfolio.map((c) => c.region)).size,
  realized: mean(companyRows.map((row) => row.realized)),
  margin: 100 - mean(companyRows.map((row) => row.realized)),
  actions: allPlanItems.length,
  actionsDone: allPlanItems.filter((item) => item.status === "concluida").length,
  actionsInProgress: allPlanItems.filter((item) => item.status === "em-curso").length,
  weakestDimension: [...dimensions].sort((a, b) => dimensionAverages[a.id] - dimensionAverages[b.id])[0],
  lastAssessment: [...portfolio].map((c) => c.assessedOn).sort().at(-1) ?? "",
};

/** Número de empresas em cada nível de potencial realizado. */
export const levelDistribution = levels.map((level, index) => ({
  label: level.label,
  count: companyRows.filter((row) => levelIndex(row.realized) === index).length,
}));

export interface SectorRow {
  sector: string;
  short: string;
  count: number;
  overall: number;
  byDimension: Record<DimensionId, number>;
}

export const sectorMatrix: readonly SectorRow[] = Object.keys(sectorBias)
  .map((sector) => {
    const rows = companyRows.filter((row) => row.company.profile.sector === sector);
    return {
      sector,
      short: sectorShort[sector] ?? sector,
      count: rows.length,
      overall: mean(rows.map((row) => row.realized)),
      byDimension: Object.fromEntries(
        dimensions.map((d) => [
          d.id,
          mean(rows.map((row) => row.summary.dimensions.find((r) => r.dimension.id === d.id)?.score ?? 0)),
        ]),
      ) as Record<DimensionId, number>,
    };
  })
  .filter((row) => row.count > 0)
  .sort((a, b) => b.overall - a.overall);

/** Áreas com pontuação média mais baixa na carteira. */
export const criticalAreas = allAreas
  .map(({ area, dimension }) => {
    const scores = portfolio.map((c) => areaScore(c.answers[area.id] ?? 1));
    const highPriority = portfolio.filter((c) => (c.answers[area.id] ?? 1) <= 2).length;
    return { area, dimension, average: mean(scores), highPriority };
  })
  .sort((a, b) => a.average - b.average)
  .slice(0, 5);
