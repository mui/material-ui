import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 0, label: "1-5", value: 464 },
  { id: 1, label: "6-10", value: 95 },
  { id: 2, label: "0", value: 88 },
  { id: 3, label: "21+", value: 84 },
  { id: 4, label: "11-20", value: 44 }
];

export default function HowManyInternalApps() {
  return (
    <BasePercentageHorizontalBar yAxisWidth={80} data={data} total={775} />
  );
}
