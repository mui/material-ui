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

### TablePagination numbers are formatted by default

Pagination numbers in `TablePagination` are now formatted using `Intl.NumberFormat` according to the locale.
For example, `103177` is displayed as `103,177` in `en-US` or `103.177` in `de-DE`.

To opt out of number formatting, provide a custom `labelDisplayedRows` function:

```jsx
<TablePagination
  labelDisplayedRows={({ from, to, count }) =>
    `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`
  }
/>
```

Or when using a locale:

```jsx
import { enUS } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  enUS,
  {
    components: {
      MuiTablePagination: {
        defaultProps: {
          labelDisplayedRows: ({ from, to, count }) =>
            `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`,
        },
      },
    },
  },
);
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

### Stepper, Step and StepButton

The `Stepper` and `Step` markups have changed to improve their semantics:

- `Stepper` returns a `<ol>` element instead of `<div>`.
- `Step` returns a `<li>` element instead of `<div>`.

The `Stepper` component now supports keyboard navigation when used with `StepButton` descendants. The navigation is implemented as a roving tabindex, supporting Arrow Keys as well as Home and End. Only one `StepButton` is focusable at a time, by having `tabindex="0"`, while the rest all have `tabindex="-1"`. Once selection is changed by Arrow Keys or Home / End, the `tabindex` value is also updated.

The markup for a `Stepper` with `StepButton` descendants has changed further to reflect this behavior. These changes apply on top of the tag changes described above.

The `Stepper` has:

- The `role` of `tablist`.
- The `aria-orientation` added. The value is either `horizontal` or `vertical` depending on the `orientation` prop.

The `StepButton` has:

- The `role` of `tab`.
- The `aria-current` changed to `aria-selected`. The value is `true` when step is selected, and `false` otherwise.
- The `aria-setsize` added. The value is the total number of steps.
- The `aria-posinset` added. The value is the index of the step inside the list, 1-based.

### Tabs

The `tabindex` attribute for each tab will be changed on Arrow Key or Home / End navigation. Previously, we only moved the focus on keyboard navigation. Now, we move the focus and also add the `tabindex="0"` to the focused element. The previously focused element will have its `tabindex` updated to `-1` in order to keep only one focusable `Tab` at a time.

Selecting a `Tab` will update the focus and `tabindex` as before.

### Menu and MenuList

The `tabindex` attribute for each menu item will be changed on Arrow Key, Home / End or Character Key navigation. Previously, we only moved the focus on keyboard navigation. Now, we move the focus and also add the `tabindex="0"` to the focused element. The previously focused element will have its `tabindex` updated to `-1` in order to keep only one focusable `MenuItem` at a time.

This change also applies to the `Menu` since it uses `MenuList`.

Selecting a `MenuItem` will update the focus and `tabindex` as before.

The `autoFocus` prop in `MenuList` does not set `tabindex="0"` on the `List` component anymore. It will always stay as `-1`.

### Deprecated APIs removed

APIs that were deprecated earlier have been removed in v9.

#### Autocomplete deprecated props removed

Use the [autocomplete-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#autocomplete-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/autocomplete-props <path>
```

The following deprecated props have been removed from the `Autocomplete` component:

- `ChipProps` → use `slotProps.chip`
- `componentsProps` → use `slotProps`
- `ListboxComponent` → use `slots.listbox`
- `ListboxProps` → use `slotProps.listbox`
- `PaperComponent` → use `slots.paper`
- `PopperComponent` → use `slots.popper`
- `renderTags` → use `renderValue`

##### ChipProps prop

The deprecated `ChipProps` prop has been removed. Use `slotProps.chip` instead.

```diff
 <Autocomplete
   multiple
   options={options}
-  ChipProps={{ size: 'small' }}
+  slotProps={{ chip: { size: 'small' } }}
 />
```

##### componentsProps prop

The deprecated `componentsProps` prop has been removed. Use `slotProps` instead.

```diff
 <Autocomplete
   options={options}
   renderInput={(params) => <TextField {...params} />}
-  componentsProps={{
-    clearIndicator: { size: 'large' },
-    paper: { elevation: 2 },
-    popper: { placement: 'bottom-end' },
-    popupIndicator: { size: 'large' },
-  }}
+  slotProps={{
+    clearIndicator: { size: 'large' },
+    paper: { elevation: 2 },
+    popper: { placement: 'bottom-end' },
+    popupIndicator: { size: 'large' },
+  }}
 />
```

