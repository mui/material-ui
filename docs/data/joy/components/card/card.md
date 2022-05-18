---
product: joy-ui
title: React Card component
githubLabel: 'component: card'
---

# Card

<p class="description">Cards contain content and actions about a single subject.</p>

Cards are surfaces that display content and actions on a single topic.

They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

## Basic

The `Card` is a surface component that group multiple components to form a meaningful interface. The default card comes with padding and a subtle shadow.

In Joy, we recommend to use these components to compose different kind of information into a single card.

- `Typography` for creating title, description or texts.
- `AspectRatio` for controlling the size of images and videos.
- `Button` and `IconButton` for building call to action elements.

{{"demo": "BasicCard.js", "bg": true}}

## Overflow

If you want to create an overflow content that fill from edge to edge of the card, wrap the content with `CardOverflow` component.

To achieve a consistent spacing, you can use the CSS variable `--Card-padding` provided by the card (take a look at the code of the demo below).

{{"demo": "OverflowCard.js", "bg": true}}

## Back cover

The `CardCover` is responsible for creating content that fills the whole card. You can think of card covers as a layers that stay behind the `CardContent`.

{{"demo": "CardCovers.js", "bg": true}}

### Media

You can place a plain image or video inside the `CardCover` and it will cover the whole area of the card.

{{"demo": "MediaCover.js", "bg": true}}

### Gradient overlay

Create a gradient overlay on top of the back cover to emphasize the content for readability.

{{"demo": "GradientCover.js", "bg": true}}

## Interactive card

Users are able to click or tap on any area of the card to navigate to another page.

For accessibility purpose, it is recommended that the `Link` component is used inside the card's title and then pass the `overlay` prop to expand the interactive area to fill the whole card. The keyboard focus appearance also covers the entire card.

{{"demo": "InteractiveCard.js", "bg": true}}

### Multiple interaction

By default, other action elements such as links and buttons will stay on top of the interactive area but in some cases you might have to manually control the `z-index` of each element.

:::info
💡 **Tip**: use CSS pseudo-class [`:focus-within`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within) to style the card when any of its child is focused.
:::

{{"demo": "MultipleInteractionCard.js", "bg": true}}

## More examples

The demos below show the power of Joy composition by replicating some of the real-world examples.

### Container responsive

This demo uses the similar technique like [the flexbox holy albatross](https://heydonworks.com/article/the-flexbox-holy-albatross/) to stack the elements when the container's width is below a specified number.

{{"demo": "ContainerResponsive.js", "bg": true}}

### Dribbble shot

{{"demo": "DribbbleShot.js", "bg": true}}

### Instagram post

{{"demo": "InstagramPost.js", "bg": true}}
