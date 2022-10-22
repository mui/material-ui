---
product: material-ui
title: Componente React Paper
components: Paper
githubLabel: 'component: Paper'
---

# Paper

<p class="description">No Material Design, as propriedades físicas de um papel são traduzidas para a tela. </p>

O fundo de uma aplicação se assemelha a textura lisa e opaca de uma folha de papel e o comportamento de uma aplicação imita a habilidade do papel de ser redimensionado, embaralhado e amontoado em várias folhas.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Variantes

{{"demo": "SimplePaper.js", "bg": true}}

## Variantes

Se você precisar de uma superfície delineada, use a propriedade `variant`.

{{"demo": "Variants.js", "bg": "inline"}}

## Elevation

O prop "elevation" pode ser utilizado para estabelecer uma hierarquia entre outros componentes. Em termos práticos, o prop "elevation" controla o tamanho da sombra aplicada a superfície. No modo escuro, aumentar a "elevação" também faz a superfície ficar mais clara.

{{"demo": "Elevation.js", "bg": "inline"}}

A mudança do sombreamento no modo escuro é feito ao aplicar um gradiente semi-transparente à propriedade `brackground-image`. Isso pode levar a uma confusão quando estamos sobrescrevendo o estilo de `Paper`, visto que configurando apenas a propriedade`background-color` não irá afetar o sombreamento causado pelo prop "elevation" Para ignorar o sombreado e definir uma cor de fundo que não seja afetada pela elevação no modo escuro, sobrescreva a propriedade `background`(ou ambos `background-color` e `background-image`).
