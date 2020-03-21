# Interoperabilidade da Biblioteca de Estilo

<p class="description">While you can use the JSS based styling solution provided by Material-UI to style your application, you can also use the one you already know and love (from plain CSS to styled-components).</p>

Este guia tem como objetivo documentar as alternativas mais populares, mas você deve descobrir que os princípios aplicados aqui podem ser adaptados para outras bibliotecas. There are examples for the following styling solutions:

- [CSS puro](#plain-css)
- [CSS global](#global-css)
- [Styled Components](#global-css)
- [Módulos CSS](#styled-components)
- [Emotion](#css-modules)
- [React JSS](#react-jss)

## CSS puro

Nothing fancy, just plain CSS.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/plain-css-mtzri)

**PlainCssButton.css**

```css
.button {
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.button:hover {
  background-color: #5469d4;
}
```

**PlainCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';

export default function PlainCssButton() {
  return (
    <div>
      <Button>Default</Button>
      <Button className="button">Customized</Button>
    </div>
  );
}
```

### Controlling priority ⚠️

**Nota:** O JSS injeta seus estilos na parte inferior do `<head>`. Se você não quiser marcar atributos de estilo com **!important**, você precisa alterar [a ordem de injeção do CSS](/styles/advanced/#css-injection-order), como na demonstração:

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* Your component tree.
      Now, you can override Material-UI's styles. */}
</StylesProvider>
```

### Elementos mais profundos

Se você tentar estilizar um Drawer com variante permanente, provavelmente precisará afetar o elemento Paper, elemento filho do Drawer. No entanto, o paper não é o elemento raiz do Drawer e, portanto, a customização de styled-components como acima não funcionará. Você precisa usar a API [`classes`](/styles/advanced/#overriding-styles-classes-prop) do Material-UI.

O exemplo a seguir sobrescreve o estilo de `label` e `Button`, além dos estilos customizados no próprio botão.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

**PlainCssButtonDeep.css**

```css
.button {
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.button:hover {
  background-color: #5469d4;
}
.button-label {
  color: #fff;
}
```

**PlainCssButtonDeep.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';

export default function PlainCssButtonDeep() {
  return (
    <div>
      <Button>Default</Button>
      <Button classes={{ root: 'button', label: 'button-label' }}>
        Customized
      </Button>
    </div>
  );
}
```

## CSS global

Fornecer explicitamente os nomes das classes ao componente é um esforço excessivo? [Você pode segmentar os nomes de classe gerados por Material-UI](/styles/advanced/#with-material-ui-core).

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/global-css-bir9e)

**GlobalCssButton.css**

```css
.MuiButton-root {
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.MuiButton-root:hover {
  background-color: #5469d4;
}
.MuiButton-label {
  color: #fff;
}
```

**GlobalCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';

export default function GlobalCssButton() {
  return <Button>Customized</Button>;
}
```

### Controlling priority ⚠️

**Nota:** O JSS injeta seus estilos na parte inferior do `<head>`. Se você não quiser marcar atributos de estilo com **!important**, você precisa alterar [a ordem de injeção do CSS](/styles/advanced/#css-injection-order), como na demonstração:

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* Your component tree.
      Now, you can override Material-UI's styles. */}
</StylesProvider>
```

## Styled Components

![estrelas](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg?)

O método `styled()` funciona perfeitamente em todos os componentes.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/styled-components-r1fsr)

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
`;

export default function StyledComponents() {
  return (
    <div>
      <Button>Default</Button>
      <StyledButton>Customized</StyledButton>
    </div>
  );
}

```

### Controlling priority ⚠️

**Nota:** Ambos, styled-components e JSS injetam seus estilos na parte inferior do `<head>`. A melhor abordagem para garantir que os estilos do styled-components sejam carregados por último, é alterar [a ordem de injeção do CSS](/styles/advanced/#css-injection-order), como na demonstração:

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* Your component tree.
      Now, you can override Material-UI's styles. */}
</StylesProvider>
```

Outra abordagem é usar os caracteres `&&` em styled-components para [aumentar a especificidade](https://www.styled-components.com/docs/advanced#issues-with-specificity) repetindo o nome da classe. Avoid the usage of `!important`.

### Elementos mais profundos

Se você tentar estilizar um Drawer com variante permanente, provavelmente precisará afetar o elemento Paper, elemento filho do Drawer. No entanto, o paper não é o elemento raiz do Drawer e, portanto, a customização de styled-components como acima não funcionará. Você precisa usar a API [`classes`](/styles/advanced/#overriding-styles-classes-prop) do Material-UI.

O exemplo a seguir sobrescreve o estilo de `label` e `Button`, além dos estilos customizados no próprio botão. Também funciona como solução de contorno [para este problema com styled-components](https://github.com/styled-components/styled-components/issues/439), por "consumir" propriedades que não devem ser passadas para o componente subjacente.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js"}}

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
  & .MuiButton-label {
    color: #fff;
  }
`;

export default function StyledComponentsDeep() {
  return (
    <div>
      <Button>Default</Button>
      <StyledButton>Customized</StyledButton>
    </div>
  );
}
```

A demonstração acima depende [doa valores padrão de `classes`](/styles/advanced/#with-material-ui-core), mas você pode fornecer seu próprio nome de classe: `.label`.

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(({ color, ...other }) => (
  <Button classes={{ label: 'label' }} {...other} />
))`
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
  & .label {
    color: #fff;
  }
`;

export default function StyledComponentsDeep() {
  return (
    <div>
      <Button>Default</Button>
      <StyledButton>Customized</StyledButton>
    </div>
  );
}
```

### Tema

Material-UI tem uma estrutura de tema rica, que você pode aproveitar para manipulações de cores, transições, consultas de mídia e muito mais.

We encourage to share the same theme object between Material-UI and your styles.

```jsx
const StyledButton = styled(Button)`
  ${({ theme }) => `
  background-color: ${theme.palette.primary.main};
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 4px 10px;
  font-size: 13px;
  &:hover {
    background-color: ${darken(theme.palette.primary.main, 0.2)};
  }
  ${theme.breakpoints.up('sm')} {
    font-size: 14px;
    padding: 7px 14px;
  }
  `}
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsTheme.js"}}

### Portal

O [Portal](/components/portal/) fornece uma maneira de primeira classe para renderizar filhos em um nó DOM que existe fora da hierarquia DOM do componente pai. Devido a maneira como o escopo de CSS do styled-components funciona, você pode encontrar problemas nos quais o estilo não é aplicado.

Por exemplo, se você tentar estilizar o [Menu](/components/menus/) de um componente [Select](/components/selects/) usando a propriedade `MenuProps`, você precisará passar a propriedade `className` para o elemento que está sendo renderizado fora de sua hierarquia DOM. O exemplo a seguir mostra uma solução alternativa:

```jsx
import React from 'react';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledMenu = styled(({ className, ...props }) => (
  <Menu {...props} classes={{ paper: className }} />
))`
  box-shadow: none;
  border: 1px solid #d3d4d5;

  li {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsPortal.js"}}

## Módulos CSS

![estrelas](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

É difícil saber a participação de mercado [nesta solução de estilo](https://github.com/css-modules/css-modules), pois é dependente da solução de empacotamento que as pessoas estão usando.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/css-modules-3j29h)

**CssModulesButton.css**

```css
.button {
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.button:hover {
  background-color: #5469d4;
}
```

**CssModulesButton.js**

```jsx
import React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesButton.css';
import Button from '@material-ui/core/Button';

export default function CssModulesButton() {
  return (
    <div>
      <Button>Default</Button>
      <Button className={styles.button}>Customized</Button>
    </div>
  );
}
```

### Controlling priority ⚠️

**Nota:** O JSS injeta seus estilos na parte inferior do `<head>`. Se você não quiser marcar atributos de estilo com **!important**, você precisa alterar [a ordem de injeção do CSS](/styles/advanced/#css-injection-order), como na demonstração:

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* Your component tree.
      Now, you can override Material-UI's styles. */}
</StylesProvider>
```

### Elementos mais profundos

Se você tentar estilizar um Drawer com variante permanente, provavelmente precisará afetar o elemento Paper, elemento filho do Drawer. No entanto, o paper não é o elemento raiz do Drawer e, portanto, a customização de styled-components como acima não funcionará. Você precisa usar a API [`classes`](/styles/advanced/#overriding-styles-classes-prop) do Material-UI.

O exemplo a seguir sobrescreve o estilo de `label` e `Button`, além dos estilos customizados no próprio botão.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

**CssModulesButtonDeep.css**

```css
.root {
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.root:hover {
  background-color: #5469d4;
}
.label {
  color: #fff;
}
```

**CssModulesButtonDeep.js**

```jsx
import React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesButtonDeep.css';
import Button from '@material-ui/core/Button';

export default function CssModulesButtonDeep() {
  return (
    <div>
      <Button>Default</Button>
      <Button classes={styles}>Customized</Button>
    </div>
  );
}
```

## Emotion

![estrelas](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/emotion.svg?)

### A propriedade `css`

O método **css()** do Emotion funciona perfeitamente com Material-UI.

{{"demo": "pages/guides/interoperability/EmotionCSS.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/emotion-bgfxj)

```jsx
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Button from '@material-ui/core/Button';

export default function EmotionCSS() {
  return (
    <div>
      <Button>Default</Button>
      <Button
        css={css`
          background-color: #6772e5;
          color: #fff;
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
          padding: 7px 14px;
          &:hover {
            background-color: #5469d4;
          }
        `}
      >
        Customized
      </Button>
    </div>
  );
}
```

### Controlling priority ⚠️

**Nota:** O JSS injeta seus estilos na parte inferior do `<head>`. Se você não quiser marcar atributos de estilo com **!important**, você precisa alterar [a ordem de injeção do CSS](/styles/advanced/#css-injection-order), como na demonstração:

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* Your component tree.
      Now, you can override Material-UI's styles. */}
</StylesProvider>
```

### Tema

Material-UI tem uma estrutura de tema rica, que você pode aproveitar para manipulações de cores, transições, consultas de mídia e muito mais.

We encourage to share the same theme object between Material-UI and your styles.

```jsx
<Button
  css={theme => css`
    background-color: ${theme.palette.primary.main};
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    padding: 4px 10px;
    font-size: 13px;
    &:hover {
      background-color: ${darken(theme.palette.primary.main, 0.2)};
    }
    ${theme.breakpoints.up('sm')} {
      font-size: 14px;
      padding: 7px 14px;
    }
  `}
>
  Customized
</Button>
```

{{"demo": "pages/guides/interoperability/EmotionTheme.js"}}

### A API `styled()`

Funciona exatamente como styled components. Você pode [usar o mesmo guia](/guides/interoperability/#styled-components).