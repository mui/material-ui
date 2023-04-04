# Using Joy UI and Material UI together

<p class="description">Learn how to use Joy UI and Material UI together in the same project.</p>

## Introduction

There are two main use cases for using them together:

1. Your existing project already uses Material UI but you're willing to explore the new components and style Joy UI offers.
2. You've started your project with Joy UI but you find a key component you need is missing.

:::success
Once Joy UI reaches component parity with Material UI, we recommend that you _choose one or the other_. Not only do they have a different design language (and therefore a different theme structure) but they would increase your bundle size as well as potentially create unnecessary complexities.
:::

Additionally, keep these in mind when using them together:

- Both of them use [MUI System](/system/getting-started/overview/) as their style engine, which uses React context for theming.
- Theme scoping must be done on one of the libraries based on the use cases below.

## Case A: Joy UI in a Material UI project

For this case, Joy UI theme should be scoped with its `THEME_ID` so that it does not override the Material UI theme:

```js
import { Experimental_CssVarsProvider as MaterialCssVarsProvider } from '@mui/material/styles';
import {
  THEME_ID as JOY_THEME_ID,
  extendTheme as joyExtendTheme,
  CssVarsProvider as JoyCssVarsProvider,
} from '@mui/joy/styles';

const joyTheme = joyExtendTheme({
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
        // Do the same for the `danger`, `info`, `success`, and `warning` palettes,
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
});

export default function App() {
  return (
    <JoyCssVarsProvider theme={{ [JOY_THEME_ID]: joyTheme }}>
      <MaterialCssVarsProvider>
        ...Material UI and Joy UI components
      </MaterialCssVarsProvider>
    </JoyCssVarsProvider>
  );
}
```

:::info
Order of the providers does not matter if joy theme is scoped with its theme id.
:::

### CodeSandbox

Visit the following CodeSandbox to preview this use case setup.

[![Edit Joy UI in a Material UI project](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/material-ui-feat-joy-ui-vvvv59?file=/demo.tsx)

## Case B: Material UI in a Joy UI project

Scope the Material UI theme with its `THEME_ID` so that it does not override the Joy UI theme:

```js
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
} from '@mui/material/styles';
import colors from '@mui/joy/colors';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';

const materialTheme = materialExtendTheme({
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

export default function App() {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>...Material UI and Joy UI components</JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
```

:::info
Order of the providers does not matter if material theme is scoped with its theme id.
:::

### CodeSandbox

Visit the following CodeSandbox to preview this use case setup.

[![Edit Material UI in a Joy UI project](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/joy-ui-feat-material-ui-k86j2j?file=/demo.tsx)

## Caveat

- Both libraries have the same class name prefix:

  ```js
  import MaterialTypography, {
    typographyClasses as muiTypographyClasses,
  } from '@mui/material/Typography';
  import JoyTypography, {
    typographyClasses as joyTyographyClasses,
  } from '@mui/joy/Typography';
  import Stack from '@mui/material/Stack';

  <Stack
    sx={{
      // similar to `& .${joyTyographyClasses.root}`
      [`& .${muiTypographyClasses.root}`]: {
        color: 'red',
      },
    }}
  >
    {/* Both components are red. */}
    <MaterialTypography>Red</MaterialTypography>
    <JoyTypography>Red</JoyTypography>
  </Stack>;
  ```

- Joy UI and Material UI components have different name for [theming the components](/joy-ui/customization/themed-components/#component-identifier). For example, Joy UI's Button uses `JoyButton` whereas Material UI's Button uses `MuiButton`.
