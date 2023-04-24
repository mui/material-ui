# `@mui/styled-engine`

<p class="description">Configuring your preferred styling library.</p>

The default style library used for generating CSS styles for MUI components is [emotion](https://github.com/emotion-js/emotion).
All of the MUI components rely on the `styled()` API to inject CSS into the page.
This API is supported by multiple popular styling libraries, which makes it possible to switch between them in MUI.

## How to switch to styled-components

:::error
Using `styled-components` as an engine at this moment is not working when used in a SSR projects.
The reason is that the `babel-plugin-styled-components` is not picking up correctly the usages of the `styled()` utility inside the `@mui` packages.
For more details, take a look at this [issue](https://github.com/mui/material-ui/issues/29742).
We strongly recommend using Emotion for SSR projects.
:::

If you already have [styled-components](https://github.com/styled-components/styled-components) installed, it's possible to use it exclusively.
There are currently two packages available to choose from:

- `@mui/styled-engine` - a thin wrapper around [emotion's `styled()`](https://emotion.sh/docs/styled) API, with the addition of few other required utilities, such as the `<GlobalStyles />` component, the `css` and `keyframe` helpers, etc. This is the default.
- `@mui/styled-engine-sc` - a similar wrapper around `styled-components`.

These two packages implement the same interface, which makes it possible to replace one with the other.
By default, `@mui/material` has `@mui/styled-engine` as a dependency, but you can configure your bundler to replace it with `@mui/styled-engine-sc`.

### yarn

If you are using yarn, you can configure it using a package resolution:

**package.json**

<!-- #default-branch-switch -->

```diff
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

### npm

As package resolutions are not available in npm at this moment, you need to update you bundler's config to add this alias. Here is an example of how you can do it, if you use `webpack`:

**webpack.config.js**

```diff
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

### Ready-to-use examples

If you are using create-react-app, there is a ready-to-use template in the example projects.
You can use these `styled-component` examples as a reference:

<!-- #default-branch-switch -->

- [create-react-app](https://github.com/mui/material-ui/tree/master/examples/material-cra-styled-components)
- [create-react-app with TypeScript](https://github.com/mui/material-ui/tree/master/examples/material-cra-styled-components-ts)
- [and many others](https://github.com/mui/material-ui/tree/master/examples)

:::warning
`@emotion/react`, `@emotion/styled`, and `styled-components` are optional peer dependencies of `@mui/material`, so you need to install them yourself. See the [Installation guide](/material-ui/getting-started/installation/) for more info.
:::

This package-swap approach is identical to the replacement of React with [Preact](https://github.com/preactjs/preact). The Preact team has documented a large number of installation configurations. If you are stuck with Material UI + styled-components, don't hesitate to check out how they solve the problem, as you can likely transfer the solution.

## Theme scoping

:::warning
Having more than one styling libraries could introduce unnecessary complexity to your project. You should have a very good reason to do this.
:::

Material UI can coexist with other libraries that depend on emotion or styled-components. To do that, render Material UI's `ThemeProvider` as an inner provider and use the `THEME_ID` to store the theme.

```js
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import { AnotherThemeProvider } from 'another-ui-library';

const materialTheme = createTheme(…your theme);

function App() {
  return (
    <AnotherThemeProvider>
      <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        …components from another library and Material UI
      </ThemeProvider>
    </AnotherThemeProvider>
  )
}
```

The theme of Material UI will be separated from the other library, so when you use APIs such as `styled`, `sx` prop, and `useTheme`, you will be able to access Material UI's theme like you normally would.

### Using with [Theme UI](https://theme-ui.com/)

Render Material UI's theme provider below Theme UI's provider and assign the material theme to the `THEME_ID` property.

```js
import { ThemeProvider as ThemeUIThemeProvider } from 'theme-ui';
import { createTheme as materialCreateTheme, THEME_ID } from '@mui/material/styles';

const themeUITheme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
};

const materialTheme = materialCreateTheme();

function App() {
  return (
    <ThemeUIThemeProvider theme={themeUITheme}>
      <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        Theme UI components and Material UI components
      </MaterialThemeProvider>
    </ThemeUIThemeProvider>
  );
}
```

### Using with Chakra UI

Render Material UI's theme provider below Chakra UI's provider and assign the material theme to the `THEME_ID` property.

```js
import { ChakraProvider, extendTheme as chakraExtendTheme } from '@chakra-ui/react';
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme as muiCreateTheme,
  THEME_ID,
} from '@mui/material/styles';

const chakraTheme = chakraExtendTheme();
const materialTheme = muiCreateTheme();

function App() {
  return (
    <ChakraProvider theme={chakraTheme} resetCSS>
      <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        Chakra UI components and Material UI components
      </MaterialThemeProvider>
    </ChakraProvider>
  );
}
```
