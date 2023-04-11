# 从JSS迁移（可选）

<p class="description">本指南解释了当从Material UI v4更新到v5时如何从JSS迁移到Emotion。</p>

## Material UI v5的迁移

1. [快速入门](/material-ui/migration/migration-v4/)
2. [突破性变化第一部分：风格和主题](/material-ui/migration/v5-style-changes/)
3. [突破性变化第二部分：组件](/material-ui/migration/v5-component-changes/)
4. 从JSS迁移过来👈 _你在这里_
5. [故障排除](/material-ui/migration/troubleshooting/)

## 从JSS迁移到Emotion

v5中最大的变化之一是将JSS替换为[Emotion](https://emotion.sh/docs/introduction)（或将[styled-components](https://styled-components.com/)作为替代）作为默认的样式解决方案。

请注意，你可以继续使用JSS为组件添加重写（例如`makeStyles`, `withStyles`），即使在迁移到v5之后。 然后，如果在任何时候你想转移到新的样式引擎，你可以逐步重构你的组件。

:::info
如果你正在使用Next.js，并且不确定如何配置SSR以与Emotion和JSS一起工作，可以看一下这个[例子项目](https://github.com/mui/material-ui/tree/master/examples/nextjs-with-typescript-v4-migration)。
:::

本文档回顾了从JSS迁移的所有必要步骤。

虽然你可以使用以下两个选项中的任何一个，但第一个被认为是最好的:

### 1. 使用styled或sx API

#### Codemod

我们提供了[一个codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#jss-to-styled)来帮助将JSS样式迁移到`styled`的API，但这种方法增加了CSS的特殊性。

:::info
通常情况下，你不会写这样的样式。 但这是我们能用codemod创造的最好的转变。

如果你以后想完善它们，你可以参考下面几节中的例子。
:::

```sh
npx @mui/codemod v5.0.0/jss-to-styled <path>
```

示例转换：

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

:::warning
你应该在一小块文件上运行这个代码模型，然后在继续之前检查变化，因为在某些情况下，你可能需要在转换之后调整代码--这个代码模型不会涵盖所有情况。
:::

#### Manual

我们推荐`sx` API而不是`styled`用于创建响应式样式或覆盖次要的CSS。 [Read more about `sx` here](/system/getting-started/the-sx-prop/).

```diff
 import Chip from '@mui/material/Chip';
-import makeStyles from '@mui/styles/makeStyles';
+import Box from '@mui/material/Box';

-const useStyles = makeStyles((theme) => ({
-  wrapper: {
-    display: 'flex',
-  },
-  chip: {
-    padding: theme.spacing(1, 1.5),
-    boxShadow: theme.shadows[1],
-  }
-}));

 function App() {
-  const classes = useStyles();
   return (
-    <div className={classes.wrapper}>
-      <Chip className={classes.chip} label="Chip" />
-    </div>
+    <Box sx={{ display: 'flex' }}>
+      <Chip label="Chip" sx={{ py: 1, px: 1.5, boxShadow: 1 }} />
+    </Box>
   );
 }
```

在某些情况下，你可能想在一个文件中创建多个styled的组件，而不是增加CSS的特殊性。

例如：

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

:::warning
[这个jss-to-styled工具](https://siriwatk.dev/tool/jss-to-styled)有助于在不增加CSS特异性的情况下将JSS转换为多种样式的组件。

这个工具_不是_由MUI维护的。
:::

### 2. Use [tss-react](https://github.com/garronej/tss-react)

如果你[使用`styled-components`作为底层样式引擎来代替`@emotion`](/material-ui/guides/interoperability/#styled-components)，那么这个API将无法工作。
:::

该API类似于JSS的`makeStyles`，但在hood之下，它使用`@emotion/react`。 它还具有比v4的`makeStyles`更好的TypeScript支持。

为了使用它，你需要把它添加到你的项目的依赖项中:

使用npm：

```sh
npm install tss-react
```

用 yarn：

```sh
yarn add tss-react
```

#### Codemod

我们提供了[一个codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#jss-to-tss-react)来帮助将JSS样式迁移到`tss-react` API。

```sh
npx @mui/codemod v5.0.0/jss-to-tss-react <path>
```

示例转换：

```diff
 import React from 'react';
-import makeStyles from '@material-ui/styles/makeStyles';
+import { makeStyles } from 'tss-react/mui';
 import Button from '@mui/material/Button';
 import Link from '@mui/material/Link';

-const useStyles = makeStyles((theme) => {
+const useStyles = makeStyles()((theme) => {
   return {
     root: {
       color: theme.palette.primary.main,
     },
     apply: {
       marginRight: theme.spacing(2),
     },
   };
 });

 function Apply() {
-  const classes = useStyles();
+  const { classes } = useStyles();

   return (
     <div className={classes.root}>
       <Button component={Link} to="https://support.mui.com" className={classes.apply}>
         Apply now
       </Button>
     </div>
   );
 }

 export default Apply;
```

如果你使用`$`语法和`clsx`来组合多个CSS类，那么转变会是这样的。

```diff
 import * as React from 'react';
-import { makeStyles } from '@material-ui/core/styles';
-import clsx from 'clsx';
+import { makeStyles } from 'tss-react/mui';

-const useStyles = makeStyles((theme) => ({
+const useStyles = makeStyles<void, 'child' | 'small'>()((theme, _params, classes) => ({
   parent: {
     padding: 30,
-    '&:hover $child': {
+    [`&:hover .${classes.child}`]: {
       backgroundColor: 'red',
     },
   },
   small: {},
   child: {
     backgroundColor: 'blue',
     height: 50,
-    '&$small': {
+    [`&.${classes.small}`]: {
       backgroundColor: 'lightblue',
       height: 30
     }
   },
 }));

 function App() {
-  const classes = useStyles();
+  const { classes, cx } = useStyles();
   return (
     <div className={classes.parent}>
       <div className={classes.child}>
         Background turns red when the mouse hovers over the parent.
       </div>
-      <div className={clsx(classes.child, classes.small)}>
+      <div className={cx(classes.child, classes.small)}>
         Background turns red when the mouse hovers over the parent.
         I am smaller than the other child.
       </div>
     </div>
   );
 }

 export default App;
```

当使用JavaScript（而不是TypeScript）时，移除`<void, 'child' | 'small'>`
:::

下面是一个使用 `$` 语法、`useStyles()`参数、从`classes`道具中合并类（[见doc](https://docs.tss-react.dev/your-own-classes-prop)）以及[为样式表明确命名的综合例子](https://docs.tss-react.dev/page-1/makestyles-usestyles#naming-the-stylesheets-useful-for-debugging-and-theme-style-overrides)。

```diff
-import clsx from 'clsx';
-import { makeStyles, createStyles } from '@material-ui/core/styles';
+import { makeStyles } from 'tss-react/mui';

-const useStyles = makeStyles((theme) => createStyles<
-  'root' | 'small' | 'child', {color: 'primary' | 'secondary', padding: number}
->
-({
-  root: ({color, padding}) => ({
+const useStyles = makeStyles<{color: 'primary' | 'secondary', padding: number}, 'child' | 'small'>({name: 'App'})((theme, { color, padding }, classes) => ({
+  root: {
     padding: padding,
-    '&:hover $child': {
+    [`&:hover .${classes.child}`]: {
       backgroundColor: theme.palette[color].main,
     }
-  }),
+  },
   small: {},
   child: {
     border: '1px solid black',
     height: 50,
-    '&$small': {
+    [`&.${classes.small}`]: {
       height: 30
     }
   }
-}), {name: 'App'});
+}));

 function App({classes: classesProp}: {classes?: any}) {
-  const classes = useStyles({color: 'primary', padding: 30, classes: classesProp});
+  const { classes, cx } = useStyles({
+    color: 'primary',
+    padding: 30
+  }, {
+    props: {
+      classes: classesProp
+    }
+  });

   return (
     <div className={classes.root}>
       <div className={classes.child}>
         The Background take the primary theme color when the mouse hovers the parent.
       </div>
-      <div className={clsx(classes.child, classes.small)}>
+      <div className={cx(classes.child, classes.small)}>
         The Background take the primary theme color when the mouse hovers the parent.
         I am smaller than the other child.
       </div>
    </div>
  );
}

export default App;
```

在运行该代码后，在你的代码中搜索 "TODO jss-to-tss-react codemod"，以找到该代码不能可靠地处理的情况。

除了那些有TODO注释的情况外，可能还有其他情况没有被codemod完全处理--特别是如果部分样式是由函数返回的。

如果埋在函数中的样式使用 `$` 语法或`useStyles`参数，那么这些样式将不会被适当地迁移。

:::error
你应该放弃[`clsx`](https://www.npmjs.com/package/clsx)而选择[`cx`](https://emotion.sh/docs/@emotion/css#cx)。

`cx`的关键优势在于它能检测到Emotion生成的类名，以确保样式以正确的顺序被覆盖。

在JSS和tss-react之间，多个CSS类的样式的默认优先级是不同的，可能需要对`cx`参数进行一些手动的重新排序--更多细节请参见[本问题讨论](https://github.com/mui/material-ui/pull/31802#issuecomment-1093478971)。
:::

为了确保你的类名总是包括你的组件的实际名称，你可以将`名称`作为一个隐式命名的键来提供(`name: { App }`).

详情请见[此tss-react文档](https://docs.tss-react.dev/page-1/makestyles-usestyles#naming-the-stylesheets-useful-for-debugging-and-theme-style-overrides)。

如果你解构了一个以上的项目，你可能会遇到[类似这样](https://user-images.githubusercontent.com/6702424/148657837-eae48942-fb86-4516-abe4-5dc10f44f0be.png)的eslint警告。

不要犹豫，禁用`eslint(prefer-const)`，在普通项目中[是这样](https://github.com/thieryw/gitlanding/blob/b2b0c71d95cfd353979c86dfcfa1646ef1665043/.eslintrc.js#L17)，在CRA中也[是这样](https://github.com/InseeFrLab/onyxia-web/blob/a264ec6a6a7110cb1a17b2e22cc0605901db6793/package.json#L133)。

#### withStyles()

`tss-react` also features a [type-safe implementation](https://docs.tss-react.dev/page-1/withstyles) of [v4's `withStyles()`](https://v4.mui.com/styles/api/#withstyles-styles-options-higher-order-component).

:::info
tss的`withStyles()`也支持等同于 `$` 的语法。 [See doc](https://docs.tss-react.dev/nested-selectors#withstyles).
:::

```diff
-import Button from '@material-ui/core/Button';
+import Button from '@mui/material/Button';
-import withStyles from '@material-ui/styles/withStyles';
+import { withStyles } from 'tss-react/mui';

 const MyCustomButton = withStyles(
+  Button,
   (theme) => ({
     root: {
       minHeight: '30px',
     },
     textPrimary: {
       color: theme.palette.text.primary,
     },
     '@media (min-width: 960px)': {
       textPrimary: {
         fontWeight: 'bold',
       },
     },
   }),
-)(Button);
+);

 export default MyCustomButton;
```

#### Theme style overrides

[全局主题覆盖](https://v4.mui.com/customization/components/#global-theme-override)是由TSS支持的。

按照[Breaking changes](/material-ui/migration/v5-style-changes/#restructure-component-definitions) doc相关部分的指示，为`makeStyles`</a>

提供一个`名字`。</p> 

在Material UI v5中，[样式覆盖也接受回调](https://mui.com/material-ui/customization/theme-components/)。

默认情况下，TSS只能够提供主题。 如果你想提供props和`ownerState`，[请参考这个文档](https://docs.tss-react.dev/mui-theme-styleoverrides)。

:::warning
tss-react_不是_由MUI维护的。

如果你对如何设置SSR（Next.js）有任何疑问，或者你想知道如何定制`主题`对象，请参考tss-react文档-特别是[MUI集成部分](https://github.com/garronej/tss-react#mui-integration)。

你也可以为任何错误或功能请求[提交一个问题](https://github.com/garronej/tss-react/issues/new)，如果你需要帮助，可以[开始讨论](https://github.com/garronej/tss-react/discussions)。
:::



## 完成迁移

一旦你迁移了所有的样式，通过卸载软件包来移除不必要的`@mui/styles`。

使用npm：



```sh
npm uninstall @mui/styles
```


用 yarn：



```sh
yarn remove @mui/styles
```


:::warning
`@emotion/styled` is a peer dependency of `@mui/material`. 你必须在你的依赖关系中保留它，即使你从未明确使用它。
:::
