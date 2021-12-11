# Usage

<p class="description">Comece com React e MUI em pouco tempo.</p>

Componentes MUI funcionam isoladamente. **Eles são auto-suficientes**, e só irão injetar os estilos que eles precisam para exibir. Eles não contam com qualquer folha de estilo global como [normalize.css](https://github.com/necolas/normalize.css/).

Você pode usar qualquer um dos componentes conforme demonstrado na documentação. Por favor, consulte a [página de demonstração](/components/buttons/) de cada componente para ver como eles devem ser importados.

## Vamos começar!

Aqui está um exemplo rápido para você começar, **é literalmente tudo que você precisa**:

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained"> Olá Mundo</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Sim, isso é tudo o que você precisa para começar, como você pode ver nesta demonstração ao vivo e interativa:

{{"demo": "pages/getting-started/usage/Usage.js", "hideToolbar": true, "bg": true}}

## Globais

A experiência de uso de MUI pode ser melhorada com o uso de importantes utilitários globais que você precisará estar ciente.

### Meta tag para responsividade

MUI é desenvolvida com a estratégia mobile-first, uma estratégia na qual primeiro escrevemos código para dispositivos móveis e, em seguida, dimensionamos componentes conforme necessário, usando consultas de mídia CSS. Para garantir a renderização adequada e o zoom de toque para todos os dispositivos, adicione a meta tag de visualização responsiva ao seu elemento `<head>`.

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

### CssBaseline

MUI fornece um componente opcional [CssBaseline](/components/css-baseline/). Ele corrige algumas inconsistências nos navegadores e dispositivos, ao mesmo tempo em que fornece redefinições ligeiramente mais opinativas para elementos HTML comuns.

## Versões da documentação

Esta documentação sempre reflete a última versão estável de MUI. Você pode encontrar versões mais antigas da documentação em uma [página separada](https://mui.com/versions/).

## Próximos passos

Agora que você tem uma ideia da configuração básica, é hora de aprender mais sobre:

- Como aplicar [a fonte e a tipografia do Material Design](/components/typography/).
- Como tirar proveito da [solução de tema](/customization/theming/).
- Como [customizar](/customization/how-to-customize/) o visual e a aparência dos componentes.
