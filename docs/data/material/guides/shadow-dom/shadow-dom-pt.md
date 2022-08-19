# Shadow DOM

<p class="description">O shadow DOM permite que você encapsule partes de uma aplicação para manter elas separadas do estilo global que visam a árvore DOM regular.</p>

## Como se usar o shadow DOM com Material UI

### 1. Estilos

O shadow DOM é uma api que fornece uma forma de anexar um DOM oculto separado a um elemento Isso é útil quando você precisa manter a estrutura, estilos e comportamentos de componentes diferentes separados do resto do código na página, para evitar conflitos. Veja a [a documentação do MDN  na documentação do shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) para mais informações. O seguinte código mostra como se aplicar estilos em um shadow DOM:

```tsx
const container = document.querySelector('#root');
const shadowContainer = container.attachShadow({ mode: 'open' });
const emotionRoot = document.createElement('style');
const shadowRootElement = document.createElement('div');
shadowContainer.appendChild(emotionRoot);
shadowContainer.appendChild(shadowRootElement);

const cache = createCache({
  key: 'css',
  prepend: true,
  container: emotionRoot,
});

ReactDOM.createRoot(shadowRootElement).render(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
);
```

### 2. Tema

Os componentes MUI como `Menu`, `Dialog`, `Popover` e outros usam o [`Portal`](/material-ui/react-portal/) para renderizar uma nova "sub árvore" em um container fora da atual hierarquia do DOM. Por padrão, esse container é `document.body`. Mas dado que os estilos são apenas aplicados dentro do Shadow DOM, nós também precisamos renderizar os portais dentro do conteiner do Shadow DOM.

```tsx
const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
  },
});

// ...

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>;
```

## Demostração

No exemplo abaixo é possível ver que o componente fora do shadow DOM é afetado pelos estilos globais, enquanto o componente dentro do shadow DOM não é:

{{"demo": "ShadowDOMDemo.js", "hideToolbar": true, "bg": true}}
