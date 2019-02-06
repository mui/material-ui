---
title: Badge React component
components: Badge
---
# Badges

<p class="description">Badge generates a small badge to the top-right of its child(ren).</p>

## Emblemas Simples

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

{{"demo": "pages/demos/badges/SimpleBadge.js"}}

## Maximum Value

You can use the `max` property to cap the value of the badge content.

{{"demo": "pages/demos/badges/BadgeMax.js"}}

## Dot Badge

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/demos/badges/DotBadge.js"}}

## Badge visibility

The visibility of badges can be controlled using the `invisible` property.

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/demos/badges/BadgeVisibility.js"}}

## Customized Badge

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can change the badge position.

⚠️ While the material design specification encourages theming, this example is off the beaten path.

{{"demo": "pages/demos/badges/CustomizedBadge.js"}}