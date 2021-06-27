---
title: Composant React Chip (puces)
components: Chip
githubLabel: 'component: Chip'
materialDesign: https://material.io/components/chips
---

# Chip

<p class="description">Les Chip sont des éléments compacts qui représentent une entrée, un attribut ou une action.</p>

Les puces permettent aux utilisateurs de saisir des informations, d'effectuer des sélections, de filtrer le contenu ou de déclencher des actions.

Bien qu’il soit inclus ici en tant que composant autonome, l’utilisation la plus courante sera sous une forme quelconque d’entrée, de sorte que le comportement présenté ici est un comportement non présenté dans son contexte.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Chip de base

Le composant `Chip` prend en charge le style outlined et filled.

{{"demo": "pages/components/chips/BasicChips.js"}}

## Actions

Vous pouvez utiliser les actions suivantes.

- Les puces avec la propriété `onClick` définie changent d’apparence au focus, au survol, et au clic.
- Les puces avec la propriété `onDelete` définie afficheront une icône de suppression qui change d’apparence au survol.

### Cliquable

{{"demo": "pages/components/chips/ClickeableChips.js"}}

### Supprimable

{{"demo": "pages/components/chips/DeleteableChips.js"}}

### Cliquable et supprimable

{{"demo": "pages/components/chips/ClickeableAndDeleteableChips.js"}}

### Lien cliquable

{{"demo": "pages/components/chips/ClickeableLinkChips.js"}}

### Icône de suppression personnalisée

{{"demo": "pages/components/chips/CustomDeleteIconChips.js"}}

## Ornements

Vous pouvez ajouter des ornements au début du composant.

Utilisez la propriété `avatar` pour ajouter un avatar ou utilisez la propriété `icon` pour ajouter une icône.

### Avatar

{{"demo": "pages/components/chips/AvatarChips.js"}}

### Icône

{{"demo": "pages/components/chips/IconChips.js"}}

## Couleur

Vous pouvez utiliser la propriété `color` pour définir une couleur à partir de la palette du thème.

{{"demo": "pages/components/chips/ColorChips.js"}}

## Taille

Vous pouvez utiliser la propriété `size` pour définir une petite Chip.

{{"demo": "pages/components/chips/SizesChips.js"}}

## Tableau de Chip

Un exemple de rendu de plusieurs puces à partir d'un tableau de valeurs. Supprimer une Chip la supprime du tableau. Notez que puisqu'aucune propriété `onClick` est définie, la `Chip` peut avoir le focus, mais ne reçoit pas de profondeur lorsqu'elle est cliquée ou touchée.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Playground

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## Accessibilité

Si la Chip est supprimable ou cliquable, c'est un bouton dans l'ordre des onglets. Lorsque la Chip est concentrée (p. ex. lorsque la tabulation est activée) (`keyup` event) `Backspace` ou `Delete` appellera le gestionnaire `onDelete` lors de la libération de `Escape` flottera la Chip.
