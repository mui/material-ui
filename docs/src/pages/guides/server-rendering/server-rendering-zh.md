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

Create a theme that will be shared between the client and the server:

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

The following is the outline for what the server-side is going to look like. We are going to set up an [Express middleware](https://expressjs.com/en/guide/using-middleware.html) using [app.use](https://expressjs.com/en/api.html) to handle all requests that come in to the server. If you're unfamiliar with Express or middleware, just know that the handleRender function will be called every time the server receives a request.

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

When rendering, we will wrap `App`, the root component, inside a [`StylesProvider`](/styles/api/#stylesprovider) and [`ThemeProvider`](/styles/api/#themeprovider) to make the style configuration and the `theme` available to all components in the component tree.

The key step in server-side rendering is to render the initial HTML of the component **before** we send it to the client side. 我们用 [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html) 来实现此操作。

We then get the CSS from the `sheets` using `sheets.toString()`. We will see how this is passed along in the `renderFullPage` function.

```jsx
import express from 'express';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
    ),
  );

  // Grab the CSS from the sheets.
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

The final step on the server-side is to inject the initial component HTML and CSS into a template to be rendered on the client side.

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

客户端则是简单明了的。 我们只需要移除服务器端生成的 CSS。 Let's take a look at the client file:

`client.js`

```jsx
import * as React from 'react';
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

Check out the FAQ answer: [My App doesn't render correctly on the server](/getting-started/faq/#my-app-doesnt-render-correctly-on-the-server).