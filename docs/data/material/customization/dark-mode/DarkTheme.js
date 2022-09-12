import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, useTheme, createTheme } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  borderRadius: 4,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));

const Color = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& div:first-of-type': {
    width: theme.spacing(5),
    height: theme.spacing(5),
    flexShrink: 0,
    marginRight: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
  },
}));

function Demo() {
  const theme = useTheme();

  const item = (color, name, expanded = false, border = false) => (
    <Color item xs={12} sm={6} md={expanded ? 8 : 4}>
      <div
        style={{
          backgroundColor: color,
          border: border ? `1px solid ${theme.palette.divider}` : undefined,
        }}
      />
      <div>
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {color}
        </Typography>
      </div>
    </Color>
  );

  return (
    <Root>
      <Typography gutterBottom sx={{ mb: 1.5 }}>
        Typography
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.text.primary, 'palette.text.primary')}
        {item(theme.palette.text.secondary, 'palette.text.secondary')}
        {item(theme.palette.text.disabled, 'palette.text.disabled')}
      </Grid>
      <Typography gutterBottom sx={{ mt: 4, mb: 1.5 }}>
        Buttons
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.action.active, 'palette.action.active')}
        {item(theme.palette.action.hover, 'palette.action.hover')}
        {item(theme.palette.action.selected, 'palette.action.selected')}
        {item(theme.palette.action.disabled, 'palette.action.disabled')}
        {item(
          theme.palette.action.disabledBackground,
          'palette.action.disabledBackground',
          true,
        )}
      </Grid>
      <Typography gutterBottom sx={{ mt: 4, mb: 1.5 }}>
        Background
      </Typography>
      <Grid container spacing={1}>
        {item(
          theme.palette.background.default,
          'palette.background.default',
          false,
          true,
        )}
        {item(
          theme.palette.background.paper,
          'palette.background.paper',
          false,
          true,
        )}
      </Grid>
      <Typography gutterBottom sx={{ mt: 4, mb: 1.5 }}>
        Divider
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.divider, 'palette.divider')}
      </Grid>
    </Root>
  );
}

const lightTheme = createTheme();
const darkTheme = createTheme({
  palette: {
    // Switching the dark mode on is a single property value change.
    mode: 'dark',
  },
});

export default function DarkTheme() {
  // Note that if you intend to use two or more themes at the same time on your site,
  // you need to wrap them with a single ThemeProvider at the root (not like in this example).
  return (
    <Box sx={{ width: '100%' }}>
      <ThemeProvider theme={darkTheme}>
        <Demo />
      </ThemeProvider>
      <ThemeProvider theme={lightTheme}>
        <Demo />
      </ThemeProvider>
    </Box>
  );
}
