# Customization

<p class="description">A guide for customize CSS theme variables in Material UI.</p>

## Theming

The `experimental_extendTheme` is the new API to extend the default theme. It returns a theme that can only be used by the `CssVarsProvider`.

```js
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';

const theme = extendTheme();
// ...custom theme

function App() {
  return <CssVarsProvider theme={theme}>...</CssVarsProvider>;
}
```

:::warning
The `extendTheme` is not the same as [`createTheme`](/material-ui/customization/theming/#createtheme-options-args-theme), do not use theme interchangably.

- `createTheme()` returns a theme for `ThemeProvider`.
- `extendTheme()` returns a theme for `CssVarsProvider`.
  :::

### Color schemes

The major difference from the default approach is the palette customization. With the new `extendTheme` API, you can specify the palette for all color schemes at once (`light` and `dark` are built-in color schemes).

Here is an example of customizing the `primary` palette:

```js
import { pink } from '@mui/material/colors';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: pink[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: pink[400],
        },
      },
    },
  },
});
```

### Components

Customizing components remains the same. We recommend to use the value from `theme.vars` whenever possible for better debugging experience:

```js
const theme = extendTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'primary' && {
              // this is the same as writing:
              // backgroundColor: 'var(--mui-palette-background-paper)',
              backgroundColor: theme.vars.palette.background.paper,
            }),
        }),
      },
    },
  },
});
```

### Channel tokens

A channel token is a variable that consists of color space channels (without the alpha component) separated by a space, e.g. `12 223 31`. It can be combined with the color functions to create a translucent color.

The `extendTheme()` automatically generates channel tokens that are likely to be used frequently from the theme palette. Those colors are suffixed with `Channel`, for example:

```js
theme = extendTheme();

console.log(theme.palette.primary.mainChannel); // '25 118 210'
// This token is generated from `theme.palette.primary.main`.
```

You can use the channel tokens to create a translucent color like this:

```js
const theme = extendTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'primary' && {
              backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`,
            }),
        }),
      },
    },
  },
});
```

:::warning
Don't use comma(`,`) as a separator because the result is not a valid format in CSS:

```js
`rgba(${theme.vars.palette.primary.mainChannel}, 0.12)`, // 🚫 this does not work
`rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`, // ✅ always use `/`
```

:::

## Adding new theme tokens

You can add other key-value pairs to the theme input which will be generated as a part of the CSS theme variables:

```js
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // The best part is that you can refer to the variables wherever you like 🤩
        gradient:
          'linear-gradient(to left, var(--mui-palete-primary-main), var(--mui-palette-primary-dark))',
        border: {
          subtle: 'var(--mui-palette-neutral-200)',
        },
      },
    },
    dark: {
      palette: {
        gradient:
          'linear-gradient(to left, var(--mui-palete-primary-light), var(--mui-palette-primary-main))',
        border: {
          subtle: 'var(--mui-palette-neutral-600)',
        },
      },
    },
  },
});

function App() {
  return <CssVarsProvider theme={theme}>...</CssVarsProvider>;
}
```

You can access those variables from the `theme.vars`:

```js
const Divider = styled('hr')(({ theme }) => ({
  height: 1,
  border: '1px solid',
  borderColor: theme.vars.palette.border.subtile,
  backgroundColor: theme.vars.palette.gradient,
}));
```

### TypeScript

You need to augment the theme palette to avoid the type error:

```ts
declare module '@mui/material/styles' {
  interface PaletteOptions {
    gradient: string;
    border: {
      subtle: string;
    };
  }
  interface Palette {
    gradient: string;
    border: {
      subtle: string;
    };
  }
}
```

## Changing variable prefix

The CSS theme variables have `--mui` as a default prefix, you can change it by passing `cssVarPrefix: string` to the `extendTheme`.

```js
const theme = extendTheme({ cssVarPrefix: 'any' });

// the stylesheet will be like this:
// --any-palette-primary-main: ...;
```

To remove the prefix, use empty string as a value.

```js
const theme = extendTheme({ cssVarPrefix: '' });

// the stylesheet will be like this:
// --palette-primary-main: ...;
```

## Custom styles per mode

To customize the style without creating new tokens, you can use the `theme.getColorSchemeSelector` utility:

```js
const Button = styled('button')(({ theme }) => ({
  // in default mode.
  backgroundColor: theme.vars.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.vars.palette.primary.dark,
  },

  // in dark mode.
  [theme.getColorSchemeSelector('dark')]: {
    backgroundColor: theme.vars.palette.primary.dark,
    color: theme.vars.palette.primary.main,
    '&:hover': {
      color: '#fff',
      backgroundColor: theme.vars.palette.primary.dark,
    },
  },
}));
```

:::info
💡 The utility returns a plain string, `'[data-mui-color-scheme="dark"] &'`, that lets you create a style for a specific color scheme.
:::

## Force a specific color scheme

Specify `data-mui-color-scheme="dark"` to any DOM node to force the children components to appear as if they are in the dark mode.

```js
<div data-mui-color-scheme="dark">
  <Paper sx={{ p: 2 }}>
    <TextField label="Email" type="email" margin="normal" />
    <TextField label="Password" type="password" margin="normal" />
    <Button>Sign in</Button>
  </Paper>
</div>
```

## Dark color scheme application

For an application with just dark mode, set the default mode to `dark`:

```js
const theme = extendTheme({
  // ...
});

// remove the `light` color scheme to optimize the HTML size for server-side application
delete theme.colorSchemes.light;

function App() {
  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      ...
    </CssVarsProvider>
  );
}
```

For a server-side application, provide the same value in [`getInitColorSchemeScript()`](/material-ui/experimental-api/theme-css-variables/usage/#server-side-rendering):

```js
getInitColorSchemeScript({
  defaultMode: 'dark',
});
```

:::info
💡 In development, make sure to clear the local storage and refresh the page after you configure the `defaultMode`.
:::
