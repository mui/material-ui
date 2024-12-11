import * as React from "react";
import BasePie from "./BasePie";

const data = [
  { id: 0, label: "MUI X", value: 466 },
  { id: 1, label: "No", value: 368 },
  { id: 2, label: "Mui X Pro", value: 202 },
  { id: 3, label: "Mui X Premium", value: 72 }
];

export default function UsingMUIX() {
  return <BasePie data={data} />;
}
