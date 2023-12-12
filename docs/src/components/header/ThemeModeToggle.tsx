import * as React from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';

function CssVarsModeToggle(props: { onChange: (checked: boolean) => void }) {
  const [mounted, setMounted] = React.useState(false);
  const { mode, systemMode, setMode } = useColorScheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const calculatedMode = mode === 'system' ? systemMode : mode;
  return (
    <Tooltip title={calculatedMode === 'dark' ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton
        color="primary"
        disableTouchRipple
        disabled={!calculatedMode}
        onClick={() => {
          props.onChange(calculatedMode === 'light');
          setMode(calculatedMode === 'dark' ? 'light' : 'dark');
        }}
      >
        {!calculatedMode || !mounted
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
  const [mode, setMode] = React.useState<string | null>(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  React.useEffect(() => {
    let initialMode = 'system';
    try {
      initialMode = localStorage.getItem('mui-mode') || initialMode;
    } catch (error) {
      // do nothing
    }
    setMode(initialMode);
  }, []);

  const handleChangeThemeMode = (checked: boolean) => {
    const paletteMode = checked ? 'dark' : 'light';
    setMode(paletteMode);

    try {
      localStorage.setItem('mui-mode', paletteMode); // syncing with homepage, can be removed once all pages are migrated to CSS variables
    } catch (error) {
      // do nothing
    }
    changeTheme({ paletteMode });
  };

  if (mode === null) {
    return <IconButton color="primary" disableTouchRipple />;
  }

  if (theme.vars) {
    // Temporarily renders conditionally because `useColorScheme` could not be used in the pages that haven't migrated to CSS theme variables.
    return <CssVarsModeToggle onChange={handleChangeThemeMode} />;
  }

  const checked = mode === 'system' ? prefersDarkMode : mode === 'dark';

  return (
    <Tooltip title={checked ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton
        color="primary"
        disableTouchRipple
        onClick={() => {
          handleChangeThemeMode(!checked);
        }}
      >
        {checked ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}
