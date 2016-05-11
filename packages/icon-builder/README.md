# Material-UI-Icons

This tool generates Material-UI SvgIcon components for a set of svg icons.

## Running the build
The npm script builds the [material-design-icons](https://github.com/google/material-design-icons) 
that are included with Material-UI.

```sh
npm install
npm run build
```

## Generated folders
The npm build script walks through all of the svg icons in the material-design-icons package
 and generates the appropriate `.js` files in the `svg-icons` folder.

## Advanced usage and Custom builds

`node build.js --help` can be used to pull up options available for building.

You can build your own SVG icons as well as collections like [game-icons](http://game-icons.net/) 
through environmental variables.

* `--output-dir` - directory to output jsx components
* `--svg-dir` - SVG directory
* `--inner-path` - "Reach into" subdirs, since libraries like material-design-icons
  use arbitrary build directories to organize icons
  e.g. "action/svg/production/icon_3d_rotation_24px.svg"
* `--file-suffix` - Filter only files ending with a suffix

If you experience any issues building icons or would like a feature added,
[file an issue](https://github.com/callemall/material-ui/issues) and let us
know.
