import * as React from "react";
import BasePie from "./BasePie";

const data = [
  { id: 0, label: "1 developer", value: 252 },
  { id: 1, label: "2 developers", value: 207 },
  { id: 2, label: "3 developers", value: 197 },
  { id: 3, label: "4 developers", value: 129 },
  { id: 4, label: "5+ developers", value: 292 }
];

export default function HowManyFETeam() {
  return <BasePie data={data} />;
}
