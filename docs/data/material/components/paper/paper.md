---
product: material-ui
title: React Paper component
components: Paper
githubLabel: 'component: Paper'
materialDesign: https://m2.material.io/design/environment/elevation.html
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

## Hover Animations

If you want to add a hover effect to a Paper component, you can use the `onMouseEnter` and `onMouseLeave` props to toggle the component's elevation. This can create a simple but effective animation that elevates the Paper when the user hovers over it.

To achieve this, you can create a state called `isHovered` and set it to `false` by default. Then, in the `onMouseEnter` event, you can set `isHovered` to true, and in the `onMouseLeave` event, you can set it back to `false`.

Here's an example of how you can implement this in a HoverEffect component:

{{"demo": "HoverEffect.js", "bg": "true"}}

In this example, the elevation prop is set to 2 by default and 12 when the `isHovered` state is `true`. This will make the Paper component appear elevated when the user hovers over it.

You can customize the elevation values to achieve the desired effect. Additionally, you can add other CSS styles to the Paper component to further enhance the hover animation.
