# `@mui/styled-engine`

<p class="description">配置您首选的样式库。</p>

[emotion](https://github.com/emotion-js/emotion)是 MUI 组件用于生成 CSS 样式的默认样式库。 所有 MUI 组件都依靠 `styled()` API 将 CSS 注入到页面。 此 API 得到多个流行式样式库的支持，这样就可以在 MUI 中切换它们。

## 如何切换到 styled-components

:::error ❗ **Warning**: Using `styled-components` as an engine at this moment is not working when used in a SSR projects. The reason is that the `babel-plugin-styled-components` is not picking up correctly the usages of the `styled()` utility inside the `@mui` packages. For more details, take a look at this [issue](https://github.com/mui/material-ui/issues/29742). We strongly recommend using `emotion` for SSR projects. :::

如果您已经安装了[styled-components](https://github.com/styled-components/styled-components)，就有可能专门使用它。 目前有两个包可供选择：

- `@mui/styled-engine` - 一个围绕 [emotion 的 `styled()`](https://emotion.sh/docs/styled) API， 包含一些所需的方法， 例如 `<GlobalStyles />` 组件， `css` 和 `keyframe` 等。 这是默认的。
- `@mui/styled-engine-sc` - 一个类似于上者的 `styled-components` 包装库。

这两个包都实现了相同的接口，使其可以相互替换。 默认情况下，`@mui/material`使用`@mui/styled-engine`作为依赖，但您可以通过配置捆绑包将依赖替换为`@mui/styled-engine-sc`

### yarn

如果您正在使用yarn，可以使用如下的包解决方案来配置：

**package.json**

<!-- #default-branch-switch -->

```diff
 module.exports = {
  //...
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
};
```

### npm

由于目前在 npm 中无法找到软件包解决方案，您需要更新您的配置来添加此别名。 如果您使用 `webpack` ，您可以参考如下示例：

**webpack.config.js**

```diff
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

如果您正在使用TypeScript，您也需要更新TSConfig。

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
These two packages implement the same interface, which makes it makes possible to replace one with the other. By default, <code>@mui/core</code> has <code>@mui/styled-engine</code> as a dependency, but you can configure your bundler to replace it with <code>@mui/styled-engine-sc</code>. For example, if you are using webpack you can configure this by adding a resolver:
```

### Ready-to-use examples

如果您正在使用 create-react-app，示例项目中有一个可使用的模板。 您可以使用这些 `styled-component` 示例作为参考：

<!-- #default-branch-switch -->

- [create-react-app](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-styled-components)
- [使用 TypeScript 来 create-react-app](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-styled-components-typescript)
- [其他模板](https://github.com/mui/material-ui/tree/master/examples)

:::warning **Note**: `@emotion/react`, `@emotion/styled`, and `styled-components` are optional peer dependencies of `@mui/material`, so you need to install them yourself. See the [Installation guide](/material-ui/getting-started/installation/) for more info. :::

This package-swap approach is identical to the replacement of React with [Preact](https://github.com/preactjs/preact). The Preact team has documented a large number of installation configurations. If you are stuck with MUI + styled-components, don't hesitate to check out how they solve the problem, as you can likely transfer the solution.
