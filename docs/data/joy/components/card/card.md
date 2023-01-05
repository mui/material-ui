---
product: joy-ui
title: React Card component
githubLabel: 'component: card'
---

# Card

<p class="description">A card is a generic container for grouping related UI elements and content.</p>

## Introduction

The Joy UI Card component comes with several complementary utility components to handle various use cases:

- [Card](#basics): a surface-level container for grouping related components.
- [Card Overflow](#overflow): a supplemental wrapper that stretches a Card's contents to fill all edges.
- [Card Cover](#card-cover): an optional container for displaying background images and gradient layers behind the Card Content.
- [Card Content](#card-cover): an optional wrapper that brings content to the front when used with the Card Cover.

## Basics

```jsx
import Card from '@mui/joy/Card';
```

Card is a surface-level component for grouping related components.
The demo below shows a typical Card that groups together Typography, Aspect Ratio, and Button components, among others:

{{"demo": "BasicCard.js" }}

### Card Overflow

```jsx
import CardOverflow from '@mui/joy/CardOverflow';
```

By default, the Card component adds padding around the outer edges of its contents.
To eliminate this white space so the content expands to fill the edges, add the Card Overflow component inside the Card as a wrapper around the content.

Note that Card Overflow only works when it's the first and/or last child of the parent Card.
In the demo below, the top and bottom sections stretch to fill the edges, while the middle section does not:

{{"demo": "OverflowCard.js" }}

### Card Cover and Content

```jsx
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
```

The Card Cover component is responsible for housing the content that covers the whole card.
Think of card covers as a background layer that stay behind the Card Content.

{{"demo": "CardCovers.js" }}

### Media

Use a plain image or a video element inside the `CardCover` to display media.
It uses [`object-fit: cover`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) on the image as a default value.

{{"demo": "MediaCover.js" }}

### Gradient overlay

To create a gradient overlay, frequently seen when a colorful image is used as background, insert an additional `CardCover` component.

:::warning
Make sure to darken the gradient overlay up to have enough contrast between the background image and the text content.
:::

{{"demo": "GradientCover.js" }}

### Row

To show a horizontal card, use the `row` prop.
The `CardOverflow` will adapt based on its position.

{{"demo": "RowCard.js" }}

### Actions

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

## CSS variables

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
