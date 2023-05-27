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
import Main from './components/Main';
import HeaderSection from './components/HeaderSection';
import Search from './components/Search';
import Filters from './components/Filters';
import Toggles from './components/Toggles';

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
        <Main>
          <Grid container spacing={1.5} sx={{ flexGrow: 1 }}>
            <Grid xs={12} md={8}>
              <React.Fragment>
                <HeaderSection />
                <Filters />
                <Search />
                <Toggles />
                <RentalCard />
                <RentalCard />
                <RentalCard />
                <RentalCard />
                <Divider />
                Pagination
              </React.Fragment>
            </Grid>
            <Grid xs={12} md={3}>
              <Divider orientation="vertical" />
              <Box sx={{ backgroundColor: 'red', height: 500 }}>
                {/* <img
                  alt=""
                  src="https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?auto=format&fit=crop&w=700"
                /> */}
              </Box>
            </Grid>
          </Grid>
        </Main>
      </Box>
    </CssVarsProvider>
  );
}
