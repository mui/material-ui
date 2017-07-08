# material-ui-icons-builder

This tool generates Material-UI SvgIcon components for a set of svg icons.

## Running the build

The npm script builds the [material-design-icons](https://github.com/google/material-design-icons)
that are distributed as a standalone package.

```sh
npm install
npm run build
cd build
npm publish
```

## Generated folders

The npm build script walks through all of the svg icons in the material-design-icons package
 and generates the appropriate `.js` files in the `build` folder, and creates an a `package.json`.

## Advanced usage and Custom builds

`node build.js --help` can be used to pull up options available for building.

You can build your own SVG icons as well as collections like [game-icons](http://game-icons.net/)
through command line options.

* `--output-dir` - Directory to output generated components.
* `--svg-dir` - Directory containing the source SVG icons.
* `--inner-path` - "Reach into" subdirs, since libraries like material-design-icons
  use arbitrary build directories to organize icons, e.g. "action/svg/production/".
* `--file-suffix` - Process only files ending with the specified suffix/
* `--rename-filter`  - Apply a custom filter to rename the generated icons.
  The default and Material Design filters can be found in `filters/rename`.

If you experience any issues building icons or would like a feature added,
[file an issue](https://github.com/callemall/material-ui/issues) and let us
know.
