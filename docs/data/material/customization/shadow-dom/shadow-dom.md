# Shadow DOM

<p class="description">The shadow DOM lets you encapsulate parts of an app to keep them separate from global styles that target the regular DOM tree.</p>

## How to use the shadow DOM with Material UI

### 1. Styles

The shadow DOM is an API that provides a way to attach a hidden separated DOM to an element.
This is useful when you need to keep the structure, style, and behavior of different components separate from the rest of the code on the page, to prevent conflicts.
See [the MDN docs on the shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) for more information.
The following code snippet shows how to apply styles inside of the shadow DOM:

```tsx
const container = document.querySelector('#root');
const shadowContainer = container.attachShadow({ mode: 'open' });
const shadowRootElement = document.createElement('div');
shadowContainer.appendChild(shadowRootElement);

const cache = createCache({
  key: 'css',
  prepend: true,
  container: shadowContainer,
});

ReactDOM.createRoot(shadowRootElement).render(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
);
```

### 2. Theme

Material UI components like Menu, Dialog, Popover, and others use the [Portal](/material-ui/react-portal/) component to render a new "subtree" in a container outside of current DOM hierarchy.
By default, this container is `document.body`.
But since the styles are applied only inside of the Shadow DOM, we need to render portals inside the Shadow DOM container as well:

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

The `container` prop only needs to be set on the three components that render through the `Portal` directly: `Modal`, `Popover`, and `Popper`.
Higher-level components are built on top of these and inherit the default automatically—for example, `Dialog` and `Drawer` render a `Modal`, `Menu` renders a `Popover`, and `Tooltip` and `Autocomplete` render a `Popper`.

:::info
You don't need to set `container` on `Dialog`, `Menu`, or other higher-level components.
Each one renders one of the base components internally, and that base component reads its own default props (`MuiModal`, `MuiPopover`, or `MuiPopper`) when it renders, so the example above already covers them.
:::

### 3. CSS theme variables (optional)

:::info
If you use **TypeScript**, you need to [extend the interface of the theme](/material-ui/customization/css-theme-variables/usage/#typescript) first.
:::

To use [CSS theme variables](/material-ui/customization/css-theme-variables/overview/) inside of the shadow DOM, you need to set the selectors for generating the CSS variables:

```diff
 const theme = createTheme({
+  cssVariables: {
+    rootSelector: ':host',
+    colorSchemeSelector: 'class',
+  },
   components: {
     // ...same as above steps
   }
 })
```

Finally, set the `colorSchemeNode` prop using `shadowRootElement`, from step 1, as the value:

```diff
 <ThemeProvider
   theme={theme}
+  colorSchemeNode={shadowRootElement}
 >
```

## Demo

In the example below you can see that the component outside of the shadow DOM is affected by global styles, while the component inside of the shadow DOM is not:

{{"demo": "ShadowDOMDemoNoSnap.js", "hideToolbar": true, "bg": true}}
