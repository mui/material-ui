# Réduire la taille du bundle

<p class="description">En savoir plus sur les outils que vous pouvez utiliser pour réduire la taille du bundle.</p>

## La taille du bundle compte

The bundle size of Material-UI is taken very seriously. We take size snapshots on every commit for every package and critical parts of those packages ([view latest snapshot](/size-snapshot)). Combined with [dangerJS](https://danger.systems/js/) we can inspect [detailed bundle size changes](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) on every Pull Request.

## Comment réduire la taille du bundle?

For convenience, Material-UI exposes its full API on the top-level `material-ui` import. If you're using ES 6 modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) you can safely use named imports and expect only a minimal set of Material-UI components in your bundle:

```js
import { Button, TextField } from '@material-ui/core';
```

Be aware that tree-shaking is an optimization that is usually only applied to production bundles. Development bundles will contain the full library which can lead to slower startup times. This is especially noticeable if you import from `@material-ui/icons`. Startup times can be approximately 6x slower than without named imports from the top-level API.

If this is an issue for you you have various options:

### Option 1

You can use path imports to avoid pulling in unused modules. For instance, instead of:

```js
import { Button, TextField } from '@material-ui/core';
```

use:

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

While importing directly in this manner doesn't use the exports in [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js), this file can serve as a handy reference as to which modules are public.

Be aware that we only support first and second leve imports. Anything below is considered private and can cause module duplication in your bundle.

```js
// OK
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 1st or top-level

// OK
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 2nd level

// NOT OK
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 3rd level
```

### Option 2

**Important note**: This is only supported for `@material-ui/icons`. We recommend this approach if you often restart your development build.

Another option is to keep using named imports, but still have shorter start up times by using `babel` plugins.

Pick one of the following plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) with the following configuration: 
        js
        [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: 'esm', // or '' if your bundler does not support ES modules
          camel2DashComponentName: false,
        },
        ];

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-import) has a different api than `babel-plugin-import` but does same thing. 
        js
        [
        'transform-imports',
        {
          '@material-ui/icons': {
            transform: '@material-ui/icons/esm/${member}',
            // for bundlers not supporting ES modules use:
            // transform: '@material-ui/icons/${member}',
          },
        },
        ];

## ECMAScript

The package published on npm is **transpiled**, with [Babel](https://github.com/babel/babel), to take into account the [supported platforms](/getting-started/supported-platforms/).

We also publish a second version of the components. You can find this version under the [`/es` folder](https://unpkg.com/@material-ui/core@next/es/). All the non-official syntax is transpiled to the [ECMA-262 standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm), nothing more. This can be used to make separate bundles targeting different browsers. Older browsers will require more JavaScript features to be transpiled, which increases the size of the bundle. No polyfills are included for ES2015 runtime features. IE11+ and evergreen browsers support all the necessary features. If you need support for other browsers, consider using [`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill).

⚠️ In order to minimize duplication of code in users' bundles, we **strongly discourage** library authors from using the `/es` folder.