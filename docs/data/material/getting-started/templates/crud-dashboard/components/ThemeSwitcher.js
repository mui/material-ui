import * as React from 'react';
import { useTheme, useColorScheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ThemeSwitcher() {
  const theme = useTheme();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';

  const { mode, setMode } = useColorScheme();

  const paletteMode = !mode || mode === 'system' ? preferredMode : mode;

  const toggleMode = React.useCallback(() => {
    setMode(paletteMode === 'dark' ? 'light' : 'dark');
  }, [setMode, paletteMode]);

  return (
    <Tooltip
      title={`${paletteMode === 'dark' ? 'Light' : 'Dark'} mode`}
      enterDelay={1000}
    >
      <div>
        <IconButton
          aria-label={`Switch to ${paletteMode === 'dark' ? 'light' : 'dark'} mode`}
          onClick={toggleMode}
          sx={{
            color: (theme.vars ?? theme).palette.primary.dark,
          }}
        >
          {theme.getColorSchemeSelector ? (
            <React.Fragment>
              <DarkModeIcon
                sx={{
                  display: 'inline',
                  [theme.getColorSchemeSelector('dark')]: {
                    display: 'none',
                  },
                }}
              />
              <LightModeIcon
                sx={{
                  display: 'none',
                  [theme.getColorSchemeSelector('dark')]: {
                    display: 'inline',
                  },
                }}
              />
            </React.Fragment>
          ) : null}
        </IconButton>
      </div>
    </Tooltip>
  );
}
