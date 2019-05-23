---
title: Componente React para Painéis de Expansão
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Painéis de Expansão

<p class="description">Os painéis de expansão contêm fluxos de criação e permitem a edição simplificada de um elemento.</p>

[Um painel de expansão](https://material.io/archive/guidelines/components/expansion-panels.html) é um contêiner leve que pode estar sozinho ou conectado em uma superfície maior, como um cartão.

> **Nota:** Os painéis de expansão não estão mais documentados na documentação do Material Design.

## Acessibilidade

Para melhor acessibilidade recomendamos a definição de `id` e `aria-controles` no `ExpansionPanelSummary`. O `ExpansionPanel` irá derivar os valores de `aria-labelledby` e `id` para a região de conteúdo do painel.

## Painel de Expansão Simples

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js"}}

## Acordeão Controlado

Estenda o comportamento padrão do painel para criar um acordeão com o componente `ExpansionPanel`.

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js"}}

## Cabeçalho Secundário e Colunas

Várias colunas podem ser usadas para estruturar o conteúdo, e um texto auxiliar pode ser adicionado ao painel para ajudar o usuário.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js"}}

## Performance

O conteúdo dos painéis de expansão é montado por padrão, mesmo que o painel não esteja expandido. Esse comportamento padrão tem em mente a renderização do lado do servidor e o SEO. Se você renderizar grandes árvores de componentes dentro de seu painel ou simplesmente renderizar muitos painéis, pode ser uma boa ideia desabilitar esse comportamento padrão habilitando `unmountOnExit` em `TransitionProps`: `<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />`. Como acontece com qualquer otimização de desempenho, isso não é uma bala de prata. Certifique-se de identificar gargalos primeiro e, em seguida, experimente essas estratégias de otimização.

## Painéis de Expansão Customizados

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}