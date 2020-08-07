# TypeScript

<p class="description">TypeScriptを使用することで、JavaScriptに静的型付けを追加し、開発者の生産性とコード品質を向上させることができます。</p>

Material-UI requires a minimum version of TypeScript 3.2.

[Create React AppでのTypeScript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript)の使用例を参考にしてください。

In order for types to work, you have to at least have the following options enabled in your `tsconfig.json`:

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

Strictモードのオプションは、すべてのタイプのパッケージに必要なものと同じです。 は`@types/`namespaceで発行されます。 あまり厳密でない`tsconfig.json`を使ったり、一部のライブラリを省略した場合、エラーが発生する可能性があります。 To get the best type experience with the types we recommend setting `"strict": true`.

## `withStyles`の使い方

`withStyles`をTypeScriptで使うのは少し厄介ですが、それをできるだけ簡単に扱うためのユーティリティがいくつかあります。

### `createStyles`を使って型の拡大を打倒する

よくある混乱の原因は、TypeScriptの[型の拡大(widening)](https://mariusschulz.com/blog/typescript-2-1-literal-type-widening)です。これにより、この例は期待通りに動作しません。

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

すべてのコンポーネントが、渡すコンポーネントタイプを完全にサポートしているわけではありません。 If you encounter a component that rejects its `component` props in TypeScript please open an issue. コンポーネントプロップを汎用化することで、この問題を解決するための取り組みが続けられています。

```ts
withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});
```

ただし、スタイルをテーマに依存させようとすると、タイプを広げるとい頭が再び現れます：

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

これは、TypeScript [が関数式の戻り値の型を広げるためです。 ](https://github.com/Microsoft/TypeScript/issues/241)

Because of this, using the `createStyles` helper function to construct your style rules object is recommended:

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

`createStyles`は、単なるidentity関数です。実行時に「何でもする」するのではなく、コンパイル時に型推論をガイドするのに役立つだけです。

### メディアクエリ

`withStyles`では、次のような最上位のメディアクエリを持つスタイルオブジェクトを使用できます。

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

ただし、これらのスタイルがTypeScriptを渡せるようにするには、CSSクラスの名前と実際のCSSプロパティ名に関して定義があいまいでなければなりません。 このため、CSSプロパティと同じクラス名は使用しないでください。 ただし、これらのスタイルがTypeScriptを渡せるようにするには、CSSクラスの名前と実際のCSSプロパティ名に関して定義があいまいでなければなりません。 このため、CSSプロパティと同じクラス名は使用しないでください。

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

### WithStylesを使用して propsを増強する

`withStyles(styles) で装飾されたコンポーネント`には、特別な`classes` プロパティが挿入されるため、それに応じてプロパティを定義する必要があります。

```ts
*/ },
  button: { /* ... */ },
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

しかし、これはあまり[DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)ではありません。なぜなら、クラス名(`'root'`、`'paper'`、`'button'`、...。) を二つの異なる場所に維持する必要があるからです。 このために、型演算子`WithStyles`を使用して、次のように記述します。 このために、型演算子`WithStyles`を使用して、次のように記述します。

```ts
import { WithStyles, createStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: { /* ... */ },
  paper: { /* ... */ },
  button: { /* ... */ },
  paper: { /* ...
```

### コンポーネントの装飾

`withStyles（styles）`の適用で、関数が期待どおりに機能する：

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

残念ながら、[TypeScript decoratorsの現在の制限](https://github.com/Microsoft/TypeScript/issues/4881) により、`withStyles(スタイル)`はTypeScriptのデコレータとして使用できません。

## テーマのカスタマイズ

カスタムプロパティを`テーマ`に追加する場合、[TypeScriptのモジュール拡張](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)を利用して、厳密に型指定した方法で引き続き使用できます。

次の例では、`material-ui`によって書き出されたプロパティに合成される`appDrawer`プロパティを追加します。

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

カスタムテーマファクトリには、追加の既定のオプションがあります。

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

これは次のように使用できます。

```ts
import createMyTheme from './styles/createMyTheme';

const theme = createMyTheme({ appDrawer: { breakpoint: 'md' }});
```

## Usage of `component` prop

Many Material-UI components allow you to replace their root node via a `component` prop, this will be detailed in the component's API documentation. For example, a Button's root node can be replaced with a React Router's Link, and any additional props that are passed to Button, such as `to`, will be spread to the Link component. For a code example concerning Button and react-router-dom checkout [these demos](/guides/composition/#routing-libraries).

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

すべてのコンポーネントが、渡すコンポーネントタイプを完全にサポートしているわけではありません。 すべてのコンポーネントが、渡すコンポーネントタイプを完全にサポートしているわけではありません。 If you encounter a component that rejects its `component` props in TypeScript please open an issue. コンポーネントプロップを汎用化することで、この問題を解決するための取り組みが続けられています。

## `value` およびイベントハンドラの処理

ユーザ入力に関連する多くのコンポーネントは、現在の `value`を含む`value`プロパティまたはイベントハンドラを提供します。 ほとんどの場合、`値`のみが処理されます。 オブジェクトや配列などの任意のタイプを使用できます。 ほとんどの場合、`値`のみが処理されます。 オブジェクトや配列などの任意のタイプを使用できます。

ただし、そのタイプは、たとえば`Select`または`RadioGroup`など、コンポーネントの子に依存する状況では、コンパイル時に検証できません。 つまり、soundest オプションは、それを`unknown`として入力し、その型をどのように絞り込むかを開発者に決定させることです。 [同じ理由で` event.target` は Reactでは一般的ではないため](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682)これらの場合にジェネリック タイプを使用する可能性は提供しません。

The demos include typed variants that use type casting. すべての型が単一のファイル内にあり、非常に基本的であるため、これは許容できるトレードオフです。 同じトレードオフが受け入れられるかどうかは、自分で判断する必要があります。 The library types are be strict by default and loose via opt-in.