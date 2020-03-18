---
title: Componente React para Avatares
components: Avatar, AvatarGroup, Badge
---

# Avatar

<p class="description">Os avatares são encontrado ao longo do material design, com usos em tudo, desde tabelas até menus de diálogo.</p>

## Avatares com imagens

Image avatars can be created by passing standard `img` props `src` or `srcSet` to the component.

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## Avatares com letras

Avatars containing simple characters can be created by passing a string as `children`.

{{"demo": "pages/components/avatars/LetterAvatars.js"}}

## Tamanhos

You can change the size of the avatar with the `height` and `width` CSS properties.

{{"demo": "pages/components/avatars/SizeAvatars.js"}}

## Avatares com ícones

Avatares com ícones são criados passando o ícone como `children`.

{{"demo": "pages/components/avatars/IconAvatars.js"}}

## Variantes

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