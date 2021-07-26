import * as React from 'react';
import { ThemeProvider, createTheme, ThemeOptions } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';
import CodeRounded from '@material-ui/icons/CodeRounded';
import GradientText from 'docs/src/components/GradientText';
import ProductsSwitcher from 'docs/src/components/home/ProductsSwitcher';

import { brandingDesignTokens } from 'docs/src/modules/brandingTheme';

const darkBrandingTheme = createTheme({
  ...brandingDesignTokens,
  palette: {
    ...brandingDesignTokens.palette,
    background: {
      paper: brandingDesignTokens.palette.primary[900],
    },
    mode: 'dark',
  },
} as ThemeOptions);

const MaterialDesignDemo = () => {
  return (
    <Card
      elevation={4}
      sx={{
        display: 'flex',
        p: 1.5,
      }}
    >
      <Avatar src="/static/images/avatar/1.jpg" variant="rounded" sx={{ mr: 1.5 }} />
      <div>
        <Typography component="div" variant="caption" color="text.secondary">
          Today at 09:40 AM
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <Typography component="div" mr={0.5} mb={0.5} fontWeight="bold">
            Merge pull request{' '}
            <Link href="/" underline="none">
              #2021
            </Link>{' '}
            from{' '}
          </Typography>
          <Chip
            size="small"
            label="mui-org/master"
            color="success"
            onClick={() => {}}
            sx={{ mb: 0.5 }}
          />
        </Box>
        <Typography component="div" variant="caption" mb={1.5} color="grey.800">
          Committed by{' '}
          <Link href="/" underline="none" fontWeight="bold">
            Olivier Tassinari
          </Link>
        </Typography>

        <Button variant="outlined" size="small" startIcon={<ContentCopyRounded />} sx={{ mr: 1 }}>
          i88jjd43
        </Button>
        <IconButton size="small">
          <CodeRounded fontSize="small" />
        </IconButton>
      </div>
      {/* <IconButton size="small" sx={{ alignSelf: 'flex-start', ml: 1.5 }}>
        <MoreVert fontSize="small" />
      </IconButton> */}
    </Card>
  );
};

const defaultTheme = createTheme();

const customTheme = createTheme({
  shape: {
    borderRadius: 10,
  },
  spacing: 10,
  // @ts-ignore
  shadows: [
    'none',
    '0px 2px 8px rgba(170, 180, 190, 0.1)',
    '0px 3px 14px rgba(170, 180, 190, 0.1)',
    '0px 4px 20px rgba(170, 180, 190, 0.1)',
  ],
  typography: {
    fontFamily: '"PlusJakartaSans", sans-serif',
    fontWeightBold: 500,
  },
  palette: {
    primary: {
      main: '#007FFF',
    },
    text: {
      primary: '#3D4752',
      secondary: '#8796A5',
    },
    grey: {
      800: '#5A6978',
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 60,
          height: 60,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #E5E8EC',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
      variants: [
        {
          props: { color: 'success' },
          style: {
            color: '#1AA251',
            backgroundColor: '#d2ffe4',
            '&:hover, &.Mui-focusVisible': {
              backgroundColor: '#C6F6D9',
            },
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
        outlined: {
          borderColor: '#E5E8EC',
        },
        sizeSmall: {
          padding: '4px 10px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          border: '1px solid #E5E8EC',
          color: '#007FFF',
        },
      },
    },
  },
});

const DesignSystems = () => {
  const [themeType, setThemeType] = React.useState('default');
  return (
    <Box bgcolor="grey.50" py={8}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Box maxWidth={500}>
              <Typography variant="body1" color="primary" fontWeight="extraBold" mb={1}>
                Products
              </Typography>
              <Typography
                component="h2"
                color="primary.900"
                fontWeight="extraBold"
                fontSize="clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)"
                lineHeight="max(32px, 1.22222em)"
                mb={1}
              >
                Robust components with careful and customizable designs, ready for{' '}
                <GradientText>production</GradientText>.
              </Typography>
              <Typography color="text.secondary">
                We bring together a suite of products integrated to make your life easier and
                happier when it comes to developing React applications.
              </Typography>
            </Box>
            <ProductsSwitcher />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'grey.100', height: '100%' }}
            >
              <Box
                minHeight={300}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  '& .MuiCard-root, & .MuiAvatar-root': {
                    transition: '0.3s',
                  },
                }}
              >
                <ThemeProvider theme={themeType === 'custom' ? customTheme : defaultTheme}>
                  <MaterialDesignDemo />
                </ThemeProvider>
              </Box>
              <ThemeProvider theme={darkBrandingTheme}>
                <Box
                  borderRadius={'0 0 10px 10px'}
                  p={2}
                  m={'-1px'}
                  bgcolor="background.paper"
                  display="flex"
                  flexGrow={1}
                >
                  <Box>
                    <ToggleButtonGroup
                      color="primary"
                      exclusive
                      value={themeType}
                      onChange={(event, value) => setThemeType(value)}
                    >
                      <ToggleButton value="default">Default</ToggleButton>
                      <ToggleButton value="custom">Custom</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Box>
              </ThemeProvider>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DesignSystems;
