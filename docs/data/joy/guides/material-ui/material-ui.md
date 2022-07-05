# Using Joy and Material UI together

<p class="description">A how-to-guide for using Joy and Material UI together in the same project.</p>

## Caveat

The purpose of this guide is to help developers set up Joy and Material UI together for these specific needs:

- The existing project uses Material UI but want to try new components from Joy UI.
- Starts a project with Joy UI but there is no built-in components eg. Menu, so have to leverage Material UI components.

:::warning
Once Joy has parity of components in the future, we do not recommend to use both of them together because they follow different design guidelines. Having multiple design guidelines in the same project could create unnecessary complexities and increase the bundle size.
:::

Here are some details that you need to be aware of when using Joy and Material UI together:

- Joy and Material UI use the same **style engine** from `@mui/system` which share the same react context for theming.
- Joy components need `CssVarsProvider` (either from `@mui/joy` or `@mui/material`).
- The theme structure of Joy and Material UI is not exactly the same but can be merged.

## Joy UI in Material UI project

This setup is for the project that:

- uses Material UI as a starting point but want to try new components from Joy UI.
- might transition to Joy UI in the future.

In this use case, the Material UI theme should overrides the theme from Joy UI:

```js
import { deepmerge } from '@mui/utils';
import {
  useColorScheme,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendMuiTheme,
} from '@mui/material/styles';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';

const joyTheme = extendJoyTheme({
  // This is required to point to `var(--mui-*)` because we are using `CssVarsProvider` from Material UI.
  cssVarPrefix: 'mui',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          ...blue,
          solidColor: 'var(--mui-palette-primary-contrastText)',
          solidBg: 'var(--mui-palette-primary-main)',
          solidHoverBg: 'var(--mui-palette-primary-dark)',
          plainColor: 'var(--mui-palette-primary-main)',
          plainHoverBg:
            'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
          plainActiveBg: 'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
          outlinedBorder: 'rgba(var(--mui-palette-primary-mainChannel) / 0.5)',
          outlinedColor: 'var(--mui-palette-primary-main)',
          outlinedHoverBg:
            'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
          outlinedHoverBorder: 'var(--mui-palette-primary-main)',
          outlinedActiveBg: 'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
        },
        neutral: {
          ...grey,
        },
        // Do the same for `danger`, `info`, `success`, `warning`,
        divider: 'var(--mui-palette-divider)',
        text: {
          tertiary: 'rgba(0 0 0 / 0.56)',
        },
      },
    },
    // Do the same for dark mode
    // dark: { ... }
  },
  fontFamily: {
    display: '"Roboto","Helvetica","Arial",sans-serif',
    body: '"Roboto","Helvetica","Arial",sans-serif',
  },
  shadow: {
    xs: `var(--mui-shadowRing), ${muiTheme.shadows[1]}`,
    sm: `var(--mui-shadowRing), ${muiTheme.shadows[2]}`,
    md: `var(--mui-shadowRing), ${muiTheme.shadows[4]}`,
    lg: `var(--mui-shadowRing), ${muiTheme.shadows[8]}`,
    xl: `var(--mui-shadowRing), ${muiTheme.shadows[12]}`,
  },
});

// Note: you can't put `joyTheme` inside Material UI's `extendMuiTheme(joyTheme)` because
//       some of the values in joy theme refers to CSS variables, not the raw color.
const muiTheme = extendMuiTheme();

// You can use your own `deepmerge` function.
// muiTheme will deeply merge to joyTheme.
const theme = deepmerge(joyTheme, muiTheme);

export default function App() {
  return (
    <CssVarsProvider theme={theme}>
      ...Material UI and Joy UI components
    </CssVarsProvider>
  );
}
```

### TypeScript

You need to augment Material UI theme to include theme tokens from Joy UI:

```ts
// This will attach `vars` types to the theme
import type {} from '@mui/material/themeCssVarsAugmentation';
import { CssVarsThemeOptions, PaletteRange, Variants } from '@mui/joy/styles';

type JoyComponents = CssVarsThemeOptions['components'];

declare module '@mui/material/styles' {
  interface Theme {
    variants: Variants;
  }

  interface Components extends JoyComponents {}

  interface PaletteColor extends PaletteRange {}
}
```

### Code sandbox

Open the code sandbox to see the full setup and preview.

[![Edit Material UI feat. Joy UI](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/material-ui-feat-joy-ui-eph5gi?fontsize=12&module=%2Fdemo.tsx&moduleview=1&theme=dark)

## Material UI in Joy UI project

This setup uses `CssVarsProvider` from Joy UI and configures Material UI theme to use the tokens from Joy.

```js
import { deepmerge } from '@mui/utils';
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import colors from '@mui/joy/colors';
import {
  extendTheme as extendJoyTheme,
  CssVarsProvider,
  useColorScheme,
} from '@mui/joy/styles';

const muiTheme = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using `CssVarsProvider` from Joy UI.
  cssVarPrefix: 'joy',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.blue[500],
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: colors.purple[500],
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        info: {
          main: colors.purple[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});

const joyTheme = extendJoyTheme();

// You can use your own `deepmerge` function.
// joyTheme will deeply merge to muiTheme.
const theme = deepmerge(muiTheme, joyTheme);

export default function App() {
  return (
    <CssVarsProvider theme={theme}>
      ...Material UI and Joy UI components
    </CssVarsProvider>
  );
}
```

### Code sandbox

Open the code sandbox to see the full setup and preview.

[![Edit Joy UI feat. Material UI](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/joy-ui-feat-material-ui-cy4nj7?fontsize=12&hidenavigation=1&module=%2Fdemo.tsx&theme=dark)
