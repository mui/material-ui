import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  {
    id: 1,
    label: "I can import custom React components and JS libraries",
    value: 243
  },
  {
    id: 2,
    label: "I can export the code of the UI, to use it in production",
    value: 213
  },
  { id: 3, label: "Great technical documentation and support", value: 184 },
  {
    id: 4,
    label: "The created apps have an awesome look and feel",
    value: 174
  },
  { id: 5, label: "I can run the tool locally, on my machine", value: 171 },
  {
    id: 5,
    label:
      "I can embed the low-code interface built inside a larger pro-code app e.g. inside Next.js",
    value: 165
  },
  { id: 5, label: "I can self-host", value: 164 },
  {
    id: 5,
    label:
      "I can use configuration files/code as the source of truth for the app(rather than the UI)",
    value: 141
  },
  { id: 5, label: "I can use a cloud to not host the tool myself", value: 70 },
  { id: 5, label: "Others", value: 70 }
];

export default function MostImportantLowCodeTools() {
  return (
    <BasePercentageHorizontalBar
      yAxisWidth={200}
      total={467}
      height={600}
      data={data}
    />
  );
}
