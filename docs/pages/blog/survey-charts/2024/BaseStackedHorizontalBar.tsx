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
  const { data } = props;
  const dataX = data.map((d) => d.label);
  const dataY = data.map((d) => d.value);

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: dataX }]}
      series={[{ data: dataY }]}
      width={500}
      height={500}
    />
  );
}
