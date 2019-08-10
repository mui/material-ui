# Minimizando el tamaño del paquete

<p class="description">Learn more about the tools you can leverage to reduce the bundle size.</p>

## Bundle size matters

The bundle size of Material-UI is taken very seriously. We take size snapshots on every commit for every package and critical parts of those packages ([view the latest snapshot](/size-snapshot)). Combined with [dangerJS](https://danger.systems/js/) we can inspect [detailed bundle size changes](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) on every Pull Request.

## How to reduce the bundle size?

For convenience, Material-UI exposes its full API on the top-level `material-ui` import. If you're using ES6 modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) you can safely use named imports and expect only a minimal set of Material-UI components in your bundle:

```js
import { Button, TextField } from '@material-ui/core';
```

⚠️ Be aware that tree-shaking is an optimization that is usually only applied to production bundles. Development bundles will contain the full library which can lead to **slower startup times**. This is especially noticeable if you import from `@material-ui/icons`. Startup times can be approximately 6x slower than without named imports from the top-level API.

If this is an issue for you, you have various options:

### Option 1

You can use path imports to avoid pulling in unused modules. For instance, instead of:

```js
import { Button, TextField } from '@material-ui/core';
```

use:

```js
// 🚀 Fast
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

This is the option we document in **all** the demos because it requires no configuration. We encourage it for library authors extending our components. Head to [Option 2](#option-2) for the approach that yields the best DX and UX.

While importing directly in this manner doesn't use the exports in [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js), this file can serve as a handy reference as to which modules are public.

Be aware that we only support first and second level imports. Anything below is considered private and can cause module duplication in your bundle.

```js
// ✅ OK
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 1st or top-level

// ✅ OK
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 2nd level

// ❌ NOT OK
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 3rd level
```

### Option 2

This option provides the best DX and UX. However, you need to apply the following steps correctly.

#### 1. Configure Babel

Pick one of the following plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) with the following configuration:

```js
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: 'esm', // or '' if your bundler does not support ES modules
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: 'esm', // or '' if your bundler does not support ES modules
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ],
  ```
- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports) with the following configuration:

  ```js
  plugins: [
    'babel-plugin-transform-imports',
    {
      '@material-ui/core': {
        transform: '@material-ui/core/esm/${member}',
        // for bundlers not supporting ES modules use:
        // transform: '@material-ui/core/${member}',
        preventFullImport: true,
      },
      '@material-ui/icons': {
        transform: '@material-ui/icons/esm/${member}',
        // for bundlers not supporting ES modules use:
        // transform: '@material-ui/icons/${member}',
        preventFullImport: true,
      },
    },
  ],
  ```

#### 2. Convert all your imports

Finally, you can convert your exisiting codebase to this option with our [top-level-imports](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-codemod/README.md#top-level-imports) codemod.
It will perform the following diffs:

```diff
-import Button from '@material-ui/core/Button';
-import TextField from '@material-ui/core/TextField';
+import { Button, TextField } from '@material-ui/core';
```

## ECMAScript

The package published on npm is **transpiled**, with [Babel](https://github.com/babel/babel), to take into account the [supported platforms](/getting-started/supported-platforms/).

We also publish a second version of the components. You can find this version under the [`/es` folder](https://unpkg.com/@material-ui/core/es/). All the non-official syntax is transpiled to the [ECMA-262 standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm), nothing more. This can be used to make separate bundles targeting different browsers. Older browsers will require more JavaScript features to be transpiled, which increases the size of the bundle. No polyfills are included for ES2015 runtime features. IE11+ and evergreen browsers support all the necessary features. If you need support for other browsers, consider using [`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill).

⚠️ In order to minimize duplication of code in users' bundles, we **strongly discourage** library authors from using the `/es` folder.