import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 0, label: "1-5 developers", value: 522 },
  { id: 1, label: "6-10 developers", value: 167 },
  { id: 2, label: "11-20 developers", value: 116 },
  { id: 3, label: "21-50 developers", value: 96 },
  { id: 4, label: "51-100 developers", value: 62 },
  { id: 5, label: "100-300 developers", value: 62 },
  { id: 6, label: "301+ developers", value: 44 }
];

export default function HowManyFECompany() {
  return (
    <BasePercentageHorizontalBar yAxisWidth={130} data={data} total={1069} />
  );
}
