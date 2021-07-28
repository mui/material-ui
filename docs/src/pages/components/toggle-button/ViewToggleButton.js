import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

import ViewQuiltRounded from '@material-ui/icons/ViewQuiltRounded';
import ViewModuleRounded from '@material-ui/icons/ViewModuleRounded';
import ViewAgendaRounded from '@material-ui/icons/ViewAgendaRounded';
import ViewWeekRounded from '@material-ui/icons/ViewWeekRounded';
import ViewSidebarRounded from '@material-ui/icons/ViewSidebarRounded';

const primary = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#EAEEF3',
  200: '#E5E8EC',
  300: '#D7DCE1',
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#96A3B0',
  700: '#8796A5',
  800: '#5A6978',
  900: '#3D4752',
};

const views = ['quilt', 'module', 'agenda', 'week', 'sidebar'];

const viewIcons = {
  quilt: <ViewQuiltRounded />,
  module: <ViewModuleRounded />,
  agenda: <ViewAgendaRounded />,
  week: <ViewWeekRounded />,
  sidebar: <ViewSidebarRounded />,
};

export default function ViewToggleButton() {
  const [view, setView] = React.useState('quilt');
  /*
   * Note: this demo use `theme.palette.mode` from `useTheme` to make dark mode works in the documentation only.
   *
   * Normally, you would implement dark mode via internal state and/or system preference at the root of the application.
   * For more detail about toggling dark mode: https://next.material-ui.com/customization/palette/#toggling-color-mode
   */
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary,
          divider: mode === 'dark' ? primary[900] : grey[200],
          grey,
        },
        typography: {
          fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(
            ',',
          ),
        },
        shape: {
          borderRadius: 10,
        },
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
          MuiToggleButtonGroup: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? primary[800] : '#fff',
              },
            },
          },
          MuiToggleButton: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? '#fff' : grey[400],
                '&.Mui-selected': {
                  color: mode === 'dark' ? primary[300] : primary[500],
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={view}
        exclusive
        onChange={(event, value) => setView(value)}
        aria-label="view"
      >
        {views.map((item) => (
          <ToggleButton key={item} value={item} aria-label={item}>
            {viewIcons[item]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
