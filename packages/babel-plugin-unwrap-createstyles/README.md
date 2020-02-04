## Motivation

We write our demos in TS, but want to offer the same demos to JS users.
Maintaining two versions of the demos is hard and therefore we simply transpile
the TS demos with Babel into JS.

However, we have some TS-only utility functions that are essentially identity function
with no side-effects, with the sole purpose being to defeat type widening.
Without it, noise is added to the JS files and bundle size for everyone.

This plugin unwraps them.

## Recognized patterns

```ts
import { createStyles, withStyles } from '@material-ui/core/styles'

const styles = () => createStyles({});

export default withStyles(styles)(Component);
```

would be changed to:

```js
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({});

export default withStyles(styles)(Component);
```

It works also with the `@material-ui/styles` package.

### Missing

- default import from `createStyles`
- aliased imports

## Why not a TypeScript transformer?

We face these issues (in chronological order):
1. no config API (i.e. transformers are only supported for programmatic transpilation/compilation)
2. since we need to pipe Prettier, we might as well use a programmatic approach so back to transformer
3. TypeScript does not send blanklines (Microsoft/TypeScript#843) back to Babel plugins
