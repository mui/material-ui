# material-ui-codemod

> Codemod scripts for Material-UI

[![npm version](https://img.shields.io/npm/v/material-ui-codemod.svg?style=flat-square)](https://www.npmjs.com/package/material-ui-codemod)
[![npm downloads](https://img.shields.io/npm/dm/material-ui-codemod.svg?style=flat-square)](https://www.npmjs.com/package/material-ui-codemod)

This repository contains a collection of codemod scripts based for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) that help update Material-UI
APIs.

## Setup & Run

- `npm install -g jscodeshift`
- `npm install material-ui-codemod`
- `jscodeshift -t <codemod-script> <path>`
- Use the `-d` option for a dry-run and use `-p` to print the output
  for comparison

## Included Scripts

### v1.0.0

#### `color-imports`

Updates the `color-imports` for the new location of Material-UI color palettes.
The diff should look like this:

```diff
-import { blue, teal500 } from 'material-ui/src/styles/colors';
+import blue from 'material-ui/src/colors/blue';
+import teal from 'material-ui/src/colors/teal';
+const teal500 = teal['500'];
```

```sh
find src -name '*.js' -print | xargs jscodeshift -t node_modules/material-ui-codemod/lib/v1.0.0/color-imports.js
```

**additional options**
```
jscodeshift -t <color-imports.js> <path> --importPath='mui/styles/colors' --targetPath='mui/colors'
```

#### `svg-icon-imports`

Updates the `svg-icons` import paths from `material-ui/svg-icons/<category>/<icon-name>` to `@material-ui/icons/<IconName>`, to use the new [`@material-ui/icons`](https://github.com/mui-org/material-ui/tree/v1-beta/packages/@material-ui/icons) package.
The diff should look like this:

```diff
-import AccessAlarmIcon from 'material-ui/svg-icons/device/AccessAlarm';
-import ThreeDRotation from 'material-ui/svg-icons/action/ThreeDRotation';
+import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
+import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

```sh
find src -name '*.js' -print | xargs jscodeshift -t node_modules/material-ui-codemod/lib/v1.0.0/svg-icon-imports.js
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
find src -name '*.js' -print | xargs jscodeshift -t node_modules/material-ui-codemod/lib/v0.15.0/import-path.js
```

### Recast Options

Options to [recast](https://github.com/benjamn/recast)'s printer can be provided
through the `printOptions` command line argument

```sh
jscodeshift -t transform.js <path> --printOptions='{"quote":"double"}'
```
