import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";
const data = [
  { id: 1, label: "Fast development", value: 342 },
  { id: 2, label: "Design/Look and Feel", value: 248 },
  { id: 3, label: "Large portfolio of high quality components", value: 119 },
  { id: 4, label: "Customization", value: 96 },
  { id: 5, label: "Documentation", value: 84 },
  { id: 6, label: "Easy to use", value: 64 },
  { id: 7, label: "Design system", value: 48 },
  { id: 8, label: "Consistent dx", value: 40 },
  { id: 9, label: "Material design", value: 26 },
  { id: 10, label: "Accessibility", value: 26 },
  { id: 11, label: "Theming", value: 24 },
  { id: 12, label: "Community support", value: 21 },
  { id: 13, label: "Reliability", value: 21 },
  { id: 14, label: "Datagrid", value: 14 },
  { id: 15, label: "Integration with the ecosystem", value: 8 },
  { id: 16, label: "Open source", value: 7 },
  { id: 17, label: "Performance", value: 7 },
  { id: 18, label: "Advanced components", value: 6 },
  { id: 19, label: "Mui system", value: 5 },
  { id: 20, label: "SX prop", value: 3 }
  /*{ id: 21, label: "Typescript", value: 2 },
  { id: 24, label: "Server side rendering", value: 2 },
  { id: 25, label: "Integration with streamlit", value: 1 },
  { id: 26, label: "Autocomplete", value: 1 },
  { id: 27, label: "Slots", value: 1 },
  { id: 29, label: "Mobile first approach", value: 1 },
  { id: 30, label: "Templates", value: 1 },
  { id: 31, label: "Design kit (figma)", value: 1 },
  { id: 32, label: "Long term support", value: 1 },
  { id: 33, label: "Rtl support", value: 1 }*/
];

export default function BenefitsMUI() {
  return (
    <BasePercentageHorizontalBar
      total={826}
      yAxisWidth={140}
      height={800}
      minLabelValue={4}
      data={data}
    />
  );
}
