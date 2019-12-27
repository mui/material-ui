---
title: Avatar React component
components: Avatar, AvatarGroup, Badge
---

# Avatar

<p class="description">Avatars are found throughout material design with uses in everything from tables to dialog menus.</p>

## Image avatars

Image avatars can be created by passing standard `img` props `src` or `srcSet` to the component.

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## Letter avatars

Avatars containing simple characters can be created by passing a string as `children`.

{{"demo": "pages/components/avatars/LetterAvatars.js"}}

## Sizes

You can change the size of the avatar with the `height` and `width` CSS properties.

{{"demo": "pages/components/avatars/SizeAvatars.js"}}

## Icon avatars

Icon avatars are created by passing an icon as `children`.

{{"demo": "pages/components/avatars/IconAvatars.js"}}

## Variants

If you need square or rounded avatars, use the `variant` prop.

{{"demo": "pages/components/avatars/VariantAvatars.js"}}

## Fallbacks

If there is an error loading the avatar image, the component falls back to an alternative in the following order:

- the provided children
- the first letter of tha `alt` text
- a generic avatar icon

{{"demo": "pages/components/avatars/FallbackAvatars.js"}}

## Grouped

`AvatarGroup` renders its children as a stack.

{{"demo": "pages/components/avatars/GroupAvatars.js"}}

## With badge

{{"demo": "pages/components/avatars/BadgeAvatars.js"}}
