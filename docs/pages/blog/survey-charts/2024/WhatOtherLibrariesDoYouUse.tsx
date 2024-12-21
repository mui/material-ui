import * as React from "react";
import BasePercentageHorizontalBar from "./BasePercentageHorizontalBar";

const otherLibraries = [
  { id: 1, label: "Bootstrap", value: 50 },
  { id: 2, label: "Tailwind", value: 43 },
  { id: 3, label: "Ant Design", value: 31 },
  { id: 4, label: "Chakra UI", value: 25 },
  { id: 5, label: "Mantine", value: 17 },
  { id: 6, label: "React Native frameworks", value: 10 },
  { id: 7, label: "Nivo", value: 6 },
  { id: 8, label: "Devextreme", value: 5 },
  { id: 9, label: "Vuetify", value: 4 },
  { id: 10, label: "In house solution", value: 4 }
  /*{ id:11, label:'Fluentui', value:4},
{ id:12, label:'Angular material', value:4},
{ id:13, label:'Radix ui', value:4},
{ id:14, label:'Formik', value:3},
{ id:15, label:'Headless-ui', value:3},
{ id:16, label:'Mapbox', value:3},
{ id:17, label:'Framer motion', value:3},
{ id:18, label:'Semanticui', value:3},
{ id:19, label:'React hook form', value:3},
{ id:20, label:'Material-table', value:2},
{ id:21, label:'Styled components', value:2},
{ id:22, label:'Ag grid', value:2},
{ id:23, label:'Prime (faces', value:2},
{ id:24, label:'Ng', value:2},
{ id:25, label:'React)', value:2},
{ id:26, label:'Baseweb', value:2},
{ id:27, label:'React-spring', value:2},
{ id:28, label:'Kendo react', value:2},
{ id:29, label:'Extjs', value:2},
{ id:30, label:'Visx', value:2},
{ id:31, label:'Materializecss', value:1},
{ id:32, label:'Dayjs', value:1},
{ id:33, label:'Xamarin forms', value:1},
{ id:34, label:'Wordpress', value:1},
{ id:35, label:'Bulma', value:1},
{ id:36, label:'Chart libraries', value:1},
{ id:37, label:'Sweetalert', value:1},
{ id:38, label:'Atlassian', value:1},
{ id:39, label:'Groomet', value:1},
{ id:40, label:'Theme-ui', value:1},
{ id:41, label:'Mantine ui', value:1},
{ id:42, label:'React-pdf', value:1},
{ id:43, label:'React-datepicker', value:1},
{ id:44, label:'Calcite', value:1},
{ id:45, label:'React-select', value:1},
{ id:46, label:'Mui x', value:1},
{ id:47, label:'Element-ui', value:1},
{ id:48, label:'Semantic ui', value:1},
{ id:49, label:'Bryntum', value:1},
{ id:50, label:'React-data-grid', value:1},
{ id:51, label:'Amplify', value:1},
{ id:52, label:'React dnd', value:1},
{ id:53, label:'Virtuoso', value:1},
{ id:54, label:'Element-plus', value:1},
{ id:55, label:'React query', value:1},
{ id:56, label:'React-charts', value:1},
{ id:57, label:'React-beautiful-dnd', value:1},
{ id:58, label:'Next ui', value:1},
{ id:59, label:'Headless ui', value:1},
{ id:60, label:'React-table', value:1},
{ id:61, label:'React native elements', value:1},
{ id:62, label:'Prime', value:1},*/
];

const strongestPoints = [
  { id: 1, label: "Customization", value: 26 },
  { id: 2, label: "Easy to use", value: 16 },
  { id: 3, label: "Large portfolio of components / features", value: 14 },
  { id: 4, label: "Good looking", value: 13 },
  { id: 5, label: "Charts", value: 6 },
  { id: 6, label: "Enterprise needs", value: 6 },
  { id: 7, label: "Performance", value: 5 },
  { id: 8, label: "Documentation", value: 4 },
  { id: 9, label: "Animation", value: 3 },
  { id: 10, label: "Good for forms", value: 2 }
  /*{ id: 11, label: "Audience is familiar", value: 2 },
  { id: 12, label: "Rich components", value: 2 },
  { id: 13, label: "Ux", value: 2 },
  { id: 14, label: "Fast development", value: 2 },
  { id: 15, label: "Consistency", value: 1 },
  { id: 16, label: "Extensible", value: 1 },
  { id: 17, label: "Bundle size", value: 1 },
  { id: 18, label: "Opt-in by default", value: 1 },
  { id: 19, label: "Large community", value: 1 },
  { id: 20, label: "Support", value: 1 },
  { id: 21, label: "Free", value: 1 },
  { id: 22, label: "Dx", value: 1 },
  { id: 23, label: "Open source", value: 1 }*/
];

const weakPoints = [
  { id: 1, label: "Customization", value: 19 },
  { id: 2, label: "Poor documentation", value: 16 },
  { id: 3, label: "Lacking features", value: 11 },
  { id: 4, label: "Poor looking", value: 7 },
  { id: 5, label: "Not modern", value: 7 },
  { id: 6, label: "High entry barrier", value: 4 },
  { id: 7, label: "Less answers on the internet", value: 4 },
  { id: 8, label: "Clutter code", value: 3 },
  { id: 9, label: "Expensive to maintain", value: 3 },
  { id: 10, label: "Bloated style", value: 3 }
  /*{ id: 11, label: "Css files", value: 3 },
  { id: 12, label: "Not great in react", value: 2 },
  { id: 13, label: "Standard looking", value: 2 },
  { id: 14, label: "Poor support", value: 2 },
  { id: 15, label: "Performance", value: 2 },
  { id: 16, label: "Accessibility", value: 1 },
  { id: 17, label: "Consistency", value: 1 },
  { id: 18, label: "Verbosity", value: 1 },
  { id: 19, label: "Hard to customize", value: 1 },
  { id: 20, label: "Architecture", value: 1 },
  { id: 21, label: "Typescript support", value: 1 },
  { id: 22, label: "Dx", value: 1 },
  { id: 23, label: "Missing updates", value: 1 },
  { id: 24, label: "Ux", value: 1 },
  { id: 25, label: "Friction on updates", value: 1 },
  { id: 26, label: "Documentation", value: 1 }*/
];

export default function WhatOtherLibrariesDoYouUse() {
  return (
    <React.Fragment>
      <BasePercentageHorizontalBar
        total={354}
        data={otherLibraries}
        minLabelValue={1.2}
        yAxisWidth={140}
      />
      <h2>Strongest points</h2>
      <BasePercentageHorizontalBar
        total={354}
        data={strongestPoints}
        minLabelValue={1}
        yAxisWidth={140}
      />
      <h2>Weak points</h2>
      <BasePercentageHorizontalBar
        total={354}
        data={weakPoints}
        minLabelValue={1}
        yAxisWidth={140}
      />
    </React.Fragment>
  );
}
