# Theme components

<p class="description">Learn how to apply custom style to the components at the theme level.</p>

<!-- This page should answer: -->
<!-- How to customize a component -->
<!-- How to target specific prop -->

## Component identifier

To theme a specific component, specify the component identifier (`Joy{ComponentImportName}`) inside the `components` node.

- `defaultProps`: to change the default props of the component.
- `styleOverrides`: to apply style to the component slots. Every Joy component always contains `root` slot.

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  components: {
    JoyChip: {
      defaultProps: {
        size: 'sm',
      },
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
  },
});

function App() {
  return <CssVarsProvider theme={theme}>...</CssVarsProvider>;
}
```

You can check all of component identifiers from [here](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/components.d.ts#L57).

## Access theme and props

To apply a style based on props, provide a callback as a value to the style overrides. The argument contains `theme` and `ownerState` (props).

```js
extendTheme({
  components: {
    JoyChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.size === 'sm' && {
            borderRadius: theme.vars.radius.xs,
          }),
          ...(ownerState.size === 'md' && {
            borderRadius: theme.vars.radius.sm,
          }),
          ...(ownerState.variant === 'solid' && {
            background: `linear(to top, ${
              theme.vars.palette[ownerState.color][700]
            }, ${theme.vars.palette[ownerState.color][500]})`,
          }),
        }),
      },
    },
  },
});
```

We recommend to use CSS variables from `theme.vars.*` because it has better debugging experience and more performant in some cases.

The style can contain any CSS selectors (support nested selectors) like this:

```js
extendTheme({
  components: {
    JoyChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'solid' &&
            ownerState.clickable && {
              color: 'rgba(255 255 255 / 0.72)',
              '&:hover': {
                color: '#fff',
              },
              '&.Mui-disabled': {
                opacity: 0.6,
              },
            }),
        }),
      },
    },
  },
});
```

## Target specific color scheme

If you want to switch the values between color schemes, the way to do it without creating new tokens is to use CSS attribute selector.

Joy attaches a `data-*` attribute with the current color scheme to the DOM (html by default). You can use `theme.getColorSchemeSelector` utility to style the component like this:

```js
extendTheme({
  components: {
    JoyChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          // for the default color scheme (light)
          boxShadow: theme.vars.shadow.sm,

          // the result is `[data-joy-color-scheme="dark"] &`
          [theme.getColorSchemeSelector('dark')]: {
            boxShadow: 'none',
          },
        }),
      },
    },
  },
});
```

This approach lets you apply a style for custom color schemes as well. However, note that it creates CSS specificity which might be cumbersome when a parent component wants to override the style.

:::error
🚨 We don't recommend to use conditional operator to switch between values because it is not performant and it creates nested conditional operators if you have more than light and dark color schemes.

```js
// 🚫 Don't do this
extendTheme({
  components: {
    JoyChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          // styles will be created for both color schemes which is not performant
          boxShadow: theme.palette.mode === 'dark' ? 'none' : theme.vars.shadow.sm,
        }),
      },
    },
  },
});
```

:::

<!-- ## Examples -->
