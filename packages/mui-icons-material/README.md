# @mui/icons-material

This package contains Google's [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) converted to Material UI [SVG Icon](https://mui.com/material-ui/icons/#svgicon) components.

> Google also offers [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) as an alternative to Material Icons. `@mui/icons-material` only covers Icons, and there are no plans to support Symbols at this time.

## Installation

The Material Icons package depends on Material UI—install both with the following command:

<!-- #default-branch-switch -->

```bash
npm install @mui/icons-material@next @mui/material@next @emotion/styled @emotion/react
```

<!-- #default-branch-switch -->

## Documentation

<!-- #default-branch-switch -->

- Learn more about Material UI's [SVG Icon component](https://mui.com/material-ui/icons/#svgicon).
- Browse the available icons on the [Material Icons page](https://mui.com/material-ui/material-icons/).

## Contributing

The Icons package is updated via a script that reads through Google's Material Icons set and extracts the SVG elements from there. Because of this, we don't accept new icons that diverge from the source.

To update the `@mui/icons-material` package with the latest Material Icons set, run the following commands:

1. In the "mui-icons-material" directory, run `pnpm src:download`
2. In the "mui-icons-material" directory, run `pnpm src:icons`
3. In the root of the Material UI repo, run `pnpm docs:mdicons:synonyms`
4. If the number of icons changes significantly, edit the icons/icons.md and material-icons/material-icons.md under docs/data/material/components and update the numbers.

This process is performed by the maintainers on a quarterly basis.
