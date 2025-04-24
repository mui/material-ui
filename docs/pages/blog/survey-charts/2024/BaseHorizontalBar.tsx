import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

function XBar(props: { data: DataItem[]; margin?: Object; height?: number; total?: number }) {
  const data = props.data;
  const dataX = data.map((d) => d.label);
  const dataY = data.map((d) => d.value);

  const TOTAL = props.total;
  const margin = props.margin || { top: 5, right: 10, bottom: 80, left: 200 };
  const height = props.height || 400;
  return (
    <Box sx={{ width: '100%', position: 'relative', textAlign: 'center' }}>
      <BarChart
        yAxis={[{ scaleType: 'band', data: dataX, tickPlacement: 'middle' }]}
        series={[{ data: dataY }]}
        height={height}
        margin={margin}
        layout="horizontal"
      />
      <Box sx={{ position: 'absolute', bottom: 10, width: '100%', fontSize: 14 }}>
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

export default function BaseHorizontalBar(props: { data: DataItem[]; total?: number }) {
  const { data, total } = props;
  return <XBar data={data} total={total} />;
}
