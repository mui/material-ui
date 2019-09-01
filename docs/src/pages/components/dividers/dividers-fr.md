---
title: Composant React Diviseurs
components: Divider
---

# Dividers (Séparateurs)

<p class="description">Un diviseur est une ligne mince qui regroupe le contenu dans des listes et des mises en page.</p>

[Diviseurs](https://material.io/design/components/dividers.html) séparer le contenu en groupes clairs.

## Liste diviseurs

The divider renders as an `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js"}}

## Spécification HTML5

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification. The examples below show two ways of achieving this.

## Encart De Diviseurs

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## Sous-En-Tête Diviseurs

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## Diviseurs moyens

{{"demo": "pages/components/dividers/MiddleDividers.js"}}