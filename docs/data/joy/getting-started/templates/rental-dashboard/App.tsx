import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import { Grid, Stack } from '@mui/joy';
import useScript from './useScript';
import FirstSidebar from './components/FirstSidebar';
import Header from './components/Header';
import customTheme from './theme';
import RentalCard from './components/RentalCard';
import Main from './components/Main';
import HeaderSection from './components/HeaderSection';
import Search from './components/Search';
import Filters from './components/Filters';
import Toggles from './components/Toggles';
import Pagination from './components/Pagination';

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
          <Grid
            container
            sx={{
              width: '100%',
              height: '100dvh',
              // backgroundColor: 'orange',
              margin: 0,
            }}
            // flexDirection={{ xs: 'column-reverse', md: 'row' }}
          >
            <Grid
              xs={12}
              lg={8}
              sx={{
                // backgroundColor: 'blue',
                overflowY: 'scroll',
                height: '100%',
                px: { xs: 2, md: 4 },
                pt: { xs: 8, md: 4 },
                pb: 5,
              }}
            >
              <Stack spacing={2}>
                <HeaderSection />
                <Divider />
                <Box
                  sx={{
                    width: '100%',
                    height: 360,
                    backgroundSize: 'cover',
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?auto=format&fit=crop&w=700")',
                  }}
                  display={{ xs: 'block', md: 'none' }}
                />
                <Filters />
                <Search />
                <Toggles />
                <RentalCard
                  title="A Stylish Apt, 5 min walk to Queen Victoria Market"
                  category="Entire apartment rental in Collingwood"
                  rareFind
                  image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
                />
                <RentalCard
                  title="Designer NY style loft"
                  category="Entire loft in central business district"
                  liked
                  image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400"
                />
                <RentalCard
                  title="5 minute walk from University of Melbourne"
                  category="Entire rental unit in Carlton"
                  image="https://images.unsplash.com/photo-1537726235470-8504e3beef77?auto=format&fit=crop&w=400"
                />
                <RentalCard
                  title="Magnificent apartment next to public transport"
                  category="Entire apartment rental in Collingwood"
                  image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400"
                />
                <Divider />
                <Pagination />
              </Stack>
            </Grid>
            <Grid xs={0} lg={4}>
              <Stack direction="row">
                <Divider orientation="vertical" sx={{ height: '100dvh' }} />
                <Box
                  sx={{
                    width: '100%',
                    m: 1.5,
                    backgroundSize: 'cover',
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?auto=format&fit=crop&w=700")',
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Main>
      </Box>
    </CssVarsProvider>
  );
}
