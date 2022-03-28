# Components

<p class="description">Customizing the components using its keys inside the theme enables you to achieve styling consistency across your application.</p>

## Default props

Every Material UI component comes, out-of-the-box, with default values set for each of its props.
If you want to change how your component looks by default, use the `defaultProps` key exposed in the theme's `components` key. Like so:

```js
const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple!
      },
    },
  },
});
```

{{"demo": "DefaultProps.js"}}

To override lab component styles with TypeScript, check [this page](/components/about-the-lab/#typescript).

## Global style overrides

If you want to print an entirely different design direction to the components, potentially changing every single style injected by Material UI into the DOM, use the theme's `styleOverrides` key.

```js
const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  },
});
```

{{"demo": "GlobalThemeOverride.js"}}

Note that each component is composed of several different parts. If you want to know how to target a specific part of a given component, check the **CSS** section of its API page to see every class it has available. You should then use it inside the `stylesOverrides` key.

```js
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#202020',
          color: '#fff',
        },
      },
    },
  },
});
```

### Overrides based on props

You can pass a callback as a value in each slot of the component's `styleOverrides` to apply styles based on props.

The `ownerState` prop is a combination of public props that you pass to the component + internal state of the component.

```js
const finalTheme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        valueLabel: ({ ownerState, theme }) => ({
          ...(ownerState.orientation === 'vertical' && {
            backgroundColor: 'transparent',
            color: theme.palette.grey[500],
          }),
        }),
      },
    },
  },
});
```

{{"demo": "GlobalThemeOverrideCallback.js"}}

### Using the `sx` experimental syntax

If you are not familiar with the `sx` prop, make sure you first check out [the concept around it](/system/the-sx-prop/) and [the difference with the `styled` utility](/system/styled/#difference-with-the-sx-prop).

To have a similar shorthand CSS notation to the `sx` prop but within the theme, you can use `sx` inside the `stylesOverrides`.

{{"demo": "GlobalThemeOverrideSx.js", "defaultCodeOpen": false}}

```tsx
const finalTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: sx({
          px: 1,
          py: 0.25,
          borderRadius: 1,
        }),
        label: {
          padding: 'initial',
        },
        icon: sx({
          mr: 0.5,
          ml: '-2px',
        }),
      },
    },
  },
});
```

### Specificity

If you use the theming approach to customize the components, you'll still be able to override them using the `sx` prop as it has a higher CSS specificity.

Note that some components expose a `color` prop, which has a lower specificty than the theme's styles overrides. For example, say you have customized `Link`'s color.

```js
MuiLink: {
  styleOverrides: {
    root: {
      color: '#0000FF', // blue
    },
  },
},
```

If you then try to customize the `Link`'s color using the `color` prop, nothing will happen since the theme's styles take precedence.

```js
<Link color="#A52A2A">Brown</Link> // the blue set in the theme's style overrides above will persist
```

## Creating new component variants

You can use the `variants` key in the theme's `components` section to create new variants to Material UI components. These new variants can specify what styles the component should have when that specific variant prop value is applied.

The definitions are specified in an array, under the component's name. For each of them a CSS class is added to the HTML `<head>`. The order is important, so make sure that the styles that should win are specified last.

```js
const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed ${blue[500]}`,
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

<!-- Tested with packages/mui-material/test/typescript/augmentation/themeComponents.spec.ts -->

```tsx
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

{{"demo": "GlobalThemeVariants.js"}}

## Theme variables

Another way to override the look of all component instances is to adjust the [theme configuration variables](/customization/theming/#theme-configuration-variables).

```js
const theme = createTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "ThemeVariables.js"}}
