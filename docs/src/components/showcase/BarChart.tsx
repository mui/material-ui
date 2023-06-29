import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography } from '@mui/material';

export default function BarChartDemo() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography fontWeight={500} sx={{ mb: 1 }}>
        Yearly results
      </Typography>
      <BarChart
        height={150}
        xAxis={[
          { scaleType: 'band', data: [2018, 2019, 2020, 2021, 2022], valueFormatter: (v) => v },
        ]}
        series={[
          {
            label: 'Sales revenue',
            data: [136.82, 161.86, 182.53, 257.64, 282.84],
            valueFormatter: (v) => `${v} Md`,
          },
          {
            label: 'Net profit',
            data: [30.74, 34.34, 40.27, 76.03, 59.97],
            valueFormatter: (v) => `${v} Md`,
          },
        ]}
        margin={{ top: 10, right: 10, left: 30, bottom: 30 }}
      />
    </Box>
  );
}
