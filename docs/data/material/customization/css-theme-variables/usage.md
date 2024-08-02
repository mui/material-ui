# CSS theme variables - Usage

<p class="description">Learn how to adopt CSS theme variables.</p>

## Getting started

To enable CSS theme variables, create a theme with `cssVariables: true` and pass it to the `ThemeProvider`.

Once the `App` renders on the screen, you will see the CSS theme variables in the HTML `:root` stylesheet.
The variables are flattened and prefixed with `--mui` by default:

<codeblock>

```jsx JSX
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({ cssVariables: true });

function App() {
  return <ThemeProvider>{/* ...you app */}</ThemeProvider>;
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
If you are using an experimental API, namely `CssVarsProvider`, replace it with the `ThemeProvider`.
:::

## Dark mode only application

To switch the default light to dark palette, set `palette: { mode: 'dark' }` to the `createTheme`.
Material UI will generate the dark palette instead.

```jsx
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  palette: { mode: 'dark' },
});

function App() {
  return <ThemeProvider theme={theme}>{/* ...you app */}</ThemeProvider>;
}
```

## Light and dark mode application

To support both light and dark modes, set `colorSchemes: { dark: true }` to the `createTheme`.
Material UI will generate both light (default) and dark palette with [`@media (prefers-color-scheme)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) as the default method.

<codeblock>

```jsx JSX
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  colorSchemes: { dark: true },
});

function App() {
  return <ThemeProvider theme={theme}>{/* ...you app */}</ThemeProvider>;
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

:::info
You can explicitly set `colorSchemes: { light: true, dark: true }` which will produce the same result as the snippet above because light is the default color scheme.
:::

The CSS media `prefers-color-scheme` method works with server-side rendering without extra configuration but you will not be able to add an interface for switching between the modes because the styles is based on user preference.

If you want to manually toggle the modes, check out the [Toggling dark mode manually](/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually) guide.

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

:::warning
**Don't** use `theme.palette.mode` to apply between light and dark styles because it will produce a flickering effect.

```js
<Card
  sx={{
    // 🚫 this will cause flickering
    backgroundColor: theme.palette.mode === 'dark' ? '…' : '…',
  }}
/>
```

:::

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

## Color channel tokens

A channel token is used for creating translucent color. It is a variable that consists of [color space channels](https://www.w3.org/TR/css-color-4/#color-syntax) but without the alpha component. The value of a channel token is separated by a space, for example `12 223 31`, which can be combined with the [color functions](https://www.w3.org/TR/css-color-4/#color-functions) to create a translucent color.

When `cssVariables` is enabled, channel tokens are generated automatically. Those colors are suffixed with `Channel`, for example:

```js
const theme = createTheme({ cssVariables: true });

console.log(theme.palette.primary.mainChannel); // '25 118 210'
// This token is generated from `theme.colorSchemes.light.palette.primary.main`.
```

You can use the channel tokens to create a translucent color like this:

```js
const theme = createTheme({
  cssVariables: true,
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

## Adding new theme tokens

You can add other key-value pairs to the theme input which will be generated as a part of the CSS theme variables:

```js
const theme = createTheme({
  cssVariables: true,
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
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
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
If you're using a [custom prefix](/material-ui/customization/css-theme-variables/configuration/#changing-variable-prefixes), make sure to replace the default `--mui`.
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
