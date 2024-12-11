import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const data = [
  { id: 0, label: "Retool", value: 25 },
  { id: 1, label: "Webflow", value: 20 },
  { id: 2, label: "Wordpress", value: 15 },
  { id: 3, label: "Microsoft Power apps", value: 14 },
  { id: 4, label: "Wix", value: 13 },
  { id: 5, label: "Bubble", value: 11 },
  { id: 6, label: "MUI Toolpad", value: 7 },
  { id: 7, label: "Framer", value: 6 },
  { id: 8, label: "Mendix", value: 6 },
  { id: 9, label: "Airtable", value: 5 },
  { id: 10, label: "Elementor", value: 5 },
  { id: 11, label: "AWS Studio or Step fn.", value: 5 },
  { id: 12, label: "Appsmith", value: 4 },
  { id: 13, label: "Zapier", value: 4 },
  { id: 14, label: "Figma", value: 4 },
  { id: 15, label: "Outsystem", value: 4 },
  { id: 16, label: "Notion", value: 3 },
  { id: 17, label: "React admin", value: 3 },
  { id: 18, label: "Scratch", value: 3 },
  { id: 19, label: "Squarespace", value: 3 }
];
const total = 160;

export default function LowCodeToolsNames() {
  return <BasePercentageHorizontalBar total={total} data={data} />;
}
