import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 0, label: "MUI System", value: 856 },
  { id: 1, label: "Styled components", value: 463 },
  { id: 2, label: "Emotion", value: 359 },
  { id: 3, label: "Vanilla CSS", value: 289 },
  { id: 4, label: "SASS", value: 251 },
  { id: 5, label: "CSS Modules", value: 231 },
  { id: 7, label: "Tailwind CSS", value: 223 },
  { id: 8, label: "JSS (legacy makeStyles, withStyles)", value: 197 },
  { id: 9, label: "Other", value: 27 }
];

export default function WhatStylingSolutions() {
  return <BasePercentageHorizontalBar data={data} total={1074} />;
}
