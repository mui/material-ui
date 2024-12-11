import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 0, label: "My company", value: 1243 },
  { id: 1, label: "A client of my company", value: 533 },
  { id: 2, label: "My hobby/side project", value: 507 },
  { id: 3, label: "My client", value: 332 },
  { id: 4, label: "Others", value: 35 }
];
const total = 1896;

export default function WhoCommunityBuildsFor() {
  return <BasePercentageHorizontalBar total={total} data={data} />;
}
