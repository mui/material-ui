import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { FormControl, Grid, Input, Stack } from '@mui/joy';
import useScript from './useScript';
import FirstSidebar from './components/FirstSidebar';
import Header from './components/Header';
import ColorSchemeToggle from './components/ColorSchemeToggle';
import customTheme from './theme';
import CountrySelector from './components/CountrySelector';
import RentalCard from './components/RentalCard';
import ToggleGroup from './components/ToggleGroup';
import Main from './components/Main';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function RentalDashboard() {
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
        <Grid container spacing={1.5} sx={{ flexGrow: 1 }}>
          <Grid xs={12} md={8}>
            <Main>
              <React.Fragment>
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
                <Divider />
                <div>
                  <Stack
                    spacing={1.5}
                    direction={{ xs: 'column', md: 'row' }}
                    useFlexGap // todo: investigate this more - doesn't work now
                  >
                    <div>
                      <CountrySelector />
                    </div>

                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Jan 6 - Jan 13"
                        aria-label="Date"
                      />
                    </FormControl>

                    <FormControl>
                      <Input
                        startDecorator="$"
                        type="number"
                        placeholder="Any price"
                        aria-label="Price"
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
                  <Stack spacing={1.5} direction="row">
                    <FormControl sx={{ flex: 1 }}>
                      <Input
                        placeholder="Search"
                        startDecorator={<i data-feather="search" />}
                        aria-label="Search"
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
                <Stack spacing={1.5} direction="row" justifyContent="space-between">
                  <ToggleGroup
                    options={[
                      { label: 'Sort by date', value: 'date' },
                      { label: 'Sort by price', value: 'price' },
                    ]}
                  />
                  <ToggleGroup
                    options={[
                      { label: <i data-feather="list" />, value: 'list' },
                      { label: <i data-feather="map-pin" />, value: 'map' },
                    ]}
                  />
                </Stack>
                <RentalCard />
                <RentalCard />
                <RentalCard />
                <RentalCard />
                <Divider />
                Pagination
              </React.Fragment>
            </Main>
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
