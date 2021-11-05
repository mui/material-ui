# Uso

<p class="description">Get started with React and MUI in no time.</p>

MUI components work in isolation. **Eles são auto-suficientes**, e só irão injetar os estilos que eles precisam para exibir. Eles não contam com qualquer folha de estilo global como [normalize.css](https://github.com/necolas/normalize.css/).

Você pode usar qualquer um dos componentes conforme demonstrado na documentação. Por favor, consulte a [página de demonstração](/components/buttons/) de cada componente para ver como eles devem ser importados.

## Vamos começar!

Aqui está um exemplo rápido para você começar, **é literalmente tudo que você precisa**:

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Sim, isso é tudo o que você precisa para começar, como você pode ver nesta demonstração ao vivo e interativa:

{{"demo": "pages/getting-started/usage/Usage.js", "hideToolbar": true, "bg": true}}

## Globais

MUI usage experience can be improved with a handful of important globals that you'll need to be aware of.

### Meta tag para responsividade

MUI is developed mobile-first, a strategy in which we first write code for mobile devices, and then scale up components as necessary using CSS media queries. Para garantir a renderização adequada e o zoom de toque para todos os dispositivos, adicione a meta tag de visualização responsiva ao seu elemento `<head>`.

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

### CssBaseline

MUI provides an optional [CssBaseline](/components/css-baseline/) component. Ele corrige algumas inconsistências nos navegadores e dispositivos, ao mesmo tempo em que fornece redefinições ligeiramente mais opinativas para elementos HTML comuns.

## Versões da documentação

This documentation always reflects the latest stable version of MUI. You can find older versions of the documentation on a [separate page](https://mui.com/versions/).

## Próximos passos

Agora que você tem uma ideia da configuração básica, é hora de aprender mais sobre:

- Como aplicar [a fonte e a tipografia do Material Design](/components/typography/).
- Como tirar proveito da [solução de tema](/customization/theming/).
- Como [customizar](/customization/how-to-customize/) o visual e a aparência dos componentes.
