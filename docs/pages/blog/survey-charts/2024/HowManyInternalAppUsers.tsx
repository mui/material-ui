import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 0, label: "1-5", value: 185 },
  { id: 3, label: "21-100", value: 138 },
  { id: 4, label: "501+", value: 130 },
  { id: 1, label: "6-10", value: 105 },
  { id: 2, label: "11-20", value: 85 },
  { id: 5, label: "101-500", value: 81 }
];

export default function HowManyInternalAppUsers() {
  return (
    <BasePercentageHorizontalBar yAxisWidth={80} data={data} total={724} />
  );
}
