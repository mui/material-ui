---
product: joy-ui
title: React Card component
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

#### Images and videos

Use an image or a video element inside the Card Cover to display media.
The component uses [`object-fit: cover`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) to fill the whole Card by default.

{{"demo": "MediaCover.js" }}

#### Gradient overlay

To create a gradient overlay—frequently seen when a bright image is used as a background—insert an additional Card Cover component between the image layer and the content layer.
You can add any number of Card Covers to create more sophisticated stacked layers this way.

{{"demo": "GradientCover.js" }}

### Horizontal alignment

Card contents are stacked in a column by default.
For horizontal alignment, add the `row` prop to the Card.
If present, the [Card Overflow](#expand-to-fill) component will adapt accordingly.

{{"demo": "RowCard.js" }}

### Actions

Cards often include actions that users can take, such as clicking a link or a button to proceed to a new section of the app.
There may be individual actions possible _within_ a given Card, or _the entire Card itself_ may trigger an action when clicked or tapped.

The following sections explain how to approach both of these scenarios.

#### Multiple actions

By default, whenever you have additional action elements such as links and buttons, they stay on top of the whole interactive area.
In some cases, you might have to manually control each element's `z-index`.

:::success
Use the CSS pseudo-class [`:focus-within`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within) to style the card when any of its children are focused.
:::

{{"demo": "MultipleInteractionCard.js" }}

#### Whole card area

To make the entire card area clickable, wrap the card's title with the `Link` component.
Then, add the `overlay` prop to expand it.

By doing that, you ensure good keyboard navigation support given that the `focus-visible` styles also apply to the entire card.
Learn more about best accessibility practices with cards in the [Inclusive Component's documentation](https://inclusive-components.design/cards/).

{{"demo": "InteractiveCard.js" }}

## CSS variable playground

Play around with all the CSS variables available in the component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

:::success
If you want to adjust a card's padding or border-radius, it's preferable to do it using the variables below instead of using CSS properties directly.
That's because the variables will also be used to calculate a proper radius for the card's children.
:::

{{"demo": "CardVariables.js" , "hideToolbar": true}}

## Common examples

### Container responsive

This demo uses a similar technique to [the flexbox holy albatross](https://heydonworks.com/article/the-flexbox-holy-albatross/) to stack the elements when the container's width is below a specified number.

{{"demo": "ContainerResponsive.js" }}

### Dribbble shot

{{"demo": "DribbbleShot.js" }}

### Instagram post

{{"demo": "InstagramPost.js" }}
