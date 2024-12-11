import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function roundToNearest(num) {
  if (num < 7) return 5;

  return 10;
}

function generateTickValues(maxValue, tickSize = 10) {
  let tickValues = [];
  const roundedTickSize = roundToNearest(tickSize);
  let maxValueRoundedUp =
    Math.ceil(maxValue / roundedTickSize) * roundedTickSize;

  for (let i = 0; i < maxValue; i += roundedTickSize) {
    tickValues.push(i);
  }
  tickValues.push(maxValueRoundedUp);

  return tickValues;
}

function XBar(props) {
  const data = props.data;
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


export default function BasePercentageHorizontalBar(props) {
  const { data, total } = props;

  const dataWithPercentage = data.map((d) => ({
    ...d,
    value: ((d.value / total) * 100).toFixed(2),
    originalValue: d.value
  }));

  return <XBar data={dataWithPercentage} />;
}
