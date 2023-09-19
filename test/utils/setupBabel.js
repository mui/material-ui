require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
  // We have to apply `babel-plugin-module-resolve` to the files in `@mui/x-tree-view`.
  // Otherwise we can't import `@mui/material` from `@mui/x-tree-view` in `yarn test:unit`.
  // TODO: Remove once the lab do not export the tree view
  ignore: [/node_modules(\/|\\)(?!.*(@mui(\/|\\)x-tree-view(\/|\\)([a-zA-Z/\\])+)\.js)/],
});
