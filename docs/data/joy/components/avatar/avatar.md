---
productId: joy-ui
title: React Avatar component
components: Avatar, AvatarGroup, SvgIcon
githubLabel: 'component: avatar'
---

# Avatar

<p class="description">An avatar is a graphical representation of a user's identity.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

The Avatar component can be used to display graphical information about a user in places such as menus, tables, and chats.

{{"demo": "AvatarUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Avatar from '@mui/joy/Avatar';
```

By default, the Avatar component displays a generic Person Icon.
You can replace this icon with a text string or an image.

{{"demo": "BasicAvatars.js"}}

### Text Avatar

Wrap the Avatar component around a string to display text.
Note that the Avatar is designed to comfortably fit two letters at most—for instance, a user's initials:

{{"demo": "InitialAvatars.js"}}

### Image Avatar

Insert images into the Avatar by defining a path inside the `src` prop, just like you would with an HTML `<img>` element.
Make sure to to write a meaningful description for the `alt` prop.

{{"demo": "ImageAvatars.js"}}

#### Image fallbacks

If an error occurs while loading the Avatar's image, it will fall back to the following alternatives (in this order):

1. The provided child string
2. The first letter of the alt text
3. The default generic icon

{{"demo": "FallbackAvatars.js"}}

## Customization

### Variants

The Avatar component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid`, `soft` (default), `outlined`, and `plain`.

{{"demo": "AvatarVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The Avatar component comes in three sizes: `sm`, `md` (default), and `lg`:

{{"demo": "AvatarSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

## Usage with Avatar Group

```jsx
import AvatarGroup from '@mui/joy/AvatarGroup';
```

Use the Avatar Group component to group multiple Avatars together.

{{"demo": "GroupedAvatars.js"}}

### Quantity within a group

The Avatar Group does not provide built-in props to control the maximum or the total number of Avatars within a group.
This is intentionally left open-ended to give you broader options for customization.

The demo below shows an example of an Avatar Group that maxes out at five; all Avatars beyond the first four are lumped together in the fifth Avatar, which displays the total number hidden:

{{"demo": "MaxAndTotalAvatars.js"}}

### Consistent appearance

The Avatar component exposes meaningful CSS variables to communicate with Avatar Group.
You can apply those variables to other non-Avatar components to mimic the Avatar's appearance inside of a group.
This customization technique makes your interface more resilient to changes, as any style changes applied to the Avatar will also be applied to the other components in the group.

Here is an example using an Icon Button with its styles defined by the Avatar's CSS variables:

{{"demo": "EllipsisAvatarAction.js"}}

### Overlapping order

By default, the first Avatar in the group sits behind the second, which sits behind the third, and so on.
You can reverse the overlapping order by reversing the order of the Avatars and using the CSS `flexDirection: row-reverse` property in the Avatar Group:

{{"demo": "OverlapAvatarGroup.js"}}

### Vertical stacking

To render the Avatar Group vertically, add the CSS `writing-mode: vertical-rl` property and rotate the interior element (if one is present) by -90 degrees.

:::success
This approach is preferable because it preserves the overlapping offset between Avatars; the alternative—`flexDirection: column`—does not.
:::

{{"demo": "VerticalAvatarGroup.js"}}

## Usage with Badge

```jsx
import Badge from '@mui/joy/Badge';
```

Combine the Avatar component with the [Badge](/joy-ui/react-badge/) to visually communicate more complex information about a user's status:

{{"demo": "BadgeAvatars.js"}}

## CSS variables playground

Play around with the CSS variables available to the Avatar component to see how the design changes.
You can use these to customize the component with both the `sx` prop and the theme.

{{"demo": "AvatarGroupVariables.js", "hideToolbar": true, "bg": "gradient"}}

## Anatomy

The Avatar component is composed of a root `<div>` that may wrap around an `<svg>`, an `<img>`, or a string:

```html
<div class="MuiAvatar-root">
  <!-- Avatar contents -->
</div>
```
