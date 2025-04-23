import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';

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
  values: number;
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
  legend?: Object;
  height?: number;
}) {
  const { data, barProperties } = props;
  const dataX = data.map((d) => d.label);
  const series = barProperties.map((p) => {
    const barPropertyData = data.map((d) => {
      const propName = p.property;
      return d[propName];
    });
    return { data: barPropertyData, label: p.label, stack: 'stack' };
  });

  const margin = props.margin || { top: 5, right: 10, bottom: 125, left: 200 };
  const height = props.height || 500;

  const legend = props.legend
    ? props.legend
    : {
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
      };

  // console.log("series", series);
  return (
    <Box sx={{ width: '100%' }}>
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
    </Box>
  );
}
