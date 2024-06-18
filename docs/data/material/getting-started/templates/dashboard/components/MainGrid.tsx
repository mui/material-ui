import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import PageViewsChart from './PageViewsChart';
import StatCard, { StatCardProps } from './StatCard';

const data: StatCardProps[] = [
  {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [2, 4, 3, 5, 7, 6, 8, 10],
  },
  {
    title: 'Conversions',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [10, 7, 6, 8, 5, 4, 4, 2],
  },
  {
    title: 'Event count',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [5, 4, 6, 3, 4, 3, 7, 6],
  },
];

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} xs={12} sm={6} md={3} lg={3}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid xs={12} sm={6} md={3} lg={3}>
          <HighlightedCard />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        direction={{ xs: 'row-reverse', md: 'row' }}
        columns={12}
      >
        <Grid xs={12} md={8} lg={9}>
          <Stack spacing={2}>
            <PageViewsBarChart />
            <PageViewsChart />
            <CustomizedDataGrid />
          </Stack>
        </Grid>
        <Grid xs={12} md={4} lg={3}>
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row', md: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
            <Copyright sx={{ my: 4 }} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
