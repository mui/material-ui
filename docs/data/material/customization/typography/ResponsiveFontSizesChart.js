import * as React from 'react';
// import of a small, pure module in a private demo
// bundle size and module duplication is negligible
/* eslint-disable-next-line no-restricted-imports */
import { convertLength } from '@mui/material/styles/cssUtils';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  Legend,
  Tooltip,
  LineChart as RechartLineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import { LineChart } from '@mui/x-charts';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const colors = [
  '#443dc2',
  '#2060df',
  '#277e91',
  '#378153',
  '#4d811d',
  '#63780d',
  '#996600',
];
const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1'];

export default function ResponsiveFontSizesChart() {
  const convert = convertLength(theme.typography.htmlFontSize);
  const toPx = (rem) => parseFloat(convert(rem, 'px'));

  const series = variants.map((variantName) => {
    const variant = theme.typography[variantName];
    const data = [];

    data.push({
      viewport: 0,
      fontSize: toPx(variant.fontSize),
    });

    theme.breakpoints.keys.forEach((key) => {
      const viewport = theme.breakpoints.values[key];
      const value = theme.breakpoints.up(key);

      if (variant[value]) {
        data.push({
          viewport: viewport - 1,
          fontSize: data[data.length - 1].fontSize,
        });
        data.push({
          viewport,
          fontSize: toPx(variant[value].fontSize),
        });
      } else if (key === 'xl') {
        data.push({
          viewport,
          fontSize: data[data.length - 1].fontSize,
        });
      }
    });

    return {
      name: variantName,
      data,
    };
  });

  let dataset = theme.breakpoints.keys.map((key) => {
    const viewport = theme.breakpoints.values[key];
    const value = theme.breakpoints.up(key);

    const rep = { viewport };
    variants.forEach((variantName) => {
      const variant = theme.typography[variantName];
      if (variant[value]) {
        const fontSize = toPx(variant[value].fontSize);
        rep[variantName] = fontSize;
      } else if (viewport === 0) {
        const fontSize = toPx(variant.fontSize);
        rep[variantName] = fontSize;
      }
    });
    return rep;
  });

  dataset = [
    ...dataset.slice(0, dataset.length - 1),
    {
      ...dataset[dataset.length - 2],
      viewport: dataset[dataset.length - 1].viewport,

      subtitle1: dataset[0].subtitle1,
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ height: 380, width: '100%', color: 'black' }}>
        <LineChart
          dataset={dataset}
          series={variants.map((variantName) => ({
            curve: 'stepAfter',
            dataKey: variantName,
            label: variantName,
            connectNulls: true,
          }))}
          xAxis={[
            {
              scaleType: 'linear',
              dataKey: 'viewport',
              valueFormatter: (v) => v.toString(),
              tickNumber: 10,
              max: 1600,
              tickLabelStyle: { fontSize: 15 },
              label: 'viewport (px)',
            },
          ]}
          yAxis={[
            {
              valueFormatter: (v) => v.toString(),
              tickNumber: 5,
              min: 0,
              max: 100,
              tickLabelStyle: { fontSize: 15 },
              labelStyle: {
                fontSize: 15,
              },
              label: 'font-size (px)',
            },
          ]}
          colors={colors}
          margin={{ left: 70 }}
          sx={{
            [`.MuiChartsAxis-left .MuiChartsAxis-label`]: {
              transform: 'translateX(-5px)',
            },
            [`.MuiChartsAxis-bottom .MuiChartsAxis-label`]: {
              transform: 'translateY(5px)',
            },
            [`.MuiChartsAxis-root text`]: {
              fill: '#808080',
            },
            [`.MuiChartsAxis-root line`]: {
              stroke: '#808080',
            },
          }}
        />
      </Box>
      <Box sx={{ height: 380, width: '100%', color: 'black' }}>
        <ResponsiveContainer>
          <RechartLineChart
            margin={{
              top: 50,
              right: 140,
              bottom: 0,
              left: 30,
            }}
          >
            <XAxis dataKey="viewport" type="number">
              <Label position="right" offset={30}>
                viewport (px)
              </Label>
            </XAxis>
            <YAxis dataKey="fontSize" type="number">
              <Label position="top" offset={20}>
                font-size (px)
              </Label>
            </YAxis>
            <Tooltip />
            <Legend />
            {series.map((serie, index) => (
              <Line
                dataKey="fontSize"
                stroke={colors[index % colors.length]}
                data={serie.data}
                name={serie.name}
                key={serie.name}
              />
            ))}
          </RechartLineChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
}
