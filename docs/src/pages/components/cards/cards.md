---
title: React Card component
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'component: Card'
materialDesign: https://material.io/components/cards
---

# Card

<p class="description">Cards contain content and actions about a single subject.</p>

Cards are surfaces that display content and actions on a single topic.

They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic card

Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards are entry points to more complex and detailed information.

{{"demo": "pages/components/cards/BasicCard.js", "bg": true}}

### Outlined Card

Set `variant="outlined"` to render an outlined card.

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## Complex Interaction

On desktop, card content can expand. (Click the downward chevron to view the recipe.)

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Media

Example of a card using an image to reinforce the content.

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

By default, we use the combination of a `<div>` element and a _background image_ to display the media. It can be problematic in some situations, for example, you might want to display a video or a responsive image. Use the `component` prop for these use cases:

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ When `component="img"`, CardMedia relies on `object-fit` for centering the image. It's not supported by IE11.

## Primary action

Often a card allow users to interact with the entirety of its surface to trigger its main action, be it an expansion, a link to another screen or some other behavior. The action area of the card can be specified by wrapping its contents in a `CardActionArea` component.

{{"demo": "pages/components/cards/ActionAreaCard.js", "bg": true}}

A card can also offer supplemental actions which should stand detached from the main action area in order to avoid event overlap.

{{"demo": "pages/components/cards/MultiActionAreaCard.js", "bg": true}}

## UI Controls

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/card/).
