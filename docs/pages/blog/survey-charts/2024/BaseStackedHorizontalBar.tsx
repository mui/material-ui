import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import type { ChartsLegendProps } from '@mui/x-charts/ChartsLegend';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// function generateTickValues(maxValue) {
//   let maxValueRoundedUp = Math.floor(maxValue / 10) * 10;
//   let tickValues = [];

//   for (let i = 0; i <= maxValueRoundedUp; i += 10) {
//     tickValues.push(i);
//   }

//   return tickValues;
// }

interface DataItem {
  id: number;
  label: string;
  // values: Record<string, number>;
  // values: number;
  // These keys represent the different segments of the stacked bar
  // and should match the 'property' field in BarPropertyItem
  // neverHeardOfIt?: number;
  // heardOfItAndNotInterested?: number;
  // heardOfItAndLikeToTry?: number;
  // usedItAndWouldUseAgain?: number;
  // usedItAndWouldNotUseAgain?: number;
  // Allow any other string key for flexibility, though the ones above are expected
  [key: string]: number | string | undefined;
}

interface BarPropertyItem {
  property: keyof Omit<DataItem, 'id' | 'label'>;
  label: string;
  colorIndex: number;
}

export default function BaseStackedHorizontalBar(props: {
  data: DataItem[];
  barProperties: BarPropertyItem[];
  margin?: Object;
  legend?: Partial<ChartsLegendProps>;
  height?: number;
  total: number;
}) {
  const { data, barProperties } = props;
  const dataX = data.map((d) => d.label);
  const series = barProperties.map((p) => {
    const barPropertyData = data.map((d) => {
      const value = d[p.property];
      // Ensure the value is a number or null, default to null if undefined or not a number
      return typeof value === 'number' ? value : null;
    });
    return { data: barPropertyData, label: p.label, stack: 'stack' };
  });

  const TOTAL = props.total;
  const margin = props.margin || { top: 5, right: 10, bottom: 125, left: 200 };
  const height = props.height || 500;

  const legend = props.legend
    ? props.legend
    : ({
        direction: 'row',
        position: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        labelStyle: {
          fontSize: 14,
          fill: 'black',
          fontWeight: 'light',
        },
      } as Partial<ChartsLegendProps>);

  // console.log("series", series);
  return (
    <Box sx={{ width: '100%', position: 'relative', textAlign: 'center' }}>
      <BarChart
        yAxis={[{ scaleType: 'band', data: dataX, tickPlacement: 'middle' }]}
        series={series}
        height={height}
        layout="horizontal"
        margin={margin}
        slotProps={{
          legend: { ...legend },
        }}
      />
      <Box sx={{ position: 'absolute', bottom: -20, width: '100%', fontSize: 14 }}>
        <Typography
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(13),
            marginTop: 8,
            textAlign: 'center',
            color: (theme.vars || theme).palette.grey[700],
            '& a': {
              color: 'inherit',
              textDecoration: 'underline',
            },
          })}
        >
          {TOTAL} respondents.
        </Typography>
      </Box>
    </Box>
  );
}
