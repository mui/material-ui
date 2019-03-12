---
title: Expansion Panel React component
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---
# Expansion Panels (Painéis de Expansão)

<p class="description">Expansion panels contain creation flows and allow lightweight editing of an element.</p>

[An expansion panel](https://material.io/archive/guidelines/components/expansion-panels.html) is a lightweight container that may either stand alone or be connected to a larger surface, such as a card.

> **Note:** Expansion panels are no longer documented in the Material Design documentation.

## Acessibilidade

Para melhor acessibilidade recomendamos a definição de `id` e `aria-controles` no `ExpansionPanelSummary`. O `ExpansionPanel` irá derivar o necessário `aria-labelledby` e `id` para a região de conteúdo do painel.

## Painel de Expansão Simples

{{"demo": "pages/demos/expansion-panels/SimpleExpansionPanel.js"}}

## Acordeão Controlado

Estenda o comportamento padrão do painel para criar um acordeão com o componente `ExpansionPanel`.

{{"demo": "pages/demos/expansion-panels/ControlledExpansionPanels.js"}}

## Cabeçalho Secundário e Colunas

Várias colunas podem ser usadas para estruturar o conteúdo, e um texto auxiliar pode ser adicionado ao painel para auxiliar o usuário.

{{"demo": "pages/demos/expansion-panels/DetailedExpansionPanel.js"}}

## Performance

The content of ExpansionPanels is mounted by default even if the panel is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`: `<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />`. As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies.

## Painel de Expansão Personalizado

Se você leu a página [documentação de sobreposição (Overrides)](/customization/overrides/), mas você não está confiante em como utilizar, aqui está um exemplo de como você pode personalizar o background do `ExpansionPanelSummary` e padding de `ExpansionPanelDetails`.

⚠️ Embora a especificação do design do material incentive o tema, esses exemplos estão fora do caminho comum.

{{"demo": "pages/demos/expansion-panels/CustomizedExpansionPanel.js"}}