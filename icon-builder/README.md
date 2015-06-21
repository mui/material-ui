#Material-UI-Icons

This tool crawls the [material-design-icons](https://github.com/google/material-design-icons) repo
and generates react svg icon components for each icon.

## Running the build
```
npm install
npm run build
```

## Generated folders
The build script walks through all of the svg icons in the material-design-icons folder and generates the appropriate
`.jsx` files in the `./jsx` folder. It'll also compile the `.jsx` files and create the cooresponding `.js` equivalent
in the `./js` folder.