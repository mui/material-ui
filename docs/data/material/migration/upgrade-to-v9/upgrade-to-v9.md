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

#### Event handlers on disabled non-native buttons

When ButtonBase renders a non-native element like a `<span>`, keyboard event handlers will no longer run when the component is disabled.

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

### GridLegacy

The `GridLegacy` component is **removed**, use the `Grid` component instead.

The main API differences are:

- The `item` prop is no longer needed.
- The `xs`, `sm`, `md`, `lg`, `xl` props are replaced by the `size` prop.

```diff
-import Grid from '@mui/material/GridLegacy';
+import Grid from '@mui/material/Grid';

 <Grid container spacing={2}>
-  <Grid item xs={12} sm={6}>
+  <Grid size={{ xs: 12, sm: 6 }}>
     ...
   </Grid>
 </Grid>
```

See the [Grid v2 migration guide](/material-ui/migration/upgrade-to-grid-v2/) for more details.

`MuiGridLegacy` has also been removed from the theme `components` types (`ComponentsProps`, `ComponentsOverrides`, and `ComponentsVariants`).

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

### TextField

When specifying `<TextField select />` to render a `<Select>`, the underlying `<InputLabel>` renders a `<div>` instead of a native `<label>` element. This does not affect `<InputLabel>` on its own.

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

```diff
 <Autocomplete
   multiple
   options={options}
   renderInput={(params) => <TextField {...params} />}
-  ChipProps={{ size: 'small' }}
-  componentsProps={{
-    clearIndicator: { size: 'large' },
-    paper: { elevation: 2 },
-    popper: { placement: 'bottom-end' },
-    popupIndicator: { size: 'large' },
-  }}
-  ListboxComponent={CustomListbox}
-  ListboxProps={{ style: { maxHeight: 200 }, ref }}
-  PaperComponent={CustomPaper}
-  PopperComponent={(props) => {
-    const { disablePortal, anchorEl, open, ...other } = props;
-    return <Box {...other} />;
-  }}
-  renderTags={(value, getTagProps, ownerState) =>
-    value.map((option, index) => (
-      <Chip label={option.label} {...getTagProps({ index })} />
-    ))
-  }
+  slots={{
+    listbox: CustomListbox,
+    paper: CustomPaper,
+    popper: (props) => {
+      const { disablePortal, anchorEl, open, ...other } = props;
+      return <Box {...other} />;
+    },
+  }}
+  slotProps={{
+    chip: { size: 'small' },
+    clearIndicator: { size: 'large' },
+    listbox: { style: { maxHeight: 200 }, ref },
+    paper: { elevation: 2 },
+    popper: { placement: 'bottom-end' },
+    popupIndicator: { size: 'large' },
+  }}
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

#### Alert deprecated CSS classes removed

Use the [alert-classes codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#alert-classes) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/alert-classes <path>
```

The following deprecated `Alert` CSS classes have been removed:

- `standardSuccess` → use `.MuiAlert-standard.MuiAlert-colorSuccess`
- `standardInfo` → use `.MuiAlert-standard.MuiAlert-colorInfo`
- `standardWarning` → use `.MuiAlert-standard.MuiAlert-colorWarning`
- `standardError` → use `.MuiAlert-standard.MuiAlert-colorError`
- `outlinedSuccess` → use `.MuiAlert-outlined.MuiAlert-colorSuccess`
- `outlinedInfo` → use `.MuiAlert-outlined.MuiAlert-colorInfo`
- `outlinedWarning` → use `.MuiAlert-outlined.MuiAlert-colorWarning`
- `outlinedError` → use `.MuiAlert-outlined.MuiAlert-colorError`
- `filledSuccess` → use `.MuiAlert-filled.MuiAlert-colorSuccess`
- `filledInfo` → use `.MuiAlert-filled.MuiAlert-colorInfo`
- `filledWarning` → use `.MuiAlert-filled.MuiAlert-colorWarning`
- `filledError` → use `.MuiAlert-filled.MuiAlert-colorError`

If you were using these deprecated class names as `styleOverrides` keys in your theme, use the `variants` array in the `root` override instead:

