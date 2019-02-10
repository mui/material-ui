# 为什么要服务端渲染？

<p class="description">服务器端呈现的最常见用例是在用户（或搜索引擎爬虫）首次请求您的应用时处理初始呈现。</p>

当服务器收到请求时，它会将所需的组件呈现为HTML字符串，然后将其作为响应发送给客户端。 从那时起，客户接管渲染职责。

## 服务器上的Material-UI

Material-UI是从头开始设计的，具有在服务器上呈现的约束，但是由您决定是否正确集成。 为页面提供所需的CSS非常重要，否则页面将仅使用HTML呈现，然后等待客户端注入CSS，从而导致其闪烁。 要将样式注入客户端，我们需要：

1. 在每个请求上创建一个全新的 `sheetRegistry` 和 `theme` 实例。
2. 使用服务器端API和实例呈现React树。
3. 将CSS从 `sheetRegistry`拉出来。
4. 将CSS传递给客户端。

在客户端，在删除服务器端注入的CSS之前，将第二次注入CSS。

## 配置

在下面的配方中，我们将了解如何设置服务器端呈现。

### 服务器端

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

我们需要对每个请求做的第一件事就是创建一个新的 `sheetRegistry` 和 `theme` 实例。

渲染时，我们将在 `JssProvider` 和 [`MuiThemeProvider`](/api/mui-theme-provider/) 包含 `App`，我们的根组件 以使 `sheetRegistry` 和 `主题` 可用于组件树中的所有组件。

在服务器端渲染的关键步骤是为了使我们的组件的初始HTML **前** 我们把它发送给客户端。 为此，我们使用 [ReactDOMServer.renderToString（）](https://reactjs.org/docs/react-dom-server.html)。

然后我们使用 `sheetRegistry.toString（）`从我们的 `sheetRegistry` 获取CSS。 我们将在 `renderFullPage` 函数中看到它是如何传递的。

```jsx
import ReactDOMServer from 'react-dom/server'
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

function handleRender(req, res) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <App />
      </MuiThemeProvider>
    </JssProvider>
  )

  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString()

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css))
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
        <title>Material-UI</title>
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
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import App from './App';

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />
  }
}

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light',
  },
});

// Create a new class name generator.
const generateClassName = createGenerateClassName();

ReactDOM.hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </JssProvider>,
  document.querySelector('#root'),
);
```

## 参考实现

我们托管不同的参考实现，您可以在 [`/examples`](https://github.com/mui-org/material-ui/tree/next/examples) 文件夹下的 [GitHub存储库](https://github.com/mui-org/material-ui) 找到它们：

- [本教程的参考实现](https://github.com/mui-org/material-ui/tree/next/examples/ssr)
- [Next.js](https://github.com/mui-org/material-ui/tree/next/examples/nextjs)
- [Gatsby](https://github.com/mui-org/material-ui/tree/next/examples/gatsby)

## 故障排除

如果它不起作用，在99％的情况下，这是一个配置问题。 缺少的属性，错误的调用顺序或缺少的组件。 我们对配置非常严格，找出错误的最佳方法是将项目与已经正常工作的设置进行比较，一点一点地查看我们的 [参考实现](#reference-implementations)。

### CSS仅在首次加载时起作用然后丢失

CSS仅在页面的第一次加载时生成。 然后，服务器上缺少连续请求的CSS。

#### 要采取的行动

我们依赖缓存（工作表管理器），每个组件类型 只注入一次CSS（如果你使用两个按钮，你只需要一次按钮的CSS）。 您需要为每个请求**提供 **个新的 `sheetsManager`。

您可以了解更多关于 [的文档中的张经理概念](/customization/css-in-js/#sheets-manager)。

*修复示例：*

```diff
-// Create a sheetsManager instance.
-const sheetsManager = new Map();

function handleRender(req, res) {

+ // Create a sheetsManager instance.
+ const sheetsManager = new Map();

  //…

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
```

### 反应类名称水合不匹配

客户端和服务器之间存在类名不匹配。 它可能适用于第一个请求。 另一个症状是样式在初始页面加载和客户端脚本下载之间发生变化。

#### 要采取的行动

类名值依赖于 [类名生成器](/customization/css-in-js/#creategenerateclassname-options-class-name-generator)的概念。 整个页面需要使用 **个单个生成器**进行渲染。 此生成器需要在服务器和客户端上具有相同的行为。 例如：

- 您需要为每个请求提供一个新的类名生成器。 但是您可以在不同的请求之间共享 `createGenerateClassName()`：

*修复示例：*

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

-   "@material-ui/core": "^1.4.2",
+   "@material-ui/core": "1.4.3",
    ...
  },
```

- 您需要确保服务器和客户端共享相同的 `process.env.NODE_ENV` 值。
- react-jss依赖版本应该与^ 8.0.0语义版本匹配。