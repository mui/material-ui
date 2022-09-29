# Themed components

<p class="description">Learn how to apply custom styles to components at the theme level.</p>

<!-- This page should answer: -->
<!-- How to customize a component -->
<!-- How to target specific prop -->

## Component identifier

If you've used [Material UI](/material-ui/customization/theme-components/) before, you are probably familiar with this technique. To customize a specific component in the theme, specify the component identifier (`Joy{ComponentImportName}`) inside the `components` node.

- Use `defaultProps` to change the default styles the component.
- Use `styleOverrides` to apply styles to each component slots.
  - Every Joy UI component contains the `root` slot.

Visit the [`components.d.ts`](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/components.d.ts#L58) file to see every component identifier.

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

## Using theme tokens per props

To change the styles of a given prop using theme tokens, use a callback as value to the style overrides. The argument contains `theme` and `ownerState` (props).

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

We recommend to use CSS variables from `theme.vars.*` because it has a better debugging experience and also is more performant in some cases.

However, the new styles can also contain any CSS selectors (support nested selectors), as such:

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

## Different styles per mode

To specify different values than the ones defined in the default theme for each mode (light and dark), use the CSS attribute selector.

Joy UI attaches a `data-*` attribute with the current color scheme to the DOM (HTML by default). You can use the `theme.getColorSchemeSelector` utility to change the component styles.

The example below illustrate how you'd change the intensity of the `boxShadow` token in the light mode while removing it completely in the dark mode:

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

If you have custom color schemes defined, this approach also works. However, note that it creates additional CSS specificity which might be cumbersome when the parent component wants to override their children styles.

:::error
🚨 **Note:** We don't recommend using the conditional operator to switch between values as it is not performant.

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
