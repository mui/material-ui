---
title: Divider React-Komponente
components: Divider
---

# Trenner (Divider)

<p class="description">Ein Trenner ist eine dünne Linie, die den Inhalt in Listen und Layouts gruppiert.</p>

[Trenner](https://material.io/design/components/dividers.html) trennt den Inhalt in klare Gruppen.

## Listentrenner

The divider renders as an `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js"}}

## HTML5-Spezifikation

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification. The examples below show two ways of achieving this.

## Eingerückter Trenner

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## Subheader-Trenner

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## Mitteltrenner

{{"demo": "pages/components/dividers/MiddleDividers.js"}}