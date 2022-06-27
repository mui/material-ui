---
product: joy-ui
title: React Avatar component
githubLabel: 'component: avatar'
---

# Avatar

<p class="description">Avatar represents a person that contains an image or initials which can also be presented in a group with multiple avatars.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Variants and colors

The avatar applies Joy UI's global variant tokens－which has `soft` and `neutral` as default values for variant and color, respectively.

{{"demo": "AvatarUsage.js", "hideToolbar": true}}

## Image

Image avatar can be created by passing standard html `img` props (e.g. `src` or `srcSet`) to the component.

{{"demo": "ImageAvatars.js"}}

## Initials

Pass a string as `children` prop to the avatar to display initials.

{{"demo": "InitialAvatars.js"}}

## Sizes

The avatar has three standard sizes: `sm`, `md` (default), and `lg`.

{{"demo": "AvatarSizes.js"}}

## Fallbacks

If an error occurs while loading the avatar image, the component will fall back to alternatives in the following order:

1. The provided children
2. The first letter of the `alt` text
3. A generic avatar icon

{{"demo": "FallbackAvatars.js"}}

## Group

Use `AvatarGroup` component to group multiple avatars together.

{{"demo": "GroupedAvatars.js"}}

### Max and total avatars

The `AvatarGroup` does not provide built-in props to control the maximum and the total avatars.
This is because customization is broader if you have full control of the logic.

Here's a common example of what you'll find most applications out there:

{{"demo": "MaxAndTotalAvatars.js"}}

### Ellipsis action

The `Avatar` exposes meaningful CSS variables to communicate with the `AvatarGroup`.
You can apply those variables to other components to mimic the avatar appearance inside the group.
This customization technique makes your interface resilient to changes.

Here is an example of using `IconButton` component to create an ellipsis action:

{{"demo": "EllipsisAvatarAction.js"}}

### Overlapping order

By default, the first avatar in the group stays behind the second and so on.
You can reverse the overlapping order by reversing avatars position and providing CSS `flex-direction: row-reverse` to the `AvatarGroup`.

{{"demo": "OverlapAvatarGroup.js"}}

### Vertical

If you need to render the avatar grouped vertically, add the CSS `writing-mode: vertical-rl` property to the `AvatarGroup` and rotate the extra element, if existent, by -90 degrees.

:::info
This approach preserves the overlapping offset between avatars whereas `flex-direction: column` does not.
:::

{{"demo": "VerticalAvatarGroup.js"}}

### Component variables

The `AvatarGroup` contains CSS variables to control the gap and the ring size of the avatars.
You can override these variables via the `sx` prop.

{{"demo": "AvatarGroupVariables.js", "hideToolbar": true }}

## With badge

{{"demo": "BadgeAvatars.js"}}
