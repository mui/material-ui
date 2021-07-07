# @material-ui/codemod

> Codemod scripts for Material-UI

[![npm version](https://img.shields.io/npm/v/@material-ui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@material-ui/codemod)
[![npm downloads](https://img.shields.io/npm/dm/@material-ui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@material-ui/codemod)

This repository contains a collection of codemod scripts based for use with
[jscodeshift](https://github.com/facebook/jscodeshift) that help update Material-UI APIs.

## Setup & run

<!-- #default-branch-switch -->

```bash
npx @material-ui/codemod@next <codemod> <paths...>

Applies a `@material-ui/codemod` to the specified paths

Positionals:
  codemod  The name of the codemod                                [string]
  paths    Paths forwarded to `jscodeshift`                       [string]

Options:
  --version  Show version number                                 [boolean]
  --help     Show help                                           [boolean]
  --dry      dry run (no changes are made to files)
                                                [boolean] [default: false]
  --print    print transformed files to stdout, useful for development
                                                [boolean] [default: false]

Examples:
  npx @material-ui/codemod@next v4.0.0/theme-spacing-api src
  npx @material-ui/codemod@next v5.0.0/component-rename-prop src --
  --component=Grid --from=prop --to=newProp
```

## Included scripts

### v5.0.0

#### 🚀 `important-migration`

A combination of all important transformers for migrating v4 to v5.

```sh
npx @material-ui/codemod@next v5.0.0/important-migration <path|folder>
```

The list includes

- [`adapter-v4`](#adapter-v4)
- [`autocomplete-rename-closeicon`](#autocomplete-rename-closeicon)
- [`autocomplete-rename-option`](#autocomplete-rename-option)
- [`avatar-circle-circular`](#avatar-circle-circular)
- [`box-borderradius-values`](#box-borderradius-values)
- [`badge-overlap-value`](#badge-overlap-value)
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
- [`root-ref`](#root-ref)
- [`skeleton-variant`](#skeleton-variant)
- [`styled-engine-provider`](#styled-engine-provider)
- [`table-props`](#table-props)
- [`tabs-scroll-buttons`](#tabs-scroll-buttons)
- [`textarea-minmax-rows`](#textarea-minmax-rows)
- [`theme-augment`](#theme-augment)
- [`theme-breakpoints-width`](#theme-breakpoints-width)
- [`theme-breakpoints`](#theme-breakpoints)
- [`theme-options`](#theme-options)
- [`theme-palette-mode`](#theme-palette-mode)
- [`theme-provider`](#theme-provider)
- [`theme-spacing`](#theme-spacing)
- [`theme-typography-round`](#theme-typography-round)
- [`transitions`](#transitions)
- [`use-autocomplete`](#use-autocomplete)
- [`use-transitionprops`](#use-transitionprops)
- [`variant-prop`](#variant-prop)
- [`with-mobile-dialog`](#with-mobile-dialog)
- [`with-width`](#with-width)



#### `adapter-v4`

import and insert `adaptV4Theme` to `createTheme` (or `createMuiTheme`)

```diff
+import { adaptV4Theme } from '@material-ui/core/styles';

-createTheme({ palette: { ... }})
+createTheme(adaptV4Theme({ palette: { ... }}))
```

```sh
npx @material-ui/codemod@next v5.0.0/adapter-v4 <path>
```

#### `autocomplete-rename-closeicon`

Renames `fade` style utility import and calls from `fade` to `alpha`.

```diff
-<Autocomplete closeIcon={defaultClearIcon} />
+<Autocomplete clearIcon={defaultClearIcon} />
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/autocomplete-rename-closeicon  <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#autocomplete).

#### `avatar-circle-circular`

Updates the Avatar `variant` value and classes key from 'circle' to 'circular'.

```diff
-<Avatar variant="circle" />
-<Avatar classes={{ circle: 'className' }} />
+<Avatar variant="circular" />
+<Avatar classes={{ circular: 'className' }} />
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/avatar-circle-circular <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#avatar).


#### `badge-overlap-value`

Renames the badge's props.

```diff
-<Badge overlap="circle">
-<Badge overlap="rectangle">
+<Badge overlap="circular">
+<Badge overlap="rectangular">
<Badge classes={{
- anchorOriginTopRightRectangle: 'className',
- anchorOriginBottomRightRectangle: 'className',
- anchorOriginTopLeftRectangle: 'className',
- anchorOriginBottomLeftRectangle: 'className',
- anchorOriginTopRightCircle: 'className',
- anchorOriginBottomRightCircle: 'className',
- anchorOriginTopLeftCircle: 'className',
+ anchorOriginTopRightRectangular: 'className',
+ anchorOriginBottomRightRectangular: 'className',
+ anchorOriginTopLeftRectangular: 'className',
+ anchorOriginBottomLeftRectangular: 'className',
+ anchorOriginTopRightCircular: 'className',
+ anchorOriginBottomRightCircular: 'className',
+ anchorOriginTopLeftCircular: 'className',
}}>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/badge-overlap-value <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#badge).

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
npx @material-ui/codemod@next v5.0.0/box-borderradius-values <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#box).


#### `box-rename-css`

Renames the Box `css` prop to `sx`

```diff
-<Box css={{ m: 2 }}>
+<Box sx={{ m: 2 }}>
```

```sh
npx @material-ui/codemod@next v5.0.0/box-rename-css <path>
```

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
npx @material-ui/codemod@next v5.0.0/box-rename-gap <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#box).


#### `button-color-prop`

Removes the outdated `color` prop values.

```diff
-<Button color="default">
+<Button>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/button-color-prop <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#button).



#### `chip-variant-prop`

Removes the Chip `variant` prop if the value is `"default"`.

```diff
-<Chip variant="default">
+<Chip>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/chip-variant-prop <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#chip).

#### `circularprogress-variant`

Rename the CircularPress `static` variant to `determinate`.

```diff
-<CircularProgress variant="static" classes={{ static: 'className' }} />
+<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/circularprogress-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#circularprogress).

#### `collapse-rename-collapsedheight`

Rename the CircularPress `static` variant to `determinate`.

```diff
-<Collapse collapsedHeight={40} />
-<Collapse classes={{ container: 'collapse' }} />
+<Collapse collapsedSize={40} />
+<Collapse classes={{ root: 'collapse' }} />
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/collapse-rename-collapsedheight <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#collapse).

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
npx @material-ui/codemod@next v5.0.0/component-rename-prop <path> -- --component=Grid --from=prop --to=newProp
```

#### `core-styles-import`

Rename private from from `core/styles/*` to `core/styles`

```diff
-import { darken, lighten } from '@material-ui/core/styles/colorManipulator';
+import { darken, lighten } from '@material-ui/core/styles';
```

```sh
npx @material-ui/codemod@next v5.0.0/core-styles-import <path>
```

#### `create-theme`

Rename the function `createMuiTheme` to `createTheme`

```sh
npx @material-ui/codemod@next v5.0.0/create-theme <path>
```

#### `dialog-props`

Remove `disableBackdropClick` prop from `<Dialog>`

```sh
npx @material-ui/codemod@next v5.0.0/dialog-props <path>
```

#### `dialog-title-props`

Remove `disableTypography` prop from `<DialogTitle>`

```sh
npx @material-ui/codemod@next v5.0.0/dialog-title-props <path>
```


#### `emotion-prepend-cache`

add `prepend: true` to emotion `createCache`

```diff
const cache = emotionCreateCache({
  key: 'css',
+ prepend: true,
});
```

```sh
npx @material-ui/codemod@next v5.0.0/create-theme <path>
```

#### `expansion-panel-component`

Rename `ExpansionPanel*` to `Accordion*`

```sh
npx @material-ui/codemod@next v5.0.0/expansion-panel-component <path>
```

#### `fab-variant`

```diff
-<Fab variant="round" />
+<Fab variant="circular" />
```

```sh
npx @material-ui/codemod@next v5.0.0/fab-variant <path>
```

#### `fade-rename-alpha`

Renames `fade` style utility import and calls frpm `fade` to `alpha`.

```diff
-import { fade, lighten } from '@material-ui/core/styles';
+import { alpha, lighten } from '@material-ui/core/styles';

-const foo = fade('#aaa');
+const foo = alpha('#aaa');
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/fade-rename-alpha <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#styles).

#### `grid-justify-justifycontent`

Renames `fade` style utility import and calls frpm `fade` to `alpha`.

```diff
-<Grid justify="left">Item</Grid>
+<Grid item justifyContent="left">Item</Grid>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/grid-justify-justifycontent <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#grid).

#### `grid-list-component`

Rename `GridList*` to `ImageList*`

```sh
npx @material-ui/codemod@next v5.0.0/grid-list-component <path>
```

#### `icon-button-size`

Add `size="large"` if `size` is empty to get the same UI as v4

```diff
-<IconButton size="medium" />
-<IconButton />
+<IconButton size="medium" />
+<IconButton size="large" />
```

```sh
npx @material-ui/codemod@next v5.0.0/icon-button-size <path>
```

#### `material-ui-styles`

Move JSS imports to `@material-ui/styles`

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
npx @material-ui/codemod@next v5.0.0/material-ui-styles <path>
```

#### `material-ui-types`

Renames `Omit` import from `@material-ui/types` to `DistributiveOmit`

```sh
npx @material-ui/codemod@next v5.0.0/material-ui-types <path>
```

#### `modal-props`

Removes `disableBackdropClick` from `<Modal>`

```sh
npx @material-ui/codemod@next v5.0.0/modal-props <path>
```

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
npx @material-ui/codemod@next v5.0.0/moved-lab-modules <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#skeleton).

#### `pagination-round-circular`

```diff
-<Pagination shape="round" />
-<PaginationItem shape="round" />
+<Pagination shape="circular" />
+<PaginationItem shape="circular" />
```

```sh
npx @material-ui/codemod@next v5.0.0/pagination-round-circular <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#pagination).

#### `root-ref`

Removes `RootRef` from the codebase

```sh
npx @material-ui/codemod@next v5.0.0/root-ref <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#rootref).

#### `skeleton-variant`

```diff
-<Skeleton vairiant="circle" />
-<Skeleton vairiant="rect" />
+<Skeleton vairiant="circular" />
+<Skeleton vairiant="rectangular" />
```

```sh
npx @material-ui/codemod@next v5.0.0/skeleton-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#skeleton).

#### `styled-engine-provider`

Applies `StyledEngineProvider` to the files that contains `ThemeProvider`

```sh
npx @material-ui/codemod@next v5.0.0/styled-engine-provider <path>
```

#### `table-props`

Renames props in `Table*` components

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
npx @material-ui/codemod@next v5.0.0/table-props <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#table).

#### `tabs-scroll-buttons`

```diff
-<Tabs scrollButtons="on" />
-<Tabs scrollButtons="desktop" />
-<Tabs scrollButtons="off" />
+<Tabs scrollButtons allowScrollButtonsMobile />
+<Tabs scrollButtons />
+<Tabs scrollButtons={false} />
```

```sh
npx @material-ui/codemod@next v5.0.0/tabs-scroll-buttons <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#tabs).

#### `textarea-minmax-rows`

```diff
-<TextField rowsMin={3} rowsMax={6} />
-<TextareaAutosize rows={2} />
-<TextareaAutosize rowsMin={3} rowsMax={6} />
+<TextField minRows={3} maxRows={6} />
+<TextareaAutosize minRows={2} />
+<TextareaAutosize minRows={3} maxRows={6} />
```

```sh
npx @material-ui/codemod@next v5.0.0/textarea-minmax-rows <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#textareaautoresize).

#### `theme-augment`

Add `DefaultTheme` module augment for typescript project

```sh
npx @material-ui/codemod@next v5.0.0/theme-augment <path>
```

#### `theme-breakpoints-width`

Rename `theme.breakpoints.width('md')` to `theme.breakpoints.values.md`

```sh
npx @material-ui/codemod@next v5.0.0/theme-breakpoints-width <path>
```

#### `theme-breakpoints`

Updates breakpoint values to match new logic. ⚠️ should run only one time.

```diff
-theme.breakpoints.down('sm')
-theme.breakpoints.between('sm', 'md')
+theme.breakpoints.down('md')
+theme.breakpoints.between('sm', 'lg')
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/theme-breakpoints <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#theme).

#### `theme-options`

```diff
-import { ThemeOptions } from '@material-ui/core';
+import { DeprecatedThemeOptions } from '@material-ui/core';
```

```sh
npx @material-ui/codemod@next v5.0.0/theme-options <path>
```

#### `theme-palette-mode`

Rename `type` to `mode`

```diff
-theme.palette.type === 'dark'
+theme.palette.mode === 'dark'
```

```sh
npx @material-ui/codemod@next v5.0.0/theme-palette-mode <path>
```

#### `theme-provider`

Rename `MuiThemeProvider` to `ThemeProvider`

```sh
npx @material-ui/codemod@next v5.0.0/theme-provider <path>
```

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
npx @material-ui/codemod@next v5.0.0/theme-spacing <path>
```

Note that if there are calculations using `theme.spacing()`, these will need to be resolved manually. Consider using CSS calc:

```diff
-width: `${theme.spacing(2) - 1}px`,
+widith: `calc(${theme.spacing(2)} - 1px)`,
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#theme).

#### `theme-typography-round`

Remove `theme.typography.round($number)` to `Math.round($number * 1e5) / 1e5`

```sh
npx @material-ui/codemod@next v5.0.0/theme-typography-round <path>
```

#### `transitions`

Renames import `transitions` to `createTransitions`

```sh
npx @material-ui/codemod@next v5.0.0/transitions <path>
```

#### `use-autocomplete`

Renames `useAutocomplete` related import from lab to core

```sh
npx @material-ui/codemod@next v5.0.0/use-autocomplete <path>
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
npx @material-ui/codemod@next v5.0.0/use-transitionprops <path>
```

You can find more details about this breaking change in [the migration guide](/guides/migration-v4/#dialog).

#### `variant-prop`

Add the TextField, Select, and FormControl `variant="standard"` prop when `variant` is undefined.
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
npx @material-ui/codemod@next v5.0.0/variant-prop <path>
```

#### `with-mobile-dialog`

Remove and insert hardcoded `withMobileDialog` to prevent application crash.

```diff
- import withMobileDialog from '@material-ui/core/withMobileDialog';
+ // FIXME checkout https://material-ui.com/components/use-media-query/#using-material-uis-breakpoint-helpers
+ const withMobileDialog = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="lg" fullScreen={false} />;
```

```sh
npx @material-ui/codemod@next v5.0.0/with-mobile-dialog <path>
```

#### `with-width`

Remove and insert hardcoded `withWidth` to prevent application crash.

```diff
- import withWidth from '@material-ui/core/withWidth';
+ // FIXME checkout https://material-ui.com/components/use-media-query/#migrating-from-withwidth
+ const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;
```

```sh
npx @material-ui/codemod@next v5.0.0/with-width <path>
```

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
npx @material-ui/codemod@next v4.0.0/theme-spacing-api <path>
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
npx @material-ui/codemod@next v4.0.0/optimal-imports <path>
```

Head to https://material-ui.com/guides/minimizing-bundle-size/ to understand when it's useful.

#### `top-level-imports`

Converts all `@material-ui/core` submodule imports to the root module:

```diff
-import List from '@material-ui/core/List';
-import { withStyles } from '@material-ui/core/styles';
+import { List, withStyles } from '@material-ui/core';
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v4.0.0/top-level-imports <path>
```

Head to https://material-ui.com/guides/minimizing-bundle-size/ to understand when it's useful.

### v1.0.0

#### `import-path`

Updates the `import-paths` for the new location of the components.
Material-UI v1.0.0 flatten the import paths.
The diff should look like this:

```diff
-import { MenuItem } from '@material-ui/core/Menu';
+import MenuItem from '@material-ui/core/MenuItem';
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v1.0.0/import-path <path>
```

**Notice**: if you are migrating from pre-v1.0, and your imports use `material-ui`, you will need to manually find and replace all references to `material-ui` in your code to `@material-ui/core`. E.g.:

```diff
-import Typography from 'material-ui/Typography';
+import Typography from '@material-ui/core/Typography';
```

Subsequently, you can run the above `find ...` command to flatten your imports.

#### `color-imports`

Updates the `color-imports` for the new location of Material-UI color palettes.
The diff should look like this:

```diff
-import { blue, teal500 } from 'material-ui/styles/colors';
+import blue from '@material-ui/core/colors/blue';
+import teal from '@material-ui/core/colors/teal';
+const teal500 = teal['500'];
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v1.0.0/color-imports <path>
```

**additional options**

<!-- #default-branch-switch -->

```
npx @material-ui/codemod@next v1.0.0/color-imports <path> -- --importPath='mui/styles/colors' --targetPath='mui/colors'
```

#### `svg-icon-imports`

Updates the `svg-icons` import paths from `material-ui/svg-icons/<category>/<icon-name>` to `@material-ui/icons/<IconName>`, to use the new [`@material-ui/icons`](https://github.com/mui-org/material-ui/tree/next/packages/material-ui-icons) package.
The diff should look like this:

```diff
-import AccessAlarmIcon from 'material-ui/svg-icons/device/AccessAlarm';
-import ThreeDRotation from 'material-ui/svg-icons/action/ThreeDRotation';
+import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
+import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v1.0.0/svg-icon-imports <path>
```

### v0.15.0

#### `import-path`

Updates the `import-paths` for the new location of the components.
Material-UI v0.15.0 is reorganizing the folder distribution of the project.
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
npx @material-ui/codemod@next v0.15.0/import-path <path>
```
