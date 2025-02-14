# Upgrade to Grid v2

<p class="description">This guide explains how and why to migrate from the Grid component to the Grid2 component.</p>

## About naming

The names of both versions of grid components have changed over time, which makes referencing them a bit confusing.
On this document we refer to them as follows:

- **Updated Grid**: The new component named `Grid2`.
- **Legacy Grid**: The original component named `Grid`.

## Why you should upgrade

The updated Grid component has several new features and improvements over the legacy Grid:

- It uses CSS variables which removes CSS specificity from class selectors.
  Now you can use `sx` prop on the Grid to control any style you'd like.
- All grids are considered items without specifying the `item` prop.
- The [offset feature](/material-ui/react-grid2/#offset) gives you more flexibility for positioning.
- [Nested grids](/material-ui/react-grid2/#nested-grid) now have no depth limitation.
- Its implementation doesn't use negative margins so it doesn't [overflow like the legacy grid](/material-ui/react-grid/#negative-margin).

## How to upgrade

Before you start:

- The updated Grid was introduced in Material UI v5. You have to be on that version or above for this upgrade.
- If you're updating your Material UI version, complete that version's upgrade guide before this one.

### 1. Update the import

Depending on the Material UI version you are using, you will need to update the import as follows:

<codeblock storageKey="material-ui-version">

```diff v7
// The legacy Grid component is named Grid
-import Grid from '@mui/material/Grid';

// The updated Grid component is named Grid2
+import Grid from '@mui/material/Grid2';

```

```diff v6
// The legacy Grid component is named Grid
-import Grid from '@mui/material/Grid';

// The updated Grid component is named Grid2
+import Grid from '@mui/material/Grid2';
```

```diff v5
// The legacy Grid component is named Grid
-import Grid from '@mui/material/Grid';

// The updated Grid component is named Unstable_Grid2
+import Grid from '@mui/material/Unstable_Grid2';
```

</codeblock>

### 2. Remove legacy props

The `item` and `zeroMinWidth` props have been removed in the updated Grid.
You can safely remove them:

```diff
-<Grid item zeroMinWidth>
+<Grid>
```

### 3. Update the size props

:::warning
Skip this step if you're using Material UI v5.
:::

In the legacy Grid, the size props were named to correspond with the theme's breakpoints.
For the default theme, these were: `xs`, `sm`, `md`, `lg`, `xl`

Starting from Material UI v6, these props are renamed to `size` on the updated Grid:

```diff
 <Grid
-  xs={12}
-  sm={6}
+  size={{ xs: 12, sm: 6 }}
 >
```

If the size is the same for all breakpoints, then you can use a single value:

```diff
-<Grid xs={6}>
+<Grid size={6}>
```

Additionally, the `true` value for the size props was renamed to `"grow"`:

```diff
-<Grid xs>
+<Grid size="grow">
```

You can use the following codemod to update the size props:

```bash v6
npx @mui/codemod@latest v6.0.0/grid-v2-props <path/to/folder>
```

:::warning
The codemod will only work if you already completed the [Update the import](#update-the-import) step.
:::

### 4. Opt-in to legacy negative margins

:::warning
Skip this step if you're using Material UI v6 or v7.
:::

If you're using Material UI v5 and want to apply the negative margins similar to the legacy Grid, specify `disableEqualOverflow={true}` on the grid container.
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

## Documentation pages

- Updated Grid:
  - [Documentation](/material-ui/react-grid2/)
  - [API](/material-ui/api/grid-2/)
- Legacy Grid:
  - [Documentation](/material-ui/react-grid/)
  - [API](/material-ui/api/grid/)
