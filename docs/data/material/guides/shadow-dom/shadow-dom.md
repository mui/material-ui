# Shadow DOM

<p class="description"><a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM" target="_blank" rel="noopener nofollow">Shadow DOM</a> can be helpful to isolate part of the app from unwanted global styles.</p>

## Steps

### 1. Styles

In order for styles to work in Shadow DOM, they need to be applied inside of the Shadow DOM:

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

### 2. Theme

MUI components like `Menu`, `Dialog`, `Popover` and others use [React Portal](https://reactjs.org/docs/portals.html) to render a new "subtree" in a container outside of current DOM hierarchy.
By default, this container is `document.body`. But since the styles are applied only inside of the Shadow DOM, we need to render portals inside the Shadow DOM container as well:

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
  },
});

// ...

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>;
```

## Demo

In the example below you can see that component outside of the Shadow DOM is affected by global styles, while component inside of the Shadow DOM is not.

{{"demo": "ShadowDOMDemo.js", "defaultCodeOpen": false}}
