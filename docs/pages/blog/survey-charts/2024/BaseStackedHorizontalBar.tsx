import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";

// function generateTickValues(maxValue) {
//   let maxValueRoundedUp = Math.floor(maxValue / 10) * 10;
//   let tickValues = [];

//   for (let i = 0; i <= maxValueRoundedUp; i += 10) {
//     tickValues.push(i);
//   }

//   return tickValues;
// }

export default function BaseStackedHorizontalBar(props) {
  const { data, barProperties } = props;
  const dataX = data.map((d) => d.label);
  const series = barProperties.map((p) => {
    const barPropertyData = data.map((d)=>{
      const propName = p.property
      return d[propName]; 
    });
      return { data: barPropertyData, label: p.label, stack: 'stack' }
    
  });
  
  console.log("series", series);
  return (
    <Box sx={{ width: '100%' }}>
    <BarChart
      yAxis={[{ scaleType: "band", data: dataX, tickPlacement: 'middle' }]}
      series={series}
      height={500}
      layout="horizontal"
      margin={{ top: 5, right: 10, bottom: 125, left: 200 }}
      slotProps={{
        legend: {
          direction: "row",
        position: {
          vertical: "bottom",
          horizontal: "right",
        },
        labelStyle: {
              fontSize: 14,
              fill: 'black',
              fontWeight: 'light',
            },
          },
      }}
    />
    </Box>
  );
}
