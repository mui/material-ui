---
productId: material-ui
title: React Card component
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'scope: card'
materialDesign: https://m2.material.io/components/cards
githubSource: packages/mui-material/src/Card
---

# Card

<p class="description">Cards contain content and actions about a single subject.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}
> For full API and props, see [Card API](/material-ui/api/card/).

## Introduction

Cards are surfaces that display content and actions on a single topic.
The MUI Card component includes several complementary utility components to handle various use cases:

- Card: a container for grouping related content and actions.
- CardContent: the wrapper for the card’s main content.
- CardHeader: an optional wrapper for the card’s header area.
- CardMedia: an optional container for images, videos, and other media.
- CardActions: an optional wrapper that groups action buttons.
- CardActionArea: an optional wrapper that makes a defined area of the card interactive.

{{"demo": "BasicCard.js", "bg": true}}

## Basics

```jsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
```

:::success
Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards are meant to be entry points to more complex and detailed information.
:::

### Outlined Card

Set `variant="outlined"` to render an outlined card.

{{"demo": "OutlinedCard.js", "bg": true}}

## Complex Interaction

On desktop, card content can expand. (Click the downward chevron to view the recipe.)

{{"demo": "RecipeReviewCard.js", "bg": true}}

## Media

Example of a card using an image to reinforce the content.

{{"demo": "MediaCard.js", "bg": true}}

By default, we use the combination of a `<div>` element and a _background image_ to display the media. It can be problematic in some situations, for example, you might want to display a video or a responsive image. Use the `component` prop for these use cases:

> When using `component="img"`, provide an appropriate `alt` text for accessibility.

{{"demo": "ImgMediaCard.js", "bg": true}}

## Primary action

Often a card allows users to interact with the entirety of its surface to trigger its main action, be it an expansion, a link to another screen, or another behavior. The action area of the card can be specified by wrapping its contents in a `CardActionArea` component.

{{"demo": "ActionAreaCard.js", "bg": true}}

A card can also offer supplemental actions that should be separate from the main action area to avoid event overlap.

{{"demo": "MultiActionAreaCard.js", "bg": true}}

## UI Controls

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

{{"demo": "MediaControlCard.js", "bg": true}}

## Active state styles

To customize a Card's styles when it's in an active state, you can attach a `data-active` attribute to the Card Action Area component and apply styles with the `&[data-active]` selector, as shown below:

{{"demo": "SelectActionCard.js", "bg": true}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/?path=/docs/card-introduction--docs).
