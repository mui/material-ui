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
If you're using ES modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), parcel you can safely use named imports and still get an optimized bundle size automatically:

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

This option provides the best user experience and developer experience, except if you're using **Next.js 13.5 or greater**, where this optimization is automatically applied via the `optimizePackageImports` option in Next.js. In that case, using a Babel plugin is unnecessary.

- UX: The Babel plugin enables top-level tree-shaking even if your bundler doesn't support it.
- DX: The Babel plugin makes startup time in dev mode as fast as Option 1.
- DX: This syntax reduces the duplication of code, requiring only a single import for multiple modules.
  Overall, the code is easier to read, and you are less likely to make a mistake when importing a new module.

```js
import { Button, TextField } from '@mui/material';
```

However, you need to apply the following steps correctly.

#### 1. Configure Babel

Use the [babel-plugin-import](https://github.com/umijs/babel-plugin-import) with the following configuration:

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

:::error
Avoid using [babel-plugin-direct-import](https://github.com/avocadowastaken/babel-plugin-direct-import) which transforms imports to:

```js
import Button from '@mui/material/Button/Button.js';
```

Future changes to the library's internal structure could break these paths. `babel-plugin-direct-import` allows for granular control over what gets imported, but it comes with the potential risk of relying on internal library paths. This may fail in future versions if the package is updated to use the `exports` field in `package.json`, which could block access to internal paths like this.
:::

Material UI supports tree shaking out of the box when importing from specific paths (such as `@mui/material/Button`), so this configuration is optional and primarily useful if you want to enforce modular imports.

Vite doesn't require extra Babel configuration by default because it uses esbuild for fast bundling and minification.
But if you need to customize Babel (for example, to use babel-plugin-transform-import), you can follow these steps:

1. Install dependencies:

```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-plugin-transform-imports
```

2. Create a `.babelrc` file in the root directory:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    [
      "babel-plugin-transform-imports",
      {
        "@mui/material": {
          "transform": "@mui/material/${member}",
          "preventFullImport": true
        },
        "@mui/icons-material": {
          "transform": "@mui/icons-material/${member}",
          "preventFullImport": true
        }
      }
    ]
  ]
}
```

3. Update your `vite.config.js` to use the Babel plugin:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';

export default defineConfig({
  plugins: [react(), babel()],
});
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
