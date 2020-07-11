# Globais

<p class="description">A chave <code>overrides</code> permite que você customize a aparência de todas as instâncias de um tipo de componente, enquanto a propriedade chave permite que você altere os valores padrão das propriedades de um componente.</p>

## CSS

Quando as variáveis de configuração não são poderosas o suficiente, você pode tirar vantagem com o `overrides`, chave do `theme` para potencialmente alterar **cada estilo único** injetado por Material-UI no DOM. Esse é um recurso realmente poderoso.

```js
const theme = createMuiTheme({
  overrides: {
    // Nome da folha de estilo ⚛️
    MuiButton: {
      // Nome da regra
      text: {
        // Algum CSS
        color: 'white',
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/GlobalCss.js"}}

A lista desses pontos de customização de cada componente está documentada na seção **API do componente**. Por exemplo, você pode dar uma olhada no [Botão](/api/button/#css). Alternativamente, você pode sempre dar uma olhada na [implementação](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js).

## CSS global

Se você estiver usando o componente [CssBaseline](/components/css-baseline/) para aplicar o reset global, ele pode também ser usado para aplicação de estilos globais. Por exemplo:

```jsx
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
      },
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
```

## Propriedades padrão

Você pode alterar as propriedades padrão de todos os componentes de Material-UI. A chave `props` é exposta no `theme` para estas situações de uso.

```js
const theme = createMuiTheme({
  props: {
    // Nome do componente ⚛️
    MuiButtonBase: {
      // As propriedades padrão para mudar
      disableRipple: true, // Sem efeito cascata, em toda a aplicação 💣!
    },
  },
});
```

{{"demo": "pages/customization/globals/DefaultProps.js"}}