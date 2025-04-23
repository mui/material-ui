import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';

// function generateTickValues(maxValue) {
//   let maxValueRoundedUp = Math.ceil(maxValue / 10) * 10;
//   let tickValues = [];

//   for (let i = 0; i <= maxValueRoundedUp; i += 1) {
//     tickValues.push(i);
//   }

//   return tickValues;
// }

interface DataItem {
  label: string;
  value: number;
}

function XBar(props: { data: DataItem[]; margin?: Object; height?: number }) {
  const data = props.data;
  const dataX = data.map((d) => d.label);
  const dataY = data.map((d) => d.value);

  const margin = props.margin || { top: 5, right: 10, bottom: 50, left: 200 };
  const height = props.height || 400;
  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        yAxis={[{ scaleType: 'band', data: dataX, tickPlacement: 'middle' }]}
        series={[{ data: dataY }]}
        height={height}
        margin={margin}
        layout="horizontal"
      />
    </Box>
  );
}

export default function BaseHorizontalBar(props: { data: DataItem[]; total?: number }) {
  const { data } = props;
  return <XBar data={data} />;
}
