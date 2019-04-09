# 为什么要服务端渲染？

<p class="description">服务器端呈现的最常见用例是在用户（或搜索引擎爬虫）首次请求您的应用时处理初始呈现。</p>

当服务器收到请求时，它会将所需的组件呈现为HTML字符串，然后将其作为响应发送给客户端。 从那时起，客户接管渲染职责。

## Material-UI on the server

Material-UI was designed from the ground-up with the constraint of rendering on the server, but it's up to you to make sure it's correctly integrated. It's important to provide the page with the required CSS, otherwise the page will render with just the HTML then wait for the CSS to be injected by the client, causing it to flicker (FOUC). 要将样式注入客户端，我们需要：

1. Create a fresh, new [`ServerStyleSheets`](/css-in-js/api/#serverstylesheets) instance on every request.
2. Render the React tree with the server-side collector.
3. Pull the CSS out.
4. 将CSS传递给客户端。

在客户端，在删除服务器端注入的CSS之前，将第二次注入CSS。

## 配置

在下面的配方中，我们将了解如何设置服务器端呈现。

### The server-side

以下是我们的服务器端将会是什么样子的大纲。 我们将使用 [app.use](http://expressjs.com/en/api.html) 设置一个 [Express中间件](http://expressjs.com/en/guide/using-middleware.html) 来处理进入我们服务器的所有请求。 如果您不熟悉Express或中间件，只需知道每次服务器收到请求时都会调用我们的handleRender函数。

`server.js`

```js
import express from 'express';
import React from 'react';
import App from './App';

// 我们将在接下来的章节中填写这些内容。
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

The first thing that we need to do on every request is create a new `ServerStyleSheets`.

When rendering, we will wrap `App`, our root component, inside a [`StylesProvider`](/css-in-js/api/#stylesprovider) and [`ThemeProvider`](/css-in-js/api/#themeprovider) to make the style configuration and the `theme` available to all components in the component tree.

在服务器端渲染的关键步骤是为了使我们的组件的初始HTML **前** 我们把它发送给客户端。 为此，我们使用 [ReactDOMServer.renderToString（）](https://reactjs.org/docs/react-dom-server.html)。

We then get the CSS from our `sheets` using `sheets.toString()`. 我们将在 `renderFullPage` 函数中看到它是如何传递的。

```jsx
import ReactDOMServer from 'react-dom/server';
import { createMuiTheme } from '@material-ui/core/styles';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

// Create a theme object.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
  },
});

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

  // Grab the CSS from our sheets.
  const css = sheets.toString();

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css));
}
```

### 注入初始组件HTML和CSS

服务器端的最后一步是将我们的初始组件HTML和CSS注入到要在客户端呈现的模板中。

```js
function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
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

客户端很简单。 我们需要做的就是删除服务器端生成的CSS。 我们来看看我们的客户端文件：

`client.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import App from './App';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return <App />;
}

// Create a theme object.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
  },
});

ReactDOM.hydrate(
  <ThemeProvider theme={theme}>
    <Main />
  </ThemeProvider>,
  document.querySelector('#root'),
);
```

## 参考实现

我们托管不同的参考实现，您可以在 [`/examples`](https://github.com/mui-org/material-ui/tree/next/examples) 文件夹下的 [GitHub存储库](https://github.com/mui-org/material-ui) 找到它们：

- [本教程的参考实现](https://github.com/mui-org/material-ui/tree/next/examples/ssr-next)
- [Gatsby](https://github.com/mui-org/material-ui/tree/next/examples/gatsby-next)
- [Next.js](https://github.com/mui-org/material-ui/tree/next/examples/nextjs-next)

## 故障排除

如果它不起作用，在99％的情况下，这是一个配置问题。 缺少的属性，错误的调用顺序或缺少的组件。 我们对配置非常严格，找出错误的最佳方法是将项目与已经正常工作的设置进行比较，一点一点地查看我们的 [参考实现](#reference-implementations)。

### CSS仅在首次加载时起作用然后丢失

CSS仅在页面的第一次加载时生成。 然后，服务器上缺少连续请求的CSS。

#### 要采取的行动

我们依赖缓存（工作表管理器），每个组件类型 只注入一次CSS（如果你使用两个按钮，你只需要一次按钮的CSS）。 You need to create **a new `sheets` for each request**.

*example of fix:*

```diff
-// Create a sheets instance.
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Create a sheets instance.
+ const sheets = new ServerStyleSheets();

  //…

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
```

### 反应类名称水合不匹配

There is a class name mismatch between the client and the server. It might work for the first request. Another symptom is that the styling changes between initial page load and the downloading of the client scripts.

#### 要采取的行动

The class names value relies on the concept of [class name generator](/css-in-js/advanced/#class-names). The whole page needs to be rendered with **a single generator**. This generator needs to behave identically on the server and on the client. 例如：

- 您需要为每个请求提供一个新的类名生成器。 但是您可以在不同的请求之间共享 `createGenerateClassName()`：

*example of fix:*

```diff
-  //创建一个新的类名生成器。
-const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // 创建一个新的类名生成器。
+ const generateClassName = createGenerateClassName();

  //…

  // 将组件渲染为字符串。
  const html = ReactDOMServer.renderToString(
```

- 您需要验证您的客户端和服务器是否正在运行 **与Material-UI完全相同的版本**。 即使是次要版本的不匹配也可能导致样式问题。 要检查版本号，请在构建应用程序的环境中以及部署环境中运行 `npm list @material-ui/core`。
    
    您还可以通过在package.json的依赖项中指定特定的MUI版本来确保不同环境中的相同版本。

*修复示例 (package.json）：*

```diff
  "dependencies": {
    ...

-   "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
  },
```

- 您需要确保服务器和客户端共享相同的 `process.env.NODE_ENV` 值。