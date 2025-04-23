import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";

// function generateTickValues(maxValue) {
//   let maxValueRoundedUp = Math.ceil(maxValue / 10) * 10;
//   let tickValues = [];

//   for (let i = 0; i <= maxValueRoundedUp; i += 1) {
//     tickValues.push(i);
//   }

//   return tickValues;
// }

function XBar(props) {
  const data = props.data;
  const dataX = data.map((d) => d.label);
  const dataY = data.map((d) => d.value);
  return (
    <Box sx={{ width: '100%' }}>
    <BarChart
      yAxis={[{ scaleType: "band", data: dataX, tickPlacement: 'middle' }]}
      series={[{ data: dataY }]}
      height={400}
      margin={{ top: 5, right: 10, bottom: 50, left: 200 }}
      layout="horizontal"
    />
    </Box>
  );
}

export default function BaseHorizontalBar(props) {
  const { data } = props;
  return <XBar data={data} />;
}
