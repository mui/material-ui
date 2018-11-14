---
components: CssBaseline
---
# CSS 基线

<p class="description">Material-UI 提供了一个 CssBaseline 组件, 用于启动一个优雅、一致且简单的基线。</p>

您可能熟悉 [normailize.css](https://github.com/necolas/normalize.css), 一个HTML 元素和属性样式规范化的集合。

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}

export default MyApp;
```

## 方法

### 页面

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- The margin in all browsers is removed.
- The default Material Design background color is applied. It's using [`theme.palette.background.default`](/customization/default-theme/?expend-path=$.palette.background) for standard devices and a white background for print devices.

### 布局

- `box-sizing` is set globally on the `<html>` element to `border-box`. Every element—including `*::before` and `*::after` are declared to inherit this property, which ensures that the declared width of the element is never exceeded due to padding or border.

### Typography

- Font antialiasing is enabled for better display of the Roboto font.
- No base font-size is declared on the `<html>`, but 16px is assumed (the browser default). You can learn more about the implications of changing the `<html>` default font size in [the theme documentation](/customization/themes/#typography-html-font-size) page.