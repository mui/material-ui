import * as React from "react";
import BaseHorizontalBar from "./BaseHorizontalBar";

const data = [
  { id: 0, label: "Documentation quality", value: 6.43 },
  { id: 1, label: "The design - look and feel", value: 6.21 },
  { id: 2, label: "Customizability", value: 6.04 },
  { id: 0, label: "Comprehensiveness", value: 5.12 },
  { id: 1, label: "Runtime performance", value: 5.04 },
  { id: 2, label: "Popularity", value: 4.31 },
  { id: 0, label: "Accessibility", value: 4.01 },
  { id: 1, label: "Bundle size", value: 3.89 },
  { id: 2, label: "Offered support and help", value: 3.48 }
];

const total = 1151;

export default function MostImportantCriteriaToPickLibrary() {
  return <BaseHorizontalBar total={total} data={data} atypical />;
}
