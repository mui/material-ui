import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';

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

const primaryDark = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C',
  800: '#001E3C',
  900: '#0A1929',
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

export default function ThemeDatePicker() {
  const [value, setValue] = React.useState(new Date());
  /*
   * Note: this demo use `theme.palette.mode` from `useTheme` to make dark mode works in the documentation only.
   *
   * Normally, you would implement dark mode via internal state and/or system preference at the root of the application.
   * For more detail about toggling dark mode: https://next.material-ui.com/customization/palette/#toggling-color-mode
   */
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const theme = React.useMemo(() => {
    const baseTheme = createTheme({
      palette: {
        mode,
        primary,
        background: {
          paper: mode === 'dark' ? primaryDark[800] : '#fff',
        },
      },
      shape: {
        borderRadius: 10,
      },
      spacing: 10,
      typography: {
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
        button: {
          textTransform: 'initial',
        },
      },
    });

    return createTheme(baseTheme, {
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableTouchRipple: true,
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: mode === 'dark' ? primary[300] : primary[500],
            },
          },
        },
        MuiCalendarPicker: {
          styleOverrides: {
            root: {
              width: '100%',
              '& .MuiTypography-caption': {
                color: mode === 'dark' ? grey[600] : grey[700],
                height: 24,
              },
              '[role="presentation"]': {
                '& .MuiIconButton-root': {
                  padding: 0,
                },
              },
              '& .PrivatePickersSlideTransition-root': {
                minHeight: 180,
              },
              '& [role="row"]': {
                justifyContent: 'space-around',
              },
              '& .MuiCalendarPicker-viewTransitionContainer > div > div': {
                justifyContent: 'space-around',
              },
            },
          },
        },
        MuiPickersDay: {
          styleOverrides: {
            root: {
              width: 24,
              height: 24,
              color: mode === 'dark' ? primary[200] : grey[800],
              fontWeight: 500,
            },
            today: {
              '&:not(.Mui-selected)': {
                borderColor: baseTheme.palette.primary.main,
              },
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            '& > div': {
              border: '1px solid',
              borderColor: mode === 'dark' ? primaryDark[500] : grey[200],
              borderRadius: 1,
            },
            '& > div > div > div': {
              width: '100%',
            },
          }}
        >
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
