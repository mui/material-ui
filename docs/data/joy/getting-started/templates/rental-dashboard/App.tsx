import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import { FormControl, Grid, Input, Stack } from '@mui/joy';
import useScript from './useScript';
import FirstSidebar from './components/FirstSidebar';
import Header from './components/Header';
import ColorSchemeToggle from './components/ColorSchemeToggle';
import customTheme from './theme';
import RentalCard from './components/RentalCard';
import ToggleGroup from './components/ToggleGroup';
import Main from './components/Main';
import HeaderSection from './components/HeaderSection';
import Search from './components/Search';
import Filters from './components/Filters';

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
                <HeaderSection />
                <div>
                  <Filters />
                  <Search />
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
