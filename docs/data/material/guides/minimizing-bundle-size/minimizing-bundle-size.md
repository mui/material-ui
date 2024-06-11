# Minimizing bundle size

<p class="description">Learn more about the tools you can leverage to reduce the bundle size.</p>

## Bundle size matters

Material UI's maintainers take bundle size very seriously. Size snapshots are taken
on every commit for every package and critical parts of those packages.
Combined with [dangerJS](https://danger.systems/js/) we can inspect
[detailed bundle size changes](https://github.com/mui/material-ui/pull/14638#issuecomment-466658459) on every Pull Request.

## When and how to use tree-shaking?

Tree-shaking Material UI works out of the box in modern frameworks.
Material UI exposes its full API on the top-level `@mui` imports.
If you're using ES6 modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) you can safely use named imports and still get an optimized bundle size automatically:

```js
import { Button, TextField } from '@mui/material';
```

:::warning
The following instructions are only needed if you want to optimize your development startup times or if you are using an older bundler that doesn't support tree-shaking.
:::

## Development environment

Development bundles can contain the full library which can lead to **slower startup times**.
This is especially noticeable if you use named imports from `@mui/icons-material`, which can be up to six times slower than the default import.
For example, between the following two imports, the first (named) can be significantly slower than the second (default):

```js
// 🐌 Named
import { Delete } from '@mui/icons-material';
```

```js
// 🚀 Default
import Delete from '@mui/icons-material/Delete';
```

If this is an issue for you, you have two options:

### Option one: use path imports

You can use path imports to avoid pulling in unused modules.
For instance, use:

```js
// 🚀 Fast
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
```

instead of top-level imports (without a Babel plugin):

```js
import { Button, TextField } from '@mui/material';
```

This is the option we document in all the demos since it requires no configuration.
It is encouraged for library authors that are extending the components.
Head to [Option 2](#option-two-use-a-babel-plugin) for the approach that yields the best DX and UX.

While importing directly in this manner doesn't use the exports in [the main file of `@mui/material`](https://unpkg.com/@mui/material), this file can serve as a handy reference as to which modules are public.

Be aware that we only support first and second-level imports.
Anything deeper is considered private and can cause issues, such as module duplication in your bundle.

```js
// ✅ OK
import { Add as AddIcon } from '@mui/icons-material';
import { Tabs } from '@mui/material';
//                         ^^^^^^^^ 1st or top-level

// ✅ OK
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
//                              ^^^^ 2nd level

// ❌ NOT OK
import TabIndicator from '@mui/material/Tabs/TabIndicator';
//                                           ^^^^^^^^^^^^ 3rd level
```

If you're using ESLint you can catch problematic imports with the [`no-restricted-imports` rule](https://eslint.org/docs/latest/rules/no-restricted-imports). The following `.eslintrc` configuration will highlight problematic imports from `@mui` packages:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@mui/*/*/*"]
      }
    ]
  }
}
```

### Option two: use a Babel plugin

This option provides the best user experience and developer experience:

- UX: The Babel plugin enables top-level tree-shaking even if your bundler doesn't support it.
- DX: The Babel plugin makes startup time in dev mode as fast as Option 1.
- DX: This syntax reduces the duplication of code, requiring only a single import for multiple modules.
  Overall, the code is easier to read, and you are less likely to make a mistake when importing a new module.

```js
import { Button, TextField } from '@mui/material';
```

However, you need to apply the two following steps correctly.

#### 1. Configure Babel

Pick one of the following plugins:

- [babel-plugin-import](https://github.com/umijs/babel-plugin-import) with the following configuration:

  `yarn add -D babel-plugin-import`

  Create a `.babelrc.js` file in the root directory of your project:

  ```js
  const plugins = [
    [
      'babel-plugin-import',
      {
        libraryName: '@mui/material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@mui/icons-material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ];

  module.exports = { plugins };
  ```

- [babel-plugin-direct-import](https://github.com/avocadowastaken/babel-plugin-direct-import) with the following configuration:

  `yarn add -D babel-plugin-direct-import`

  Create a `.babelrc.js` file in the root directory of your project:

  ```js
  const plugins = [
    [
      'babel-plugin-direct-import',
      { modules: ['@mui/material', '@mui/icons-material'] },
    ],
  ];

  module.exports = { plugins };
  ```

If you are using Create React App, you will need to use a couple of projects that let you use `.babelrc` configuration, without ejecting.

`yarn add -D react-app-rewired customize-cra`

Create a `config-overrides.js` file in the root directory:

```js
/* config-overrides.js */
/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, override } = require('customize-cra');

module.exports = override(useBabelRc());
```

If you wish, `babel-plugin-import` can be configured through `config-overrides.js` instead of `.babelrc` by using this [configuration](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options).

Modify your `package.json` commands:

```diff
   "scripts": {
-    "start": "react-scripts start",
-    "build": "react-scripts build",
-    "test": "react-scripts test",
+    "start": "react-app-rewired start",
+    "build": "react-app-rewired build",
+    "test": "react-app-rewired test",
     "eject": "react-scripts eject"
  }
```

Enjoy significantly faster start times.

#### 2. Convert all your imports

Finally, you can convert your existing codebase to this option with this [top-level-imports codemod](https://www.npmjs.com/package/@mui/codemod#top-level-imports).
It will perform the following diffs:

```diff
-import Button from '@mui/material/Button';
-import TextField from '@mui/material/TextField';
+import { Button, TextField } from '@mui/material';
```

## Available bundles

### Default bundle

The packages published on npm are **transpiled** with [Babel](https://github.com/babel/babel), optimized for performance with the [supported platforms](/material-ui/getting-started/supported-platforms/).

A [modern bundle](#modern-bundle) is also available.

### How to use custom bundles?

:::error
You are strongly discouraged to:

- Import from any of the custom bundles directly. Do not do this:

  ```js
  import { Button } from '@mui/material/legacy';
  ```

  You have no guarantee that the dependencies also use legacy or modern bundles, leading to module duplication in your JavaScript files.

- Import from any of the undocumented files or folders. Do not do this:

  ```js
  import { Button } from '@mui/material/esm';
  ```

  You have no guarantee that these imports will continue to work from one version to the next.

  :::

A great way to use these bundles is to configure bundler aliases, for example with [Webpack's `resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias):

```js
{
  resolve: {
    alias: {
      '@mui/material': '@mui/material/legacy',
      '@mui/styled-engine': '@mui/styled-engine/legacy',
      '@mui/system': '@mui/system/legacy',
      '@mui/base': '@mui/base/legacy',
      '@mui/utils': '@mui/utils/legacy',
      '@mui/lab': '@mui/lab/legacy',
    }
  }
}
```

### Modern bundle

The modern bundle can be found under the [`/modern` folder](https://unpkg.com/@mui/material/modern/).
It targets the latest released versions of evergreen browsers (Chrome, Firefox, Safari, Edge).
This can be used to make separate bundles targeting different browsers.
