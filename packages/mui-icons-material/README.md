# @mui/icons-material

This package contains Google's [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) converted to the Material UI [`SvgIcon`](https://mui.com/material-ui/icons/#svgicon) component.

> **Note:** Google has introduced an alternative set of icons called [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols), which differs from Material Icons. `@mui/icons-material` only covers the latter, with no plans yet for supporting the former.

## Installation

The icons package depends on Material UI, so ensure you install both to use it.
Use the following command to install it:

<!-- #default-branch-switch -->

```bash
npm install @mui/icons-material@next @mui/material@next @emotion/styled @emotion/react
```

<!-- #default-branch-switch -->

## Documentation

<!-- #default-branch-switch -->

- Learn more about Material UI's [`SvgIcon` component](https://mui.com/material-ui/icons/#svgicon).
- Quickly search through the available icons on the [Material Icons page](https://mui.com/material-ui/material-icons/).

## Contributing

The icons package is updated via a script that reads through the Material Icons set and extracts the SVG elements from there, as opposed to adding each icon individually. That said, we don't accept new icons that diverge from this source.

To update the `@mui/icons-material` package with the Material Icons set, run the following commands:

1. In the "mui-icons-material" directory, run `pnpm src:download`
2. In the "mui-icons-material" directory, run `pnpm src:icons`
3. In the root of the Material UI repo, run `pnpm docs:mdicons:synonyms`
4. If the number of icons changes significantly, edit the icons/icons.md and material-icons/material-icons.md under docs/data/material/components and update the numbers.

We run them roughly quarterly to make sure the package is up-to-date with the source.
