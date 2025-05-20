# @mui/icons-material-builder

This tool generates Material UI SvgIcon components for a set of svg icons.

## Running the build

The build script downloads and builds the Material Design Symbols.

```bash
pnpm install
pnpm build
cd build
pnpm publish
```

## Generated folders

The build script downloads Material Design SVG icons to the `material-symbols` folder,
generates the appropriate `.js` files in the `build` folder, and creates a `package.json`.

## Advanced usage and Custom builds

`node build.js --help` can be used to display the options available for building.

You can build your own SVG icons as well as collections like [game-icons](https://game-icons.net/)
through command line options.

- `--output-dir` - Directory to output generated components.
- `--svg-dir` - Directory containing the source SVG icons.
- `--inner-path` - "Reach into" subdirs, since libraries like material-design-icons
  use arbitrary build directories to organize icons, for example "action/svg/production/".
- `--file-suffix` - Process only files ending with the specified suffix/
- `--variant-collector` - Merge variants into a single file that will be outputted. For example, with Material Symbols, we merge `optical_size`, `grade`, and `filled` variants into a single file.

If you experience any issues building icons or would like a feature added,
[file an issue](https://github.com/mui/material-ui/issues) and let us
know.
