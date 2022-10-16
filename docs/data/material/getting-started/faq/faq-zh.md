# 常见问题解答

<p class="description">您在一个特定的问题上停滞不前吗？ 您可以先在常见 FAQ（问题解答）中检索一下常见问题。</p>

If you still can't find what you're looking for, you can refer to our [support page](/material-ui/getting-started/support/).

## MUI is awesome. 我该如何支持该项目？ How can I support the project?

其实有很多方法可以支持 Material-UI：

- **口口相传**。 Evangelize MUI by [linking to mui.com](https://mui.com/) on your website, every backlink matters. 在 [Twitter 上关注我们](https://twitter.com/MaterialUI) ，点赞并转发一些重要的新闻。 Follow us on [Twitter](https://twitter.com/MUI_hq), like and retweet the important news. 或者只是与您的朋友谈论我们。
- **给我们反馈** 。 告诉我们一些做得好的地方或者可以改进的地方。 请给您最希望看到能够解决的问题投票（👍）。
- **帮助新用户** 。 You can answer questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/mui).
- **做出一些改变吧**。
  - 编辑文档。 每个页面右上角都有一个“编辑此页面”的链接。
  - 通过 [创建一个问题](https://github.com/mui/material-ui/issues/new) 来报告错误或缺少的功能 。
  - 查看和评论一些现有的 [pull requests](https://github.com/mui/material-ui/pulls) 和 [issues](https://github.com/mui/material-ui/issues)。
  - 帮助我们 [翻译](https://translate.mui.com) 文档。
  - [Improve our documentation](https://github.com/mui/material-ui/tree/HEAD/docs), fix bugs, or add features by [submitting a pull request](https://github.com/mui/material-ui/pulls).
- **Support us financially on [OpenCollective](https://opencollective.com/mui)**. 如果您在商业项目中使用了 Material-UI，并希望通过成为我们的赞助商来支持我们的持续发展，或者在一个业余的或者爱好的项目中使用了，并想成为我们的一个支持者， 您都可以通过 OpenCollective 来资助我们。 If you use MUI in a commercial project and would like to support its continued development by becoming a Sponsor, or in a side or hobby project and would like to become a Backer, you can do so through OpenCollective. 筹集的所有资金都是透明管理的，赞助商在 README 和 Material-UI 主页上都会获得认可。

## 为什么我的组件在生产构造中没有正确地渲染？

当模态框打开的那一刹那，滚动行为就会被禁止。 这样就能够阻止用户与下层背景内容进行交互，而模态框应该是唯一的交互内容。 然而，移除滚动条会移动一些**固定位置的元素**。 在这种情况下，您可以应用全局 `.mui-fixed` 类名来告知 Material-UI 去处理这些元素。

## 为什么当打开一个 Modal（模态框）时，位置固定的元素会移动？

涟漪效果完全来自 `BaseButton` 组件。 您可以通过在您的主题中提供以下内容，来全局地禁用涟漪效果：

```js
import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});
```

## 如何在全局禁用 ripple effect（涟漪效果）？

Material-UI 使用相同的主题助手来创建其所有的过渡动画。 因此，您可以通过覆盖主题助手来禁用所有的过渡：

```js
import { createTheme } from '@mui/material';

const theme = createTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
});
```

总的来说，您只需要在每个 Material-UI 应用程序的组件树顶部使用 [`StylesProvider`](/styles/api/#stylesprovider) 组件进行包装，**并在它们之间共享一个单一的类名生成器**，就可以很容易地解决这个问题。

您可以更进一步地禁用所有的过渡和动画效果。

```js
import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
});
```

请注意，若想使用上述方法，您必须使用 `CssBaseline` 使其奏效。 如果您选择不使用它，您仍然可以通过加入这些 CSS 规则来禁用过渡和动画：

```css
*,
*::before,
*::after {
  transition: 'none !important';
  animation: 'none !important';
}
```

## Do I have to use Emotion to style my app?

不用的，JSS 不是一个必须选择。 But if you are using the default styled engine (`@mui/styled-engine`) the Emotion dependency comes built in, so carries no additional bundle size overhead.

然而，也许您正在给应用程序添加一些 Material-UI 组件，而应用程序以及使用了其他的样式解决方案，或者您已经熟悉了不同的 API，而不想学习一个新的 API？ In that case, head over to the [Style library interoperability](/material-ui/guides/interoperability/) section, where we show how simple it is to restyle MUI components with alternative style libraries.

## 我是否必须使用 JSS 给我的应用程序来设置样式呢？

根据经验，仅对动态样式属性使用内联样式。 CSS 的替代方案也有诸多优势，例如：

- auto-prefixing
- 对于你的 React 树控件而言，你在使用 `JssProvider` 构建一个 **subject（分支）**。
- 您正在使用打包根据，而它拆分代码的方式导致创建了多个类名生成器的实例。
- keyframes

## 我应该何时使用内联样式与 CSS？

We detail the [integration with third-party routing libraries](/material-ui/guides/routing/) like react-router, Gatsby or Next.js in our guide.

## 我应该怎么使用 react-router？

所有应该在 DOM 中渲染内容的 Material-UI 组件都会都将其 ref 转发给底层的 DOM 组件。 这意味着您可以通过读取附加在 Material-UI 组件上的 ref 来获取 DOM 元素。

```jsx
// 或者使用一个 ref setter 函数
const ref = React.createRef();
// 渲染
<Button ref={ref} />;
// 使用
const element = ref.current;
```

If you're not sure if the MUI component in question forwards its ref you can check the API documentation under "Props" e.g. the [Button API](/material-ui/api/button/#props) includes

:::info
The ref is forwarded to the root element.
:::

indicating that you can access the DOM element with a ref.

## 我应该怎么访问 DOM 元素？

If you are seeing a warning message in the console like the one below, you probably have several instances of `@mui/styles` initialized on the page.

:::warning
It looks like there are several instances of `@mui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and make your application bigger without a good reason.
:::

### 可能的原因

There are several common reasons for this to happen:

- 自动前缀
- 更好地调试
- 媒体查询

### 在 node_modules 中重复的模块

If you think that the issue may be in the duplication of the @mui/styles module somewhere in your dependencies, there are several ways to check this. You can use `npm ls @mui/styles`, `yarn list @mui/styles` or `find -L ./node_modules | grep /@mui/styles/package.json` commands in your application folder.

If none of these commands identified the duplication, try analyzing your bundle for multiple instances of @mui/styles. You can just check your bundle source, or use a tool like [source-map-explorer](https://github.com/danvk/source-map-explorer) or [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

If you identified that duplication is the issue that you are encountering there are several things you can try to solve it:

If you are using npm you can try running `npm dedupe`. This command searches the local dependencies and tries to simplify the structure by moving common dependencies further up the tree.

If you are using webpack, you can change the way it will [resolve](https://webpack.js.org/configuration/resolve/#resolve-modules) the @mui/styles module. You can overwrite the default order in which webpack will look for your dependencies and make your application node_modules more prioritized than default node module resolution order:

```diff
  resolve: {
+   alias: {
+     "@mui/styles": path.resolve(appFolder, "node_modules", "@mui/styles"),
+   }
  }
```

### 与 Lerna 一起使用

One possible fix to get @mui/styles to run in a Lerna monorepo across packages is to [hoist](https://github.com/lerna/lerna/blob/HEAD/doc/hoist.md) shared dependencies to the root of your monorepo file. Try running the bootstrap option with the --hoist flag.

```sh
lerna bootstrap --hoist
```

Alternatively, you can remove @mui/styles from your package.json file and hoist it manually to your top-level package.json file.

Example of a package.json file in a Lerna root folder

```json
{
  "name": "my-monorepo",
  "devDependencies": {
    "lerna": "latest"
  },
  "dependencies": {
    "@mui/styles": "^4.0.0"
  },
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "start": "lerna run start",
    "build": "lerna run build"
  }
}
```

### 在一个页面上运行多个应用程序

If you have several applications running on one page, consider using one @mui/styles module for all of them. If you are using webpack, you can use [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) to create an explicit [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), that will contain the @mui/styles module:

```diff
  module.exports = {
    entry: {
+     vendor: ["@mui/styles"],
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

## 我的页面上有多个样式实例。

If it doesn't work, in 99% of cases it's a configuration issue. A missing property, a wrong call order, or a missing component – server-side rendering is strict about configuration.

The best way to find out what's wrong is to compare your project to an **already working setup**. Check out the [reference implementations](/material-ui/guides/server-rendering/#reference-implementations), bit by bit.

## 我的应用没有在服务器上正确的渲染。

The documentation site is using a custom theme. Hence, the color palette is different from the default theme that MUI ships. Please refer to [this page](/material-ui/customization/theming/) to learn about theme customization.

## 为什么我看到的颜色和文档这里的颜色大相径庭？

Components like the [Portal](/base/api/portal/#props) or [Popper](/material-ui/api/popper/#props) require a DOM node in the `container` or `anchorEl` prop respectively. It seems convenient to simply pass a ref object in those props and let MUI access the current value. This works in a simple scenario:

```jsx
function App() {
  const container = React.useRef(null);

  return (
    <div className="App">
      <Portal container={container}>
        <span>传送门的子组件</span>
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
  const handleRef = React.useCallback(
    (instance) => setContainer(instance),
    [setContainer],
  );

  return (
    <div className="App">
      <Portal container={container}>
        <span>传送的子组件</span>
      </Portal>
      <div ref={handleRef} />
    </div>
  );
}
```

## 为什么组件 X 需要属性中的 DOM 节点而不是一个 ref 对象？

[clsx](https://github.com/lukeed/clsx) is a tiny utility for constructing `className` strings conditionally, out of an object with keys being the class strings, and values being booleans.

Instead of writing:

```jsx
// let disabled = false, selected = true;

return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${
      selected ? 'Mui-selected' : ''
    }`}
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

## I cannot use components as selectors in the styled() utility. What should I do?

If you are getting the error: `TypeError: Cannot convert a Symbol value to a string`, take a look at the [styled()](/system/styled/#how-to-use-components-selector-api) docs page for instructions on how you can fix this.

## I cannot use components as selectors in the styled() utility. What should I do?

The #1 reason this happens is likely due to class name conflicts once your code is in a production bundle. For MUI to work, the `className` values of all components on a page must be generated by a single instance of the [class name generator](/system/styles/advanced/#class-names).

To correct this issue, all components on the page need to be initialized such that there is only ever **one class name generator** among them.

You could end up accidentally using two class name generators in a variety of scenarios:

- 比如你一不小心 **打包**了 两个版本的 Material-UI。 您没有正确设置某个和 material-ui 的同等依赖的依赖包。
- 您的项目是 monorepo 结构（例如，lerna，yarn workspaces），并且有多个包依赖着 `@mui/styles` 模块（这与前一个包或多或少相同）。
- 您有几个使用 `@mui/styles` 的应用程序在同一页面上运行（例如，webpack 中的几个入口点被加载在同一页面上）。

:::info
💡 If you are using webpack with the [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/), try configuring the [`runtimeChunk` setting under `optimizations`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).
:::

Overall, it's simple to recover from this problem by wrapping each MUI application with [`StylesProvider`](/system/styles/api/#stylesprovider) components at the top of their component trees **and using a single class name generator shared among them**.

### CSS 仅在第一次加载时生效，然后就消失了

The CSS is only generated on the first load of the page. Then, the CSS is missing on the server for consecutive requests.

#### 要运行的操作

The styling solution relies on a cache, the _sheets manager_, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). You need to create **a new `sheets` instance for each request**.

Example of fix:

```diff
-// Create a sheets instance.
-// 创建一个 sheets 实例

-const sheets = new ServerStyleSheets();

function handleRender(req, res) {
+ // 创建一个 sheets 实例。
+ const sheets = new ServerStyleSheets();

  //…

  // 将组件渲染为字符串。

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
```

### React 类名渲染不匹配

:::warning
**⚠️ Warning**

Prop className did not match.
:::

There is a class name mismatch between the client and the server. It might work for the first request. Another symptom is that the styling changes between initial page load and the downloading of the client scripts.

#### 要运行的操作

The class names value relies on the concept of [class name generator](/system/styles/advanced/#class-names). The whole page needs to be rendered with **a single generator**. This generator needs to behave identically on the server and on the client. For instance:

- 您需要为每个请求提供一个新的类名生成器。 但是您不应该在不同的请求之间共享 `createGenerateClassName()`：

  修复示例：

  ```diff
  -  // 创建一个新的类名生成器。
  -const generateClassName = createGenerateClassName();

  function handleRender(req, res) {
  + // 创建一个新的类名生成器。
  + const generateClassName = createGenerateClassName();

    //…

    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
  ```

- 你需要验证你的客户端和服务端运行的 Material-UI 的**版本** 是否完全相同。 即使是小小的版本的不匹配也可能导致样式问题。 若想检查版本号，您可以在搭建应用程序的环境以及部署环境中都运行 `npm list @mui/core`。

  您也可以通过在 package.json 的依赖项中指定某一个特定的 MUI 版本，这样能够确保在不同环境中使用的版本是一致的。

  _修复（package.json）的示例：_

  ```diff
    "dependencies": {
      ...
  -   "@mui/material": "^4.0.0",
  +   "@mui/material": "4.0.0",
      ...
    },
  ```

- 请确保服务端和客户端之间所共享的是相同的 `process.env.NODE_ENV` 值。
