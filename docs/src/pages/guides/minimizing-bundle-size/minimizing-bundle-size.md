# Minimizing Bundle Size

<p class="description">Learn more about the tools you can leverage to reduce the bundle size.</p>

## Bundle size matters

The bundle size of Material-UI is taken very seriously. We take size snapshots
on every commit for every package and critical parts of those packages ([view latest snapshot](/size-snapshot)).
Combined with [dangerJS](https://danger.systems/js/) we can inspect
[detailed bundle size changes](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) on every Pull Request.

## How to reduce the bundle size?

For convenience, Material-UI exposes its full API on the top-level `material-ui` import.
Using this is fine if you have tree shaking working,
however, in the case where tree shaking is not supported or configured in your build chain, **this causes the entire library and its dependencies to be included** in your client bundle.

You have couple of options to overcome this situation:

### Option 1

You can import directly from `material-ui/` to avoid pulling in unused modules. For instance, instead of:

```js
import { Button, TextField } from '@material-ui/core';
```

use:

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

While importing directly in this manner doesn't use the exports in [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/index.js), this file can serve as a handy reference as to which modules are public.
Anything not listed there should be considered **private**, and subject to change without notice.
For example, the `Tabs` component is a public module while `TabIndicator` is private.

### Option 2

Another option is to keep using the shortened import like the following, but still have the size of the bundle optimized thanks to a **Babel plugin**:

```js
import { Button, TextField } from '@material-ui/core';
```

Pick one of the following plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is quite customizable and with enough tweaks works with Material-UI.
- [babel-transform-imports](https://bitbucket.org/amctheatres/babel-transform-imports) has a different api than a `babel-plugin-import` but does same thing.
- [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) aims to work out of the box with all the `package.json`.

**Important note**: Both of these options *should be temporary* until you add tree shaking capabilities to your project.

## evergreen build

The package published on npm is **transpiled**, with [Babel](https://github.com/babel/babel), to take into account the [supported platforms](/getting-started/supported-platforms/).

We also publish a second version of the components to target **evergreen browsers** and
the [active node version](https://nodejs.org/en/about/releases/#releases). This allows us to apply fewer code transformations
which results in around 8% less bundle size for `@material-ui/core`.
You can find this version under the [`/es` folder](https://unpkg.com/@material-ui/core@next/es/).

This build is currently targetting the following versions:
| Edge   | Firefox | Chrome | Safari  | Node | Googlebot |
|:-------|:--------|:-------|:--------|:-----|:----------|
| >= 18  | >= 66   | >= 73  | >= 12.1 | 12.2 | ✅         |

We update these versions in minor releases.

### Usage

You should **not** explicitly import from this build with e.g. `import Button from '@material-ui/core/es/Button'`.
Rather use some form of aliasing in your build setup. You can apply

```diff
resolve: {
  alias: {
+   '@material-ui/core$': '@material-ui/core/es',
  }
}
```

to your webpack config to use the evergreen build for `import { Button } from '@material-ui/core'` as well as
`import Button from '@material-ui/core/Button'`.

⚠️ In order to minimize duplication of code in users' bundles, we **strongly discourage** library authors from using the `/es` folder.
