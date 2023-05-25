import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Stack,
} from '@mui/joy';
import useScript from './useScript';
import FirstSidebar from './components/FirstSidebar';
import Header from './components/Header';
import ColorSchemeToggle from './components/ColorSchemeToggle';
import customTheme from './theme';
import CountrySelector from './components/CountrySelector';
import RentalCard from './components/RentalCard';

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
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={12} md={8}>
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
                  <Typography level="body1" color="neutral">
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

                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <Input
                      startDecorator="$"
                      type="number"
                      placeholder="Any price"
                    />
                  </FormControl>
                  <Button
                    variant="outlined"
                    color="neutral"
                    startDecorator={<i data-feather="filter" />}
                  >
                    More filters
                  </Button>
                </Stack>
                <Stack spacing={2} direction="row">
                  <FormControl sx={{ flex: 1 }}>
                    {/* todo: remove label but make sure its still accessible */}
                    <FormLabel>Search</FormLabel>
                    <Input
                      placeholder="Search"
                      startDecorator={<i data-feather="search" />}
                    />
                  </FormControl>
                  <Button variant="outlined" color="neutral">
                    Clear
                  </Button>
                  <Button variant="solid" color="primary">
                    Search
                  </Button>
                </Stack>
              </div>
              <Stack spacing={2} direction="row">
                <div>Sort by date</div>
                <div>Sort by price</div>
              </Stack>
              <RentalCard />
              <RentalCard />
              <RentalCard />
              <RentalCard />
              <Divider />
              Pagination
            </Box>
          </Grid>
          <Grid xs={12} md={3}>
            <Divider orientation="vertical" />
            <Box sx={{ backgroundColor: 'red', height: 500 }}>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?auto=format&fit=crop&w=1000"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </CssVarsProvider>
  );
}
