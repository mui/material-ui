# Theme components

<p class="description">Learn how to apply custom style to the components at the theme level.</p>

<!-- This page should answer: -->
<!-- How to customize a component -->
<!-- How to target specific prop -->

## Target a component

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

The style can contain any CSS selectors (support nested selectors) like:

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

## Color scheme override

If you want to switch the values between color schemes, the way to do it without creating new tokens is to use CSS attribute selector.

By default, Joy attach an attribute selector with the current color scheme to the html. For example, the html will be `<html data-joy-color-scheme="dark">` when the user switches to dark mode. You can use this data attribute (or via `theme.getColorSchemeSelector`) to style the component like:

```js
extendTheme({
  components: {
    JoyChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          // for the default color scheme (light)
          boxShadow: theme.vars.shadow.sm,

          // same as `[data-joy-color-scheme="dark"] &`
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

We don't recommend to use conditional operator to switch between values because it is not performant and it creates nested conditional operators if you have more than light and dark color schemes.

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
