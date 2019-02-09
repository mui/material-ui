# 使用

<p class="description">立刻使用React和Material-UI。</p>

Material-UI 组件是独立工作的。 它们是**自我支持**的，并只要注入而且仅注入它们需要显示的样式。 他们不依赖任何全局的样式表, 如 [normalize.css](https://github.com/necolas/normalize.css/).

您可以使用文档中演示的任何组件。 请参阅每个组件的 [demo 页 ](/demos/buttons/), 以了解应如何导入它们。

## 快速开始

下面是一个快速的示例来帮助您入门, **这是您需要的所有操作 **:

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

是的，这就是您开始使用所需的一切，正如您在此实时和交互式演示中所看到的：

{{"demo": "pages/getting-started/usage/Usage.js", "hideHeader": true}}

## 全局

使用一些您需要注意的重要全局变量可以改善Material-UI使用体验。

### 响应元标记

Material-UI首先是移动开发的，我们首先为移动设备编写代码，然后根据需要使用CSS媒体查询扩展组件。 要确保所有设备的正确渲染和触摸缩放，请将响应式视口元标记添加到 `<head>` 元素。

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
```

### CssBaseline

Material-UI提供可选的 [CssBaseline](/style/css-baseline/) 组件。 它修复了浏览器和设备之间的一些不一致性，同时为常见的HTML元素提供了更多看法的重置。

## 版本化文档

本文档始终反映Material-UI的最新稳定版本。 您可以在 [单独的页面上找到旧版本的文档](/versions/)。

## 下一步

现在您已经了解了基本设置，现在是时候了解更多信息：

- 如何提供 [Material Design字体和排版](/style/typography/)。
- 如何利用 [主题解决方案](/customization/themes/)。
- 如何 [覆盖](/customization/overrides/) 组件的外观。