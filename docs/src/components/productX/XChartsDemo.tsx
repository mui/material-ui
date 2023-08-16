import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { mangoFusionPalette } from '@mui/x-charts';
import Frame from 'docs/src/components/action/Frame';

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
          <Box sx={{ py: 1 }}>
            <LineChart
              sx={{
                '& .MuiMarkElement-root': { display: 'none' },
                '& .MuiMarkElement-root.MuiMarkElement-highlighted': { display: 'block' },
              }}
              margin={{ top: 10, bottom: 50, left: 40, right: 20 }}
              series={[
                { data: [35, 44, 24, 34], stack: 'total', area: true },
                { data: [51, 6, 49, 30], stack: 'total', area: true },
                { data: [5, 15, 30, 50], stack: 'total', area: true },
                { data: [60, 50, 15, 10], stack: 'total', area: true },
              ]}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'point' }]}
              colors={mangoFusionPalette}
              height={250}
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
              height={200}
              colors={mangoFusionPalette}
            />
          </Box>
        </Paper>
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1,
            mb: 0.5,
          }}
        >
          <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
            Experiment with Charts now!
          </Typography>
          <Chip
            variant="outlined"
            label="Alpha"
            color="warning"
            size="small"
            sx={(theme) => ({
              pb: 0.2,
              fontWeight: theme.typography.fontWeightSemiBold,
              color: (theme.vars || theme).palette.warning[300],
              borderColor: alpha(theme.palette.warning[300], 0.3),
              background: alpha(theme.palette.warning[800], 0.3),
            })}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Using D3.js for data manipulation and SVG for rendering, Charts are coming to MUI X!
        </Typography>
        <Button
          variant="outlined"
          href="/x/react-charts/"
          component="a"
          sx={{ mt: { xs: 2, sm: 0 }, color: 'primary.300' }}
        >
          View the documentation
        </Button>
      </Frame.Info>
    </Frame>
  );
}
