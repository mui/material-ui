# Material-UI-Icons

This tool crawls the [material-design-icons](https://github.com/google/material-design-icons) repo
and generates react svg icon components for each icon.

## Running the build
```sh
npm install
npm run build
```

## Generated folders
The build script walks through all of the svg icons in the material-design-icons folder and generates the appropriate
`.jsx` files in the `./jsx` folder. It'll also compile the `.jsx` files and create the cooresponding `.js` equivalent
in the `./js` folder.

## Advanced usage and Custom builds

`node build.js --help` can be used to pull up options available for building.

You can build your own SVG icons as well as collections like [game-icons](http://game-icons.net/) through environmental variables.

* `--output-dir` - directory to output jsx components
* `--svg-dir` - SVG directory
* `--inner-path` - "Reach into" subdirs, since libraries like material-design-icons
  use arbitrary build directories to organize icons
  e.g. "action/svg/production/icon_3d_rotation_24px.svg"
* `--file-suffix` - Filter only files ending with a suffix

If you experience any issues building icons or would like a feature added,
[file an issue](https://github.com/callemall/material-ui/issues) and let us
know.
