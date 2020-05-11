---
title: React Avatar 头像组件
components: Avatar, AvatarGroup, Badge
---

# Avatar 头像

<p class="description">在整个 material design 中，无论是在表格中还是到对话框菜单中，都可以找到使用头像的身影。</p>

## 图片头像

可以通过向组件传递标准的`img` 属性、`src` 或`srcSet`来创建图片头像。

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## 字母头像

可以通过向`children`传递字符串的方式来创建字符头像。

{{"demo": "pages/components/avatars/LetterAvatars.js"}} 

## 尺寸

你可以通过改变`height` 以及`width` 的CSS属性来改变头像的尺寸。

{{"demo": "pages/components/avatars/SizeAvatars.js"}} 

## 图标头像

通过将图标作为` children `传递来创建图标头像。

{{"demo": "pages/components/avatars/IconAvatars.js"}} 

## 变种

如果你需要矩形或圆角头像，请使用 `variant`属性。

{{"demo": "pages/components/avatars/VariantAvatars.js"}} 

## Fallbacks

如果在加载头像图片时发生错误，组件将切换到以下备选方案：

- 提供的children子元素
- `alt`属性的首字母
- 通用头像图标

{{"demo": "pages/components/avatars/FallbackAvatars.js"}} 

## 分组

`AvatarGroup` 通过堆栈的方式渲染其子元素。

{{"demo": "pages/components/avatars/GroupAvatars.js"}} 

## 徽章

{{"demo": "pages/components/avatars/BadgeAvatars.js"}}