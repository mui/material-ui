---
title: React Avatar（头像）组件
components: Avatar, AvatarGroup, Badge
---

# Avatar (头像)

<p class="description">在整个 material design 中，无论是在表格中还是到对话框菜单中，都可以找到使用头像的身影。</p>

## Image avatars（图片头像）

Image avatars can be created by passing standard `img` props `src` or `srcSet` to the component.

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## Letter avatars（字母头像）

Avatars containing simple characters can be created by passing a string as `children`.

{{"demo": "pages/components/avatars/LetterAvatars.js"}}

## 尺寸

You can change the size of the avatar with the `height` and `width` CSS properties.

{{"demo": "pages/components/avatars/SizeAvatars.js"}}

## 图标头像

通过将图标作为` children `传递来创建图标头像。

{{"demo": "pages/components/avatars/IconAvatars.js"}}

## 变种(Variants)

If you need square or rounded avatars, use the `variant` prop.

{{"demo": "pages/components/avatars/VariantAvatars.js"}}

## Fallbacks

If there is an error loading the avatar image, the component falls back to an alternative in the following order:

- the provided children
- the first letter of tha `alt` text
- a generic avatar icon

{{"demo": "pages/components/avatars/FallbackAvatars.js"}}

## 分组

`AvatarGroup` renders its children as a stack.

{{"demo": "pages/components/avatars/GroupAvatars.js"}}

## With badge

{{"demo": "pages/components/avatars/BadgeAvatars.js"}}