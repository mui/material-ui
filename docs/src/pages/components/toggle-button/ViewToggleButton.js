import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

import ViewQuiltRounded from '@material-ui/icons/ViewQuiltRounded';
import ViewModuleRounded from '@material-ui/icons/ViewModuleRounded';
import ViewAgendaRounded from '@material-ui/icons/ViewAgendaRounded';
import ViewWeekRounded from '@material-ui/icons/ViewWeekRounded';
import ViewSidebarRounded from '@material-ui/icons/ViewSidebarRounded';

const views = ['quilt', 'module', 'agenda', 'week', 'sidebar'];

const viewIcons = {
  quilt: <ViewQuiltRounded />,
  module: <ViewModuleRounded />,
  agenda: <ViewAgendaRounded />,
  week: <ViewWeekRounded />,
  sidebar: <ViewSidebarRounded />,
};

export default function ToggleButtons() {
  const [view, setView] = React.useState('quilt');
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#007FFF',
          },
          divider: mode === 'dark' ? '#132F4C' : '#E5E8EC',
        },
        typography: {
          fontFamily: [
            '"PlusJakartaSans"',
            '-apple-system',
            'BlinkMacSystemFont',
            'sans-serif',
          ].join(','),
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
                backgroundColor: mode === 'dark' ? '#004C99' : '#fff',
              },
            },
          },
          MuiToggleButton: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? '#fff' : '#BFC7CF',
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
          <ToggleButton value={item} aria-label={item}>
            {viewIcons[item]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
