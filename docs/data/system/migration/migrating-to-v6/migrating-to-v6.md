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

### Root code is now ESM

The ESM code, previously under the `esm/` build, has been moved to the root of the package.
The CommonJS code, previously on the root, has been moved to the `node/` build.

:::info
This is an intermediate step to prepare for adding the `exports` field to the `package.json` file.
If you have trouble using this new structure, please wait for the future update which adds the `exports` field.
You can follow progress on https://github.com/mui/material-ui/issues/30671.
:::

### GridProps type

The `cssGrid` function's `GridProps` type has been renamed to `CssGridProps`.
This is to avoid collision with the `GridProps` type corresponding to the `Grid` component props.
