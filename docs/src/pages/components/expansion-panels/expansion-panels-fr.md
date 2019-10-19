---
title: Composant React Panneau d'expansion
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion Panels (Panneaux d'extension)

<p class="description">Les panneaux d’extension contiennent des flux de création et permettent une édition légère d’un élément.</p>

[Un panneau d'extension](https://material.io/archive/guidelines/components/expansion-panels.html) est un conteneur léger pouvant être autonome ou connecté à une surface plus grande, telle qu'une carte.

> **Note:** Expansion panels are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them.

## Simple Expansion Panel

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js"}}

## Controlled Accordion

Extend the default panel behavior to create an accordion with the `ExpansionPanel` component.

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js"}}

## Customized expansion panels

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}

## Performance

The content of ExpansionPanels is mounted by default even if the panel is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />
```

As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies.

## Secondary heading and Columns

Multiple columns can be used to structure the content, and a helper text may be added to the panel to assist the user.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js"}}

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

For optimal accessibility we recommend setting `id` and `aria-controls` on the `ExpansionPanelSummary`. The `ExpansionPanel` will derive the necessary `aria-labelledby` and `id` for the content region of the panel.