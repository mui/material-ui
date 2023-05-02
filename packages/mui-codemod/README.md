# @mui/codemod

> Codemod scripts for MUI

[![npm version](https://img.shields.io/npm/v/@mui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@mui/codemod)
[![npm downloads](https://img.shields.io/npm/dm/@mui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@mui/codemod)

This repository contains a collection of codemod scripts based for use with
[jscodeshift](https://github.com/facebook/jscodeshift) that help update MUI APIs.

## Setup & run

<!-- #default-branch-switch -->

```bash
npx @mui/codemod <codemod> <paths...>

Applies a `@mui/codemod` to the specified paths

Positionals:
  codemod  The name of the codemod                                [string]
  paths    Paths forwarded to `jscodeshift`                       [string]

Options:
  --version  Show version number                                 [boolean]
  --help     Show help                                           [boolean]
  --dry      dry run (no changes are made to files)
                                                [boolean] [default: false]
  --parser   which parser for jscodeshift to use.
                                                [string] [default: 'tsx']
  --print    print transformed files to stdout, useful for development
                                                [boolean] [default: false]
  --jscodeshift                                  [string] [default: false]

Examples:
  npx @mui/codemod v4.0.0/theme-spacing-api src
  npx @mui/codemod v5.0.0/component-rename-prop src --
  --component=Grid --from=prop --to=newProp
  npx @mui/codemod v5.0.0/preset-safe src --parser=flow
```

### jscodeshift options

To pass more options directly to jscodeshift, use `--jscodeshift="..."`. For example:

```sh
npx @mui/codemod --jscodeshift="--run-in-band --verbose=2"
```

See all available options [here](https://github.com/facebook/jscodeshift#usage-cli).

### Recast Options

Options to [recast](https://github.com/benjamn/recast)'s printer can be provided
through jscodeshift's `printOptions` command line argument

```sh
npx @mui/codemod <transform> <path> --jscodeshift="--printOptions='{\"quote\":\"double\"}'"
```

## Included scripts

### v5.0.0

#### `base-remove-component-prop`

Remove `component` prop from all Base UI components by transferring its value into `slots.root`.

This change only affects Base UI components.

```diff
-  <Input component={CustomRoot} />
+  <Input slots={{ root: CustomRoot }} />
```

```sh
npx @mui/codemod v5.0.0/base-remove-component-prop <path>
```

#### `rename-css-variables`

Updates the names of the CSS variables of the Joy UI components to adapt to the new naming standards of the CSS variables for components.

```diff
-  <List sx={{ py: 'var(--List-divider-gap)' }}>
+  <List sx={{ py: 'var(--ListDivider-gap)' }}>
-  <Switch sx={{ '--Switch-track-width': '40px' }}>
+  <Switch sx={{ '--Switch-trackWidth': '40px' }}>
```

```sh
npx @mui/codemod v5.0.0/rename-css-variables <path>
```

#### `base-hook-imports`

Updates the sources of the imports of the Base UI hooks to adapt to the new directories of the hooks.

```diff
-  import { useBadge } from '@mui/base/BadgeUnstyled';
+  import useBadge from '@mui/base/useBadge';
```

```sh
npx @mui/codemod v5.0.0/base-hook-imports <path>
```

#### `joy-rename-classname-prefix`

Renames the classname prefix from `'Joy'` to `'Mui'` for Joy UI components.

```diff
 <Button
-  sx={{ '& .JoyButton-root': { '& .JoyButton-button': {} } }}
+  sx={{ '& .MuiButton-root': { '& .MuiButton-button': {} } }}
 />;
```

```sh
npx @mui/codemod v5.0.0/joy-rename-classname-prefix <path>
```

#### `joy-rename-row-prop`

Transforms `row` prop to `orientation` prop across `Card`, `List` and `RadioGroup` components.

```diff
 <Card
-  row
+  orientation={"horizontal"}
 />;
```

```sh
npx @mui/codemod v5.0.0/joy-rename-row-prop <path>
```

#### `joy-avatar-remove-imgProps`

Remove `imgProps` prop by transferring its value into `slotProps.img`

This change only affects Joy UI Avatar component.

```diff
 <Avatar
-  imgProps={{ ['data-id']: 'imageId' }}
-  slotProps={{ root: { ['data-id']: 'rootId' }}}
+  slotProps={{ root: { ['data-id']: 'rootId' }, img: { ['data-id']: 'imageId' } }}
 />;
```

```sh
npx @mui/codemod v5.0.0/joy-avatar-remove-imgProps <path>
```

#### `joy-text-field-to-input`

Replace `<TextField>` with composition of `Input`

This change only affects Joy UI components.

```diff
-import TextField from '@mui/joy/TextField';
+import FormControl from '@mui/joy/FormControl';
+import FormLabel from '@mui/joy/FormLabel';
+import FormHelperText from '@mui/joy/FormHelperText';
+import Input from '@mui/joy/Input';

-<TextField
-  id="Id"
-  label="Label"
-  placeholder="Placeholder"
-  helperText="Help!"
-  name="Name"
-  type="tel"
-  autoComplete="on"
-  autoFocus
-  error
-  required
-  fullWidth
-  defaultValue="DefaultValue"
-  size="sm"
-  color="primary"
-  variant="outlined"
-/>
+<FormControl
+  id="Id"
+  required
+  size="sm"
+  color="primary">
+  <FormLabel>
+    Label
+  </FormLabel>
+  <JoyInput
+    placeholder="Placeholder"
+    name="Name"
+    type="tel"
+    autoComplete="on"
+    autoFocus
+    error
+    fullWidth
+    defaultValue="DefaultValue"
+    variant="outlined" />
+  <FormHelperText id="Id-helper-text">
+    Help!
+  </FormHelperText>
+</FormControl>
```

```sh
npx @mui/codemod v5.0.0/joy-text-field-to-input <path>
```

#### `joy-rename-components-to-slots`

Renames the `components` and `componentsProps` props to `slots` and `slotProps`, respectively.

This change only affects Joy UI components.

```diff
 <Autocomplete
-  components={{ listbox: CustomListbox }}
+  slots={{ listbox: CustomListbox }}
-  componentsProps={{ root: { className: 'root' }, listbox: { 'data-testid': 'listbox' } }}
+  slotProps={{ root: { className: 'root' }, listbox: { 'data-testid': 'listbox' } }}
 />;
```

```sh
npx @mui/codemod v5.0.0/joy-rename-components-to-slots <path>
```

The associated breaking change was done in [#34997](https://github.com/mui/material-ui/pull/34997).

#### `date-pickers-moved-to-x`

Rename the imports of date and time pickers from `@mui/lab` to `@mui/x-date-pickers` and `@mui/x-date-pickers-pro`.

```sh
npx @mui/codemod v5.0.0/date-pickers-moved-to-x <path>
```

#### 🚀 `preset-safe`

A combination of all important transformers for migrating v4 to v5. ⚠️ This codemod should be run only once.

```sh
npx @mui/codemod v5.0.0/preset-safe <path|folder>
```

The list includes these transformers

- [`adapter-v4`](#adapter-v4)
- [`autocomplete-rename-closeicon`](#autocomplete-rename-closeicon)
- [`autocomplete-rename-option`](#autocomplete-rename-option)
- [`avatar-circle-circular`](#avatar-circle-circular)
- [`badge-overlap-value`](#badge-overlap-value)
- [`box-borderradius-values`](#box-borderradius-values)
- [`box-rename-css`](#box-rename-css)
- [`box-rename-gap`](#box-rename-gap)
- [`button-color-prop`](#button-color-prop)
- [`chip-variant-prop`](#chip-variant-prop)
- [`circularprogress-variant`](#circularprogress-variant)
- [`collapse-rename-collapsedheight`](#collapse-rename-collapsedheight)
- [`core-styles-import`](#core-styles-import)
- [`create-theme`](#create-theme)
- [`dialog-props`](#dialog-props)
- [`dialog-title-props`](#dialog-title-props)
- [`emotion-prepend-cache`](#emotion-prepend-cache)
- [`expansion-panel-component`](#expansion-panel-component)
- [`fab-variant`](#fab-variant)
- [`fade-rename-alpha`](#fade-rename-alpha)
- [`grid-justify-justifycontent`](#grid-justify-justifycontent)
- [`grid-list-component`](#grid-list-component)
- [`icon-button-size`](#icon-button-size)
- [`material-ui-styles`](#material-ui-styles)
- [`material-ui-types`](#material-ui-types)
- [`modal-props`](#modal-props)
- [`moved-lab-modules`](#moved-lab-modules)
- [`pagination-round-circular`](#pagination-round-circular)
- [`optimal-imports`](#optimal-imports)
- [`root-ref`](#root-ref)
- [`skeleton-variant`](#skeleton-variant)
- [`styled-engine-provider`](#styled-engine-provider)
- [`table-props`](#table-props)
- [`tabs-scroll-buttons`](#tabs-scroll-buttons)
- [`textarea-minmax-rows`](#textarea-minmax-rows)
- [`theme-augment`](#theme-augment)
- [`theme-breakpoints`](#theme-breakpoints)
- [`theme-breakpoints-width`](#theme-breakpoints-width)
- [`theme-options`](#theme-options)
- [`theme-palette-mode`](#theme-palette-mode)
- [`theme-provider`](#theme-provider)
- [`theme-spacing`](#theme-spacing)
- [`theme-typography-round`](#theme-typography-round)
- [`transitions`](#transitions)
- [`use-autocomplete`](#use-autocomplete)
- [`use-transitionprops`](#use-transitionprops)
- [`with-mobile-dialog`](#with-mobile-dialog)
- [`with-width`](#with-width)
- [`mui-replace`](#mui-replace)

#### `adapter-v4`

Imports and inserts `adaptV4Theme` into `createTheme` (or `createMuiTheme`)

```diff
+import { adaptV4Theme } from '@material-ui/core/styles';

-createTheme({ palette: { ... }})
+createTheme(adaptV4Theme({ palette: { ... }}))
```

```sh
npx @mui/codemod v5.0.0/adapter-v4 <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `autocomplete-rename-closeicon`

Renames `Autocomplete`'s `closeIcon` prop to `clearIcon`.

```diff
-<Autocomplete closeIcon={defaultClearIcon} />
+<Autocomplete clearIcon={defaultClearIcon} />
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/autocomplete-rename-closeicon  <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#autocomplete).

#### `autocomplete-rename-option`

Renames `Autocomplete`'s `getOptionSelected` to `isOptionEqualToValue`.

```diff
 <Autocomplete
-  getOptionSelected={(option, value) => option.title === value.title}
+  isOptionEqualToValue={(option, value) => option.title === value.title}
 />
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/autocomplete-rename-option  <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#autocomplete).

#### `avatar-circle-circular`

Updates the `Avatar`'s `variant` value and `classes` key from 'circle' to 'circular'.

```diff
-<Avatar variant="circle" />
-<Avatar classes={{ circle: 'className' }} />
+<Avatar variant="circular" />
+<Avatar classes={{ circular: 'className' }} />
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/avatar-circle-circular <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#avatar).

#### `badge-overlap-value`

Renames the badge's props.

```diff
-<Badge overlap="circle">
-<Badge overlap="rectangle">
+<Badge overlap="circular">
+<Badge overlap="rectangular">
 <Badge classes={{
-  anchorOriginTopRightRectangle: 'className',
-  anchorOriginBottomRightRectangle: 'className',
-  anchorOriginTopLeftRectangle: 'className',
-  anchorOriginBottomLeftRectangle: 'className',
-  anchorOriginTopRightCircle: 'className',
-  anchorOriginBottomRightCircle: 'className',
-  anchorOriginTopLeftCircle: 'className',
+  anchorOriginTopRightRectangular: 'className',
+  anchorOriginBottomRightRectangular: 'className',
+  anchorOriginTopLeftRectangular: 'className',
+  anchorOriginBottomLeftRectangular: 'className',
+  anchorOriginTopRightCircular: 'className',
+  anchorOriginBottomRightCircular: 'className',
+  anchorOriginTopLeftCircular: 'className',
 }}>
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/badge-overlap-value <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#badge).

#### `base-rename-components-to-slots`

Renames the `components` and `componentsProps` props to `slots` and `slotProps`, respectively.
Also, changes `slots`' fields names to camelCase.

This change only affects Base UI components.

```diff
 <BadgeUnstyled
-  components={{ Root, Badge: CustomBadge }}
+  slots={{ root: Root, badge: CustomBadge }}
-  componentsProps={{ root: { className: 'root' }, badge: { 'data-testid': 'badge' } }}
+  slotProps={{ root: { className: 'root' }, badge: { 'data-testid': 'badge' } }}
 />;
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/base-rename-components-to-slots <path>
```

The associated breaking change was done in [#34693](https://github.com/mui/material-ui/pull/34693).

#### `box-borderradius-values`

Updates the Box API from separate system props to `sx`.

```diff
-<Box borderRadius="borderRadius">
-<Box borderRadius={16}>
+<Box borderRadius={1}>
+<Box borderRadius="16px">
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/box-borderradius-values <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#box).

#### `box-rename-css`

Renames the Box `css` prop to `sx`

```diff
-<Box css={{ m: 2 }}>
+<Box sx={{ m: 2 }}>
```

```sh
npx @mui/codemod v5.0.0/box-rename-css <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#box).

#### `box-rename-gap`

Renames the Box `grid*Gap` props.

```diff
-<Box gridGap={2}>Item 3</Box>
-<Box gridColumnGap={3}>Item 4</Box>
-<Box gridRowGap={4}>Item 5</Box>
+<Box gap={2}>Item 3</Box>
+<Box columnGap={3}>Item 4</Box>
+<Box rowGap={4}>Item 5</Box>
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/box-rename-gap <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#box).

#### `button-color-prop`

Removes the outdated `color` prop values.

```diff
-<Button color="default">
+<Button>
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/button-color-prop <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#button).

#### `chip-variant-prop`

Removes the Chip `variant` prop if the value is `"default"`.

```diff
-<Chip variant="default">
+<Chip>
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/chip-variant-prop <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#chip).

#### `circularprogress-variant`

Renames the CircularProgress `static` variant to `determinate`.

```diff
-<CircularProgress variant="static" classes={{ static: 'className' }} />
+<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/circularprogress-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#circularprogress).

#### `collapse-rename-collapsedheight`

Renames `Collapse`'s `collapsedHeight` prop to `collapsedSize`.

```diff
-<Collapse collapsedHeight={40} />
-<Collapse classes={{ container: 'collapse' }} />
+<Collapse collapsedSize={40} />
+<Collapse classes={{ root: 'collapse' }} />
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/collapse-rename-collapsedheight <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#collapse).

#### `component-rename-prop`

A generic codemod to rename any component prop.

```diff
-<Component prop="value" />
-<Component prop />
+<Component newProp="value" />
+<Component newProp />
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/component-rename-prop <path> -- --component=Grid --from=prop --to=newProp
```

#### `core-styles-import`

Renames private import from `core/styles/*` to `core/styles`

```diff
-import { darken, lighten } from '@material-ui/core/styles/colorManipulator';
+import { darken, lighten } from '@material-ui/core/styles';
```

```sh
npx @mui/codemod v5.0.0/core-styles-import <path>
```

#### `create-theme`

Renames the function `createMuiTheme` to `createTheme`

```diff
-import { createMuiTheme } from '@material-ui/core/styles';
+import { createTheme } from '@material-ui/core/styles';
```

```sh
npx @mui/codemod v5.0.0/create-theme <path>
```

#### `dialog-props`

Remove `disableBackdropClick` prop from `<Dialog>`

```diff
-<Dialog disableBackdropClick />
+<Dialog />
```

```sh
npx @mui/codemod v5.0.0/dialog-props <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#dialog).

#### `dialog-title-props`

Remove `disableTypography` prop from `<DialogTitle>`

```diff
-<DialogTitle disableTypography />
+<DialogTitle />
```

```sh
npx @mui/codemod v5.0.0/dialog-title-props <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#dialog).

#### `emotion-prepend-cache`

Adds `prepend: true` to Emotion `createCache`

```diff
 const cache = emotionCreateCache({
   key: 'css',
+  prepend: true,
 });
```

```sh
npx @mui/codemod v5.0.0/create-theme <path>
```

#### `expansion-panel-component`

Renames `ExpansionPanel*` to `Accordion*`

```sh
npx @mui/codemod v5.0.0/expansion-panel-component <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#expansionpanel).

#### `fab-variant`

```diff
-<Fab variant="round" />
+<Fab variant="circular" />
```

```sh
npx @mui/codemod v5.0.0/fab-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#fab).

#### `fade-rename-alpha`

Renames the `fade` style utility import and calls to `alpha`.

```diff
-import { fade, lighten } from '@material-ui/core/styles';
+import { alpha, lighten } from '@material-ui/core/styles';

-const foo = fade('#aaa');
+const foo = alpha('#aaa');
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/fade-rename-alpha <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#styles).

#### `grid-justify-justifycontent`

Renames `Grid`'s `justify` prop to `justifyContent`.

```diff
-<Grid justify="left">Item</Grid>
+<Grid item justifyContent="left">Item</Grid>
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/grid-justify-justifycontent <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#grid).

#### `grid-list-component`

Renames `GridList*` to `ImageList*`

```sh
npx @mui/codemod v5.0.0/grid-list-component <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#gridlist).

#### `icon-button-size`

Adds `size="large"` if `size` is not defined to get the same appearance as v4.

```diff
-<IconButton size="medium" />
-<IconButton />
+<IconButton size="medium" />
+<IconButton size="large" />
```

```sh
npx @mui/codemod v5.0.0/icon-button-size <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#iconbutton).

#### `jss-to-styled`

Replace JSS styling with `makeStyles` or `withStyles` to `styled` API.

```diff
 import Typography from '@material-ui/core/Typography';
-import makeStyles from '@material-ui/styles/makeStyles';
+import { styled } from '@material-ui/core/styles';

-const useStyles = makeStyles((theme) => ({
-  root: {
-    display: 'flex',
-    alignItems: 'center',
-    backgroundColor: theme.palette.primary.main
-  },
-  cta: {
-    borderRadius: theme.shape.radius
-  },
-  content: {
-    color: theme.palette.common.white,
-    fontSize: 16,
-    lineHeight: 1.7
-  },
-}))
+const PREFIX = 'MyCard';
+const classes = {
+  root: `${PREFIX}-root`,
+  cta: `${PREFIX}-cta`,
+  content: `${PREFIX}-content`,
+}
+const Root = styled('div')((theme) => ({
+  [`&.${classes.root}`]: {
+    display: 'flex',
+    alignItems: 'center',
+    backgroundColor: theme.palette.primary.main
+  },
+  [`& .${classes.cta}`]: {
+    borderRadius: theme.shape.radius
+  },
+  [`& .${classes.content}`]: {
+    color: theme.palette.common.white,
+    fontSize: 16,
+    lineHeight: 1.7
+  },
+}))

 export const MyCard = () => {
   const classes = useStyles();
   return (
-    <div className={classes.root}>
+    <Root className={classes.root}>
       <Typography className={classes.content}>...</Typography>
       <Button className={classes.cta}>Go</Button>
-    </div>
+    </Root>
   )
 }
```

```sh
npx @mui/codemod v5.0.0/jss-to-styled <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#1-use-styled-or-sx-api).

> **Note:** This approach converts the first element in the return statement into styled component but also increases CSS specificity to override nested children.
> This codemod should be adopted after handling all breaking changes, [check out the migration documentation](https://mui.com/material-ui/migration/migration-v4/).

#### `jss-to-tss-react`

Migrate JSS styling with `makeStyles` or `withStyles` to the corresponding `tss-react` API.

```diff
-import clsx from 'clsx';
-import {makeStyles, createStyles} from '@material-ui/core/styles';
+import { makeStyles } from 'tss-react/mui';

-const useStyles = makeStyles((theme) => createStyles<
-  'root' | 'small' | 'child', {color: 'primary' | 'secondary', padding: number}
->
-({
-  root: ({color, padding}) => ({
+const useStyles = makeStyles<{color: 'primary' | 'secondary', padding: number}, 'child' | 'small'>({name: 'App'})((theme, { color, padding }, classes) => ({
+  root: {
     padding: padding,
-    '&:hover $child': {
+    [`&:hover .${classes.child}`]: {
       backgroundColor: theme.palette[color].main,
     }
-  }),
+  },
   small: {},
   child: {
     border: '1px solid black',
     height: 50,
-    '&$small': {
+    [`&.${classes.small}`]: {
       height: 30
     }
   }
-}), {name: 'App'});
+}));

 function App({classes: classesProp}: {classes?: any}) {
-  const classes = useStyles({color: 'primary', padding: 30, classes: classesProp});
+  const { classes, cx } = useStyles({
+    color: 'primary',
+    padding: 30
+  }, {
+    props: {
+      classes: classesProp
+    }
+  });

   return (
     <div className={classes.root}>
       <div className={classes.child}>
         The Background take the primary theme color when the mouse hovers the parent.
       </div>
-      <div className={clsx(classes.child, classes.small)}>
+      <div className={cx(classes.child, classes.small)}>
         The Background take the primary theme color when the mouse hovers the parent.
         I am smaller than the other child.
       </div>
     </div>
   );
 }

 export default App;
```

```sh
npx @mui/codemod v5.0.0/jss-to-tss-react <path>
```

The following scenarios are not currently handled by this codemod and will be marked with a
"TODO jss-to-tss-react codemod" comment:

- If the hook returned by `makeStyles` (e.g. `useStyles`) is exported and used in another file,
  the usages in other files will not be converted.
- Arrow functions as the value for a CSS prop will not be converted. Arrow functions **are**
  supported at the rule level, though with some caveats listed below.
- In order for arrow functions at the rule level to be converted, the parameter must use object
  destructuring (e.g. `root: ({color, padding}) => (...)`). If the parameter is not destructured
  (e.g. `root: (props) => (...)`), it will not be converted.
- If an arrow function at the rule level contains a code block (i.e. contains an explicit `return`
  statement) rather than just an object expression, it will not be converted.

You can find more details about migrating from JSS to tss-react in [the migration guide](https://mui.com/material-ui/migration/migrating-from-jss/#2-use-tss-react).

#### `link-underline-hover`

Apply `underline="hover"` to `<Link />` that does not define `underline` prop (to get the same behavior as in v4).

```diff
-<Link />
+<Link underline="hover" />
```

```sh
npx @mui/codemod v5.0.0/link-underline-hover <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#link).

#### `material-ui-styles`

Moves JSS imports to `@material-ui/styles`

```diff
-import {
-  createGenerateClassName,
-  createStyles,
-  jssPreset,
-  makeStyles,
-  ServerStyleSheets,
-  useThemeVariants,
-  withStyles,
-  withTheme,
-  ThemeProvider,
-  styled,
-  getStylesCreator,
-  mergeClasses,
-} from '@material-ui/core/styles';
+import { ThemeProvider, styled } from '@material-ui/core/styles';
+import createGenerateClassName from '@material-ui/styles/createGenerateClassName';
+import createStyles from '@material-ui/styles/createStyles';
+import jssPreset from '@material-ui/styles/jssPreset';
+import makeStyles from '@material-ui/styles/makeStyles';
+import ServerStyleSheets from '@material-ui/styles/ServerStyleSheets';
+import useThemeVariants from '@material-ui/styles/useThemeVariants';
+import withStyles from '@material-ui/styles/withStyles';
+import withTheme from '@material-ui/styles/withTheme';
+import getStylesCreator from '@material-ui/styles/getStylesCreator';
 import mergeClasses from '@material-ui/styles/mergeClasses';
```

```sh
npx @mui/codemod v5.0.0/material-ui-styles <path>
```

#### `material-ui-types`

Renames `Omit` import from `@material-ui/types` to `DistributiveOmit`

```diff
-import { Omit } from '@material-ui/types';
+import { DistributiveOmit } from '@material-ui/types';
```

```sh
npx @mui/codemod v5.0.0/material-ui-types <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#material-ui-types).

#### `modal-props`

Removes `disableBackdropClick` and `onEscapeKeyDown` from `<Modal>`

```diff
 <Modal
-  disableBackdropClick
-  onEscapeKeyDown={handleEscapeKeyDown}
 />
```

```sh
npx @mui/codemod v5.0.0/modal-props <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#modal).

#### `moved-lab-modules`

Updates all imports for `@material-ui/lab` components that have moved to `@material-ui/core`.

```diff
-import Skeleton from '@material-ui/lab/Skeleton';
+import Skeleton from '@material-ui/core/Skeleton';
```

or

```diff
-import { SpeedDial } from '@material-ui/lab';
+import { SpeedDial } from '@material-ui/core';
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/moved-lab-modules <path>
```

You can find more details about this breaking change in the migration guide.

- [Alert](https://mui.com/material-ui/migration/v5-component-changes/#alert)
- [Autocomplete](https://mui.com/material-ui/migration/v5-component-changes/#autocomplete)
- [AvatarGroup](https://mui.com/material-ui/migration/v5-component-changes/#avatar)
- [Pagination](https://mui.com/material-ui/migration/v5-component-changes/#pagination)
- [Skeleton](https://mui.com/material-ui/migration/v5-component-changes/#skeleton)
- [SpeedDial](https://mui.com/material-ui/migration/v5-component-changes/#speeddial)
- [ToggleButton](https://mui.com/material-ui/migration/v5-component-changes/#togglebutton)

#### `pagination-round-circular`

Renames `Pagination*`'s `shape` values from 'round' to 'circular'.

```diff
-<Pagination shape="round" />
-<PaginationItem shape="round" />
+<Pagination shape="circular" />
+<PaginationItem shape="circular" />
```

```sh
npx @mui/codemod v5.0.0/pagination-round-circular <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#pagination).

#### `optimal-imports`

Fix private import paths.

```diff
-import red from '@material-ui/core/colors/red';
-import createTheme from '@material-ui/core/styles/createTheme';
+import { red } from '@material-ui/core/colors';
+import { createTheme } from '@material-ui/core/styles';
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/optimal-imports <path>
```

#### `root-ref`

Removes `RootRef` from the codebase.

```sh
npx @mui/codemod v5.0.0/root-ref <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#rootref).

#### `skeleton-variant`

```diff
-<Skeleton variant="circle" />
-<Skeleton variant="rect" />
+<Skeleton variant="circular" />
+<Skeleton variant="rectangular" />
```

```sh
npx @mui/codemod v5.0.0/skeleton-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#skeleton).

#### `styled-engine-provider`

Applies `StyledEngineProvider` to the files that contains `ThemeProvider`.

```sh
npx @mui/codemod v5.0.0/styled-engine-provider <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-style-changes/#style-library).

#### `table-props`

Renames props in `Table*` components.

```diff
-<>
-  <TablePagination onChangeRowsPerPage={() => {}} onChangePage={() => {}} />
-  <TablePagination classes={{ input: 'foo' }} />
-  <Table padding="default" />
-  <TableCell padding="default" />
-</>
+<>
+  <TablePagination onRowsPerPageChange={() => {}} onPageChange={() => {}} />
+  <TablePagination classes={{ select: 'foo' }} />
+  <Table padding="normal" />
+  <TableCell padding="normal" />
+</>

```

```sh
npx @mui/codemod v5.0.0/table-props <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#table).

#### `tabs-scroll-buttons`

Renames the `Tabs`'s `scrollButtons` prop values.

```diff
-<Tabs scrollButtons="on" />
-<Tabs scrollButtons="desktop" />
-<Tabs scrollButtons="off" />
+<Tabs scrollButtons allowScrollButtonsMobile />
+<Tabs scrollButtons />
+<Tabs scrollButtons={false} />
```

```sh
npx @mui/codemod v5.0.0/tabs-scroll-buttons <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#tabs).

#### `textarea-minmax-rows`

Renames `TextField`'s rows props.

```diff
-<TextField rowsMin={3} rowsMax={6} />
-<TextareaAutosize rows={2} />
-<TextareaAutosize rowsMin={3} rowsMax={6} />
+<TextField minRows={3} maxRows={6} />
+<TextareaAutosize minRows={2} />
+<TextareaAutosize minRows={3} maxRows={6} />
```

```sh
npx @mui/codemod v5.0.0/textarea-minmax-rows <path>
```

You can find more details about this breaking change in the migration guide.

- [TextareaAutosize](https://mui.com/material-ui/migration/v5-component-changes/#textareaautoresize)
- [TextField](https://mui.com/material-ui/migration/v5-component-changes/#textfield)

#### `theme-augment`

Adds `DefaultTheme` module augmentation to typescript projects.

```sh
npx @mui/codemod v5.0.0/theme-augment <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#material-ui-styles).

#### `theme-breakpoints`

Updates breakpoint values to match new logic. ⚠️ This mod is not idempotent, it should be run only once.

```diff
-theme.breakpoints.down('sm')
-theme.breakpoints.between('sm', 'md')
+theme.breakpoints.down('md')
+theme.breakpoints.between('sm', 'lg')
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/theme-breakpoints <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `theme-breakpoints-width`

Renames `theme.breakpoints.width('md')` to `theme.breakpoints.values.md`.

```sh
npx @mui/codemod v5.0.0/theme-breakpoints-width <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `theme-options`

```diff
-import { ThemeOptions } from '@material-ui/core';
+import { DeprecatedThemeOptions } from '@material-ui/core';
```

```sh
npx @mui/codemod v5.0.0/theme-options <path>
```

#### `theme-palette-mode`

Renames `type` to `mode`.

```diff
 {
   palette: {
-    type: 'dark',
+    mode: 'dark',
   },
 }
```

```diff
-theme.palette.type === 'dark'
+theme.palette.mode === 'dark'
```

```sh
npx @mui/codemod v5.0.0/theme-palette-mode <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `theme-provider`

Renames `MuiThemeProvider` to `ThemeProvider`.

```sh
npx @mui/codemod v5.0.0/theme-provider <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#material-ui-core-styles).

#### `theme-spacing`

Removes the 'px' suffix from some template strings.

```diff
-`${theme.spacing(2)}px`
-`${theme.spacing(2)}px ${theme.spacing(4)}px`
+`${theme.spacing(2)}`
+`${theme.spacing(2)} ${theme.spacing(4)}`
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/theme-spacing <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `theme-typography-round`

Renames `theme.typography.round($number)` to `Math.round($number * 1e5) / 1e5`.

```diff
-`${theme.typography.round($number)}`
+`${Math.round($number * 1e5) / 1e5}`
```

```sh
npx @mui/codemod v5.0.0/theme-typography-round <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `top-level-imports`

Converts all `@mui/material` submodule imports to the root module:

```diff
-import List from '@mui/material/List';
-import Grid from '@mui/material/Grid';
+import { List, Grid } from '@mui/material';
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/top-level-imports <path>
```

Head to https://mui.com/guides/minimizing-bundle-size/ to understand when it's useful.

#### `transitions`

Renames import `transitions` to `createTransitions`

```sh
npx @mui/codemod v5.0.0/transitions <path>
```

#### `use-autocomplete`

Renames `useAutocomplete` related import from lab to core

```diff
-import useAutocomplete from '@material-ui/lab/useAutocomplete';
+import useAutocomplete from '@material-ui/core/useAutocomplete';
```

```sh
npx @mui/codemod v5.0.0/use-autocomplete <path>
```

#### `use-transitionprops`

Updates Dialog, Menu, Popover, and Snackbar to use the `TransitionProps` prop to replace the `onEnter*` and `onExit*` props.

```diff
 <Dialog
-  onEnter={onEnter}
-  onEntered={onEntered}
-  onEntering={onEntering}
-  onExit={onExit}
-  onExited={onExited}
-  onExiting={onExiting}
+  TransitionProps={{
+    onEnter,
+    onEntered,
+    onEntering,
+    onExit,
+    onExited,
+    onExiting,
+  }}
 />
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/use-transitionprops <path>
```

You can find more details about this breaking change in [the migration guide](/material-ui/migration/v5-component-changes/#dialog).

#### `variant-prop`

> Don't run this codemod if you already set `variant` to `outlined` or `filled` in theme default props.

Adds the TextField, Select, and FormControl's `variant="standard"` prop when `variant` is undefined.
The diff should look like this:

```diff
-<TextField value="Standard" />
+<TextField value="Standard" variant="standard" />
```

```diff
-<Select value="Standard" />
+<Select value="Standard" variant="standard" />
```

```diff
-<FormControl value="Standard" />
+<FormControl value="Standard" variant="standard" />
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v5.0.0/variant-prop <path>
```

#### `with-mobile-dialog`

Removes imported `withMobileDialog`, and inserts hardcoded version to prevent application crash.

```diff
-import withMobileDialog from '@material-ui/core/withMobileDialog';
+// FIXME checkout https://mui.com/material-ui/migration/v5-component-changes/#dialog
+const withMobileDialog = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="lg" fullScreen={false} />;
```

```sh
npx @mui/codemod v5.0.0/with-mobile-dialog <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#dialog).

#### `with-width`

Removes `withWidth` import, and inserts hardcoded version to prevent application crash.

```diff
-import withWidth from '@material-ui/core/withWidth';
+// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
+const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;
```

```sh
npx @mui/codemod v5.0.0/with-width <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-style-changes/#material-ui-core-styles).

#### `mui-replace`

Replace every occurrence of `material-ui` related package with the new package names (listed below) except these packages (`@material-ui/pickers`, `@material-ui/data-grid`, `@material-ui/x-grid` & `@material-ui/x-grid-data-generator`). [More details about why package names are changed](https://github.com/mui/material-ui/issues/27666)

**Material Design components**

```diff
-import Alert from '@material-ui/core/Alert';
+import Alert from '@mui/material/Alert';
```

**JSS styles package**

```diff
-import { makeStyles } from '@material-ui/styles';
+import { makeStyles } from '@mui/styles';
```

**System package**

```diff
-import { SxProps } from '@material-ui/system';
+import { SxProps } from '@mui/system';
```

**Utilities package**

```diff
-import { deepmerge } from '@material-ui/utils';
+import { deepmerge } from '@mui/utils';
```

**Lab**

```diff
-import Mansory from '@material-ui/lab/Mansory';
+import Mansory from '@mui/lab/Mansory';
```

**Dependencies**

```diff
  // package.json
-"@material-ui/core": "next",
-"@material-ui/icons": "next",
-"@material-ui/lab": "next",
-"@material-ui/unstyled": "next",
-"@material-ui/styled-engine-sc": "next",
+"@mui/material": "next",
+"@mui/icons-material": "next",
+"@mui/lab": "next",
+"@mui/base": "next",
+"@mui/styled-engine-sc": "next",
```

```sh
npx @mui/codemod v5.0.0/mui-replace <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/migration-v4/#update-material-ui-version).

### v4.0.0

#### `theme-spacing-api`

Updates the `theme-spacing-api` from `theme.spacing.unit x` to `theme.spacing(x)`.
The diff should look like this:

```diff
-const spacing = theme.spacing.unit;
+const spacing = theme.spacing(1);
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v4.0.0/theme-spacing-api <path>
```

This codemod tries to perform a basic expression simplification which can be improved for expressions that use more than one operation.

```diff
-const spacing = theme.spacing.unit / 5;
+const spacing = theme.spacing(0.2);

 // Limitation
-const spacing = theme.spacing.unit * 5 * 5;
+const spacing = theme.spacing(5) * 5;
```

#### `optimal-imports`

Converts all `@material-ui/core` imports more than 1 level deep to the optimal form for tree shaking:

```diff
-import withStyles from '@material-ui/core/styles/withStyles';
-import createTheme from '@material-ui/core/styles/createTheme';
+import { withStyles, createTheme } from '@material-ui/core/styles';
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v4.0.0/optimal-imports <path>
```

Head to https://mui.com/guides/minimizing-bundle-size/ to understand when it's useful.

#### `top-level-imports`

Converts all `@material-ui/core` submodule imports to the root module:

```diff
-import List from '@material-ui/core/List';
-import { withStyles } from '@material-ui/core/styles';
+import { List, withStyles } from '@material-ui/core';
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v4.0.0/top-level-imports <path>
```

Head to https://mui.com/guides/minimizing-bundle-size/ to understand when it's useful.

### v1.0.0

#### `import-path`

Updates the `import-paths` for the new location of the components.
MUI v1.0.0 flatten the import paths.
The diff should look like this:

```diff
-import { MenuItem } from '@material-ui/core/Menu';
+import MenuItem from '@material-ui/core/MenuItem';
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v1.0.0/import-path <path>
```

**Notice**: if you are migrating from pre-v1.0, and your imports use `material-ui`, you will need to manually find and replace all references to `material-ui` in your code to `@material-ui/core`. E.g.:

```diff
-import Typography from 'material-ui/Typography';
+import Typography from '@material-ui/core/Typography';
```

Subsequently, you can run the above `find ...` command to flatten your imports.

#### `color-imports`

Updates the `color-imports` for the new location of MUI color palettes.
The diff should look like this:

```diff
-import { blue, teal500 } from 'material-ui/styles/colors';
+import blue from '@material-ui/core/colors/blue';
+import teal from '@material-ui/core/colors/teal';
+const teal500 = teal['500'];
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v1.0.0/color-imports <path>
```

**additional options**

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v1.0.0/color-imports <path> -- --importPath='mui/styles/colors' --targetPath='mui/colors'
```

#### `svg-icon-imports`

Updates the `svg-icons` import paths from `material-ui/svg-icons/<category>/<icon-name>` to `@material-ui/icons/<IconName>`, to use the new `@material-ui/icons` package.
The diff should look like this:

```diff
-import AccessAlarmIcon from 'material-ui/svg-icons/device/AccessAlarm';
-import ThreeDRotation from 'material-ui/svg-icons/action/ThreeDRotation';
+import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
+import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v1.0.0/svg-icon-imports <path>
```

#### `menu-item-primary-text`

Updates `MenuItem` with `primaryText` property making its value tag's child.
The diff should look like this:

```diff
-<MenuItem primaryText="Profile" />
-<MenuItem primaryText={"Profile" + "!"} />
+<MenuItem>Profile</MenuItem>
+<MenuItem>{"Profile" + "!"}</MenuItem>
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v1.0.0/menu-item-primary-text <path>
```

### v0.15.0

#### `import-path`

Updates the `import-paths` for the new location of the components.
MUI v0.15.0 is reorganizing the folder distribution of the project.
The diff should look like this:

```diff
 // From the source
-import FlatButton from 'material-ui/src/flat-button';
+import FlatButton from 'material-ui/src/FlatButton';

 // From npm
-import RaisedButton from 'material-ui/lib/raised-button';
+import RaisedButton from 'material-ui/RaisedButton';
```

<!-- #default-branch-switch -->

```sh
npx @mui/codemod v0.15.0/import-path <path>
```
