# Utilização

<p class="description">Comece com React e Material-UI em pouco tempo.</p>

Componentes do Material-UI funcionam isoladamente. **Eles são auto-suficientes**, e só irão injetar os estilos que eles precisam para exibir. Eles não contam com qualquer folha de estilo global como [normalize.css](https://github.com/necolas/normalize.css/).

Você pode usar qualquer um dos componentes conforme demonstrado na documentação. Por favor, consulte a [página de demonstração](/components/buttons/) de cada componente para ver como eles devem ser importados.

## Inicio rápido

Aqui está um exemplo rápido para você começar, **é literalmente tudo que você precisa**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Olá Mundo
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Sim, isso é tudo o que você precisa para começar, como você pode ver nesta demonstração ao vivo e interativa:

{{"demo": "pages/getting-started/usage/Usage.js", "hideHeader": true}}

## Globais

A experiência de uso com o Material-UI pode ser melhorada com um punhado de configurações globais importantes, das quais você precisa estar ciente.

### Meta tag para responsividade

O Material-UI é desenvolvido primeiro em dispositivos móveis, uma estratégia na qual primeiro escrevemos código para dispositivos móveis e, em seguida, dimensionamos componentes conforme necessário, usando consultas de mídia CSS. Para garantir a renderização adequada e o zoom de toque para todos os dispositivos, adicione a meta tag de visualização responsiva ao seu elemento `<head>`.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
/>
```

### CssBaseline

Material-UI fornece um componente opcional [CssBaseline](/components/css-baseline/). Ele corrige algumas inconsistências nos navegadores e dispositivos, ao mesmo tempo em que fornece redefinições ligeiramente mais opinativas para elementos HTML comuns.

## Versões da documentação

Esta documentação sempre reflete a última versão estável do Material-UI. Você pode encontrar versões mais antigas da documentação em uma [página separada](/versions/).

## Próximos passos

Agora que você tem uma ideia da configuração básica, é hora de aprender mais sobre:

- Como aplicar [a fonte e a tipografia do Material Design](/components/typography/).
- Como tirar proveito da [solução de tema](/customization/themes/).
- Como [sobrescrever](/customization/components/) o visual e a aparência dos componentes.