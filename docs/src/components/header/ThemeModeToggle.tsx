import * as React from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';
import useLocalStorageState from '@mui/utils/useLocalStorageState';

function CssVarsModeToggle(props: { onChange: (newMode: string) => void }) {
  const { mode, systemMode, setMode } = useColorScheme();
  const calculatedMode = mode === 'system' ? systemMode : mode;

  return (
    <Tooltip title={calculatedMode === 'dark' ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton
        color="primary"
        disableTouchRipple
        disabled={!calculatedMode}
        onClick={() => {
          const newMode = calculatedMode === 'dark' ? 'light' : 'dark';
          props.onChange(newMode);
          setMode(newMode);
        }}
      >
        {!calculatedMode
          ? null
          : {
              light: <DarkModeOutlined fontSize="small" />,
              dark: <LightModeOutlined fontSize="small" />,
            }[calculatedMode]}
      </IconButton>
    </Tooltip>
  );
}

export default function ThemeModeToggle() {
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  const [mode, setMode] = useLocalStorageState('mui-mode', 'system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const systemMode = prefersDarkMode ? 'dark' : 'light';
  const calculatedMode = mode === 'system' ? systemMode : mode;

  React.useEffect(() => {
    changeTheme({ paletteMode: calculatedMode });
  }, [changeTheme, calculatedMode]);

  // Server-side hydration
  if (mode === null) {
    return <IconButton color="primary" disableTouchRipple />;
  }

  if (theme.vars) {
    // Temporarily renders conditionally because `useColorScheme` could not be used in the pages that haven't migrated to CSS theme variables.
    return <CssVarsModeToggle onChange={setMode} />;
  }

  return (
    <Tooltip title={calculatedMode === 'dark' ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton
        color="primary"
        disableTouchRipple
        onClick={() => {
          setMode(calculatedMode === 'dark' ? 'light' : 'dark');
        }}
      >
        {calculatedMode === 'dark' ? (
          <LightModeOutlined fontSize="small" />
        ) : (
          <DarkModeOutlined fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
