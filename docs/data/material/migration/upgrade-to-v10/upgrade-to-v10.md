# Upgrade to v10

<p class="description">This guide explains how to upgrade from Material UI v9 to v10.</p>

## Breaking changes

Since v10 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v9 to v10 are described below.

### Presentational roles

Autocomplete, Dialog, Modal, Snackbar, SpeedDial, and Step now use `role="none"` where they previously used `role="presentation"`.
The two roles have the same accessibility semantics.

Update tests and CSS selectors that match the previous role value:

```diff
-screen.getByRole('presentation');
+screen.getByRole('none');

-[role="presentation"] {
+[role="none"] {
```

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

  Put the margin on the side that faces the previous child: `ml` for `row`, `mr` for `row-reverse`, `mt` for `column`, and `mb` for `column-reverse`. Use the value `'auto'` to preserve `spacing="auto"`.

- Percentage spacing is now relative to the container's width for horizontal gaps and height for vertical gaps. Previously, percentage margins used the container's width in both directions. For example, `spacing="10%"` now produces no gap in a column whose height is determined by its children. Use a numeric spacing value or a length such as `'1rem'` for spacing that does not depend on the container's dimensions.

#### DialogActions, CardActions and AccordionActions

If you customized the space between the actions, through the `spacing` style override or a margin on the actions, set `gap` on the root instead.

### SpeedDial generated ids

`SpeedDial` no longer derives the ids of its actions container and actions from `ariaLabel`.
The ids are now based on the `id` prop, or on a generated unique id when it is omitted.
This avoids duplicate ids when several speed dials share the same `ariaLabel`.

If you target these ids in CSS or tests, pass an explicit `id`:

```diff
-<SpeedDial ariaLabel="Actions" />
+<SpeedDial ariaLabel="Actions" id="Actions" />
```

The ids are then `Actions-actions` for the actions container and `Actions-action-0`, `Actions-action-1`, and so on for each action.

### InputBase disableInjectingGlobalStyles removed

The deprecated `disableInjectingGlobalStyles` prop of InputBase has been removed.
The auto-fill keyframes are injected with the input styles, so there is no style sheet per input to avoid.
Remove the prop, along with the `GlobalStyles` for the auto-fill keyframes it required:

```diff
 const theme = createTheme({
   components: {
     MuiInputBase: {
-      defaultProps: {
-        disableInjectingGlobalStyles: true,
-      },
     },
   },
 });

 <ThemeProvider theme={theme}>
-  <GlobalStyles
-    styles={{
-      '@keyframes mui-auto-fill': { from: { animationName: 'mui-auto-fill' } },
-      '@keyframes mui-auto-fill-cancel': {
-        from: { animationName: 'mui-auto-fill-cancel' },
-      },
-    }}
-  />
   ...
 </ThemeProvider>
```
