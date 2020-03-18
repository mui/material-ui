---
components: CssBaseline, ScopedCssBaseline
---

# CSS Baseline

<p class="description">Material-UI oferece um componente CSS Base a fim de inciar uma elegante, consistente e simples base para construir sobre.</p>

## Global reset

Você já deve estar familiarizado com [normalize.css](https://github.com/necolas/normalize.css), uma coleção de elementos HTML e normas de atributos de estilo.

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}
```

## Scoping on children

However, you might be progressively migrating a website to Material-UI, using a global reset might not be an option. It's possible to apply the baseline only to the children by using the `ScopedCssBaseline` component.

```jsx
import React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* The rest of your application */}
    </ScopedCssBaseline>
  );
}
```

## Approach

### Página

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- The margin in all browsers is removed.
- A cor de fundo padrão do material design é aplicada. It's using [`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) for standard devices and a white background for print devices.

### Leiaute

- `box-sizing` é definido globalmente no elemento `<html>` para `border-box`. Todos elementos —incluindo `*::before` e `*::after` são declarados para herdar essa propriedade, que garante que a largura declarada do elemento nunca seja excedida devido ao preenchimento da borda.

### Tipografia

- Nenhum tamanho de fonte base é declarado no `<html>`, mas 16px é assumido (o padrão do navegador). Você pode aprender mais sobre as implicações da mudança do padrão de tamanho de fonte do `<html>` na página de [documentação de tema](/customization/typography/#typography-html-font-size).
- Defina o estilo `theme.typography.body2` no elemento `<body>`.
- Set the font-weight to `theme.typography.fontWeightBold` for the `<b>` and `<strong>` elements.
- O antialiasing de fonte é habilitado para melhorar a exibição da fonte Roboto.