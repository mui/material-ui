---
title: Componente React para Painéis de Expansão
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Painéis de Expansão

<p class="description">Os painéis de expansão contêm fluxos de criação e permitem a edição simplificada de um elemento.</p>

[Um painel de expansão](https://material.io/archive/guidelines/components/expansion-panels.html) é um contêiner leve que pode estar sozinho ou conectado em uma superfície maior, como um cartão.

> **Nota:** Os painéis de expansão não estão mais documentados nas [diretrizes do Material Design](https://material.io/), mas o Material-UI continuará a suportá-los.

## Painel de Expansão Simples

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js"}}

## Acordeão Controlado

Estenda o comportamento padrão do painel para criar um acordeão com o componente `ExpansionPanel`.

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js"}}

## Painéis de Expansão Customizados

Aqui esta um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}

## Performance

O conteúdo dos painéis de expansão é montado por padrão, mesmo que o painel não esteja expandido. Esse comportamento padrão tem em mente a renderização do lado do servidor e o SEO. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />
```

As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies.

## Cabeçalho Secundário e Colunas

Multiple columns can be used to structure the content, and a helper text may be added to the panel to assist the user.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

For optimal accessibility we recommend setting `id` and `aria-controls` on the `ExpansionPanelSummary`. The `ExpansionPanel` will derive the necessary `aria-labelledby` and `id` for the content region of the panel.