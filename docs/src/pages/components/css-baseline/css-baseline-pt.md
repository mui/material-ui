---
components: CssBaseline
---

# CSS Baseline

<p class="description">Material-UI oferece um componente CSS Base a fim de inciar uma elegante, consistente e simples base para construir sobre.</p>

Você já deve estar familiarizado com [normalize.css](https://github.com/necolas/normalize.css), uma coleção de elementos HTML e normas de atributos de estilo.

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* O resto de sua aplicação */}
    </React.Fragment>
  );
}

export default MyApp;
```

## Abordagem

### Página

Os elementos `<html>` e `<body>` são atualizados para fornecer melhores padrões para toda a página. Mais especificamente:

- The margin in all browsers is removed.
- A cor de fundo padrão do material design é aplicada. Isto usando [`theme.palette.background.default`](/customization/default-theme/?expend-path=$.palette.background) para dispositivos padrão e um fundo branco para dispositivos de impressão.

### Leiaute

- `box-sizing` é definido globalmente no elemento `<html>` para `border-box`. Todos elementos —incluindo `*::before` e `*::after` são declarados para herdar essa propriedade, que garante que a largura declarada do elemento nunca seja excedida devido ao preenchimento da borda.

### Tipografia

- O antialiasing de fonte é habilitado para melhorar a exibição da fonte Roboto.
- Nenhum tamanho de fonte base é declarado no `<html>`, mas 16px é assumido (o padrão do navegador). Você pode aprender mais sobre as implicações da mudança do padrão de tamanho de fonte do `<html>` na página de [documentação de tema](/customization/typography/#typography-html-font-size).