import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";
const mitData = [
  { id: 0, label: "Development speed", value: 65.02 },
  { id: 1, label: "Basic features (filtering and sorting)", value: 63.47 },
  { id: 2, label: "Pagination", value: 59.75 },
  { id: 3, label: "Design considentency with MUI components", value: 50.77 },
  { id: 7, label: "Quick display for large datasets", value: 48.92 },
  { id: 6, label: "Performance", value: 40.25 },
  { id: 7, label: "Docs with easy-to-copy examples", value: 39.63 },
  { id: 8, label: "Adaptable to your design", value: 32.2 },
  { id: 9, label: "Accessibility", value: 27.55 },
  { id: 10, label: "inline editing", value: 25.08 },
  { id: 12, label: "Others", value: 11.46 }
];

const commercialData = [
  { id: 0, label: "Development speed", value: 70.71 },
  {
    id: 1,
    label: "Column management (visibility, reordering, pinning)",
    value: 66.53
  },
  { id: 2, label: "Basic features (filtering and sorting)", value: 64.02 },
  { id: 3, label: "Design considentency with MUI components", value: 63.6 },
  { id: 4, label: "Pagination", value: 59.83 },
  { id: 5, label: "Advanced filtering", value: 59.41 },
  { id: 6, label: "Quick display for large datasets", value: 57.74 },
  { id: 7, label: "Performance", value: 46.44 },
  { id: 8, label: "Rows with custom actions", value: 46.03 },
  { id: 9, label: "Virtualization", value: 44.35 },
  { id: 10, label: "Excel export", value: 37.24 },
  { id: 11, label: "Docs with easy-to-copy examples", value: 34.31 },
  { id: 12, label: "inline editing", value: 33.89 },
  { id: 13, label: "Flexibility when customizing behavior", value: 33.05 },
  { id: 14, label: "State management", value: 31.38 },
  {
    id: 15,
    label: "Advanced data analysis (Row grouping and Aggregation)",
    value: 29.71
  },
  { id: 16, label: "Adaptable to your design", value: 22.18 },
  { id: 17, label: "Accessibility", value: 19.67 },
  { id: 18, label: "Others", value: 4.6 }
];

export default function BenefitsDataGrid() {
  return (
    <React.Fragment>
      <h2>MIT</h2>
      <BasePercentageHorizontalBar
        total={323}
        yAxisWidth={170}
        formattedData
        data={mitData}
      />
      <h2>Commercial</h2>
      <BasePercentageHorizontalBar
        total={239}
        yAxisWidth={170}
        data={commercialData}
        formattedData
        height={900}
      />
    </React.Fragment>
  );
}
