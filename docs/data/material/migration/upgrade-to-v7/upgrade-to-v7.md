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

### Package layout updated

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

### Grid and Grid2 renamed

The deprecated `Grid` component has been renamed to `GridLegacy`.
The `Grid2` component has been moved to the `Grid` namespace.
Depending on your project, you may follow one of the following approaches:

1. **If you are using the deprecated grid and wish to upgrade,** run the following codemod:

   <!-- #npm-tag-reference -->

   ```bash
   npx @mui/codemod@next v7.0.0/grid-props <path/to/folder>
   ```

   See the [Grid upgrade guide](/material-ui/migration/upgrade-to-grid-v2/) for more information.

2. **If you are using the deprecated grid and wish to continue using it,** update the `Grid` references as follows:

   ```diff
    // imports
   -import Grid, { gridClasses, GridProps } from '@mui/material/Grid';
   +import Grid, { gridLegacyClasses, GridLegacyProps } from '@mui/material/GridLegacy';

   -import { Grid } from '@mui/material';
   +import { GridLegacy as Grid } from '@mui/material';

    // theme
    const theme = createTheme({
      components: {
   -    MuiGrid: {
   +    MuiGridLegacy: {
          // ...
        },
      },
    });

    // CSS classes
   -.MuiGrid-root
   +.MuiGridLegacy-root
   ```

3. **If you are using Grid2,** update the `Grid2` references as follows:

   ```diff
    // imports
   -import Grid, { grid2Classes as gridClasses, Grid2Props as GridProps } from '@mui/material/Grid2';
   +import Grid, { gridClasses, GridProps } from '@mui/material/Grid';

   -import { Grid2 as Grid } from '@mui/material';
   +import { Grid } from '@mui/material';

    // theme
    const theme = createTheme({
      components: {
   -    MuiGrid2: {
   +    MuiGrid: {
          // ...
        },
      },
    });

    // CSS classes
   -.MuiGrid2-root
   +.MuiGrid-root
   ```

### InputLabel size prop standardized

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

### SvgIcon's data-testid removed

The default `data-testid` prop has been removed from the icons in `@mui/icons-material` in production bundles. This change ensures that the `data-testid` prop is only defined where needed, reducing the potential for naming clashes and removing unnecessary properties in production.

### Deprecated APIs removed

APIs that were deprecated in v5 have been removed in v7.

#### createMuiTheme function

The deprecated `createMuiTheme` function has been removed.
Use `createTheme` instead.

```diff
-import { createMuiTheme } from '@mui/material/styles';
+import { createTheme } from '@mui/material/styles';
```

#### Dialog's onBackdropClick prop

The deprecated `onBackdropClick` prop has been removed from the `Dialog` component.
Please use the [`onClose`](/material-ui/api/dialog/#dialog-prop-onClose) callback instead, which receives the event and the reason for the dialog closing.
Here's an example of how to use it:

```jsx
function Example() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      // Handle the backdrop click
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* Dialog content */}
    </Dialog>
  );
}
```

#### experimentalStyled function

The deprecated `experimentalStyled` function has been removed.
Use `styled` instead.

```diff
-import { experimentalStyled as styled } from '@mui/material/styles';
+import { styled } from '@mui/material/styles';
```

#### Hidden and PigmentHidden components

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

#### Modal's onBackdropClick prop

The deprecated `onBackdropClick` prop has been removed from the `Modal` component.
Please use the [`onClose`](/material-ui/api/modal/#modal-prop-onClose) callback instead, which receives the event and the reason for the modal closing.
Here's an example of how to use it:

```jsx
function Example() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      // Handle the backdrop click
    }
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {/* Modal content */}
    </Modal>
  );
}
```

#### Rating's MuiRating-readOnly CSS class

The deprecated `MuiRating-readOnly` class was removed in favor of `Mui-readOnly` global class.

```diff
-.MuiRating-readOnly
+.Mui-readOnly
```

#### StepButtonIcon type

The deprecated `StepButtonIcon` type has been removed. Use `StepButtonProps['icon']` instead.

```diff
- import { StepButtonIcon } from '@mui/material/StepButton';
+ import { StepButtonProps } from '@mui/material/StepButton';

-StepButtonIcon
+StepButtonProps['icon']
```

#### StyledEngineProvider import path

Importing `StyledEngineProvider` from `'@mui/material'` was deprecated and now has been removed.
Import it from `'@mui/material/styles'` instead:

```diff
-import { StyledEngineProvider } from '@mui/material';
+import { StyledEngineProvider } from '@mui/material/styles';
```

#### Lab components moved to the main package

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
