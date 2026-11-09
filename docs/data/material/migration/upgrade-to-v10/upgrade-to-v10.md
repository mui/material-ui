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

Components that spaced their children by adding a margin to every child after the first one now use the CSS `gap` property on the container.
Elements that the layout doesn't render in flow, such as the focus guards that popups insert next to their trigger, no longer pick up a margin or shift their siblings.

#### Stack

The `useFlexGap` prop has been removed and Stack always uses `gap` for the `spacing` prop.
Remove the prop from your Stack components and from the theme's default props:

```diff
-<Stack spacing={2} useFlexGap>
+<Stack spacing={2}>
```

```diff
 const theme = createTheme({
   components: {
     MuiStack: {
-      defaultProps: {
-        useFlexGap: true,
-      },
     },
   },
 });
```

If you didn't set `useFlexGap`, check the following differences in your layouts:

- Margins on the children are no longer reset. Previously Stack set `margin: 0` on every child, so a child's own margin was ignored. Now the child's margin is added on top of the spacing.
- Spacing applies between children that wrap onto multiple lines (`flexWrap: 'wrap'`), not only along the main axis.
- Elements that the Stack doesn't render in flow (for example `position: absolute` or `position: fixed` children) no longer receive a margin.

If you need the previous margin-based spacing, set it on the Stack with the `sx` prop instead of using `spacing`:

```jsx
<Stack
  sx={{
    '& > :not(style):not(style)': { m: 0 },
    '& > :not(style) ~ :not(style)': { mt: 2 },
  }}
>
```

#### DialogActions, CardActions and AccordionActions

The space between the actions is now `gap: 8px` on the root element instead of `margin-left: 8px` on every child after the first one.
If you customized that spacing, through the `spacing` style override or a margin on the actions, set `gap` on the root instead.
The `disableSpacing` prop works as before and removes the gap.
