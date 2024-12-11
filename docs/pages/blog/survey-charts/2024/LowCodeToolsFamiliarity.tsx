import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 1, label: "Never Heard of them > Would like to learn", value: 267 },
  { id: 2, label: "Never heard of them > Not interested", value: 221 },
  { id: 3, label: "Used them > Would not use again", value: 184 },
  { id: 4, label: "Used them > Would use again", value: 155 },
  { id: 5, label: "Never heard of them/Not sure what they are", value: 128 }
];

export default function LowCodeToolsFamiliarity() {
  return (
    <BasePercentageHorizontalBar yAxisWidth={140} total={955} data={data} />
  );
}
