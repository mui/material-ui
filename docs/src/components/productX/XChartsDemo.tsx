import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { mangoFusionPalette } from '@mui/x-charts';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Frame from 'docs/src/components/action/Frame';
import ROUTES from 'docs/src/route';

export default function XChartsDemo() {
  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo sx={{ p: 2, flexGrow: 1 }}>
        <Paper
          variant="outlined"
          sx={[
            {
              '& > div': {
                borderRadius: 1,
                bgcolor: '#fff',
              },
            },
            (theme) =>
              theme.applyDarkStyles({
                '& > div': {
                  bgcolor: 'primaryDark.900',
                },
              }),
          ]}
        >
          <Box sx={{ py: 2, px: 1 }}>
            <LineChart
              sx={{
                '& .MuiMarkElement-root': { display: 'none' },
                '& .MuiMarkElement-root.MuiMarkElement-highlighted': { display: 'block' },
              }}
              margin={{ top: 10, bottom: 50, left: 40, right: 20 }}
              series={[
                { data: [35, 44, 24, 34], stack: 'total', area: true },
                { data: [51, 32, 49, 30], stack: 'total', area: true },
                { data: [5, 31, 30, 50], stack: 'total', area: true },
                { data: [60, 50, 15, 10], stack: 'total', area: true },
              ]}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'point' }]}
              colors={mangoFusionPalette}
              height={200}
            />
            <BarChart
              sx={{
                '& .MuiMarkElement-root': { display: 'none' },
                '& .MuiMarkElement-root.MuiMarkElement-highlighted': { display: 'block' },
              }}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              height={180}
              colors={mangoFusionPalette}
            />
          </Box>
        </Paper>
      </Frame.Demo>
      <Frame.Info
        data-mui-color-scheme="dark"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
        }}
      >
        <div>
          <Chip variant="outlined" label="Stable component" color="success" size="small" />
          <Typography variant="body2" color="text.secondary" mt={1}>
            Production-ready <strong>Charts</strong> component, featuring bar, lines, pie, scatter,
            and more types of graphs.
          </Typography>
        </div>
        <Button
          component="a"
          variant="outlined"
          href={ROUTES.chartsOverview}
          endIcon={<ChevronRightRoundedIcon />}
          sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          Visit docs
        </Button>
      </Frame.Info>
    </Frame>
  );
}
