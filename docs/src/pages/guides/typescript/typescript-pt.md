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

The strict mode options are the same that are required for every types package published in the `@types/` namespace. Using a less strict `tsconfig.json` or omitting some of the libraries might cause errors. To get the best type experience with the types we recommend setting `"strict": true`.

## Uso de `withStyles`

Using `withStyles` in TypeScript can be a little tricky, but there are some utilities to make the experience as painless as possible.

### Utilizando `createStyles` para evitar a ampliação de tipo (type widening)

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

Isso poderia ser usado como:

```ts
import createMyTheme from './styles/createMyTheme';

const theme = createMyTheme({ appDrawer: { breakpoint: 'md' }});
```

## Uso da propriedade `component`

Material-UI permite que você substitua o nó raiz de um componente através de uma propriedade `component`. For example, a Button's root node can be replaced with a React Router's Link, and any additional props that are passed to Button, such as `to`, will be spread to the Link component. For a code example concerning Button and react-router-dom checkout [these demos](/guides/composition/#routing-libraries).

Nem todos os componentes suportam totalmente qualquer tipo de componente que você passe. Se você encontrar algum componente que rejeita sua propriedade `component` no TypeScript por favor abra um issue. Há um esforço contínuo para corrigir isso fazendo com que a propriedade component seja genérica.

## Manipulando `value` e manipuladores de eventos

Muitos componentes preocupados com a entrada do usuário oferecem uma propriedade `value` ou manipuladores de eventos que incluem o valor atual em `value`. Na maioria das situações, `value` só é manipulado dentro do React, o que permite que seja de qualquer tipo, como objetos ou matrizes.

No entanto, esse tipo não pode ser verificado em tempo de compilação em situações em que depende de nós filhos do componente, por exemplo, para `Select` ou `RadioGroup`. Isso significa que a opção mais segura é tipando como `unknown` e deixar que o desenvolvedor decida como deseja restringir esse tipo. Não oferecemos a possibilidade de usar um tipo genérico nesses casos, devido [as mesmas razões que `event.target` não é genérico no React](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682).

As demonstrações incluem variantes tipadas que usam conversão de tipo. É uma troca aceitável porque os tipos estão todos localizados em um único arquivo e são muito básicos. Você tem que decidir por si mesmo se a mesma troca é aceitável para você. The library types are be strict by default and loose via opt-in.