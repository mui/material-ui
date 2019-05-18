---
components: Typography
---

# 活版印刷

<p class="description">使用活版印刷可以尽可能清晰、高效地呈现您的设计和内容。</p>

一次太多的类型大小和样式会破坏任何布局。 [版式比例](https://material.io/design/typography/#type-scale)是一组有限的类型大小, 与布局网格一起工作很好。

## 常规

*Roboto*字体将**不** 由Material-UI 自动加载。 开发人员负责加载应用程序中使用的所有字体。 Roboto字体有几个简单的方法来开始。 For more advanced configuration, check out [the theme customization section](/customization/typography/).

## Roboto 字体 CDN

Shown below is a sample link markup used to load the Roboto font from a CDN:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## 通过 npm 安装

通过在终端中键入以下命令, 可以 [安装](https://www.npmjs.com/package/typeface-roboto):

`npm install typeface-roboto --save`

然后, 您可以将其导入到您的入口点。

```js
import 'typeface-roboto';
```

有关详细信息, 请查看 [typeface](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto) 项目。

⚠️使用这种方法时要小心。 确保您的包不急于加载所有字体变体 (100/300/400/500/700/900, 斜体/常规, SVG/woff)。 内联所有字体文件可以显着增加捆绑包的大小。 Material-UI默认排版配置仅依赖于300,400和500字体权重。

## 组件

{{"demo": "pages/components/typography/Types.js"}}

## 主题

在某些情况下，您可能无法使用 `Typography` 组件。 希望您可以利用主题的 [`排版`](/customization/default-theme/?expend-path=$.typography) 键。

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## 改变语义元素

The Typography component uses the `variantMapping` property to associate a UI variant with a semantic element. It’s important to realize that the style of a typography is independent from the semantic underlying element.

- You can change the underlying element for a one time occassion with the `component` property:

```jsx
{/* We already have an h1 in the page, let's not duplicate it. */}
<Typography variant="h1" component="h2">
  h1. Heading
</Typography>
```

- You can change the mapping [globally using the theme](/customization/globals/#default-props):

```js
const theme = createMuiTheme({
  props: {
    MuiTypography: {
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
});
```