# `@material-ui/styled-engine`

<p class="description">配置您首选的样式库。</p>

[emotion](https://github.com/emotion-js/emotion)是 MUI 组件用于生成 CSS 样式的默认样式库。 所有 MUI 组件都依靠 `styled()` API 将 CSS 注入到页面。 此 API 得到多个流行式样式库的支持，这样就可以在 MUI 中切换它们。

## 如何切换到 styled-components

> ❗ **警告**: 目前使用 `styled-components` 作为服务端渲染(SSR)项目的样式引擎时无法工作。 原因是 `babel-plugin-styled-components` 没有正确获取 `@mui` 软件包中的 `styled()` 方法。 欲了解更多详情，请查看这个 [issue](https://github.com/mui/material-ui/issues/29742)。 我们强烈建议在服务端渲染(SSR)项目中使用 `emotion`。

如果您已经安装了 [styled-components](https://github.com/styled-components/styled-components) ，用它作为样式引擎是可行的。 目前有两个软件包可供选择：

- `@mui/styled-engine` - 一个围绕 [emotion 的 `styled()`](https://emotion.sh/docs/styled) API， 包含一些所需的方法， 例如 `<GlobalStyles />` 组件， `css` 和 `keyframe` 等。 这是默认的。
- `@mui/styled-engine-sc` - 一个类似于上者的 `styled-components` 包装库。

这两个包实现了相同的接口，使一个软件包能够被另一个软件包替换。 默认情况下， `@mui/materials` 用 `@mui/styed-engine` 作为依赖， 但是您可以将其替换为 `@mui/styed-engine-sc`

### yarn

如果您正在使用 yarn，您可以使用 resolution 来实现配置：

**webpack.config.js**

<!-- #default-branch-switch -->

```diff
 module.exports = {
  //...
  resolve: {
    alias: {
      '@material-ui/styled-engine': '@material-ui/styled-engine-sc',
    },
  },
};
```

### npm

由于目前在 npm 中没有 resolution，您需要更新您的打包配置来添加此 alias。 如果您使用 `webpack` ，您可以依照下面的示例来配置：

**webpack.alias.js**

```diff
 module.exports = {
   //...
module.exports = {
   //...
module.exports = {
   //...
+  resolve: {
+    alias: {
+      '@mui/styled-engine': '@mui/styled-engine-sc'
+    },
+  },
 };
```

如果您正在使用 TypeScript，您也需要更新 TSConfig。

**tsconfig.json**

```diff
 {
   "compilerOptions": {
+    "paths": {
+      "@mui/styled-engine": ["./node_modules/@mui/styled-engine-sc"]
+    }
   },
 }
```

### Next.js

**next.config.js**

```diff
These two packages implement the same interface, which makes it makes possible to replace one with the other. By default, <code>@material-ui/core</code> has <code>@material-ui/styled-engine</code> as a dependency, but you can configure your bundler to replace it with <code>@material-ui/styled-engine-sc</code>. For example, if you are using webpack you can configure this by adding a resolver:
```

### Ready-to-use examples

如果您正在使用 create-react-app，示例项目中有一个开箱即用的模板。 如果您已经安装了 `styled-components` , 单独使用它是可行的。 目前有两种方式可供选择:

<!-- #default-branch-switch -->

- [create-react-app](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-styled-components)
- [使用 TypeScript 来 create-react-app](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-styled-components-typescript)
- [其他模板](https://github.com/mui/material-ui/tree/master/examples)

> **注意**: `@emotion/react`, `@emotion/styled`, 和 `styled-components` 是 `@mui/materials` 的可选对等依赖，所以您需要自己安装它们。 更多信息请访问 [安装指南](/material-ui/getting-started/installation/)。

**注意：** 这个 package-swap 方法与替换 React 的 [Preact](https://github.com/preactjs/preact) 完全相同。 Preact 开发团队记录了大量安装配置。 如果您被 MUI + styled-components 卡住，请不要犹豫，直接查看他们是如何解决问题的，因为您可能会在里面找到解决思路。
