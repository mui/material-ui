# TypeScript

You can add static typing to JavaScript to improve developer productivity and code quality thanks to [TypeScript](https://www.typescriptlang.org/).
Have a look at the [Create React App with TypeScript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript) example. A minimum version of TypeScript 2.8 is required.

## Usage of `withStyles`

The usage of `withStyles` in TypeScript can be a little tricky, so it's worth showing some examples.

### Style rules and type widening

First off, a frequent source of confusion is TypeScript's [type widening](https://blog.mariusschulz.com/2017/02/04/typescript-2-1-literal-type-widening), which causes this example not to work:

```ts
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
};

withStyles(styles); // Error!
```

The problem is that the type of the `flexDirection` property here is inferred as `string`, but arbitrary strings are not valid. To fix this, you can pass the styles object directly to `withStyles`:

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

A more general solution is to use the `createStyles` helper function to construct your style rules object:

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

### Styled props

Once you've obtained a decorator from `withStyles(styles)`, it can be used to decorate either a stateless functional component or a class component. Suppose we have in either case the following props:

```ts
interface Props {
  text: string;
  type: TypographyProps['type'];
  color: TypographyProps['color'];
};
```

Functional components are straightforward:

```tsx
const DecoratedSFC = withStyles(styles)<Props>(({ text, type, color, classes }) => (
  <Typography variant={type} color={color} classes={classes}>
    {text}
  </Typography>
));
```

Class components are a little more cumbersome. Due to a [current limitation in TypeScript's decorator support](https://github.com/Microsoft/TypeScript/issues/4881), `withStyles` can't be used as a class decorator. Instead, we decorate a class component like so:

```tsx
import { WithStyles } from '@material-ui/core/styles';

const DecoratedClass = withStyles(styles)(
  class extends React.Component<Props & WithStyles<'root'>> {
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

When your `props` are a union, Typescript needs you to explicitly tell it the type, by providing a generic `<Props>` parameter to `decorate`:

```tsx
import { WithStyles } from '@material-ui/core/styles';

interface Book {
  category: "book";
  author: string;
}

interface Painting {
  category: "painting";
  artist: string;
}

type Props = Book | Painting;

const DecoratedUnionProps = decorate<Props>( // <-- without the type argument, we'd get a compiler error!
  class extends React.Component<Props & WithStyles<'root'>> {
    render() {
      const props = this.props;
      return (
        <Typography classes={props.classes}>
          {props.category === "book" ? props.author : props.artist}
        </Typography>
      );
    }
  }
);
```


### Injecting Multiple Classes

Injecting multiple classes into a component is as straightforward as possible. Take the following code for example. The classes `one` and `two` are both available with type information on the `classes`-prop passed in by `withStyles`.

```tsx
import { Theme, withStyles, WithStyles } from "material-ui/styles";
import * as React from "react";

const styles = (theme: Theme) => ({
  one: {
    backgroundColor: "red",
  },
  two: {
    backgroundColor: "pink",
  },
});

interface Props {
   someProp: string;
};

type PropsWithStyles = Props & WithStyles<keyof ReturnType<typeof styles>>;

const Component: React.SFC<PropsWithStyles> = ({
  classes,
  ...props
}: PropsWithStyles) => (
  <div>
    <div className={classes.one}>One</div>
    <div className={classes.two}>Two</div>
  </div>
);

export default withStyles(styles)<Props>(Component);
```

## Customization of `Theme`

When adding custom properties to the `Theme`, you may continue to use it in a strongly typed way by exploiting
[Typescript's module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

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
