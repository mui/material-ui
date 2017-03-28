# material-ui-icons

This package provides the Google [Material icons](https://material.io/icons/) packaged as a set of
[React](https://facebook.github.io/react/) components. These components replace the `svg-icons` included in
 0.x.x releases of [Material-UI](http://material-ui.com).

## Installation

Install the package in your project directory with:

```
npm i -S material-ui-icons
```

These components use the Material-UI [SvgIcon](http://material-ui.com/#/style/icons) component to
render the SVG path for each icon, and so a have a peer-dependency on the `next` release of Material-UI.

If you are not already using Material-UI in your project, you can add it with:

```
npm i -S material-ui@next
```

## Usage

The import path for each Material icon component includes the icon name in PascalCase.

For example to use the 'access alarm' icon component, import `material-ui-icons/AccessAlarm`.

Note: One exception is '3d rotation', which is named `ThreeDRotation`.

## Upgrading

If you are upgrading an existing project from Material-UI 0.x.x, you will need to revise the import paths 
from `material-ui/svg-icons/icon-name` to `material-ui-icons/IconName`.

We may provide a [codemod](https://github.com/facebook/codemod) in a future release.
