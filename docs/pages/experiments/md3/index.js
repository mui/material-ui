import * as React from 'react';
import {
  experimental_extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
  Tooltip,
  IconButton,
  Button,
  createTheme,
  ThemeProvider,
  useColorScheme,
  Stack,
} from '@mui/material';
import { unstable_capitalize as capitalize } from 'packages/mui-utils';
// Can't use it, it exports only es modules
// import {
//   argbFromHex,
//   hexFromArgb,
//   themeFromSourceColor
// } from "@material/material-color-utilities";
import ColorIcon from '@mui/icons-material/ColorLensOutlined';
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import LightIcon from '@mui/icons-material/LightModeOutlined';

// const generateThemeScheme = async (colorBase) => {
//   const theme = themeFromSourceColor(argbFromHex(colorBase));

//   const palette = {};

//   for (const [key, tonalPalette] of Object.entries(theme.palettes)) {
//     const tones = {};
//     for (const tone of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]) {
//       const color = hexFromArgb(tonalPalette.tone(tone));
//       tones[tone] = color;
//     }
//     palette[key] = tones;
//   }

//   return palette;
// };

// const ColorSwitcher = ({ setPalette }) => {
//   const changeThemeScheme = async () => {
//     const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//     const palette = await generateThemeScheme(randomColor);
//     setPalette(palette);
//   };

//   return (
//     <Tooltip title="Change Color">
//       <IconButton size="large" color="inherit" onClick={changeThemeScheme}>
//         <ColorIcon />
//       </IconButton>
//     </Tooltip>
//   );
// };

const ModeSwitcher = ({ setMode: setModeProp }) => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip title={`Change to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
            setModeProp('dark');
          } else {
            setMode('light');
            setModeProp('light');
          }
        }}
      >
        {mode === 'light' ? <DarkIcon /> : <LightIcon />}
      </IconButton>
    </Tooltip>
  );
};

const variants = ['elevated', 'filled', 'filledTonal', 'outlined', 'text'];

const DemoComponents = () => {
  return (
    <Stack direction="row" gap={1}>
      {variants.map((variant) => (
        <Button variant={variant}>{capitalize(variant)}</Button>
      ))}
    </Stack>
  );
};

// These helpers are setting only the global palette
// The light & dark mode mappings are done automatically
const createCssVarsTheme = (palette) => {
  const cssVarsTheme = experimental_extendTheme({
    // @ts-ignore - this should be added in the theme
    useMaterialYou: true,
    colorSchemes: {
      light: {
        // @ts-ignore
        palette: { md3: palette },
      },
      dark: {
        // @ts-ignore
        palette: { md3: palette },
      },
    },
  });
  return cssVarsTheme;
};

const createMd3Theme = (palette, mode) => {
  const lightTheme = createTheme({
    // @ts-ignore - this should be added in the theme
    useMaterialYou: true,
    ...(palette && {
      palette: { md3: palette },
    }),
  });
  const darkTheme = createTheme({
    palette: { mode: 'dark', ...(palette && { md3: palette }) },
    // @ts-ignore - this should be added in the theme
    useMaterialYou: true,
  });

  return mode === 'light' ? lightTheme : darkTheme;
};

export default function App() {
  const [mode, setMode] = React.useState('light');
  const [palette, setPalette] = React.useState(null);
  return (
    <>
      <CssVarsProvider theme={createCssVarsTheme(palette)}>
        <ModeSwitcher setMode={setMode} />
        {/* <ColorSwitcher setPalette={setPalette} /> */}
        <h1>Css variables - Material You theme</h1>
        <DemoComponents />
      </CssVarsProvider>
      <ThemeProvider theme={createMd3Theme(palette, mode)}>
        <h1>Theme provider - Material You theme</h1>
        <DemoComponents />
      </ThemeProvider>
    </>
  );
}
