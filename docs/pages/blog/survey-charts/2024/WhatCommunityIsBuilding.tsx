import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 1, label: "Enterprise product, e.g. ERPs, CRMs", value: 855 },
  { id: 2, label: "User-facing dashboard for a SaaS", value: 795 },
  { id: 3, label: "Internal tool (simple admin app)", value: 676 },
  { id: 4, label: "Landing/marketing pages", value: 407 },
  { id: 5, label: "Design system", value: 373 },
  {
    id: 6,
    label: "Data analysis/data treatment applications",
    value: 369
  },
  { id: 7, label: "Mobile app", value: 323 },
  { id: 8, label: "Others", value: 134 }
];

const totalAnswers = 1899;

export default function WhatCommunityIsBuilding() {
  return <BasePercentageHorizontalBar total={totalAnswers} data={data} />;
}
