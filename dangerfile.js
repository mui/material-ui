// danger uses babelify under the hood. The implementation is buggy and fails on our
// custom plugins in our codebase. We'll just disable it and do our own compilation.
// Danger must always be run with envirnonent variable `DANGER_DISABLE_TRANSPILATION="true"`.
require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
});
require('./dangerFileContent');
