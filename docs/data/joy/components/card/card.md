---
product: joy-ui
title: React Card component
githubLabel: 'component: card'
---

# Card

<p class="description">Cards contain content and actions about a single subject.</p>

Cards are surfaces that display content and actions on a single topic.

They should be easy to scan for relevant and actionable information.
Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

Joy provides 4 Card related components:

- [`Card`](#basic): used as a container to control the direction of the content. It comes with a border radius, padding, and shadow by default.
- [`CardOverflow`](#overflow): a handy component that takes care of stretching the content to fill on all edges of the card.
- [`CardCover`](#back-cover): for displaying background image of the card and used to create layers of gradient.
- [`CardContent`](#back-cover): usually used with `CardCover` to bring the content to the front.

## Basic

The `Card` is a surface-level component that can house multiple others to form a meaningful interface.
For example, here are a few components you would use for common card designs:

- `Typography` for creating titles, descriptions, and plain texts.
- `AspectRatio` for controlling images and video sizes.
- `Button` and/or `IconButton` for call to action elements.

{{"demo": "BasicCard.js" }}

## Overflow

To have content spanning from edge to edge of the card, wrap it with the `CardOverflow` component.
It will automatically take care of the top and bottom edges if rendered as the first or last child of the parent card.

{{"demo": "OverflowCard.js" }}

## Back cover

The `CardCover` component is responsible for creating the content that covers the whole card.
You can think of card covers as a background layer that stay behind the `CardContent`.

{{"demo": "CardCovers.js" }}

### Media

You can use a plain image or a video element inside the `CardCover`.
It uses [`object-fit: cover`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) on the image as a default value.

{{"demo": "MediaCover.js" }}

### Gradient overlay

Insert an additional `CardCover` component to create gradient overlays between the cover and the content.

:::info
💡 Make sure to darken up the gradient overlay to have enough contrast between the background image and the content.
:::

{{"demo": "GradientCover.js" }}

## Row

To show a horizontal card, use `row` prop. The `CardOverflow` will adapt based on its position.

{{"demo": "RowCard.js" }}

## Actions

### Whole card area

To have the whole card area clickable, use the `Link` component to wrap the card's title and then pass the `overlay` prop to expand the interactive area to fill the whole card.

Note that the keyboard focus appearance will also cover the entire card.
For more details about cards accessibility, read [Inclusive Component's documentation](https://inclusive-components.design/cards/).

{{"demo": "InteractiveCard.js" }}

### Multiple actions

By default, whenever you have additional action elements such as links and buttons, they'll stay on top of the whole interactive area.
However, in some cases, you might have to manually control each element's `z-index`.

:::success
💡 **Tip**: use CSS's pseudo-class [`:focus-within`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within) to style the card when any of its children is focused.
:::

{{"demo": "MultipleInteractionCard.js" }}

## Component variables

The `Card` component exposes two important CSS variables that communicate with other Joy components.
If you want to adjust a card's padding or border-radius, it's preferable to do it using the variables below instead of using these properties directly.
That's mainly because the variables will also be used to calculate a proper radius for the card's children.

{{"demo": "CardVariables.js" , "hideToolbar": true}}

## Common examples

Here's how you could replicate a few real-world card designs using several Joy components together with it.

### Container responsive

This demo uses a similar technique to [the flexbox holy albatross](https://heydonworks.com/article/the-flexbox-holy-albatross/) to stack the elements when the container's width is below a specified number.

{{"demo": "ContainerResponsive.js" }}

### Dribbble shot

{{"demo": "DribbbleShot.js" }}

### Instagram post

{{"demo": "InstagramPost.js" }}
