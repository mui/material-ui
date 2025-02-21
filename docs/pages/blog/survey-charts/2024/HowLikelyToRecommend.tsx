import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 0, label: "Detractors (0-6)", value: 132 },
  { id: 1, label: "Passives  (7-8)", value: 435 },
  { id: 2, label: "Promoters (9-10)", value: 600 }
];

export default function HowLikelyToRecommend() {
  return (
    <BasePercentageHorizontalBar
      yAxisWidth={80}
      height={300}
      data={data}
      total={1167}
    />
  );
}
