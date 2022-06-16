import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/system';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Grid';
import styled from '@mui/system/styled';

declare module '@mui/system' {
  interface BreakpointOverrides {
    laptop: true;
    tablet: true;
    mobile: true;
    desktop: true;
    // You need to uncomment to remove the default breakpoints from the theme.
    // xs: false;
    // sm: false;
    // md: false;
    // lg: false;
    // xl: false;
  }
}

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

export default function CustomBreakpointsGrid() {
  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          // @ts-ignore this can be removed after uncommented the code in the module augmentation above
          values: {
            laptop: 1024,
            tablet: 640,
            mobile: 0,
            desktop: 1280,
          },
        },
      })}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
          {Array.from(Array(4)).map((_, index) => (
            <Grid mobile={6} tablet={4} laptop={3} key={index}>
              <Item>{index + 1}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
