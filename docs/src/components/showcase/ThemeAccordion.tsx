import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Folder from '@material-ui/icons/Folder';

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

export default function ThemeAccordion() {
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
          divider: mode === 'dark' ? primaryDark[500] : grey[200],
          grey,
          background: {
            paper: mode === 'dark' ? primaryDark[800] : '#fff',
          },
          ...(mode === 'light' && {
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }),
          ...(mode === 'dark' && {
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }),
        },
        typography: {
          fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
        },
        shape: {
          borderRadius: 10,
        },
        spacing: 10,
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                '&.Mui-expanded': {
                  margin: 0,
                },
                '&:not(:first-of-type)': {
                  marginTop: -1,
                },
              },
            },
          },
          MuiAccordionSummary: {
            styleOverrides: {
              root: {
                '&.Mui-expanded': {
                  minHeight: 'auto',
                },
              },
              content: {
                flexDirection: 'column',
                margin: '20px 0 !important',
                '& svg': {
                  color: mode === 'dark' ? grey[800] : grey[500],
                  marginRight: 20,
                },
              },
              expandIconWrapper: {
                color: primary[500],
              },
            },
          },
          MuiAccordionDetails: {
            styleOverrides: {
              root: {
                paddingTop: 0,
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Accordion variant="outlined">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{ display: 'flex' }}>
              <Folder fontSize="small" />
              <div>
                <Typography>Fonts</Typography>
                <Typography variant="body2" color="text.secondary">
                  Typefaces used in this branding project.
                </Typography>
              </div>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Tag line headings (h1, h2) use Plus Jakarta Sans, whereas the rest of the elements
              use IBM Plex Sans.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion variant="outlined">
          <AccordionSummary
            disabled
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Box sx={{ display: 'flex' }}>
              <Folder fontSize="small" />
              <div>
                <Typography>Libs</Typography>
                <Typography variant="body2" color="text.secondary">
                  Cool ones we used on some our apps.
                </Typography>
              </div>
            </Box>
          </AccordionSummary>
        </Accordion>
      </div>
    </ThemeProvider>
  );
}
