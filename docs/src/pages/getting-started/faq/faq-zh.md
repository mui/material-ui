# 常见问题解答

<p class="description">您在一个特定的问题上停滞不前吗？ Check some of these common gotchas first in the FAQ.</p>

当遇到一些无法解决的问题，您可以在[Spectrum](https://spectrum.chat/material-ui)社区中进行提问。 对于如何提问，和其他并非功能性问题的，请使用[StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) 提问，请不要使用 Github 的 issues板块。 在 StackOverflow 里面有一个 ` material-ui `的标签， 您可以用它来标记你的问题。

## 为什么我的组件在生产版本中没有正确地渲染？

这样一个n°1问题很可能是当你的代码在生产模式下 bundle （打包）后，有一些class name（类名称）会产生冲突。 如果想要 Material-UI 正常工作, 页面上所有组件的 `classname` 值必须由 [类名称生成器](/styles/advanced/#class-names) 的单个实例生成。

若要更正此问题, 需要初始化页面上的所有组件, 以便它们之间只有 **1个类名称生成器 **。

在很多情况下，您可能最终会意外地使用两个类名生成器：

- 比如你一不小心 **打包**了 两个版本的 Material-UI。 你可能错误地将一个依赖和 material-ui 设置为同版本依赖了。
- 对于你的React Tree（React树控件）而言，你在使用`StylesProvider`构建**subset（分支）**。
- 您正在使用打包的代码分割功能，这会生成多个 class 名字

> 如果你正使用带有[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) 的webpack，请尝试在[`优化项(optimizations)`下配置 `runtimeChunk`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk) 。

总的来说，通过在其组件树顶部的[`StylesProvider`](/styles/api/#stylesprovider)来包装每个 Material-UI 应用程序，**并且在他们之间使用单个类名称生成器**，能够简单地解决这个问题。

## 为什么当打开Modal（模态框）时，fixed positioned（位置固定的）元素会移动？

Scroll is blocked as soon as a modal is opened. 而模态框是应该是唯一的交互式内容时，这可以防止与背景交互，但是，删除滚动条可以恢复**fixed positioned(固定位置的)元素**的移动。 在这种情况下，您可以应用全局`.mui-fixed`类名称来告知 Material-UI 来处理这些元素。

## 如何在全局禁用 ripple effect（涟漪效果）？

涟漪效应完全来自` BaseButton `零件。 您可以通过在您的主题中提供以下内容，来全局地禁用涟漪效果：

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
```

## 如何禁用全局transition

您可以通过在主题中提供以下内容来禁用全局动画：

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // 这样就得到了全局的 `transition: none;`
    create: () => 'none',
  },
});
```

有时您会在某些情况下才使用这种行为，例如在测试期间或者在一些低端设备上，在这些情况下，您可以动态地更改主题的值。

你可以更进一步，禁用所有的 transition，animations 和 ripple effect::

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
  overrides: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      // Name of the rule
      '@global': {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application!
    },
  },
});
```

## 我是否必须使用 JSS 给 app 来设置样式呢？

No, it's not required. But this dependenency comes built in, so carries no additional bundle size overhead.

然而，您可能已经在你的应用程序上添加了一些使用其他样式的Material-UI组件，或者已经熟悉了一个完全不同的API而不想学习新的？ 在这种情况下，请转到[Style Library Interoperability（样式库互用）](/guides/interoperability/) 部分，在哪里你可以找到我们提供的用其他样式库来替换 Material-UI 组件样式的简单方法。

## When should I use inline-style vs CSS?

根据经验，仅对动态样式属性使用内联样式。 CSS 替代方案也有更多优势，例如：

- 自动前缀
- 更好的调试
- media queries（媒体查询）
- keyframes

## 如何使用 react-router？

How to use a [third-party routing library](/components/buttons/#third-party-routing-library) is documented with the `ButtonBase` component. A lot of the interactive components use it internally: `Link`, `Button`, `MenuItem`, `<ListItem button />`, `Tab`, etc. 您可以使用相同的解决方案。

## 如何访问 DOM 元素？

All Material-UI components that should render something in the DOM forward their ref to the underlying DOM component. This means that you can get DOM elements by reading the ref attached to Material-UI components:

```jsx
// or a ref setter function
const ref = React.createRef();
// render
<Button ref={ref} />;
// usage
const element = ref.current;
```

If you're not sure if the Material-UI component in question forwards its ref you can check the API documentation under "Props" e.g. the [Button API](/api/button/#props) includes

> The ref is forwarded to the root element.

indicating that you can access the DOM element with a ref.

## I have several instances of styles on the page

If you are seeing a warning message in the console like the one below, you probably have several instances of `@material-ui/styles` initialized on the page.

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and makes your application bigger without a good reason.

### Possible reasons

There are several common reasons for this to happen:

- You have another `@material-ui/styles` library somewhere in your dependencies.
- You have a monorepo structure for your project (e.g, lerna, yarn workspaces) and `@material-ui/styles` module is a dependency in more than one package (this one is more or less the same as the previous one).
- You have several applications that are using `@material-ui/styles` running on the same page (e.g., several entry points in webpack are loaded on the same page).

### Duplicated module in node_modules

If you think that the issue is in duplicated @material-ui/styles module somewhere in your dependencies, there are several ways to check this. You can use `npm ls @material-ui/styles`, `yarn list @material-ui/styles` or `find -L ./node_modules | grep /@material-ui/styles/package.json` commands in your application folder.

If none of these commands identified the duplication, try analyzing your bundle for multiple instances of @material-ui/styles. You can just check your bundle source, or use a tool like [source-map-explorer](https://github.com/danvk/source-map-explorer) or [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

If you identified that duplication is the issue that you are encountering there are several things you can try to solve it:

If you are using npm you can try running `npm dedupe`. This command searches the local dependencies and tries to simplify the structure by moving common dependencies further up the tree.

If you are using webpack, you can change the way it will [resolve](https://webpack.js.org/configuration/resolve/#resolve-modules) the @material-ui/styles module. You can overwrite the default order in which webpack will look for your dependencies and make your application node_modules more prioritized than default node module resolution order:

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Usage with Lerna

One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages, is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file. Try running the bootstrap option with the --hoist flag.

```sh
lerna bootstrap --hoist
```

Alternatively, you can remove @material-ui/styles from your package.json file and hoist it manually to your top-level package.json file.

Example of a package.json file in a Lerna root folder

```json
{
  "name": "my-monorepo",
  "devDependencies": {
    "lerna": "latest"
  },
  "dependencies": {
    "@material-ui/styles": "^4.0.0"
  },
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "start": "lerna run start",
    "build": "lerna run build"
  }
}
```

### Running multiple applications on one page

If you have several applications running on one page, consider using one @material-ui/styles module for all of them. If you are using webpack, you can use [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) to create an explicit [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), that will contain the @material-ui/styles module:

```diff
  module.exports = {
    entry: {
+     vendor: ["@material-ui/styles"],
      app1: "./src/app.1.js",
      app2: "./src/app.2.js",
    },
    plugins: [
+     new webpack.optimize.CommonsChunkPlugin({
+       name: "vendor",
+       minChunks: Infinity,
+     }),
    ]
  }
