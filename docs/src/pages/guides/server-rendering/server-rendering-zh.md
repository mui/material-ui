# 服务端渲染

<p class="description">服务器端呈现的最常见用例是在用户（或搜索引擎爬虫）首次请求您的应用时处理初次渲染。</p>

当服务器收到请求时，它会将所需的组件呈现为 HTML 字符串，然后将其作为响应发送给客户端。 从那时起，客户端将接管渲染的职责。

## 在服务器端的 Material-UI

Material-UI 最初设计受到了在服务器端渲染的约束，但是您可以完全负责它的正确整合。 为页面提供所需的 CSS 是至关重要的，否则页面只会渲染 HTML 而等待客户端注入 CSS，从而导致浏览器样式闪烁（FOUC）。 若想将样式注入客户端，我们需要：

1. 在每个请求上创建一个全新的 [`ServerStyleSheets`](/styles/api/#serverstylesheets) 实例。
2. 用服务端收集器渲染 React 树组件。
3. 将 CSS 单独拿出。
4. 将 CSS 传递给客户端。

在删除服务器端注入的 CSS 之前，客户端将第二次注入 CSS。

## 配置

在下面的配置中，我们将了解如何设置服务器端的渲染。

### 主题

创建一个在客户端和服务端之间共享的主题：

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

export default theme;
```

### 服务器端

下面的大纲可以大致展现一下服务器端。 我们将使用 [app.use](https://expressjs.com/en/api.html) 建立一个 [Express 中间件](https://expressjs.com/en/guide/using-middleware.html) 来处理所有进入服务器的请求。 如果您不熟悉 Express 或中间件（middleware）的概念，那么只需要知道每次服务器收到请求时都会调用 handleRender 函数就可以了。

`server.js`

```js
import express from 'express';

// 我们将在章节中填写这些需要遵守的内容。
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

当渲染时，我们将把根组件 `App` 包裹在 [`StylesProvider`](/styles/api/#stylesprovider) 和 [`ThemeProvider`](/styles/api/#themeprovider) 中，这样组件树中的所有组件都可以使用样式配置和 `theme`。

服务端渲染的关键步骤是，在将组件的初始 HTML 发送到客户端**之前**，就开始进行渲染。 我们用 [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html) 来实现此操作。

然后我们就可以使用 `sheets.toString()` 方法从`表单（sheets）`中获取 CSS。 我们将看到在 `renderFullPage` 函数中，是如何传递这些信息的。

```jsx
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // 将组件渲染成字符串。
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
    ),
  );

  // 从 sheet 中抓取 CSS。
  const css = sheets.toString();

  // 将渲染的页面发送回客户端。
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

服务端渲染的最后一步，则是将初始组件的 HTML 和 CSS 注入到客户端要渲染的模板当中。

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

客户端则是简单明了的。 我们只需要移除服务器端生成的 CSS。 让我们来看看客户端的文件：

`client.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
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

您可以在 [GitHub 存储库中](https://github.com/mui-org/material-ui)的 [`/examples`](https://github.com/mui-org/material-ui/tree/master/examples) 的文件夹下面，找到我们托管的不同的范例项目：

- [本教程的参考实现](https://github.com/mui-org/material-ui/tree/master/examples/ssr)
- [Gatsby](https://github.com/mui-org/material-ui/tree/master/examples/gatsby)
- [Next.js](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)

## 故障排除（Troubleshooting）

查看常见问题解答：[我的应用程序在服务端上不能正确渲染](/getting-started/faq/#my-app-doesnt-render-correctly-on-the-server)。