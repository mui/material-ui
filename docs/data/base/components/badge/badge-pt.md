---
product: base
title: Unstyled React badge
components: BadgeUnstyled
githubLabel: 'component: badge'
---

# Unstyled badge

<p class="description">Badge generates a small badge to the top-right of its child(ren).</p>

```js
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
```

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic usage

{{"demo": "UnstyledBadge.js", "defaultCodeOpen": false}}

## Badge visibility

The visibility of badges can be controlled using the `invisible` prop. If a badge is invisible, it has the `MuiBadge-invisible` class. It is up to the developer to provide styles that actually hide the badge.

{{"demo": "BadgeVisibility.js"}}

The badge hides automatically when `badgeContent` is zero. You can override this with the `showZero` prop.

{{"demo": "ShowZeroBadge.js"}}

## Maximum value

You can use the `max` prop to cap the value of the badge content. It is set to 99 by default.

Note that `badgeContent` should be a number (or convertible to a number) for this to work.

{{"demo": "BadgeMax.js"}}

## Accessibility

You can't rely on the content of the badge to be announced correctly. You should provide a full description, for instance, with `aria-label`:

{{"demo": "AccessibleBadges.js", "defaultCodeOpen": false}}
