import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';

// function roundToNearest(num) {
//   if (num < 7) return 5;

//   return 10;
// }

// function generateTickValues(maxValue, tickSize = 10) {
//   let tickValues = [];
//   const roundedTickSize = roundToNearest(tickSize);
//   let maxValueRoundedUp =
//     Math.ceil(maxValue / roundedTickSize) * roundedTickSize;

//   for (let i = 0; i < maxValue; i += roundedTickSize) {
//     tickValues.push(i);
//   }
//   tickValues.push(maxValueRoundedUp);

//   return tickValues;
// }

interface DataItem {
  label: string;
  value: number;
}

interface ExtendedDataItem extends DataItem {
  originalValue: number;
  total: number;
}

function XBar(props: { data: ExtendedDataItem[]; margin?: Object; height?: number }) {
  const data = props.data;
  const dataY = data.map((d) => d.label);
  const dataX = data.map((d) => d.value);

  const TOTAL = props.data.length > 0 ? props.data[0].total : 0;

  const margin = props.margin || { top: 5, right: 10, bottom: 80, left: 200 };
  const height = props.height || 400;

  return (
    <Box sx={{ width: '100%', position: 'relative', textAlign: 'center' }}>
      {/* <Box sx={{
  ' .MuiChartsAxis-tickLabel': {
    maxWidth: 200,
    fill: 'purple',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
}}> */}
      <BarChart
        margin={margin}
        height={height}
        yAxis={[{ scaleType: 'band', data: dataY, tickPlacement: 'middle' }]}
        series={[{ type: 'bar', data: dataX, valueFormatter: (value) => `${value}%` }]}
        layout="horizontal"

        // slotProps={{
        //   legend: {
        //     sx: {
        //       overflowX: 'scroll',
        //       flexWrap: 'nowrap',
        //       height: '100%',
        //     },
        //   },
        // }}
        // sx={{
        //   '& .MuiChartsAxis-tickLabel': {
        //     whiteSpace: 'wrap',
        //     fill: 'purple',
        //     overflow: 'hidden',
        //     textOverflow: 'ellipsis',
        //     maxWidth: '80px', // Adjust the max width as needed
        //   },
        //   '& .MuiChartsAxis-root': {

        //     backgroundColor: 'red',
        //    // Adjust the max width as needed
        //   },
        // }}
      />
      {/* </Box> */}
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

export default function BasePercentageHorizontalBar(props: { data: DataItem[]; total: number }) {
  const { data, total } = props;

  const dataWithPercentage = data.map((d) => ({
    ...d,
    value: parseFloat(((d.value / total) * 100).toFixed(2)),
    originalValue: d.value,
    total: props.total,
  }));

  return <XBar data={dataWithPercentage} />;
}
