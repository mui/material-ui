# Migrating to v6

<p class="description">This guide explains how and why to migrate from Material UI v5 to v6.</p>

## Start using the alpha release

In the `package.json` file, change the package version from `latest` to `next`.

```diff title="package.json"
-"@mui/material": "latest",
+"@mui/material": "next",
```

Using `next` ensures your project always uses the latest v6 alpha release.
Alternatively, you can also target and fix it to a specific version, for example, `6.0.0-alpha.0`.

## Breaking changes

Since v6 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v5 to v6 are described below.

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

### Added exports field to package.json

The `exports` field has been added to the `@mui/material/package.json` file to improve the ESM and CJS builds split:

```json title="@mui/material/package.json"
// ...
"exports": {
    ".": {
        "types": "./index.d.ts",
        "import": "./index.mjs",
        "default": "./node/index.js"
    },
    "./*": {
        "types": "./*/index.d.ts",
        "import": "./*/index.mjs",
        "default": "./node/*/index.js"
    }
}
// ...
```

This limits the exported modules to the root import and one level deep imports.
If you were importing from deeper levels, you will need to update your imports:

```diff title="index.mjs"
- import buttonClasses from '@mui/material/Button/buttonClasses';
+ import { buttonClasses } from '@mui/material/Button';
```

```diff title="index.cjs"
- const { default: Button } = require('@mui/material/node/Button');
+ const { default: Button } = require('@mui/material/Button');
```

If you were importing from `/node` as a workaround, this is no longer necessary as the `exports` field maps CJS to the correct files.
You might have to update your bundler configuration to support the new structure.

Read more about the `exports` field in the [Node.js documentation](https://nodejs.org/api/packages.html#exports).
