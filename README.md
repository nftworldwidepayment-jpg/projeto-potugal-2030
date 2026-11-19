# PORTUGAL POTENTIAL 2030

**Transformar potencial em crescimento.**

Website institucional da iniciativa PORTUGAL POTENTIAL 2030 — Fase 1: página inicial e base de arquitetura para a futura plataforma de diagnóstico empresarial.

## Tecnologia

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS 4 (tokens definidos em `src/app/globals.css`)
- Lucide (ícones) · Inter via `next/font`

Sem outras dependências de execução.

## Comandos

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:3000
npm run build    # build de produção
npm run start    # servir o build
npm run lint
```

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Página inicial: Início, O desafio, A Plataforma, As Quatro Dimensões, Como Funciona, Impacto, chamada à ação |
| `/plataforma` | Destino de "Explorar a Plataforma": módulos previstos por etapa e pré-visualização do painel (em desenvolvimento) |
| `/privacidade`, `/aviso-legal` | Documentos institucionais provisórios |

Todas as páginas são geradas estaticamente. Não há backend nem recolha de dados.

## Estrutura

```
src/
  app/                    rotas, layout, estilos globais e ícone
  components/
    brand/                logótipo e símbolo dos quatro quadrantes
    layout/               cabeçalho, menu móvel, rodapé, cabeçalhos de página
    sections/             secções da página inicial
    dashboard/            componentes do painel (reutilizáveis no painel real)
    ui/                   botão, contentor, secção, etiqueta "Exemplo demonstrativo"
  hooks/                  realce da secção ativa na navegação
  lib/
    site.ts               nome, tagline, navegação
    dimensions.ts         as quatro dimensões e as suas áreas de análise
    platform-modules.ts   etapas do percurso e módulos previstos
    demo-assessment.ts    avaliação fictícia (apenas para a pré-visualização)
  types/diagnostic.ts     modelo de domínio do diagnóstico
```

## Princípios de conteúdo

- Todo o texto visível em português europeu (Acordo Ortográfico de 1990).
- Sem estatísticas, testemunhos, parceiros ou resultados inventados. Os números da secção "A Plataforma" (4 dimensões, 16 áreas, 4 etapas) são derivados do próprio conteúdo.
- Qualquer visualização com dados fictícios usa `isDemo: true` e mostra a etiqueta **Exemplo demonstrativo**.
- Os impactos são apresentados como resultados pretendidos, não comprovados.

## Próximas fases

A arquitetura está preparada para os módulos previstos (ver `src/lib/platform-modules.ts`, com rotas reservadas em `/plataforma/*`):

1. Perfil empresarial e registo
2. Questionário de diagnóstico
3. Motor de avaliação das quatro dimensões
4. Painel de potencial — reutiliza `components/dashboard/*` com dados reais
5. Recomendações personalizadas
6. Plano de ação
7. Relatório exportável

Antes de recolher quaisquer dados será necessário rever a Política de Privacidade e o Aviso Legal, e ponderar a introdução de shadcn/ui para formulários e componentes interativos mais complexos.
