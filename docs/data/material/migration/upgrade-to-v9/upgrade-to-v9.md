# Upgrade to v9

<p class="description">This guide explains how to upgrade from Material UI v7 to v9.</p>

## Start using the alpha release

In the `package.json` file, change the package version from `latest` to `next`.

```diff title="package.json"
-"@mui/material": "latest",
+"@mui/material": "next",
```

Using `next` ensures your project always uses the latest v9 pre-releases.
Alternatively, you can also target and fix it to a specific version, for example, `9.0.0-alpha.0`.

## Breaking changes

Since v9 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v7 to v9 are described below.

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

### Backdrop

The Backdrop component no longer adds the `aria-hidden="true"` attribute to the Root slot by default.

### Dialog & Modal

The `disableEscapeKeyDown` prop has been removed. The same behavior could be achieved
by checking the value of the `reason` argument in `onClose`:

```diff
  const [open, setOpen] = React.useState(true);
- const handleClose = () => {
-   setOpen(false);
- };
+ const handleClose = (_event: React.SyntheticEvent<unknown>, reason: string) => {
+   if (reason !== 'escapeKeyDown') {
+     setOpen(false);
+   }
+ };
  return (
-  <Dialog open={open} disableEscapeKeyDown onClose={handleClose}>
+  <Dialog open={open} onClose={handleClose}>
    {/* ... */}
  </Dialog>
  );
```

The `Modal` change is the same.

### ButtonBase

#### Click event propagation from Enter and Spacebar

When sending Enter and Spacebar keys on the ButtonBase or components that are composed from ButtonBase,
the click event now bubbles to their ancestors.

Also, the `event` passed to the `onClick` prop is a `MouseEvent` instead of the `KeyboardEvent` captured
in the ButtonBase keyboard handlers. This is actually the expected behavior.

### Autocomplete

#### Listbox toggle on right click

The listbox does not toggle anymore when using right click on the input. The left click toggle behavior remains unchanged.

#### freeSolo type related changes

When the `freeSolo` prop is passed as `true`, the `getOptionLabel` and `isOptionEqualToValue` props
accept `string` as well for their `option` and, respectively, `value` arguments:

```diff
- isOptionEqualToValue?: (option: Value, value: Value) => boolean;
+ isOptionEqualToValue?: (
+  option: Value,
+  value: AutocompleteValueOrFreeSoloValueMapping<Value, FreeSolo>,
+ ) => boolean;
```

```diff
- getOptionLabel?: (option: Value | AutocompleteFreeSoloValueMapping<FreeSolo>) => string;
+ getOptionLabel?: (option: AutocompleteValueOrFreeSoloValueMapping<Value, FreeSolo>) => string;
```

For reference:

```ts
type AutocompleteFreeSoloValueMapping<FreeSolo> = FreeSolo extends true
  ? string
  : never;

type AutocompleteValueOrFreeSoloValueMapping<Value, FreeSolo> = FreeSolo extends true
  ? Value | string
  : Value;
```

### Grid

The Grid component no longer supports [system props](/material-ui/customization/how-to-customize/#the-sx-prop).
Use the `sx` prop instead:

```diff
-<Grid mt={2} mr={1} />
+<Grid sx={{ mt: 2, mr: 1 }} />
```

This also fixes an issue where props like `color` were consumed by the Grid instead of being forwarded to the component rendered via the `component` prop:

```jsx
// `color` is now correctly forwarded to Button
<Grid component={Button} color="secondary" variant="contained">
  hello
</Grid>
```

### Theme

`MuiTouchRipple` has been removed from the theme `components` types (`ComponentsProps`, `ComponentsOverrides`, and `ComponentsVariants`).
TouchRipple has been an internal component since v5 and never consumed theme overrides or default props, so the types were misleading.

If you were using `MuiTouchRipple` in your theme, remove it and use global CSS with the `MuiTouchRipple-*` class names instead:

```diff
 const theme = createTheme({
   components: {
-    MuiTouchRipple: {
-      styleOverrides: {
-        root: { color: 'red' },
-      },
-    },
+    MuiButtonBase: {
+      styleOverrides: {
+        root: {
+          '& .MuiTouchRipple-root': { color: 'red' },
+        },
+      },
+    },
   },
 });
```

### JSDOM support

v9 removes all usage of `process.env.NODE_ENV === 'test'`. The `NODE_ENV` variable will exclusively be used for for tree-shaking. Our libraries have been updated to auto-detect DOM environments that don't support layout such as [JSDOM](https://github.com/jsdom/jsdom) and [happy-dom](https://github.com/capricorn86/happy-dom) through user agent sniffing.
