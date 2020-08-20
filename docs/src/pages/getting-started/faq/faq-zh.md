# 常见问题解答

<p class="description">您在一个特定的问题上停滞不前吗？ 您可以先在我们的常见 FAQ (问题解答) 中检索一下常见问题。</p>

如果仍然找不到所需的内容，可以参考我们的[支持页面](/getting-started/support/) 。

## Material-UI 很棒。 我该如何支持该项目？

有很多方法可以支持 Material-UI：

- **口口相传**。 通过[链接到material-ui.com来传播Material-UI ](https://material-ui.com/)在您的网站上，每个反向链接都很重要。 在[ Twitter上关注我们](https://twitter.com/MaterialUI) ，点赞并转发重要新闻。 或者只是与您的朋友谈论我们。
- **给我们反馈** 。 告诉我们我们做得好或可以改进的地方。 请投票（👍）您最想解决的问题。
- **帮助新用户** 。 您可以在 [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) 中回答问题
- **Make changes happen**. 
  - Edit the documentation. Every page has an "EDIT THIS PAGE" link in the top right.
  - 通过[创建问题](https://github.com/mui-org/material-ui/issues/new)来报告错误或缺少的功能 。
  - Review and comment on existing [pull requests](https://github.com/mui-org/material-ui/pulls) and [issues](https://github.com/mui-org/material-ui/issues).
  - 帮忙[翻译文档](https://translate.material-ui.com)
  - [Improve our documentation](https://github.com/mui-org/material-ui/tree/master/docs), fix bugs, or add features by [submitting a pull request](https://github.com/mui-org/material-ui/pulls).
- **在[OpenCollective](https://opencollective.com/material-ui)**上资助我们。 如果您在商业项目中使用了Material-UI，并希望通过成为我们的赞助商 来支持我们的持续发展，或者您一个业余项目或者爱好项目，并想成为我们的支持者， 您都可以通过OpenCollective实现。 筹集的所有资金都是透明管理的，赞助商在README和Material-UI主页上获得认可。

## 为什么我的组件在生产版本中没有正确地渲染？

The #1 reason this likely happens is due to class name conflicts once your code is in a production bundle. 如果想要 Material-UI 正常工作, 页面上所有组件的 `classname` 值必须由 [类名称生成器](/styles/advanced/#class-names) 的单个实例生成。

To correct this issue, all components on the page need to be initialized such that there is only ever **one class name generator** among them.

在很多情况下，您可能最终会意外地使用两个类名生成器：

- 比如你一不小心 **打包**了 两个版本的 Material-UI。 你可能错误地将一个依赖和 material-ui 设置为同版本依赖了。
- You are using `StylesProvider` for a **subset** of your React tree.
- 您正在使用打包的代码分割功能，这会生成多个 class 名字

> 如果你正使用带有[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) 的webpack，请尝试在[`优化项(optimizations)`下配置 `runtimeChunk`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk) 。

Overall, it's simple to recover from this problem by wrapping each Material-UI application with [`StylesProvider`](/styles/api/#stylesprovider) components at the top of their component trees **and using a single class name generator shared among them**.

## 为什么当打开Modal（模态框）时，fixed positioned（位置固定的）元素会移动？

当Modal（模态框）打开时，滚动会被禁止。 This prevents interacting with the background when the modal should be the only interactive content. However, removing the scrollbar can make your **fixed positioned elements** move. 在这种情况下，您可以应用全局`.mui-fixed`类名称来告知 Material-UI 来处理这些元素。

## 如何在全局禁用 ripple effect（涟漪效果）？

涟漪效果完全来自` BaseButton `零件。 您可以通过在您的主题中提供以下内容，来全局地禁用涟漪效果：

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

Material-UI uses the same theme helper for creating all its transitions. Therefore you can disable all transitions by overriding the helper in your theme:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // 这样就得到了全局的 `transition: none;`
    create: () => 'none',
  },
});
```

It can be useful to disable transitions during visual testing or to improve performance on low-end devices.

You can go one step further by disabling all transitions and animations effects:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
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
});
```

Notice that the usage of `CssBaseline` is required for the above approach to work. If you choose not to use it, you can still disable transitions and animations by including these CSS rules:

```css
*, *::before, *::after {
  transition: 'none !important';
  animation: 'none !important';
}
```

## 我是否必须使用 JSS 给 app 来设置样式呢？

No, it's not required. But this dependency comes built in, so carries no additional bundle size overhead.

Perhaps, however, you're adding some Material-UI components to an app that already uses another styling solution, or are already familiar with a different API, and don't want to learn a new one? 在这种情况下，请转到[Style Library Interoperability（样式库互用）](/guides/interoperability/) 部分，在哪里你可以找到我们提供的用其他样式库来替换 Material-UI 组件样式的简单方法。

## When should I use inline-style vs CSS?

根据经验，仅对动态样式属性使用内联样式。 CSS 替代方案也有更多优势，例如：

- 自动前缀
- 更好地调试
- 媒体查询
- keyframes

## 如何使用 react-router？

We detail the [integration with third-party routing libraries](/guides/composition/#routing-libraries) like react-router, Gatsby or Next.js in our guide.

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

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and make your application bigger without a good reason.

### Possible reasons

There are several common reasons for this to happen:

- You have another `@material-ui/styles` library somewhere in your dependencies.
- You have a monorepo structure for your project (e.g, lerna, yarn workspaces) and `@material-ui/styles` module is a dependency in more than one package (this one is more or less the same as the previous one).
- You have several applications that are using `@material-ui/styles` running on the same page (e.g., several entry points in webpack are loaded on the same page).

### Duplicated module in node_modules

If you think that the issue may be in the duplication of the @material-ui/styles module somewhere in your dependencies, there are several ways to check this. You can use `npm ls @material-ui/styles`, `yarn list @material-ui/styles` or `find -L ./node_modules | grep /@material-ui/styles/package.json` commands in your application folder.

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

One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file. Try running the bootstrap option with the --hoist flag.

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

## 我的应用程序在服务器上没有正确渲染

If it doesn't work, in 99% of cases it's a configuration issue. A missing property, a wrong call order, or a missing component – server-side rendering is strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup. Check out the [reference implementations](/guides/server-rendering/#reference-implementations), bit by bit.

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

The class names value relies on the concept of [class name generator](/styles/advanced/#class-names). The whole page needs to be rendered with **a single generator**. This generator needs to behave identically on the server and on the client. 就像这样：

- You need to provide a new class name generator for each request. But you shouldn't share a `createGenerateClassName()` between different requests:

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

- You need to verify that your client and server are running the **exactly the same version** of Material-UI. It is possible that a mismatch of even minor versions can cause styling problems. 要检查版本号，请在构建应用程序的环境中以及部署环境中运行 `npm list @material-ui/core`。
  
    You can also ensure the same version in different environments by specifying a specific MUI version in the dependencies of your package.json.

*修复示例 (package.json）：*

```diff
  "dependencies": {
    ...

-   "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
  },
```

- You need to make sure that the server and the client share the same `process.env.NODE_ENV` value.

## 为什么我的应用程序看到的颜色和文档里的颜色大相径庭？

文档网站使用了一个自定义的主题。 因此，调色板和 Material-UI 传播的默认的主题是截然不同的。 请参考[这页](/customization/theming/) 来了解自定义主题。

## 为什么组件X 需要一个 DOM 节点，而不是 ref 对象？

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

With this simple heuristic `Portal` might re-render after it mounts because refs are up-to-date before any effects run. However, just because a ref is up-to-date doesn't mean it points to a defined instance. If the ref is attached to a ref forwarding component it is not clear when the DOM node will be available. In the example above, the `Portal` would run an effect once, but might not re-render because `ref.current` is still `null`. This is especially apparent for React.lazy components in Suspense. The above implementation could also not account for a change in the DOM node.

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

## clsx 依赖什么？

[clsx](https://github.com/lukeed/clsx) is a tiny utility for constructing `className` strings conditionally, out of an object with keys being the class strings, and values being booleans.

Instead of writing:

```jsx
// let disabled = false, selected = true;

return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${selected ? 'Mui-selected' : ''}`}
  />
);
```

你可以这样做：

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