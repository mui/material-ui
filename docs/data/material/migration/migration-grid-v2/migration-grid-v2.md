# Migration to Grid v2

<p class="description">This guide explains how and why to migrate from Material UI Grid v1 to v2.</p>

## Why you should migrate

The Grid v2 has new feature and a lot of improvements:

- Easier to customize because Grid v2 uses CSS variables which remove CSS specificity from class selector. Now you can use `sx` prop on the Grid to control any style you'd like.
- All grids are considered items without specifying the `item` prop.
- The Long-awaited [offset feature](/material-ui/react-grid2/#offset) is added.
- [Nested grid](/material-ui/react-grid2/#nested-grid) has no depth limitation.
- The `disableEqualOverflow` flag is added to prevent scrollbar in small viewports.

:::info
We ship the Grid v2 as `Unstable_` to let the community try it out and collect feedbacks. We will make it stable and deprecate v1 in the next major release of Material UI.
:::

## Material UI v4

The Grid v2 is introduced in Material UI v5, so you have to follow the [Material UI migration guide](/material-ui/migration/migration-v4/) first.

## Material UI v5

The migration is expected to be smooth since most of the APIs remains the same. However, there is one breaking change that we want to clarify:

:::warning
The default implementation of the negative margin in Grid v2 is spread equally on all sides (same as the Grid in Material UI v4).
:::

{{"demo": "GridsDiff.js", "bg": true, "hideToolbar": true}}

### Import

```diff
- import Grid from '@mui/material/Grid';
+ import Grid from '@mui/material/Unstable_Grid2';
```

### Remove props

The `item` and `zeroMinWidth` have been removed in Grid v2:

```diff
- <Grid item xs={6}>
+ <Grid xs={6}>
```

### Negative margin

If you want to apply the negative margin similar to the Grid v1, specify `disableEqualOverflow: true` on the grid container:

{{"demo": "GridDisableEqualOverflow.js", "bg": true, "hideToolbar": true}}

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
