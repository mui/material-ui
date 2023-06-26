import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Frame from 'docs/src/components/action/Frame';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { mangoFusionPalette } from '@mui/x-charts';

export default function XChartsDemo() {
  return (
    <Frame>
      <Frame.Demo sx={{ p: 2 }}>
        <Paper
          variant="outlined"
          sx={[
            {
              '& > div': {
                borderRadius: 1,
                bgcolor: '#fff',
              },
              '& > div > div > div > div': {
                flexGrow: 1,
              },
              '& .MuiTypography-subtitle1': {
                fontSize: '0.875rem',
              },
              '& .MuiTypography-caption': {
                width: 28,
                height: 32,
              },
              '& .MuiPickersSlideTransition-root': {
                minWidth: 258,
                minHeight: 238,
              },
              '& [role="row"]': {
                margin: '4px 0',
              },
              '& .MuiDateRangePickerDay-root': {
                lineHeight: 0,
                margin: 0,
              },
              '& .MuiPickersDay-root': {
                width: 28,
                height: 28,
                fontWeight: 400,
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
        </Paper>
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
            🎯&nbsp;&nbsp;&nbsp;Alpha version available now for your project!
          </Typography>
          <Button
            variant="outlined"
            href="/x/react-charts/"
            component="a"
            sx={{ mt: { xs: 2, sm: 0 }, color: 'primary.300' }}
          >
            View more demos
          </Button>
        </Box>
      </Frame.Info>
    </Frame>
  );
}
