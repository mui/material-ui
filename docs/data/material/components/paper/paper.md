---
productId: material-ui
title: React Paper component
components: Paper
githubLabel: 'component: Paper'
materialDesign: https://m2.material.io/design/environment/elevation.html
---

# Paper

<p class="description">In Material Design, the physical properties of paper are translated to the screen. </p>

Material Design v2 surface components and shadow styling were heavily influenced by how these elements exist in the physical world.

Material UI picked that up by creating the Paper component, a general container-like surface that includes handy built-in props such as `elevation` that allows you to pull box-shadow values from the theme that adhere to [Material Design's elevation system](https://m2.material.io/design/environment/elevation.html#elevation-in-material-design).

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic paper

Note how the Paper component comes with a light elevation by default.

{{"demo": "SimplePaper.js", "bg": true}}

## Variants

Use the `variant` prop to toggle between an outlined version of the Paper component, without elevation, and an elevated version.

{{"demo": "Variants.js", "bg": true}}

## Elevation

Use the `elevation` prop to establish hierarchy through the use of shadows.

Note that in dark mode, increasing the elevation also makes the background color lighter.
This is done by applying a semi-transparent gradient with the `background-image` CSS property.

:::info
The dark mode behavior can lead to confusion when overriding the Paper component, as just changing the `background-color` property won't affect the lighter shading. To override it, either use a new background value or customize the values for both `background-color` and `background-image`.
:::

{{"demo": "Elevation.js", "bg": "outlined"}}

## When to use

The Paper component is better suited if you want to follow Material Design's steps and try to replicate, on your app, how light casts shadows in the physical world through the use of a thoughtfully designed elevation scale.

If that's not the case, other general layout components may suffice, like the [Box](/material-ui/react-box/) and [Container](/material-ui/react-container/) components.
