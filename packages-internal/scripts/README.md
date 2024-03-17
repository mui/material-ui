# @mui/internal-scripts

This is that code infra scripts for the MUI organization repositories.
It is not meant for general use.

## Scripts

- `build` - transpiles TypeScript files into the build directory.
- `release:publish` - builds the project and publishes it in the npm registry.
- `release:publish:dry-run` - builds the project and publishes it in a local registry accessible on port 4873 (this is the default port of Verdaccio private npm server).
- `test` - runs all the tests.
- `typescript` - checks validity of types.
