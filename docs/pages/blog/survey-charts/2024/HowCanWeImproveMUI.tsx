import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";
const data = [
  { id: 1, label: "More components", value: 89 },
  { id: 2, label: "Improve docs", value: 53 },
  { id: 3, label: "More examples", value: 50 },
  { id: 4, label: "More customization", value: 50 },
  { id: 5, label: "Improve theming/styling", value: 41 },
  { id: 6, label: "More features", value: 24 },
  { id: 7, label: "Performance", value: 23 },
  { id: 8, label: "Bundle size", value: 20 },
  { id: 9, label: "Improve pricing", value: 14 },
  { id: 10, label: "Improve dx", value: 14 },
  { id: 11, label: "Charts", value: 13 },
  { id: 12, label: "Improve datagrid", value: 12 },
  { id: 13, label: "Theming/style docs", value: 12 },
  { id: 14, label: "Keep up with material spec.", value: 12 },
  { id: 15, label: "Improve typescript support", value: 11 },
  { id: 16, label: "More tutorials / articles", value: 11 },
  { id: 17, label: "Improve date pickers", value: 11 },
  { id: 18, label: "Improve markup", value: 11 },
  { id: 19, label: "Improve design", value: 10 },
  { id: 20, label: "More in-depth documentation", value: 9 },
  { id: 21, label: "Pain with migration", value: 9 },
  { id: 22, label: "More designs", value: 9 },
  { id: 23, label: "Joy ui", value: 8 },
  { id: 24, label: "Improve ssr support", value: 8 },
  { id: 25, label: "Improve tailwind support", value: 8 }
  /*{ id: 26, label: "Product communication", value: 8 },
  {
    id: 27,
    label: "Integration with other ecosystems (vue/svelte/etc)",
    value: 8
  },
  { id: 28, label: "Fix bugs", value: 7 },
  { id: 29, label: "Better integration with the ecosystem", value: 7 },
  { id: 30, label: "Accessibility", value: 6 },
  { id: 31, label: "Less emotion", value: 5 },
  { id: 32, label: "Dont stop updating", value: 5 },
  { id: 33, label: "File upload", value: 5 },
  { id: 34, label: "More advanced components", value: 5 },
  { id: 35, label: "More templates", value: 5 },
  { id: 36, label: "Scheduler", value: 5 },
  { id: 37, label: "More tutorial / articles", value: 5 },
  { id: 38, label: "React native support", value: 4 },
  { id: 39, label: "More icons", value: 4 },
  { id: 40, label: "Carousel", value: 4 },
  { id: 41, label: "Better sync with figma design kit", value: 4 },
  { id: 42, label: "Improve mui base", value: 4 },
  { id: 43, label: "Treeview", value: 3 },
  { id: 44, label: "More unstyled", value: 3 },
  { id: 45, label: "Rich text editor", value: 3 },
  { id: 46, label: "Date time range picker", value: 3 },
  { id: 47, label: "More animations", value: 3 },
  { id: 48, label: "Dragndrop", value: 2 },
  { id: 49, label: "Numeric input", value: 2 },
  { id: 50, label: "Serverside integration", value: 2 },
  { id: 51, label: "Responsive", value: 2 },
  { id: 52, label: "Color picker", value: 2 },
  { id: 53, label: "No code/low code tool", value: 2 },
  { id: 54, label: "Integrate css vars", value: 2 },
  { id: 55, label: "Better support for designers", value: 2 },
  { id: 56, label: "Mobile support", value: 2 },
  { id: 57, label: "Date range pickers", value: 2 },
  { id: 58, label: "Time picker", value: 2 },
  { id: 59, label: "More tools", value: 2 },
  { id: 60, label: "More headless", value: 2 },
  { id: 61, label: "Stronger community", value: 2 },
  { id: 62, label: "Chat", value: 1 },
  { id: 63, label: "More dx consistency", value: 1 },
  { id: 64, label: "Improve ux", value: 1 },
  { id: 65, label: "Make testing easier", value: 1 },
  { id: 66, label: "Nested menu", value: 1 },
  { id: 67, label: "Nested stepper", value: 1 },
  { id: 68, label: "Localization", value: 1 },
  { id: 69, label: "Layout", value: 1 },
  { id: 70, label: "More component", value: 1 },
  { id: 71, label: "Loadingbutton", value: 1 },
  { id: 72, label: "Timeline", value: 1 },
  { id: 73, label: "Textarea", value: 1 },
  { id: 74, label: "Aspectratio", value: 1 },
  { id: 75, label: "Dashboard", value: 1 },
  { id: 76, label: "Card slider", value: 1 },
  { id: 77, label: "Month pickers", value: 1 },
  { id: 78, label: "Image gallery", value: 1 },
  { id: 79, label: "Rtl support", value: 1 },
  { id: 80, label: "Long term support", value: 1 },
  { id: 81, label: "Improved typescript support", value: 1 },
  { id: 82, label: "Input fields", value: 1 },
  { id: 83, label: "More themes out-of-the-box", value: 1 }*/
];

export default function HowCanWeImproveMUI() {
  return (
    <BasePercentageHorizontalBar
      total={716}
      yAxisWidth={140}
      height={1000}
      minLabelValue={1.4}
      data={data}
    />
  );
}
