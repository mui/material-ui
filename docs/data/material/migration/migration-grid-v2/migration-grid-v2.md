# Migration to Grid v2

<p class="description">This guide explains how and why to migrate from Material UI Grid v1 to v2.</p>

## Why you should migrate

Grid v2 has several new features and many improvements over the original:

- Grid v2 uses CSS variables which removes CSS specificity from class selectors.
  Now you can use `sx` prop on the Grid to control any style you'd like.
- All grids are considered items without specifying the `item` prop.
- The long-awaited [offset feature](/material-ui/react-grid2/#offset) gives you more flexibility for positioning.
- [Nested grids](/material-ui/react-grid2/#nested-grid) now have no depth limitation.

## With Material UI v4

The Grid v2 is introduced in Material UI v5, so you have to follow the [Material UI v5 migration guide](/material-ui/migration/migration-v4/) first.

## With Material UI v5

The migration is expected to be smooth since most of the APIs remain the same.
There is one breaking change that we want to clarify:
The default implementation of the negative margin in Grid v2 is spread equally on all sides.

{{"demo": "GridsDiff.js", "bg": true, "hideToolbar": true}}

### Import

```diff
-import Grid from '@mui/material/Grid';
+import Grid from '@mui/material/Unstable_Grid2';
```

### Remove props

The `item` and `zeroMinWidth` props have been removed in Grid v2:

```diff
-<Grid item zeroMinWidth xs={6}>
+<Grid xs={6}>
```

### Negative margins

If you want to apply the negative margins similar to the Grid v1, specify `disableEqualOverflow={true}` on the grid container.
To apply to all grids, add the default props to the theme:

```js
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

const theme = createTheme({
  components: {
    MuiGrid2: {
      defaultProps: {
        // all grids under this theme will apply
        // negative margin on the top and left sides.
        disableEqualOverflow: true,
      },
    },
  },
});

function Demo() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container>...grids</Grid>
    </ThemeProvider>
  );
}
```

## With Material UI v6

The Grid v2 is marked as stable in Material UI v6, so the `Unstable_` prefix is removed:

```diff
-import Grid from '@mui/material/Unstable_Grid2';
+import Grid from '@mui/material/Grid2';
```

Alongside the stabilization, the API has been improved.
You can see the changes and further details on how to migrate in the [Material UI v6 upgrade guide](/material-ui/migration/upgrade-to-v6/).

Finally, the original Grid component is deprecated and will be removed in the future, so we highly encourage you to migrate to Grid v2.

## Documentation page

Check out [Grid v2 docs](/material-ui/react-grid2/#fluid-grids) for all the demos and code samples.
