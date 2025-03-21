import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";
import BasePie from "./BasePie";

const data = [
  { id: 0, label: "51-200", value: 175 },
  { id: 1, label: "21-50", value: 130 },
  { id: 2, label: "11-20", value: 118 },
  { id: 3, label: "2-5", value: 113 },
  { id: 4, label: "6-10", value: 100 },
  { id: 5, label: "It's a Hobby / Side Project", value: 86 },
  { id: 7, label: "201-500", value: 80 },
  { id: 8, label: "10000+", value: 64 },
  { id: 9, label: "Self-employed", value: 63 },
  { id: 10, label: "501-1000", value: 51 },
  { id: 10, label: "1001-3000", value: 47 },
  { id: 10, label: "3001-10000", value: 41 }
];

export default function HowManyEmployeesTotal() {
  return (
    <BasePercentageHorizontalBar yAxisWidth={90} data={data} total={1069} />
  );
}
