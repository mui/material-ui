---
product: material-ui
title: Componente de Acordeão React
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'component: Accordion'
materialDesign: https://m1.material.io/components/expansion-panels.html
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
---

# Acordeão

<p class="description">O componente acordeão permite o usuário exibir e ocultar seções de conteúdo relacionado em uma página.</p>

Um acordeão é um contêiner leve que pode estar sozinho ou conectado em uma superfície maior, como um cartão.

{{"component": "modules/components/ComponentLinkHeader.js"}}

:::info
**Note:** Accordions are no longer documented in the [Material Design guidelines](https://m2.material.io/), but MUI will continue to support them. It was formerly known as the "expansion panel".
:::

## Acordeão básico

{{"demo": "BasicAccordion.js", "bg": true}}

## Acordeão controlado

Extend the default behavior to create an accordion with the `Accordion` component.

{{"demo": "ControlledAccordions.js", "bg": true}}

## Painéis de Expansão Customizados

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedAccordions.js"}}

## Performance

The content of Accordions is mounted by default even if the accordion is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your accordion details or simply render many accordions it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies.

## Acessibilidade

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

For optimal accessibility we recommend setting `id` and `aria-controls` on the `AccordionSummary`. The `Accordion` will derive the necessary `aria-labelledby` and `id` for the content region of the accordion.
