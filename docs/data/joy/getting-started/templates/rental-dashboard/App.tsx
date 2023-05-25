import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import useScript from './useScript';
import FirstSidebar from './components/FirstSidebar';
import SecondSidebar from './components/SecondSidebar';
import OrderTable from './components/OrderTable';
import Header from './components/Header';
import ColorSchemeToggle from './components/ColorSchemeToggle';
import customTheme from './theme';
import CountrySelector from './components/CountrySelector';
import { AspectRatio, Card, CardContent, CardOverflow, Stack } from '@mui/joy';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function JoyOrderDashboardTemplate() {
  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== 'undefined') {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  return (
    <CssVarsProvider disableTransitionOnChange theme={customTheme}>
      <GlobalStyles
        styles={{
          '[data-feather], .feather': {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            fontSize: 'var(--Icon-fontSize, 20px)',
            width: '1em',
            height: '1em',
          },
        }}
      />
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <FirstSidebar />
        {/* <SecondSidebar /> */}
        <Box
          component="main"
          className="MainContent"
          sx={(theme) => ({
            px: {
              xs: 2,
              md: 6,
            },
            pt: {
              xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
              sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
              md: 3,
            },
            pb: {
              xs: 2,
              sm: 2,
              md: 3,
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          })}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              my: 1,
              gap: 1,
              flexWrap: 'wrap',
              '& > *': {
                minWidth: 'clamp(0px, (500px - 100%) * 999, 100%)',
                flexGrow: 1,
              },
            }}
          >
            <div>
              <Typography level="h1" fontSize="xl4">
                232 stays in Melbourne
              </Typography>
              <Typography level="h2" fontSize="xl2">
                Book your next stay at one of our properties.
              </Typography>
            </div>
            <Box sx={{ flex: 999 }} />
            <Box sx={{ display: 'flex', gap: 1, '& > *': { flexGrow: 1 } }}>
              <Button variant="outlined" color="neutral">
                Shared
              </Button>
              <Button
                variant="solid"
                color="primary"
                startDecorator={<i data-feather="star" />}
              >
                Save search
              </Button>
              <ColorSchemeToggle
                sx={{ ml: 'auto', display: { xs: 'none', md: 'inline-flex' } }}
              />
            </Box>
          </Box>
          <Divider />
          <div>
            <Stack spacing={2} direction="row">
              <div>
                <CountrySelector />
              </div>
              <div>Jan 6 - Jan 13</div>
              <div>Any price</div>
              <div>More filters</div>
            </Stack>
            <Stack spacing={2} direction="row">
              <div>Search icon</div>
              <div>Search</div>
              <div>Clear</div>
              <div>Search</div>
            </Stack>
          </div>
          <Stack spacing={2} direction="row">
            <div>Sort by date</div>
            <div>Sort by price</div>
          </Stack>
          <Card variant="outlined" orientation="horizontal">
            <CardOverflow>
              <AspectRatio
                ratio="4/3"
                sx={{
                  width: 200,
                  // bgcolor: 'background.level2',
                  borderRadius: 'md',
                }}
              >
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=400"
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent sx={{ px: 2 }}>
              <div>Entire apartment rental in Collingwood</div>
              <div>A Stylish Apt, 5 min walk to Queen Victoria Market</div>
              <div>4.9</div>
              <div>202 reviews</div>
              <div>Rare find</div>
              <Stack spacing={1} direction="row">
                <div>Collingwood VIC</div>
                <div>1 bed</div>
                <div>Wi-Fi</div>
                <div>$540</div>
                <div>total</div>
              </Stack>
            </CardContent>
          </Card>

          {/* <OrderTable /> */}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
