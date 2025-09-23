# Building extensible themes

<p class="description">Learn how to build extensible themes with Material UI.</p>

## Introduction

The extensible theme or in short, base theme, serves as the foundation for branding experience. The base theme is then used to build multiple applications with or without minor tweaks.

This guide focuses on the theming recommendations for building an extensible theme with Material UI.

## Base theme

This is the source of truth for the brand-specific theme. It represents the brand's visual identity like colors, typography, spacing, shape, etc.

In general, it's recommended to export tokens, components, and the the base theme from a file.

```js title="baseTheme.ts"
import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

export const baseTokens: ThemeOptions = {
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: 'rgb(229, 229, 234)',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily:
      'var(--font-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
  },
};

export const baseComponents: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        minWidth: 'unset',
        textTransform: 'capitalize',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
};

const baseTheme = createTheme({
  ...baseTokens,
  components: baseComponents,
});

export default baseTheme;
```

For a more optimized approach, the base components can be split into multiple files and let the application level import only the components that are needed.

```js title="baseButtons.ts"
import type { ThemeOptions } from "@mui/material/styles";

export const buttonTheme: ThemeOptions["components"] = {
  MuiButtonBase: {},
  MuiButton: {},
  MuiIconButton: {},
};
```

```js title="baseTheme.ts"
import { buttonTheme } from './baseButtons';
// import other base components as needed

export const baseTokens: ThemeOptions = {}

export default createTheme({
  ...baseTokens,
  components: {
    ...buttonTheme,
    // other base components
  },
});
```

## Application theme

The application may use the base theme directly or extend it with some tweaks.

For example, to customize the hover styles of the button, do the following:

```js title="appTheme.ts"
import { createTheme } from '@mui/material/styles';
import { baseTokens, baseComponents } from './baseTheme'; // or from an npm package.

const appTheme = createTheme({
  ...baseTokens,
  palette: {
    ...baseTokens.palette,
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    ...baseComponents,
    MuiButton: {
      styleOverrides: {
        root: [
          baseComponents?.MuiButton?.styleOverrides?.root,
          {
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        ],
      },
    },
  },
});
```

:::success
It's recommended to use array syntax to merge the base styles with the application styles.

The array syntax ensures that the [variants](/material-ui/customization/theme-components/#variants), states, and pseudo-classes styles from the base theme are preserved.
:::

:::warning
We don't recommend JavaScript functions or any utilities to do deep merge between the base and the application theme.

Doing so will introduce performance overhead on the first render of the application. The impact depends on the size of the themes.

Instead, use the object spread and array syntax to merge the themes as shown above.
:::

## Full example

{{"demo": "ExtensibleThemes.js", "defaultCodeOpen": true}}
