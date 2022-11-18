---
product: joy-ui
title: React Badge component
githubLabel: 'component: badge'
unstyled: /base/react-badge/
---

# Badge

<p class="description">The Badge component generates a small label that is attached to its child element.</p>

## Introduction

A badge is a small descriptor for UI elements.
It typically sits on or near an element and indicates the status of that element by displaying a number, icon, or other short set of characters.

{{"demo": "BadgeUsage.js", "hideToolbar": true}}

:::success
To learn how to add more sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}


## Basics

```jsx
import Badge from '@mui/joy/Badge';
```

The default appearance of the Badge is a dot in the app's `primary` color that sits on the top-right corner of the element that it's attached to.

{{"demo": "SimpleBadge.js"}}

## Customization

### Content

Use a string or a number as a value for the `badgeContent` prop to display content inside the Badge.

{{"demo": "ContentBadge.js"}}

### Numbers

The following props are useful when `badgeContent` is a number.

#### showZero

By default, the Badge will be automatically hidden when `badgeContent={0}`.
You can override this behavior with the `showZero` prop:

{{"demo": "NumberBadge.js"}}

#### Maximum value

Use the `max` prop to cap the content to a maximum numerical value.

{{"demo": "BadgeMax.js"}}

### Visibility

Control the badge visibility using the `invisible` prop.

:::warning
If [`showZero`](#showzero) and `invisible` are both applied at the same time, then the Badge will still be visible when `badgeContent={0}`.
:::

{{"demo": "BadgeVisibility.js"}}

### Position

By default, the Badge sits on the top-right corner of the element that it's attached to.
Use the `anchorOrigin` prop to change the position of the Badge according to its `vertical` (top or bottom) and `horizontal` (left or right) placement.
Try clicking the arrows in the demo below to change the position of the Badge:

{{"demo": "BadgeAlignment.js", "hideToolbar": true}}

### Inset

Use the `badgeInset` prop to fine-tune the position of the Badge relative to the element that it's attached to.
This prop accepts a string composed of either one or two numbers expressed in units of `px`, `%`, `em`, or `rem`.

This unit-number defines the diagonal inset relative to the Badge's [`anchorOrigin`](#position)—for instance, the demo below pushes the Badge 14% closer to the center of its child element along both the horizontal and vertical axes:

{{"demo": "BadgeInset.js"}}

If you pass two unit-numbers to the `badgeInset` prop—for example`"50px 10px"`—the first number would apply to the vertical axis, and the second would apply horizontally.

## Accessibility

Screen readers may not provide users with enough information about a badge's contents.
To make your badge accessible, you must provide a full description with `aria-label`, as shown in the demo below:

{{"demo": "AccessibleBadges.js"}}
