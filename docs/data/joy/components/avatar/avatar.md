---
product: joy-ui
title: React Avatar component
githubLabel: 'component: avatar'
---

# Avatar

<p class="description">An avatar is a graphical representation of a user's identity.</p>

## Introduction

The Avatar component can be used to display graphical information about a user in places such as menus, tables, and chats.

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

The Avatar component comes in three sizes: `sm`, `md` (the default), and `lg`:

{{"demo": "AvatarSizes.js"}}

:::success
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Variants

The Avatar component supports the four global variants: `soft` (default), `solid`, `outlined`, and `plain`.

{{"demo": "AvatarVariants.js"}}

:::success
To learn how to add more variants to the component, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
:::

### Initials

Use a string as children to display its initials on the Avatar component.

{{"demo": "InitialAvatars.js"}}

### Image

Insert images in the Avatar by using a path inside the `src` prop, similar to how you'd do in the HTML `<img>` element.
Make sure to to write a meaningful description in the `alt` prop.

{{"demo": "ImageAvatars.js"}}

### Image fallbacks

If an error occurs while loading the Avatar's image, it will fall back to alternatives in the following order:

1. The provided children string
2. The first letter of the `alt` text
3. A generic icon

{{"demo": "FallbackAvatars.js"}}

### With a badge

Combine the Avatar component with the [Badge](/joy-ui/react-badge/) to extend what you can communicate with it.

{{"demo": "BadgeAvatars.js"}}

### Group

Use the Avatar Group component to group multiple Avatars together.

```jsx
import AvatarGroup from '@mui/joy/AvatarGroup';
```

{{"demo": "GroupedAvatars.js"}}

### Quantity within a group

The Avatar Group does not provide built-in props to control the maximum or the total number of Avatars within a group.
This is because customization is broader if you have full control of the logic.

Use the snippet below as insipiration to create that:

{{"demo": "MaxAndTotalAvatars.js"}}

### Ellipsis action

Avatar exposes meaningful CSS variables to communicate with Avatar Group.
You can apply those variables to other components to mimic the Avatar's appearance inside a group.
This customization technique makes your interface more resilient to changes.

Here is an example using the Icon Button component to create an ellipsis action:

{{"demo": "EllipsisAvatarAction.js"}}

### Overlapping order

By default, the first Avatar in the group stays behind the second, and so on.
You can reverse the overlapping order by reversing the Avatar's position and using the CSS `flexDirection: row-reverse` property in the Avatar Group:

{{"demo": "OverlapAvatarGroup.js"}}

### Vertical

To render the Avatar Group vertically, add the CSS `writing-mode: vertical-rl` property to the it and rotate the extra element (if it exists) by -90 degrees.

:::info
This approach is preferable as it preserves the overlapping offset between Avatars, whereas `flexDirection: column` doesn't.
:::

{{"demo": "VerticalAvatarGroup.js"}}

## CSS variables

Play around with all the CSS variables available in the Slider component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "AvatarGroupVariables.js", "hideToolbar": true }}
