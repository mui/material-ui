# @material-ui/codemod

> Codemod scripts for Material-UI

[![npm version](https://img.shields.io/npm/v/@material-ui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@material-ui/codemod)
[![npm downloads](https://img.shields.io/npm/dm/@material-ui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@material-ui/codemod)

This repository contains a collection of codemod scripts based for use with
[jscodeshift](https://github.com/facebook/jscodeshift) that help update Material-UI APIs.

## Setup & run

- Make the codemod locally available `npm install -D @material-ui/codemod@next` <!-- #default-branch-switch -->
- Make jscodeshift globally available `npm install -g jscodeshift`
- Run the codemod: `jscodeshift --extensions js,ts,jsx,tsx --parser tsx <path-to-codemod-script> <path>`
  - Applies the transform script specified in `<path-to-codemod-script>` recursively to the sources in `<path>`.
  - Use the `-d` option for a dry-run and use `-p` to print the output for comparison.

## Included scripts

### v5.0.0

#### `component-rename-prop`

A generic codemod to rename any component prop.

```diff
-<Component prop="value" />
-<Component prop />
+<Component newProp="value" />
+<Component newProp />
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/component-rename-prop.js --component=Grid --from=prop --to=newProp <path>
```

#### `autocomplete-rename-closeicon`

Renames `fade` style utility import and calls from `fade` to `alpha`.

```diff
-<Autocomplete closeIcon={defaultClearIcon} />
+<Autocomplete clearIcon={defaultClearIcon} />
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/autocomplete-rename-closeicon.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#autocomplete).

#### `avatar-circle-circular`

Updates the Avatar `variant` value and classes key from 'circle' to 'circular'.

```diff
-<Avatar variant="circle" />
-<Avatar classes={{ circle: 'className' }} />
+<Avatar variant="circular" />
+<Avatar classes={{ circular: 'className' }} />
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/avatar-circle-circular.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#avatar).

#### `button-color-prop`

Removes the outdated `color` prop values.

```diff
-<Button color="primary">
-<Button color="default">
+<Button>
+<Button>
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/button-color-prop.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#button).

#### `box-borderradius-values`

Updates the Box API from separate system props to `sx`.

```diff
-<Box borderRadius="borderRadius">
-<Box borderRadius={16}>
+<Box borderRadius={1}>
+<Box borderRadius="16px">
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/box-borderradius-values.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#box).

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

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/box-rename-gap.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#box).

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

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/badge-overlap-value.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#badge).

#### `chip-variant-prop`

Removes the Chip `variant` prop if the value is `"default"`.

```diff
-<Chip variant="default">
+<Chip>
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/chip-variant-prop.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#chip).

#### `circularprogress-variant`

Rename the CircularPress `static` variant to `determinate`.

```diff
-<CircularProgress variant="static" classes={{ static: 'className' }} />
+<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/circularprogress-variant.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#circularprogress).

#### `collapse-rename-collapsedheight`

Rename the CircularPress `static` variant to `determinate`.

```diff
-<Collapse collapsedHeight={40} />
-<Collapse classes={{ container: 'collapse' }} />
+<Collapse collapsedSize={40} />
+<Collapse classes={{ root: 'collapse' }} />
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/collapse-rename-collapsedheight.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#collapse).

#### `fade-rename-alpha`

Renames `fade` style utility import and calls frpm `fade` to `alpha`.

```diff
-import { fade, lighten } from '@material-ui/core/styles';
+import { alpha, lighten } from '@material-ui/core/styles';

-const foo = fade('#aaa');
+const foo = alpha('#aaa');
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/fade-rename-alpha.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#styles).

#### `grid-justify-justifycontent`

Renames `fade` style utility import and calls frpm `fade` to `alpha`.

```diff
-<Grid justify="left">Item</Grid>
+<Grid item justifyContent="left">Item</Grid>
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/grid-justify-justifycontent.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#grid).

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

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/moved-lab-modules.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#skeleton).

#### `variant-prop`

Add the TextField, Select, and FormControl `variant="standard"` prop when `variant` is undefined.
The diff should look like this:

```diff
-<TextField value="Standard" />
-<TextField value="Outlined" variant="outlined" />
+<TextField value="Standard" variant="standard" />
+<TextField value="Outlined" />
```

```diff
-<Select value="Standard" />
-<Select value="Outlined" variant="outlined" />
+<Select value="Standard" variant="standard" />
+<Select value="Outlined" />
```

```diff
-<FormControl value="Standard" />
-<FormControl value="Outlined" variant="outlined" />
+<FormControl value="Standard" variant="standard" />
+<FormControl value="Outlined" />
```

This codemod is **non-idempotent** (`variant="standard"` would be added on a subsequent run, where `variant="outlined"` was removed), so it should only be run once against any particular codebase.

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/variant-prop.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#textfield).

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

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/use-transitionprops.js <path>
```

You can find more details of the breaking changes in [the migration guide](/guides/migration-v4/#dialog).

#### `theme-breakpoints`

Updates breakpoint values to match new logic.

```diff
-theme.breakpoints.down('sm')
-theme.breakpoints.between('sm', 'md')
+theme.breakpoints.down('md')
+theme.breakpoints.between('sm', 'lg')
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/theme-breakpoints.js <path>
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#theme).

#### `theme-spacing`

Removes the 'px' suffix from some template strings.

```diff
-`${theme.spacing(2)}px`
-`${theme.spacing(2)}px ${theme.spacing(4)}px`
+`${theme.spacing(2)}`
+`${theme.spacing(2)} ${theme.spacing(4)}`
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v5.0.0/theme-spacing.js <path>
```

Note that if there are calculations using `theme.spacing()`, these will need to be resolved manually. Consider using CSS calc:

```diff
-width: `${theme.spacing(2) - 1}px`,
+widith: `calc(${theme.spacing(2)} - 1px)`,
```

You can find more details of the breaking changes in [the migration guide](https://next.material-ui.com/guides/migration-v4/#theme).

### v4.0.0

#### `theme-spacing-api`

Updates the `theme-spacing-api` from `theme.spacing.unit x` to `theme.spacing(x)`.
The diff should look like this:

```diff
-const spacing = theme.spacing.unit;
+const spacing = theme.spacing(1);
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v4.0.0/theme-spacing-api.js <path>
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

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v4.0.0/optimal-imports.js <path>
```

Head to https://material-ui.com/guides/minimizing-bundle-size/ to understand when it's useful.

#### `top-level-imports`

Converts all `@material-ui/core` submodule imports to the root module:

```diff
-import List from '@material-ui/core/List';
-import { withStyles } from '@material-ui/core/styles';
+import { List, withStyles } from '@material-ui/core';
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v4.0.0/top-level-imports.js <path>
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

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v1.0.0/import-path.js <path>
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

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v1.0.0/color-imports.js <path>
```

**additional options**

```
jscodeshift -t <color-imports.js> <path> --importPath='mui/styles/colors' --targetPath='mui/colors'
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

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v1.0.0/svg-icon-imports.js <path>
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
-import RaisedButton from 'material-ui/node/raised-button';
+import RaisedButton from 'material-ui/RaisedButton';
```

```sh
jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/node/v0.15.0/import-path.js <path>
```

### Recast Options

Options to [recast](https://github.com/benjamn/recast)'s printer can be provided
through the `printOptions` command line argument:

```sh
jscodeshift -t transform.js <path> --printOptions='{"quote": "double", "trailingComma": false}'
```
