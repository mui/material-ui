# 故障排除

<p class="description">这份文档涵盖了从Material UI v4迁移到v5时遇到的已知问题和常见问题。</p>

## Material UI v5的迁移

1. [快速入门](/material-ui/migration/migration-v4/)
2. [突破性变化第一部分：样式和主题](/material-ui/migration/v5-style-changes/)
3. [突破性变化第二部分：组件](/material-ui/migration/v5-component-changes/)
4. [从JSS迁移](/material-ui/migration/migrating-from-jss/)
5. 故障排除 👈 _你在这里_

## 迁移到v5后，样式损坏

在你完成了迁移过程中的所有步骤后，有两个原因导致组件样式可能被破坏。

首先，检查你是否正确配置了`StyledEngineProvider`，如[样式库](/material-ui/migration/v5-style-changes/#style-library)部分所示。

如果你的应用程序顶部已经使用了`StyledEngineProvider`，而样式仍然被破坏，可能是你的应用程序中仍然有`@material-ui/core`的情况。

这可能是由应用程序中仍然依赖Material UI v4的其他依赖项造成的。

To check this, run `npm ls @material-ui/core` (or `yarn why @material-ui/core`). 如果你的项目包含这样的依赖关系，你会看到一个列表，看起来像这样:

```sh
$ npm ls @material-ui/core
project@0.1.0 /path/to/project
└─┬  @mui/x-data-grid@4.0.0
  └── @material-ui/core@4.12.3
```

The output above indicates that `@material-ui/core` is a dependency of `@mui/x-data-grid`.

In this specific example, you would need to bump the version of `@mui/x-data-grid` to [v5](https://www.npmjs.com/package/@mui/x-data-grid) so that it depends on `@mui/material` instead.

## Storybook and Emotion

如果你的项目使用Storybook v6.x，你需要更新`.storybook/main.js` webpack配置以使用最新的Emotion版本。

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

接下来，更新`.storybook/preview.js`，防止Storybook的Docs标签显示一个空页面。

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

:::warning

这个解决方案已经在以下版本上进行了测试。

```json
{
  "@storybook/react": "6.3.8",
  "@storybook/addon-docs": "6.3.8",
  "@emotion/react": "11.4.1",
  "@emotion/styled": "11.3.0",
  "@mui/material": "5.0.2"
}
```

注意，这是一个变通办法，如果你使用不同的版本，可能不适合你的情况。

更多细节，请查看这些GitHub问题:

- https://github.com/storybookjs/storybook/issues/16099
- https://github.com/mui/material-ui/issues/24282#issuecomment-796755133 :::

## 无法读取属性scrollTop为空

这个错误来自于`Fade`, `Grow`, `Slide`, `Zoom`组件，因为缺少DOM节点。

确保`ref`将引用转发给自定义组件的DOM:

```jsx
// Ex. 1-1 ❌ This will cause an error because the Fragment is not a DOM node:
<Fade in>
  <React.Fragment>
    <CustomComponent />
  </React.Fragment>
</Fade>
```

```jsx
// Ex. 1-2 ✅ Add a DOM node such as this div:
<Fade in>
  <div>
    <CustomComponent />
  </div>
</Fade>
```

```jsx
// Ex. 2-1 ❌ This will cause an error because `CustomComponent` does not forward `ref` to the DOM:
function CustomComponent() {
  return <div>...</div>;
}

<Fade in>
  <CustomComponent />
</Fade>;
```

```jsx
// Ex. 2-2 ✅ Add `React.forwardRef` to forward `ref` to the DOM:
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

欲了解更多细节，请查看GitHub上的[这个问题](https://github.com/mui/material-ui/issues/27154)。

## [Types]属性 "palette"、"spacing "在类型'DefaultTheme'上不存在。

这个错误的产生是因为`makeStyles`现在是从`@mui/styles`捆绑包导出的，它不知道核心包中的`Theme`。

要解决这个问题，你需要在`@mui/styles`中用核心的`Theme`来增强`DefaultTheme`（空对象）。

在[TypeScript官方文档](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)中阅读更多关于模块增强的信息。

### TypeScript

将这个片段添加到你的主题文件中:

```ts
// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
  interface DefaultTheme extends Theme {}
}
```

### JavaScript

如果你使用的是像VSCode这样的IDE，它能够从`d.ts`文件中推断出类型，在你的`src`文件夹中创建`index.d.ts`并添加以下几行代码。

```js
// index.d.ts
declare module '@mui/private-theming' {
  import type { Theme } from '@mui/material/styles';

  interface DefaultTheme extends Theme {}
}
```

## [Jest]语法错误:未预期的标记'export'。

`@mui/material/colors/red`自v1.0.0起被视为私有。 要解决这个错误，你必须替换导入。 更多细节，请看[这个GitHub问题](https://github.com/mui/material-ui/issues/27296).

我们建议使用这个代码模型来修复你项目中的所有导入:

```sh
npx @mui/codemod v5.0.0/optimal-imports <path>
```

你可以像这样手动修复它:

```diff
-import red from '@mui/material/colors/red';
+import { red } from '@mui/material/colors';
```

## makeStyles - TypeError:无法读取未定义的属性'drawer'。

当在`<ThemeProvider>`的范围之外调用`useStyles`或`withStyles`时，会发生这个错误，如下面的例子:

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

你可以通过将`useStyles`移到另一个组件中来解决这个问题，这样它就会在`<ThemeProvider>`

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

## TypeError: 不能读取未定义的属性（eading 'pxToRem'）。

这个错误是由于试图访问一个空的主题造成的。

请确保你已经解决了以下问题:

1. `styled`应该只从`@mui/material/styles`导入（如果你不使用独立的`@mui/system`）。

```js
import { styled } from '@mui/material/styles';
```

2. `useStyles`不能被调用到`<ThemeProvider>` 要解决这个问题，请按照[本节的说明进行操作](#makestyles-typeerror-cannot-read-property-drawer-of-undefined)

更多细节，请看[这个GitHub问题](https://github.com/mui/material-ui/issues/28496)

## 仍然有问题吗？

如果你遇到了这里没有涉及的问题，请用这个标题格式[创建一个GitHub issue](https://github.com/mui/material-ui/issues/new?assignees=&labels=status%3A+needs+triage&template=1.bug.yml)。 **[Migration]你的问题的摘要**
