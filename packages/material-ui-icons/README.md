# @material-ui/icons

This package provides the Google [Material icons](https://material.io/tools/icons/) packaged as a set of [React](https://facebook.github.io/react/) components.

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

You can use [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) to find a specific icon.
When importing an icon, keep in mind that the names of the icons are `PascalCase`, for instance:

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) is exposed as `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) is exposed as `@material-ui/icons/DeleteForever`

For *"themed"* icons, append the theme name to the icon name. For instance with the
- The Outlined [`delete`](https://material.io/tools/icons/?icon=delete&style=outline) icon is exposed as `@material-ui/icons/DeleteOutlined`
- The Rounded [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded) icon is exposed as `@material-ui/icons/DeleteRounded`
- The Two Tone [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) icon is exposed as `@material-ui/icons/DeleteTwoTone`
- The Sharp [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) icon is exposed as `@material-ui/icons/DeleteSharp`

There are three exceptions to this rule:
- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline) is exposed as `@material-ui/icons/ThreeDRotation`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) is exposed as `@material-ui/icons/FourK`
- [`360`](https://material.io/tools/icons/?icon=360&style=baseline) is exposed as `@material-ui/icons/ThreeSixty`

## Imports

- If your environment doesn't support tree-shaking, the **recommended** way to import the icons is the following:
```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- If your environment support tree-shaking you can also import the icons this way:
```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

Note: Importing named exports in this way will result in the code for *every icon* being included in your project, so is not recommended unless you configure [tree-shaking](https://webpack.js.org/guides/tree-shaking/). It may also impact Hot Module Reload performance.

## Upgrading

If you are upgrading an existing project from Material-UI 0.x.x, you will need to revise the import paths
from `material-ui/svg-icons/<category>/<icon-name>` to `@material-ui/icons/<IconName>`.

We have built a `jscodeshift` [codemod](https://github.com/facebook/codemod) to help you [upgrade](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod#svg-icon-imports)

## Documentation

[The documentation](https://material-ui.com/components/icons/)
