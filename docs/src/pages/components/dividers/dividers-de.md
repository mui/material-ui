---
title: Divider React-Komponente
components: Divider
---

# Trenner (Divider)

<p class="description">Ein Trenner ist eine dünne Linie, die den Inhalt in Listen und Layouts gruppiert.</p>

[Trenner](https://material.io/design/components/dividers.html) trennt den Inhalt in klare Gruppen.

## Listentrenner

Der Trenner wird standardmäßig als `<hr>` gerendert. Sie können sich das einzelne Rendern des DOM- Elements sparen, indem Sie die `divider` Eigenschaft der `ListItem` Komponente nutzen.

{{"demo": "pages/components/dividers/ListDividers.js"}}

## HTML5-Spezifikation

Wir müssen sicherstellen, dass der `Trenner` als `li` gerendert wird, um der HTML5-Spezifikation zu entsprechen. Die folgenden Beispiele zeigen zwei Wege, um dies zu erreichen.

## Eingerückter Trenner

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## Subheader-Trenner

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## Mitteltrenner

{{"demo": "pages/components/dividers/MiddleDividers.js"}}