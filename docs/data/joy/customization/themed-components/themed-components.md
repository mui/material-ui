# Themed components

<p class="description">Learn how to apply custom styles to components at the theme level.</p>

<!-- This page should answer: -->
<!-- How to customize a component -->
<!-- How to target specific prop -->

## Component identifier

If you've used [Material UI](/material-ui/customization/theme-components/) before, you are probably familiar with this technique.
To customize a specific component in the theme, specify the component identifier (`Joy{ComponentImportName}`) inside the `components` node.

- Use `defaultProps` to change the default React props of the component.
- Use `styleOverrides` to apply styles to each component slots.
  - Every Joy UI component contains the `root` slot.

Visit the [`components.d.ts`](https://github.com/mui/material-ui/blob/-/packages/mui-joy/src/styles/components.d.ts) file to see all component identifiers.

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

## Theme default props

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

## Theme style overrides

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
            }),
        }),
      },
    },
  },
});
```

### Change styles based on state

Joy UI components increase the CSS specificity of the styles when they are in a given state such as `selected`, `disabled`, `focusVisible`, etc.

To override styles of a specific state, import the component's class selector using its name in camel-case followed by `Classes`.

```js
import { listItemButtonClasses } from '@mui/joy/ListItemButton';

extendTheme({
  components: {
    JoyListItemButton: {
      styleOverrides: {
        root: {
          [`&.${listItemButtonClasses.selected}`]: {
            color: 'rgba(255 255 255 / 0.7)',
          },
        },
      },
    },
  },
});
```

The available states are: `active`, `checked`, `completed`, `disabled`, `error`, `expanded`, `focused`, `focusVisible`, `readOnly`, `required`, `selected`.

### Extend colors

The following code snippet illustrates how to provide additional colors to a component beyond `primary`, `success`, `info`, `danger`, `neutral`, and `warning`.

Note that by creating new colors, you're automatically opting out of the [global variant feature](/joy-ui/main-features/global-variants/), which gives you fine-grained control over CSS properties like `color`, `background`, and `border`.

The example below extends the Button colors to include `secondary` value:

```js
extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'secondary' && {
            color: theme.vars.palette.text.secondary,
            backgroundColor: theme.vars.palette.background.level1,
          }),
        }),
      },
    },
  },
});
```

Once these values are defined as above, you can make use of them directly on instances of the Button component:

```jsx
<Button color="secondary">Secondary color</Button>
<Button color="tertiary">Tertiary color</Button>
```

#### TypeScript

Module augmentation is required to pass the values to the `color` prop of the component.

The interface format is `{ComponentName}PropsColorOverrides`, which is the same for all Joy UI components:

```tsx
// This part could be declared in your theme file
declare module '@mui/joy/Button' {
  interface ButtonPropsColorOverrides {
    secondary: true;
    tertiary: true;
  }
}

// typed-safe
<Button color="secondary" />
<Button color="tertiary" />
```

### Extend sizes

The following code snippet illustrates how to provide additional sizes to a component beyond `sm`, `md`, and `lg`.
We recommend following the established "t-shirt size" naming convention (for example `xs`, `xl`, `xxl`, etc.) to maintain consistency with all the other props.

The example below extends the Button sizes to include `xs` and `xl` values:

```js
extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.size === 'xs' && {
            '--Icon-fontSize': '1rem',
            '--Button-gap': '0.25rem',
            minHeight: 'var(--Button-minHeight, 1.75rem)',
            fontSize: theme.vars.fontSize.xs,
            paddingBlock: '2px',
            paddingInline: '0.5rem',
          }),
          ...(ownerState.size === 'xl' && {
            '--Icon-fontSize': '2rem',
            '--Button-gap': '1rem',
            minHeight: 'var(--Button-minHeight, 4rem)',
            fontSize: theme.vars.fontSize.xl,
            paddingBlock: '0.5rem',
            paddingInline: '2rem',
          }),
        }),
      },
    },
  },
});
```

Once these values are defined as above, you can make use of them directly on instances of the Button component:

```jsx
<Button size="xs">Extra small</Button>
<Button size="xl">Extra large</Button>
```

The properties used for extending sizes should only relate to the density or the dimensions of the component.
To learn how to extend variant properties, check out the [Extend variants](#extend-variants) section in this document.

#### TypeScript

Module augmentation is required to pass the values to the `size` prop of the component.

The interface format is `{ComponentName}PropsSizeOverrides`, which is the same for all Joy UI components:

```tsx
// This part could be declared in your theme file
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

### Extend variants

The following code snippet shows how to extend component variants for color properties.
Note that by creating new variants, you're automatically opting out of the [global variant feature](/joy-ui/main-features/global-variants/), which gives you fine-grained control over CSS properties like `color`, `background`, and `border`.

This example extends the Sheet variant to include a custom value named `glass`:

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

Once the value is defined as above, you can make use of it directly on instances of the Sheet component:

```jsx
<Sheet variant="glass">Glassmorphism</Sheet>
```

#### TypeScript

Module augmentation is required to pass the values to the `variant` prop of the component.

The interface format is `{ComponentName}PropsSizeOverrides`, which is the same for all Joy UI components:

```tsx
// This part could be declared in your theme file
declare module '@mui/joy/Sheet' {
  interface SheetPropsVariantOverrides {
    glass: true;
  }
}

// typed-safe
<Sheet variant="glass" />;
```

### Different styles per mode

To specify different values than the ones defined in the default theme for each mode (light and dark), use the CSS attribute selector.

Joy UI attaches a `data-*` attribute with the current color scheme to the DOM (HTML by default).
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
We don't recommend using the conditional operator to switch between values as it is not performant.

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