```

## My App doesn't render correctly on the server

If it doesn't work, in 99% of cases it's a configuration issue. A missing property, a wrong call order, or a missing component. Server side rendering is strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup, check out the [reference implementations](/guides/server-rendering/#reference-implementations), bit by bit.

### CSS works only on first load then is missing

The CSS is only generated on the first load of the page. Then, the CSS is missing on the server for consecutive requests.

#### 要采取的行动

The styling solution relies on a cache, the *sheets manager*, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). You need to create **a new `sheets` instance for each request**.

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

### React class name hydration mismatch

There is a class name mismatch between the client and the server. It might work for the first request. Another symptom is that the styling changes between initial page load and the downloading of the client scripts.

#### 要采取的行动

The class names value relies on the concept of [class name generator](/styles/advanced/#class-names). The whole page needs to be rendered with **a single generator**. This generator needs to behave identically on the server and on the client. 例如：

- 您需要为每个请求提供一个新的类名生成器。 But you shouldn't share a `createGenerateClassName()` between different requests:

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

## 为什么我的应用程序看到的颜色和文档里的颜色大相径庭？

文档网站使用了一个自定义的主题。 因此，调色板和 Material-UI 传播的默认的主题是截然不同的。 Please refer to [this page](/customization/theming/) to learn about theme customization.

## Material-UI 很棒。 我该如何支持该项目？

有很多方法可以支持 Material-UI：

- 帮助改进[这篇文档](https://github.com/mui-org/material-ui/tree/master/docs).
- 帮助他人开始使用。
- [口口相传](https://twitter.com/MaterialUI)。
- 回答[ StackOverflow上的问题](https://stackoverflow.com/questions/tagged/material-ui)或[ Spectrum ](https://spectrum.chat/material-ui) 。

如果您在商业项目中使用了Material-UI，并希望通过成为我们的**赞助商</0 >来支持我们的持续发展，或者您一个业余项目或者爱好项目，并想成为我们的支持者， 您都可以通过[OpenCollective](https://opencollective.com/material-ui)实现。</p> 

我们队所有筹集的资金都是透明化管理的，而赞助商在 README 和 Material-UI 主页上都会获得认可。

## Why does component X require a DOM node in a prop instead of a ref object?

Components like the [Portal](/api/portal/#props) or [Popper](/api/popper/#props) require a DOM node in the `container` or `anchorEl` prop respectively. It seems convenient to simply pass a ref object in those props and let Material-UI access the current value. This works in a simple scenario:

```jsx
function App() {
  const container = React.useRef(null);

  return (
    <div className="App">
      <Portal container={container}>
        <span>portaled children</span>
      </Portal>
      <div ref={container} />
    </div>
  );
}
```

where `Portal` would only mount the children into the container when `container.current` is available. Here is a naive implementation of Portal:

```jsx
function Portal({ children, container }) {
  const [node, setNode] = React.useState(null);

  React.useEffect(() => {
    setNode(container.current);
  }, [container]);

  if (node === null) {
    return null;
  }
  return ReactDOM.createPortal(children, node);
}
```

With this simple heuristic `Portal` might re-render after it mounts because refs are up-to-date before any effects run. However, just because a ref is up-to-date doesn't mean it points to a defined instance. If the ref is attached to a ref forwarding component it is not clear when the DOM node will be available. In the above example the `Portal` would run run an effect once but might not re-render because `ref.current` is still `null`. This is especially apparent for React.lazy components in Suspense. The above implementation could also not account for a change in the DOM node.

This is why we require a prop with the actual DOM node so that React can take care of determining when the `Portal` should re-render:

```jsx
function App() {
  const [container, setContainer] = React.useState(null);
  const handleRef = React.useCallback(instance => setContainer(instance), [setContainer])

  return (
    <div className="App">
      <Portal container={container}>
        <span>Portaled</span>
      </Portal>
      <div ref={handleRef} />
    </div>
  );
}
```

## What's the clsx dependency for?

[clsx](https://github.com/lukeed/clsx) is a tiny utility for constructing `className` strings conditionally.

Instead of writing:

```jsx
return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${selected ? 'Mui-selected' : ''}`}
  />
);
```

you can do:

```jsx
import clsx from 'clsx';

return (
  <div
    className={clsx('MuiButton-root', {
      'Mui-disabled': disabled,
      'Mui-selected': selected,
    })}
  />
);
```