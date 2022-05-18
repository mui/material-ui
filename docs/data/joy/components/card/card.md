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

For accessibility purpose, it is recommended that the `Link` component is used inside the card's title and then pass the `overlay` prop to expand the interactive area to fill the whole card.

<!-- {{"demo": "InteractiveCard.js", "bg": true}} -->

### Multiple interaction

## Container responsive

## Component variables

## Real-world examples
