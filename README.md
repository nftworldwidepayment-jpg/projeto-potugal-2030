# PORTUGAL POTENTIAL 2030

**Transformar potencial em crescimento.**

Protótipo da plataforma de diagnóstico do PORTUGAL POTENTIAL 2030, com dois perfis: a entidade gestora, que acompanha uma carteira de empresas, e a empresa, que faz o seu diagnóstico e gere o plano de ação.

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

Protótipo de software no formato do projeto Santander: um ecrã de entrada para escolher o perfil e, em cada perfil, dois separadores.

| Perfil | Separador | Rota | Conteúdo |
|---|---|---|---|
| (entrada) | | `/` | Escolha do perfil. O perfil fica guardado no navegador; "Mudar de perfil" volta aqui. |
| **Entidade gestora** | Visão Geral | `/gestao` | Indicadores da carteira, resultado médio por dimensão, empresas por nível, áreas mais críticas, mapa de calor setor × dimensão (tocar num setor filtra a lista) e lista de empresas com pesquisa, filtros, ordenação e exportação para Excel. |
| | Visão Empresa | `/gestao/empresas/[id]` | Painel de cada empresa (só leitura), comparado com a média da carteira; lista lateral no desktop e seletor no telemóvel; empresa anterior e seguinte. |
| **Empresa** | Painel | `/empresa` | Potencial realizado, resultado por dimensão, próximas ações com o porquê, plano de ação (estado, responsável, data limite, notas, alerta de atraso), exportação do plano para Excel e do relatório (impressão ou PDF). |
| | Diagnóstico | `/empresa/diagnostico` | Perfil da empresa e 16 questões numa escala de 1 a 5; o painel é recalculado a cada resposta. |

Comum aos dois perfis: ícones "i" com a explicação de cada métrica, mensagens de confirmação com **Anular** (adicionar ou remover ações, limpar respostas, repor a demonstração), guia de primeira visita em três passos (pode ser revisto na janela **Sobre**) e documentos provisórios em `/privacidade` e `/aviso-legal`.

### Dados de demonstração

- **Empresa:** abre com uma empresa fictícia; pode ser apagada para fazer o diagnóstico de uma empresa real, ou reposta.
- **Entidade gestora:** carteira de 24 empresas fictícias (9 setores, 7 regiões), com nomes inventados e respostas geradas de forma determinística em `src/lib/portfolio.ts`. Está sempre identificada como fictícia.

### Cálculo

- Cada resposta (1 a 5) vale 0, 25, 50, 75 ou 100 pontos.
- Dimensão: média das suas 4 áreas. Potencial realizado: média das 4 dimensões. Margem de crescimento: 100 menos o potencial realizado.
- Níveis: Inicial (menos de 40), Em desenvolvimento (40 a 59), Consolidado (60 a 79), Avançado (80 ou mais).
- Cada área com resposta "Em parte" ou inferior gera uma ação recomendada; com "Não" ou "Pouco" a prioridade é alta (0 a 3 meses), caso contrário média (3 a 6 meses).

O modelo está em `src/lib/model.ts`. Não há backend: os dados ficam no `localStorage` do navegador. As exportações para Excel usam CSV com separador ";" e acentos corretos para o Excel em português.

## Estrutura

```
src/
  app/
    (entrada)/          ecrã de escolha do perfil
    (app)/              área da aplicação: cabeçalho, separadores, guia
      gestao/           Visão Geral e Visão Empresa (uma página por empresa)
      empresa/          Painel e Diagnóstico
  components/
    app/                cabeçalho, separadores, entrada, guia, janela Sobre
    gestao/             indicadores, mapa de calor, lista e seletor de empresas
    painel/             resumo, dimensões, próximas ações, plano, relatório
    diagnostico/        passos, perfil, questões e escala de resposta
    ui/                 botões, cartões, ícone "i", mensagens de confirmação
  lib/
    model.ts            dimensões, áreas, questões, ações, cálculo e níveis
    portfolio.ts        carteira de demonstração e agregados
    assessment-store.ts diagnóstico da empresa (guardado no navegador)
    prefs-store.ts      perfil escolhido e guias vistos
    csv.ts              exportação para Excel
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
