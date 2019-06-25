---
title: Composant React Puce
components: Chip
---

# Chips (Puces)

<p class="description">Les puces sont des éléments compacts qui représentent une entrée, un attribut ou une action.</p>

[Les puces](https://material.io/design/components/chips.html) permettent aux utilisateurs de saisir des informations, d'effectuer des sélections, de filtrer le contenu ou de déclencher des actions.

Bien qu’il soit inclus ici en tant que composant autonome, l’utilisation la plus courante sera sous une forme quelconque d’entrée, de sorte que le comportement présenté ici est un comportement non présenté dans son contexte.

## Chip

Exemples de puces, utilisant une image Avatar, icône SVG Avatar, "Lettre" et (chaîne) Avatar.

- Les puces avec la propriété `onClick` définie changent l’apparence sur le focus, survolent, puis cliquent sur.
- Les puces avec la propriété `onDelete` définie afficheront une icône de suppression qui change d’apparence en survol.

{{"demo": "pages/components/chips/Chips.js"}}

### Outlined Chips

Outlined chips offer an alternative style.

{{"demo": "pages/components/chips/OutlinedChips.js"}}

## Tableau de puce

Un exemple de rendu de plusieurs puces à partir d'un tableau de valeurs. Supprimer une puce la supprime du tablea. Notez que puisqu'aucun `onClick` propriété est définie, la puce peut être concentré, mais ne pas profondeur de gain tandis que vous cliquez dessus ou touché.

{{"demo": "pages/components/chips/ChipsArray.js"}}

## Small Chip

You can use the `size` prop to define a small Chip.

### Default variant

{{"demo": "pages/components/chips/SmallChips.js"}}

### Outlined variant

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

## Terrain de jeu de puce

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideHeader": true}}