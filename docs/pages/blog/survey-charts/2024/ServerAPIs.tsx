import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 0, label: "Rest", value: 696 },
  { id: 3, label: "GraphQL API", value: 229 },
  { id: 4, label: "Direct DB access", value: 115 },
  { id: 2, label: "Other (please specify)", value: 34 }
];

export default function ServerAPIs() {
  return (
    <BasePercentageHorizontalBar
      yAxisWidth={90}
      data={data}
      total={790}
      minLabelValue={5}
    />
  );
}
