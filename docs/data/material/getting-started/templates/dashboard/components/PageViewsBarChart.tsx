import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { gray } from '../theme/themePrimitives';

const colorPaletteLight = [gray[700], gray[500], gray[300]];
const colorPalette = (mode: 'light' | 'dark') =>
  mode === 'dark' ? colorPaletteLight : colorPaletteLight;

export default function PageViewsBarChart() {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Page views and downloads
        </Typography>
        <BarChart
          borderRadius={4}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: 'band',
                categoryGapRatio: 0.5,
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              },
            ] as any
          }
          series={[
            {
              id: 'page-views',
              label: 'Page views',
              data: [2234, 3872, 2998, 4125, 3357, 2789],
              stack: 'A',
            },
            {
              id: 'downloads',
              label: 'Downloads',
              data: [3098, 4215, 2384, 2101, 4752, 3593],
              stack: 'A',
            },
            {
              id: 'conversions',
              label: 'Conversions',
              data: [4051, 2275, 3129, 4693, 3904, 2038],
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: -1, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
