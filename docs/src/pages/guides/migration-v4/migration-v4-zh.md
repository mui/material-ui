# 从 v4 迁移到 v5 版本

<p class="description">是的，我们已经发布了 v5 版本！</p>

如果你在寻找v4版本的文档，可以在这里 [查看最近版本](https://mui.com/versions/)。

## Introduction

这是一个将您的网站从MUI core v4版本升级到v5版本的参考。 您可能不需要将本篇文章涵盖的所有内容运用到你的站点上。 我们将尽最大努力使文档易于理解，并尽可能有序地向您介绍，以便您可以快速上手 v5！

## Why you should migrate

能够获得对之前版本bug的修复，并增加了很多改进：如使用了新的样式引擎。 这个文档包含 **如何**将v4版本迁移到v5版。 关于迁移的**原因**，我们 [发布了一篇博客](/blog/mui-core-v5/)来详细解说。

## 迁移步骤

- [更新 React & TypeScript](#update-react-amp-typescript-version)
- [安装 ThemeProvider](#themeprovider-setup)
- [更新 MUI](#update-material-ui-version)
- [运行代码模块（codemods）](#run-codemods)
  - [preset-safe](#preset-safe)
  - [variant-prop (可选)](#variant-prop)
  - [link-underline-hover (可选)](#link-underline-hover)
- [处理重大变更](#handling-breaking-changes)
- [将theme的 `styleOverrides`迁移至emotion](#migrate-themes-styleoverrides-to-emotion)
- [从 JSS 迁移](#migrate-from-jss)
- [CSS 特性](#css-specificity)
- [Troubleshooting](#troubleshooting)

> 💡 目标是创建最小的更改，使迁移更顺利。 如果您遇到任何问题，请查看 [疑难解答](#troubleshooting) 章节。 对于其它没有在此文档描述的错误，请以此格式`[Migration] Summary of your issue`[创建问题](https://github.com/mui-org/material-ui/issues/new?assignees=&labels=status%3A+needs+triage&template=1.bug.yml)。

## 更新 React & TypeScript 版本

- 支持**React**的最低版本从 v16.8.0 提高至 v17.0.0。
- 支持**TypeScript** 的最低版本从 v3.2 提高至 v3.5.

  > 我们尝试尽可能的与发布在 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 中的类型保持一致（如：发布于npm中`@types`命名空间内的包）。 我们不会在主要版本的MUI中更改支持的最低版本。 然而，我们通常建议不要使用低于 [DefinitelyTyped支持的最低版本](https://github.com/DefinitelyTyped/DefinitelyTyped#older-versions-of-typescript-33-and-earlier)的TypeScript 版本。

**注意：** 如果您的项目包含以下包，请将它们升级到`最新`版本。

- `react-scripts`
- `@types/react`
- `@types/react-dom`

> 📝 请确保在继续下一步之前您的应用能够 **正常运行**没有报错并且 **应用了** 更改。

## 安装 `ThemeProvider`

在升级到v5前，请确保 `ThemeProvider` 应用在您程序的根节点（即使您正在使用**default theme**）并且在`<ThemeProvider>`之前**没有**调用`useStyles`。 这是因为我们将要使用 `@mui/styles` **临时的** (JSS style-engine), 他需要使用 `ThemeProvider`。

```js
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // 一些能够访问到theme的CSS代码
  }
});

function App() {
  const classes = useStyles(); // ❌ 如果您用到这段代码，请考虑将它移动到包裹在<ThemeProvider>的组件内，
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

> 📝 在进行下一步前，请确保您的程序仍然可以正确**运行**没有报错并且已经**应用了**更改。

## 升级 MUI 版本

为了使用 `v5` 版本的 MUI Core，您首选需要升级下面的软件包：

```sh
npm install @mui/material @mui/styles

// or with `yarn`
yarn add @mui/material @mui/styles
```

**可选**：如果您使用了下面的软件包，单独安装新的软件包：

- `@material-ui/lab`，对应 `@mui/lab`
- `@material-ui/icons`，对应 `@mui/icons-material`

<details>
<summary>查看所有软件包更改</summary>

```text
@material-ui/core -> @mui/material
@material-ui/system -> @mui/system
@material-ui/unstyled -> @mui/base
@material-ui/styles -> @mui/styles
@material-ui/icons -> @mui/icons-material
@material-ui/lab -> @mui/lab
@material-ui/types -> @mui/types
@material-ui/styled-engine -> @mui/styled-engine
@material-ui/styled-engine-sc ->@mui/styled-engine-sc
@material-ui/private-theming -> @mui/private-theming
@material-ui/codemod -> @mui/codemod
@material-ui/docs -> @mui/docs
@material-ui/envinfo -> @mui/envinfo
```

作为品牌重塑工作的一部分，组织名和程序包名称已经从`@material-ui` 变更为 [`@mui`](https://www.npmjs.com/org/mui)。 您可以在这里[blog post](/blog/material-ui-is-now-mui/) 或者这里 [#27803](https://github.com/mui-org/material-ui/discussions/27803)查看更多细节。

</details>

然后，您需要添加新的对等依赖 - emotion 软件包：

```sh
npm install @emotion/react @emotion/styled

// or with `yarn`
yarn add @emotion/react @emotion/styled
```

> 💡 如果您想要使用 MUI Core v5 的同时使用 **styled-components** 而不是 emotion，请查看[安装指引](/getting-started/installation/#npm)。

如果您使用 `@material-ui/pickers`，必须将其迁移到 `@mui/lab`。 您可以参考 [这些步骤](#material-ui-pickers)。

至此，您应该已经安装了 `@mui/styles` 。 它包含与emotion冗余的JSS， 这意味着您可以渐进式地升级到v5。 您可以依照[这些步骤](#migrate-from-jss)移除依赖。

> 📝 Please make sure that your application is still **running** without errors and **commit** the change before continuing the next step.

一旦您的应用完全迁移到MUI v5，您可以通过执行 `yarn remove` 或者 `npm uninstall` 移除旧的`@material-ui/*`软件包。

## 运行codemods

我们准备了一些codemods，提高您的迁移体验。

### preset-safe

这个codemods包含了大部分的有助于迁移的转换器。 （**这个codemod在每个目录下仅应当应用一次**）

```sh
npx @mui/codemod v5.0.0/preset-safe <path>
```

> 如果您想逐一运行此转换器，请查看这个文档 [preset-safe codemod](https://github.com/mui-org/material-ui/blob/master/packages/mui-codemod/README.md#-preset-safe) 。

### variant-prop

如果`<TextField/>, <FormControl/>, <Select/>` 这些组件没有定义variant属性，则需要应用 `variant="standard"` （因为属性variant的默认值从**v4** 的`standard` 变为**v5**的 `outlined` ）。

> ❗️ 如果您已经在主题中定义了默认值`variant: "outlined"`，那么您**不应该**应用此codemod。

```js
// 如果您的主题像这样设置，❌请不要运行此codemod。
// 这些默认属性可以在之后移除，因为`outlined`在v5里面是默认值。
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

但是，如果您想要在组件中保留`variant="standard"`，请执行此codemod或在主题中配置默认属性。

```sh
npx @mui/codemod v5.0.0/variant-prop <path>
```

更多技术细节请参考此链接 [variant-prop codemod](https://github.com/mui-org/material-ui/blob/master/packages/mui-codemod/README.md#variant-prop)。

### link-underline-hover

如果没有在 `<Link/>`组件中定义`underline`属性，请应用 `underline="hover"` 。（因为`underline`属性的默认值从v4的 `"hover"` 变更为**v5**的 `"always"`）。

> ❗️ 如果您已经在主题中定义了`underline: "always"`，那么您**不应该**使用此codemod。

```js
// if you have theme setup like this, ❌ don't run this codemod.
// 这些默认属性可以在之后移除，因为`always`在v5里面是默认值。
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

但是，如果您想要在组件中保留`variant="hover"`，请执行此codemod或在主题中配置默认属性。

```sh
npx @mui/codemod v5.0.0/link-underline-hover <path>
```

更多技术细节请参考此链接 [link-underline-hover codemod](https://github.com/mui-org/material-ui/blob/master/packages/mui-codemod/README.md#link-underline-hover)。

一旦您完成了codemod步骤，请尝试再次运行您的应用程序。 此刻，您的程序应该可以运行并没有报错。 否则查看 [故障排除](#troubleshooting)章节。 下一步，处理各组件中不兼容的改动。

## Handling breaking changes

### 支持的浏览器和node版本

默认捆绑包的目标已更改。 实际支持的版本将在发布时从浏览器列表中查询 `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`。

默认捆绑包支持以下最小版本：

<!-- #stable-snapshot -->

- Node 12（最低兼容到 8）
- Chrome 84（最低兼容到 49）
- Edge 91（最低兼容到 14）
- Firefox 78（最低兼容到 52）
- Safari 14 (macOS) 和 12.5 (iOS)（最低兼容到 10）
- 更多内容请（参阅 [.browserslistrc (`stable` entry)](https://github.com/mui-org/material-ui/blob/HEAD/.browserslistrc#L11)）

不再支持 IE 11。 如果你需要对 IE 11 进行兼容性支持，请查看我们的 [旧版本包](/guides/minimizing-bundle-size/#legacy-bundle)。

### 非转发类（non-ref-forwarding class）组件

对 `component` 属性中的非转发（non-ref-forwarding）类组件或作为直接 `子类（children）` 的支持已被放弃。 如果你使用了 `unstable_createStrictModeTheme` 或者在 `React.StrictMode` 中没有看到任何与 `findDOMNode` 相关的任何警告，那么你不需要做任何事情。 否则请查看我们指南中的 [“注意事项与参考文献”部分](/guides/composition/#caveat-with-refs) 来了解如何迁移。 这个变化几乎影响了所有使用 `component` 属性的组件或者将 `children` 传递给要求 `children` 作为元素的组件（例如 `<MenuList><CustomMenuItem /></MenuList>`）

### 样式库

v5版默认使用 [`emotion`](https://github.com/emotion-js/emotion)样式库。 从JSS向emotion迁移时，如果您正在使用JSS样式渲染您的组件（例如使用`makeStyles`创建的渲染），您需要注意CSS注入顺序。 为了做到这点，您需要在**组件树的顶部**包含`StyledEngineProvider`，并且包含`injectFirst`属性。

> ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

Here is an example:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

export default function GlobalCssPriority() {
  return (
    {/* 在JSS前注入emotion */}
    <StyledEngineProvider injectFirst>
      {/* 您的组件树 Now you can override MUI's styles. */}
    </StyledEngineProvider>
  );
}
```

> **注意：** 如果您使用emotion样式库渲染您的应用，并且有一个自定义缓存，它会覆盖MUI提供的缓存。 为了使注入顺序仍然正确，您需要添加 `prepend` 选项到 `createCache` 中。
> 
> ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

Here is an example:

```diff
 import * as React from 'react';
 import { CacheProvider } from '@emotion/react';
 import createCache from '@emotion/cache';

 const cache = createCache({
   key: 'css',
+  prepend: true,
 });

 export default function PlainCssPriority() {
   return (
     <CacheProvider value={cache}>
       {/* 您的组件树。 现在您可以覆盖 Material-UI 的样式。 */}
     </CacheProvider>
   );
 }
```

> **注意：** 如果您正在使用 styled-components 并且有带有自定义 `target`属性的`StyleSheetManager` ，请确保目标是HTML `<head>`中的第一个元素。 如果想了解更多细节，请查阅`@mui/styled-engine-sc`程序包中的[`StyledEngineProvider` implementation](https://github.com/mui-org/material-ui/blob/master/packages/mui-styled-engine-sc/src/StyledEngineProvider/StyledEngineProvider.js)。

### 主题结构

主题的结构在v5段中发生了变化。 您需要更新它的结构。 为了更顺畅的过渡， `adaptV4Theme` 助手允许您逐渐升级一些主题更改到新主题结构。

> ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

```diff
-import { createMuiTheme } from '@mui/material/styles';
+import { createTheme, adaptV4Theme } from '@mui/material/styles';

-const theme = createMuiTheme({
+const theme = createTheme(adaptV4Theme({
   // v4 版主题代码
-});
+}));
```

> ⚠️ 此适配器只处理 `createTheme`的输入参数， 在创建主题后修改的样式需要手动迁移。

以下更改由适配器支持：

- 事实证明，“水槽（gutters）”这个抽象的概念还没有被频繁使用，所以是没有价值的。

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]],
  + paddingLeft: theme.spacing(3),
  + paddingRights: theme.spacing(3),
+},
  ```

- `theme.spacing` 现在默认返回以 px 为单位的单个数值。 这一改动改善了与 styled-components & emotion 的整合。

  > ✅ 这已经在 [preset-safe codemod](#preset-safe) 中得到解决，方式是从带有`theme.spacing`的字符串模板中移除 'px' 后缀。

  之前：

  ```js
  `${theme.spacing(2)}px`
  ```

  之后：

  ```js
  `${theme.spacing(2)}`
  ```

- `theme.platette.type` 关键字已重命名为 `theme.pallette.mode`, 以便更好地遵循通常用于描述此功能的“深色模式”术语。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    import { createTheme } from '@mui/material/styles';
  >   -const theme = createTheme({palette: { type: 'dark' }}),
  >   +const theme = createTheme({palette: { mode: 'dark' }}),
  > ```

- `theme.palette.info`的默认颜色更改为依照AA标准对比度的颜色值，同时包括浅色模式和深色模式。

  ```diff
   info = {
  -  main: cyan[500],
  +  main: lightBlue[700], // lightBlue[400] 在“深色模式”中

  -  light: cyan[300],
  +  light: lightBlue[500], // lightBlue[300] 在“深色模式”中

  -  dark: cyan[700],
  +  dark: lightBlue[900], // lightBlue[700] 在“深色模式”中

   }
  ```

- `theme.palette.success`的默认颜色更改为依照AA标准对比度的颜色值，同时包括浅色模式和深色模式。

  ```diff
   success = {
  -  main: green[500],
  +  main: green[800], // green[400] 在“深色模式”中

  -  light: green[300],
  +  light: green[500], // green[300] 在“深色模式”中

  -  dark: green[700],
  +  dark: green[900], // green[700] 在“深色模式”中
   }
  ```

- `theme.palette.warning`的默认颜色更改为依照AA标准对比度的颜色值，同时包括浅色模式和深色模式。

  ```diff
   warning = {
  -  main: orange[500],
  +  main: "#ED6C02", // orange[400]  在“深色模式”中

  -  light: orange[300],
  +  light: orange[500], // orange[300]  在“深色模式”中

  -  dark: orange[700],
  +  dark: orange[900], // orange[700]  在“深色模式”中
   }
  ```

- `theme.palette.text.hint` 在MUI组件中未被使用，已经被删除。 如果仍需要使用它，您可以添加回去：

  ```diff
   import { createTheme } from '@mui/material/styles';

  -const theme = createTheme(),
  +const theme = createTheme({
  +  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
  +});
  ```

- 组件的样式在主题中的结构调整为在 `components` 关键字内，为了更容易识别组件相关的样式定义。

  1. `属性`

  ```diff
   import { createTheme } from '@mui/material/styles';

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
   import { createTheme } from '@mui/material/styles';

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

### Styles

- 为更好地描述功能，我们将 `fade` 重命名为 `alpha`。 当输入颜色已经有一个 alpha 值时，以前的名称会导致混乱。 **overrides** 助手覆盖了颜色的 alpha 值。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   - import { fade } from '@mui/material/styles';
  >   + import { alpha } from '@mui/material/styles';
  > 
  >   const classes = makeStyles(theme => ({
  >   -  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  >   +  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  >   }));
  > ```

- `createStyles` 方法从 `@mui/material/styles` 移动到 `@mui/styles`。 这对于移除核心包对 `@mui/styles` 的依赖性是必要的。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { createStyles } from '@mui/material/styles';
  >   +import { createStyles } from '@mui/styles';
  > ```

### @mui/styles

#### ThemeProvider

如果您正在使用 `@mui/styles` 以及 `@mui/material`的工具集，您应该将`ThemeProvider` 的引用从 `@mui/styles` 改为 `@mui/material/styles`。 这样做，才能让 `@mui/styles`中的`makeStyles`、`withStyles`等函数，以及MUI组件能够使用context中的 `theme`。

```diff
-import { ThemeProvider } from '@mui/styles';
+import { ThemeProvider } from '@mui/material/styles';
```

请确保在您的应用程序的根节点添加一个 `ThemeProvider` ，因为 `defaultTheme` 已不可用。

#### Default theme (TypeScript)

`@mui/styles` 包不再是 `@mui/material/styles` 的一部分。 如果您正在使用 `@mui/styles` 以及 `@mui/materials` 您需要为 `DefaultTheme` 添加模块扩充。

> ✅ This is handled in the [preset-safe codemod](#preset-safe).

```ts
// in the file where you are creating the theme (invoking the function `createTheme()`)
import { Theme } from '@mui/material/styles';

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}
```

### @mui/material/colors

- 超过1级嵌套导入是私有的。 您不能从 `@mui/material/colors/red` 导入颜色。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import red from '@mui/material/colors/red';
  >   +import { red } from '@mui/material/colors';
  > ```

### @mui/material/styles

#### createGenerateClassName

- `createGenerateClassName` 功能不再从 `@mui/material/styles` 导出。 你应该直接从 `@mui/styles` 导入它。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { createGenerateClassName } from '@mui/material/styles';
  >   +import { createGenerateClassName } from '@mui/styles';
  > ```

  **不使用**`@mui/styles`生成自定义类名称，请参考[ClassNameGenerator](/guides/classname-generator/)。

#### createMuiTheme

- 函数 `createMuiTheme` 被重命名为 `createTheme` 以使其更加直观地使用 `ThemeProvider`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { createMuiTheme } from '@mui/material/styles';
  >   +import { createTheme } from '@mui/material/styles';
  > 
  >   -const theme = createMuiTheme({
  >   +const theme = createTheme({
  > ```

#### jssPreset

- `jssPreset` 对象不再从 `@mui/material/styles`导出。 You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { jssPreset } from '@mui/material/styles';
  >   +import { jssPreset } from '@mui/styles';
  > ```

#### makeStyles

- `makeStyles` 对象不再从 `@mui/material/styles`导出。 你可以使用 `@mui/styles/ makeStyles`导入。 请确保在您的应用程序的根节点添加一个 `ThemeProvider` ，因为 `defaultTheme` 已不可用。 如果您正在使用此工具与 `@mui/materials`, 建议您使用 `@mui/material/styles` 的 `ThemeProvider` 组件代替。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { makeStyles } from '@mui/material/styles';
  >   +import { makeStyles } from '@mui/styles';
  >   +import { createTheme, ThemeProvider } from '@mui/material/styles';
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
  >    // 在您程序的根节点
  >    function App(props) {
  >   -  return <Component />;
  >   +  return <ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>;
  >    }
  > ```

#### MuiThemeProvider

- `MuiThemeProvider` 组件不再从 `@mui/material/styles` 导出。 使用 `ThemeProvider` 代替。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { MuiThemeProvider } from '@mui/material/styles';
  >   +import { ThemeProvider } from '@mui/material/styles';
  > ```

#### ServerStyleSheets

- `ServerStyleSheets` 组件不再从 `@mui/material/styles` 导出。 You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { ServerStyleSheets } from '@mui/material/styles';
  >   +import { ServerStyleSheets } from '@mui/styles';
  > ```

#### styled

- `styled` JSS 工具集不再从 `@mui/material/styles` 导出。 您可以从 `@mui/styles` 导出。 请确保在您的应用程序的根节点添加一个 `ThemeProvider` ，因为 `defaultTheme` 已不可用。 如果您正在使用此工具与 `@mui/materials`, 建议您使用 `@mui/material/styles` 的 `ThemeProvider` 组件代替。

  ```diff
  -import { styled } from '@mui/material/styles';
  +import { styled } from '@mui/styles';
  +import { createTheme, ThemeProvider } from '@mui/material/styles';

  +const theme = createTheme();
   const MyComponent = styled('div')(({ theme }) => ({ background: theme.palette.primary.main }));

   function App(props) {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
   }
  ```

#### StylesProvider

- `stylesProvider` 组件不再从 `@mui/material/styles` 导出。 You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { StylesProvider } from '@mui/material/styles';
  >   +import { StylesProvider } from '@mui/styles';
  > ```

#### useThemeVariants

- `useThemeVariants` 钩子函数不再从 `@mui/material/styles` 导出。 You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { useThemeVariants } from '@mui/material/styles';
  >   +import { useThemeVariants } from '@mui/styles';
  > ```

#### withStyles

- 用 `ref` prop替换 `innerRef` prop。 Refs现在自动转发到内部组件。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    import * as React from 'react';
  >    import { withStyles } from '@mui/styles';
  > 
  >    const MyComponent = withStyles({
  >      root: {
  >        backgroundColor: 'red',
  >      },
  >    })(({ classes }) => <div className={classes.root} />);
  > 
  >    function MyOtherComponent(props) {
  >      const ref = React.useRef();
  >   -  return <MyComponent innerRef={ref} />;
  >   +  return <MyComponent ref={ref} />;
  >    }
  > ```

- `withStyles` JSS工具集不再从 `@mui/material/styles` 导出。 你可以使用 `@mui/styles/withStyles`代替。 请确保在您的应用程序的根节点添加一个 `ThemeProvider` ，因为 `defaultTheme` 已不可用。 如果你正在使用此工具集与 `@mui/materials`, 你应该使用 `@mui/material/styles` 的`ThemeProvider` 组件代替。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { withStyles } from '@mui/material/styles';
  >   +import { withStyles } from '@mui/styles';
  >   +import { createTheme, ThemeProvider } from '@mui/material/styles';
  > 
  >   +const defaultTheme = createTheme();
  >    const MyComponent = withStyles((props) => {
  >      const { classes, className, ...other } = props;
  >      return <div className={clsx(className, classes.root)} {...other} />
  >    })(({ theme }) => ({ root: { background: theme.palette.primary.main }}));
  > 
  >    function App() {
  >   -  return <MyComponent />;
  >   +  return <ThemeProvider theme={defaultTheme}><MyComponent /></ThemeProvider>;
  >    }
  > ```

#### withTheme

- `withTheme` HOC工具集已经从 `@mui/material/styles` 软件包中删除。 您可以使用 `@mui/styles/withTheme` 代替。 Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@mui/material`, it's recommended you use the `ThemeProvider` component from `@mui/material/styles` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { withTheme } from '@mui/material/styles';
  >   +import { withTheme } from '@mui/styles';
  >   +import { createTheme, ThemeProvider } from '@mui/material/styles';
  > 
  >   +const theme = createTheme();
  >    const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);
  > 
  >    function App(props) {
  >   -  return <MyComponent />;
  >   +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
  >    }
  > ```

- Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component.

  ```diff
  import * as React from 'react';
  import { withTheme } from '@mui/styles';

  const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

  function MyOtherComponent(props) {
    const ref = React.useRef();
  - return <MyComponent innerRef={ref} />;
  + return <MyComponent ref={ref} />;
  }
  ```

#### withWidth

- HOC已被移除。 有一个使用 [`useMediaQuery` 钩子函数](/components/use-media-query/#migrating-from-withwidth) 的替代方法。

  > ✅ 这是在 [preset-safe codemod](#preset-safe) 中通过应用硬编码函数来处理的，以防止应用程序崩溃。

### @mui/icons-material

#### GitHub

`GitHub` 图标的大小已从24px 缩小到22px 宽，以与其他图标的大小相匹配。

### @material-ui/pickers

我们有一个 [专用页面](/guides/pickers-migration/) 用于迁移 `@material-ui/pickers` 到 v5

### System

- 以下系统函数(和属性)因被视为废弃的CSS而更名：

  - `gridGap` 更改为 `gap`
  - `gridRowGap` 更改为 `rowGap`
  - `gridColumnGap` 更改为 `columnGap`

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

- 在  `gap`，`rowGap` 和 `columnGap` 中使用间距单位。 如果你先前使用了一个数字，你需要添加px后缀来绕过 `theme.spaming` 的新转换。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Box
  >   -  gap={2}
  >   +  gap="2px"
  >    >
  > ```

- 将 `css` 属性替换为 `sx` 以避免与emotion的styled-components的 `css` 属性发生冲突。.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Box css={{ color: 'primary.main' }} />
  >   +<Box sx={{ color: 'primary.main' }} />
  > ```

  > 请注意，grid 函数未在v4系统中还未被使用。

### Core components

由于核心组件使用emotion作为其样式引擎，emotion使用的属性不会被截获。 在下面的代码片段中 `as` 属性将不会被传递到`SomeOtherComponent`.

```jsx
<MuiComponent component={SomeOtherComponent} as="button" />
```

### AppBar 应用栏组件

- 当位置静态和相对位置时移除z-index。 这就避免了建立堆积性环境和渲染问题。
- `color` 属性在深色模式下不再有任何影响。 AppBar的背景颜色遵循 [Material设计指南](https://material.io/design/color/dark-theme.html)。 使用 `enableColorOnDark` 来恢复v4的行为。

  ```jsx
  <AppBar enableColorOnDark />
  ```

### Alert

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Alert from '@mui/lab/Alert';
  >   -import AlertTitle from '@mui/lab/AlertTitle';
  >   +import Alert from '@mui/material/Alert';
  >   +import AlertTitle from '@mui/material/AlertTitle';
  > ```

### Autocomplete

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Autocomplete from '@mui/lab/Autocomplete';
  >   -import useAutocomplete  from '@mui/lab/useAutocomplete';
  >   +import Autocomplete from '@mui/material/Autocomplete';
  >   +import useAutoComplete from '@mui/material/useAutocomplete';
  > ```

- 移除 `debug` 属性。 有几个更简单的方式来使用它：`open={true}`，Chrome 开发者调试工具 [“Emulate focused”](https://twitter.com/sulco/status/1305841873945272321)，或者使用 React 开发工具的属性设置器（prop setter）。
- `renderOption` 现在应该返回选项的完整 DOM 结构。 这样做可以让定制组件变得更加容易。 你可以通过下面方法进行修复：

  ```diff
   <Autocomplete
  -  renderOption={(option, { selected }) => (
  -    <React.Fragment>
  +  renderOption={(props, option, { selected }) => (
  +    <li {...props}>
         <Checkbox
           icon={icon}
           checkedIcon={checkedIcon}
           style={{ marginRight: 8 }}
           checked={selected}
         />
         {option.title}
  -    </React.Fragment>
  +    </li>
     )}
   />
  ```

- 将 `closeIcon` 属性重命名为 `clearIcon` 以避免混淆。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Autocomplete closeIcon={defaultClearIcon} />
  >   +<Autocomplete clearIcon={defaultClearIcon} />
  > ```

- 为了一致性，`onChange` 和 `onClose` 中的参数的以下值被重命名：

  1. `create-option` 变为 `createOption`
  2. `select-option` 变为 `selectOption`
  3. `remove-option` 变为 `removeOption`

- 更改使用 `[data-focus="true"]` 的 CSS 规则以使用 `.Mui-focus`。 `data-focus` 属性不再设置在聚焦选项上，而是使用全局类名称。

  ```diff
  -'.MuiAutocomplete-option[data-focus="true"]': {
  +'.MuiAutocomplete-option.Mui-focused': {
  ```

- 将 `getOptionSelected` 重命名为 `isOptionEqualTValue` 以更好地描述其目的。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Autocomplete
  >   -  getOptionSelected={(option, value) => option.title === value.title}
  >   +  isOptionEqualToValue={(option, value) => option.title === value.title}
  > ```

### Avatar

- 为保持一致性，我们将 `circle` 重命名为 `circular`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Avatar variant="circle">
  >   -<Avatar classes={{ circle: 'className' }}>
  >   +<Avatar variant="circular">
  >   +<Avatar classes={{ circular: 'className' }}>
  > ```

  既然 `circular` 是默认值，那么variant 属性可以删除：

  ```diff
  -<Avatar variant="circle">
  +<Avatar>
  ```

- AvatarGroup 已从实验室包移动到核心包。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import AvatarGroup from '@mui/lab/AvatarGroup';
  >   +import AvatarGroup from '@mui/material/AvatarGroup';
  > ```

### Badge

- 为保持一致性，我们将 `circle` 重命名为 `circular`，`rectangle` 重命名为 `rectangular`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Badge overlap="circle">
  >   -<Badge overlap="rectangle">
  >   +<Badge overlap="circular">
  >   +<Badge overlap="rectangular">
  > ```

  ```diff
   <Badge classes={{
  -  anchorOriginTopRightRectangle: 'className',
  -  anchorOriginBottomRightRectangle: 'className',
  -  anchorOriginTopLeftRectangle: 'className',
  -  anchorOriginBottomLeftRectangle: 'className',
  -  anchorOriginTopRightCircle: 'className',
  -  anchorOriginBottomRightCircle: 'className',
  -  anchorOriginTopLeftCircle: 'className',
  +  anchorOriginTopRightRectangular: 'className',
  +  anchorOriginBottomRightRectangular: 'className',
  +  anchorOriginTopLeftRectangular: 'className',
  +  anchorOriginBottomLeftRectangular: 'className',
  +  anchorOriginTopRightCircular: 'className',
  +  anchorOriginBottomRightCircular: 'className',
  +  anchorOriginTopLeftCircular: 'className',
   }}>
  ```

### BottomNavigation 底部导航

- TypeScript：`onChange` 中的 `event` 的类型不再是 `React.ChangeEvent`，而是`React.SyntheticEvent`。

  ```diff
  -<BottomNavigation onChange={(event: React.ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React.SyntheticEvent) => {}} />
  ```

### BottomNavigationAction 底部导航动作

- 移除包装子节点的 `span`。 也删除 `wrapper` 这个类名称。 更多关于 [此更改](https://github.com/mui-org/material-ui/pull/26923) 的详细信息。

  ```diff
   <button class="MuiBottomNavigationAction-root">
  -  <span class="MuiBottomNavigationAction-wrapper">
       {icon}
       <span class="MuiBottomNavigationAction-label">
         {label}
       </span>
  -  </span>
   </button>
  ```

### Box

- `borderRadius` 系统属性值转换已被更改。 如果它收到一个数字，它就会将这个值与 `theme.shape.borderRadius` 的值相乘。 使用一个字符串来提供一个显式的 `px` 值。

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

- 盒子（Box）组件的属性在 v5 中有一个可选的替代API，使用 `sx` 属性。 您可以[阅读这个章节](/system/basics/#api-tradeoff)了解为什么要使用这个新的API。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```jsx
  >   <Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
  >   <Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
  > ```

- 以下属性已重命名，因为根据CSS规则它们被视为已废弃的 CSS 属性：

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

  请注意，grid 函数未在v4系统中还未被使用。

- `clone` 属性已被删除，因为它的行为可以通过应用 `sx` 直接针对子节点，前提是子节点是MUI 组件。

  ```diff
  -<Box sx={{ border: '1px dashed grey' }} clone>
  -  <Button>Save</Button>
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

- 传递渲染属性的能力已被删除，因为如果子节点是一个 MUI 组件的话，它的属性可以通过 `sx` 直接对子节点应用。

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <Button {...props}>Save</Button>}
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

  对于非 MUI 组件，使用 `component` 属性。

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <button {...props}>Save</button>}
  -</Box>
  +<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
  ```

### Button

- 按钮的 `颜色（color）` 属性默认情况下为 "primary"，同时 "default" 属性已被删除。 这使按钮更接近Meterial设计准则，并简化了API。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Button color="default">
  >   +<Button>
  > ```

  如果您喜欢使用 v4 中的 `default` 颜色，请查看 [CodeSandbox](https://codesandbox.io/s/mimic-v4-button-default-color-bklx8?file=/src/Demo.tsx)

- 包裹子元素的`span`已经被删除。 `label`类名称同样被删除。 这个更改的[更多细节](https://github.com/mui-org/material-ui/pull/26666)。

  ```diff
   <button class="MuiButton-root">
  -  <span class="MuiButton-label">
       children
  -  </span>
   </button>
  ```

### Chip 纸片组件

- 为保持一致性，将variant的默认值从 `default` 变更为 `filled`：

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

  既然 `filled` 是默认值，那么variant 属性可以删除：

  ```diff
  -<Chip variant="default">
  +<Chip>
  ```

### Checkbox

- 组件不再有 `.MuiIconButtonroot` 和 `.MuiIconButton-label` 类名，以 `.MuiButtonBase-root` 代替。

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### CircularProgress 环形进度条

- variant 属性的`static`重命名为`determinate`，之前的`determinate`显示效果替换为之前的`static`效果。 它被Material Design视为错误，并且在规范中被删除。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<CircularProgress variant="static" classes={{ static: 'className' }} />
  >   +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  > ```

> 注意：如果你之前已经定制了 determinate，那么你的定制可能不再有效。 所以请删除它们。

### Collapse

- `collapsedHeight` 属性已重命名为 `collapsedSize` 以便支持水平方向的大小。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Collapse collapsedHeight={40}>
  >   +<Collapse collapsedSize={40}>
  > ```

- 已更改 `classes.container` 键以匹配其他组件的约定行为。

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

### CssBaseline 基线

- 此组件迁移为使用 `@mui/styled-engine` (`emotion` 或者 `styled-components`)替代`JSS`。 定义样式覆盖时，您应该删除 `@global` 键。 您也可以在 JavaScript 语义对象上开始使用 CSS 模板语法。

  ```diff
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
  -     styleOverrides: {
  -       '@global': {
  -         html: {
  -           WebkitFontSmoothing: 'auto',
  -         },
  -       },
  -     },
  +     styleOverrides: `
  +       html {
  +         -webkit-font-smoothing: auto;
  +       }
  +     `
      },
    },
  });
  ```

- `body` 的字体大小已经从 `theme.typography.body2` (`0.875rem`) 变为 `theme.typography.body1` (`1rem`)。 要返回之前的大小，您可以在主题中覆盖它：

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

### Dialog

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
  >    >
  > ```

- 删除 `disableBackdropClick` 属性，因为它是冗余的。 `reason === 'backdropClick'`取代了`onClose` 关闭事件。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Dialog
  >   -  disableBackdropClick
  >   -  onClose={handleClose}
  >   +  onClose={(event, reason) => {
  >   +    if (reason !== 'backdropClick') {
  >   +      handleClose(event, reason);
  >   +    }
  >   +  }}
  >    />
  > ```

- 删除了高阶组件 `withMobileDialog`。 Hook API 提供了更简单灵活的方案：

  > ✅ 这是在 [preset-safe codemod](#preset-safe) 中通过应用硬编码函数来处理的，以防止应用程序崩溃，需要进一步修复。 
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

- 平整DialogTitle DOM结构，移除 `disableTypography` 属性。

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

### Divider 分隔线

- 你需要使用边框来代替背景色。 这个改动可以防止在缩放屏幕上出现高度不一致的情况。 如果您已经自定义了边界的颜色，您需要更新覆盖的 CSS 属性：

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### ExpansionPanel 扩展面板

- 为使用更通用的命名约定，我们将 `ExpansionPanel` 组件重命名为 `Accordion`：

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import ExpansionPanel from '@mui/material/ExpansionPanel';
  >   -import ExpansionPanelSummary from '@mui/material/ExpansionPanelSummary';
  >   -import ExpansionPanelDetails from '@mui/material/ExpansionPanelDetails';
  >   -import ExpansionPanelActions from '@mui/material/ExpansionPanelActions';
  >   +import Accordion from '@mui/material/Accordion';
  >   +import AccordionSummary from '@mui/material/AccordionSummary';
  >   +import AccordionDetails from '@mui/material/AccordionDetails';
  >   +import AccordionActions from '@mui/material/AccordionActions';
  > 
  >   -<ExpansionPanel>
  >   +<Accordion>
  >   -  <ExpansionPanelSummary>
  >   +  <AccordionSummary>
  >        <Typography>Location</Typography>
  >        <Typography>Select trip destination</Typography>
  >   -  </ExpansionPanelSummary>
  >   +  </AccordionSummary>
  >   -  <ExpansionPanelDetails>
  >   +  <AccordionDetails>
  >        <Chip label="Barbados" onDelete={() => {}} />
  >        <Typography variant="caption">Select your destination of choice</Typography>
  >   -  </ExpansionPanelDetails>
  >   +  </AccordionDetails>
  >      <Divider />
  >   -  <ExpansionPanelActions>
  >   +  <AccordionActions>
  >        <Button size="small">Cancel</Button>
  >        <Button size="small">Save</Button>
  >   -  </ExpansionPanelActions>
  >   +  </AccordionActions>
  >   -</ExpansionPanel>
  >   +</Accordion>
  > ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Accordion onChange={(event: React.ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React.SyntheticEvent, expanded: boolean) => {}} />
  ```

### ExpansionPanelDetails 扩展面板详情

- 因为过于自以为是，我们删除了 `AccordionDetails`（之前的`ExpansionPanelDetails`）中的 `display: flex`。 大多数开发者都期望显示为块级（block）元素。

### ExpansionPanelSummary 扩展面板概要

- 为保持一致性，我们将 `focused` 重命名为 `focusVisible`。

  ```diff
   <AccordionSummary
     classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
     }}
    />
  ```

- 删除  `AccordionSummary` (之前的`ExpansionPanelSummary`)中的 `IconButtonProps` 属性。 该组件渲染一个 `<div>` 元素而不是 `IconButton`。 所以不再需要该属性了。

### Fab 浮动按钮

- 为保持一致性，我们将 `round` 重命名为 `circular`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Fab variant="round">
  >   +<Fab variant="circular">
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. 更多关于 [此更改](https://github.com/mui-org/material-ui/pull/27112) 的详细信息。

  ```diff
   <button class="MuiFab-root">
  -  <span class="MuiFab-label">
       {children}
  -  </span>
   </button>
  ```

### FormControl 表单控件

- 将variant的默认值从 `standard` 更改为 `outlined`。 Standard 已从Material设计准则中删除。

  > ✅ 这在 [variant-prop codemod](#variant-prop)中已解决，在运行此codemod之前请阅读详细信息。 
  > 
  > ```diff
  >   -<FormControl value="Standard" />
  >   -<FormControl value="Outlined" variant="outlined" />
  >   +<FormControl value="Standard" variant="standard" />
  >   +<FormControl value="Outlined" />
  > ```

### FormControlLabel 表单控件标签

- `label` 属性现在是必需的。 如果您使用了`FormControlLabel`而没有`label`, 你可以用`control`属性替代。

```diff
-<FormControlLabel control={<Checkbox />} />
+<Checkbox />
```

### Grid 栅格

- 为了保持CSS属性名的一致性，`justify`属性重命名为`justifyContent`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Grid justify="center">
  >   +<Grid justifyContent="center">
  > ```

- 属性: `alignItems` `alignContent` `justifyContent`和他们的`classes`属性，以及styleOverrides键已被删除，包括："align-items-xs-center", “align-items-xs-flex-start”、“align-items-xs-flex-end”、“align-item-item-xs-basine”， “align-content-xs-center”、“align-content-xs-flex-start”、“align-content-xs-space-between ”、“align-content-xs-space-around”、“jusy-content-xs-center”、“jusify-content-xs-flex-end”、“jusy-content-xs-spacen”、“justify-content-xs-space-around”和“justify-content-xs-space-evality”。 现在这些属性被视为系统的一部分，而不是在 `Grid` 组件本身。 如果您仍然想要为他们添加样式覆盖，您可以使用 `theme.components.MuiGrid.variants` 选项。

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

### GridList 栅格列表

- 为保持和当前 Material Design 命名的一致性，我们将 `GridList` 组件重命名为 `ImageList`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

- 为保持和 CSS 属性名字的一致性，我们将栅格列表的 `spacing` 属性重命名为 `gap`。
- 将栅格列表`cellHeight` 属性重命名为 `rowHeight`。
- 添加 `variant` 属性到栅格列表中。
- 我们将 GridListItemBar 的 `actionPosition` 属性重命名为 `position`。 (也要注意相关的类名变化)。
- 使用 CSS object-fit。 如果要兼容 IE11，那么你可以使用 polyfill 来转换它，例如 https://www.npmjs.com/package/object-fit-images，或者继续使用 v4 组件。

  ```diff
  -import GridList from '@mui/material/GridList';
  -import GridListTile from '@mui/material/GridListTile';
  -import GridListTileBar from '@mui/material/GridListTileBar';
  +import ImageList from '@mui/material/ImageList';
  +import ImageListItem from '@mui/material/ImageListItem';
  +import ImageListItemBar from '@mui/material/ImageListItemBar';

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

### Hidden

- 此组件被废弃，因为它的功能可以使用 [`sx`](/system/basics/#the-sx-prop) 属性或 [`useMediaQuery`](/components/use-media-query/) 钩子替代。

  > ✅ 这是在 [preset-safe codemod](#preset-safe) 中通过应用假的 `Hidden`组件以防止应用程序崩溃，需要进一步修复。

  使用 `sx` 属性替换 `implementation="css"`:

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

  使用 `useMediaQuery` 钩子来替换 `implementation="js"`:

  ```diff
  -<Hidden implementation="js" xlUp><Paper /></Hidden>
  +const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));
  +return hidden ? null : <Paper />;
  ```

### Icon 图标

- 为了一致性，`fontSize` 的默认值已从 `default` 更改为 `medium`。 如果您使用的值为 `default`, 那么这个属性可以被删除：

  ```diff
  -<Icon fontSize="default">icon-name</Icon>
  +<Icon>icon-name</Icon>
  ```

### IconButton 图标按钮

- 默认尺寸的填充缩减为 `8px` ，因此默认图标按钮大小为 `40px`。 要获得旧的默认大小 (`48px`)，请使用 `size="large"`。 当Material Design停止记录图标按钮模式时，更改是为了更好地匹配谷歌的产品。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   - <IconButton>
  >   + <IconButton size="large">
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

  ```diff
   <button class="MuiIconButton-root">
  -  <span class="MuiIconButton-label">
       <svg />
  -  </span>
   </button>
  ```

### Link 链接

- 默认 `underline` 属性已从 `"hover"` 更改为 `"always"`。 要获得与v4相同的行为，请在主题中应用 `defaultProps`。

  > ✅ 这在 [link-underline-hover codemod](#link-underline-hover)中已解决，在运行此codemod之前请阅读详细信息。 
  > 
  > ```js
  >   createTheme({
  >     components: {
  >       MuiLink: {
  >         defaultProps: {
  >           underline: 'hover',
  >         },
  >       },
  >     },
  >   });
  > ```

### Menu 菜单

- The onE\* transition props were removed. Use TransitionProps instead.

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
  >    >
  > ```

  > 注意：`selectedMenu` 变量不再将所选项目与锚点垂直对齐。

- 更改 `anchorOrigin.vertical` 的默认值，以遵循 Material Design 指引。 菜单现在在锚点下方显示，而不是顶部。 您可以用以下方法恢复到以前的行为：

  ```diff
   <Menu
  +  anchorOrigin={{
  +    vertical: 'top',
  +    horizontal: 'left',
  +  }}
  ```

### MenuItem 菜单项

- `MenuItem` 组件继承 `ButtonBase` 组件而不是 `ListItem`。 与“MuiListItem-\*”相关的类名已被删除，主题中的 `Listitem` 不再影响 `MenuItem`。

  ```diff
  -<li className="MuiButtonBase-root MuiMenuItem-root MuiListItem-root">
  +<li className="MuiButtonBase-root MuiMenuItem-root">
  ```

- 属性 `listItemClasses` 已被删除，请使用 `classes` 代替。

  ```diff
  -<MenuItem listItemClasses={{...}}>
  +<MenuItem classes={{...}}>
  ```

  阅读更多关于 [MenuItem CSS API](/api/menu-item/#css)

### Modal 模态框

- Remove the `disableBackdropClick` prop because it is redundant. 使用 `onClose` 和 `reason === 'backdropClick'` 代替。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Modal
  >   -  disableBackdropClick
  >   -  onClose={handleClose}
  >   +  onClose={(event, reason) => {
  >   +    if (reason !== 'backdropClick') {
  >   +      handleClose(event, reason);
  >   +    }
  >   +  }}
  >    />
  > ```

- 删除 `onEscapeKeyDown` 属性，因为它是冗余的。 使用 `onClose` 和 `reason === "escapeKeyDown"` 代替。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Modal
  >   -  onEscapeKeyDown={handleEscapeKeyDown}
  >   +  onClose={(event, reason) => {
  >   +    if (reason === 'escapeKeyDown') {
  >   +      handleEscapeKeyDown(event);
  >   +    }
  >   +  }}
  >    />
  > ```

- 移除 `onRendered` 属性。 具体迁移方法根据你的使用情况而定，你可以在子元素上使用 [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)，也可以在子组件中使用 effect 钩子。

### NativeSelect 原生选择器

- 将 `selectMenu` 槽位合并到 `select`。 `selectMenu` 槽位是多余的。 `root` 槽位不再应用于选择器，而是应用于根节点。

  ```diff
  -<NativeSelect classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<NativeSelect classes={{ select: 'class1 class2 class3' }} />
  ```

### OutlinedInput 轮廓输入框

- 删除 `labelWidth` 属性。 `label` 属性现在实现了相同的目的，使用CSS样式而不是JavaScript衡量边框内部的间距。

  ```diff
  -<OutlinedInput labelWidth={20} />
  +<OutlinedInput label="First Name" />
  ```

### Paper 纸张

- 在深色模式下更改背景不透明度。 这项修改是为了遵循Material Design指导原则。 您可以在主题中还原：

  ```diff
  const theme = createTheme({
    components: {
      MuiPaper: {
  +     styleOverrides: { root: { backgroundImage: 'unset' } },
      },
    },
  });
  ```

### Pagination

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Pagination from '@mui/lab/Pagination';
  >   -import PaginationItem from '@mui/lab/PaginationItem';
  >   -import { usePagination } from '@mui/lab/Pagination';
  >   +import Pagination from '@mui/material/Pagination';
  >   +import PaginationItem from '@mui/material/PaginationItem';
  >   +import usePagination from '@mui/material/usePagination';
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

### Popover 弹出框

- The onE\* transition props were removed. Use TransitionProps instead.

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
  >    >
  > ```

- `getContentAnchorEl` 属性已被删除，以简化定位逻辑。

### Popper

- 我们将 [Popper.js](https://github.com/popperjs/popper-core) 从 v1 升级到 v2。 <br /> 你可以阅读 [它们的迁移指南](https://popper.js.org/docs/v2/migration-guide/) 或参考以下摘要：

  - CSS 前缀已更改：
    ```diff
    popper: {
      zIndex: 1,
    - '&[x-placement*="bottom"] .arrow': {
    + '&[data-popper-placement*="bottom"] .arrow': {
    ```
  - 方法名称已更改：

    ```diff
    -popperRef.current.scheduleUpdate()
    +popperRef.current.update()
    ```

    ```diff
    -popperRef.current.update()
    +popperRef.current.forceUpdate()
    ```

  - 修改器的 API（Modifiers' API）发生了大量改变。 这其中有太多的内容不能涵盖说明。

### Portal 传送门

- Remove `onRendered` prop. Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### Radio 单选框

- 现在单选框颜色属性的默认值为"primary"。 若要继续使用“secondary”颜色，您必须明确指定 `secondary`。 这使单选框更接近于Material Design准则。

  ```diff
  -<Radio />
  +<Radio color="secondary />
  ```

- 此组件不再有 `.MuiIconButtonroot` 和 `.MuiIconButton-label` 类名，以 `.MuiButtonBase-root` 代替。

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### Rating 评分

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Rating from '@mui/lab/Rating';
  >   +import Rating from '@mui/material/Rating';
  > ```

- 为提高无障碍的可访问性，我们更改了默认的空图标。 如果你有自定义了 `icon` 属性，但没有使用 `emptyIcon` 属性，你可以用以下方法还原到以前的行为：

  ```diff
   <Rating
     icon={customIcon}
  +  emptyIcon={null}
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

### RootRef 根引用

- 该组件已被移除。 你可以通过 `ref` 属性来获取对我们组件的底层 DOM 节点的引用。 该组件依赖 [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode)，在 [`React.StrictMode`  中已被弃用](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)。

  > ✅ 这是在 [preset-safe codemod](#preset-safe) 中通过应用假的 `RootRef`组件以防止应用程序崩溃，需要进一步修复。 
  > 
  > ```diff
  >   -<RootRef rootRef={ref}>
  >   -  <Button />
  >   -</RootRef>
  >   +<Button ref={ref} />
  > ```

### Select 选择器

- Change the default variant from `standard` to `outlined`. Standard has been removed from the Material Design guidelines. 如果您正在使用表单控制组件构建该选择器。 您只需要更新 `FormControl`，选择器继承其上下文中的变量。

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<Select value="Standard" />
  >   -<Select value="Outlined" variant="outlined" />
  >   +<Select value="Standard" variant="standard" />
  >   +<Select value="Outlined" />
  > ```

- Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined. TextField 已默认处理它。

  ```diff
  -<Select variant="outlined" labelWidth={20} />
  +<Select variant="outlined" label="Gender" />
  ```

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<Select classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<Select classes={{ select: 'class1 class2 class3' }} />
  ```

- `onchange` 中的 `event` 现在是一个合成事件，原生 `Event` 不是一个React事件。

  ```diff
  -<Select onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  +<Select onChange={(event: Event, value: unknown) => {}} />
  ```

  这对于防止覆盖导致更改的事件的 `event.target` 是必要的。

### Skeleton 骨架屏

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Skeleton from '@mui/lab/Skeleton';
  >   +import Skeleton from '@mui/material/Skeleton';
  > ```

- 为保持一致性，我们将 `circle` 重命名为 `circular`，`rect` 重命名为 `rectangular`。

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

### Slider

- `onchange` 中的 `event` 现在是一个合成事件，原生 `Event` 不是一个React事件。

  ```diff
  -<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  +<Slider onChange={(event: Event, value: unknown) => {}} />
  ```

  This was necessary to prevent overriding of `event.target` of the events that caused the change.

- `ValueLabelComponent` 和 `ThumbComponent` 属性现在是 `components` 属性的一部分。

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

- 重构CSS 以匹配最新的 [Material Design 指引](https://material.io/components/sliders) 并使自定义风格更加直观。 [查看文档](/components/slider/)。 <a href="/components/slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

  您可以降低滑块的密度，使用 [`size="small"` 属性](/components/slider/#sizes) 使效果更接近v4。

### Snackbar 消息条

- 现在在大屏幕上的消息条通知会在左下角显示。 这更符合 Gmail、Google Keep、material.io 等应用的行为。 You can restore the previous behavior with:

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- The onE\* transition props were removed. Use TransitionProps instead.

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

### SpeedDial 快速拨号

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import SpeedDial from '@mui/lab/SpeedDial';
  >   -import SpeedDialAction from '@mui/lab/SpeedDialAction';
  >   -import SpeedDialIcon from '@mui/lab/SpeedDialIcon';
  >   +import SpeedDial from '@mui/material/SpeedDial';
  >   +import SpeedDialAction from '@mui/material/SpeedDialAction';
  >   +import SpeedDialIcon from '@mui/material/SpeedDialIcon';
  > ```

### Stepper

- 根组件（Paper）已经被 div 所取代。 Stepper 不再有立体效果，也不再继承 Paper 的属性。 这个改动是为了鼓励开发者进行组合使用。

  ```diff
  +<Paper square elevation={2}>
  -  <Stepper elevation={2}>
  +  <Stepper>
       <Step>
         <StepLabel>Hello world</StepLabel>
       </Step>
     </Stepper>
  +<Paper>
  ```

- 移除内置的24px填充。

  ```diff
  -<Stepper>
  +<Stepper style={{ padding: 24 }}>
     <Step>
       <StepLabel>Hello world</StepLabel>
     </Step>
   </Stepper>
  ```

### SvgIcon Svg图标

- 为了一致性，`fontSize` 的默认值已从 `default` 更改为 `medium`。 如果您使用的值为 `default`, 那么这个属性可以被删除：

  ```diff
  -<SvgIcon fontSize="default">
  +<SvgIcon>
     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
   </SvgIcon>
  ```

### Switch

- 弃用了 `onChange` 的第二个参数。 您可以通过访问 `event.target.check` 退出选定的状态。

  ```diff
  function MySwitch() {
  - const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
  + const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  +   const checked = event.target.checked;
    };

    return <Switch onChange={handleChange} />;
  }
  ```

- 现在开关颜色属性的默认值为"primary"。 To continue using the "secondary" color, you must explicitly indicate `secondary`. 这使开关更接近于Material Design准则。

  ```diff
  -<Switch />
  +<Switch color="secondary" />
  ```

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
   <span class="MuiSwitch-root">
  -  <span class="MuiIconButton-root MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  -    <span class="MuiIconButton-label">
  -      <input class="MuiSwitch-input PrivateSwitchBase-input">
  +  <span class="MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  +    <span class="MuiSwitch-input PrivateSwitchBase-input">
  ```

### Table

- 将 `padding` 属性的 `default` 重命名为 `normal`。

  ```diff
  -<Table padding="default" />
  -<TableCell padding="default" />
  +<Table padding="normal" />
  +<TableCell padding="normal" />
  ```

### TablePagination 表格分页

- 如果你需要自定义表格分页的操作标签（actions labels），那么就必须使用 `getItemAriaLabel` 属性。 这是为了与 `Pagination` 组件保持一致。

  ```diff
   <TablePagination
  -  backIconButtonText="Avant"
  -  nextIconButtonText="Après"
  +  getItemAriaLabel={…}
  ```

- 为保持 API 一致性，我们将 `onChangeRowsPerPage` 重命名为 `onRowsPerPageChange`，`onChangePage` 重命名为 `onPageChange`。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <TablePagination
  >   -  onChangeRowsPerPage={()=>{}}
  >   -  onChangePage={()=>{}}
  >   +  onRowsPerPageChange={()=>{}}
  >   +  onPageChange={()=>{}}
  > ```

- 将不同表格分页标签的类分开。 这使得自定义更简单。

  ```diff
   <TablePagination
  -  classes={{ caption: 'foo' }}
  +  classes={{ selectLabel: 'foo', displayedRows: 'foo' }}
   />
  ```

- 将 `input` 上的自定义类移动到 `select`。 `input` 键正在应用于另一个元素。

  ```diff
   <TablePagination
  -  classes={{ input: 'foo' }}
  +  classes={{ select: 'foo' }}
   />
  ```

### Tabs

- `indicatorColor` 和 `textColor` 属性的默认值更改为"primary"。 这样做是为了匹配 Material Design 的最常用法。

  ```diff
  -<Tabs />
  +<Tabs indicatorColor="primary" textColor="inherit" />
  ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

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

### Tab 标签

- 根据 [material-design 规格](https://material.io/components/tabs#specs)，标签的 `minWidth` 从 `72px` 更改为 `90px` (没有媒体查询)
- 根据 [material-design 规格](https://material.io/components/tabs#specs)，标签的 `maxWidth` 从 `264px` 改为 `360px`。
- `span` element that wraps children has been removed. `wrapper`类名称同样被删除。 更多关于 [此更改](https://github.com/mui-org/material-ui/pull/26926) 的详细信息。

  ```diff
   <button class="MuiTab-root">
  -  <span class="MuiTab-wrapper">
       {icon}
       {label}
  -  </span>
   </button>
  ```

### TextField 文本字段

- Change the default variant from `standard` to `outlined`. Standard has been removed from the Material Design guidelines.

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

- 将 InputAdornment 的 `position` 属性设置为 `start` 或 `end`。 如果作为 `startAdornment` 属性的值则使用 `start`。 如果作为 `endAdornment` 属性的值则使用 `end`。

  ```diff
  -<TextField startAdornment={<InputAdornment>kg</InputAdornment>} />
  -<TextField endAdornment={<InputAdornment>kg</InputAdornment>} />
  +<TextField startAdornment={<InputAdornment position="start">kg</InputAdornment>} />
  +<TextField endAdornment={<InputAdornment position="end">kg</InputAdornment>} />
  ```

### TextareaAutosize 自适应文本框

- 我们移除了 `rows` 属性，你需要使用 `minRows` 属性来代替它。 这一变化旨在明确该属性的行为。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextareaAutosize rows={2} />
  >   +<TextareaAutosize minRows={2} />
  > ```

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

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

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import ToggleButton from '@mui/lab/ToggleButton';
  >   -import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
  >   +import ToggleButton from '@mui/material/ToggleButton';
  >   +import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. 更多关于 [此更改](https://github.com/mui-org/material-ui/pull/27111) 的详细信息。

  ```diff
   <button class="MuiToggleButton-root">
  -  <span class="MuiToggleButton-label">
       {children}
  -  </span>
   </button>
  ```

### Tooltip 工具提示

- 现在工具提示组件默认是可交互的：

  该组件之前的默认行为不遵循 [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)。 为了反映新的默认值，该属性被重命名为 `disableInteractive`。 如果你想回滚到旧的行为（但是这无法达到 AA 级），你可以应用下面的差异：

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>

  # 交互式的工具提示组件不再需要 `interactive` 属性。
  -<Tooltip interactive>
  +<Tooltip>
  ```

### Typography 文子铸排

- 删除 variant 的 `srOnly`。 您可以将 `visuallyHidden` 工具集与 `sx` 属性结合使用。

  ```diff
  +import { visuallyHidden } from '@mui/utils';

  -<Typography variant="srOnly">Create a user</Typography>
  +<span style={visuallyHidden}>Create a user</span>
  ```

- 下面的 `classes` 和样式替代键已被删除：“colorInherit”、“colorPrimary”、“colorSecondary”、“colorTextPrimary”、“colorTextSecondary”、“colororError”、“displayInline”和“displayBlock”。 现在这些属性被视为系统的一部分，而不是在 `Typography` 组件本身。 如果您仍然想要为他们添加样式覆盖，您可以使用 `theme.components.MuiTypography.variants` 选项。 例如

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

### Theme 主题

- 默认背景颜色现在是浅色模式下的 `#fff` ，以及在深色模式下的 `#1212`。 这符合Material Design准则。
- 断点现在被当作值而不是 [范围](https://v4.mui.com/customization/breakpoints/#default-breakpoints)。 `down(key)` 的行为被更改，以定义一个在相应断点 (独占) 定义的值下面的媒体查询， 而不是上面的断点。 `between(start, end)` 也被更新，以定义介质查询开始(包含) 到结束(排除) 之间的值。 使用 `down()` 断点工具集时，您需要将断点更新为上一步。 当使用  `between(start, end)` 时，结束断点也应向上一步更新。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

  以下是所需更改的一些例子：

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

  使用 `Hidden` 组件时也应该这样做：

  ```diff
  -<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
  +<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
  ```

- 默认断点被更改以更好地匹配常用情况。 这也更加符合Material Design准则。 [阅读更多关于更改](https://github.com/mui-org/material-ui/issues/21902)

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

  如果你喜欢旧的断点值，请使用下面的代码段。

  ```js
  import { createTheme } from '@mui/material/styles';

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

* `theme.breakpoints.width` 工具集因为多余而被删除。 使用 `theme.breakpoints.values` 获取相同的值。

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -theme.breakpoints.width('md')
  >   +theme.breakpoints.values.md
  > ```

* `theme.platette.aupmentColor` 辅助方法的签名已经改变：

  ```diff
  -theme.palette.augmentColor(red);
  +theme.palette.augmentColor({ color: red, name: 'brand' });
  ```

* `theme.typography.round` 辅助方法因为不再使用而被移除。 如果你需要它，请使用下面的函数：

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```js
  >   function round(value) {
  >     return Math.round(value * 1e5) / 1e5;
  >   }
  > ```

### `@mui/types`

- 重命名导出的 `Omit` 类型为 `@mui/types`。 该模块现在叫做 `DistributiveOmit`。 更改会消除内置的 `Omit` 辅助方法在 TypeScript v3.5中引入的混乱。 内置的 `Omit`虽然类似，但是non-distributive。 这就导致应用于联合类型时的差异。 [查看此StackOverflow 答案以了解更多详情](https://stackoverflow.com/a/57103940/1009797)。

  ```diff
  -import { Omit } from '@mui/types';
  +import { DistributiveOmit } from '@mui/types';
  ```

## Migrate theme's `styleOverrides` to emotion

虽然您在主题中定义的样式覆盖可能会部分工作，但嵌套元素的样式渲染有重要的不同。 JSS 使用的 `$` 语法将无法与Emotion兼容。 您需要用一个有效的类选择器替换那些选择器。

### 替换状态类名称

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

### 用全局类名称替换嵌套类选择器

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

> 注意：对于每个组件我们导出一个包含该组件所有嵌套类的 `[component]类` 常数。 您可以依靠这个而不是硬编码类。

```diff
+import { outlinedInputClasses } from '@mui/material/OutlinedInput';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
-         '& $notchedOutline': {
+         [`& .${outlinedInputClasses['notchedOutline']}`]: {
            borderWidth: 1,
          }
        }
      }
    }
  }
});
```

查看可用的[全局状态类名称](/customization/how-to-customize/#state-classes)列表。

## Migrate from JSS

这是迁移过程中的最后一步，从您的codebase中删除 `@mui/styles` 包。 我们可以按照优先顺序使用这两个选项之一：

### 1. 使用 `styled` 或 `sx` API

#### Codemod

我们提供一个 [codemod](https://github.com/mui-org/material-ui/blob/master/packages/mui-codemod/README.md#jss-to-styled) 来帮助将 JSS 样式迁移到 `styled` API。 但是这个方法 **会增加 CSS 的特异性**。

```sh
npx @mui/codemod v5.0.0/jss-to-styled <path>
```

**转换示例**:

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
       {/* 这种方法的好处是 Root 中的代码保持不变。 */}
       <Typography className={classes.content}>...</Typography>
       <Button className={classes.cta}>Go</Button>
-    </div>
+    </Root>
   )
 }
```

> 💡 你应该按照文件的小块运行这个codemod，然后检查更改，因为在某些情况下，你可能需要在转换后调整代码(这个codemod不会涵盖所有案例)。

当您必须创建响应式样式或需要较小的 CSS 覆盖时，我们更推荐 `sx` API 而非 `styled`。 [阅读更多关于 `sx`](/system/the-sx-prop/#main-content)。

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

#### 手动

在某些情况下，您可能想要在文件中创建多个样式组件，而不是提高CSS的针对性。 例如:

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

> **注意：** [https://siriwatk.dev/tool/jssto-stypled](https://siriwatk.dev/tool/jss-to-styled) 是一个有助于将 JS转换成多种样式组件而不增加CSS 针对性的工具。 （这个工具**不是**由MUI维护）

### 2. 使用 [tss-react](https://github.com/garronej/tss-react)

这个API 与 JSS `makeStyles` 相似，但是能够与Emotion协同工作。

  <!-- Add material-ui component migration example -->

> **注意：**这个库**不是由MUI维护**。 如果您对此有任何问题，请在 [tss-react repository](https://github.com/garronej/tss-react/issues/new) 中创建一个问题。

💡 一旦你迁移所有样式, 删除不必要的 `@mui/styles`

```sh
npm uninstall @mui/styles

// 或使用 `yarn`
yarn remove @mui/styles
```

## CSS 特性

如果您想要通过导入CSS 文件对组件应用样式， 您需要提高特异性才能选择正确的组件。 请考虑下面的示例：

```js
import './style.css';
import Chip from '@mui/material/Chip';

const ChipWithGreenIcon = () => (
  <Chip
    classes={{ deleteIcon: 'green' }}
    label="delete icon is green"
    onDelete={() => {}}
  />
);
```

在这个示例中，为了正确地将特定样式应用于删除 `Chip`的图标， 您需要跳转如下所示的特性：

```css
.MuiChip-root .green {
  color: green;
}
```

以下示例不能正确地将样式应用于删除图标：

```css
.green {
  color: green;
}
```

## Troubleshooting

### v5中的 Storybook emotion

如果你的项目使用 Storybook v6.x，你需要更新 `.storybook/main.js` webpack 配置来使用最新版本的Emotion。

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

并更新 `.storybook/preview.js` (否则storybook中的“Docs”选项卡将显示空页面)

```js
// .storybook/preview.js

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';

const defaultTheme = createTheme(); // 或您的自定义主题

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

// ...其它 storybook 导出
```

**测试版**

```json
{
  "@storybook/react": "6.3.8",
  "@storybook/addon-docs": "6.3.8",
  "@emotion/react": "11.4.1",
  "@emotion/styled": "11.3.0",
  "@mui/material": "5.0.2"
}
```

> 注意：这个设置可能无法在所有情况下工作。

欲了解更多详情，请在 GitHub 上查看这些问题。

- https://github.com/storybookjs/storybook/issues/16099
- https://github.com/mui-org/material-ui/issues/24282#issuecomment-796755133

### Cannot read property `scrollTop` of null

这个错误来自 `Fade`, `Grow`, `Slide`, `Zoom` 组件，因为缺少DOM节点。

你需要确保在使用自定义组件时，子节点将引用转发到 DOM。

```jsx
// 案例1 ✅ html 标签可以正常工作因为它是一个DOM
<Fade in>
  <div>
    <CustomComponent />
  </div>
</Fade>

// 案例2 ❌ 这将导致错误。 不要使用Fragment作为子节点
<Fade in>
  <React.Fragment>
    <CustomComponent />
  </React.Fragment>
</Fade>;

// 案例3 ❌ 这将导致错误因为`CustomComponent` 没有向DOM传递引用
function CustomComponent() {
  return <div>...</div>;
}

<Fade in>
  <CustomComponent />
</Fade>;
```

```js
// ✅ 使用 `React.forwardRef` 向DOM传递引用修复此错误。
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

欲了解更多详情，请在 GitHub 上查看 [此问题](https://github.com/mui-org/material-ui/issues/27154)。

### [Types] Property "palette", "spacing" does not exist on type 'DefaultTheme'

因为 `makeStyles` 现在从 `@mui/styles` 软件包导出，这导致其无法知道core package中的 `Theme`。 要解决这个问题，您需要通过`@mui/styles`引用核心包的`theme`声明 `DefaultTheme` (空对象) 。 [阅读更多关于模块增强](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)

**TypeScript 项目**

将此代码片段放入您的主题文件：

```ts
// 它可能是您的 App.tsx 文件或包含tsconfig.json的theme中
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface (如果你没有启用规则则删除此行)
interface DefaultTheme extends Theme {}
}
```

**Javascript 项目**

如果您的 IDE (例如VSCode) 能够从 `d.ts` 文件推断类型，请在您的 `src` 文件夹中使用此代码片段创建 `index.d.ts`：

```js
// index.d.ts
declare module "@mui/private-theming" {
  import type { Theme } from "@mui/material/styles";

  interface DefaultTheme extends Theme {}
}
```

### [Jest] SyntaxError: Unexpected token 'export'

`@mui/material/colors/red` 从v1.0.0.0开始被认为是私有的。 您应该替换导入方式， [更多关于此错误的详细信息](https://github.com/mui-org/material-ui/issues/27296)。

您可以使用此codemod (**推荐**)来修复您项目中的所有导入：

```sh
npx @mui/codemod v5.0.0/optimal-imports <path>
```

或像这样手动修复它：

```diff
-import red from '@mui/material/colors/red';
+import { red } from '@mui/material/colors';
```

### makeStyles - TypeError: Cannot read property 'drawer' of undefined

这个错误发生在 `<ThemeProvider>` 范围外调用`useStyles` ( `makeStyles`的返回值) 或 `withStyles` 时，像这样：

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
  const classes = useStyles(); // ❌在ThemeProvider以外调用
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Card className={classes.root}>...</Card>
    </ThemeProvider>
  );
}

export default App;
```

您可以通过移动 `useStyles` 到另一个组件内来修复它，这样它就可以在 `<ThemeProvider>` 内调用。

```js
// ...imports

function AppContent(props) {
  const classes = useStyles(); // ✅ 这样做是正确的的，因为它在 ThemeProvider组件内调用
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

这个错误的根源来自访问到空主题。 请确保您已经遵循这些检查步骤：

- `styled` 只能从 `@mui/material/styles` (如果您没有独立使用 `@mui/system` )中导入

  ```js
  import { styled } from '@mui/material/styles';
  ```

- 请确保不在 `<ThemeProvider>` 之外调用 `useStyles` 。 如果您有，请考虑[像这样](#makestyles-typeerror-cannot-read-property-drawer-of-undefined)修复它。

欲了解更多详情，[请查看这个问题](https://github.com/mui-org/material-ui/issues/28496)

### Styles broken after migrating to v5

在你完成前面章节中的所有步骤后，有两个原因可能导致组件的样式可能会被破坏。

首先，检查您是否将 `StyledEngineProvider`配置正确，如在 [Style library](#style-library) 章节所示。

如果您的应用程序顶部已经使用了 `StyledEngineProvider` 并且样式仍然损坏， 您的应用程序中可能仍然有 `@material-ui/core`。 它可能来自您所拥有的一些依赖关系，这仍然取决于 `@material-ui/core` (v4)。

检查这一点的最简单方式是运行 `npm ls @material-ui/core` (或 `yarn why @material-ui/core`)，这将为您提供必要的信息。

下面是一个示例：

```sh
$ npm ls @material-ui/core
project@0.1.0 /path/to/project
└─┬  @mui/x-data-grid@4.0.0
  └── @material-ui/core@4.12.3
```

您可以根据以上输出注意到 `@material-ui/core` 是 `@mui/x-data-grid` 的一个依赖项。 在这个具体的例子中， 你需要将 `@mui/x-data-grid` 到 [版本 5](https://www.npmjs.com/package/@mui/x-data-grid)，以将依赖项转换为 `@mui/materials`。
