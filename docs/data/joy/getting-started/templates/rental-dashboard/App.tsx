import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';

import Header from './components/Header';
import RentalCard from './components/RentalCard';
import Main from './components/Main';
import HeaderSection from './components/HeaderSection';
import Search from './components/Search';
import Filters from './components/Filters';
import Pagination from './components/Pagination';

export default function RentalDashboard() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100dvh',
          minWidth: '100dvw',
        }}
      >
        <Header />
        <Main>
          <Grid
            container
            sx={{
              width: '100%',
              height: '100dvh',
              margin: 0,
            }}
          >
            <Stack justifyContent="space-between" sx={{ height: '100dvh' }}>
              <Stack spacing={2}>
                <Stack
                  sx={{
                    backgroundColor: 'background.surface',
                    px: 4,
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <HeaderSection />
                  <Search />
                </Stack>
                <Box
                  sx={{
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1478860409698-8707f313ee8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4000&q=80")',
                  }}
                  display={{ xs: 'block', md: 'none' }}
                />
                <Stack spacing={2} sx={{ px: 4 }}>
                  <Filters />
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
                </Stack>
              </Stack>
              <Box sx={{ p: 3 }}>
                <Pagination />
              </Box>
            </Stack>
            <Grid
              xs={4}
              sx={{
                display: { xs: 'none', lg: 'block' },
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'background.level1',
                  height: '100dvh',
                  width: '100dvw',
                  backgroundSize: 'cover',
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3731&q=80")',
                }}
              />
            </Grid>
          </Grid>
        </Main>
      </Box>
    </CssVarsProvider>
  );
}
