---
title: Componente Avatar de React
components: Avatar, AvatarGroup, Badge
---

# Avatar

<p class="description">Los avatares se pueden encontrar a lo largo de todo Material Design con usos que van desde tablas hasta diálogos de menús.</p>

## Avatares de Imágenes

Image avatars can be created by passing standard `img` props `src` or `srcSet` to the component.

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## Avatares de Letras

Avatars containing simple characters can be created by passing a string as `children`.

{{"demo": "pages/components/avatars/LetterAvatars.js"}}

## Tamaños

You can change the size of the avatar with the `height` and `width` CSS properties.

{{"demo": "pages/components/avatars/SizeAvatars.js"}}

## Avatares de íconos

Los avatares de íconos son creados pasando un ícono como `children`.

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

`AvatarGroup` renders its children as a stack.

{{"demo": "pages/components/avatars/GroupAvatars.js"}}

## With badge

{{"demo": "pages/components/avatars/BadgeAvatars.js"}}