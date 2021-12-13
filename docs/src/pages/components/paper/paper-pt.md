---
title: Componente React Paper
components: Paper
githubLabel: 'component: Paper'
---

# Paper

<p class="description">No Material Design, as propriedades físicas de um papel são traduzidas para a tela. </p>

O fundo de uma aplicação se assemelha a textura lisa e opaca de uma folha de papel e o comportamento de uma aplicação imita a habilidade do papel de ser redimensionado, embaralhado e amontoado em várias folhas.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Variantes

{{"demo": "pages/components/paper/SimplePaper.js", "bg": true}}

## Variants

Se você precisar de uma superfície delineada, use a propriedade `variant`.

{{"demo": "pages/components/paper/Variants.js", "bg": "inline"}}

## Elevation

The elevation can be used to establish a hierachy between other content. In practical terms, the elevation controls the size of the shadow applied to the surface. In dark mode, raising the elevation also makes the surface lighter.

{{"demo": "pages/components/paper/Elevation.js", "bg": "inline"}}

The change of shade in dark mode is done by applying a semi-transparent gradient to the `background-image` property. This can lead to confusion when overriding the styles of `Paper`, as setting just the `background-color` property will not affect the elevation-related shading. To ignore the shading and set the background color that is not affected by elevation in dark mode, override the `background` property (or both `background-color` and `background-image`).
