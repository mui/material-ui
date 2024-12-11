import * as React from "react";
import BasePie from "./BasePie";

const data = [
  { id: 0, label: "Very disappointed", value: 749 },
  { id: 1, label: "Somewhat disappointed", value: 327 },
  { id: 2, label: "Not disappointed", value: 87 }
];

export default function HowDisappointingWithoutMUI() {
  return <BasePie data={data} />;
}
