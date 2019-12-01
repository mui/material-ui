# @material-ui/styles

<p class="description">Você pode usar a solução de estilo do Material-UI na sua aplicação, esteja ou não usando componentes de Material-UI.</p>

Material-UI, tem como objetivo fornecer uma base sólida para a criação de interfaces de usuário dinâmicas. Por uma questão de simplicidade, **expomos a solução de estilo usada nos componentes de Material-UI** como pacote, `@material-ui/styles`. Você pode usá-lo, mas você não precisa, já que Material-UI também é [ interoperável com](/guides/interoperability/) todas as outras soluções de estilo principais.

## Por que usar a solução de estilo do Material-UI?

Nas versões anteriores, o Material-UI usava o LESS, e em seguida, uma solução customizada no estilo inline para escrever os estilos dos componentes, mas essas abordagens provaram ser limitadas. [Uma solução *CSS-em-JS*](https://github.com/oliviertassinari/a-journey-toward-better-style) supera muitas destas limitações, e ** libera excelentes funcionalidades** (aninhamento de temas, estilos dinâmicos, auto-suporte etc.).

A solução de estilo do Material-UI é inspirada em muitas outras bibliotecas de estilo, como [styled-components](https://www.styled-components.com/) e [emotion](https://emotion.sh/).

- 💅 You can expect [the same advantages](https://www.styled-components.com/docs/basics#motivation) as styled-components.
- 🚀 It's [blazing fast](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uistyles).
- 🧩 It's extensible via a [plugin](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API.
- ⚡️ It uses [JSS](https://github.com/cssinjs/jss) at its core – a [high performance](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript to CSS compiler which works at runtime and server-side.
- 📦 Less than [15 KB gzipped](https://bundlephobia.com/result?p=@material-ui/styles); and no bundle size increase if used alongside Material-UI.

## Instalação

> `@material-ui/styles` is re-exported as `@material-ui/core/styles` - you only need to install it if you wish to use it independently from Material-UI.

Para instalar e salvar em suas dependências do `package.json`, execute:

```sh
// utilizando o npm
npm install @material-ui/styles

// utilizando o yarn
yarn add @material-ui/styles
```

## Primeiros passos

There are 3 possible APIs you can use to generate and apply styles, however they all share the same underlying logic.

### Hook API

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

{{"demo": "pages/styles/basics/Hook.js"}}

### Styled components API

Nota: isso se aplica somente para a sintaxe de chamada – definições de estilo de ainda usam um objeto JSS. Você também pode [alterar esse comportamento](/styles/advanced/#string-templates), com algumas limitações.

```jsx
import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}
```

{{"demo": "pages/styles/basics/StyledComponents.js"}}

### Higher-order component API

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function HigherOrderComponent(props) {
  const { classes } = props;
  return <Button className={classes.root}>Higher-order component</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
```

{{"demo": "pages/styles/basics/HigherOrderComponent.js"}}

## Aninhamento de seletores

Você pode aninhar seletores para segmentar elementos dentro da classe ou componente atual. O exemplo a seguir usa a Hook API, mas funciona da mesma maneira com as outras APIs.

```js
const useStyles = makeStyles({
  root: {
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue'
      }
    }
  },
});
```

{{"demo": "pages/styles/basics/NestedStylesHook.js", "defaultCodeOpen": false}}

## Adaptando com base em propriedades

Você pode passar uma função para `makeStyles` ("interpolação") a fim de adaptar o valor gerado com base nas propriedades do componente. A função pode ser fornecida no nível de regra de estilo ou no nível da propriedade CSS:

```jsx
const useStyles = makeStyles({
  // regra de estilo
  foo: props => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // propriedade CSS
    color: props => props.color,
  },
});

function MyComponent() {
  // Propriedades simuladas para fins de exemplo
  const props = { backgroundColor: 'black', color: 'white' };
  // Passe as propriedades como primeiro argumento do useStyles()
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />
}
```

Este componente botão tem uma propriedade de cor que modifica sua cor:

### Adaptando a hook API

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### Adaptando a styled components API

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### Adaptando a higher-order component API

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

### Stress test

No teste de estresse a seguir, você pode atualizar *a cor do tema* e a *propriedade background-color* de forma interativa:

```js
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## @material-ui/core/styles vs @material-ui/styles

Material-UI's styles are powered by the [@material-ui/styles](https://www.npmjs.com/package/@material-ui/styles) package, (built with JSS). This solution is [isolated](https://bundlephobia.com/result?p=@material-ui/styles). It doesn't have a default theme, and can be used to style React applications that are not using Material-UI components.

To reduce the number of packages to install when using Material-UI, and to simplify the imports, `@material-ui/styles` modules are re-exported from `@material-ui/core/styles`.

To remove the need to systematically supply a theme, the default Material-UI theme is applied to the re-exported `makeStyles`, `styled`, `withTheme`, `useTheme`, and `withStyles` modules.

Por exemplo:

```js
// Re-export with a default theme
import { makeStyles } from '@material-ui/core/styles';

// Original module with no default theme
import { makeStyles } from '@material-ui/styles';
```