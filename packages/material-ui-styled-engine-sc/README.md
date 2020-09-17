# @material-ui/styled-engine-sc

This package is a simple wrapper around the `styled-components` package. It is created to be used as alias for the `@material-ui/styled-engine` package, for the developers who would like to use `styled-components` as a styled engine instead of `@emotion/styled`.

## Installation

The installation of the dependency in your package is slightly different from the usual.
You need to alias the default `emotion` implementation to the `styled-components` one.
It works with npm and yarn.

```json
  "dependencies": {
    "@material-ui/styled-engine": "npm:@material-ui/styled-engine-sc@^5.0.0-alpha.1"
  },
```
