import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function generateTickValues(maxValue) {
  let maxValueRoundedUp = Math.ceil(maxValue / 10) * 10;
  let tickValues = [];

  for (let i = 0; i <= maxValueRoundedUp; i += 10) {
    tickValues.push(i);
  }

  return tickValues;
}

export default function BaseStackedHorizontalBar(props) {
  const { data, barProperties } = props;
  const dataX = data.map((d) => d.label);
  const series = barProperties.map((p) => {
    const barPropertyData = data.map((d)=>{
      const propName = p.property
      return { data: d[propName], label: p.label, stack: d.label }
    });
  });
  
  console.log("series", series);
  return (
    <BarChart
      yAxis={[{ scaleType: "band", data: dataX }]}
      series={series}
      width={500}
      height={500}
      layout="horizontal"
    />
  );
}
