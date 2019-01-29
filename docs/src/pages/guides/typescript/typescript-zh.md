# TypeScript

<p class="description">使用TypeScript，你可以为JavaScript添加类型接口，从而提高代码质量及工作效率</p>

例子：https://github. com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript TypeScript版本大于2.8

我们的定义使用以下 [tsconfig.json](https://github.com/mui-org/material-ui/tree/master/tsconfig.json)进行测试。 使用不太严格的 `tsconfig.json` 或省略某些库可能会导致错误。

## WithStyles的使用

在TypeScript中使用 `withStyles` 可能有点棘手，但有一些实用程序可以使体验尽可能轻松。

### 使用 `createStyles` 来打败类型扩展

混淆的常见原因是TypeScript的 [类型扩展](https://blog.mariusschulz.com/2017/02/04/typescript-2-1-literal-type-widening)，这导致此示例无法按预期工作：

```ts
const styles = {
  root： {
    display: 'flex',
    flexDirection: 'column',
  }
};

withStyles（样式）;
// ^^^^^^
//属性'flexDirection'的类型不兼容。
//           Type 'string' is not assignable to type '"-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "column" | "column-reverse" | "row"...'.
```

问题是 `flexDirection` 属性的类型被推断为 `string`，这太任意了。 要解决此问题，您可以将样式对象直接传递给 `withStyles`：

```ts
withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});
```

然而，如果您尝试使样式取决于主题，则类型扩展会再次显示其丑陋的头部：

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

这是因为TypeScript [扩展了函数表达式](https://github.com/Microsoft/TypeScript/issues/241)的返回类型。

因此，我们建议使用我们的 `createStyles` 帮助函数来构造样式规则对象：

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

`createStyles` 只是身份函数;它不会在运行时“做任何事情”，只是在编译时指导类型推断。

### 媒体查询

`withStyles` 允许样式对象具有顶级媒体查询，如下所示：

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

但是，为了允许这些样式传递TypeScript，定义必须与CSS类的名称和实际的CSS属性名称不一致。 由于此类名称应与CSS属性相同，因此应避免使用。

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

### 使用 `WithStyles`道具

由于用 `withStyles(styles)` 装饰的组件获得了特殊的 `classes` prop注入，因此您需要相应地定义其props：

```ts
const styles = (theme: Theme) => createStyles({
  root: { /* ... */ },
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface Props {
  // 非风格的属性
  foo: number;
  bar: boolean;
  // 注入的样式属性
  classes: {
    root: string;
    paper: string;
    button: string;
  };
}
```

然而，这是不是很 [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) ，因为它需要你保持类名（`'root'`， `'paper'`， `'button'`在两个不同的地方，...）。 我们提供了一个类型操作符 `WithStyles` 来帮助解决这个问题，以便您可以编写

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

### 装饰组件

应用 `withStyles(styles)` 作为函数按预期方式工作：

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

不幸的是，由于TypeScript装饰器</a>的 当前限制， `withStyles(styles)` 不能用作TypeScript中的装饰器。</p> 

## 自定义 `主题`

向 `Theme`添加自定义属性时，您可以通过利用 [Typescript的模块扩充](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)继续以强类型方式使用它。

以下示例添加了一个 `appDrawer` 属性，该属性合并到由 `material-ui`导出的属性中：

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

以及带有其他默认选项的自定义主题工厂：

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

这可以像：

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