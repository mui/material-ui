# Using styled-components

<p class="description">Learn how to use styled-components instead of Emotion with Material UI.</p>

:::error
As of late 2021, [styled-components](https://github.com/styled-components/styled-components) is **not compatible** with server-rendered Material UI projects.
This is because `babel-plugin-styled-components` isn't able to work with the `styled()` utility inside `@mui` packages.
See [this GitHub issue](https://github.com/mui/material-ui/issues/29742) for more details.

We **strongly recommend** using Emotion for SSR projects.
:::

By default, Material UI uses [Emotion](https://github.com/emotion-js/emotion) to generate CSS styles.
All components rely on the `styled()` API to inject CSS into the page.
This API is supported by multiple popular styling libraries, which makes it possible to switch between them in Material UI.

We provide two different packages to wrap your chosen styling solution for compatibility with Material UI:

- `@mui/styled-engine`: a thin wrapper around Emotion's [`styled()`](https://emotion.sh/docs/styled) API that includes required utilities like the `<GlobalStyles />` component, the `css` and `keyframe` helpers, and more. This is the default, and you do not need to install it.
- `@mui/styled-engine-sc`: a similar wrapper, but specifically tailored for styled-components. You must install and implement this package to use styled-components with Material UI.

These two packages implement the same interface, making them interchangeable.

## Bundler configuration

By default, `@mui/material` has `@mui/styled-engine` as a dependency.
To use styled-components, you need to configure your bundler to replace it with `@mui/styled-engine-sc`.

### With yarn

If you're using yarn, you can configure it using a package resolution:

<!-- #npm-tag-reference -->

```diff title="package.json"
 {
   "dependencies": {
-    "@mui/styled-engine": "latest"
+    "@mui/styled-engine": "npm:@mui/styled-engine-sc@latest"
   },
+  "resolutions": {
+    "@mui/styled-engine": "npm:@mui/styled-engine-sc@latest"
+  },
 }
```

### With npm

Because package resolutions aren't available with npm, you must update your bundler's config to add this alias.
The example below shows how to do this with webpack:

```diff title="webpack.config.js"
 module.exports = {
   //...
+  resolve: {
+    alias: {
+      '@mui/styled-engine': '@mui/styled-engine-sc'
+    },
+  },
 };
```

For TypeScript, you must also update the `tsconfig.json` as shown here:

```diff title="tsconfig.json"
 {
   "compilerOptions": {
+    "paths": {
+      "@mui/styled-engine": ["./node_modules/@mui/styled-engine-sc"]
+    }
   },
 }
```

### Next.js

```diff title="next.config.js"
+const withTM = require('next-transpile-modules')([
+  '@mui/material',
+  '@mui/system',
+  '@mui/icons-material', // If @mui/icons-material is being used
+]);

+module.exports = withTM({
 webpack: (config) => {
   config.resolve.alias = {
     ...config.resolve.alias,
+    '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  }
+});
```

:::info
**Versions compatibility**: To ensure compatibility, it's essential to align the major version of `@mui/styled-engine-sc` with that of the `styled-components` package you're using. For instance, if you opt for `styled-components` version 5, it's necessary to use `@mui/styled-engine-sc` version 5. Similarly, if your preference is `styled-components` version 6, you'll need to upgrade `@mui/styled-engine-sc` to its version 6, which is currently in an alpha state.
:::