```diff
 const theme = createTheme({
   components: {
     MuiAlert: {
       styleOverrides: {
-        standardSuccess: { color: 'green' },
-        standardInfo: { color: 'blue' },
-        standardWarning: { color: 'orange' },
-        standardError: { color: 'red' },
-        outlinedSuccess: { borderColor: 'green' },
-        outlinedInfo: { borderColor: 'blue' },
-        outlinedWarning: { borderColor: 'orange' },
-        outlinedError: { borderColor: 'red' },
-        filledSuccess: { backgroundColor: 'green' },
-        filledInfo: { backgroundColor: 'blue' },
-        filledWarning: { backgroundColor: 'orange' },
-        filledError: { backgroundColor: 'red' },
+        root: {
+          variants: [
+            { props: { variant: 'standard', color: 'success' }, style: { color: 'green' } },
+            { props: { variant: 'standard', color: 'info' }, style: { color: 'blue' } },
+            { props: { variant: 'standard', color: 'warning' }, style: { color: 'orange' } },
+            { props: { variant: 'standard', color: 'error' }, style: { color: 'red' } },
+            { props: { variant: 'outlined', color: 'success' }, style: { borderColor: 'green' } },
+            { props: { variant: 'outlined', color: 'info' }, style: { borderColor: 'blue' } },
+            { props: { variant: 'outlined', color: 'warning' }, style: { borderColor: 'orange' } },
+            { props: { variant: 'outlined', color: 'error' }, style: { borderColor: 'red' } },
+            { props: { variant: 'filled', color: 'success' }, style: { backgroundColor: 'green' } },
+            { props: { variant: 'filled', color: 'info' }, style: { backgroundColor: 'blue' } },
+            { props: { variant: 'filled', color: 'warning' }, style: { backgroundColor: 'orange' } },
+            { props: { variant: 'filled', color: 'error' }, style: { backgroundColor: 'red' } },
+          ],
+        },
       },
     },
   },
 });
```

#### Alert deprecated props removed

