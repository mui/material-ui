---
product: material-ui
title: React Typography（文字铸排）组件
components: Typography
githubLabel: 'component: Typography'
materialDesign: https://m2.material.io/design/typography/the-type-system.html
---

# Typography

<p class="description">使用文字铸排可以尽可能清晰、高效地展示您的设计和内容。</p>

大量字阶和样式会影响任何布局的美观性。 [版式比例](https://m2.material.io/design/typography/#type-scale)是一组有限的类型大小, 与布局网格一起工作很好。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 概述

Material-UI **不会**自动加载 _Roboto_ 字体。 你负责加载你的应用程序中使用的任何字体。 有这样几个简单的方法来加载 Roboto 字体。 For more advanced configuration, check out [the theme customization section](/material-ui/customization/typography/).

## Roboto 字体 CDN

以下是一个简单 link markup，可以用于从 CDN 加载 Roboto 字体：

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## 通过 npm 安装

You can [install it](https://www.npmjs.com/package/@fontsource/roboto) by running one of the following commands in your terminal:

With **npm**:

`npm install @fontsource/roboto`

Or **yarn**:

`yarn add @fontsource/roboto`

Then, you can import it in your entry-point.

```js
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

For more info check out [Fontsource](https://github.com/fontsource/fontsource).

Fontsource can be configured to load specific subsets, weights and styles. MUI default typography configuration only relies on 300, 400, 500, and 700 font weights.

## 组件

The Typography component makes it easy to apply a default set of font weights and sizes in your application.

{{"demo": "Types.js"}}

## 主题

In some situations you might not be able to use the `Typography` component. Hopefully, you might be able to take advantage of the [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) keys of the theme.

{{"demo": "TypographyTheme.js"}}

## 改变语义元素

The Typography component uses the `variantMapping` prop to associate a UI variant with a semantic element. It's important to realize that the style of a typography component is independent from the semantic underlying element.

- 使用 `component` 属性，您可以一次性改变底层元素的样式：

```jsx
{
  /* 在此页面中已经有一个 h1 标签，我们不会再重复。 */
}
<Typography variant="h1" component="h2">
  h1. 标题
</Typography>; Heading
</Typography>;
```

- You can change the mapping [globally using the theme](/material-ui/customization/theme-components/#default-props):

```js
const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});
```

## 添加 & 禁用变体

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. See the [Adding & disabling variants](/material-ui/customization/typography/#adding-amp-disabling-variants) example for more info.

## 系统属性

As a CSS utility component, the `Typography` supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Typography mt={2}>
```

## 无障碍设计

A few key factors to follow for an accessible typography:

- **字体颜色**。 在文本颜色和背景颜色间提供足够的对比性，请参考 [WCAG 2.0 颜色对比度](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) 的最低标准（4.5:1）。
- **字体大小（字阶）**。 Use [relative units (rem)](/material-ui/customization/typography/#font-size) to accommodate the user's settings.
- **标题等级**。 请不要跳过[标题的等级](https://www.w3.org/WAI/tutorials/page-structure/headings/) 。 你需要将 [ style 从语义元素中分离开来](#changing-the-semantic-element)，这样能够解决这个问题。
