# Using Joy UI and Material UI together

<p class="description">Learn how to use Joy UI and Material UI together in the same project.</p>

## Introduction

There are two main use cases for using them together:

1. Your existing project already uses Material UI but you're willing to explore the new components and style Joy UI offers.
2. You've started your project with Joy UI but you find a key component you need is missing.

:::warning
**⚠️ Note:** Once Joy UI reaches component parity with Material UI, we recommend you to _choose one or the other_. Not only do they have a different design language (and therefore a different theme structure) but they would increase your bundle size as well as potentially create unnecessary complexities.
:::

Additionally, keep these in mind when using them together:

- Both of them use [MUI System](/system/basics/) as their syle engine, which uses React context for theming.
- Joy UI requires wrapping your application with the `CssVarsProvider` component but you're able to import it from either @mui/joy or @mui/material.

## Case A: Joy UI in a Material UI project

For this case, the Material UI theme should override the Joy UI's.

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
  shadow: {
    xs: `var(--mui-shadowRing), ${muiTheme.shadows[1]}`,
    sm: `var(--mui-shadowRing), ${muiTheme.shadows[2]}`,
    md: `var(--mui-shadowRing), ${muiTheme.shadows[4]}`,
    lg: `var(--mui-shadowRing), ${muiTheme.shadows[8]}`,
    xl: `var(--mui-shadowRing), ${muiTheme.shadows[12]}`,
  },
});

// Note: you can't put `joyTheme` inside Material UI's `extendMuiTheme(joyTheme)` because
//       some of the values in the Joy UI theme refers to CSS variables abd not raw colors.
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

### CodeSandbox

Visit the following CodeSandbox to preview this use case setup.

[![Edit Joy UI in a Material UI project](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/material-ui-feat-joy-ui-eph5gi?fontsize=12&module=%2Fdemo.tsx&moduleview=1&theme=dark)

## Case B: Material UI in a Joy UI project

This setup uses the `CssVarsProvider` component from Joy UI and configures the Material UI theme to use the tokens from Joy UI.

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

### CodeSandbox

Visit the following CodeSandbox to preview this use case setup.

[![Edit Material UI in a Joy UI project](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/joy-ui-feat-material-ui-cy4nj7?fontsize=12&hidenavigation=1&module=%2Fdemo.tsx&theme=dark)

## TypeScript setup

The snippet can be used with both of the above use cases. Here, we augment the Material UI and Joy UI theme to have the same tokens so that you have the same experience when customizing components via APIs like `styled` or `sx`.

```ts
import type {} from '@mui/material/themeCssVarsAugmentation';
import {
  experimental_extendTheme as extendMuiTheme,
  PaletteColor,
  TypeText,
  TypeAction,
  Overlays,
  PaletteColorChannel,
  PaletteAlert,
  PaletteAppBar,
  PaletteAvatar,
  PaletteChip,
  PaletteFilledInput,
  PaletteLinearProgress,
  PaletteSlider,
  PaletteSkeleton,
  PaletteSnackbarContent,
  PaletteSpeedDialAction,
  PaletteStepConnector,
  PaletteStepContent,
  PaletteSwitch,
  PaletteTableCell,
  PaletteTextChannel,
  PaletteTooltip,
  Shadows,
  zIndex,
} from '@mui/material/styles';
import { Theme as JoyTheme } from '@mui/joy/styles';

type JoyComponents = CssVarsThemeOptions['components'];

// extends Joy theme to include tokens from Material UI
declare module '@mui/joy/styles' {
  interface Palette {
    secondary: PaletteColorChannel;
    error: PaletteColorChannel;
    dividerChannel: string;
    action: TypeAction;
    Alert: PaletteAlert;
    AppBar: PaletteAppBar;
    Avatar: PaletteAvatar;
    Chip: PaletteChip;
    FilledInput: PaletteFilledInput;
    LinearProgress: PaletteLinearProgress;
    Skeleton: PaletteSkeleton;
    Slider: PaletteSlider;
    SnackbarContent: PaletteSnackbarContent;
    SpeedDialAction: PaletteSpeedDialAction;
    StepConnector: PaletteStepConnector;
    StepContent: PaletteStepContent;
    Switch: PaletteSwitch;
    TableCell: PaletteTableCell;
    Tooltip: PaletteTooltip;
  }
  interface PalettePrimary extends PaletteColor {}
  interface PaletteInfo extends PaletteColor {}
  interface PaletteSuccess extends PaletteColor {}
  interface PaletteWarning extends PaletteColor {}
  interface PaletteCommon extends CommonColors {}
  interface PaletteText extends TypeText {}
  interface PaletteBackground extends TypeBackground {}

  interface ThemeVars {
    // attach to Joy UI `theme.vars`
    shadows: Shadows;
    overlays: Overlays;
    zIndex: ZIndex;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    // put everything back to Material UI `theme.vars`
    vars: JoyTheme['vars'];
  }
}
```
