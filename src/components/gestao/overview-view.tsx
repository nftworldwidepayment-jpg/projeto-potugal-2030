import { Card, CardHeader, ScoreBar } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { dimensions, levelFor, levelHelp } from "@/lib/model";
import { criticalAreas, dimensionAverages, levelDistribution, portfolioStats } from "@/lib/portfolio";
import { heatColors } from "./heat";
import { SectorExplorer } from "./sector-explorer";

/** Separador Visão Geral da entidade gestora. */
export function OverviewView() {
  const pctDone = Math.round((portfolioStats.actionsDone / portfolioStats.actions) * 100);

  const kpis = [
    {
      label: "Empresas diagnosticadas",
      value: String(portfolioStats.companies),
      sub: `${portfolioStats.sectors} setores · ${portfolioStats.regions} regiões`,
      help: "Empresas da carteira com o diagnóstico concluído.",
    },
    {
      label: "Potencial realizado médio",
      value: String(portfolioStats.realized),
      sub: levelFor(portfolioStats.realized),
      help: `Média do potencial realizado das empresas, de 0 a 100. ${levelHelp}`,
    },
    {
      label: "Margem de crescimento média",
      value: `${portfolioStats.margin} pts`,
      sub: `Dimensão mais fraca: ${portfolioStats.weakestDimension.shortTitle}`,
      help: "O que falta, em média, para 100 pontos. Indica o espaço de crescimento da carteira.",
    },
    {
      label: "Ações concluídas",
      value: `${pctDone}%`,
      sub: `${portfolioStats.actionsDone} de ${portfolioStats.actions} · ${portfolioStats.actionsInProgress} em curso`,
      help: "Ações dos planos de ação de todas as empresas que já estão concluídas.",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      <h1 className="sr-only">Visão Geral da carteira</h1>

      <p className="rounded-xl border border-steel-pale bg-mist px-4 py-3 text-sm text-navy">
        <span className="font-semibold">Carteira de demonstração.</span> {portfolioStats.companies} empresas
        fictícias, com nomes inventados e respostas geradas para ilustrar a vista da entidade gestora.
      </p>

      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {kpis.map((kpi) => (
          <li key={kpi.label} className="rounded-xl border border-line bg-white p-3.5 sm:p-4">
            <p className="flex items-start gap-1 text-xs leading-snug text-muted">
              <span>{kpi.label}</span>
              <InfoTooltip label={kpi.label} text={kpi.help} />
            </p>
            <p className="mt-2 text-2xl leading-none font-semibold text-navy tabular-nums sm:text-3xl">{kpi.value}</p>
            <p className="mt-1.5 text-xs leading-snug text-muted">{kpi.sub}</p>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        <Card aria-labelledby="dim-medias">
          <CardHeader
            id="dim-medias"
            title={
              <span className="inline-flex items-center gap-1.5">
                Resultado médio por dimensão
                <InfoTooltip label="Resultado médio por dimensão" text="Média das empresas da carteira em cada dimensão, de 0 a 100." />
              </span>
            }
          />
          <ul className="space-y-3.5 px-4 py-4 sm:px-5">
            {dimensions.map((d) => (
              <li key={d.id}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-ink">
                    <span className="mr-1.5 font-semibold text-steel">{d.letter}</span>
                    {d.shortTitle}
                  </span>
                  <span className="font-semibold text-navy tabular-nums">{dimensionAverages[d.id]}</span>
                </div>
                <ScoreBar value={dimensionAverages[d.id]} className="mt-1.5" />
              </li>
            ))}
          </ul>
        </Card>

        <Card aria-labelledby="niveis">
          <CardHeader
            id="niveis"
            title={
              <span className="inline-flex items-center gap-1.5">
                Empresas por nível
                <InfoTooltip label="Empresas por nível" text={`Número de empresas em cada nível de potencial realizado. ${levelHelp}`} />
              </span>
            }
          />
          <div className="px-4 py-4 sm:px-5">
            <div
              role="img"
              aria-label={levelDistribution.map((l) => `${l.label}: ${l.count}`).join(", ")}
              className="flex h-7 w-full gap-[2px] overflow-hidden rounded-md"
            >
              {levelDistribution.map((l, i) =>
                l.count > 0 ? (
                  <div
                    key={l.label}
                    className="flex h-full items-center px-2 text-xs font-semibold tabular-nums"
                    style={{
                      width: `${(l.count / portfolioStats.companies) * 100}%`,
                      backgroundColor: heatColors[i].bg,
                      color: heatColors[i].text,
                    }}
                  >
                    {l.count}
                  </div>
                ) : null,
              )}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {levelDistribution.map((l, i) => (
                <li key={l.label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-ink">
                    <span aria-hidden="true" className="size-3 rounded-sm" style={{ backgroundColor: heatColors[i].bg }} />
                    {l.label}
                  </span>
                  <span className="text-muted tabular-nums">
                    {l.count} {l.count === 1 ? "empresa" : "empresas"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card aria-labelledby="criticas">
          <CardHeader
            id="criticas"
            title={
              <span className="inline-flex items-center gap-1.5">
                Áreas mais críticas
                <InfoTooltip
                  label="Áreas mais críticas"
                  text="As cinco áreas com pontuação média mais baixa na carteira, e quantas empresas responderam Não ou Pouco. Indicam onde concentrar programas de apoio."
                />
              </span>
            }
          />
          <ol className="divide-y divide-line">
            {criticalAreas.map((c, i) => (
              <li key={c.area.id} className="flex items-center gap-3 px-4 py-2.5 sm:px-5">
                <span className="w-4 text-xs font-semibold text-steel tabular-nums">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{c.area.name}</p>
                  <p className="text-xs text-muted">
                    {c.dimension.shortTitle} · {c.highPriority} {c.highPriority === 1 ? "empresa" : "empresas"} com prioridade alta
                  </p>
                </div>
                <span className="text-sm font-semibold text-navy tabular-nums">{c.average}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <SectorExplorer />
    </div>
  );
}
