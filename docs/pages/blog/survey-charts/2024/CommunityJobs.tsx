import * as React from "react";
import BasePie from "./BasePie";

const data = [
  { id: 0, label: "Full-stack Developer", value: 788 },
  { id: 1, label: "Front-end Developer", value: 651 },
  { id: 2, label: "Entrepreneur (I do it all!)", value: 155 },
  { id: 3, label: "Learning web development", value: 83 },
  { id: 4, label: "Engineering Manager", value: 62 },
  { id: 5, label: "Others", value: 60 },
  { id: 6, label: "Designer", value: 45 },
  { id: 7, label: "Product Manager", value: 33 },
  { id: 8, label: "Back-end Developer", value: 30 }
];

export default function CommunityJobs() {
  return <BasePie data={data} angle={160} />;
}
