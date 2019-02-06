---
title: Card React component
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---
# Cards

<p class="description">Cards contain content and actions about a single subject.</p>

[Cards](https://material.io/design/components/cards.html) are surfaces that display content and actions on a single topic.

They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

## Simple Card

Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards are entry points to more complex and detailed information.

{{"demo": "pages/demos/cards/SimpleCard.js"}}

## Complex Interaction

On desktop, card content can expand.

{{"demo": "pages/demos/cards/RecipeReviewCard.js"}}

## Media

Example of a card using an image to reinforce the content.

{{"demo": "pages/demos/cards/MediaCard.js"}}

By default, we use the combination of a `<div>` element and a *background image* to display the media. It can be problematic in some situations. For instance, you might want to display a video or a responsive image. Use the `component` property for these use cases:

{{"demo": "pages/demos/cards/ImgMediaCard.js"}}

## UI Controls

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

{{"demo": "pages/demos/cards/MediaControlCard.js"}}