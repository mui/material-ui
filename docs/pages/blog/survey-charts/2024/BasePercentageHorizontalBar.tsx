import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
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

function XBar(props) {
  const data = props.data;
  const dataY = data.map((d) => d.label);
  const dataX = data.map((d) => `${d.value}%`);

  return (
    <Box sx={{ width: '100%' }}>
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
      margin={{ top: 5, right: 10, bottom: 50, left: 200 }}
      yAxis={[{ scaleType: "band", data: dataY, tickPlacement: 'middle' }]}
      series={[{ type: 'bar', data: dataX }]}
      height={400}
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
    </Box>
  );
}


export default function BasePercentageHorizontalBar(props) {
  const { data, total } = props;

  const dataWithPercentage = data.map((d) => ({
    ...d,
    value: ((d.value / total) * 100).toFixed(2),
    originalValue: d.value
  }));

  return <XBar data={dataWithPercentage} />;
}
