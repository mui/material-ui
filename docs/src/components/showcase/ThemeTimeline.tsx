import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

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
  1000: '#132F4C',
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

export default function BasicTimeline() {
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
          divider: mode === 'dark' ? primaryDark[500] : grey[200],
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
          fontWeightRegular: 500,
        },
        components: {
          // @ts-ignore
          MuiTimelineItem: {
            styleOverrides: {
              root: {
                minHeight: 36,
              },
            },
          },
          MuiTimelineDot: {
            styleOverrides: {
              root: {
                zIndex: 1,
                padding: 3,
                boxShadow: 'none',
                margin: '15px 0',
                border: 'none',
                backgroundColor: primary[500],
              },
            },
          },
          MuiTimelineConnector: {
            styleOverrides: {
              root: {
                margin: '-15px 0',
                backgroundColor: mode === 'dark' ? primaryDark[700] : primary[50],
              },
            },
          },
          MuiTimelineContent: {
            styleOverrides: {
              root: {
                fontSize: '0.875rem',
                color: mode === 'dark' ? grey[100] : grey[800],
              },
            },
          },
        },
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={theme}>
      <Fade in timeout={700}>
        <Card variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'flex-start' }}>
          <Box
            sx={{
              p: 0.5,
              borderRadius: 0.5,
              minWidth: 28,
              textAlign: 'center',
              bgcolor: mode === 'dark' ? 'primary.700' : 'primary.50',
              color: mode === 'dark' ? '#fff' : 'primary.main',
              typography: 'body2',
            }}
          >
            1
          </Box>
          <Box sx={{ ml: 2, flex: 1 }}>
            <Box sx={{ display: 'flex' }}>
              <Typography
                color={mode === 'dark' ? 'grey.400' : 'text.secondary'}
                variant="body2"
                sx={{ mb: 1 }}
              >
                Add these properties:
              </Typography>
              <InfoOutlined fontSize="small" sx={{ ml: 'auto', color: 'grey.500' }} />
            </Box>
            <Timeline
              sx={{
                pl: 0,
                py: 0,
                my: 0,
                '& .MuiTimelineItem-root:before': { display: 'none' },
              }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Margin Top</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Padding Bottom</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>Flexbox</TimelineContent>
              </TimelineItem>
            </Timeline>
          </Box>
        </Card>
      </Fade>
    </ThemeProvider>
  );
}
