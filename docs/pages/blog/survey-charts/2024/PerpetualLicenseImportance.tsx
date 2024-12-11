import * as React from "react";
import BasePie from "./BasePie";

const data = [
  { id: 0, label: "Yes", value: 339 },
  { id: 1, label: "No", value: 97 }
];

export default function PerpetualLicenseImportance() {
  return (
    <BasePie
      margin={{ right: 120, left: 120, bottom: 10, top: -80 }}
      data={data}
    />
  );
}
