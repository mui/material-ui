# Globais

<p class="description">A chave <code>overrides</code> permite que você customize a aparência de todas as instâncias de um tipo de componente, enquanto a propriedade chave permite que você altere os valores padrão das propriedades de um componente.</p>

## CSS

Quando as variáveis de configuração não são poderosas o suficiente, você pode tirar vantagem com o `overrides`, chave do `theme` para potencialmente alterar **cada estilo único** injetado por Material-UI no DOM. Esse é um recurso realmente poderoso.

```js
const theme = createMuiTheme({
  overrides: {
    MuiButton: { // Nome do componente ⚛️ / folha de estilo
      text: { // Nome da regra
        color: 'white', // Um pouco de CSS
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/GlobalCss.js"}}

A lista desses pontos de customização de cada componente está documentada na seção **API do componente**. Por exemplo, você pode dar uma olhada no [Botão](/api/button/#css). Alternativamente, você pode sempre dar uma olhada na [implementação](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js).

## Propriedades padrão

Você pode alterar as propriedades padrão de todos os componentes de Material-UI. Nós expomos uma `props`, chave do `theme` para este caso de uso.

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