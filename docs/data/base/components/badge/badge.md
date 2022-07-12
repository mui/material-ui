---
product: base
title: Unstyled React Badge component
components: BadgeUnstyled
githubLabel: 'component: badge'
---

# Unstyled badge

<p class="description">The `BadgeUnstyled` component generates a small label that is attached to its children elements.</p>

```js
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
```

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic usage

{{"demo": "UnstyledBadge.js", "defaultCodeOpen": false}}

## Badge visibility

You can control the visibility of a `BadgeUnstyled` by using the `invisible` prop.
Setting a badge to `invisible` does not actually hide it—instead, this prop adds the `MuiBadge-invisible` class to the badge, which you can target with styles to hide however you prefer:

{{"demo": "BadgeVisibility.js"}}

## Numerical badges

The following props are useful when `badgeContent` is a number.

### The showZero prop

By default, badges automatically hide when `badgeContent={0}`. You can override this behavior with the `showZero` prop:

{{"demo": "ShowZeroBadge.js"}}

### The max prop

You can use the `max` prop to set a maximum value for `badgeContent`.
The default is 99.

{{"demo": "BadgeMax.js"}}

## Accessibility

Screen readers may not provide users with enough information about a badge's contents.
To make your `BadgeUnstyled` accessible, you must provide a full description with `aria-label`:

{{"demo": "AccessibleBadges.js", "defaultCodeOpen": false}}
