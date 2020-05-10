# TypeScript

<p class="description">借助 TypeScript，你可以为 JavaScript 添加静态类型，从而提高代码质量及开发者的工作效率。</p>

请查看一下 [Create React App with TypeScript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript) 的例子。 我们要求 TypeScript 版本必须大于 2.8。

为了让类型检查起作用，你必须在 `tsconfig.json` 里启用以下选项：

```json
{
  "compilerOptions": {
    "lib": ["es6", "dom"],
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true
  }
}
```

对每个发布在 `@types/` 命名空间下的类型声明包，同样需要启用严格模式（strict mode）。 使用不太严格的 `tsconfig.json` 或省略某些库可能会带来一些错误。 为了最好的类型检查体验，我们建议设置 `"strict": true` 。

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

但是，为了允许这些样式传递 TypeScript，鉴于CSS 类的名称和实际的 CSS 属性名称不一致，定义必须是模糊的。 由于类名称应与 CSS 属性相同，因此应避免使用。

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
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

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

## `component` 属性用法

Material-UI 的许多组件允许你通过 `component` 属性替换它们的根节点，这将在组件的 API 文档中详细说明。 例如，一个按钮（Button）的根节点可以被替换成一个 React Router 的链接（Link），并且传入按钮（Button）的任何额外的属性，例如 `to` ，会被传递到链接（Link）组件。 关于按钮和 react-router-dom 的代码示例查看[这些示例](/guides/composition/#routing-libraries)。

To be able to use props of such a Material-UI component on their own, props should be used with type arguments. Otherwise, the `component` prop will not be present in the props of the Material-UI component.

The examples below use `TypographyProps` but the same will work for any component which has props defined with `OverrideProps`.

The following `CustomComponent` component has the same props as the `Typography` component.

```ts
function CustomComponent(props: TypographyProps<'a', { component: 'a' }>) {
  /* ... */
}
```

Now the `CustomComponent` can be used with a `component` prop which should be set to `'a'`. In addition, the `CustomComponent` will have all props of a `<a>` HTML element. The other props of the `Typography` component will also be present in props of the `CustomComponent`.

It is possible to have generic `CustomComponent` which will accept any React component, custom and HTML elements.

```ts
function GenericCustomComponent<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }>,
) {
  /* ... */
}
```

Now if the `GenericCustomComponent` will be used with a `component` prop provided, it should also have all props required by the provided component.

```ts
function ThirdPartyComponent({ prop1 } : { prop1: string }) {
  return <div />
}
// ...
<GenericCustomComponent component={ThirdPartyComponent} prop1="some value" />;
```

The `prop1` became required for the `GenericCustomComponent` as the `ThirdPartyComponent` has it as a requirement.

但是，并不是每个组件都完全支持您传入的任何组件类型。 如果您在 TypeScript 中遇到一个不接受其 `component` 属性的组件，请提起一个 issue。 通过使组件道具具有通用性，一直在努力解决这个问题。

## 处理`值`和事件处理器

很多与用户输入有关的组件会提供一个 `value` 属性或者包含当前 `value` 的事件处理器。 大多数情况下`value`只在 React 内被处理，这样的话它能够是任何类型，譬如 objects 或者 arrays。

然而，如果它依赖于组件的子组件，则类型无法在编译时被验证，例如对于 `Select` 或者 `RadioGroup` 组件来说。 这意味着留给我们的最合适的选项是将其输入为 `unknown` 并让开发者自行决定如何来缩小该类型。 与 [`event.target` 在 React 中并不通用的原因](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682)相同，我们并不推荐您在这些案例中尝试使用一个通用的类型。

The demos include typed variants that use type casting. 鉴于所有的类型都位于一个文件中，并且都是非常基本的，这样的折衷可以接受。 您必须自行决定是否能够接受同样的折衷。 The library types are be strict by default and loose via opt-in.