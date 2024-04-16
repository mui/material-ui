# Migrating to v6

<p class="description">This guide explains how and why to migrate from MUI System v5 to v6.</p>

## Start using the alpha release

In the `package.json` file, change the package version from `latest` to `next`.

```diff title="package.json"
-"@mui/system": "latest",
+"@mui/system": "next",
```

Using `next` ensures your project always uses the latest v6 alpha release.
Alternatively, you can also target and fix it to a specific version, for example, `6.0.0-alpha.0`.

## Breaking changes

Since v6 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from MUI System v5 to v6 are described below.

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

### Added exports field to package.json

The `exports` field has been added to the `@mui/system/package.json` file to improve the ESM and CJS builds split:

```json title="@mui/system/package.json"
// ...
"exports": {
    ".": {
        "types": "./index.d.ts",
        "mui-modern": "./modern/index.mjs",
        "import": "./index.mjs",
        "default": "./node/index.js"
    },
    "./*": {
        "types": "./*/index.d.ts",
        "mui-modern": "./modern/index.mjs",
        "import": "./*/index.mjs",
        "default": "./node/*/index.js"
    }
}
// ...
```

Read more about the `exports` field in the [Node.js documentation](https://nodejs.org/api/packages.html#exports).

This change limits the exported modules to the root import and one level deep imports.
If you were importing from deeper levels, you will need to update your imports:

```diff
- import styled from '@mui/system/esm/styled';
+ import styled from '@mui/system/styled';
```

You might have to update your bundler configuration to support the new structure.
Following are some common use cases that require changes:

#### Importing ESM

If you were importing from `/esm` as a workaround, this is no longer necessary as the `exports` field maps ESM to the correct files.

### GridProps type

The `cssGrid` function's `GridProps` type has been renamed to `CssGridProps`.
This is to avoid collision with the `GridProps` type corresponding to the `Grid` component props.
