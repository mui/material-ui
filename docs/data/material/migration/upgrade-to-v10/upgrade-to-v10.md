# Upgrade to v10

<p class="description">This guide explains how to upgrade from Material UI v9 to v10.</p>

## Breaking changes

Since v10 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v9 to v10 are described below.

### Khmer locale renamed

The Khmer locale is now exported as `kmKH` instead of `khKH`, to match the ISO 639-1 code for Khmer (`km`).

```diff
-import { khKH } from '@mui/material/locale';
+import { kmKH } from '@mui/material/locale';

-const theme = createTheme(themeOptions, khKH);
+const theme = createTheme(themeOptions, kmKH);
```

Numbers in `TablePagination` are now formatted with the `km-KH` locale.
Previously, `Intl.NumberFormat` didn't recognize `kh-KH` and fell back to the runtime's default locale.

### Spacing uses CSS gap

Stack, DialogActions, CardActions and AccordionActions now space their children with the CSS `gap` property instead of a margin on each child after the first.

#### Stack

The `useFlexGap` prop has been removed.
Remove it from your Stack components and from the theme's default props:

```diff
-<Stack spacing={2} useFlexGap>
+<Stack spacing={2}>
```

If you didn't use `useFlexGap`, check your layouts for these differences:

- Children's own margins now add to the `spacing`. Previously, Stack reset them to `0`. To reset them again:

  ```jsx
  <Stack spacing={2} sx={{ '& > :not(style):not(style)': { m: 0 } }}>
  ```

- `spacing` also applies between lines when the children wrap.

- Negative `spacing` values and `'auto'` are no longer supported. Remove `spacing` and apply margins to the children instead. For example, to preserve overlapping children in a row:

  ```diff
  -<Stack direction="row" spacing={-1}>
  +<Stack
  +  direction="row"
  +  sx={{ '& > :not(style) ~ :not(style)': { ml: -1 } }}
  +>
  ```

  Use `ml: 'auto'` to preserve `spacing="auto"`, or `mt` instead of `ml` for a column.

- Percentage spacing is now relative to the container's width for horizontal gaps and height for vertical gaps. Previously, percentage margins used the container's width in both directions. For example, `spacing="10%"` now produces no gap in a column whose height is determined by its children. Use a numeric spacing value or a length such as `'1rem'` for spacing that does not depend on the container's dimensions.

#### DialogActions, CardActions and AccordionActions

If you customized the space between the actions, through the `spacing` style override or a margin on the actions, set `gap` on the root instead.
