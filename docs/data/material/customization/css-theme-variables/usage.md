# CSS theme variables - Usage

<p class="description">Learn how to adopt CSS theme variables.</p>

## Getting started

The CSS variables API relies on a provider called `CssVarsProvider` to inject styles into Material UI components.
`CssVarsProvider` generates CSS variables out of all tokens in the theme that are serializable, and makes them available in the React context along with the theme itself via [`ThemeProvider`](/material-ui/customization/theming/#theme-provider).

Once the `App` renders on the screen, you will see the CSS theme variables in the HTML `:root` stylesheet.
The variables are flattened and prefixed with `--mui` by default:

<codeblock>

```jsx JSX
import { CssVarsProvider } from '@mui/material/styles';

function App() {
  return <CssVarsProvider>{/* ...you app */}</CssVarsProvider>;
}
```

```css CSS
:root {
  --mui-palette-primary-main: #1976d2;
  --mui-palette-primary-light: #42a5f5;
  --mui-palette-primary-dark: #1565c0;
  --mui-palette-primary-contrastText: #fff;
  /* ...other variables */
}
```

</codeblock>

:::info
The `CssVarsProvider` is built on top of the [`ThemeProvider`](/material-ui/customization/theming/#themeprovider) with extra features like CSS variable generation, storage synchronization, unlimited color schemes, and more.

If you have an existing theme, you can migrate to CSS theme variables by following the [migration guide](/material-ui/migration/migration-css-theme-variables/).
:::

## Dark mode only application

To switch the default light to dark palette, set `colorSchemes: { dark: true }` to the `extendTheme`.
Material UI will generate the dark palette instead.

```jsx
import { CssVarsProvider, extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  colorSchemes: { dark: true },
});

function App() {
  return <CssVarsProvider theme={theme}>{/* ...you app */}</CssVarsProvider>;
}
```

## Light and dark mode application

To support both light and dark modes, set `colorSchemes: { light: true, dark: true }` to the `extendTheme`.
Material UI will generate both light and dark palette with [`@media (prefers-color-scheme)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

<codeblock>

```jsx JSX
import { CssVarsProvider, extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  colorSchemes: { light: true, dark: true },
});

function App() {
  return <CssVarsProvider theme={theme}>{/* ...you app */}</CssVarsProvider>;
}
```

```css CSS
/* generated global stylesheet */

:root {
  --mui-palette-primary-main: #1976d2;
  /* ...other variables */
}

@media (prefers-color-scheme: dark) {
  :root {
    --mui-palette-primary-main: #90caf9;
    /* ...other variables */
  }
}
```

</codeblock>

If you want to manually toggle the color scheme, check out the [advanced configuration](/material-ui/customization/css-theme-variables/configuration/#advanced-configuration).

## Applying dark styles

To customize styles for dark mode, use `theme.applyStyles` function.
This utility function will return the right selector.

The example below shows how to customize the Card component for dark mode:

```js
import Card from '@mui/material/Card';

<Card
  sx={(theme) => ({
    backgroundColor: theme.vars.palette.background.default,
    ...theme.applyStyles('dark', {
      boxShadow: 'none', // remove the box shadow in dark mode
    }),
  })}
/>;
```

## Using theme variables

All of these variables are accessible in an object in the theme called `vars`.
The structure of this object is a serializable theme structure with the values represent CSS variables.

- `theme.vars` (recommended): an object that refers to the CSS theme variables.

  ```js
  const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.vars.palette.primary.main, // var(--mui-palette-primary-main)
    color: theme.vars.palette.primary.contrastText, // var(--mui-palette-primary-contrastText)
  }));
  ```

  For **TypeScript**, the typings are not enabled by default.
  Follow the [TypeScript setup](#typescript) to enable the typings.

  :::success
  If the components need to render outside of the `CssVarsProvider`, add fallback to the theme object.

  ```js
  backgroundColor: (theme.vars || theme).palette.primary.main;
  ```

  :::

- **Native CSS**: if you can't access the theme object, for example in a pure CSS file, you can use [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/var) directly:

  ```css
  /* external-scope.css */
  .external-section {
    background-color: var(--mui-palette-grey-50);
  }
  ```

## Theming

:::warning
`extendTheme` is not the same as [`createTheme`](/material-ui/customization/theming/#createtheme-options-args-theme).
Do not use them interchangeably.

- `createTheme()` returns a theme for `ThemeProvider`.
- `extendTheme()` returns a theme for `CssVarsProvider`.

:::

The major difference from the [`createTheme`](/material-ui/customization/theming/#createtheme-options-args-theme) approach is in palette customization.
With the `extendTheme` API, you can specify the palette for `light` and `dark` color schemes at once. The rest of the theme structure remains the same.

Here are examples of customizing each part of the theme:

<codeblock>

```js color-schemes
import { pink } from '@mui/material/colors';

extendTheme({
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

```js typography
extendTheme({
  typography: {
    fontFamily: '"Inter", "sans-serif"',
    h1: {
      fontSize: customTheme.typography.pxToRem(60),
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: customTheme.typography.pxToRem(48),
      fontWeight: 600,
      lineHeight: 1.2,
    },
  },
});
```

```js spacing
extendTheme({
  spacing: '0.5rem',
});
```

```js shape
extendTheme({
  shape: {
    borderRadius: 12,
  },
});
```

```js components
extendTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          variants: [
            {
              props: { variant: 'outlined', color: 'primary' },
              style: {
                backgroundColor: theme.vars.palette.background.paper,
              },
            },
          ],
        }),
      },
    },
  },
});
```

</codeblock>

### Channel tokens

A channel token is used for creating translucent color. It is a variable that consists of [color space channels](https://www.w3.org/TR/css-color-4/#color-syntax) but without the alpha component. The value of a channel token is separated by a space, for example `12 223 31`, which can be combined with the [color functions](https://www.w3.org/TR/css-color-4/#color-functions) to create a translucent color.

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
        root: ({ theme }) => ({
          variants: [
            {
              props: { variant: 'outlined', color: 'primary' },
              style: {
                backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`,
              },
            },
          ],
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

### Adding new theme tokens

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
  borderColor: theme.vars.palette.border.subtle,
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
If you're using a [custom prefix](/material-ui/customization/css-theme-variables/configuration/#customizing-variable-prefix), make sure to replace the default `--mui`.
:::

For **TypeScript**, you need to augment the [palette interfaces](#palette-interfaces).

## TypeScript

The theme variables type is not enabled by default. You need to import the module augmentation to enable the typings:

```ts
// The import can be in any file that is included in your `tsconfig.json`
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';

const StyledComponent = styled('button')(({ theme }) => ({
  // ✅ typed-safe
  color: theme.vars.palette.primary.main,
}));
```

### Palette interfaces

To add new tokens to the theme palette, you need to augment the `PaletteOptions` and `Palette` interfaces:

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

## Next steps

If you need to support system preference and manual selection, check out the [advanced configuration](/material-ui/customization/css-theme-variables/configuration/)
