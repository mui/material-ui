---
productId: joy-ui
title: React Card component
components: Card, CardActions, CardContent, CardCover, CardOverflow
githubLabel: 'component: card'
---

# Card

<p class="description">A card is a generic container for grouping related UI elements and content.</p>

## Introduction

The Joy UI Card component includes several complementary utility components to handle various use cases:

- [Card](#basics): a surface-level container for grouping related components.
- [Card Overflow](#expand-to-fill): a supplemental wrapper that expands a Card's contents to fill all edges.
- [Card Cover](#card-layers): an optional container for displaying background images and gradient layers behind the Card Content.
- [Card Content](#card-layers): an optional wrapper that brings content to the front (commonly but not always used with the Card Cover).
- [Card Actions](#actions): an optional wrapper that groups a set of buttons.

{{"demo": "CardUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Card from '@mui/joy/Card';
```

Card is a surface-level container for grouping related components.
The demo below shows a typical Card that groups together Typography, Aspect Ratio, and Button components, among others:

{{"demo": "BasicCard.js"}}

## Customization

### Variants

The Card component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `plain`, `outlined` (default), `soft`, and `solid`.

{{"demo": "CardVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The Card component comes in three sizes: `sm`, `md` (default), and `lg`.

Each size has different padding, gap, and font size values.

{{"demo": "CardSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors with different variants.

{{"demo": "CardColors.js"}}

### Inverted colors

When the Card's variant is `soft` or `solid`, you can use the `invertedColors={true}` prop to invert the colors of the children to have enough contrast.

To learn more about this, check out [Color Inversion](/joy-ui/main-features/color-inversion/) feature.

{{"demo": "CardInvertedColors.js"}}

### Expand to fill

```jsx
import CardOverflow from '@mui/joy/CardOverflow';
```

By default, the Card component adds padding around the outer edges of its contents.
To eliminate this white space, add the Card Overflow component inside the Card as a wrapper around the content to be expanded.

{{"demo": "OverflowCard.js"}}

### Card layers

```jsx
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
```

The default Card provides a single flat surface for other components to sit on top of.
Use the Card Cover and Card Content components to expose multiple layers between a Card and the UI elements on its surface.

Card Cover makes it possible to add images, videos, and color and gradient overlays underneath the Card Content.
Hover your mouse on the demo below to see how the layers are stacked:

{{"demo": "CardLayers3d.js"}}

#### Images and videos

Use an image or a video element inside the Card Cover to display media.
The component uses [`object-fit: cover`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) to fill the whole Card by default.

{{"demo": "MediaCover.js"}}

#### Gradient overlay

To create a gradient overlay—frequently seen when a bright image is used as a background—insert an additional Card Cover component between the image layer and the content layer.
You can add any number of Card Covers to create more sophisticated stacked layers this way.

{{"demo": "GradientCover.js"}}

### Horizontal alignment

Card contents are arranged in a column by default.
For horizontal alignment, add the `orientation="horizontal"` prop to the Card.
If present, the [Card Overflow](#expand-to-fill) component will adapt accordingly.

{{"demo": "RowCard.js"}}

### Actions

Cards often include actions that users can take, like proceeding to a new page or section of the app.
There may be individual (discrete) actions _within_ a given card, or _the entire card itself_ may trigger an action when clicked or tapped.

The following sections explain how to approach each of these scenarios.

#### Bottom actions

Cards often include buttons at the bottom section. Use `CardActions` component as a wrapper of those buttons to create proper spacing around them.

The demo below also use `buttonFlex` prop to set the ideal width of the buttons to `120px` while allowing them to shrink if necessary. To learn more about CSS flex, visit [MDN's guide](https://developer.mozilla.org/en-US/docs/Web/CSS/flex).

{{"demo": "BottomActionsCard.js"}}

#### Discrete actions

By default, action elements like links and buttons sit above the surface-level interactive area of the Card.
In some cases, you might have to adjust the z-index to bring these elements to the front—for instance, the Favorite Icon Button in the demo below needs a higher z-index in order to sit on top of its Aspect Ratio sibling:

{{"demo": "MultipleInteractionCard.js"}}

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

{{"demo": "InteractiveCard.js"}}

## CSS variables playground

Play around with the CSS variables available to the Card component to see how the design changes.
You can use these to customize the component with both the `sx` prop and the theme.

{{"demo": "CardVariables.js", "hideToolbar": true, "bg": "gradient"}}

:::success
If you need to adjust a Card's padding or border radius, it's preferable to do so using these variables rather than plain CSS properties.
This is because the variables are also used to calculate a proper radius for the Card's children, to prevent a mismatch between their relative proportions.
:::

## Common examples

### Nested cards

{{"demo": "NestedCard.js"}}

### Bio card

{{"demo": "BioCard.js"}}

### Credit card form

{{"demo": "CreditCardForm.js"}}

### Congratulations card

{{"demo": "CongratCard.js"}}

### FAQ card

{{"demo": "FAQCard.js"}}

### License card

{{"demo": "LicenseCard.js"}}

### Pricing card

{{"demo": "PricingCards.js"}}

### Product card

This example demonstrates the automatic adjustment when a button is placed as a only child of a [CardOverflow](#expand-to-fill) component. The button will be stretched to fill the entire area of the CardOverflow and the bottom corner radius is also adjusted.

{{"demo": "ProductCard.js"}}

### User card

Combining CSS min-width with clamp, a [horizontal card](#horizontal-alignment) can be stacked when it reaches a certain width or below.

The example below shows a user card that stacks when the card's width is equal or below 500px. The drag handle is at the bottom right corner of the card.

{{"demo": "UserCard.js"}}

:::info
Alternatively, you can use [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) to achieve the similar result.
You should check the [browser support](https://caniuse.com/css-container-queries) before using CSS Container Queries.
:::

### Instagram post

{{"demo": "InstagramPost.js"}}

### Dribbble shot

{{"demo": "DribbbleShot.js"}}

### Resizable container

This demo uses a technique similar to Heydon Pickering's [Flexbox Holy Albatross](https://heydonworks.com/article/the-flexbox-holy-albatross/) to create a stretchable Card that switches between vertical and horizontal alignment when its width passes a specified threshold—without using media queries to define breakpoints.
Try resizing it by clicking and dragging the bottom-right corner to see how it behaves.

{{"demo": "ContainerResponsive.js"}}

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
  <div class="MuiCardActions-root">
    <!-- optional Card Actions layer -->
  </div>
</div>
```
