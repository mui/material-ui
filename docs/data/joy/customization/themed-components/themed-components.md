# Themed components

<p class="description">Learn how to apply custom styles to components at the theme level.</p>

<!-- This page should answer: -->
<!-- How to customize a component -->
<!-- How to target specific prop -->

## Component identifier

If you've used [Material UI](/material-ui/customization/theme-components/) before, you are probably familiar with this technique.
To customize a specific component in the theme, specify the component identifier (`Joy{ComponentImportName}`) inside the `components` node.

- Use `defaultProps` to change the default React props of the component.
- Use `styleOverrides` to apply styles to each component slots.
  - Every Joy UI component contains the `root` slot.

Visit the [`components.d.ts`](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/components.d.ts) file to see all component identifiers.

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

## Default props

The values specified in the theme as `defaultProps` affect all instances of the component:

```js
extendTheme({
  components: {
    JoyIconButton: {
      defaultProps: {
        variant: 'outlined',
        color: 'neutral',
      },
    },
  },
});

// This is the same as:
// <IconButton variant="outlined" color="neutral">
<IconButton>...</IconButton>;
```

## Style overrides

### Change styles based on props

To change the styles of a given prop, use a callback as value to the style overrides.
The argument contains `theme` and `ownerState` (props).

```js
extendTheme({
  components: {
    JoyChip: {
      styleOverrides: {
        // `ownerState` contains the component props and internal state
        root: ({ ownerState, theme }) => ({
          ...(ownerState.size === 'sm' && {
            borderRadius: theme.vars.radius.xs,
          }),
        }),
      },
    },
  },
});
```

We recommend to use CSS variables from `theme.vars.*` because it has a better debugging experience and also is more performant in some cases.

The styles can also contain any CSS selectors (support nested selectors), as such:

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

### Extend sizes

Here's how you'd go for extending a component's available sizes.
We recommend following the in-use t-shirt sizing convention to maintain consistency with all the other props.


```js
extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.size === 'xs' && {
            // smallest size
            '--Icon-fontSize': '1rem',
            '--Button-gap': '0.25rem',
            minHeight: 'var(--Button-minHeight, 1.75rem)',
            fontSize: theme.vars.fontSize.sm,
            paddingBlock: '2px',
            paddingInline: '0.5rem',
          }),
          ...(ownerState.size === 'xl' && {
            // largest size
            '--Icon-fontSize': '2rem',
            '--Button-gap': '1rem',
            minHeight: 'var(--Button-minHeight, 4rem)',
            fontSize: theme.vars.fontSize.lg,
            paddingBlock: '0.5rem',
            paddingInline: '2rem',
          }),
        }),
      },
    },
  },
});
```

:::info
**TypeScript**

You need module augmentation to include the values to the `size` prop of the component.

The interface is in `{ComponentName}PropsSizeOverrides` format which exists in all Joy UI components:

```tsx
// This part could be declare in your theme file
declare module '@mui/joy/Button' {
  interface ButtonPropsSizeOverrides {
    xs: true;
    xl: true;
  }
}

// typed-safe
<Button size="xs" />
<Button size="xl" />
```

:::

### Extend variants

By creating new component variants, you're automatically opting out of the [global variant feature](/joy-ui/main-features/global-variants/), which allows you to have fine-grain control of the color-related CSS properties (`color`, `background` and `border`).

```js
extendTheme({
  components: {
    JoySheet: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'glass' && {
            color: theme.vars.palette.text.primary,
            background: 'rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          }),
        }),
      },
    },
  },
});
```

:::info

**TypeScript**

You need module augmentation to include the values to the `variant` prop of the component.

The interface is in `{ComponentName}PropsVariantOverrides` format which exists in all Joy UI components:

```tsx
// This part could be declare in your theme file
declare module '@mui/joy/Button' {
  interface SheetPropsVariantOverrides {
    glass: true;
  }
}

// typed-safe
<Sheet variant="glass" />;
```

:::

### Different styles per mode

To specify different values than the ones defined in the default theme for each mode (light and dark), use the CSS attribute selector.

Joy UI attaches a `data-*` attribute with the current color scheme to the DOM (HTML by default).
You can use the `theme.getColorSchemeSelector` utility to change the component styles.

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

If you have custom color schemes defined, this approach also works.
However, note that it creates additional CSS specificity which might be cumbersome when the parent component wants to override their children styles.

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
