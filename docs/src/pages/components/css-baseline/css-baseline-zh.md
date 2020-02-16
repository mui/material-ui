---
components: CssBaseline, ScopedCssBaseline
---

# CSS Baseline 基线

<p class="description">Material-UI 提供了一个 CssBaseline 组件，用于启动一个优雅、一致且简单的基线。</p>

## Global reset

您可能对 [normailize.css](https://github.com/necolas/normalize.css)比较熟悉，而这是一个 HTML 元素和样式规范化的属性的集合。

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}
```

## Scoping on children

However, you might be progressively migrating a website to Material-UI, using a global reset might not be an option. It's possible to apply the baseline only to the children by using the `ScopedCssBaseline` component.

```jsx
import React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* The rest of your application */}
    </ScopedCssBaseline>
  );
}
```

## Approach

### 页面

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- 所有浏览器中的边距将会被删除。
- Material Design 的背景颜色会默认地被应用。 It's using [`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) for standard devices and a white background for print devices.

### 布局

- 在 `<html>` 元素里面，我们将 `box-sizing` 全局设置为 `border-box`。 这样一来，包括 `*:: before` 和 `*:: after` 的每个元素，都会被声明来继承这个属性，这样能够确保元素的声明宽度永远不会超过 padding 或者 border。

### Typography（文字铸排）

- 在 `<html>` 里面不会声明基础的 font-size，但是我们假设是 16px (浏览器的默认设置)。 您可以在[主题文档](/customization/typography/#typography-html-font-size) 页面中了解更多有关更改 `<html>` 默认字体大小的影响 。
- 在 `theme.typography.body2` 元素上设置 `<body>` 样式。
- Set the font-weight to `theme.typography.fontWeightBold` for the `<b>` and `<strong>` elements.
- 字体的平滑化能让 Roboto 字体更好地展示。