# @mui/icons-material

This package provides the Google [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) converted to [`SvgIcon`](https://mui.com/material-ui/api/svg-icon/) components.

## Installation

Install the package in your project directory with:

<!-- #default-branch-switch -->

```sh
// with npm
npm install @mui/icons-material

// with yarn
yarn add @mui/icons-material
```

<!-- #default-branch-switch -->

These components use the Material UI's [SvgIcon](https://mui.com/material-ui/api/svg-icon) component to render the SVG path for each icon.

If you are not already using Material UI in your project, you can add it with:

```sh
// with npm
npm install @mui/material

// with yarn
yarn add @mui/material
```

## Documentation

<!-- #default-branch-switch -->

- [The documentation](https://mui.com/material-ui/icons/#svgicon)
- [The icons search](https://mui.com/material-ui/material-icons/)

## Contributing

This icon set is meant to be in sync with Google's Material Icons.
Therefore, we don't accept fixes, additions, or any other contributions that would make this package diverge from the source.

To synchronize with Material Icons, do the following:

1. Inside this workspace run `yarn src:download`
2. Inside this workspace run `yarn src:icons`
3. Inside the root run `yarn docs:mdicons:synonyms`
4. If the number of icons changed significantly, edit the icons/icons.md and material-icons/material-icons.md under docs/data/material/components and update the numbers.
