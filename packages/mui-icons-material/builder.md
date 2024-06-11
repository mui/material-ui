# @mui/icons-material-builder

This tool generates Material UI SvgIcon components for a set of svg icons.

## Running the build

The build script downloads and builds the Material Design Icons.

```bash
pnpm install
pnpm build
cd build
pnpm publish
```

## Generated folders

The build script downloads Material Design SVG icons to the `material-icons` folder,
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
- `--rename-filter` - Apply a custom filter to rename the generated icons.
  The default and Material Design filters can be found in `filters/rename`.

If you experience any issues building icons or would like a feature added,
[file an issue](https://github.com/mui/material-ui/issues) and let us
know.
