# TypeScript

<p class="description">Você pode adicionar tipagem estática para o JavaScript para melhorar a produtividade do desenvolvimento e a qualidade do código graças ao TypeScript.</p>

Dê uma olhada no exemplo [Create React App com TypeScript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript). É necessário estar no mínimo com a versão 2.8 do TypeScript.

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

The strict mode options are the same that are required for every types package published in the `@types/` namespace. Usando uma `tsconfig.json` menos rigorosa ou omitindo algumas das bibliotecas podem causar erros. To get the best type experience with the types we recommend setting `"strict": true`.

## Uso de `withStyles`

Utilizando `withStyles` no TypeScript pode ser um pouco complicado, mas há alguns utilitários que tornam a experiência menos dolorosa possível.

### Utilizando `createStyles` para evitar a ampliação de tipo (type widening)

Uma fonte frequente de confusão é a ampliação de tipos ([type widening](https://mariusschulz.com/blog/typescript-2-1-literal-type-widening)) do TypeScript, que faz com que este exemplo não funcione como o esperado:

```ts
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
};

withStyles(styles);
//         ^^^^^^
//         Os tipos de propriedade 'flexDirection' são incompatíveis.
//           Tipo 'string' não pode ser atribuído para o tipo '"-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "column" | "column-reverse" | "row"...'.
```

O problema é que o tipo da propriedade `flexDirection` é convertido como `string`, no qual é o tipo mais conveniente. Para corrigir isto, você pode passar o objeto de estilos diretamente para `withStyles`:

```ts
withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});
```

No entanto, a ampliação de tipos continuará a causar dores de cabeça se você tentar fazer com que os estilos dependam do tema:

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

Isso ocorre pois o TypeScript [amplia o retorno de tipos de expressões de função](https://github.com/Microsoft/TypeScript/issues/241).

Because of this, using the `createStyles` helper function to construct your style rules object is recommended:

```ts
// Estilos sem dependência
const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

// Estilos com dependência do tema
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

`createStyles` é apenas a identidade da função; ela não "faz nada" em tempo de execução, apenas auxilia a inferência de tipos em tempo de compilação.

### Consultas de Mídia (Media queries)

`withStyles` permite utilizar um objeto de estilos de nível superior com consultas de mídia assim:

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

No entanto, para permitir que estes estilos passem pelo TypeScript, as definições devem ser ambíguas em relação aos nomes de classes CSS e nomes de propriedades CSS. Devido a isso, evite utilizar nomes de classes iguais a propriedades do CSS.

```ts
// erro porque TypeScript acha que `@media (min-width: 960px)` é o nome da classe
// e `content` é a propriedade css
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

// funciona corretamente
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

### Incrementando suas propriedades utilizando `WithStyles`

Desde que um componente seja decorado com `withStyles(styles)`, ele recebe uma propriedade injetada `classes`, você pode querer definir estas propriedades de acordo com:

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

No entanto isto não é muito elegante de acordo com o princípio de software [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), porque requer que você mantenha os nomes das classes (`'root'`, `'paper'`, `'button'`, ...) em dois locais diferentes. Nós fornecemos um operador de tipo `WithStyles` para ajudar com isso, assim você pode apenas escrever:

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

### Decorando componentes

Aplicando `withStyles(styles)` como uma função, nos dá o resultado como o esperado:

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

Infelizmente devido a uma [limitação atual dos decoradores do TypeScript](https://github.com/Microsoft/TypeScript/issues/4881), `withStyles(styles)` não pode ser usado como decorador no TypeScript.

## Customização de tema

Ao adicionar propriedades customizadas ao `Theme`, você pode continuar a utilizá-lo de uma maneira fortemente tipada, explorando o conceito de extensão de módulos do TypeScript ([TypeScript's module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)).

O exemplo a seguir adiciona uma propriedade `appDrawer` que é mesclada na que foi exportada pelo `material-ui`:

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
  // permitir configuração usando `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width']
      breakpoint?: Breakpoint
    }
  }
}
```

E uma fábrica customizada de temas com opções padrão adicionais:

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

Isso poderia ser usado como:

```ts
import createMyTheme from './styles/createMyTheme';

const theme = createMyTheme({ appDrawer: { breakpoint: 'md' }});
```

## Uso da propriedade `component`

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

Not every component fully supports any component type you pass in. If you encounter a component that rejects its `component` props in TypeScript please open an issue. There is an ongoing effort to fix this by making component props generic.

## Manipulando `value` e manipuladores de eventos

Many components concerned with user input offer a `value` prop or event handlers which include the current `value`. In most situations that `value` is only handled within React which allows it be of any type, such as objects or arrays.

However, that type cannot be verified at compile time in situations where it depends on the component's children e.g. for `Select` or `RadioGroup`. This means that the soundest option is to type it as `unknown` and let the developer decide how they want to narrow that type down. We do not offer the possibility to use a generic type in those cases for [the same reasons `event.target` is not generic in React](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682).

The demos include typed variants that use type casting. It is an acceptable tradeoff because the types are all located in a single file and are very basic. You have to decide for yourself if the same tradeoff is acceptable for you. The library types are be strict by default and loose via opt-in.