# @material-ui/icons

This package provides the Google [Material icons](https://material.io/icons/) packaged as a set of [React](https://facebook.github.io/react/) components.

## Installation

Install the package in your project directory with:

```sh
npm install @material-ui/icons
```

These components use the Material-UI [SvgIcon](https://material-ui.com/api/svg-icon/) component to
render the SVG path for each icon, and so a have a peer-dependency on the `next` release of Material-UI.

If you are not already using Material-UI in your project, you can add it with:

```sh
// with npm
npm install @material-ui/core

// with yarn
yarn add @material-ui/core
```

## Usage

The import path for each Material icon component includes the icon name in PascalCase.

For example to use the 'access alarm' icon component, import `@material-ui/icons/AccessAlarm`.

Note: One exception is '3d rotation', which is named `ThreeDRotation`.

### Examples

- If your environment doesn't support tree-shaking, the **recommended** way to import the icons is the following:
```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- If your environment support tree-shaking you can also import the icons that way:
```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

Note: Importing named exports in this way will result in the code for *every icon* being included in your project, so is not recommended unless you configure [tree-shaking](https://webpack.js.org/guides/tree-shaking/).

## Upgrading

If you are upgrading an existing project from Material-UI 0.x.x, you will need to revise the import paths
from `material-ui/svg-icons/<category>/<icon-name>` to `@material-ui/icons/<IconName>`.

[Here](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod#svg-icon-imports)'s a `jscodeshift` [codemod](https://github.com/facebook/codemod) to help you upgrade.
