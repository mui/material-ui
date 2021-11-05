# 从 v4 迁移到 v5 版本

<p class="description">是的，我们已经发布了 v5 版本！</p>

If you're looking for the v4 docs, you can [find them here](https://material-ui.com/versions/).

## 简介

This is a reference for upgrading your site from MUI Core v4 to v5. 您可能不需要将本篇文章涵盖的所有内容运用到你的站点上。 While there's a lot covered here, you probably won't need to do everything. We'll do our best to keep things easy to follow, and as sequential as possible, so you can quickly get rocking on v5!

## 为什么您需要迁移呢

To get the benefits of bug fixes and a lot of improvements such as the new styling engine. 这篇文章介绍了 _如何_ 从 v4 版本迁移到 v5 版本。 The **why** is covered in the [release blog post](/blog/mui-core-v5/).

## 更新您的依赖包

- [TypeScript：`onChange` 中的 `event` 的类型不再是 `React.ChangeEvent`，而是`React.SyntheticEvent`。](#update-react-amp-typescript-version)
- [ThemeProvider setup](#themeprovider-setup)
- [Update MUI](#update-material-ui-version)
- [Run codemods](#run-codemods)
  - [preset-safe](#preset-safe)
  - [variant-prop (optional)](#variant-prop)
  - [link-underline-hover (optional)](#link-underline-hover)
- [Supported changes](#handling-breaking-changes)
- [为了能实现更平滑的过渡，`adaptV4Theme` 助手允许你迭代升级到新的主题结构。](#migrate-themes-styleoverrides-to-emotion)
- [Migrate from JSS](#migrate-from-jss)
- [故障排除（Troubleshooting）](#troubleshooting)

> 💡 Aim to create small commits on any changes to help the migration go more smoothly. If you encounter any issues, check the [Troubleshooting](#troubleshooting) section. For other errors not described there, [create an issue](https://github.com/mui-org/material-ui/issues/new?assignees=&labels=status%3A+needs+triage&template=1.bug.md) with this title format: `[Migration] Summary of your issue`.

## 处理变化带来的系统崩溃

- The minimum supported version of **React** was increased from v16.8.0 to v17.0.0.
- The default background color is now `#fff` in light mode and `#121212` in dark mode. This matches the Material Design guidelines.

  > The minimum supported version of TypeScript was increased from v3.2 to v3.5. We try to align with types released from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (i.e. packages published on npm under the `@types` namespace). We will not change the minimum supported version in a major version of Material-UI. However, we generally recommend to not use a TypeScript version older than the [lowest supported version of DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped#older-versions-of-typescript-33-and-earlier) We will not change the minimum supported version in a major version of MUI. However, we generally recommend not to use a TypeScript version older than the [lowest supported version of DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped#older-versions-of-typescript-33-and-earlier)

您需要做的第一件事，就是更新您的依赖包。

- `react-scripts`
- `@material-ui/types`
- `@material-ui/core/styles`

> **Note:** If you are using emotion to style your app, and have a custom cache, it will override the one provided by Material-UI. In order for the injection order to still be correct, you need to add the `prepend` option to `createCache`. 下面是一个示例：

## The props: `alignItems`

Before upgrading to v5, please make sure that `ThemeProvider` is defined at the root of your application (even if you are using the **default theme**) and **NO** `useStyles` is called before `<ThemeProvider>`. This is because we are going to use `@mui/styles` **temporarily** (JSS style-engine), which requires `ThemeProvider`.

```js
"dependencies": {
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "@material-ui/core": "^5.0.0"
}
```

> **Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. To see how it can be done, take a look at the [`StyledEngineProvider` implementation](https://github.com/mui-org/material-ui/blob/HEAD/packages/mui-styled-engine-sc/src/StyledEngineProvider/StyledEngineProvider.js) in the `@material-ui/styled-engine-sc` package.

## 升级 Material-UI 的版本

或者运行

```sh
npm install @material-ui/core@next @emotion/react @emotion/styled

或者使用

yarn add @material-ui/core@next @emotion/react @emotion/styled
```

**Optional**: if you have one these packages, install the new package separately

- 你可以使用 [`moved-lab-modules` 编码器（codemod）](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules)来进行自动迁移。
- The `@material-ui/styles` package is no longer part of `@material-ui/core/styles`. If you are using `@material-ui/styles` together with `@material-ui/core` you need to add a module augmentation for the `DefaultTheme`.

<details>
<summary>See all packages change</summary>

```text
-import { createMuiTheme } from '@material-ui/core/styles';
  +import { createTheme } from '@material-ui/core/styles';

  -const theme = createMuiTheme({
  +const theme = createTheme({
```

You can use the [`component-rename-prop` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#component-rename-prop) for automatic migration. For more details about it, check our [blog post](/blog/material-ui-is-now-mui/) or [#27803](https://github.com/mui-org/material-ui/discussions/27803).

</details>

The minimum supported version of React was increased from v16.8.0 to v17.0.0.

```sh
npm install @emotion/react @emotion/styled

// or with `yarn`
yarn add @emotion/react @emotion/styled
```

> 💡 If you want to use MUI Core v5 with **styled-components** instead of emotion, check out [the installation guide](/getting-started/installation/#npm).

你可以使用 [`moved-lab-modules` 编码器（codemod）](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules)来进行自动迁移。 You can follow [these steps](#material-ui-pickers).

You should have installed `@mui/styles` by now. It includes JSS, which duplicate with emotion. It's meant to allow a gradual migration to v5. You should be able to remove the dependency following [these steps](#migrate-from-jss).

> **Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. To see how it can be done, take a look at the [`StyledEngineProvider` implementation](https://github.com/mui-org/material-ui/blob/HEAD/packages/mui-styled-engine-sc/src/StyledEngineProvider/StyledEngineProvider.js) in the `@material-ui/styled-engine-sc` package.

You can use the [`theme-breakpoints` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#theme-breakpoints) for automatic migration of `theme.breakpoints`.

## Run codemods

We have prepared these codemods to ease your migration experience.

### 升级 Material-UI 的版本

This codemod contains most of the transformers that are useful for migration. (**This codemod should be applied only once per folder**)

```sh
npx @mui/codemod v5.0.0/preset-safe <path>
```

> You can use the [`variant-prop` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#variant-prop) for automatic migration.

### 支持的浏览器和 node 版本

Transform `<TextField/>, <FormControl/>, <Select/>` component by applying `variant="standard"` if no variant is defined (because default variant has changed from `standard` in **v4** to `outlined` in **v5**).

> ❗️ You should **NOT** use this codemod if you have already defined default `variant: "outlined"` in the theme.

```js
// if you have theme setup like this, ❌ don't run this codemod.
// these default props can be removed later because `outlined` is the default value in v5
createMuiTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
```

As the core components use emotion as their style engine, the props used by emotion are not intercepted. The prop `as` in the following code snippet will not be propagated to `SomeOtherComponent`.

```sh
-import { createMuiTheme } from '@material-ui/core/styles';
+import { createTheme, adaptV4Theme } from '@material-ui/core/styles';

-const theme = createMuiTheme({
+const theme = createTheme(adaptV4Theme({
  // v4 theme
-});
+}));
```

你可以使用 [`moved-lab-modules` 编码器（codemod）](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules)来进行自动迁移。

### 非转发类（non-ref-forwarding class）组件

You can use the [`box-borderradius-values` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#box-borderradius-values) for automatic migration.

> ❗️ You should **NOT** use this codemod if you have already defined default `underline: "always"` in the theme.

```js
// if you have theme setup like this, ❌ don't run this codemod.
// this default props can be removed later because `always` is the default value in v5
createMuiTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'always',
      },
    },
  },
});
```

You can use the [`circularprogress-variant` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#circularprogress-variant) for automatic migration.

```sh
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
-  overrides: {
-    MuiButton: {
-      root: { padding: 0 },
-    },
-  },
+  components: {
+    MuiButton: {
+      styleOverrides: {
+        root: { padding: 0 },
+      },
+    },
+  },
});
```

You can use the [`collapse-rename-collapsedheight` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#collapse-rename-collapsedheight) for automatic migration of both the prop and the classes key.

Once you have completed the codemod step, try running your application again. At this point, it should be running without error. Otherwise check out the [Troubleshooting](#troubleshooting) section. Next step, handling breaking changes in each component.

## 变更

### Supported React version

默认捆绑包的目标已更改。 实际支持的版本将在发布时从浏览器列表中查询 `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`。

默认捆绑包支持的最低兼容版本如下：

<!-- #stable-snapshot -->

- Node 12（最低兼容到 8）
- Chrome 84（最低兼容到 49）
- Edge 85（最低兼容到 14）
- Firefox 78（最低兼容到 52）
- Safari 13 (macOS) 和 12.2 (iOS)（最低兼容到 10）
- 更多内容请（参阅 [.browserslistrc (`stable` entry)](https://github.com/mui-org/material-ui/blob/HEAD/.browserslistrc#L11)）

不再对 IE 11 进行兼容支持。 如果你需要对 IE 11 进行兼容性支持，请查看我们的 [旧版本包](/guides/minimizing-bundle-size/#legacy-bundle)。

### Supported TypeScript version

对 `component` 属性中的非转发（non-ref-forwarding）类组件或作为直接 `子类（children）` 的支持已被放弃。 如果你使用了 `unstable_createStrictModeTheme` 或者在 `React.StrictMode` 中没有看到任何与 `findDOMNode` 相关的任何警告，那么你不需要做任何事情。 否则请查看我们指南中的 [“注意事项与参考文献”部分](/guides/composition/#caveat-with-refs) 来了解如何迁移。 这个变化几乎影响了所有使用 `component` 属性的组件或者将 `children` 传递给要求 `children` 作为元素的组件（例如 `<MenuList><CustomMenuItem /></MenuList>`）

### 样式库

The style library used by default in v5 is [`emotion`](https://github.com/emotion-js/emotion). While migrating from JSS to emotion, and if you are using JSS style overrides for your components (for example overrides created by `makeStyles`), you will need to take care of the CSS injection order. To do so, you need to have the `StyledEngineProvider` with the `injectFirst` option at the top of your component tree. 下面是一个示例： 当从 JSS 迁移到 emotion 时，如果您在使用 JSS 为您的组件撰写样式（比如由  `makeStyles` 创建的样式），您将需要注意 CSS 的注入顺序。 To do so, you need to have the `StyledEngineProvider` with the `injectFirst` option at the **top of your component tree**.

> ✅ This is handled in the [preset-safe codemod](#preset-safe).

下面是一个示例：

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function PlainCssPriority() {
  return (
    <CacheProvider value={cache}>
      {这里编写你的组件树。 现在你可以覆盖 Material-UI 的样式。 */}
    </CacheProvider>
  );
}
```

> **Note:** If you are using emotion to style your app, and have a custom cache, it will override the one provided by MUI. 要使样式的注入顺序保持正确，你需要添加 `prepend` 选项到 `createCache` 。
> 
> ✅ This is handled in the [preset-safe codemod](#preset-safe).

下面是一个示例：

```diff
 import * as React from 'react';
import { StyledEngineProvider } from '@material-ui/core/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. 现在你可以覆盖 Material-UI 的样式。 */}
    </StyledEngineProvider>
  );
} 现在你可以覆盖 Material-UI 的样式。 */}
     </CacheProvider>
   );
 }
```

> **Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@material-ui/styled-engine-sc` package. 你可以使用 [`moved-lab-modules` 编码器（codemod）](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules)来进行自动迁移。

### 主题

The structure of the theme has changed in v5. You need to update its shape. 为了能实现更平滑的过渡，`adaptV4Theme` 助手允许你迭代升级到新的主题结构。

> ✅ This is handled in the [preset-safe codemod](#preset-safe).

```diff
-import { MuiThemeProvider } from '@material-ui/core/styles';
  +import { ThemeProvider } from '@material-ui/core/styles';
```

> ⚠️ This adapter only handles the input arguments of `createTheme`, if you modify the shape of the theme after its creation, you need to migrate the structure manually.

The following changes are supported by the adapter:

- 事实证明，“水槽（gutters）”这个抽象的概念还没有被频繁使用，所以是没有价值的。

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]: {
  +  paddingLeft: theme.spacing(3),
  +  paddingRight: theme.spacing(3),
  +},
  ```

- `theme.spacing` 现在默认返回以 px 为单位的单个数值。 这一改动改善了与 styled-components & emotion 的整合。

  > You can use the [`theme-spacing` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#theme-spacing) to remove any 'px' suffix from `theme.spacing` calls in a template string.

  修改前：

  ```js
  theme.spacing(2) => 16
  ```

  修改后：

  ```js
  theme.spacing(2) => '16px'
  ```

- The `theme.palette.type` key was renamed to `theme.palette.mode`, to better follow the "dark mode" term that is usually used for describing this feature.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    import { createTheme } from '@material-ui/core/styles';
  >   -const theme = createTheme({palette: { type: 'dark' }}),
  >   +const theme = createTheme({palette: { mode: 'dark' }}),
  > ```

- `theme.palette.augmentColor` 助手的签名已经改变：

  ```diff
   info = {
  -  main: cyan[500],
  +  main: lightBlue[700], // lightBlue[400] in "dark" mode

  -  light: cyan[300],
  +  light: lightBlue[500], // lightBlue[300] in "dark" mode

  -  dark: cyan[700],
  +  dark: lightBlue[900], // lightBlue[700] in "dark" mode
   }
  ```

- The default `theme.palette.success` colors were changed to pass AA standard contrast ratio in both light & dark mode.

  ```diff
   success = {
  -  main: green[500],
  +  main: green[800], // green[400] in "dark" mode

  -  light: green[300],
  +  light: green[500], // green[300] in "dark" mode

  -  dark: green[700],
  +  dark: green[900], // green[700] in "dark" mode
   }
  ```

- The default `theme.palette.warning` colors were changed to pass AA standard contrast ratio in both light & dark mode.

  ```diff
   warning = {
  -  main: orange[500],
  +  main: "#ED6C02", // orange[400] in "dark" mode

  -  light: orange[300],
  +  light: orange[500], // orange[300] in "dark" mode

  -  dark: orange[700],
  +  dark: orange[900], // orange[700] in "dark" mode
   }
  ```

- `theme.palette.text.hint` 键在 Material-UI 组件中未使用，现已被删除。 如果你的项目之前依赖它，那么也可以通过下面方法将它添加回来：

  ```diff
   import { createTheme } from '@material-ui/core/styles';

  -const theme = createTheme(),
  +const theme = createTheme({
  +  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
  +});
  ```

- The components' definitions in the theme were restructure under the `components` key, to allow for easier discoverability of the definitions related to any one component.

  1. `props`

  ```diff
   import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
-  props: {
-    MuiButton: {
-      disableRipple: true,
-    },
-  },
+  components: {
+    MuiButton: {
+      defaultProps: {
+        disableRipple: true,
+      },
+    },
+  },
});
  ```

  2. `覆盖`

  ```diff
   -import { withStyles } from '@material-ui/core/styles';
  +import { withStyles } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const defaultTheme = createTheme();
   const MyComponent = withStyles((props) => {
     const { classes, className, ...other } = props;
     return <div className={clsx(className, classes.root)} {...other} />
   })(({ theme }) => ({ root: { background: theme.palette.primary.main }}));

   function App() {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={defaultTheme}><MyComponent /></ThemeProvider>;
   }
  ```

### Styles（样式表单）

- 为更好地描述功能，我们将 `fade` 重命名为 `alpha`。 当输入颜色已经有一个 alpha 值时，以前的名称会导致混乱。 **overrides** 助手覆盖了颜色的 alpha 值。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   - import { fade } from '@material-ui/core/styles';
  >   + import { alpha } from '@material-ui/core/styles';
  > 
  >   const classes = makeStyles(theme => ({
  >   -  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  >   +  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  >   }));
  > ```

- The `createStyles` function from `@mui/material/styles` was moved to the one exported from `@mui/styles`. It is necessary for removing the dependency to `@mui/styles` in the core package.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { createStyles } from '@material-ui/core/styles';
  > +import { createStyles } from '@material-ui/styles';
  > ```

### System 系统

#### ThemeProvider

If you are using the utilities from `@mui/styles` together with the `@mui/material`, you should replace the use of `ThemeProvider` from `@mui/styles` with the one exported from `@mui/material/styles`. This way, the `theme` provided in the context will be available in both the styling utilities exported from `@mui/styles`, like `makeStyles`, `withStyles` etc. and the MUI components.

```diff
-import { ThemeProvider } from '@material-ui/styles';
+import { ThemeProvider } from '@material-ui/core/styles';
```

The `MuiThemeProvider` component is no longer exported from `@material-ui/core/styles`. Use `ThemeProvider` instead.

#### Default theme (TypeScript)

The `@mui/styles` package is no longer part of `@mui/material/styles`. If you are using `@mui/styles` together with `@mui/material` you need to add a module augmentation for the `DefaultTheme`.

> ✅ This is handled in the [preset-safe codemod](#preset-safe).

```ts
-import { useThemeVariants } from '@material-ui/core/styles';
  +import { useThemeVariants } from '@material-ui/styles';
```

### 1. 1. 核心组件

- Nested imports of more than 1 level are private. You can't import color from `@mui/material/colors/red`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { Omit } from '@material-ui/types';
  >   +import { DistributiveOmit } from '@material-ui/types';
  > ```

### 一个突出的应用栏。

#### createGenerateClassName

- The `createGenerateClassName` function is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`. You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { createGenerateClassName } from '@material-ui/core/styles';
  >   +import { createGenerateClassName } from '@material-ui/styles';
  > ```

  你可以使用 [`moved-lab-modules` 编码器（codemod）](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules)来进行自动迁移。

#### createMuiTheme

- The function `createMuiTheme` was renamed to `createTheme` to make more intuitive to use with `ThemeProvider`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { styled } from '@material-ui/core/styles';
  >   +import { styled } from '@material-ui/styles';
  >   +import { createTheme, ThemeProvider } from '@material-ui/core/styles';
  > 
  >   +const theme = createTheme();
  >    const MyComponent = styled('div')(({ theme }) => ({ background: theme.palette.primary.main }));
  > 
  >    function App(props) {
  >   -  return <MyComponent />;
  >   +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
  >    }
  > ```

#### jssPreset

- The `jssPreset` object is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`. You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { jssPreset } from '@material-ui/core/styles';
  >   +import { jssPreset } from '@material-ui/styles';
  > ```

#### makeStyles

- The `makeStyles` JSS utility is no longer exported from `@mui/material/styles`. You can use `@mui/styles/makeStyles` instead. The `MuiThemeProvider` component is no longer exported from `@material-ui/core/styles`. Use `ThemeProvider` instead. If you are using this utility together with `@mui/material`, it's recommended that you use the `ThemeProvider` component from `@mui/material/styles` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { makeStyles } from '@material-ui/core/styles';
  >   +import { makeStyles } from '@material-ui/styles';
  >   +import { createTheme, ThemeProvider } from '@material-ui/core/styles';
  > 
  >   +const theme = createTheme();
  >    const useStyles = makeStyles((theme) => ({
  >      background: theme.palette.primary.main,
  >    }));
  >    function Component() {
  >      const classes = useStyles();
  >      return <div className={classes.root} />
  >    }
  > 
  >    // In the root of your app
  >    function App(props) {
  >   -  return <Component />;
  >   +  return <ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>;
  >    }
  > ```

#### MuiThemeProvider

- The `MuiThemeProvider` component is no longer exported from `@mui/material/styles`. Use `ThemeProvider` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { StylesProvider } from '@material-ui/core/styles';
  >   +import { StylesProvider } from '@material-ui/styles';
  > ```

#### ServerStyleSheets

- The `ServerStyleSheets` component is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { ServerStyleSheets } from '@material-ui/core/styles';
  >   +import { ServerStyleSheets } from '@material-ui/styles';
  > ```

#### styled

- The `styled` JSS utility is no longer exported from `@mui/material/styles`. You can use the one exported from `@mui/styles` instead. The `MuiThemeProvider` component is no longer exported from `@material-ui/core/styles`. Use `ThemeProvider` instead. If you are using this utility together with `@mui/material`, it's recommended you use the `ThemeProvider` component from `@mui/material/styles` instead.

  ```diff
  import { createTheme } from '@material-ui/core/styles';

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  ```

#### StylesProvider

- The `StylesProvider` component is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Skeleton from '@material-ui/lab/Skeleton';
  >   +import Skeleton from '@material-ui/core/Skeleton';
  > ```

#### useThemeVariants

- The `useThemeVariants` hook is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   The <code>useThemeVariants</code> hook is no longer exported from <code>@material-ui/core/styles</code>. You should import it directly from <code>@material-ui/styles</code>.
  > ``` hook is no longer exported from @material-ui/core/styles. You should import it directly from @material-ui/styles.
  >     </code>

#### withStyles

- Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component. Refs are now automatically forwarded to the inner component.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    import * as React from 'react';
  >   import { withStyles } from '@material-ui/styles';
  > 
  >   const MyComponent = withStyles({
  >     root: {
  >       backgroundColor: 'red',
  >     },
  >   })(({ classes }) => <div className={classes.root} />);
  > 
  >   function MyOtherComponent(props) {
  >     const ref = React.useRef();
  >   - return <MyComponent innerRef={ref} />;
  >   + return <MyComponent ref={ref} />;
  >   }
  > ```

- The `withStyles` JSS utility is no longer exported from `@mui/material/styles`. You can use `@mui/styles/withStyles` instead. The `MuiThemeProvider` component is no longer exported from `@material-ui/core/styles`. Use `ThemeProvider` instead. If you are using this utility together with `@mui/material`, you should use the `ThemeProvider` component from `@mui/material/styles` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   If you are using the utilities from <code>@material-ui/styles</code> together with the <code>@material-ui/core</code>, you should replace the use of <code>ThemeProvider</code> from <code>@material-ui/styles</code> with the one exported from <code>@material-ui/core/styles</code>. This way, the <code>theme</code> provided in the context will be available in both the styling utilities exported from <code>@material-ui/styles</code>, like <code>makeStyles</code>, <code>withStyles</code> etc. and the Material-UI components.
  > ``` together with the @material-ui/core, you should replace the use of ThemeProvider from @material-ui/styles with the one exported from @material-ui/core/styles. This way, the theme provided in the context will be available in both the styling utilities exported from @material-ui/styles, like makeStyles, withStyles etc. and the Material-UI components.
  >     </code>

#### withTheme

- The `withTheme` HOC utility has been removed from the `@mui/material/styles` package. You can use `@mui/styles/withTheme` instead. The `MuiThemeProvider` component is no longer exported from `@material-ui/core/styles`. Use `ThemeProvider` instead. If you are using this utility together with `@mui/material`, it's recommended you use the `ThemeProvider` component from `@mui/material/styles` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import ToggleButton from '@material-ui/lab/ToggleButton';
  >   -import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
  >   +import ToggleButton from '@material-ui/core/ToggleButton';
  >   +import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
  > ```

- Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component. Refs are now automatically forwarded to the inner component.

  ```diff
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
  -      styleOverrides: {
  -       '@global': {
  -          html: {
  -            WebkitFontSmoothing: 'auto',
  -          },
  -       },
  -      },
  +     styleOverrides: `
  +       html {
  +         -webkit-font-smoothing: auto;
  +       }
  +     `
      },
    },
  });
  ```

#### withWidth

- This HOC was removed. This HOC was removed. There's an alternative using the `useMediaQuery` hook on [this page](/components/use-media-query/#migrating-from-withwidth).

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying hard-coded function to prevent the application from crashing.

### Alert 警告提示

#### GitHub

The default size's padding is reduced to `8px` which makes the default IconButton size of `40px`. To get the old default size (`48px`), use `size="large"`. The change was done to better match Google's products when Material Design stopped documenting the icon button pattern.

### Autocomplete 自动补全组件

You can use the [`use-transitionprops` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.

### Avatar 头像组件

- The following system functions (and properties) were renamed because they are considered deprecated CSS:

  - `gridGap` to `gap`
  - `gridRowGap` to `rowGap`
  - `gridColumnGap` to `columnGap`

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

- Use spacing unit in `gap`, `rowGap`, and `columnGap`. Use spacing unit in `gap`, `rowGap`, and `columnGap`. If you were using a number previously, you need to mention the px to bypass the new transformation with `theme.spacing`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Box
  >   - gap={2}
  >   + gap="2px"
  >   >
  > ```

- Replace `css` prop with `sx` to avoid collision with styled-components & emotion `css` prop.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Box css={{ color: 'primary.main' }} />
  >   +<Box sx={{ color: 'primary.main' }} />
  > ```

  > Note that the system grid function wasn't documented in v4.

### 2. 自定义组件

As the core components use emotion as their style engine, the props used by emotion are not intercepted. The prop `as` in the following code snippet will not be propagated to `SomeOtherComponent`. The prop `as` in the following code snippet will not be propagated to `SomeOtherComponent`.

```jsx
<MuiComponent component={SomeOtherComponent} as="button" />
```

### BottomNavigation（底部导航）

- Remove z-index when position static and relative. This avoids the creation of a stacking context and rendering issues. This avoids the creation of a stacking context and rendering issues.
- The `color` prop has no longer any effect in dark mode. The `color` prop has no longer any effect in dark mode. The app bar uses the background color required by the elevation to follow the [Material Design guidelines](https://material.io/design/color/dark-theme.html). Use `enableColorOnDark` to restore the behavior of v4. Use `enableColorOnDark` to restore the behavior of v4.

  ```jsx
  <AppBar enableColorOnDark />
  ```

### Box 分组

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Alert from '@material-ui/lab/Alert';
  >   -import AlertTitle from '@material-ui/lab/AlertTitle';
  >   +import Alert from '@material-ui/core/Alert';
  >   +import AlertTitle from '@material-ui/core/AlertTitle';
  > ```

### Autocomplete 自动补全组件

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Autocomplete from '@material-ui/lab/Autocomplete';
  >   -import useAutocomplete  from '@material-ui/lab/useAutocomplete';
  >   +import Autocomplete from '@material-ui/core/Autocomplete';
  >   +import useAutoComplete from '@material-ui/core/useAutocomplete';
  > ```

- 移除 `debug` 属性。 有几个更简单的方式来使用它：`open={true}`，Chrome 开发者调试工具 [“Emulate focused”](https://twitter.com/sulco/status/1305841873945272321)，或者使用 React devtools prop setter。
- `renderOption` 现在应该返回选项的完整 DOM 结构。 这样做可以让定制组件变得更加容易。 你可以通过下面方法进行回滚：

  ```diff
   <Autocomplete
  - renderOption={(option, { selected }) => (
  -   <React.Fragment>
  + renderOption={(props, option, { selected }) => (
  +   <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option.title}
  -   </React.Fragment>
  +   </li>
    )}
  />
  ```

- Rename `closeIcon` prop to `clearIcon` to avoid confusion.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Autocomplete closeIcon={defaultClearIcon} />
  >   +<Autocomplete clearIcon={defaultClearIcon} />
  > ```

- The following values of the reason argument in `onChange` and `onClose` were renamed for consistency:

  1. `create-option` to `createOption`
  2. `select-option` to `selectOption`
  3. `remove-option` to `removeOption`

- Change the CSS rules that use `[data-focus="true"]` to use `.Mui-focused`. The `data-focus` attribute is not set on the focused option anymore, instead, global class names are used. The `data-focus` attribute is not set on the focused option anymore, instead, global class names are used.

  ```diff
  -'.MuiAutocomplete-option[data-focus="true"]': {
  +'.MuiAutocomplete-option.Mui-focused': {
  ```

- Rename `getOptionSelected` to `isOptionEqualToValue` to better describe its purpose.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Autocomplete
  >   - getOptionSelected={(option, value) => option.title === value.title}
  >   + isOptionEqualToValue={(option, value) => option.title === value.title}
  > ```

### Avatar 头像组件

- Rename `circle` to `circular` for consistency:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Avatar variant="circle">
  >   -<Avatar classes={{ circle: 'className' }}>
  >   +<Avatar variant="circular">
  >   +<Avatar classes={{ circular: 'className' }}>
  > ```

  Since `circular` is the default value, the variant prop can be deleted:

  ```diff
  -<Avatar variant="circle">
  +<Avatar>
  ```

- AvatarGroup 已从实验室包移动到核心包。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import AvatarGroup from '@material-ui/lab/AvatarGroup';
  >   +import AvatarGroup from '@material-ui/core/AvatarGroup';
  > ```

### Badge 徽章

- 为保持一致性，我们将 `circle` 重命名为 `circular`，`rectangle` 重命名为 `rectangular`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Badge overlap="circle">
  >   -<Badge overlap="rectangle">
  >   +<Badge overlap="circular">
  >   +<Badge overlap="rectangular">
  >   <Badge classes={{
  >   - anchorOriginTopRightRectangle: 'className',
  >   - anchorOriginBottomRightRectangle: 'className',
  >   - anchorOriginTopLeftRectangle: 'className',
  >   - anchorOriginBottomLeftRectangle: 'className',
  >   - anchorOriginTopRightCircle: 'className',
  >   - anchorOriginBottomRightCircle: 'className',
  >   - anchorOriginTopLeftCircle: 'className',
  >   + anchorOriginTopRightRectangular: 'className',
  >   + anchorOriginBottomRightRectangular: 'className',
  >   + anchorOriginTopLeftRectangular: 'className',
  >   + anchorOriginBottomLeftRectangular: 'className',
  >   + anchorOriginTopRightCircular: 'className',
  >   + anchorOriginBottomRightCircular: 'className',
  >   + anchorOriginTopLeftCircular: 'className',
  >   }}>
  > ```

  ```diff
   import { Theme } from '@material-ui/core/styles';

declare module '@material-ui/styles' {
  interface DefaultTheme extends Theme {}
}
  ```

### CircularProgress（进度环）

- TypeScript：`onChange` 中的 `event` 的类型不再是 `React.ChangeEvent`，而是`React.SyntheticEvent`。

  ```diff
  -<BottomNavigation onChange={(event: React.ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React.SyntheticEvent) => {}} />
  ```

### Collapse 折叠

- Remove the `span` element that wraps the children. Remove the `wrapper` classKey too. More details about [this change](https://github.com/mui-org/material-ui/pull/26923).

  ```diff
   <button class="MuiIconButton-root">
  - <span class="MuiIconButton-label">
      <svg />
  - </span>
  </button>
  ```

### Checkbox 选择框

- `borderRadius` 系统属性值转换已被更改。 如果它收到一个数字，它就会将这个值与 `theme.shape.borderRadius` 的值相乘。 Use a string to provide an explicit `px` value.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Box borderRadius="borderRadius">
  >   +<Box borderRadius={1}>
  > ```

  ```diff
  -<Box borderRadius={16}>
  +<Box borderRadius="16px">
  ```

- The Box system props have an optional alternative API in v5, using the `sx` prop. You can [read this section](/system/basics/#api-tradeoff) for the "why" behind this new API. You can [read this section](/system/basics/#api-tradeoff) for the "why" behind this new API.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```jsx
  >   -<Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
  >   +<Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
  > ```

- The following properties have been renamed because they are considered deprecated CSS properties by the CSS specification:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

  1. `gridGap` to `gap`
  2. `gridColumnGap` to `columnGap`
  3. `gridRowGap` to `rowGap`

  ```diff
  -<Box gridGap={1}>
  -<Box gridColumnGap={2}>
  -<Box gridRowGap={3}>
  +<Box gap={1}>
  +<Box columnGap={2}>
  +<Box rowGap={3}>
  ```

  (Note that the system grid function wasn't documented in v4.)

- The `clone` prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a Material-UI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }} clone>
  -  <Button>Save</Button>
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

- The ability to pass a render prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a Material-UI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <Button {...props}>Save</Button>}
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

  For non-Material-UI components, use the `component` prop.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <button {...props}>Save</button>}
  -</Box>
  +<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
  ```

### Button 按钮

- 按钮的 `颜色（color）` 属性默认情况下为 "primary"，同时 "default" 属性已被删除。 This makes the button closer to the Material Design guidelines and simplifies the API.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Button color="primary">
  >   -<Button color="default">
  >   +<Button>
  >   +<Button>
  > ```

  You can use the [`use-transitionprops` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666). `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

  ```diff
   <button class="MuiButton-root">
  - <span class="MuiButton-label">
      children
  - </span>
  </button>
  ```

### Chip

- 为保持一致性，我们将 `visuallyhidden` 重命名为 `visuallyHidden`：

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

  Since `filled` is the default value, the variant prop can be deleted:

  ```diff
  -<Chip variant="default">
  +<Chip>
  ```

### ExpansionPanel（扩展面板）

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### CircularProgress（进度环）

- 将默认的变量从 `standard` 更改为 `outlined`。 Standard has been removed from the Material Design guidelines.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   <CircularProgress variant="static" classes={{ static: 'className' }} />
  >   +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  > ```

> 注意：如果你之前已经定制了 determinate，那么你的定制可能不再有效。 所以请删除它们。

### Collapse 折叠

- `collapsedHeight` 属性已重命名为 `collapsedSize` 以便支持水平方向的大小。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Collapse collapsedHeight={40}>
  >   +<Collapse collapsedSize={40}>
  > ```

- 已更改 `classes.containe` 键以匹配其他组件的约定行为。

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

### CssBaseline

- The component was migrated to use the `@mui/styled-engine` (`emotion` or `styled-components`) instead of `jss`. You should remove the `@global` key when defining the style overrides for it. You could also start using the CSS template syntax over the JavaScript object syntax.

  ```diff
  const theme = createTheme({
    typography: {
      body1: {
        fontSize: '0.875rem',
      },
    },
  });
  ```

- The `body` font size has changed from `theme.typography.body2` (`0.875rem`) to `theme.typography.body1` (`1rem`). To return to the previous size, you can override it in the theme: To return to the previous size, you can override it in the theme: To return to the previous size, you can override it in the theme:

  ```js
  const theme = createMuiTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: '0.01071em',
          },
        },
      },
    },
  });
  ```

### Dialog 对话框

- onE\* 过渡属性已被删除。 请使用 TransitionProps 来代替它。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Dialog
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >   />
  > ```

- Remove the `disableBackdropClick` prop because it is redundant. Use `onClose` with `reason === 'backdropClick'` instead. Remove the `disableBackdropClick` prop because it is redundant. 当 `reason === 'backdropClick'` 时，将会忽略 `onClose` 的关闭事件。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Dialog
  >   - disableBackdropClick
  >   - onClose={handleClose}
  >   + onClose={(event, reason) => {
  >   +   if (reason !== 'backdropClick') {
  >   +     onClose(event, reason);
  >   +   }
  >   + }}
  >   />
  > ```

- Remove the `withMobileDialog` higher-order component. Hook API 提供了一个更简单且灵活的方案： Hook API 提供了一个更简单且灵活的方案：

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying hard-coded function to prevent application crash, further fixes are required. 
  > 
  > ```diff
  >   -import withMobileDialog from '@mui/material/withMobileDialog';
  >   +import { useTheme, useMediaQuery } from '@mui/material';
  > 
  >   function ResponsiveDialog(props) {
  >   - const { fullScreen } = props;
  >   + const theme = useTheme();
  >   + const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  >     const [open, setOpen] = React.useState(false);
  > 
  >   // ...
  > 
  >   -export default withMobileDialog()(ResponsiveDialog);
  >   +export default ResponsiveDialog;
  > ```

- Flatten DialogTitle DOM structure, remove `disableTypography` prop

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<DialogTitle disableTypography>
  >   -  <Typography variant="h4" component="h2">
  >   +<DialogTitle>
  >   +  <Typography variant="h4" component="span">
  >        My header
  >      </Typography>
  > ```

### Divider

- 你需要使用边框来代替背景色。 这个改动可以防止在缩放屏幕上出现高度不一致的情况。 If you have customized the color of the border, you will need to update the CSS property override:

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### ExpansionPanel（扩展面板）

- 为使用更通用的命名约定，我们将 `ExpansionPanel` 组件重命名为 `Accordion`：

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import ExpansionPanel from '@material-ui/core/ExpansionPanel';
  >   -import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
  >   -import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
  >   -import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
  >   +import Accordion from '@material-ui/core/Accordion';
  >   +import AccordionSummary from '@material-ui/core/AccordionSummary';
  >   +import AccordionDetails from '@material-ui/core/AccordionDetails';
  >   +import AccordionActions from '@material-ui/core/AccordionActions';
  > 
  >   -<ExpansionPanel>
  >   +<Accordion>
  >   -  <ExpansionPanelSummary>
  >   +  <AccordionSummary>
  >        <Typography>位置</Typography>
  >        <Typography>选择出行目的地</Typography>
  >   -  </ExpansionPanelSummary>
  >   +  </AccordionSummary>
  >   -  <ExpansionPanelDetails>
  >   +  <AccordionDetails>
  >        <Chip label="Barbados" onDelete={() => {}} />
  >        <Typography variant="caption">请选择您的目的地</Typography>
  >   -  </ExpansionPanelDetails>
  >   +  </AccordionDetails>
  >      <Divider />
  >   -  <ExpansionPanelActions>
  >   +  <AccordionActions>
  >        <Button size="small">取消</Button>
  >        <Button size="small">保存</Button>
  >   -  </ExpansionPanelActions>
  >   +  </AccordionActions>
  >   -</ExpansionPanel>
  >   +</Accordion>
  > ```

- TypeScript：`onChange` 中的 `event` 的类型不再是 `React.ChangeEvent`，而是`React.SyntheticEvent`。

  ```diff
  -<Accordion onChange={(event: React.ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React.SyntheticEvent, expanded: boolean) => {}} />
  ```

### ExpansionPanelDetails

- 因为投诉太多，我们删除了 AccordionDetails 中的 `display: flex`。 大多数开发者都期望显示为块级（block）元素。

### ExpansionPanelSummary

- 为保持一致性，我们将 `focused` 重命名为 `focusVisible`。

  ```diff
   <Accordion
    classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
    }}
  />
  ```

- 删除 AccordionSummary 中的 `IconButtonProps` 属性。 该组件渲染一个 `<div>` 元素而不是 IconButton。 所以不再需要该属性了。

### Fab

- Rename `round` to `circular` for consistency:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Fab variant="round">
  >   +<Fab variant="circular">
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666). `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/27112).

  ```diff
   <button class="MuiFab-root">
  -  <span class="MuiFab-label">
       {children}
  -  </span>
   </button>
  ```

### FormControl

- 将默认的变量从 `standard` 更改为 `outlined`。 Standard has been removed from the Material Design guidelines. If you are composing the Select with a form control component, you only need to update `FormControl`, the select inherits the variant from its context.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<FormControl value="Standard" />
  >   -<FormControl value="Outlined" variant="outlined" />
  >   +<FormControl value="Standard" variant="standard" />
  >   +<FormControl value="Outlined" />
  > ```

### FormControlLabel

- The `label` prop is now required. If you were using a `FormControlLabel` without a `label`, you can replace it with just the value of the `control` prop.

```diff
-<FormControlLabel control={<Checkbox />} />
+<Checkbox />
```

### Grid

- Rename `justify` prop to `justifyContent` to align with the CSS property name.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Grid justify="center">
  >   +<Grid justifyContent="center">
  > ```

- `alignContent` and `justifyContent` and their `classes` and style overrides keys were removed: "align-items-xs-center", "align-items-xs-flex-start", "align-items-xs-flex-end", "align-items-xs-baseline", "align-content-xs-center", "align-content-xs-flex-start", "align-content-xs-flex-end", "align-content-xs-space-between", "align-content-xs-space-around", "justify-content-xs-center", "justify-content-xs-flex-end", "justify-content-xs-space-between", "justify-content-xs-space-around" and "justify-content-xs-space-evenly". These props are now considered part of the system, not on the `Grid` component itself. If you still wish to add overrides for them, you can use the `theme.components.MuiGrid.variants` options. For example These props are now considered part of the system, not on the `Grid` component itself. If you still wish to add overrides for them, you can use the `theme.components.MuiGrid.variants` options.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   const theme = createTheme({
  >     components: {
  >       MuiGrid: {
  >   -     styleOverrides: {
  >   -       "align-items-xs-flex-end": {
  >   -         marginTop: '20px',
  >   -       },
  >   -     },
  >   +     variants: {
  >   +       props: { alignItems: "flex-end" },
  >   +       style: {
  >   +         marginTop: '20px',
  >   +       },
  >   +     }],
  >       },
  >     },
  >   });
  > ```

### GridList

- 为保持和当前 Material Design 命名的一致性，我们将 `GridList` 组件重命名为 `ImageList`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

- 为保持和 CSS 属性名字的一致性，我们将 `spacing` 属性重命名为 `gap`。
- Rename the GridList `cellHeight` prop to `rowHeight`.
- 添加 `variant` 属性到 GridList 中。
- 我们将 GridListItemBar 的 `actionPosition` 属性重命名为 `position`。 (也要注意相关的类名变化)。
- 使用 CSS object-fit。 如果要兼容 IE11，那么你可以使用 polyfill 来转换它，例如 https://www.npmjs.com/package/object-fit-images，或者继续使用 v4 组件。

  ```diff
  -import GridList from '@material-ui/core/GridList';
  -import GridListTile from '@material-ui/core/GridListTile';
  -import GridListTileBar from '@material-ui/core/GridListTileBar';
  +import ImageList from '@material-ui/core/ImageList';
  +import ImageListItem from '@material-ui/core/ImageListItem';
  +import ImageListItemBar from '@material-ui/core/ImageListItemBar';

  -<GridList spacing={8} cellHeight={200}>
  -  <GridListTile>
  +<ImageList gap={8} rowHeight={200}>
  +  <ImageListItem>
      <img src="file.jpg" alt="Image title" />
  -    <GridListTileBar
  +    <ImageListItemBar
        title="Title"
        subtitle="Subtitle"
      />
  -  </GridListTile>
  -</GridList>
  +  </ImageListItem>
  +</ImageList>
  ```

### Hidden 隐藏组件

- This component was removed because its functionality can be created with the [`sx`](/system/basics/#the-sx-prop) prop or the [`useMediaQuery`](/components/use-media-query) hook.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying fake `Hidden` component to prevent application crash, further fixes are required.

  Use the `sx` prop to replace `implementation="css"`:

  ```diff
  -<Hidden implementation="css" xlUp><Paper /></Hidden>
  -<Hidden implementation="css" xlUp><button /></Hidden>
  +<Paper sx={{ display: { xl: 'none', xs: 'block' } }} />
  +<Box component="button" sx={{ display: { xl: 'none', xs: 'block' } }} />
  ```

  ```diff
  -<Hidden implementation="css" mdDown><Paper /></Hidden>
  -<Hidden implementation="css" mdDown><button /></Hidden>
  +<Paper sx={{ display: { xs: 'none', md: 'block' } }} />
  +<Box component="button" sx={{ display: { xs: 'none', md: 'block' } }} />
  ```

  Use the `useMediaQuery` hook to replace `implementation="js"`:

  ```diff
  -<Hidden implementation="js" xlUp><Paper /></Hidden>
  +const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));
  +return hidden ? null : <Paper />; null : <Paper />;
  ```

### 图标

- The default value of `fontSize` was changed from `default` to `medium` for consistency. The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikely event that you were using the value `default`, the prop can be removed:

  ```diff
  -<Icon fontSize="default">icon-name</Icon>
  +<Icon>icon-name</Icon>
  ```

### IconButton

- The default size's padding is reduced to `8px` which makes the default IconButton size of `40px`. To get the old default size (`48px`), use `size="large"`. The change was done to better match Google's products when Material Design stopped documenting the icon button pattern. To get the old default size (`48px`), use `size="large"`. The change was done to better match Google's products when Material Design stopped documenting the icon button pattern.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   - <IconButton>
  >   + <IconButton size="large">
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666). `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

  ```diff
   <Snackbar
  -  onEnter={onEnter}
  -  onEntered={onEntered}
  -  onEntering={onEntering}
  -  onExit={onExit}
  -  onExited={onExited}
  -  onExiting={onExiting}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

### React Link（链接）组件

- The default `underline` prop is changed from `"hover"` to `"always"`. To get the same behavior as in v4, apply `defaultProps` in theme

  > ✅ This is handled in [link-underline-hover codemod](#link-underline-hover), read the details before running this codemod. 
  > 
  > ```js
  >   The <code>withTheme</code> HOC utility has been removed from the <code>@material-ui/core/styles</code> package. You can use <code>@material-ui/styles/withTheme</code> instead. Make sure to add a <code>ThemeProvider</code> at the root of your application, as the <code>defaultTheme</code> is no longer available. If you are using this utility together with <code>@material-ui/core</code>, it's recommended you use the <code>ThemeProvider</code> component from <code>@material-ui/core/styles</code> instead.
  > ``` HOC utility has been removed from the @material-ui/core/styles package. You can use @material-ui/styles/withTheme instead. Make sure to add a ThemeProvider at the root of your application, as the defaultTheme is no longer available. If you are using this utility together with @material-ui/core, it's recommended you use the ThemeProvider component from @material-ui/core/styles instead.
  >     </code>

### Menu

- onE\* 过渡属性已被删除。 请使用 TransitionProps 来代替它。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Menu
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >   >
  > ```

  > Note: The `selectedMenu` variant will no longer vertically align the selected item with the anchor.

- Change the default value of `anchorOrigin.vertical` to follow the Material Design guidelines. The menu now displays below the anchor instead of on top of it. 你可以用以下方法恢复到以前的行为： The menu now displays below the anchor instead of on top of it. 你可以用以下方法恢复到以前的行为：

  ```diff
   <Menu
  +  anchorOrigin={{
  +    vertical: 'top',
  +    horizontal: 'left',
  +  }}
  ```

### MenuItem

- The `MenuItem` component inherits the `ButtonBase` component instead of `ListItem`. The class names related to "MuiListItem-\*" are removed and theming `ListItem` is no longer affecting `MenuItem`. The class names related to "MuiListItem-\*" are removed and theming `ListItem` is no longer affecting `MenuItem`.

  ```diff
  -<li className="MuiButtonBase-root MuiMenuItem-root MuiListItem-root">
  +<li className="MuiButtonBase-root MuiMenuItem-root">
  ```

- prop `listItemClasses` is removed, use `classes` instead.

  ```diff
  -<MenuItem listItemClasses={{...}}>
  +<MenuItem classes={{...}}>
  ```

  Read more about [MenuItem CSS API](/api/menu-item/#css)

### Modal 模态框组件

- Remove the `disableBackdropClick` prop because it is redundant. Use `onClose` with `reason === 'backdropClick'` instead. Use `onClose` with `reason === 'backdropClick'` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Modal
  >   - disableBackdropClick
  >   - onClose={handleClose}
  >   + onClose={(event, reason) => {
  >   +   if (reason !== 'backdropClick') {
  >   +     onClose(event, reason);
  >   +   }
  >   + }}
  >   />
  > ```

- Remove the `onEscapeKeyDown` prop because it is redundant. 使用 `onClose` 和 `reason === "escapeKeyDown"` 来代替。 使用 `onClose` 和 `reason === "escapeKeyDown"` 来代替。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Modal
  >   - onEscapeKeyDown={handleEscapeKeyDown}
  >   + onClose={(event, reason) => {
  >   +   if (reason === 'escapeKeyDown') {
  >   +     handleEscapeKeyDown(event);
  >   +   }
  >   + }}
  >   />
  > ```

- 移除 `onRendered` 属性。 具体迁移方法根据你的使用情况而定，你可以在子元素上使用 [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)，也可以在子组件中使用 effect 钩子。

### NativeSelect

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<NativeSelect classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<NativeSelect classes={{ select: 'class1 class2 class3' }} />
  ```

### OutlinedInput

- Remove the `labelWidth` prop. Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined.

  ```diff
  -<OutlinedInput labelWidth={20} />
  +<OutlinedInput label="First Name" />
  ```

### Paper

- Change the background opacity based on the elevation in dark mode. This change was done to follow the Material Design guidelines. You can revert it in the theme: This change was done to follow the Material Design guidelines. You can revert it in the theme:

  ```diff
  const theme = createTheme({
    components: {
      MuiPaper: {
  +     styleOverrides: { root: { backgroundImage: 'unset' } },
      },
    },
  });
  ```

### Snackbar（消息条）

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Pagination from '@material-ui/lab/Pagination';
  >   -import PaginationItem from '@material-ui/lab/PaginationItem';
  >   -import { usePagination } from '@material-ui/lab/Pagination';
  >   +import Pagination from '@material-ui/core/Pagination';
  >   +import PaginationItem from '@material-ui/core/PaginationItem';
  >   +import usePagination from '@material-ui/core/usePagination';
  > ```

- Rename `round` to `circular` for consistency:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Pagination shape="round">
  >   -<PaginationItem shape="round">
  >   +<Pagination shape="circular">
  >   +<PaginationItem shape="circular">
  > ```

### Popover

- onE\* 过渡属性已被删除。 请使用 TransitionProps 来代替它。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Popover
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >   />
  > ```

- The `getContentAnchorEl` prop was removed to simplify the positioning logic.

### Popper

- 我们将 [Popper.js](https://github.com/popperjs/popper-core) 从 v1 升级到 v2。 <br /> 你可以阅读 [他们的迁移指南](https://popper.js.org/docs/v2/migration-guide/) 或参考以下摘要：

  - CSS 前缀已更改：
    ```diff
    popper: {
      zIndex: 1,
    - '&[x-placement*="bottom"] $arrow': {
    + '&[data-popper-placement*="bottom"] $arrow': {
    ```
  - Method names have changed:

    ```diff
    -popperRef.current.scheduleUpdate()
    +popperRef.current.update()
    ```

    ```diff
    -popperRef.current.update()
    +popperRef.current.forceUpdate()
    ```

  - 修改器的 API（Modifiers' API）发生了大量改变。 这其中有太多的内容不能涵盖说明。

### Portal

- 移除 `onRendered` 属性。 具体迁移方法根据你的使用情况而定，你可以在子元素上使用 [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)，也可以在子组件中使用 effect 钩子。

### Switch 开关

- The radio color prop is now "primary" by default. The radio color prop is now "primary" by default. To continue using the "secondary" color, you must explicitly indicate `secondary`. This brings the radio closer to the Material Design guidelines. This brings the radio closer to the Material Design guidelines.

  ```diff
  -<Radio />
  +<Radio color="secondary />
  ```

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### Rating 评分

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Rating from '@material-ui/lab/Rating';
  >   +import Rating from '@material-ui/core/Rating';
  > ```

- 为提高无障碍的可访问性，我们更改了默认的空图标。 如果你有自定义了 `icon` 属性，但没有使用 `emptyIcon` 属性，你可以用以下方法还原到以前的行为：

  ```diff
   <Rating
    icon={customIcon}
  + emptyIcon={null}
  />
  ```

- 为保持一致性，我们将 `visuallyhidden` 重命名为 `visuallyHidden`：

  ```diff
   <Rating
    classes={{
  -    visuallyhidden: 'custom-visually-hidden-classname',
  +    visuallyHidden: 'custom-visually-hidden-classname',
    }}
  />
  ```

### RootRef

- 该组件已被移除。 你可以通过 `ref` 属性来获取对我们组件的底层 DOM 节点的引用。 该组件依赖 [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode)，在 [`React.StrictMode`  中已被弃用](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying fake `RootRef` component to prevent application crash, further fixes are required. 
  > 
  > ```diff
  >   -<RootRef rootRef={ref}>
  >   -  <Button />
  >   -</RootRef>
  >   +<Button ref={ref} />
  > ```

### Select 选择属性

- 将默认的变量从 `standard` 更改为 `outlined`。 Standard has been removed from the Material Design guidelines. If you are composing the Select with a form control component, you only need to update `FormControl`, the select inherits the variant from its context. If you are composing the Select with a form control component, you only need to update `FormControl`, the select inherits the variant from its context.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<Select value="Standard" />
  >   -<Select value="Outlined" variant="outlined" />
  >   +<Select value="Standard" variant="standard" />
  >   +<Select value="Outlined" />
  > ```

- Remove the `labelWidth` prop. Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined. The TextField already handles it by default.

  ```diff
  -<Select variant="outlined" labelWidth={20} />
  +<Select variant="outlined" label="Gender" />
  ```

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<Select classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<Select classes={{ select: 'class1 class2 class3' }} />
  ```

- TypeScript：`onChange` 中的 `event` 的类型不再是 `React.ChangeEvent`，而是`React.SyntheticEvent`。

  ```diff
  -<Slider onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

  Remove the second argument from `onChange`. You can pull out the checked state by accessing `event.target.checked`.

### Skeleton 骨架屏

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Skeleton from '@mui/lab/Skeleton';
  >   +import Skeleton from '@mui/material/Skeleton';
  > ```

- Rename `circle` to `circular` and `rect` to `rectangular` for consistency:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Skeleton variant="circle" />
  >   -<Skeleton variant="rect" />
  >   -<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
  >   +<Skeleton variant="circular" />
  >   +<Skeleton variant="rectangular" />
  >   +<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
  > ```

### Slider 滑块控件

- The `event` in `onChange` is now a synthetic, native `Event`, not a React event.

  ```diff
  -<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  +<Slider onChange={(event: Event, value: unknown) => {}} />
  ```

  Remove the second argument from `onChange`. You can pull out the checked state by accessing `event.target.checked`.

- The `ValueLabelComponent` and `ThumbComponent` prop is now part of the `components` prop.

  ```diff
   <Slider
  -  ValueLabelComponent={CustomValueLabel}
  -  ThumbComponent={CustomThumb}
  +  components={{
  +    ValueLabel: CustomValueLabel,
  +    Thumb: CustomThumb,
  +  }}
  />
  ```

- Rework the CSS to match the latest [Material Design guidelines](https://material.io/components/sliders) and make custom styles more intuitive. [See documentation](/components/slider/). [See documentation](/components/slider/). <a href="/components/slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

  You can reduce the density of the slider, closer to v4 with the [`size="small"` prop](/components/slider/#sizes).

### Snackbar（消息条）

- 现在在大屏幕上的消息条通知会在左下角显示。 这更符合 Gmail、Google Keep、material.io 等应用的行为。 你可以用以下方法恢复到以前的行为：

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- onE\* 过渡属性已被删除。 请使用 TransitionProps 来代替它。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Snackbar
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >    >
  > ```

### 文字铸排

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import SpeedDial from '@material-ui/lab/SpeedDial';
  >   -import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
  >   -import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
  >   +import SpeedDial from '@material-ui/core/SpeedDial';
  >   +import SpeedDialAction from '@material-ui/core/SpeedDialAction';
  >   +import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
  > ```

### Stepper 步骤条组件

- 根组件（Paper）已经被 div 所取代。 Stepper 不再有立体效果，也不再继承 Paper 的属性。 这个改动是为了鼓励开发者进行组合使用。

  ```diff
  -import { withTheme } from '@material-ui/core/styles';
  +import { withTheme } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const theme = createTheme();
   const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

   function App(props) {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
   }
  ```

- Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component.

  ```diff
  import * as React from 'react';
  import { withTheme  } from '@material-ui/core/styles';

  const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

  function MyOtherComponent(props) {
    const ref = React.useRef();
  - return <MyComponent innerRef={ref} />;
  + return <MyComponent ref={ref} />;
  }
  ```

### SvgIcon（Svg 图标）

- The default value of `fontSize` was changed from `default` to `medium` for consistency. The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikey event that you were using the value `default`, the prop can be removed:

  ```diff
  -<SvgIcon fontSize="default">
  +<SvgIcon>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
  ```

### ToggleButton 切换按钮

- Deprecate the second argument from `onChange`. Remove the second argument from `onChange`. You can pull out the checked state by accessing `event.target.checked`.

  ```diff
  function MySwitch() {
  - const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
  + const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  +   const checked = event.target.checked;
    };

    return <Switch onChange={handleChange} />;
  }
  ```

- The switch color prop is now "primary" by default. To continue using the "secondary" color, you must explicitly indicate `secondary`. This brings the switch closer to the Material Design guidelines. The radio color prop is now "primary" by default. To continue using the "secondary" color, you must explicitly indicate `secondary`. This brings the radio closer to the Material Design guidelines. This brings the switch closer to the Material Design guidelines.

  ```diff
  -<Switch />
  +<Switch color="secondary" />
  ```

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
   <span class="MuiSwitch-root">
  -   <span class="MuiIconButton-root MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  -     <span class="MuiIconButton-label">
  -       <input class="MuiSwitch-input PrivateSwitchBase-input">
  +   <span class="MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  +     <span class="MuiSwitch-input PrivateSwitchBase-input">
  ```

### Table 表格

- Rename the `default` value of the `padding` prop to `normal`.

  ```diff
  -<Table padding="default" />
  -<TableCell padding="default" />
  +<Table padding="normal" />
  +<TableCell padding="normal" />
  ```

### 分页组件 Pagination

- 如果你需要自定义表格分页的操作标签（actions labels），那么就必须使用 `getItemAriaLabel` 属性。 这是为了与 `Pagination` 组件保持一致。

  ```diff
   <TablePagination
  - backIconButtonText="Avant"
  - nextIconButtonText="Après"
  + getItemAriaLabel={…}
  ```

- 为保持 API 一致性，我们将 `onChangeRowsPerPage` 重命名为 `onRowsPerPageChange`，`onChangePage` 重命名为 `onPageChange`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <TablePagination
  >   - onChangeRowsPerPage={()=>{}}
  >   - onChangePage={()=>{}}
  >   + onRowsPerPageChange={()=>{}}
  >   + onPageChange={()=>{}}
  > ```

- Separate classes for different table pagination labels. This allows simpler customizations. This allows simpler customizations.

  ```diff
   <TablePagination
  - classes={{ caption: 'foo' }}
  + classes={{ selectLabel: 'foo', displayedRows: 'foo' }}
  />
  ```

- Move the custom class on `input` to `select`. The `input` key is being applied on another element. The `input` key is being applied on another element.

  ```diff
   <TablePagination
  - classes={{ input: 'foo' }}
  + classes={{ select: 'foo' }}
  />
  ```

### Tabs 选项卡

- Change the default `indicatorColor` and `textColor` prop values to "primary". This is done to match the most common use cases with Material Design. This is done to match the most common use cases with Material Design.

  ```diff
  -<Tabs />
  +<Tabs indicatorColor="primary" textColor="inherit" />
  ```

- TypeScript：`onChange` 中的 `event` 的类型不再是 `React.ChangeEvent`，而是`React.SyntheticEvent`。

  ```diff
  -<Tabs onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

- 控制滚动按钮的 API 现已将其分成两个属性。

  - `scrollButtons` 属性根据可用空间来控制滚动按钮何时显示。
  - `allowScrollButtonsMobile` 属性将会移除系统针对隐藏移动端的滚动按钮的 CSS 媒体查询。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Tabs scrollButtons="on" />
  >   -<Tabs scrollButtons="desktop" />
  >   -<Tabs scrollButtons="off" />
  >   +<Tabs scrollButtons allowScrollButtonsMobile />
  >   +<Tabs scrollButtons />
  >   +<Tabs scrollButtons={false} />
  > ```

### Tab

- Tab `minWidth` changed from `72px` => `90px` (without media-query) according to [material-design spec](https://material.io/components/tabs#specs)
- Tab `maxWidth` changed from `264px` => `360px` according to [material-design spec](https://material.io/components/tabs#specs)
- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666). `wrapper` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26926).

  ```diff
   <button class="MuiTab-root">
  -  <span class="MuiTab-wrapper">
       {icon}
       {label}
  -  </span>
   </button>
  ```

### TextField

- 将默认的变量从 `standard` 更改为 `outlined`。 Standard has been removed from the Material Design guidelines. If you are composing the Select with a form control component, you only need to update `FormControl`, the select inherits the variant from its context.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<TextField value="Standard" />
  >   -<TextField value="Outlined" variant="outlined" />
  >   +<TextField value="Standard" variant="standard" />
  >   +<TextField value="Outlined" />
  > ```

- 为保持与 HTML 属性的一致性，我们将 `rowsMax` 属性重命名为 `maxRows`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextField rowsMax={6}>
  >   +<TextField maxRows={6}>
  > ```

- 最佳实践是将固定文本区域高度行为与动态文本区域高度行为分开。 要达到此效果，你需要像下面的示例一样使用 `minRows` 属性：

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextField rows={2} maxRows={5} />
  >   +<TextField minRows={2} maxRows={5} />
  > ```

- 改变自定义 `inputComponent` 组件的的 ref 转发期望值。 该组件应该转发 `ref` 属性，而不是 `inputRef` 属性。

  ```diff
  -function NumberFormatCustom(props) {
  -  const { inputRef, onChange, ...other } = props;
  +const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  +  props,
  +  ref,
  +) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
  -     getInputRef={inputRef}
  +     getInputRef={ref}
  ```

- 为了匹配属性，我们将 `marginDense` 和 `inputMarginDense` 类名重命名为 `sizeSmall` 和 `inputSizeSmall`。

  ```diff
  -<Input margin="dense" />
  +<Input size="small" />
  ```

- Set the InputAdornment `position` prop to `start` or `end`. Use `start` if used as the value of the `startAdornment` prop. Use `end` if used as the value of the `endAdornment` prop. Use `start` if used as the value of the `startAdornment` prop. Use `end` if used as the value of the `endAdornment` prop.

  ```diff
  -<TextField startAdornment={<InputAdornment>Kg</InputAdornment>} />
  -<TextField endAdornment={<InputAdornment>Kg</InputAdornment>} />
  +<TextField startAdornment={<InputAdornment position="start">Kg</InputAdornment>} />
  +<TextField endAdornment={<InputAdornment position="end">Kg</InputAdornment>} />
  ```

### TextareaAutosize

- 我们移除了 `rows` 属性，你需要使用 `minRows` 属性来代替它。 这一变化旨在明确该属性的行为。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextareaAutosize rows={2} />
  >   +<TextareaAutosize minRows={2} />
  > ```

- 为保持与 HTML 属性的一致性，我们将 `rowsMax` 属性重命名为 `maxRows`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextareAutosize rowsMax={6}>
  >   +<TextareAutosize maxRows={6}>
  > ```

- 为保持与 HTML 属性的一致性，我们将 `rowsMin` 属性重命名为 `minRows`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextareAutosize rowsMin={1}>
  >   +<TextareAutosize minRows={1}>
  > ```

### ToggleButton 切换按钮

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import ToggleButton from '@mui/lab/ToggleButton';
  >   -import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
  >   +import ToggleButton from '@mui/material/ToggleButton';
  >   +import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666). `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/27111).

  ```diff
   <code>span</code> element that wraps children has been removed. <code>label</code> classKey is also removed. More details about <a href="https://github.com/mui-org/material-ui/pull/26666">this change</a>.
  ```
 element that wraps children has been removed. label classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).
  </code>

### Tooltip

- 工具提示组件默认是可交互的：

  该组件之前的默认行为不遵循 [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)。 为了反映新的默认值，该属性被重命名为 `disableInteractive`。 如果你想回滚到旧的行为（但是这无法达到 AA 级），你可以应用下面的差异：

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>

  # 交互式的工具提示组件不再需要 `interactive` 属性。
  -<Tooltip interactive>
  +<Tooltip>
  ```

### 文字铸排

- Remove the `srOnly` variant. Remove the `srOnly` variant. You can use the `visuallyHidden` utility in conjunction with the `sx` prop instead.

  ```diff
  +import { visuallyHidden } from '@material-ui/utils';

  -<Typography variant="srOnly">Create a user</Typography>
  +<span style={visuallyHidden}>Create a user</span>
  ```

- The following `classes` and style overrides keys were removed: "colorInherit", "colorPrimary", "colorSecondary", "colorTextPrimary", "colorTextSecondary", "colorError", "displayInline" and "displayBlock". These props are now considered part of the system, not on the `Typography` component itself. If you still wish to add overrides for them, you can use the `theme.components.MuiTypography.variants` options. For example These props are now considered part of the system, not on the `Typography` component itself. If you still wish to add overrides for them, you can use the `theme.components.MuiTypography.variants` options. 例如

  ```diff
  const theme = createTheme({
    components: {
      MuiTypography: {
  -     styleOverrides: {
  -       colorSecondary: {
  -         marginTop: '20px',
  -       },
  -     },
  +     variants: {
  +       props: { color: "secondary" },
  +       style: {
  +         marginTop: '20px',
  +       },
  +     }],
      },
    },
  });
  ```

### 主题

- 默认的背景色在日间模式下为 `#fff`，夜间模式下为 `#121212` ， 以符合 Material Design 指导方针。
- Breakpoints are now treated as values instead of [ranges](https://v4.material-ui.com/customization/breakpoints/#default-breakpoints). The behavior of `down(key)` was changed to define a media query below the value defined by the corresponding breakpoint (exclusive), rather than the breakpoint above. `between(start, end)` was also updated to define a media query for the values between the actual values of start (inclusive) and end (exclusive). 当使用 `down()`断点工具集时，你需要向上一步更新断点键。 `down(key)` 的行为已更改为定义一个小于对应断点值的媒体查询。 `between(start, end)` 也被更新为定义一个包含开始值、不包含结束值的媒体查询。 当使用 `down()`断点工具集时，你需要向上一步更新断点键。 当使用  `between(start, end)` 时，结束断点也应向上一步更新。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

  Here are some examples of the changes required:

  ```diff
  -theme.breakpoints.down('sm') // '@media (max-width:959.95px)' - [0, sm + 1) => [0, md)
  +theme.breakpoints.down('md') // '@media (max-width:959.95px)' - [0, md)
  ```

  ```diff
  -theme.breakpoints.between('sm', 'md') // '@media (min-width:600px) and (max-width:1279.95px)' - [sm, md + 1) => [0, lg)
  +theme.breakpoints.between('sm', 'lg') // '@media (min-width:600px) and (max-width:1279.95px)' - [0, lg)
  ```

  ```diff
  -theme.breakpoints.between('sm', 'xl') // '@media (min-width:600px)'
  +theme.breakpoints.up('sm') // '@media (min-width:600px)'
  ```

  The same should be done when using the `Hidden` component:

  ```diff
  -<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
  +<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
  ```

- The default breakpoints were changed to better match the common use cases. They also better match the Material Design guidelines. [Read more about the change](https://github.com/mui-org/material-ui/issues/21902) They also better match the Material Design guidelines. [Read more about the change](https://github.com/mui-org/material-ui/issues/21902)

  ```diff
  {
    xs: 0,
    sm: 600,
  - md: 960,
  + md: 900,
  - lg: 1280,
  + lg: 1200,
  - xl: 1920,
  + xl: 1536,
  }
  ```

  If you prefer the old breakpoint values, use the snippet below.

  ```js
  -import withMobileDialog from '@material-ui/core/withMobileDialog';
  +import { useTheme, useMediaQuery } from '@material-ui/core';

  function ResponsiveDialog(props) {
  - const { fullScreen } = props;
  + const theme = useTheme();
  + const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

  // ...

  -export default withMobileDialog()(ResponsiveDialog);
  +export default ResponsiveDialog;
  ```

* The `theme.breakpoints.width` utility was removed because it's redundant. Use `theme.breakpoints.values` to get the same values. Use `theme.breakpoints.values` to get the same values.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -theme.breakpoints.width('md')
  >   +theme.breakpoints.values.md
  > ```

* The `theme.typography.round` helper was removed because it was no longer used. If you need it, use the function below:

  ```diff
  -theme.palette.augmentColor(red);
  +theme.palette.augmentColor({ color: red, name: 'brand' });
  ```

* The `theme.typography.round` helper was removed because it was no longer used. If you need it, use the function below: If you need it, use the function below:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```js
  >   function round(value) {
  >     return Math.round(value * 1e5) / 1e5;
  >   }
  > ```

### `@material-ui/styles`

- Rename the exported `Omit` type in `@mui/types`. The module is now called `DistributiveOmit`. The change removes the confusion with the built-in `Omit` helper introduced in TypeScript v3.5. The built-in `Omit`, while similar, is non-distributive. This leads to differences when applied to union types. [See this StackOverflow answer for further details](https://stackoverflow.com/a/57103940/1009797).

  ```diff
  -import { Omit } from '@mui/types';
  +import { DistributiveOmit } from '@mui/types';
  ```

## 为了能实现更平滑的过渡，`adaptV4Theme` 助手允许你迭代升级到新的主题结构。

Although your style overrides defined in the theme may partially work, there is an important difference on how the nested elements are styled. The `$` syntax used with JSS will not work with Emotion. You need to replace those selectors with a valid class selector.

### Replace state class names

```diff
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
-         '&$focused': {
+         '&.Mui-focused': {
            borderWidth: 1,
          }
        }
      }
    }
  }
});
```

### Replace nested classes selectors with global class names

```diff
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
-         '& $notchedOutline': {
+         '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
          }
        }
      }
    }
  }
});
```

> Note: For each component we export a `[component]Classes` constant that contains all nested classes for that component. You can rely on this instead of hardcoding the classes.

```diff
The <code>StylesProvider</code> component is no longer exported from <code>@material-ui/core/styles</code>. You should import it directly from <code>@material-ui/styles</code>.
```
 component is no longer exported from @material-ui/core/styles. You should import it directly from @material-ui/styles.
</code>

Take a look at the whole [list of global state classnames](/customization/how-to-customize/#state-classes) available.

## Migrate from JSS

This is the last step in the migration process to remove `@mui/styles` package from your codebase. We can use one of these two options, by order of preference:

### 1. Use `styled` or `sx` API

#### Codemod

你可以使用 [`moved-lab-modules` 编码器（codemod）](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules)来进行自动迁移。

```sh
npx @mui/codemod v5.0.0/jss-to-styled <path>
```

**Example transformation**:

```diff
 import Typography from '@mui/material/Typography';
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  root: {
-    display: 'flex',
-    alignItems: 'center',
-    backgroundColor: theme.palette.primary.main
-  },
-  cta: {
-    borderRadius: theme.shape.radius
-  },
-  content: {
-    color: theme.palette.common.white,
-    fontSize: 16,
-    lineHeight: 1.7
-  },
-}))
+const PREFIX = 'MyCard';
+const classes = {
+  root: `${PREFIX}-root`,
+  cta: `${PREFIX}-cta`,
+  content: `${PREFIX}-content`,
+}
+const Root = styled('div')(({ theme }) => ({
+  [`&.${classes.root}`]: {
+    display: 'flex',
+    alignItems: 'center',
+    backgroundColor: theme.palette.primary.main
+  },
+  [`& .${classes.cta}`]: {
+    borderRadius: theme.shape.radius
+  },
+  [`& .${classes.content}`]: {
+    color: theme.palette.common.white,
+    fontSize: 16,
+    lineHeight: 1.7
+  },
+}))

 export const MyCard = () => {
-  const classes = useStyles();
   return (
-    <div className={classes.root}>
+    <Root className={classes.root}>
       {/* The benefit of this approach is that the code inside Root stays the same. */}
       <Typography className={classes.content}>...</Typography>
       <Button className={classes.cta}>Go</Button>
-    </div>
+    </Root>
   )
 }
```

> 💡 You should run this codemod per small chunk of files and then check the changes because in some cases you might need to adjust the code after the transformation (this codemod won't cover all of the cases).

We recommend `sx` API over `styled` when you have to create responsive styles or needs minor CSS overrides. [Read more about `sx`](/system/the-sx-prop/#main-content).

```diff
 import Chip from '@mui/material/Chip';
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  wrapper: {
-    display: 'flex',
-  },
-  chip: {
-    padding: theme.spacing(1, 1.5),
-    boxShadow: theme.shadows[1],
-  }
-}))
+const Root = styled('div')({
+  display: 'flex',
+})

 function App() {
-  const classes = useStyles();
   return (
-    <div>
-      <Chip className={classes.chip} label="Chip" />
-    </div>
+    <Root>
+      <Chip label="Chip" sx={{ py: 1, px: 1.5, boxShadow: 1 }} />
+    </Root>
   )
 }
```

#### Manual

In some cases, you might want to create multiple styled components in a file instead of increasing CSS specificity. for example:

```diff
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  root: {
-    display: 'flex',
-    alignItems: 'center',
-    borderRadius: 20,
-    background: theme.palette.grey[50],
-  },
-  label: {
-    color: theme.palette.primary.main,
-  }
-}))
+const Root = styled('div')(({ theme }) => ({
+  display: 'flex',
+  alignItems: 'center',
+  borderRadius: 20,
+  background: theme.palette.grey[50],
+}))

+const Label = styled('span')(({ theme }) => ({
+  color: theme.palette.primary.main,
+}))

 function Status({ label }) {
-  const classes = useStyles();
   return (
-    <div className={classes.root}>
-      {icon}
-      <span className={classes.label}>{label}</span>
-    </div>
+    <Root>
+      {icon}
+      <Label>{label}</Label>
+    </Root>
   )
 }
```

> **Note:** [https://siriwatk.dev/tool/jss-to-styled](https://siriwatk.dev/tool/jss-to-styled) is a tool that helps converting JSS to multiple styled components without increasing CSS specificity. (This tool is **not maintained** by MUI)

### 2. Use [tss-react](https://github.com/garronej/tss-react)

The API is similar to JSS `makeStyles` but works with emotion.

  <!-- Add material-ui component migration example -->

> **Note:** this library is **not maintained** by MUI. If you have any issue regarding to it, please open an issue in [tss-react repository](https://github.com/garronej/tss-react/issues/new).

💡 Once you migrate all of the styling, remove unnecessary `@mui/styles` by

```sh
npm uninstall @mui/styles

// or with `yarn`
yarn remove @mui/styles
```

## 故障排除（Troubleshooting）

### Storybook emotion with v5

If your project uses Storybook v6.x, you will need to update `.storybook/main.js` webpack config to use the most recent version of emotion.

```js
// .storybook/main.js

const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    };
  },
};
```

and update `.storybook/preview.js` (otherwise, the "Docs" tab in storybook will display empty page)

```js
// .storybook/preview.js

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';

const defaultTheme = createTheme(); // or your custom theme

const withThemeProvider = (Story, context) => {
  return (
    <Emotion10ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <Story {...context} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

// ...other storybook exports
```

**Tested versions**

```json
{
  "@storybook/react": "6.3.8",
  "@storybook/addon-docs": "6.3.8",
  "@emotion/react": "11.4.1",
  "@emotion/styled": "11.3.0",
  "@mui/material": "5.0.2"
}
```

> Note: This setup is a workaround and might not work in all cases.

For more details, checkout these issues on GitHub.

- https://github.com/storybookjs/storybook/issues/16099
- The `styled` JSS utility is no longer exported from `@material-ui/core/styles`. You can use `@material-ui/styles/styled` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@material-ui/core`, it's recommended you use the `ThemeProvider` component from `@material-ui/core/styles` instead.

### Cannot read property `scrollTop` of null

This error comes from `Fade`, `Grow`, `Slide`, `Zoom` components due to missing DOM Node.

You need to make sure that the children forward ref to DOM for custom component.

```jsx
// Ex. 1 ✅ html tag works since it is a DOM
<Fade in>
  <div>
    <CustomComponent />
  </div>
</Fade>

// Ex. 2 ❌ This will cause error. don't use Fragment as a child
<Fade in>
  <React.Fragment>
    <CustomComponent />
  </React.Fragment>
</Fade>;

// Ex. 3 ❌ This will cause error because `CustomComponent` does not forward ref to DOM
function CustomComponent() {
  return <div>...</div>;
}

<Fade in>
  <CustomComponent />
</Fade>;
```

```js
// ✅ Fixed by using `React.forwardRef` and pass to DOM.
const CustomComponent = React.forwardRef(function CustomComponent(props, ref) {
  return (
    <div ref={ref}>
      ...
    </div>
  )
})

<Fade in>
  <CustomComponent />
</Fade>
```

`span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

### [Types] Property "palette", "spacing" does not exist on type 'DefaultTheme'

Since `makeStyles` is now exported from `@mui/styles` package which does not know about `Theme` in the core package. To fix this, you need to augment the `DefaultTheme` (empty object) in `@mui/styles` with `Theme` from the core. [Read more about module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)

**TypeScript Project**

Put this snippet to your theme file:

```ts
The <code>withStyles</code> JSS utility is no longer exported from <code>@material-ui/core/styles</code>. You can use <code>@material-ui/styles/withStyles</code> instead. Make sure to add a <code>ThemeProvider</code> at the root of your application, as the <code>defaultTheme</code> is no longer available. If you are using this utility together with <code>@material-ui/core</code>, you should use the <code>ThemeProvider</code> component from <code>@material-ui/core/styles</code> instead.
```
 JSS utility is no longer exported from @material-ui/core/styles. You can use @material-ui/styles/withStyles instead. Make sure to add a ThemeProvider at the root of your application, as the defaultTheme is no longer available. If you are using this utility together with @material-ui/core, you should use the ThemeProvider component from @material-ui/core/styles instead.
</code>

**Javascript Project**

If your IDE (ex. VSCode) is able to infer types from `d.ts` file, create `index.d.ts` in your `src` folder with this snippet:

```js
The <code>makeStyles</code> JSS utility is no longer exported from <code>@material-ui/core/styles</code>. You can use <code>@material-ui/styles/makeStyles</code> instead. Make sure to add a <code>ThemeProvider</code> at the root of your application, as the <code>defaultTheme</code> is no longer available. If you are using this utility together with <code>@material-ui/core</code>, it's recommended you use the <code>ThemeProvider</code> component from <code>@material-ui/core/styles</code> instead.
```
 JSS utility is no longer exported from @material-ui/core/styles. You can use @material-ui/styles/makeStyles instead. Make sure to add a ThemeProvider at the root of your application, as the defaultTheme is no longer available. If you are using this utility together with @material-ui/core, it's recommended you use the ThemeProvider component from @material-ui/core/styles instead.
</code>

### [Jest] SyntaxError: Unexpected token 'export'

`@mui/material/colors/red` is considered private since v1.0.0. You should replace the import, [more details about this error](https://github.com/mui-org/material-ui/issues/27296).

You can use this codemod (**recommended**) to fix all the import in your project:

```sh
npx @mui/codemod v5.0.0/optimal-imports <path>
```

or fix it manually like this:

```diff
-import red from '@mui/material/colors/red';
+import { red } from '@mui/material/colors';
```

### makeStyles - TypeError: Cannot read property 'drawer' of undefined

This error occurs when calling `useStyles` (result of `makeStyles`) or `withStyles` outside of `<ThemeProvider>` scope like this:

```js
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const theme = createTheme();

function App() {
  const classes = useStyles(); // ❌ called outside of ThemeProvider
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Card className={classes.root}>...</Card>
    </ThemeProvider>
  );
}

export default App;
```

The component was migrated to use the `@material-ui/styled-engine` (`emotion` or `styled-components`) instead of `jss`. You should remove the `@global` key when defining the style overrides for it. You should remove the `@global` key when defining the style overrides for it. You could also start using the CSS template syntax over the JavaScript object syntax.

```js
// ...imports

function AppContent(props) {
  const classes = useStyles(); // ✅ This is safe because it is called inside ThemeProvider
  return <Card className={classes.root}>...</Card>;
}

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent {...props} />
    </ThemeProvider>
  );
}

export default App;
```

### TypeError: Cannot read properties of undefined (reading 'pxToRem')

The root cause of this error comes from accessing empty theme. Make sure that you have follow these checklist:

- The `ServerStyleSheets` component is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

  ```js
  import { styled } from '@mui/material/styles';
  ```

- Make sure that no `useStyles` is called outside of `<ThemeProvider>`. If you have, consider fixing it like [this suggestion](#makestyles-typeerror-cannot-read-property-drawer-of-undefined)

The default breakpoints were changed to better match the common use cases. They also better match the Material Design guidelines. [Read more about the change](https://github.com/mui-org/material-ui/issues/21902)

### Styles broken after migrating to v5

There are two reasons why the styles of the components may be broken after you finished with all the steps in the previous sections.

First, check if you have configured the `StyledEngineProvider` correct as shown in the [Style library](#style-library) section.

If the `StyledEngineProvider` is already used at the top of your application and the styles are still broken, it may be the case that you still have `@material-ui/core` in your application. It may be coming from some of the dependencies that you have, that still depend on `@material-ui/core` (v4).

The `createStyles` function from `@material-ui/core/styles` was moved to the one exported from `@material-ui/styles`. It is necessary for removing the dependency to `@material-ui/styles` in the core package.

Here is one example:

```sh
$ npm ls @material-ui/core
project@0.1.0 /path/to/project
└─┬  @mui/x-data-grid@4.0.0
  └── @material-ui/core@4.12.3
```

You can notice based on the output above that `@material-ui/core` is a dependency of `@mui/x-data-grid`. In this specific example, you need to bump the version of `@mui/x-data-grid` to [version 5](https://www.npmjs.com/package/@mui/x-data-grid) so that it depends on `@mui/material` instead.
