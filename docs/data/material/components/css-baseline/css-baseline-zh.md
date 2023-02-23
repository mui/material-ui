---
product: material-ui
components: CssBaseline, ScopedCssBaseline
githubLabel: 'component: CssBaseline'
---

# CSS Baseline 基线

<p class="description">MUI 提供了一个 CssBaseline 组件，用于启动一个优雅、一致且简单的基线。</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 全局重置

您可能对 [normailize.css](https://github.com/necolas/normalize.css) 比较熟悉，这是一个 HTML 元素和样式规范化的属性的集合。

```jsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/*其他代码 */}
    </React.Fragment>
  );
}
```

## 作用于子组件

However, you might be progressively migrating a website to MUI, using a global reset might not be an option. 通过使用 `ScopedCsseline` 组件，是有可能将基线只应用于子组件。 It's possible to apply the baseline only to the children by using the `ScopedCssBaseline` component.

```jsx
import * as React from 'react';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import MyApp from './MyApp';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* 其他代码 */}
      <MyApp />
    </ScopedCssBaseline>
  );
}
```

⚠️ 请确保您移先导入 `ScopedCssBaseline`，以避免像在上面的例子那样出现 box-sizing 的冲突。

## 方法

### 页面

我们更新了 `<html>` 和 `<body>` 元素以提供更好的页面范围的默认值。 具体来说：

- 所有浏览器中的边距将会被删除。
- 默认使用 Material Design 的背景颜色。 It's using [`theme.palette.background.default`](/material-ui/customization/default-theme/?expand-path=$.palette.background) for standard devices and a white background for print devices.
- If `enableColorScheme` is provided to `CssBaseline`, native components color will be set by applying [`color-scheme`](https://web.dev/color-scheme/) on `<html>`. The value used is provided by the theme property `theme.palette.mode`. The value used is provided by the theme property `theme.palette.mode`.

### 布局

- 在 `<html>` 元素里面，我们将 `box-sizing` 全局设置为 `border-box`。 这样一来，包括 `*:: before` 和 `*:: after` 的每个元素，都会被声明来继承这个属性，这样能够确保元素的声明宽度永远不会超过 padding 或者 border。

### 滚动条

:::error
This API is deprecated, consider using [color-scheme](#color-scheme) instead.
:::

The colors of the scrollbars can be customized to improve the contrast (especially on Windows). Add this code to your theme (for dark mode).

```jsx
import darkScrollbar from '@mui/material/darkScrollbar';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
      }),
    },
  },
});
```

Be aware, however, that using this utility (and customizing `-webkit-scrollbar`) forces macOS to always show the scrollbar.

### 配色方案

This API is introduced in @mui/material (v5.1.0) for switching between `"light"` and `"dark"` modes of native components such as scrollbar, using the `color-scheme` CSS property. To enable it, you can set `enableColorScheme=true` as follows:

```jsx
<CssBaseline enableColorScheme />

// or

<ScopedCssBaseline enableColorScheme >
  {/* The rest of your application using color-scheme*/}
</ScopedCssBaseline>
```

### 文字铸排

- 在 `<html>` 里面不会声明基础的 font-size，但是我们假设是 16px (浏览器的默认设置)。 You can learn more about the implications of changing the `<html>` default font size in [the theme documentation](/material-ui/customization/typography/#html-font-size) page.
- 在 `theme.typography.body1` 元素上设置 `<body>` 样式。
- 您可以通过设置 `theme.typography.fontWeightBold` 来设置 `<b>` 和 `<strong>` 元素的 font-weight。
- 启用自定义字体平滑功能可以更好地显示 Roboto 字体。

## Customization 个性化

Head to the [global customization](/material-ui/customization/how-to-customize/#4-global-css-override) section of the documentation to change the output of these components.
