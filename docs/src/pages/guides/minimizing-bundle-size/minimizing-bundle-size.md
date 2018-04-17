# Minimizing Bundle Size

## Bundle size matters

Material-UI takes the bundle size very seriously.
We are relying on [size-limit](https://github.com/ai/size-limit) to prevent introducing any regression.
We monitor the size of the bundle at each commit:
- When importing **all the components**. This lets us spot any [unwanted bundle size increase](https://github.com/mui-org/material-ui/tree/v1-beta/.size-limit#L4).
- When importing **a single component**. This lets us estimate [the overhead of our core dependencies](https://github.com/mui-org/material-ui/tree/v1-beta/.size-limit#L8). (styling, theming, etc.: ~20 kB gzipped)

## How to reduce the bundle size?

For convenience, Material-UI exposes its full API on the top-level `material-ui` import.
This will work fine if you have tree shaking working.

However, in the case where tree shaking is not supported or configured in your build chain, **this causes the entire library and its dependencies to be included** in client bundles that include code that imports from the top-level bundle.

You have couple of options to overcome this situation:

### Option 1

You can import directly from `material-ui/` to avoid pulling in unused modules. For instance, instead of:

```js
import { Button, TextField } from 'material-ui';
```

use:

```js
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
```

While importing directly in this manner doesn't use the exports in [`material-ui/index.js`](https://github.com/mui-org/material-ui/blob/v1-beta/packages/material-ui/src/index.js), this file can serve as a handy reference as to which modules are public.
Anything not listed there should be considered **private**, and subject to change without notice.
For instance, the `Tabs` component is a public module while `TabIndicator` is private.

### Option 2

Another option is to keep using the shortened import like the following, but still have the size of the bundle optimized thanks to a **Babel plugin**:

```js
import { Button, TextField } from 'material-ui';
```

Pick one of the following plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is quite customizable and with enough tweaks works with Material-UI.
- [babel-transform-imports](https://bitbucket.org/amctheatres/babel-transform-imports) has a different api than a `babel-plugin-import` but does same thing.
- [babel-plugin-direct-import](https://github.com/umidbekkarimov/babel-plugin-direct-import) automatically scans exported modules so in most cases it works with zero configuration.
- [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) aims to work out of the box with all the `package.json`.

**Important note**: Both of the options *should be temporary* until you add tree shaking capabilities to your project.

## ECMAScript

The published package on npm is **transpiled**, with [Babel](https://github.com/babel/babel), to take into account the [supported platforms](/getting-started/supported-platforms).

We also publish a second version of the components to target **evergreen browsers**.
You can find this version under the [`/es` folder](https://unpkg.com/material-ui@next/es/).
We transpile all the non-official syntax to the [ECMA-262 standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm), nothing more.
It can be used to make separate bundles targeting different browsers.
Old browsers will require more JavaScript features to be transpiled.
So you have to increase the size of the bundle to support older browsers.

⚠️ In order to minimize duplication of code in people bundle, we **discourage** library authors to use the `/es` folder.
