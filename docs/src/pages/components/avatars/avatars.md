---
title: React Avatar component
components: Avatar, AvatarGroup, Badge
githubLabel: 'component: Avatar'
---

# Avatar

<p class="description">Avatars are found throughout material design with uses in everything from tables to dialog menus.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Image avatars

Image avatars can be created by passing standard `img` props `src` or `srcSet` to the component.

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## Letter avatars

Avatars containing simple characters can be created by passing a string as `children`.

{{"demo": "pages/components/avatars/LetterAvatars.js"}}

You can use different background colors for the avatar.
The following demo generates the color based on the name of the person.

{{"demo": "pages/components/avatars/BackgroundLetterAvatars.js"}}

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
- the first letter of the `alt` text
- a generic avatar icon

{{"demo": "pages/components/avatars/FallbackAvatars.js"}}

## Grouped

`AvatarGroup` renders its children as a stack. Use the `max` prop to limit the number of avatars.

{{"demo": "pages/components/avatars/GroupAvatars.js"}}

### Total avatars

If you need to control the total number of avatars not shown, you can use the `total` prop.

{{"demo": "pages/components/avatars/TotalAvatars.js"}}

## With badge

{{"demo": "pages/components/avatars/BadgeAvatars.js"}}
