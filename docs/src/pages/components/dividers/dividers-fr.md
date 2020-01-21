---
title: Composant React Diviseur
components: Divider
---

# Divider

<p class="description">Un diviseur est une ligne mince qui regroupe le contenu dans des listes et des mises en page.</p>

[Diviseurs](https://material.io/design/components/dividers.html) séparer le contenu en groupes clairs.

## Liste diviseurs

The divider renders as an `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Spécification HTML5

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification. The examples below show two ways of achieving this.

## Encart De Diviseurs

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Sous-En-Tête Diviseurs

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Diviseurs moyens

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

You can also render a divider vertically using the `orientation` prop.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}