import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';

const colorPaletteLight = ['#8f9ebc', '#394660'];
const colorPalette = (mode) =>
  mode === 'dark' ? colorPaletteLight : colorPaletteLight;

export default function PageViewsBarChart() {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Page views and downloads
        </Typography>
        <BarChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              data: Array.from({ length: 5 }, (_, i) => ` week ${i + 1}`),
            },
          ]}
          series={[
            {
              id: 'page-views',
              label: 'Page views',
              data: [7000, 10000, 8000, 11000, 13000],
            },
            {
              id: 'downloads',
              label: 'Downloads',
              data: [2000, 8000, 5000, 9000, 11000],
            },
          ]}
          height={320}
          margin={{ left: 50, right: 0, top: 60, bottom: 30 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              labelStyle: { fontSize: 14 },
              itemMarkWidth: 12,
              itemMarkHeight: 12,
              position: { vertical: 'top', horizontal: 'right' },
            },
            bar: {
              clipPath: `inset(0px round 8px 8px 0px 0px)`,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
