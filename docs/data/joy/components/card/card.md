---
product: joy-ui
title: React Card component
components: Card, CardContent, CardCover, CardOverflow
githubLabel: 'component: card'
---

# Card

<p class="description">A card is a generic container for grouping related UI elements and content.</p>

## Introduction

The Joy UI Card component includes several complementary utility components to handle various use cases:

- [Card](#basics): a surface-level container for grouping related components.
- [Card Overflow](#overflow): a supplemental wrapper that expands a Card's contents to fill all edges.
- [Card Cover](#card-layers): an optional container for displaying background images and gradient layers behind the Card Content.
- [Card Content](#card-layers): an optional wrapper that brings content to the front (commonly but not always used with the Card Cover).

## Basics

```jsx
import Card from '@mui/joy/Card';
```

Card is a surface-level container for grouping related components.
The demo below shows a typical Card that groups together Typography, Aspect Ratio, and Button components, among others:

{{"demo": "BasicCard.js" }}

## Customization

### Expand to fill

```jsx
import CardOverflow from '@mui/joy/CardOverflow';
```

By default, the Card component adds padding around the outer edges of its contents.
To eliminate this white space, add the Card Overflow component inside the Card as a wrapper around the content to be expanded.

Note that Card Overflow only works when it's the first and/or last child of the parent Card.
In the demo below, the top and bottom sections are expanded to fill the edges:

{{"demo": "OverflowCard.js" }}

### Card layers

```jsx
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
```

The default Card provides a single flat surface for other components to sit on top of.
Use the Card Cover and Card Content components to expose multiple layers between a Card and the UI elements on its surface.

Card Cover makes it possible to add images, videos, and color and gradient overlays underneath the Card Content.
Hover your mouse on the demo below to see how the layers are stacked:

{{"demo": "CardLayers3d.js" }}

#### Images and videos

Use an image or a video element inside the Card Cover to display media.
The component uses [`object-fit: cover`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) to fill the whole Card by default.

{{"demo": "MediaCover.js" }}

#### Gradient overlay

To create a gradient overlay—frequently seen when a bright image is used as a background—insert an additional Card Cover component between the image layer and the content layer.
You can add any number of Card Covers to create more sophisticated stacked layers this way.

{{"demo": "GradientCover.js" }}

### Horizontal alignment

Card contents are arranged in a column by default.
For horizontal alignment, add the `orientation="horizontal"` prop to the Card.
If present, the [Card Overflow](#expand-to-fill) component will adapt accordingly.

{{"demo": "RowCard.js" }}

### Actions

Cards often include actions that users can take, like proceeding to a new page or section of the app.
There may be individual (discrete) actions _within_ a given card, or _the entire card itself_ may trigger an action when clicked or tapped.

The following sections explain how to approach each of these scenarios.

#### Discrete actions

By default, action elements like links and buttons sit above the surface-level interactive area of the Card.
In some cases, you might have to adjust the z-index to bring these elements to the front—for instance, the Favorite Icon Button in the demo below needs a higher z-index in order to sit on top of its Aspect Ratio sibling:

{{"demo": "MultipleInteractionCard.js" }}

:::success
You can use the CSS pseudo-class [`:focus-within`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within) to apply styles to the Card when any of its children receive focus.
:::

#### Whole Card actions

To make the entire Card clickable, add a [Link](/joy-ui/react-link/) component to the title (or some other important text content) inside the Card.
Then add the `overlay` prop to the Link to spread it across the Card as a whole.

:::info
This approach helps to ensure proper keyboard navigation support by applying `focus-visible` styles to the Card itself.
Learn more about this and other best practices for accessible cards in the [Inclusive Components blog](https://inclusive-components.design/cards/).
:::

{{"demo": "InteractiveCard.js" }}

## CSS variable playground

Play around with the CSS variables available to the Card component to see how the design changes.
You can use these to customize the component with both the `sx` prop and the theme.

:::success
If you need to adjust a Card's padding or border radius, it's preferable to do so using these variables rather than plain CSS properties.
This is because the variables are also used to calculate a proper radius for the Card's children, to prevent a mismatch between their relative proportions.
:::

{{"demo": "CardVariables.js" , "hideToolbar": true}}

## Common examples

### Instagram post

{{"demo": "InstagramPost.js" }}

### Dribbble shot

{{"demo": "DribbbleShot.js" }}

### Resizable container

This demo uses a technique similar to Heydon Pickering's [Flexbox Holy Albatross](https://heydonworks.com/article/the-flexbox-holy-albatross/) to create a stretchable Card that switches between vertical and horizontal alignment when its width passes a specified threshold—without using media queries to define breakpoints.
Try resizing it by clicking and dragging the bottom-right corner to see how it behaves.

{{"demo": "ContainerResponsive.js" }}

## Anatomy

The Card component and all of its supplementary components are composed of a single root `<div>`:

```html
<div class="MuiCard-root">
  <div class="MuiCardCover-root">
    <!-- optional Card Cover layer -->
  </div>
  <div class="MuiCardContent-root">
    <!-- optional Card Content layer -->
  </div>
  <div class="MuiCardOverflow-root">
    <!-- optional Card Overflow utility -->
  </div>
</div>
```

:::info
Keep in mind that [Card Overflow](#expand-to-fill) must be the first or last child of a Card in order to function—accordingly, it will have a `data-first-child` or `data-last-child` attribute appended to its `<div>`.
:::
