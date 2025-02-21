import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 17, label: "United States", value: 257 },
  { id: 7, label: "India", value: 80 },
  { id: 6, label: "Germany", value: 73 },
  { id: 21, label: "Eastern Europe", value: 56 },
  { id: 2, label: "Canada", value: 50 },
  { id: 16, label: "United Kingdom", value: 50 },
  { id: 5, label: "France", value: 48 },
  { id: 19, label: "Asia", value: 48 },
  { id: 22, label: "Northern Europe", value: 41 },
  { id: 0, label: "Australia", value: 27 },
  { id: 25, label: "South America", value: 31 }
  /*{ id: 31, label: "Others", value: 129 }
  { id: 10, label: "Italy", value: 26 },
  { id: 12, label: "Netherlands", value: 25 },
  { id: 1, label: "Belgium", value: 7 },
  { id: 3, label: "China", value: 5 },
  { id: 4, label: "Finland", value: 12 },
  { id: 8, label: "Ireland", value: 2 },
  { id: 9, label: "Israel", value: 13 },
  { id: 11, label: "Japan", value: 12 },
  { id: 13, label: "Portugal", value: 12 },
  { id: 14, label: "South Korea", value: 5 },
  { id: 15, label: "Spain", value: 17 },
  { id: 18, label: "Africa", value: 19 },
  { id: 20, label: "Central America", value: 2 },
  { id: 23, label: "Middle East", value: 9 },
  { id: 24, label: "Oceania", value: 1 },*/
];

export default function WhereAreCompaniesBased() {
  return (
    <BasePercentageHorizontalBar yAxisWidth={85} total={1068} data={data} />
  );
}
