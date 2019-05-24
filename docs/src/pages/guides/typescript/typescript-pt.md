# TypeScript

<p class="description">Você pode adicionar tipagem estática para o JavaScript para melhorar a produtividade do desenvolvimento e a qualidade do código graças ao TypeScript.</p>

Dê uma olhada no exemplo [Create React App com TypeScript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript). É necessário estar no mínimo com a versão 2.8 do TypeScript.

Nossas definições são testadas com a seguinte configuração [tsconfig.json](https://github.com/mui-org/material-ui/tree/master/tsconfig.json). Usando uma `tsconfig.json` menos rigorosa ou omitindo algumas das bibliotecas podem causar erros.

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

Por causa disto, nós recomendamos utilizar nossa função auxiliar `createStyles` para construir seu objeto de regras de estilo:

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

However to allow these styles to pass TypeScript, the definitions have to be ambiguous concerning names for CSS classes and actual CSS property names. Devido a isso, evite utilizar nomes de classes iguais a propriedades do CSS.

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
  // allow configuration using `createMuiTheme`
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

Material-UI permite que você substitua o nó raiz de um componente através de uma propriedade `component`. Por exemplo, a raiz de um componente `Button` pode ser substituída com um React Router `Link`, e quaisquer propriedades adicionais passadas para o `Button`, como `to`, será repassada para o componente `Link`. For a code example concerning `Button` and `react-router-dom` checkout [this Button demo](/components/buttons/#third-party-routing-library).

Nem todos os componentes suportam totalmente qualquer tipo de componente que você passe. Se você encontrar algum componente que rejeita sua propriedade `component` no TypeScript por favor abra um issue. Há um esforço contínuo para corrigir isso fazendo com que a propriedade component seja genérica.