# Minimizing bundle size

<p class="description">Learn how to reduce your bundle size and improve development performance by avoiding costly import patterns.</p>

## Bundle size matters

Material UI's maintainers take bundle size very seriously. Size snapshots are taken on every commit for every package and critical parts of those packages. Combined with [dangerJS](https://danger.systems/js/), we can inspect [detailed bundle size changes](https://github.com/mui/material-ui/pull/14638#issuecomment-466658459) on every Pull Request.

## Avoid barrel imports

Modern bundlers already tree-shake unused code in production builds, so you don't need to worry about it when using top-level imports. The real performance concern is during **development**, where **barrel imports** like `@mui/material` or `@mui/icons-material` can cause significantly **slower startup and rebuild times**.

```js
// ✅ Preferred
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
```

Instead of:

```js
// ❌ Slower in dev
import { Button, TextField } from '@mui/material';
```

This is especially true when using `@mui/icons-material`, where named imports can be up to six times slower than default path-based imports:

```js
// 🐌 Slower in dev
import { Delete } from '@mui/icons-material';

// 🚀 Faster in dev
import Delete from '@mui/icons-material/Delete';
```

This approach avoids loading unnecessary parts of the package and does not require any special configuration. It is also the default used in all our official examples and demos.

If you have existing barrel imports in your codebase, use the `path-imports` [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod/README.md#path-imports) below to migrate your code:

```bash
npx @mui/codemod@latest v5.0.0/path-imports <path>
```

## Enforce best practices with ESLint

To prevent accidental deep imports, you can use the `no-restricted-imports` rule in your ESLint configuration:

```json
// .eslintrc
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [{ "regex": "^@mui/[^/]+$" }]
      }
    ]
  }
}
```

## Avoid VS Code auto-importing from barrel files

To prevent VS Code from automatically importing from `@mui/material`, you can use the `typescript.autoImportSpecifierExcludeRegexes` in the VS Code project configuration:

```json
// .vscode/settings.json
{
  "typescript.preferences.autoImportSpecifierExcludeRegexes": ["^@mui/[^/]+$"]
}
```

## Using Next.js 13.5 or later?

If you're on **Next.js 13.5 or newer**, you're in good hands. These versions include automatic import optimization via the `optimizePackageImports` option. This removes the need for manual configuration or Babel plugins to optimize imports.

## Using parcel

Parcel, by default, doesn't resolve package.json `"exports"`. This makes it always resolve to the commonjs version of our library. To make it optimally make use of our ESM version, make sure to [enable the `packageExports` option](https://parceljs.org/features/dependency-resolution/#enabling-package-exports).

```json
// ./package.json
{
  "@parcel/resolver-default": {
    "packageExports": true
  }
}
```
