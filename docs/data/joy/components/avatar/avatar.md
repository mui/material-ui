---
product: joy-ui
title: React Avatar component
githubLabel: 'component: avatar'
---

# Avatar

<p class="description">Avatar represents a person that contains an image or initials which can also be presented in a group with multiple avatars.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Image

Image avatar can be created by passing standard html `img` props (eg. `src` or `srcSet`) to the component.

{{"demo": "ImageAvatars.js"}}

## Initials

Pass a string as `children` prop to the avatar to display initials.

{{"demo": "InitialAvatars.js"}}

## Variants and Colors

The avatar applies Joy's global variant which has `soft` variant with `neutral` color by default.

{{"demo": "AvatarVariantsAndColors.js"}}

## Sizes

The avatar has three standard sizes: `sm`, `md` (default) and `lg`.

{{"demo": "AvatarSizes.js"}}

## Fallbacks

If there is an error loading the avatar image, the component falls back to an alternative in the following order:

- the provided children
- the first letter of the `alt` text
- a generic avatar icon

{{"demo": "FallbackAvatars.js"}}

## Group

Use `AvatarGroup` component to group multiple avatars together.

{{"demo": "GroupedAvatars.js"}}

### Max and total avatars

The `AvatarGroup` does not provide built-in props to control the maximum and the total avatars. We believe that it will make the customization easier if you have full control of the logic.

Here is a common example of the you will find in most application:

{{"demo": "MaxAndTotalAvatars.js"}}

### Ellipsis action

The `Avatar` exposes meaningful CSS variables to communicate with the `AvatarGroup`. You can apply those variables to other components to mimic the avatar appearance inside the group. This customization technique makes your interface resilient to changes.

Here is an example of using `IconButton` component to create an ellipsis action:

{{"demo": "EllipsisAvatarAction.js"}}

### Overlapping order

By default, the first avatar in the group stays behind the second and so on. You can reverse the overlapping order by reversing avatars position and providing CSS `flex-direction: row-reverse` to the `AvatarGroup`.

{{"demo": "OverlapAvatarGroup.js"}}

### Vertical

If you need to render the avatar group in vertical axis, provides CSS `writing-mode: vertical-rl` to the `AvatarGroup` and rotate the extra element by -90 degree.

:::info
This approach preserves the overlapping offset between avatars whereas `flex-direction: column` does not.
:::

{{"demo": "VerticalAvatarGroup.js"}}

### Component variables

The `AvatarGroup` contains CSS variables to control the gap and the ring size of the avatars. You can override these variables via the `sx` prop.

{{"demo": "AvatarGroupVariables.js", "hideToolbar": true }}

## With badge

{{"demo": "BadgeAvatars.js"}}
