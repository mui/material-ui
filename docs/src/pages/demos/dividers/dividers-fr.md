---
title: Composant React Diviseurs
components: Divider
---
# Diviseurs (Dividers)

<p class="description">Un diviseur est une ligne mince qui regroupe le contenu dans des listes et des mises en page.</p>

[Diviseurs](https://material.io/design/components/dividers.html) séparer le contenu en groupes clairs.

## Liste diviseurs

The divider renders as a `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/demos/dividers/ListDividers.js"}}

## Spécification HTML5

Nous devons nous assurer que le `Divider` est rendu en tant que `li` pour correspondre à la spécification HTML5. Les exemples ci-dessous montrent deux manières d'y parvenir.

## Encart De Diviseurs

The `inset` property has now been deprecated. You should now use `variant="inset"`

{{"demo": "pages/demos/dividers/InsetDividers.js"}}

## Sous-En-Tête Diviseurs

{{"demo": "pages/demos/dividers/SubheaderDividers.js"}}

## Diviseurs moyens

{{"demo": "pages/demos/dividers/MiddleDividers.js"}}