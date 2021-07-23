import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

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

export default function BasicTimeline() {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary,
          text: {
            primary: '#3D4752',
            secondary: '#5A6978',
          },
          background: {
            paper: mode === 'dark' ? primary[800] : '#fff',
          },
        },
        shape: {
          borderRadius: 10,
        },
        spacing: 10,
        typography: {
          fontFamily: [
            '"PlusJakartaSans"',
            '-apple-system',
            'BlinkMacSystemFont',
            'sans-serif',
          ].join(','),
          fontWeightRegular: 500,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              outlined: {
                boxShadow: '0px 20px 25px rgba(0, 0, 0, 0.1)',
                borderColor: mode === 'dark' ? '#132F4C' : '#E5E8EC',
              },
            },
          },
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
                backgroundColor: mode === 'dark' ? primary[700] : primary[50],
              },
            },
          },
          MuiTimelineContent: {
            styleOverrides: {
              root: {
                fontSize: '0.875rem',
                color: mode === 'dark' ? '#EAEEF3' : '#5A6978',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Card variant="outlined" sx={{ p: 2, maxWidth: 270 }}>
        <Box display="flex" alignItems="flex-start">
          <Box
            p={0.5}
            mt={0.75}
            borderRadius={1}
            minWidth={28}
            textAlign="center"
            bgcolor={mode === 'dark' ? 'primary.700' : 'primary.50'}
            color={mode === 'dark' ? '#fff' : 'primary.main'}
            typography="body2"
          >
            1
          </Box>
          <Box ml={2}>
            <Typography
              color={mode === 'dark' ? 'grey.400' : 'text.secondary'}
              variant="body2"
              my={1}
            >
              Add space and style to the account
            </Typography>
            <Timeline
              sx={{
                pl: 0,
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
        </Box>
      </Card>
    </ThemeProvider>
  );
}
