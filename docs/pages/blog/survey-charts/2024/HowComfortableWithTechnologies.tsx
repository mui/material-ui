import * as React from "react";
import BaseStackedHorizontalBar from "./BaseStackedHorizontalBar";

const data = [
  {
    id: 0,
    label: "Javascript",
    intimidated: 1.67,
    understandBasics: 4.46,
    jobGetsDone: 18.22,
    advanced: 75.65
  },
  {
    id: 1,
    label: "React",
    intimidated: 2.42,
    understandBasics: 6.42,
    jobGetsDone: 19.18,
    advanced: 71.97
  },
  {
    id: 2,
    label: "CSS",
    intimidated: 2.24,
    understandBasics: 13.35,
    jobGetsDone: 26.8,
    advanced: 57.61
  },
  {
    id: 3,
    label: "MUI libraries",
    intimidated: 2.05,
    understandBasics: 11.08,
    jobGetsDone: 31.19,
    advanced: 55.68
  }
];

const barProperties = [
  {
    property: "intimidated",
    label: "I feel intimidated",
    colorIndex: 2
  },
  {
    property: "understandBasics",
    label: "I understand the basics",
    colorIndex: 4
  },
  {
    property: "jobGetsDone",
    label: "The Job gets done, but it's often a mystery",
    colorIndex: 0
  },
  {
    property: "advanced",
    label: "I'm comfortable with Advanced concepts",
    colorIndex: 1
  }
];

export default function HowComfortableWithTechnologies() {
  return <BaseStackedHorizontalBar data={data} barProperties={barProperties} />;
}
