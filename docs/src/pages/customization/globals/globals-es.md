# Globales

<p class="description">The overrides key enables you to customize the appearance of all instances of a component type, while the props key enables you to change the default value(s) of a component's props.</p>

## CSS

When the configuration variables aren't powerful enough, you can take advantage of the `overrides` key of the `theme` to potentially change **every single style** injected by Material-UI into the DOM. That's a really powerful feature.

To override lab components styles with TypeScript, check [this documentation](/components/about-the-lab/#typescript).

```js
const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        color: 'white',
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/GlobalCss.js"}}

The list of these customization points for each component is documented under the **Component API** section. For instance, you can have a look at the [Button](/api/button/#css). For instance, you can have a look at the [Button](/api/button/#css).

## Global CSS

If you are using the [CssBaseline](/components/css-baseline/) component to apply global resets, it can also be used to apply global styles. Por ejemplo:

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

## Default props

You can change the default props of all the Material-UI components. A `props` key is exposed in the `theme` for this use case.

To override lab components styles with TypeScript, check [this documentation](/components/about-the-lab/#typescript).

```js
const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/DefaultProps.js"}}
