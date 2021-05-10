# @material-ui/codemod

> Codemod scripts for Material-UI

[![npm version](https://img.shields.io/npm/v/@material-ui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@material-ui/codemod)
[![npm downloads](https://img.shields.io/npm/dm/@material-ui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@material-ui/codemod)

This repository contains a collection of codemod scripts based for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) that help update Material-UI
APIs.

## Setup & Run

- `npm install -D @material-ui/codemod@next` <!-- #default-branch-switch -->
- `npx jscodeshift -t <url-to-codemod-script> <path>`
  - Applies the transform script specified in `<url-to-codemod-script>` recursively to `<path>`
  - Use the `-d` option for a dry-run and use `-p` to print the output for comparison
  - use the `--extensions tsx --parser tsx` options to convert TypeScript sources

## Included Scripts

### v5.0.0

#### `box-sx-prop`

Updates the Box API from separate system props to `sx`.

The diff should look like this:

```diff
-<Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
+<Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
```

```sh
npx jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/v5.0.0/box-sx-prop.js ./src
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

```sh
npx jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/v5.0.0/moved-lab-modules.js ./src
```

#### `variant-prop`

Add the TextField, Select, and FormControl `variant="standard"` prop when `variant` is undefined.
The diff should look like this:

```diff
-<TextField value="Standard" />
-<TextField value="Outlined" variant="outlined" />
-<Select value="Standard" />
-<Select value="Outlined" variant="outlined" />
-<FormControl value="Standard" />
-<FormControl value="Outlined" variant="outlined" />
+<TextField value="Standard" variant="standard" />
+<TextField value="Outlined" />
+<Select value="Standard" variant="standard" />
+<Select value="Outlined" />
+<FormControl value="Standard" variant="standard" />
+<FormControl value="Outlined" />
```

This codemod is non-idempotent (`variant="standard"` would be added on a subsequent run, where `variant="outlined"` was removed), so should only be run once against any particular codebase.

```sh
npx jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/v5.0.0/variant-prop.js ./src
```

### v4.0.0

#### `theme-spacing-api`

Updates the `theme-spacing-api` from `theme.spacing.unit x` to `theme.spacing(x)`.
The diff should look like this:

```diff
-const spacing = theme.spacing.unit;
+const spacing = theme.spacing(1);
```

```sh
npx jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/v4.0.0/theme-spacing-api.js ./src
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
npx jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/v4.0.0/optimal-imports.js ./src
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
npx jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/v4.0.0/top-level-imports.js ./src
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
npx jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/v1.0.0/import-path.js ./src
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
npx jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/v1.0.0/color-imports.js ./src
```

**additional options**

```
npx jscodeshift -t <color-imports.js> <path> --importPath='mui/styles/colors' --targetPath='mui/colors'
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
npx jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/v1.0.0/svg-icon-imports.js ./src
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

```sh
npx jscodeshift --extensions js,ts,jsx,tsx --parser tsx -t node_modules/@material-ui/codemod/v0.15.0/import-path.js ./src
```

### Recast Options

Options to [recast](https://github.com/benjamn/recast)'s printer can be provided
through the `printOptions` command line argument:

```sh
npx jscodeshift -t transform.js <path> --printOptions='{"quote": "double", "trailingComma": false}'
```
