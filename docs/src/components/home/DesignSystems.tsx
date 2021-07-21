import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

import SvgProductCore from 'docs/src/icons/SvgProductCore';
import SvgProductAdvanced from 'docs/src/icons/SvgProductAdvanced';
import SvgProductTemplates from 'docs/src/icons/SvgProductTemplates';
import SvgProductDesign from 'docs/src/icons/SvgProductDesign';
import SvgMuiX from 'docs/src/icons/SvgMuiX';

import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';
import CodeRounded from '@material-ui/icons/CodeRounded';
import GradientText from 'docs/src/components/GradientText';

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
  shadows: ['none', '', '', '0px 4px 20px rgba(170, 180, 190, 0.1)'],
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

function ProductItem({
  icon,
  name,
  description,
}: {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <Box display="flex" alignItems="center" py={2}>
      <Box px={2}>{icon}</Box>
      <Box>
        <Typography color="grey.900" variant="body3" fontWeight="bold">
          {name}
        </Typography>
        <Typography color="text.secondary" variant="body3" fontWeight="regular">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

const DesignSystems = () => {
  const [themeType, setThemeType] = React.useState('default');
  const [productIndex, setProductIndex] = React.useState(0);
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
              <Tabs
                orientation="vertical"
                value={productIndex}
                onChange={(event, value) => setProductIndex(value)}
                sx={{
                  mt: 4,
                  overflow: 'initial',
                  '& .MuiTabs-scroller': { overflow: 'initial !important' },
                  '& .MuiTabs-flexContainer': { position: 'relative', zIndex: 1 },
                  '& .MuiTab-root': {
                    maxWidth: 'initial',
                    textAlign: 'left',
                    padding: 0,
                    alignItems: 'flex-start',
                  },
                  '& .MuiTabs-indicator': {
                    boxShadow: 'rgb(170 180 190 / 10%) 0px 4px 20px',
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'grey.200',
                  },
                }}
              >
                <Tab
                  label={
                    <ProductItem
                      icon={<SvgProductCore />}
                      name="Core"
                      description="Ready to use, forever free, out-of-the-box, components."
                    />
                  }
                  disableRipple
                />
                <Tab
                  label={
                    <ProductItem
                      icon={<SvgProductAdvanced />}
                      name={
                        <Box component="span" display="inline-flex" alignItems="center">
                          Advanced&nbsp; <SvgMuiX />
                        </Box>
                      }
                      description="Powerful components for your complex apps."
                    />
                  }
                  disableRipple
                />
                <Tab
                  label={
                    <ProductItem
                      icon={<SvgProductTemplates />}
                      name="Templates"
                      description="Get a fully built template for you application."
                    />
                  }
                  disableRipple
                />
                <Tab
                  label={
                    <ProductItem
                      icon={<SvgProductDesign />}
                      name="Design Kits"
                      description="Pick your favorite design tool to enjoy."
                    />
                  }
                  disableRipple
                />
              </Tabs>
            </Box>
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DesignSystems;
