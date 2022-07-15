---
product: material-ui
title: React Paper component
components: Paper
githubLabel: 'component: Paper'
---

# Paper

<p class="description">In Material Design, the physical properties of paper are translated to the screen. </p>

The background of an application resembles the flat, opaque texture of a sheet of paper, and an application's behavior mimics paper's ability to be re-sized, shuffled, and bound together in multiple sheets.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic paper

{{"demo": "SimplePaper.js", "bg": true}}

## Variants

If you need an outlined surface, use the `variant` prop.

{{"demo": "Variants.js", "bg": "inline"}}

## Elevation

The elevation can be used to establish a hierarchy between other content. In practical terms, the elevation controls the size of the shadow applied to the surface. In dark mode, raising the elevation also makes the surface lighter.

{{"demo": "Elevation.js", "bg": "inline"}}

The change of shade in dark mode is done by applying a semi-transparent gradient to the `background-image` property.
This can lead to confusion when overriding the styles of `Paper`, as setting just the `background-color` property will not affect the elevation-related shading.
To ignore the shading and set the background color that is not affected by elevation in dark mode, override the `background` property (or both `background-color` and `background-image`).
