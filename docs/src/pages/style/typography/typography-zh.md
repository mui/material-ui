---
components: Typography
---
# 活版印刷

<p class="description">使用活版印刷可以尽可能清晰、高效地呈现您的设计和内容。</p>

一次太多的类型大小和样式会破坏任何布局。 [版式比例](https://material.io/design/typography/#type-scale)是一组有限的类型大小, 与布局网格一起工作很好。

## 常规

*Roboto*字体将**不** 由Material-UI 自动加载。 开发人员负责加载应用程序中使用的所有字体。 Roboto字体有几个简单的方法来开始。

## Roboto 字体 CDN

下面显示的是用于从 CDN 加载Roboto字体的示例链接标记。

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
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

{{"demo": "pages/style/typography/Types.js"}}

### 弃用的变体

{{"demo": "pages/style/typography/DeprecatedTypes.js"}}

## 主题

在某些情况下，您可能无法使用 `Typography` 组件。 希望您可以利用主题的 [`排版`](/customization/default-theme/?expend-path=$.typography) 键。

{{"demo": "pages/style/typography/TypographyTheme.js"}}

## 迁移到typography v2

Material design规范因变体名称和样式而发生变化。 为了实现平滑过渡，我们保留旧变体和重新设计的变体以实现向后兼容性，但我们记录了弃用警告。 我们将在下一个主要版本v4.0.0（2019年第一季度）中删除旧的排版变体。

### 策略

要立即切换到排版v2，您只需传递` useNextVariants：true </ code>
调用<code>createMuiTheme `：

```js
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
```

或者设置 `window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;`如果你不使用主题。

根据以下映射，这将使用新variants而不是旧的variants：

```sh
display4 => h1
display3 => h2
display2 => h3
display1 => h4
headline => h5
title => h6
subheading => subtitle1
body2 => body1
body1 (default) => body2 (default)
```

请注意，如果您使用其中一个旧版本，则会记录弃用警告。 我们建议您使用建议的variants替换那些旧的variants 为下一个主要版本。 有关如何使用全局主题的更多信息，请参见[主题](/customization/themes/)。