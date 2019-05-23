# 使用

<p class="description">立即开始使用 React 和 Material-UI。</p>

Material-UI 组件是独立工作的。 **它们是自我支持**的，并只要注入它们需要显示的样式。 他们不依赖任何全局的样式表, 如 [normalize.css](https://github.com/necolas/normalize.css/).

您可以使用文档中演示的任何组件。 请参阅每个组件的 [demo页](/components/buttons/), 以了解应如何导入它们。

## 快速开始

下面是来帮助您入门的一个快速示例，**而这真的是您需要的所有操作 **：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      你好，世界
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

是的，这就是您开始使用所需的一切，您也可以在这个实时的交互式的演示中所查看：

{{"demo": "pages/getting-started/usage/Usage.js", "hideHeader": true}}

## 全局变量

您能够注意到，有一些重要的全局变量，可以改善 Material-UI 的用户体验。

### 响应式元标记

Material-UI 是先在移动设备上开发的，我们采用了首先为移动设备编写代码，然后根据需要使用 CSS media queries（CSS媒体查询）扩展组件的策略。 如要确保所有设备的正确渲染和触摸缩放，请将响应式可视区域的元标记添加到您的`<head>`元素中。

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
/>
```

### CssBaseline

Material-UI 提供了可选的 [CssBaseline](/components/css-baseline/) 组件。 It fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

## 不同版本的文档

本文档始终展示了最新最稳定的 Material-UI 版本。 您可以在一个[单独的页面上](/versions/)找到旧版本的文档。

## 下一步

现在您已经了解了基本设置，现在是时候了解更多关于：

- 如何提供 [Material Design字体和排版](/components/typography/)。
- 如何利用 [主题解决方案](/customization/themes/)。
- 如何 [覆盖](/customization/components/) 组件的呈现和观感。