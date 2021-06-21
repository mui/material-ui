---
title: React Card component
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Card

<p class="description">Cards contain content and actions about a single subject.</p>

[Cards](https://material.io/design/components/cards.html) are surfaces that display content and actions on a single topic.

They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

## Simple Card

Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards are entry points to more complex and detailed information.

{{"demo": "pages/components/cards/SimpleCard.js", "bg": true}}

### Outlined Card

Set `variant="outlined"` to render an outlined card.

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## Complex Interaction

On desktop, card content can expand.

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Media

Example of a card using an image to reinforce the content.

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

By default, we use the combination of a `<div>` element and a *background image* to display the media. It can be problematic in some situations. For instance, you might want to display a video or a responsive image. Use the `component` property for these use cases:

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ When `component="img"`, CardMedia relies on `object-fit` for centering the image. It's not supported by IE 11.

## UI Controls

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}

## Customization

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/card).

