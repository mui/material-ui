---
title: React Divider component
components: Divider
---

# Divider

<p class="description">Ein Trenner ist eine dünne Linie, die den Inhalt in Listen und Layouts gruppiert.</p>

[Trenner](https://material.io/design/components/dividers.html) trennt den Inhalt in klare Gruppen.

## Listentrenner

Sie können sich dieses zusätzliche Element sparen, in dem sie die `divider`-Eigenschaft bei der `ListItem`-Komponente verwenden. Der Trenner gibt per Standard ein `<hr>`-Element aus.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5-Spezifikation

In einer Liste sollten sie sicherstellen, dass der `Trenner` als `<li>` gerendered wird, um der HTML5 Spezifikation zu entsprechen. Die folgenden Beispiele zeigen wie dies erreicht werden kann.

## Eingerückter Trenner

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Subheader-Trenner

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Mitteltrenner

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertikale Trennlinien

Sie können einen Trenner auch vertikal mit der `orientation` prop rendern. Note the use of the `flexItem` prop to accommodate for the flex container.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}