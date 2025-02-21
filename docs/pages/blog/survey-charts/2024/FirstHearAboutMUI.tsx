import * as React from "react";
import BasePie from "./BasePie";

const data = [
  { id: 6, label: "Already used at my company", value: 643 },
  { id: 5, label: "Tutorial, e.g. on Youtube", value: 368 },
  { id: 3, label: "Organic search", value: 303 },
  { id: 4, label: "Word of mouth", value: 359 },
  { id: 2, label: "On a blog", value: 119 },
  { id: 1, label: "Social media", value: 89 },
  { id: 0, label: "Conference", value: 14 }
];

export default function FirstHearAboutMUI() {
  return <BasePie data={data} angle={130} />;
}
