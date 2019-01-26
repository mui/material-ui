---
title: Composant React Panneau d'expansion
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---
# Panneaux d'extension (Expansion Panels)

<p class="description">Les panneaux d’extension contiennent des flux de création et permettent une édition légère d’un élément.</p>

[Un panneau d'extension](https://material.io/archive/guidelines/components/expansion-panels.html) est un conteneur léger pouvant être autonome ou connecté à une surface plus grande, telle qu'une carte.

> **Remarque:** Les panneaux d'extension ne sont plus décrits dans la documentation Material Design.

## Panneau d'extension simple

{{"demo": "pages/demos/expansion-panels/SimpleExpansionPanel.js"}}

## Accordéon contrôlé

Étendez le comportement du panneau par défaut pour créer un accordéon avec le composant `ExpansionPanel`.

{{"demo": "pages/demos/expansion-panels/ControlledExpansionPanels.js"}}

## En-tête et colonnes secondaires

Plusieurs colonnes peuvent être utilisées pour structurer le contenu et un texte d'assistance peut être ajouté au panneau pour aider l'utilisateur.

{{"demo": "pages/demos/expansion-panels/DetailedExpansionPanel.js"}}

## Panneau d'extension personnalisé

Si vous avez lu le [overrides page de documentation](/customization/overrides/) mais vous n'êtes pas sûr de sauter dans, ici est un exemple de la façon dont vous pouvez personnaliser la couleur de fond du `ExpansionPanelSummary` et le rembourrage de `ExpansionPanelDetails`.

⚠️ Bien que les spécifications de conception des matériaux encouragent la thématisation, ces exemples sortent des sentiers battus.

{{"demo": "pages/demos/expansion-panels/CustomizedExpansionPanel.js"}}