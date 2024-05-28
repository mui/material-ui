import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { gray } from '../themePrimitives';

const colorPaletteLight = [gray[700], gray[500], gray[300]];
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
          borderRadius={6}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
            },
          ]}
          series={[
            {
              id: 'page-views',
              label: 'Page views',
              data: [
                2234, 3872, 2998, 4125, 3357, 2789, 4412, 2005, 4829, 3147, 4361,
                2526,
              ],
              stack: 'A',
            },
            {
              id: 'downloads',
              label: 'Downloads',
              data: [
                3098, 4215, 2384, 2101, 4752, 3593, 2837, 4914, 2468, 3279, 4530,
                3782,
              ],
              stack: 'A',
            },
            {
              id: 'conversions',
              label: 'Conversions',
              data: [
                4051, 2275, 3129, 4693, 3904, 2038, 4315, 2641, 3482, 4976, 2803,
                3620,
              ],
              stack: 'A',
            },
          ]}
          height={320}
          margin={{ left: 50, right: 0, top: 60, bottom: 30 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              position: { vertical: 'top', horizontal: 'right' },
              itemMarkWidth: 10,
              itemMarkHeight: 10,
              itemGap: 24,
              labelStyle: { fontSize: 14 },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