##### ListboxComponent and ListboxProps props

The deprecated `ListboxComponent` and `ListboxProps` props have been removed.

Use `slots.listbox` instead of `ListboxComponent`:

```diff
 <Autocomplete
   options={options}
   renderInput={(params) => <TextField {...params} />}
-  ListboxComponent={CustomListbox}
+  slots={{ listbox: CustomListbox }}
 />
```

Use `slotProps.listbox` instead of `ListboxProps`:

```diff
 <Autocomplete
   options={options}
   renderInput={(params) => <TextField {...params} />}
-  ListboxProps={{ style: { maxHeight: 200 } }}
+  slotProps={{ listbox: { style: { maxHeight: 200 } } }}
 />
```

If you were passing a `ref` via `ListboxProps`, move it to `slotProps.listbox.ref`:

```diff
 <Autocomplete
   options={options}
   renderInput={(params) => <TextField {...params} />}
-  ListboxProps={{ ref }}
+  slotProps={{ listbox: { ref } }}
 />
```

##### PaperComponent and PopperComponent props

The deprecated `PaperComponent` and `PopperComponent` props have been removed. Use `slots.paper` and `slots.popper` instead.

```diff
 <Autocomplete
   options={options}
   renderInput={(params) => <TextField {...params} />}
-  PaperComponent={CustomPaper}
-  PopperComponent={CustomPopper}
+  slots={{
+    paper: CustomPaper,
+    popper: CustomPopper,
+  }}
 />
```

If you were providing an inline component:

```diff
 <Autocomplete
   options={options}
   renderInput={(params) => <TextField {...params} />}
-  PopperComponent={(props) => {
-    const { disablePortal, anchorEl, open, ...other } = props;
-    return <Box {...other} />;
-  }}
+  slots={{
+    popper: (props) => {
+      const { disablePortal, anchorEl, open, ...other } = props;
+      return <Box {...other} />;
+    },
+  }}
 />
```

##### renderTags prop

The deprecated `renderTags` prop has been removed. Use `renderValue` instead.

```diff
 <Autocomplete
   multiple
   options={options}
-  renderTags={(value, getTagProps, ownerState) =>
-    value.map((option, index) => (
-      <Chip label={option.label} {...getTagProps({ index })} />
-    ))
-  }
+  renderValue={(value, getItemProps, ownerState) =>
+    value.map((option, index) => (
+      <Chip label={option.label} {...getItemProps({ index })} />
+    ))
+  }
 />
```

---

#### useAutocomplete deprecated fields removed

Use the [autocomplete-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#autocomplete-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/autocomplete-props <path>
```

The following deprecated members have been removed from the `useAutocomplete` hook return value:

- `getTagProps` → use `getItemProps`
- `focusedTag` → use `focusedItem`

##### getTagProps

```diff
 const {
-  getTagProps,
+  getItemProps,
 } = useAutocomplete(props);

 // ...
-<Chip {...getTagProps({ index })} />
+<Chip {...getItemProps({ index })} />
```

##### focusedTag

```diff
 const {
-  focusedTag,
+  focusedItem,
 } = useAutocomplete(props);
```

#### TextField deprecated props removed

Use the [text-field-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#text-field-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/text-field-props <path>
```

The deprecated `TextField` props have been removed.
Use the `slotProps` prop instead:

```diff
 <TextField
-  InputProps={CustomInputProps}
-  inputProps={CustomHtmlInputProps}
-  SelectProps={CustomSelectProps}
-  InputLabelProps={CustomInputLabelProps}
-  FormHelperTextProps={CustomFormHelperTextProps}
+  slotProps={{
+    input: CustomInputProps,
+    htmlInput: CustomHtmlInputProps,
+    select: CustomSelectProps,
+    inputLabel: CustomInputLabelProps,
+    formHelperText: CustomFormHelperTextProps,
+  }}
 />
```

Use the [autocomplete-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#autocomplete-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/autocomplete-props <path>
```

If you render a `TextField` from `Autocomplete`, the `params` shape also changed to match the new `TextField` API:

```diff
 <Autocomplete
   renderInput={(params) => (
     <TextField
       {...params}
-      inputProps={{
-        ...params.inputProps,
-        autoComplete: 'new-password',
+      slotProps={{
+        ...params.slotProps,
+        htmlInput: {
+          ...params.slotProps.htmlInput,
+          autoComplete: 'new-password',
+        },
       }}
     />
   )}
 />
```
