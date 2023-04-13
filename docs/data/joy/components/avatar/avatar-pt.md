---
product: joy-ui
title: React Avatar component
components: Avatar, AvatarGroup, SvgIcon
githubLabel: 'component: avatar'
---

# Avatar

<p class="description">Avatar represents a person that contains an image or initials which can also be presented in a group with multiple avatars.</p>

## Introduction

The avatar component is usually seen for displaying user information in places such as menus, tables, and chats.

{{"demo": "AvatarUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Avatar from '@mui/joy/Avatar';

export default function MyApp() {
  return <Avatar />;
}
```

### Sizes

The avatar components comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

{{"demo": "AvatarSizes.js"}}

### Initials

Use a string as children to display its initials on the avatar component.

{{"demo": "InitialAvatars.js"}}

### Image

Insert images in the avatar by using a path inside the `src` prop, similar to how you'd do in the HTML `<img>` element. Make sure to to write a meaningful description in the `alt` prop.

{{"demo": "ImageAvatars.js"}}

### Image fallbacks

If an error occurs while loading the avatar image, it will fallback to alternatives in the following order:

1. The provided children string.
2. The first letter of the `alt` text.
3. A generic icon.

{{"demo": "FallbackAvatars.js"}}

### With a badge

Combine the avatar component with the [`Badge`](/joy-ui/react-badge/) to extend what you can communicate with it.

{{"demo": "BadgeAvatars.js"}}

### Group

Use `AvatarGroup` component to group multiple avatars together.

```jsx
import AvatarGroup from '@mui/joy/AvatarGroup';
```

{{"demo": "GroupedAvatars.js"}}

### Quantity within a group

The `AvatarGroup` does not provide built-in props to control the maximum and the total number of avatars within a group. This is because customization is broader if you have full control of the logic.

Use the snippet below as inspiration to create that:

{{"demo": "MaxAndTotalAvatars.js"}}

### Ellipsis action

`Avatar` exposes meaningful CSS variables to communicate with `AvatarGroup`. You can apply those variables to other components to mimic the avatar appearance inside a group. This customization technique makes your interface more resilient to changes.

Here is an example of using `IconButton` component to create an ellipsis action:

{{"demo": "EllipsisAvatarAction.js"}}

### Overlapping order

By default, the first avatar in the group stays behind the second and so on. You can reverse the overlapping order by reversing avatars position and using the CSS `flexDirection: row-reverse` property in the `AvatarGroup`.

{{"demo": "OverlapAvatarGroup.js"}}

### Vertical

To render the `AvatarGroup` vertically, add the CSS `writing-mode: vertical-rl` property to the it and rotate the extra element, if existent, by -90 degrees.

:::info
**Tip:** Give preference to this approach as it preserves the overlapping offset between avatars whereas `flexDirection: column` don't.
:::

{{"demo": "VerticalAvatarGroup.js"}}

## CSS variables

Play around with all the CSS variables available in the slider component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "AvatarGroupVariables.js", "hideToolbar": true }}
