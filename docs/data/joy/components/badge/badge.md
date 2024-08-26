---
productId: joy-ui
title: React Badge component
components: Badge
githubLabel: 'component: badge'
unstyled: /base-ui/react-badge/
---

# Badge

<p class="description">The Badge component generates a small label that is attached to its child element.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

A badge is a small descriptor for UI elements.
It typically sits on or near an element and indicates the status of that element by displaying a number, icon, or other short set of characters.

{{"demo": "BadgeUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Badge from '@mui/joy/Badge';
```

The Badge component wraps around the UI element that it's attached to.
Its default appearance is a dot in the app's `primary` color that sits on the top-right corner of the element that it's attached to.

{{"demo": "SimpleBadge.js"}}

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

## Customization

### Variants

The Badge component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid` (default), `soft` , `outlined`, and `plain`.

{{"demo": "BadgeVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The Badge component comes in three sizes: `sm`, `md` (default), and `lg`:

{{"demo": "BadgeSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.

{{"demo": "BadgeColors.js"}}

### Visibility

Use the `invisible` prop to control the Badge's visibility.

:::warning
If [`showZero`](#numbers) and `invisible` are both applied at the same time, then the Badge will still be visible when `badgeContent={0}`.
:::

{{"demo": "BadgeVisibility.js"}}

### Position

By default, the Badge sits on the top-right corner of the element that it's attached to.
Use the `anchorOrigin` prop to change the position of the Badge according to its `vertical` (top or bottom) and `horizontal` (left or right) placement.
Try clicking the arrows in the demo below to change the position of the Badge:

{{"demo": "BadgeAlignment.js", "hideToolbar": true}}

### Inset

Use the `badgeInset` prop to fine-tune the position of the Badge relative to the element that it's attached to.
This prop accepts a string composed of numbers expressed in units of `px`, `%`, `em`, or `rem`. (This syntax corresponds to the [inset CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/inset).)

This string defines the inset from the Badge's [`anchorOrigin`](#position)—for instance, the demo below pushes the Badge 14% closer to the center of its child element (relative to the top-right corner) along both the vertical and horizontal axes:

{{"demo": "BadgeInset.js"}}

If you pass two unit-numbers to the `badgeInset` prop—for example`"50px 10px"`—the first number applies to the vertical axis, and the second applies horizontally.
If you pass four unit-numbers to the prop—such as `"0 -10px 0 5px"`, they are applied clockwise starting from the top.

## Accessibility

Screen readers may not provide users with enough information about a badge's contents.
To make your Badge accessible, you must provide a full description with `aria-label`, as shown in the demo below:

{{"demo": "AccessibleBadges.js"}}

## Anatomy

The Badge component is composed of a root `<span>` that houses the element that the Badge is attached to, followed by a `<span>` to represent the Badge itself:

```html
<span class="MuiBadge-root">
  <!-- the element the Badge is attached to -->
  <span class="MuiBadge-badge">
    <!-- Badge content -->
  </span>
</span>
```
