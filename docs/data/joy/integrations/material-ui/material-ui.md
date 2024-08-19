# Using Joy UI and Material UI together

<p class="description">Learn how to use Joy UI and Material UI together in the same project.</p>

## Introduction

There are two main use cases for using them together:

1. Your existing project already uses Material UI but you're willing to explore the new components and style Joy UI offers.
2. You've started your project with Joy UI but you find a key component you need is missing.

:::info
Once Joy UI reaches component parity with Material UI, we recommend that you **_choose one or the other_**. Not only do they have a different design language (and therefore a different theme structure) but they would increase your bundle size as well as potentially create unnecessary complexities.
:::

Additionally, keep these in mind when using them together:

- Both of them use [MUI System](/system/getting-started/) as their style engine, which uses React context for theming.
- Theme scoping must be done on one of the libraries.

### Prerequisites

- Have `@mui/material` and `@mui/joy` installed in your project.
- The version of both libraries must be [v5.12.0](https://github.com/mui/material-ui/releases/tag/v5.12.0) or higher.

## Set up the providers

Render Joy UI's `CssVarsProvider` inside Material UI's provider and use `THEME_ID` to separate the themes from each other.

```js
import {
  extendTheme as materialExtendTheme,
  CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';

const materialTheme = materialExtendTheme();

export default function App() {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />
        ...Material UI and Joy UI components
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
```

<iframe src="https://codesandbox.io/embed/using-joy-ui-and-material-ui-together-qrsz2h?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:400px; border:0; border-radius: 4px; overflow:hidden;"
     title="Joy UI - Human Interface Guidelines Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Sync the color mode

To sync the color mode between the providers, call `setMode` from both of the libraries:

```js
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';

const ModeToggle = () => {
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
  const { setMode: setJoyMode } = useJoyColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    // prevent server-side rendering mismatch
    // because `mode` is undefined on the server.
    return null;
  }
  return (
    <IconButton
      onClick={() => {
        setMaterialMode(mode === 'dark' ? 'light' : 'dark');
        setJoyMode(mode === 'dark' ? 'light' : 'dark');
      }}
    >
      {/** You can use `mode` from Joy UI or Material UI since they are synced **/}
      {mode === 'dark' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};
```

## Caveat

Both libraries have the same class name prefix:

```js
import MaterialTypography, {
  typographyClasses as materialTypographyClasses,
} from '@mui/material/Typography';
import JoyTypography, {
  typographyClasses as joyTyographyClasses,
} from '@mui/joy/Typography';
import Stack from '@mui/material/Stack';

<Stack
  sx={{
    // similar to `& .${joyTyographyClasses.root}`
    [`& .${materialTypographyClasses.root}`]: {
      color: 'red',
    },
  }}
>
  {/* Both components are red. */}
  <MaterialTypography>Red</MaterialTypography>
  <JoyTypography>Red</JoyTypography>
</Stack>;
```

Joy UI and Material UI components have a different name for [theming the components](/joy-ui/customization/themed-components/#component-identifier). For example, Joy UI's Button uses `JoyButton` whereas Material UI's Button uses `MuiButton`.
