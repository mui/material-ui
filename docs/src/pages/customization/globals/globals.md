# Globals

<p class="description">The `theme.components` key enables you to customize the appearance of all instances of a component type, enables you to change the default value(s) of a component's props and allows you to add custom variants to your components.</p>

## Default props

You can change the default props of all the Material-UI components.
A `defaultProps` key is exposed in the `theme`'s components key for this use case.

```js
const theme = createMuiTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/DefaultProps.js"}}

To override lab components styles with TypeScript, check [this documentation](/components/about-the-lab/#typescript).

## Theme variables

You can adjust the [theme configuration variables](/customization/theming/#theme-configuration-variables).

```jsx
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/globals/ThemeVariables.js"}}

## Global CSS override

You can also customize all instances of a component with CSS.
Components expose [global class names](/styles/advanced/#with-material-ui-core) to enable this.
It's very similar to how you would customize Bootstrap.

```jsx
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);

// …

<GlobalCss />;
```

If you are using the [CssBaseline](/components/css-baseline/) component to apply global resets, it can also be used to apply global styles. For instance:

```jsx
const theme = createMuiTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          html: {
            WebkitFontSmoothing: 'auto',
          },
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

{{"demo": "pages/customization/globals/GlobalCssOverride.js", "iframe": true, "height": 100}}

## Global theme override

You can take advantage of the `overrides` key of the `theme` to potentially change every single style injected by Material-UI into the DOM.
Learn more about it in the [themes section](/customization/globals/#css) of the documentation.

```jsx
const theme = createMuiTheme({
  components: {
    // Style sheet name ⚛️
    MuiButton: {
      styleOverrides: {
        // Name of the rule
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/GlobalThemeOverride.js"}}

The list of these customization points for each component is documented under the **Component API** section.
For instance, you can have a look at the [Button](/api/button/#css).

To override lab components styles with TypeScript, check [this documentation](/components/about-the-lab/#typescript).

## Adding new component variants

You can take advantage of the `variants` key in the `theme`'s components section to add new variants to Material-UI components. These new variants, can specify which styles the component should have, if specific props are defined together.

The definitions are specified in an array, under the component's name. For every one of them a class is added in the head. The order is **important**, so make sure that the styles that should win will be specified lastly.

```jsx
const theme = createMuiTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed grey${blue[500]}`,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
    },
  },
});
```

If you're using TypeScript, you'll need to specify your new variants/colors, using [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

```tsx
declare module '@material-ui/core/Button/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

{{"demo": "pages/customization/globals/GlobalThemeVariants.js"}}
