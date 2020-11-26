---
title: React Divider component
components: Divider
---

# Divider

<p class="description">Un diviseur est une ligne mince qui regroupe le contenu dans des listes et des mises en page.</p>

[Diviseurs](https://material.io/design/components/dividers.html) séparer le contenu en groupes clairs.

## Liste diviseurs

Par défaut, le diviseur est rendu comme un `<hr>`. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Spécification HTML5

Dans une liste, vous devez vous assurer que le `Divider` est rendu en tant que `<li>` pour correspondre à la spécification HTML5. Les exemples ci-dessous montrent deux manières d'y parvenir.

## Encart De Diviseurs

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Sous-En-Tête Diviseurs

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Diviseurs moyens

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

Vous pouvez également rendre un séparateur verticalement en utilisant la propriété `orientation`. Note the use of the `flexItem` prop to accommodate for the flex container.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}