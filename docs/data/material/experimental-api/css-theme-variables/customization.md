# CSS theme variables - Customization

<p class="description">A guide for customizing CSS theme variables in Material UI.</p>

## Theming

`experimental_extendTheme` is an API that extends the default theme. It returns a theme that can only be used by the `Experimental_CssVarsProvider`.

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
`extendTheme` is not the same as [`createTheme`](/material-ui/customization/theming/#createtheme-options-args-theme).
Do not use them interchangeably.

- `createTheme()` returns a theme for `ThemeProvider`.
- `extendTheme()` returns a theme for `CssVarsProvider`.
  :::

### Color schemes

The major difference from the default approach is in palette customization.
With the `extendTheme` API, you can specify the palette for all color schemes at once (`light` and `dark` are built in) under the `colorSchemes` node.

Here's an example of how to customize the `primary` palette:

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

[Component customization](/material-ui/customization/theme-components/) remains the same as the default approach.
We recommend using the value from `theme.vars.*` whenever possible for a better debugging experience:

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

A channel token is a variable that consists of [color space channels](https://www.w3.org/TR/css-color-4/#color-syntax) but without the alpha component. The value of a channel token is separated by a space, e.g. `12 223 31`, which can be combined with the [color functions](https://www.w3.org/TR/css-color-4/#color-functions) to create a translucent color.

The `extendTheme()` automatically generates channel tokens that are likely to be used frequently from the theme palette. Those colors are suffixed with `Channel`, for example:

```js
const theme = extendTheme();
const light = theme.colorSchemes.light;

console.log(light.palette.primary.mainChannel); // '25 118 210'
// This token is generated from `theme.colorSchemes.light.palette.primary.main`.
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
Don't use a comma (`,`) as a separator because the channel colors use empty spaces to define [transparency](https://www.w3.org/TR/css-color-4/#transparency):

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
          'linear-gradient(to left, var(--mui-palette-primary-main), var(--mui-palette-primary-dark))',
        border: {
          subtle: 'var(--mui-palette-neutral-200)',
        },
      },
    },
    dark: {
      palette: {
        gradient:
          'linear-gradient(to left, var(--mui-palette-primary-light), var(--mui-palette-primary-main))',
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

Then, you can access those variables from the `theme.vars` object:

```js
const Divider = styled('hr')(({ theme }) => ({
  height: 1,
  border: '1px solid',
  borderColor: theme.vars.palette.border.subtile,
  backgroundColor: theme.vars.palette.gradient,
}));
```

Or use `var()` to refer to the CSS variable directly:

```css
/* global.css */
.external-section {
  background-color: var(--mui-palette-gradient);
}
```

:::warning
If you're using a [custom prefix](/material-ui/experimental-api/css-theme-variables/customization/#changing-variable-prefixes), make sure to replace the default `--mui`.
:::

### TypeScript

You must augment the theme palette to avoid type errors:

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

## Changing variable prefixes

To change the default variable prefix (`--mui`), provide a string to `cssVarPrefix` property, as shown below:

```js
const theme = extendTheme({ cssVarPrefix: 'any' });

// the stylesheet will be like this:
// --any-palette-primary-main: ...;
```

To remove the prefix, use an empty string as a value:

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
Using this utility is equivalent to writing a plain string `'[data-mui-color-scheme="dark"] &'` if you don't have a custom configuration.
:::

## Force a specific color scheme

Specify `data-mui-color-scheme="dark"` to any DOM node to force the children components to appear as if they are in dark mode.

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

For an application that only has a dark mode, set the default mode to `dark`:

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

For a server-side application, provide the same value to [`getInitColorSchemeScript()`](/material-ui/experimental-api/css-theme-variables/usage/#server-side-rendering):

```js
getInitColorSchemeScript({
  defaultMode: 'dark',
});
```

:::warning
In development, make sure to clear local storage and refresh the page after you configure the `defaultMode`.
:::
