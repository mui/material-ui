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

The `Card` is a surface component that group multiple components to form a meaningful interface. The default card comes with a padding and a subtle shadow.

In Joy, we recommend to use these components to compose different kind of information into a single card.

- `Typography` for creating title, description or texts.
- `AspectRatio` for controlling the size of images and videos.
- `Button` and `IconButton` for building call to action elements.

{{"demo": "BasicCard.js", "bg": true}}

## Overflow

If you want to create an overflow content that fill from edge to edge of the card, wrap the content with `CardOverflow` component. It automatically takes care of the top and the bottom edge if it renders as the first or the last child of the card.

{{"demo": "OverflowCard.js", "bg": true}}

## Back cover

The `CardCover` is responsible for creating the content that covers the whole card. You can think of card covers as a background layers that stay behind the `CardContent`.

{{"demo": "CardCovers.js", "bg": true}}

### Media

You can place a plain image or a video element inside the `CardCover`. It uses [`object-fit: cover`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) on the image as a default value.

{{"demo": "MediaCover.js", "bg": true}}

### Gradient overlay

You should make sure that there is enough constrast between the background cover and the content. One way to enhance the readability is to insert another `CardCover` to create a gradient overlay between the cover and the content.

{{"demo": "GradientCover.js", "bg": true}}

## Interactive card

Users are able to click or tap on any area of the card to navigate to another page.

For accessibility purpose, it is recommended that the `Link` component is used inside the card's title and then pass the `overlay` prop to expand the interactive area to fill the whole card. The keyboard focus appearance also covers the entire card.

{{"demo": "InteractiveCard.js", "bg": true}}

:::info
For more details about the card accessilibity, we recommend reading the [inclusive cards](https://inclusive-components.design/cards/).
:::

### Multiple interaction

By default, other action elements such as links and buttons will stay on top of the interactive area but in some cases you might have to manually control the `z-index` of each element.

:::success
💡 **Tip**: use CSS pseudo-class [`:focus-within`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within) to style the card when any of its child is focused.
:::

{{"demo": "MultipleInteractionCard.js", "bg": true}}

## Component variables

The `Card` exposes 2 important CSS variables to communicate with other Joy components. If you want to adjust the padding or the border radius of the card, we recommend to do it via these variables instead of the direct properties because both of the variables will be used to calculate the proper border radius of the children.

{{"demo": "CardVariables.js", "bg": true, "hideToolbar": true}}

## More examples

The demos below show the power of Joy composition by replicating some of the real-world examples.

### Container responsive

This demo uses the similar technique like [the flexbox holy albatross](https://heydonworks.com/article/the-flexbox-holy-albatross/) to stack the elements when the container's width is below a specified number.

{{"demo": "ContainerResponsive.js", "bg": true}}

### Dribbble shot

{{"demo": "DribbbleShot.js", "bg": true}}

### Instagram post

{{"demo": "InstagramPost.js", "bg": true}}
