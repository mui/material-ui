---
title: Composant React Panneau d'expansion
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion Panels (Panneaux d'extension)

<p class="description">Les panneaux d’extension contiennent des flux de création et permettent une édition légère d’un élément.</p>

[Un panneau d'extension](https://material.io/archive/guidelines/components/expansion-panels.html) est un conteneur léger pouvant être autonome ou connecté à une surface plus grande, telle qu'une carte.

> **Remarque:** Les panneaux d'extension ne sont plus décrits dans la documentation Material Design.

## Accessibilité

For optimal accessibility we recommend setting `id` and `aria-controls` on the `ExpansionPanelSummary`. The `ExpansionPanel` will derive the necessary `aria-labelledby` and `id` for the content region of the panel.

## Panneau d'extension simple

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js"}}

## Accordéon contrôlé

Étendez le comportement du panneau par défaut pour créer un accordéon avec le composant `ExpansionPanel`.

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js"}}

## En-tête et colonnes secondaires

Plusieurs colonnes peuvent être utilisées pour structurer le contenu et un texte d'assistance peut être ajouté au panneau pour aider l'utilisateur.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js"}}

## Performances

The content of ExpansionPanels is mounted by default even if the panel is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`: `<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />`. As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies.

## Customized expansion panels

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}