import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const mitData = [
  { id: 0, label: "I'm satisfied", value: 26 },
  { id: 1, label: "More features", value: 19 },
  { id: 2, label: "Pricing - Make it free", value: 15 },
  { id: 3, label: "More components", value: 12 },
  { id: 7, label: "Customization", value: 10 },
  { id: 6, label: "Improve Date pickers", value: 7 },
  { id: 7, label: "Documentation", value: 4 },
  { id: 8, label: "apiRef", value: 4 },
  { id: 9, label: "Polishment", value: 3 },
  { id: 10, label: "More examples or recipes", value: 3 },
  { id: 12, label: "Others", value: 12 }
];

const commercialData = [
  { id: 0, label: "More components", value: 20 },
  { id: 1, label: "Customization", value: 14 },
  { id: 2, label: "More examples or recipes", value: 13 },
  { id: 3, label: "More features", value: 13 },
  { id: 4, label: "Documentation", value: 9 },
  { id: 5, label: "Pricing", value: 8 },
  { id: 6, label: "Improve Date pickers", value: 5 },
  { id: 7, label: "Server-side integration", value: 5 },
  { id: 8, label: "Faster delivery", value: 4 },
  { id: 9, label: "Performance", value: 3 },
  { id: 10, label: "Precise roadmap", value: 3 },
  { id: 11, label: "Polishiment", value: 3 },
  { id: 12, label: "Others", value: 13 }
];

export default function HowCanWeImproveMUIX() {
  return (
    <React.Fragment>
      <h2>MIT</h2>
      <BasePercentageHorizontalBar total={152} data={mitData} />
      <h2>Commercial</h2>
      <BasePercentageHorizontalBar total={113} data={commercialData} />
    </React.Fragment>
  );
}
