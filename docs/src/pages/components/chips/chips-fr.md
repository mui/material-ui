---
title: React Chip component
components: Chip
---

# Chip (puce)

<p class="description">Les Chip sont des éléments compacts qui représentent une entrée, un attribut ou une action.</p>

[Les Chip](https://material.io/design/components/chips.html) permettent aux utilisateurs de saisir des informations, d'effectuer des sélections, de filtrer le contenu ou de déclencher des actions.

Bien qu’il soit inclus ici en tant que composant autonome, l’utilisation la plus courante sera sous une forme quelconque d’entrée, de sorte que le comportement présenté ici est un comportement non présenté dans son contexte.

## Chip

Exemples de Chip , utilisant une image Avatar, icône SVG Avatar, "Lettre" et (chaîne) Avatar.

- Les Chip avec la propriété `onClick` définie changent l’apparence sur le focus, survolent, puis cliquent sur.
- Les Chip avec le prop `onDelete` définie afficheront une icône de suppression qui change d’apparence en survol.

{{"demo": "pages/components/chips/Chips.js"}}

### Outlined Chips

Les Outlined Chips offrent un style alternatif.

{{"demo": "pages/components/chips/OutlinedChips.js"}}

## Tableau de Chip

Un exemple de rendu de plusieurs Chip à partir d'un tableau de valeurs. Supprimer une Chip la supprime du tableau. Notez que comme aucune propriété `onClick` n'est définie, la Chip peut être mise au point, mais n'obtient pas de profondeur en cliquant ou touché.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Petite Chip

Vous pouvez utiliser la propriété `size` pour définir une petite Chip.

### Variante par défaut

{{"demo": "pages/components/chips/SmallChips.js"}}

### Variante linéaire

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

## Playground Chip

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## Accessibilité

Si la Chip est supprimable ou cliquable, c'est un bouton dans l'ordre des onglets. Lorsque la Chip est concentrée (p. ex. lorsque la tabulation est activée) (`keyup` event) `Backspace` ou `Delete` appellera le gestionnaire `onDelete` lors de la libération de `Escape` flottera la Chip.