Use the [alert-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#alert-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/alert-props <path>
```

The following deprecated props have been removed from the `Alert` component:

- `components` → use `slots`
- `componentsProps` → use `slotProps`

```diff
 <Alert
   onClose={handleClose}
-  components={{ CloseIcon: MyCloseIcon, CloseButton: MyCloseButton }}
-  componentsProps={{ closeButton: { size: 'large' }, closeIcon: { fontSize: 'small' } }}
+  slots={{ closeIcon: MyCloseIcon, closeButton: MyCloseButton }}
+  slotProps={{ closeButton: { size: 'large' }, closeIcon: { fontSize: 'small' } }}
 />
```

#### Accordion deprecated props removed

Use the [accordion-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#accordion-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/accordion-props <path>
```

The following deprecated props have been removed from the `Accordion` component:

- `TransitionComponent` → use `slots.transition`
- `TransitionProps` → use `slotProps.transition`

```diff
 <Accordion
-  TransitionComponent={CustomTransition}
-  TransitionProps={{ unmountOnExit: true }}
+  slots={{ transition: CustomTransition }}
+  slotProps={{ transition: { unmountOnExit: true } }}
 >
```

#### AccordionSummary deprecated CSS classes removed

Use the [accordion-summary-classes codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#accordion-summary-classes) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/accordion-summary-classes <path>
```

The deprecated `AccordionSummary` CSS class `contentGutters` has been removed.
Use the combination of `.MuiAccordionSummary-gutters` and `.MuiAccordionSummary-content` classes instead:

```diff
-.MuiAccordionSummary-contentGutters {
+.MuiAccordionSummary-gutters .MuiAccordionSummary-content {
   margin: 20px 0;
 }
```

#### Avatar deprecated props removed

Use the [avatar-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#avatar-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/avatar-props <path>
```

The following deprecated props have been removed from the `Avatar` component:

- `imgProps` → use `slotProps.img`

```diff
-<Avatar imgProps={{ crossOrigin: 'anonymous', referrerPolicy: 'no-referrer' }} />
+<Avatar slotProps={{ img: { crossOrigin: 'anonymous', referrerPolicy: 'no-referrer' } }} />
```

#### AvatarGroup deprecated props removed

Use the [avatar-group-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#avatar-group-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/avatar-group-props <path>
```

The following deprecated props have been removed from the `AvatarGroup` component:

- `componentsProps` → use `slotProps` (the `additionalAvatar` key has been renamed to `surplus`)

```diff
-<AvatarGroup componentsProps={{ additionalAvatar: { className: 'my-class' } }}>
+<AvatarGroup slotProps={{ surplus: { className: 'my-class' } }}>
```

If you were already using the `surplus` key via `componentsProps`, move it to `slotProps`:

```diff
-<AvatarGroup componentsProps={{ surplus: { className: 'my-class' } }}>
+<AvatarGroup slotProps={{ surplus: { className: 'my-class' } }}>
```

#### Backdrop deprecated props removed

Use the [backdrop-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#backdrop-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/backdrop-props <path>
```

The following deprecated `Backdrop` props have been removed:

- `components` — use `slots` instead
- `componentsProps` — use `slotProps` instead
- `TransitionComponent` — use `slots.transition` instead

```diff
 <Backdrop
-  components={{ Root: CustomRoot }}
-  componentsProps={{ root: { className: 'my-class' } }}
-  TransitionComponent={CustomTransition}
+  slots={{ root: CustomRoot, transition: CustomTransition }}
+  slotProps={{ root: { className: 'my-class' } }}
```

#### Badge deprecated props removed

Use the [badge-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#badge-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/badge-props <path>
```

The following deprecated props have been removed from the `Badge` component:

- `components` → use `slots`
- `componentsProps` → use `slotProps`

```diff
 <Badge
-  components={{ Root: CustomRoot, Badge: CustomBadge }}
-  componentsProps={{ root: { className: 'my-root' }, badge: { className: 'my-badge' } }}
+  slots={{ root: CustomRoot, badge: CustomBadge }}
+  slotProps={{ root: { className: 'my-root' }, badge: { className: 'my-badge' } }}
 />
```

#### Divider deprecated props removed

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#divider-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/divider-props <path>
```

The deprecated `Divider` prop have been removed.
Use `sx={{ opacity : "0.6" }}` (or any opacity):

```diff
 <Divider
-  light
+  sx={{ opacity: 0.6 }}
 />
```

#### FormControlLabel deprecated props removed

Use the [form-control-label-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#form-control-label-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/form-control-label-props <path>
```

The following deprecated prop has been removed:

- `componentsProps` — use `slotProps` instead

```diff
 <FormControlLabel
-  componentsProps={{ typography: { fontWeight: 'bold' } }}
+  slotProps={{ typography: { fontWeight: 'bold' } }}
 />
```

#### Popper deprecated props removed

Use the [popper-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#popper-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/popper-props <path>
```

The following deprecated props have been removed:

- `components` — use `slots` instead
- `componentsProps` — use `slotProps` instead

```diff
 <Popper
-  components={{ Root: CustomRoot }}
-  componentsProps={{ root: { className: 'custom' } }}
+  slots={{ root: CustomRoot }}
+  slotProps={{ root: { className: 'custom' } }}
 />
```

#### Slider deprecated props removed

Use the [slider-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#slider-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/slider-props <path>
```

The following deprecated props have been removed from the `Slider` component:

- `components` — use `slots` instead
- `componentsProps` — use `slotProps` instead

```diff
 <Slider
-  components={{ Track: CustomTrack }}
-  componentsProps={{ track: { testid: 'test-id' } }}
+  slots={{ track: CustomTrack }}
+  slotProps={{ track: { testid: 'test-id' } }}
 />
```

#### Snackbar deprecated props removed

Use the [snackbar-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#snackbar-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/snackbar-props <path>
```

The following deprecated `Snackbar` props have been removed:

- `ClickAwayListenerProps` — use `slotProps.clickAwayListener` instead
- `ContentProps` — use `slotProps.content` instead
- `TransitionComponent` — use `slots.transition` instead
- `TransitionProps` — use `slotProps.transition` instead

```diff
 <Snackbar
-  ClickAwayListenerProps={CustomClickAwayListenerProps}
-  ContentProps={CustomContentProps}
-  TransitionComponent={CustomTransition}
-  TransitionProps={CustomTransitionProps}
+  slots={{ transition: CustomTransition }}
+  slotProps={{
+    clickAwayListener: CustomClickAwayListenerProps,
+    content: CustomContentProps,
+    transition: CustomTransitionProps,
+  }}
 />
```

#### SpeedDial deprecated props removed

The deprecated `SpeedDial` props have been removed.
Use the `slots` and `slotProps` props instead:

```diff
 <SpeedDial
-  TransitionComponent={CustomTransition}
-  TransitionProps={{ timeout: 500 }}
+  slots={{ transition: CustomTransition }}
+  slotProps={{ transition: { timeout: 500 } }}
 >
```

#### SpeedDialAction deprecated props removed

The deprecated `SpeedDialAction` props have been removed.
Use the `slotProps` prop instead:

```diff
 <SpeedDialAction
-  FabProps={{ size: 'large' }}
-  tooltipTitle="Add"
-  tooltipPlacement="right"
-  tooltipOpen
-  TooltipClasses={{ tooltip: 'custom' }}
+  slotProps={{
+    fab: { size: 'large' },
+    tooltip: {
+      title: 'Add',
+      placement: 'right',
+      open: true,
+      classes: { tooltip: 'custom' },
+    },
```

#### Tabs deprecated props removed

Use the [tabs-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#tabs-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/tabs-props <path>
```

The following deprecated props have been removed:

- `ScrollButtonComponent` — use `slots.scrollButtons` instead
- `TabIndicatorProps` — use `slotProps.indicator` instead
- `TabScrollButtonProps` — use `slotProps.scrollButtons` instead
- `slots.StartScrollButtonIcon` — use `slots.startScrollButtonIcon` instead
- `slots.EndScrollButtonIcon` — use `slots.endScrollButtonIcon` instead

```diff
 <Tabs
-  ScrollButtonComponent={CustomScrollButton}
-  TabIndicatorProps={{ style: { backgroundColor: 'green' } }}
-  TabScrollButtonProps={{ disableRipple: true }}
+  slots={{ scrollButtons: CustomScrollButton }}
+  slotProps={{
+    indicator: { style: { backgroundColor: 'green' } },
+    scrollButtons: { disableRipple: true },
+  }}
 />
```

#### TextField deprecated props removed

Use the [text-field-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#text-field-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/text-field-props <path>
```

The following deprecated props have been removed from the `TextField` component:

- `InputProps` → use `slotProps.input`
- `inputProps` → use `slotProps.htmlInput`
- `SelectProps` → use `slotProps.select`
- `InputLabelProps` → use `slotProps.inputLabel`
- `FormHelperTextProps` → use `slotProps.formHelperText`

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
```

#### Tooltip deprecated props removed

Use the [tooltip-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#tooltip-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/tooltip-props <path>
```

The following deprecated props have been removed from the `Tooltip` component:

- `components` → use `slots`
- `componentsProps` → use `slotProps`
- `PopperComponent` → use `slots.popper`
- `PopperProps` → use `slotProps.popper`
- `TransitionComponent` → use `slots.transition`
- `TransitionProps` → use `slotProps.transition`

```diff
 <Tooltip
   title="Hello World"
-  components={{ Popper: CustomPopper, Tooltip: CustomTooltip, Transition: CustomTransition, Arrow: CustomArrow }}
-  componentsProps={{ popper: { placement: 'top' }, tooltip: { className: 'custom' }, arrow: { className: 'arrow' } }}
-  PopperComponent={CustomPopper}
-  PopperProps={{ disablePortal: true }}
-  TransitionComponent={CustomTransition}
-  TransitionProps={{ timeout: 500 }}
+  slots={{ popper: CustomPopper, tooltip: CustomTooltip, transition: CustomTransition, arrow: CustomArrow }}
+  slotProps={{
+    popper: { placement: 'top', disablePortal: true },
+    tooltip: { className: 'custom' },
+    transition: { timeout: 500 },
+    arrow: { className: 'arrow' },
+  }}
 />
```

#### Typography deprecated CSS classes removed

The deprecated `paragraph` CSS class has been removed.
Use CSS `.MuiTypography-root:where(p)` to apply custom styles for the paragraph element instead:

```diff
-.MuiTypography-paragraph {
-  margin-bottom: 16px;
-}
+.MuiTypography-root:where(p) {
+  margin-bottom: 16px;
+}
```

#### Typography deprecated props removed

Use the [typography-props codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#typography-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest deprecations/typography-props <path>
```

The following deprecated props have been removed from the `Typography` component:

- `paragraph` → use the `sx` prop to add a margin bottom instead

```diff
-<Typography paragraph />
+<Typography sx={{ marginBottom: '16px' }} />
```
