// danger uses babelify under the hood. The implementation is buggy and fails on our
// custom plugins in our codebase. We just disable it and do our own compilation
require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
});

const run = require('./dangerFileContent');

run.default().catch((error) => {
  console.error(error);
  process.exit(1);
});
