# `@mui/styled-engine`

<p class="description">配置您首选的样式库。</p>

[emotion](https://github.com/emotion-js/emotion)是 MUI 组件用于生成 CSS 样式的默认样式库。 所有 MUI 组件都依靠 `styled()` API 将 CSS 注入到页面。 此 API 得到多个流行式样式库的支持，这样就可以在 MUI 中切换它们。

## 如何切换到 styled-components

:::error
❗ **Warning**: Using `styled-components` as an engine at this moment is not working when used in a SSR projects. The reason is that the `babel-plugin-styled-components` is not picking up correctly the usages of the `styled()` utility inside the `@mui` packages. For more details, take a look at this [issue](https://github.com/mui/material-ui/issues/29742). We strongly recommend using `emotion` for SSR projects.
:::

If you already have [styled-components](https://github.com/styled-components/styled-components) installed, it's possible to use it exclusively. There are currently two packages available to choose from:

- `@mui/styled-engine` - 一个围绕 [emotion 的 `styled()`](https://emotion.sh/docs/styled) API， 包含一些所需的方法， 例如 `<GlobalStyles />` 组件， `css` 和 `keyframe` 等。 这是默认的。
- `@mui/styled-engine-sc` - 一个类似于上者的 `styled-components` 包装库。

These two packages implement the same interface, which makes it possible to replace one with the other. By default, `@mui/material` has `@mui/styled-engine` as a dependency, but you can configure your bundler to replace it with `@mui/styled-engine-sc`.

### yarn

If you are using yarn, you can configure it using a package resolution:

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

As package resolutions are not available in npm at this moment, you need to update you bundler's config to add this alias. Here is an example of how you can do it, if you use `webpack`:

**webpack.alias.js**

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

If you are using TypeScript, you will need to also update the TSConfig.

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

If you are using create-react-app, there is a ready-to-use template in the example projects. You can use these `styled-component` examples as a reference:

<!-- #default-branch-switch -->

- [create-react-app](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-styled-components)
- [使用 TypeScript 来 create-react-app](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-styled-components-typescript)
- [其他模板](https://github.com/mui/material-ui/tree/master/examples)

:::warning
**Note**: `@emotion/react`, `@emotion/styled`, and `styled-components` are optional peer dependencies of `@mui/material`, so you need to install them yourself. See the [Installation guide](/material-ui/getting-started/installation/) for more info.
:::

This package-swap approach is identical to the replacement of React with [Preact](https://github.com/preactjs/preact). The Preact team has documented a large number of installation configurations. If you are stuck with MUI + styled-components, don't hesitate to check out how they solve the problem, as you can likely transfer the solution.
