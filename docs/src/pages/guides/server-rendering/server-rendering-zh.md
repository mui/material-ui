# 服务端渲染

<p class="description">服务器端呈现的最常见用例是在用户（或搜索引擎爬虫）首次请求您的应用时处理初次渲染。</p>

当服务器收到请求时，它会将所需的组件呈现为 HTML 字符串，然后将其作为响应发送给客户端。 从那时起，客户将接管渲染的职责。

## 在服务器端的 Material-UI

Material-UI 最初设计受到了在服务器端渲染的约束，但是您可以完全负责它的正确整合。 为页面提供所需的 CSS 是至关重要的，否则页面只会渲染 HTML 而等待客户端注入 CSS, 从而导致浏览器样式闪烁（FOUC）。 若想将样式注入客户端，我们需要：

1. 在每个请求上创建一个全新的 [`ServerStyleSheets`](/styles/api/#serverstylesheets) 实例。
2. 用服务端收集器渲染 React 树组件。
3. 拉出 CSS。
4. 将CSS传递给客户端。

在删除服务器端注入的 CSS 之前，客户端将第二次注入 CSS。

## 配置

在下面的配置中，我们将了解如何设置服务器端的渲染。

### 主题

我们创建了一个能在客户端和服务器端共享的主题。

`theme.js`

```js
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// 创建一个主题的实例。
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
```

### 服务器端

下面的大纲可以大致展现一下我们的服务器端。 我们将使用 [app.use](http://expressjs.com/en/api.html) 来设置一个 [Express middleware](http://expressjs.com/en/guide/using-middleware.html) 从而处理来自我们服务器端的所有请求。 如果您对 Express 或者 middleware 不太熟悉，您只需要知道每次服务器收到了一个请求，都会调用我们的 handleRender 函数。

`server.js`

```js
import express from 'express';

// 我们将在章节中填写这些内容来遵守。
function renderFullPage(html, css) {
  /* ... */
}

function handleRender(req, res) {
  /* ... */
}

const app = express();

// 每次服务器端收到请求时都会触发此操作。
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### 处理请求

对于每次请求，我们首先需要做的是创建一个 `ServerStyleSheets`。

当渲染的时候，我们将我们的根部组件，`App`，包装在一个 [`StylesProvider`](/styles/api/#stylesprovider) 和 [`ThemeProvider`](/styles/api/#themeprovider) 中，这样组件树中的所有组件都可以使用撰写的样式设置和 `theme`。

服务器渲染的关键步骤是在我们发送到客户端**之前**渲染我们组件的初始 HTML。 我们用 [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html) 来实现此操作。

接着，我们可以使用 `sheets.toString()` 来从我们的`表单`中得到 CSS。 我们将会了解到这是如何在我们的 `renderFullPage` 函数中传递下去的。

```jsx
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './theme';

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // 将组件渲染成一个字符串。
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
    ),
  );

  // 从我们的样式表中获取 CSS。
  const css = sheets.toString();

  // 将渲染的页面送回到客户端。
  res.send(renderFullPage(html, css));
}

const app = express();

app.use('/build', express.static('build'));

// 每次服务器端收到请求时都会触发此操作。
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### 注入组件的初始 HTML 和 CSS

服务器端最后一个步骤则是在我们的组件初始 HTML 和 CSS 中注入一个模板，从而在客户端渲染。

```js
function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My page</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}
```

### 客户端

客户端则是简单明了的。 我们只需要移除服务器端生成的 CSS。 让我们来看一看我们客户端的文件：

`client.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './theme';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

ReactDOM.hydrate(<Main />, document.querySelector('#root'));
```

## 参考实现

我们托管不同的参考实现，您可以在 [`/examples`](https://github.com/mui-org/material-ui/tree/master/examples) 文件夹下的 [GitHub存储库](https://github.com/mui-org/material-ui) 找到它们：

- [本教程的参考实现](https://github.com/mui-org/material-ui/tree/master/examples/ssr)
- [Gatsby](https://github.com/mui-org/material-ui/tree/master/examples/gatsby)
- [Next.js](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)

## 故障排除（Troubleshooting）

查看我们的常见问题解答答案：[我的应用程序无法在服务器上正确地渲染](/getting-started/faq/#my-app-doesnt-render-correctly-on-the-server) 。