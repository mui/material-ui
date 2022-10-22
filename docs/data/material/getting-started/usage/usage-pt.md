# Uso

<p class="description">Get started with React and Material UI in no time.</p>

Material UI components work in isolation. **Eles são auto-suficientes**, e só irão injetar os estilos que eles precisam para exibir. Eles não contam com qualquer folha de estilo global como [normalize.css](https://github.com/necolas/normalize.css/).

Você pode usar qualquer um dos componentes conforme demonstrado na documentação. Please refer to each component's [demo page](/material-ui/react-button/) to see how they should be imported.

## Vamos começar!

Aqui está um exemplo rápido para você começar, **é literalmente tudo que você precisa**:

```jsx
import * as React from 'react';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}
```

Sim, isso é tudo o que você precisa para começar, como você pode ver nesta demonstração ao vivo e interativa:

{{"demo": "Usage.js", "hideToolbar": true, "bg": true}}

## Globais

Material UI usage experience can be improved with a handful of important globals that you'll need to be aware of.

### Meta tag para responsividade

Material UI is developed mobile-first, a strategy in which we first write code for mobile devices, and then scale up components as necessary using CSS media queries. Para garantir a renderização adequada e o zoom de toque para todos os dispositivos, adicione a meta tag de visualização responsiva ao seu elemento `<head>`.

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

### CssBaseline

Material UI provides an optional [CssBaseline](/material-ui/react-css-baseline/) component. Ele corrige algumas inconsistências nos navegadores e dispositivos, ao mesmo tempo em que fornece redefinições ligeiramente mais opinativas para elementos HTML comuns.

## Versioned documentation

This documentation always reflects the latest stable version of Material UI. Você pode encontrar versões mais antigas da documentação em uma [página separada](https://mui.com/versions/).

## Próximos passos

Agora que você tem uma ideia da configuração básica, é hora de aprender mais sobre:

- How to provide [the Material Design font and typography](/material-ui/react-typography/).
- How to take advantage of the [theming solution](/material-ui/customization/theming/).
- How to [override](/material-ui/customization/how-to-customize/) the look and feel of the components.
