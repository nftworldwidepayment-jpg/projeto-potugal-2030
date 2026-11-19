# PORTUGAL POTENTIAL 2030

**Transformar potencial em crescimento.**

Protótipo da plataforma de diagnóstico do PORTUGAL POTENTIAL 2030: uma aplicação com dois separadores, Painel e Diagnóstico, para avaliar o potencial de crescimento de uma empresa em quatro dimensões.

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

## A aplicação

Protótipo de software com dois separadores, no formato de uma aplicação (não é uma landing page):

| Separador | Rota | Conteúdo |
|---|---|---|
| **Painel** | `/` | Potencial realizado da empresa, resultado por dimensão, próximas ações (com o porquê de cada uma), plano de ação com estado editável, detalhe das 16 áreas e exportação do relatório (impressão ou PDF). |
| **Diagnóstico** | `/diagnostico` | Perfil da empresa e 16 questões (4 por dimensão), numa escala de 1 a 5. O painel é recalculado a cada resposta. |

Abre com uma empresa de demonstração (fictícia) para haver algo para explorar. O utilizador pode limpar os dados e fazer o diagnóstico da própria empresa, ou repor a demonstração.

Também existem `/privacidade` e `/aviso-legal` (documentos provisórios) e a janela **Sobre**, com a descrição da iniciativa e a forma de cálculo.

### Cálculo

- Cada resposta (1 a 5) vale 0, 25, 50, 75 ou 100 pontos.
- Dimensão: média das suas 4 áreas. Potencial realizado: média das 4 dimensões. Margem de crescimento: 100 menos o potencial realizado.
- Cada área com resposta "Em parte" ou inferior gera uma ação recomendada; com "Não" ou "Pouco" a prioridade é alta (0 a 3 meses), caso contrário média (3 a 6 meses).

O modelo está em `src/lib/model.ts`. Não há backend: os dados ficam no `localStorage` do navegador (`src/lib/assessment-store.ts`).

## Estrutura

```
src/
  app/                  rotas (painel, diagnóstico, documentos), layout, ícones e manifesto
  components/
    app/                cabeçalho, separadores (topo e barra inferior no telemóvel), janela Sobre
    painel/             resumo da empresa, dimensões, próximas ações, plano, detalhe por área
    diagnostico/        passos, perfil, questões e escala de resposta
    ui/                 botão, contentor, cartões
  lib/
    model.ts            dimensões, áreas, questões, ações, cálculo e dados de demonstração
    assessment-store.ts estado partilhado e guardado no navegador
  types/diagnostic.ts   tipos do domínio
```

## Princípios

- Todo o texto visível em português europeu (Acordo Ortográfico de 1990), sem travessões.
- Aspeto de software: cabeçalho de aplicação, separadores, cartões e dados. Sem hero, sem slogans, sem fundos decorativos.
- Dados de demonstração sempre identificados como tal; resultados calculados de forma transparente.

## Experiência móvel

- Separadores numa barra inferior, ao alcance do polegar; índice do painel em destaque e centrado.
- Respostas em lista vertical com áreas de toque largas; passos do diagnóstico numa faixa horizontal que acompanha o passo atual.
- Áreas de toque de pelo menos 44 px, suporte a ecrãs com entalhe, ícone para o ecrã principal.
- Verificado com Playwright a 320, 360, 390 e 414 px, em modo horizontal e em tablet: sem scroll horizontal.

## Próximas fases

Já existem, nesta versão, o perfil da empresa, o questionário, o cálculo por dimensão, o painel, as recomendações, o plano de ação e o relatório (impressão). Para passar a produção faltam:

- Contas de utilizador e armazenamento em servidor (hoje tudo fica no navegador).
- Validação do questionário e do modelo de cálculo por especialistas.
- Versões definitivas da Política de Privacidade e do Aviso Legal antes de recolher quaisquer dados.
