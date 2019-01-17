# 使用

<p class="description">立刻使用React和Material-UI。</p>

Material-UI 组件是独立工作的。 它们是**自我支持**的，并只要注入而且仅注入它们需要显示的样式。 他们不依赖任何全局的样式表, 如 [normalize.css](https://github.com/necolas/normalize.css/),

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
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Yes, this really is all you need to get started, as you can see in this live and interactive demo:

{{"demo": "pages/getting-started/usage/Usage.js", "hideHeader": true}}

## Globals

Material-UI usage experience can be improved with a handful of important globals that you’ll need to be aware of.

### Responsive meta tag

Material-UI is developed mobile first, a strategy in which we first write code for mobile devices and then scale up components as necessary using CSS media queries. To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
```

### CssBaseline

Material-UI provides an optional [CssBaseline](/style/css-baseline/) component. It's fixing some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

## Versioned Documentation

This documentation always reflects the latest stable version of Material-UI. You can find older versions of the documentation on a [separate page](/versions/).

## Next steps

Now that you have an idea of the basic setup, it's time to learn more about:

- How to provide [the Material Design font and typography](/style/typography/).
- How to take advantage of the [theming solution](/customization/themes/).
- How to [override](/customization/overrides/) the look and feel of the components.