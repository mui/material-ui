import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CodeRounded from '@mui/icons-material/CodeRounded';

const primary = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  main: '#007FFF',
  500: '#007FFF',
  600: '#0072E5', // vs blueDark 900: WCAG 4.6 AAA (large), APCA 36 Not for reading text
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const theme = createTheme({
  palette: { mode: 'dark', primary },
  shape: {
    borderRadius: 10,
  },
  spacing: 10,
  typography: {
    fontFamily: [
      'IBM Plex Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif',
    ].join(','),
    h6: {
      lineHeight: 1.2,
    },
  },
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            background: `linear-gradient(to right bottom, ${primary.main}, ${primary[700]} 120%)`,
            boxShadow:
              '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)',
          },
        },
      ],
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #fff',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: primary[500],
        },
        bar: {
          borderRadius: 10,
          backgroundColor: '#fff',
        },
      },
    },
  },
});

export default function CustomizedCard() {
  return (
    <ThemeProvider theme={theme}>
      <Fade in timeout={700}>
        <Card
          variant="gradient"
          sx={{
            minWidth: 280,
            maxWidth: 360,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                color="primary.100"
                variant="caption"
                fontWeight={500}
                sx={{ mt: 0.3 }}
              >
                March 25th
              </Typography>
            </Box>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ my: 'auto' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 25,
                height: 25,
                bgcolor: '#fff',
                borderRadius: 0.5,
                p: '2px',
              }}
            >
              <CodeRounded color="primary" fontSize="small" />
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ mt: 1.5, fontWeight: 500 }}
            >
              Check the docs for getting every component API
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Avatar
              imgProps={{ 'aria-labelledby': 'demo-task-card-assigne-name' }}
              src="/static/images/avatar/1-sm.jpeg"
              variant="rounded"
              sx={{ mt: 0.4 }}
            />
            <Box sx={{ ml: 1 }}>
              <Typography variant="caption" color="primary.100" fontWeight={400}>
                Assigned to
              </Typography>
              <Typography
                variant="body2"
                id="demo-task-card-assigne-name"
                fontWeight={500}
              >
                Michael Scott
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: -0.5, mt: 0 }}>
            <LinearProgress
              aria-label="Progress"
              variant="determinate"
              value={60}
              sx={{ flexGrow: 1, mt: 0.3 }}
            />
            <Typography color="primary.200" variant="body2" sx={{ ml: 2 }}>
              <b>60%</b>
            </Typography>
          </Box>
        </Card>
      </Fade>
    </ThemeProvider>
  );
}
