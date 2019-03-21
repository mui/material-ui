# TypeScript

<p class="description">TypeScriptを使用することで、JavaScriptに静的型付けを追加し、開発者の生産性とコード品質を向上させることができます。</p>

[Create React AppでのTypeScript](https://github.com/mui-org/material-ui/tree/next/examples/create-react-app-with-typescript)の使用例を参考にしてください。 TypeScript 2.8以上が必要です。

私たちの定義は、こちらの[tsconfig.json](https://github.com/mui-org/material-ui/tree/next/tsconfig.json) でテストしています。 あまり厳密でない`tsconfig.json`を使ったり、一部のライブラリを省略した場合、エラーが発生する可能性があります。

## `withStyles`の使い方

`withStyles`をTypeScriptで使うのは少し厄介ですが、それをできるだけ簡単に扱うためのユーティリティがいくつかあります。

### `createStyles`を使って型の拡大を打倒する

よくある混乱の原因は、TypeScriptの[型の拡大(widening)](https://blog.mariusschulz.com/2017/02/04/typescript-2-1-literal-type-widening)です。これにより、この例は期待通りに動作しません。

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

問題は、`flexDirection`プロパティの型が`string`として型推論されることです。これは独断的すぎます。 これを修正するため、styleオブジェクトを直接`withStyles`に渡します:

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

However to allow these styles to pass TypeScript the definitions have to be ambiguous concerning names for CSS classes and actual CSS property names. Due to this class names that are equal to CSS properties should be avoided.

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

However this isn't very [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) because it requires you to maintain the class names (`'root'`, `'paper'`, `'button'`, ...) in two different places. We provide a type operator `WithStyles` to help with this, so that you can just write

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

Material-UI allows you to replace a component's root node via a `component` property. For example, a `Button`'s root node can be replaced with a React Router `Link`, and any additional props that are passed to `Button`, such as `to`, will be spread to the `Link` component, meaning you can do this:

```jsx
import { Link } from 'react-router-dom';

<Button component={Link} to="/">Go Home</Button>
```

However, TypeScript will complain about it, because `to` is not part of the `ButtonProps` interface, and with the current type declarations it has no way of inferring what props can be passed to `component`.

The current workaround is to cast Link to `any`:

```tsx
import { Link } from 'react-router-dom';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface LinkButtonProps extends ButtonProps {
  to: string;
  replace?: boolean;
}

const LinkButton = (props: LinkButtonProps) => (
  <Button {...props} component={Link as any} />
)

// usage:
<LinkButton color="primary" to="/">Go Home</LinkButton>
```

Material-UI components pass some basic event handler props (`onClick`, `onDoubleClick`, etc.) to their root nodes. These handlers have a signature of:

```ts
(event: MouseEvent<HTMLElement, MouseEvent>) => void
```

which is incompatible with the event handler signatures that `Link` expects, which are:

```ts
(event: MouseEvent<AnchorElement>) => void
```

Any element or component that you pass into `component` will have this problem if the signatures of their event handler props don't match.

There is an ongoing effort to fix this by making component props generic.

### Avoiding properties collision

The previous strategy suffers from a little limitation: properties collision. The component providing the `component` property might not forward all its properties to the root element. To workaround this issue, you can create a custom component:

```tsx
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const MyLink = (props: any) => <Link to="/" {...props} />;

// usage:
<Button color="primary" component={MyLink}>Go Home</Button>
```