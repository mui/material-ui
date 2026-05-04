---
productId: material-ui
title: React Badge component
components: Badge
githubLabel: 'scope: badge'
githubSource: packages/mui-material/src/Badge
---

# Badge

<p class="description">Badge generates a small badge to the top-right of its child(ren).</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Usage guidelines

- **Use badges for supplemental status**: Badges work best for short counts or compact
  states attached to another element, such as unread messages on an inbox button. Don't use
  a badge as the only place where important status appears.
- **Label the element that owns the badge**: Badge content is hidden from assistive
  technologies by default because its meaning depends on the element it describes. Add a
  descriptive status to the target element, for example `aria-label="show 4 unread messages"`.
- **Give dot badges explicit meaning**: Dot badges don't include a count, so use them only
  when the state is explained elsewhere. Add visible status text such as `Unread`, include
  the state in the target's accessible label, or provide another clear state cue.

{{"demo": "AccessibleBadges.js"}}

## Basic badge

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

{{"demo": "SimpleBadge.js"}}

## Color

Use `color` prop to apply theme palette to component.

{{"demo": "ColorBadge.js"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedBadges.js"}}

## Badge visibility

The visibility of badges can be controlled using the `invisible` prop.

{{"demo": "BadgeVisibility.js"}}

The badge hides automatically when `badgeContent` is zero. You can override this with the `showZero` prop.

{{"demo": "ShowZeroBadge.js"}}

## Maximum value

You can use the `max` prop to cap the value of the badge content.

{{"demo": "BadgeMax.js"}}

## Dot badge

The `dot` prop changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "DotBadge.js"}}

## Badge overlap

You can use the `overlap` prop to place the badge relative to the corner of the wrapped element.

{{"demo": "BadgeOverlap.js"}}

## Badge alignment

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "BadgeAlignment.js", "hideToolbar": true}}
