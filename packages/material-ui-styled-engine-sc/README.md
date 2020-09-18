# @material-ui/styled-engine-sc

This package is a wrapper around the `styled-components` package. It is created to be used as alias for the `@material-ui/styled-engine` package, for the developers who would like to use `styled-components` as a styled engine instead of `@emotion/styled`.

## Installation

The installation of the dependency in your package is slightly different from the usual.
You need to alias the default `emotion` implementation to the `styled-components` one.
Depending on the bundler you are using, you made add it like this:

### webpack

```js
module.exports = {
  //...
  resolve: {
    alias: {
      '@material-ui/styled-engine': '@material-ui/styled-engine-sc',
    },
  },
};
```
