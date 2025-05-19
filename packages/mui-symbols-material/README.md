# @mui/symbols-material

<!-- #host-reference -->

This package contains Google's [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) converted to Material UI [SVG Icon](https://mui.com/material-ui/icons/#svgicon) components.

## Installation

The Material Icons package depends on Material UI—install both with the following command:

<!-- #npm-tag-reference -->

```bash
npm install @mui/symbols-material @mui/material @emotion/styled @emotion/react
```

## Documentation

<!-- #host-reference -->

- Learn more about Material UI's [SVG Icon component](https://mui.com/material-ui/icons/#svgicon).
- Browse the available icons on the [Material Symbols page](https://mui.com/material-ui/material-symbols/).

## Contributing

The Symbols package is updated via a script that reads through Google's Material Symbols set and extracts the SVG elements from there. Because of this, we don't accept new icons that diverge from the source.

To update the `@mui/symbols-material` package with the latest Material Icons set, run the following commands:

1. In the "mui-symbols-material" directory, run `pnpm src:download`
2. In the "mui-symbols-material" directory, run `pnpm src:icons`
3. In the root of the Material UI repo, run `pnpm docs:mdicons:synonyms`
4. If the number of icons changes significantly, edit the icons/icons.md and material-icons/material-icons.md under docs/data/material/components and update the numbers.

This process is performed by the maintainers on a quarterly basis.
