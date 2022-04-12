require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
  // We have to apply `babel-plugin-module-resolve` to the files in `@mui/x-date-pickers`.
  // Otherwise we can't import `@mui/material` from `@mui/x-date-pickers` in `yarn test:unit`.
  // TODO: Remove once the lab do not export the pickers
  ignore: [/node_modules(\/|\\)(?!.*(@mui(\/|\\)x-date-pickers(\/|\\)([a-zA-Z/\\])+)\.js)/],
});
