---
product: joy-ui
title: React Card component
components: Card, CardContent, CardCover, CardOverflow
githubLabel: 'component: card'
---

# Card

<p class="description">Cards contain content and actions about a single subject.</p>

## Introduction

Cards are most frequently used for easy to scan, relevant, and actionable information. Joy UI provides four Card-related components:

- [`Card`](#basic): a container to control the content direction.
- [`CardOverflow`](#overflow): a handy component that takes care of stretching the content to fill all edges of the card.
- [`CardCover`](#back-cover): a container for displaying background images within the card, also used to create gradient layers.
- [`CardContent`](#back-cover): a wrapper that brings content to the front when used with `CardCover`.

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

export default function MyApp() {
  return (
    <Card>
      <Typography>Hello world!</Typography>
    </Card>
  );
}
```

### Basic usage

`Card` is a surface-level component that can house multiple others. The most common components you'd use with it are `Typography`, `AspectRatio`, and `Button`.

{{"demo": "BasicCard.js" }}

### Overflow

To have content spanning from edge to edge of the card, wrap it with the `CardOverflow` component. It automatically takes care of the top and bottom edges if rendered as the first or last child of the parent card.

{{"demo": "OverflowCard.js" }}

### Back cover

The `CardCover` component is responsible for housing the content that covers the whole card. Think of card covers as a background layer that stay behind the `CardContent`.

{{"demo": "CardCovers.js" }}

### Media

Use a plain image or a video element inside the `CardCover` to display media. It uses [`object-fit: cover`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) on the image as a default value.

{{"demo": "MediaCover.js" }}

### Gradient overlay

To create a gradient overlay, frequently seen when a colorful image is used as background, insert an additional `CardCover` component.

:::info
💡 **Tip:** Make sure to darken the gradient overlay up to have enough contrast between the background image and the text content.
:::

{{"demo": "GradientCover.js" }}

### Row

To show a horizontal card, use the `row` prop. The `CardOverflow` will adapt based on its position.

{{"demo": "RowCard.js" }}

### Actions

#### Multiple actions

By default, whenever you have additional action elements such as links and buttons, they stay on top of the whole interactive area. In some cases, you might have to manually control each element's `z-index`.

:::info
💡 **Tip**: use CSS's pseudo-class [`:focus-within`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within) to style the card when any of its children is focused.
:::

{{"demo": "MultipleInteractionCard.js" }}

#### Whole card area

To make the entire card area clickable, wrap the card's title with the `Link` component. Then, add the `overlay` prop to expand it.

By doing that, you ensure good keyboard navigation support given that the `focus-visible` styles also apply to the entire card. Learn more about best accessibility practices with cards in the [Inclusive Component's documentation](https://inclusive-components.design/cards/).

{{"demo": "InteractiveCard.js" }}

## CSS variables

Play around with all the CSS variables available in the slider component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

:::info
💡 **Tip**: If you want to adjust a card's padding or border-radius, it's preferable to do it using the variables below instead of using CSS properties directly. That's because the variables will also be used to calculate a proper radius for the card's children.
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
