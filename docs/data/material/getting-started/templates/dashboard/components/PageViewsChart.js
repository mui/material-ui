import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';

const colorPaletteLight = ['#3399FF', '#516b9f'];
const colorPalette = (mode) =>
  mode === 'dark' ? colorPaletteLight : colorPaletteLight;

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function getDaysInMonth(month, year) {
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
  const data = getDaysInMonth(4, 2024);
  const color = colorPalette(theme.palette.mode);
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Page views and downloads
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
              id: 'page-views',
              label: 'Page views',
              showMark: false,
              data: [
                5000, 10000, 7000, 10000, 13000, 12000, 9000, 7000, 5000, 10000,
                7000, 8000, 13000, 16000, 19000, 13000, 17000, 15000, 18000, 14500,
                10000, 12000, 15000, 18000, 19000, 12000, 21000, 17000, 22000, 20000,
              ],
              area: true,
            },
            {
              id: 'downloads',
              label: 'Downloads',
              showMark: false,
              data: [
                2000, 8000, 3000, 9000, 10000, 18000, 10000, 9000, 2000, 14000,
                11000, 6000, 11000, 13000, 23000, 17000, 19000, 17000, 14000, 12000,
                11000, 14000, 18000, 19000, 22000, 15000, 23000, 20000, 18000, 19000,
              ],
            },
          ]}
          height={320}
          margin={{ left: 50, right: 0, top: 60, bottom: 30 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-page-views': {
              fill: "url('#page-views')",
            },
          }}
          slotProps={{
            legend: {
              labelStyle: { fontSize: 14 },
              itemMarkWidth: 12,
              itemMarkHeight: 12,
              position: { vertical: 'top', horizontal: 'right' },
            },
          }}
        >
          <AreaGradient color={color[0]} id="page-views" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
