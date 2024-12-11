import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";
const data = [
  { id: 1, label: "Pricing", value: 32 },
  { id: 2, label: "Wont pay", value: 21 },
  { id: 3, label: "Im satisfied", value: 8 },
  { id: 4, label: "No purchase influence", value: 7 },
  { id: 5, label: "More features", value: 5 },
  { id: 6, label: "Will purchase already", value: 5 },
  { id: 7, label: "Customization: style", value: 4 },
  { id: 8, label: "More components", value: 4 },
  { id: 9, label: "Customization: Behavior", value: 3 },
  { id: 10, label: "More components: charts", value: 3 },
  { id: 11, label: "More features: pivoting", value: 3 },
  { id: 12, label: "Polishment", value: 3 },
  { id: 13, label: "More examples or recipes", value: 2 },
  { id: 14, label: "Learning content", value: 2 },
  { id: 15, label: "Procurement", value: 2 }
  /*{ id: 16, label: "Customization", value: 2 },
  { id: 17, label: "Documentation", value: 2 },
  { id: 18, label: "More features: data exports", value: 2 },
  { id: 19, label: "Headless api", value: 1 },
  { id: 20, label: "Mobile support", value: 1 },
  { id: 21, label: "Server-side integration", value: 1 },
  { id: 22, label: "Filtering ux", value: 1 },
  { id: 23, label: "Tools: streamline static site generation", value: 1 },
  { id: 24, label: "Easy migration", value: 1 },
  { id: 25, label: "Strong typing", value: 1 }*/
];

export default function WhatChallengesMakeYouConsiderCommercialLicense() {
  return (
    <BasePercentageHorizontalBar
      total={124}
      yAxisWidth={130}
      minLabelValue={3}
      data={data}
      height={600}
    />
  );
}
