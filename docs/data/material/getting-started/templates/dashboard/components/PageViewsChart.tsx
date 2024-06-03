import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

export default function PageViewsChart() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const data = getDaysInMonth(4, 2024);

  const colorPaletteLight = [
    theme.palette.grey[300],
    theme.palette.grey[400],
    theme.palette.grey[500],
  ];
  const colorPaletteDark = [
    theme.palette.grey[400],
    theme.palette.grey[500],
    theme.palette.grey[700],
  ];
  const colorPalette = mode === 'dark' ? colorPaletteDark : colorPaletteLight;

  return (
    <Card variant="outlined" sx={{ height: 400, width: '100%' }}>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Sessions
        </Typography>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
            },
          ]}
          series={[
            {
              id: 'organic',
              label: 'Organic',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: [
                6234, 6087, 6421, 6312, 6190, 6400, 6357, 6029, 6173, 6482, 6215,
                6051, 6338, 6142, 6018, 6247, 6463, 6371, 6060, 6100, 6389, 6203,
                6497, 6036, 6156, 6470, 6269, 6091, 6445, 6121,
              ],
              area: true,
            },
            {
              id: 'referral',
              label: 'Referral',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                4486, 4255, 4046, 4316, 4418, 4498, 4421, 4474, 4036, 4049, 4206,
                4458, 4259, 4353, 4496, 4178, 4265, 4424, 4186, 4003, 4204, 4467,
                4120, 4410, 4292, 4143, 4403, 4373, 4079, 4291,
              ],
            },
            {
              id: 'direct',
              label: 'Direct',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                2238, 2172, 2305, 2140, 2135, 2100, 2465, 2053, 2342, 2494, 2497,
                2277, 2356, 2012, 2309, 2301, 2029, 2028, 2129, 2324, 2152, 2235,
                2430, 2027, 2168, 2111, 2235, 2166, 2309, 2268,
              ],
            },
          ]}
          height={320}
          margin={{ left: 50, right: 0, top: 60, bottom: 30 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-organic': {
              fill: "url('#organic')",
            },
            '& .MuiAreaElement-series-referral': {
              fill: "url('#referral')",
            },
            '& .MuiAreaElement-series-direct': {
              fill: "url('#direct')",
            },
          }}
          slotProps={{
            legend: {
              labelStyle: { fontSize: 14 },
              itemMarkWidth: 10,
              itemMarkHeight: 10,
              itemGap: 24,
              position: { vertical: 'top', horizontal: 'right' },
            },
          }}
        >
          <AreaGradient
            color={
              mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[600]
            }
            id="organic"
          />
          <AreaGradient
            color={
              mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[600]
            }
            id="referral"
          />
          <AreaGradient
            color={
              mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
            }
            id="direct"
          />
        </LineChart>
      </CardContent>
    </Card>
  );
}
