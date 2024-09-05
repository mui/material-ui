---
productId: material-ui
title: React Avatar component
components: Avatar, AvatarGroup, Badge
githubLabel: 'component: avatar'
githubSource: packages/mui-material/src/Avatar
---

# Avatar

<p class="description">Avatars are found throughout material design with uses in everything from tables to dialog menus.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Image avatars

Image avatars can be created by passing standard `img` props `src` or `srcSet` to the component.

{{"demo": "ImageAvatars.js"}}

## Letter avatars

Avatars containing simple characters can be created by passing a string as `children`.

{{"demo": "LetterAvatars.js"}}

You can use different background colors for the avatar.
The following demo generates the color based on the name of the person.

{{"demo": "BackgroundLetterAvatars.js"}}

## Sizes

You can change the size of the avatar with the `height` and `width` CSS properties.

{{"demo": "SizeAvatars.js"}}

## Icon avatars

Icon avatars are created by passing an icon as `children`.

{{"demo": "IconAvatars.js"}}

## Variants

If you need square or rounded avatars, use the `variant` prop.

{{"demo": "VariantAvatars.js"}}

## Fallbacks

If there is an error loading the avatar image, the component falls back to an alternative in the following order:

- the provided children
- the first letter of the `alt` text
- a generic avatar icon

{{"demo": "FallbackAvatars.js"}}

## Grouped

`AvatarGroup` renders its children as a stack. Use the `max` prop to limit the number of avatars.

{{"demo": "GroupAvatars.js"}}

### Total avatars

If you need to control the total number of avatars not shown, you can use the `total` prop.

{{"demo": "TotalAvatars.js"}}

### Custom surplus

Set the `renderSurplus` prop as a callback to customize the surplus avatar. The callback will receive the surplus number as an argument based on the children and the `max` prop, and should return a `React.ReactNode`.

The `renderSurplus` prop is useful when you need to render the surplus based on the data sent from the server.

{{"demo": "CustomSurplusAvatars.js"}}

## With badge

{{"demo": "BadgeAvatars.js"}}
