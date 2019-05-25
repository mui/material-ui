# TypeScript

<p class="description">借助 TypeScript，你可以为 JavaScript 添加静态类型，从而提高代码质量及开发者的工作效率。</p>

例子：https://github. com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript 此例子要求 TypeScript 版本大于 2.8。

我们的定义都通过[tsconfig.json](https://github.com/mui-org/material-ui/tree/master/tsconfig.json) 进行测试。 使用不太严格的 `tsconfig.json` 或省略某些库可能会带来一些错误。

## `withStyles` 的使用

在 TypeScript 中使用 `withStyles` 可能有点棘手，但有一些实用程序可以帮助提高使用感受。

### 使用 `createStyles` 来杜绝类型扩展

有一个造成混淆的常见原因是 TypeScript的 [类型扩展](https://mariusschulz.com/blog/typescript-2-1-literal-type-widening)，因此这个示例不会像预期那样工作：

```ts
const styles = {
  root： {
    display: 'flex',
    flexDirection: 'column',
  }
};

withStyles（styles）;
//         ^^^^^^
//        属性 'flexDirection' 的类型是不兼容的。
//           'string' 类型不能赋予给这些类型：'"-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "column" | "column-reverse" | "row"...'。
```

问题是 `flexDirection` 属性的类型被推断为 `string`，这样太随意了。 要解决此问题，您可以将样式对象直接传递给 `withStyles`：

```ts
withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});
```

然而，如果您尝试让样式随主题而变化，类型扩展会再次显示其不怎么雅观的部分：

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

这是因为 TypeScript [扩展了函数表达式](https://github.com/Microsoft/TypeScript/issues/241)的返回类型。

因此，我们建议使用我们的 `createStyles` 帮助函数来构造样式规则对象：

```ts
// 不依赖于主题的样式
const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

// 依赖于主题的样式
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

`createStyles` 只是身份函数；它不会在运行时“做任何事情”，只是在编译时指导类型推断。

### Media queries（媒体查询）

`withStyles` 允许样式对象具有顶级媒体查询的权限，如下所示：

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

However to allow these styles to pass TypeScript, the definitions have to be ambiguous concerning names for CSS classes and actual CSS property names. 由于类名称应与 CSS 属性相同，因此应避免使用。

```ts
// 这样是错误的，由于 TypeScript 认为 `@media (min-width: 960px)` 是一个类名
// 并且 `content` 是 css 属性
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

// 这样定义就可以
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

### 使用 `WithStyles` 来扩充你的属性

由于用 `withStyles(styles)` 装饰的组件被注入了一个特殊的 `classes` 属性，您需要相应地定义其属性：

```ts
const styles = (theme: Theme) => createStyles({
  root: { /* ... */ },
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface Props {
  // 未被注入样式的属性
  foo: number;
  bar: boolean;
  // 被注入样式的属性
  classes: {
    root: string;
    paper: string;
    button: string;
  };
}
```

然而，这是不是很 [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) ，因为它需要你在两个不同的地方保持类名（`'root'`， `'paper'`， `'button'`，...）。 我们提供了一个类型操作符 `WithStyles` 来帮助解决这个问题，因此您可以直接写入：:

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

将 `withStyles(styles)` 作为函数来如期使用：

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

不幸的是，由于[TypeScript 装饰器现有的限制 ](https://github.com/Microsoft/TypeScript/issues/4881)， `withStyles(styles)` 不能用在 TypeScript 中作为一个装饰器。

## 自定义 `主题`

将自定义属性添加到`主题`中时，您可以通过以强类型的方式实现 [TypeScript 的模块扩充](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)而继续使用它 。

以下示例添加了一个 `appDrawer` 属性，并将其合并到由 `material-ui` 提供的属性中：

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
  // 使用 `createMuiTheme` 来配置
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width']
      breakpoint?: Breakpoint
    }
  }
}
```

以及一个带有其他默认选项的自定义主题仓库：

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

也可以这样使用：

```ts
import createMyTheme from './styles/createMyTheme';

const theme = createMyTheme({ appDrawer: { breakpoint: 'md' }});
```

## `组件`属性的用法

在 Material-UI 中，您可以用`组件`的属性来替换一个组件的根节点。 譬如，一个 `Button` 的根节点可以用一个 React Router 的`Link`来替换，而且 `Button` 的其余属性，例如 `to`，也可以运用到 `Link` 组件当中。 For a code example concerning `Button` and `react-router-dom` checkout [this Button demo](/components/buttons/#third-party-routing-library).

但是，并不是每个组件都完全支持您传入的任何组件类型。 如果您在 TypeScript 中遇到一个不接受其 `component` 属性的组件，请新建一个 issue。 我们也一直在努力实现组件属性的通用化， 这样能够帮助我们解决这个问题。