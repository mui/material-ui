# TypeScript

<p class="description">Vous pouvez ajouter du typage statique à JavaScript pour améliorer la productivité des développeurs et la qualité du code grâce à TypeScript.</p>

Have a look at the [Create React App with TypeScript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript) example. Une version minimale de TypeScript 2.8 est requise.

Our definitions are tested with the following [tsconfig.json](https://github.com/mui-org/material-ui/tree/master/tsconfig.json). Using a less strict `tsconfig.json` or omitting some of the libraries might cause errors.

## Usage of `withStyles`

Using `withStyles` in TypeScript can be a little tricky, but there are some utilities to make the experience as painless as possible.

### Using `createStyles` to defeat type widening

A frequent source of confusion is TypeScript's [type widening](https://mariusschulz.com/blog/typescript-2-1-literal-type-widening), which causes this example not to work as expected:

```ts
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
};

withStyles(styles);
//         ^^^^^^
//         Types of property 'flexDirection' are incompatible.
//           Type 'string' is not assignable to type '"-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "column" | "column-reverse" | "row"...'.
```

The problem is that the type of the `flexDirection` property is inferred as `string`, which is too arbitrary. To fix this, you can pass the styles object directly to `withStyles`:

```ts
withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});
```

However type widening rears its ugly head once more if you try to make the styles depend on the theme:

```ts
withStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.unit,
    backgroundColor: palette.background.default,
    color: palette.primary.main,
  },
}));
```

This is because TypeScript [widens the return types of function expressions](https://github.com/Microsoft/TypeScript/issues/241).

Because of this, we recommend using our `createStyles` helper function to construct your style rules object:

```ts
// Non-dependent styles
const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

// Theme-dependent styles
const styles = ({ palette, spacing }: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.unit,
    backgroundColor: palette.background.default,
    color: palette.primary.main,
  },
});
```

`createStyles` is just the identity function; it doesn't "do anything" at runtime, just helps guide type inference at compile time.

### Media queries

`withStyles` allows a styles object with top level media-queries like so:

```ts
const styles = createStyles({
  root: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    root: {
      display: 'flex',
    },
  },
});
```

However to allow these styles to pass TypeScript, the definitions have to be ambiguous concerning names for CSS classes and actual CSS property names. Due to this class names that are equal to CSS properties should be avoided.

```ts
// error because TypeScript thinks `@media (min-width: 960px)` is a class name
// and `content` is the css property
const ambiguousStyles = createStyles({
  content: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    content: {
      display: 'flex',
    },
  },
});

// works just fine
const ambiguousStyles = createStyles({
  contentClass: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    contentClass: {
      display: 'flex',
    },
  },
});
```

### Augmenting your props using `WithStyles`

Since a component decorated with `withStyles(styles)` gets a special `classes` prop injected, you will want to define its props accordingly:

```ts
const styles = (theme: Theme) => createStyles({
  root: { /* ... */ },
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface Props {
  // non-style props
  foo: number;
  bar: boolean;
  // injected style props
  classes: {
    root: string;
    paper: string;
    button: string;
  };
}
```

However this isn't very [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) because it requires you to maintain the class names (`'root'`, `'paper'`, `'button'`, ...) in two different places. We provide a type operator `WithStyles` to help with this, so that you can just write:

```ts
import { WithStyles, createStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: { /* ... */ },
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface Props extends WithStyles<typeof styles> {
  foo: number;
  bar: boolean;
}
```

### Decorating components

Applying `withStyles(styles)` as a function works as expected:

```tsx
const DecoratedSFC = withStyles(styles)(({ text, type, color, classes }: Props) => (
  <Typography variant={type} color={color} classes={classes}>
    {text}
  </Typography>
));

const DecoratedClass = withStyles(styles)(
  class extends React.Component<Props> {
    render() {
      const { text, type, color, classes } = this.props
      return (
        <Typography variant={type} color={color} classes={classes}>
          {text}
        </Typography>
      );
    }
  }
);
```

Unfortunately due to a [current limitation of TypeScript decorators](https://github.com/Microsoft/TypeScript/issues/4881), `withStyles(styles)` can't be used as a decorator in TypeScript.

## Customization of `Theme`

When adding custom properties to the `Theme`, you may continue to use it in a strongly typed way by exploiting [TypeScript's module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

The following example adds an `appDrawer` property that is merged into the one exported by `material-ui`:

```ts
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width']
      breakpoint: Breakpoint
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width']
      breakpoint?: Breakpoint
    }
  }
}
```

And a custom theme factory with additional defaulted options:

**./styles/createMyTheme**:

```ts
import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export default function createMyTheme(options: ThemeOptions) {
  return createMuiTheme({
    appDrawer: {
      width: 225,
      breakpoint: 'lg',
    },
    ...options,
  })
}
```

This could be used like:

```ts
import createMyTheme from './styles/createMyTheme';

const theme = createMyTheme({ appDrawer: { breakpoint: 'md' }});
```

## Usage of `component` property

Material-UI allows you to replace a component's root node via a `component` property. For example, a `Button`'s root node can be replaced with a React Router `Link`, and any additional props that are passed to `Button`, such as `to`, will be spread to the `Link` component. For a code example concerning `Button` and `react-router-dom` checkout [this Button demo](/components/buttons/#third-party-routing-library).

Not every component fully supports any component type you pass in. If you encounter a component that rejects its `component` props in TypeScript please open an issue. There is an ongoing effort to fix this by making component props generic.