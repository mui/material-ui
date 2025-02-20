# Upgrade to v7

<p class="description">This guide explains how to upgrade from Material UI v6 to v7.</p>

## Start using the alpha release

In the `package.json` file, change the package version from `latest` to `next`.

```diff title="package.json"
-"@mui/material": "latest",
+"@mui/material": "next",
```

Using `next` ensures your project always uses the latest v7 pre-releases.
Alternatively, you can also target and fix it to a specific version, for example, `7.0.0-alpha.0`.

## Breaking changes

Since v7 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v6 to v7 are described below.

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

### Package layout

The package layout has been updated to use the Node.js exports field. This brings several changes:

Deep imports with more than one level are no longer allowed. For example:

```diff
- import createTheme from '@mui/material/styles/createTheme';
+ import { createTheme } from '@mui/material/styles';
```

This was never officially supported, but now it will be restricted by bundlers and runtimes.

To use the modern bundle (which excludes legacy browser support for smaller bundle size), you'll need to configure your bundler to use the "mui-modern" exports condition:

```js
// webpack.config.js
{
  resolve: {
    conditionNames: ['mui-modern', '...'],
  }
}

// vite.config.js
{
  resolve: {
    conditions: ['mui-modern', 'module', 'browser', 'development|production']
  }
}
```

If you were using a Vite alias to force ESM imports for the icons package, you should remove it as it's no longer necessary:

```diff
 // vite.config.js
   resolve: {
     alias: [
-      {
-        find: /^@mui\/icons-material\/(.*)/,
-        replacement: "@mui/icons-material/esm/$1",
-      },
     ],
   },
```

### Grid renamed to GridLegacy

The deprecated `Grid` component has been renamed to `GridLegacy`.
If you wish to continue using this legacy component, update your imports as follows:

```diff
-import Grid, { gridClasses, GridProps } from '@mui/material/Grid';
+import Grid, { gridLegacyClasses, GridLegacyProps } from '@mui/material/GridLegacy';

-import { Grid } from '@mui/material';
+import { GridLegacy as Grid } from '@mui/material';
```

This also applies to the theme's `components` object:

```diff
 const theme = createTheme({
   components: {
-    MuiGrid: {
+    MuiGridLegacy: {
       // ...
     },
   },
 });
```

As well as the component's CSS classes:

```diff
-.MuiGrid-root
+.MuiGridLegacy-root
```

### Hidden and PigmentHidden components removed

The deprecated `Hidden` and `PigmentHidden` components have been removed.

Use the `sx` prop to replace `implementation="css"`:

```diff
-<Hidden implementation="css" xlUp><Paper /></Hidden>
+<Paper sx={{ display: { xl: 'none', xs: 'block' } }} />
```

```diff
-<Hidden implementation="css" mdDown><Paper /></Hidden>
+<Paper sx={{ display: { xs: 'none', md: 'block' } }} />
```

Use the `useMediaQuery` hook to replace `implementation="js"`:

```diff
-<Hidden implementation="js" xlUp><Paper /></Hidden>
+const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));
+return hidden ? null : <Paper />;
```

:::warning
There's no codemod available for this change, as each project's setup will heavily influence the migration.
:::

### Lab components moved to the main package

The following `@mui/lab` components and hook have been moved to `@mui/material`:

- Alert
- AlertTitle
- Autocomplete
- AvatarGroup
- Pagination
- PaginationItem
- Rating
- Skeleton
- SpeedDial
- SpeedDialAction
- SpeedDialIcon
- ToggleButton
- ToggleButtonGroup
- usePagination

To keep using these components and hook, import them from `@mui/material` instead of `@mui/lab`.

```diff
-import Alert from '@mui/lab/Alert';
+import Alert from '@mui/material/Alert';

-import { Alert } from '@mui/lab';
+import { Alert } from '@mui/material';
```

Use this codemod to automatically update the imports:

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v7.0.0/lab-removed-components <path/to/folder>
```

:::warning
The codemod doesn't cover type imports associated with the components.
:::

### InputLabel

The `size` prop for `InputLabel` now follows the standard naming convention used across other components like `Button` and `TextField`. `'normal'` has been replaced with `'medium'` for consistency.

If you were using `size="normal"`, update it to `size="medium"`:

```diff
-<InputLabel size="normal">Label</InputLabel>
+<InputLabel size="medium">Label</InputLabel>
```

The default behavior remains unchanged, so no updates are needed unless you explicitly set `size="normal"`.

Use this codemod to automatically update the `size` value:

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v7.0.0/input-label-size-normal-medium <path/to/folder>
```

### Removal of `data-testid` prop from `SvgIcon`

The default `data-testid` prop has been removed from the icons in `@mui/icons-material` in production bundles. This change ensures that the `data-testid` prop is only defined where needed, reducing the potential for naming clashes and removing unnecessary properties in production.
