---
product: material-ui
title: Componente de Acordeão React
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'component: Accordion'
materialDesign: https://material.io/archive/guidelines/components/expansion-panels.html
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#accordion'
---

# Acordeão

<p class="description">The accordion component allows the user to show and hide sections of related content on a page.</p>

[Um painel de expansão](https://material.io/archive/guidelines/components/expansion-panels.html) é um contêiner leve que pode estar sozinho ou conectado em uma superfície maior, como um cartão.

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **Nota:** Os acordeões não estão mais documentados nas [diretrizes do Material Design](https://material.io/), mas MUI continuará a suportá-los. Anteriormente, ele era formalmente conhecido como "painel de expansão".

## Acordeão básico

{{"demo": "BasicAccordion.js", "bg": true}}

## Acordeão controlado

Estenda o comportamento padrão para criar um acordeão customizado com o componente `Accordion`.

{{"demo": "ControlledAccordions.js", "bg": true}}

## Painéis de Expansão Customizados

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedAccordions.js"}}

## Performance

O conteúdo dos acordeões é montado por padrão, mesmo que o acordeão não esteja expandido. Esse comportamento padrão tem em mente a renderização do lado do servidor e o SEO. Se você renderizar grandes árvores de componentes dentro de seu acordeão ou simplesmente renderizar muitos acordeões, pode ser uma boa ideia desabilitar esse comportamento padrão habilitando `unmountOnExit` em `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

Como acontece com qualquer otimização de desempenho, isso não é uma bala de prata. Be sure to identify bottlenecks first and then try out these optimization strategies.

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Para melhor acessibilidade recomendamos a definição do `id` e `aria-controls` no `AccordionSummary`. O `Accordion` irá derivar os valores de `aria-labelledby` e `id` para a região de conteúdo do acordeão.
