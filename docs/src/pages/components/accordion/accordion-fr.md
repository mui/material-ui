---
title: Composant React Panneau d'expansion
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
---

# Accordion (Panneau d'extension)

<p class="description">Les panneaux d’extension contiennent des flux de création et permettent une édition légère d’un élément.</p>

[Un panneau d'extension](https://material.io/archive/guidelines/components/expansion-panels.html) est un conteneur léger pouvant être autonome ou connecté à une surface plus grande, telle qu'une carte.

> **Note:** Expansion panels are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them.

## Panneau d'extension simple

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Accordéon contrôlé

Étendez le comportement du panneau par défaut pour créer un accordéon avec le composant `Accordion`.

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Customized accordions

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Additional actions

In order to put an action such as a `Checkbox` or a button inside of the `AccordionSummary`, you need to stop the propagation of the focus and click events to prevent the panel from expanding/collapsing when using the action. You should also provide an `aria-label` for the action, otherwise the label of the nested action will be included in the label of the parent button that controls the accordion expansion.

{{"demo": "pages/components/accordion/ActionsInAccordionSummary.js", "bg": true}}

## Performances

The content of Accordions is mounted by default even if the panel is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies.

## En-tête et colonnes secondaires

Plusieurs colonnes peuvent être utilisées pour structurer le contenu et un texte d'assistance peut être ajouté au panneau pour aider l'utilisateur.

{{"demo": "pages/components/accordion/DetailedAccordion.js", "bg": true}}

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

For optimal accessibility we recommend setting `id` and `aria-controls` on the `AccordionSummary`. The `Accordion` will derive the necessary `aria-labelledby` and `id` for the content region of the panel.