// In playwright we sometimes write functions that are executed in the browser environment.
// Since we can't tell babel which parts of the code are executed in which environment we can only disable it entirely.
// We're only stripping types and compiling ES6 to CommonJS modules which should be safe.

require('@babel/register')({
  configFile: false,
  extensions: ['.js', '.ts', '.tsx'],
  presets: [require.resolve('@babel/preset-typescript')],
  plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
});
