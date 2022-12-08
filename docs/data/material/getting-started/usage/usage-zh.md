# 使用

<p class="description">立即开始使用 React 和 Material-UI。</p>

MUI components work in isolation. MUI components work in isolation. **它们是自我支持的**，只需注入所需样式即可运作。 它们并不依赖任何全局的样式表，如 [normalize.css](https://github.com/necolas/normalize.css/)。

您可以使用文档中演示的任意一个组件。 Please refer to each component's [demo page](/material-ui/react-button/) to see how they should be imported.

## 快速入门

下面是来帮助您入门的一个快速示例，**而您仅需这些操作**：

```jsx
import * as React from 'react';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}
```

是的，这就是您开始使用所需的一切，您也可以在这个实时的交互式的演示中所查看：

{{"demo": "Usage.js", "hideToolbar": true, "bg": true}}

## 全局样式

Material-UI usage experience can be improved with a handful of important globals that you'll need to be aware of.

### 响应式元标记（meta tag）

Material-UI 是先在移动设备上开发的，我们采用了首先为移动设备编写代码，然后根据需要使用 CSS media queries（CSS 媒体查询）扩展组件的策略。 如要确保所有设备的正确渲染和触摸缩放，请将响应式可视区域的元标记添加到您的`<head>`元素中。

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

### CssBaseline

MUI provides an optional [CssBaseline](/material-ui/react-css-baseline/) component. 它修复了浏览器和设备之间的一些不一致性，同时为常见的 HTML 元素提供了一点更多不同方式的的重置。

## 不同版本的文档

本文档始终展示了最新最稳定的 Material-UI 版本。 您可以在一个[单独的页面上](https://mui.com/versions/)找到旧版本的文档。

## 下一步

现在您已经了解了基本设置，现在是时候了解更多关于：

- How to provide [the Material Design font and typography](/material-ui/react-typography/).
- How to take advantage of the [theming solution](/material-ui/customization/theming/).
- How to [override](/material-ui/customization/how-to-customize/) the look and feel of the components.
