import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

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
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7', // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
  400: '#B2BAC2', // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
  500: '#A0AAB4', // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
  600: '#6F7E8C', // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
  700: '#3E5060', // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
  800: '#2D3843', // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
  900: '#1A2027',
};

export default function ThemeChip() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  /*
   * Note: this demo use `theme.palette.mode` from `useTheme` to make dark mode work in MUI's documentation only.
   *
   * Normally, you would implement dark mode via internal state and/or system preference at the root of the application.
   * For more details about toggling modes, go to: https://mui.com/customization/palette/#toggling-color-mode
   */
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: primary[500],
          },
        },
        typography: {
          fontFamily: ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(
            ',',
          ),
          fontWeightRegular: 500,
        },
        shape: {
          borderRadius: 10,
        },
        components: {
          MuiChip: {
            styleOverrides: {
              label: {
                marginBottom: '1px',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                fontWeight: 500,
              },
              filled: {
                color: mode === 'dark' ? '#fff' : grey[800],
                backgroundColor: mode === 'dark' ? grey[800] : grey[200],
                '&.MuiChip-colorPrimary': {
                  backgroundColor: mode === 'dark' ? primary[900] : primary[100],
                  color: mode === 'dark' ? primary[100] : primary[600],
                },
              },
              deleteIcon: {
                color: mode === 'dark' ? grey[500] : grey[800],
                '&:hover': {
                  color: mode === 'dark' ? grey[600] : grey[900],
                },
              },
              deleteIconColorPrimary: {
                color: mode === 'dark' ? primary[100] : primary[600],
                '&:hover': {
                  color: mode === 'dark' ? primary[200] : primary[700],
                },
              },
            },
          },
          MuiLink: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? primary[300] : primary[700],
              },
            },
          },
          MuiPopover: {
            styleOverrides: {
              paper: {
                mt: 0.5,
                minWidth: 160,
                elevation: 0,
                color: mode === 'dark' ? grey[100] : grey[900],
                backgroundImage: 'none',
                backgroundColor: mode === 'dark' ? grey[900] : '#fff',
                boxShadow: `0px 4px 20px ${
                  mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(170, 180, 190, 0.3)'
                }`,
              },
            },
          },
        },
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2}>
        <Chip label="React" color="primary" onDelete={handleClick} />
        <Chip label="Javascript" onDelete={handleClick} />
        <Popover
          id={id}
          sx={{
            mt: 0.5,
          }}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{ p: 1, maxWidth: 320 }}>
            <Typography variant="body2" fontWeight={500}>
              Chip component
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: 13 }} fontWeight={400}>
              Visit the{' '}
              <Link href="/components/chips/#customization">Chip customization section</Link> to
              learn how to customize it so it look lke this.
            </Typography>
          </Box>
        </Popover>
      </Stack>
    </ThemeProvider>
  );
}
