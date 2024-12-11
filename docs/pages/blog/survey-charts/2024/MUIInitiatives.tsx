import * as React from "react";
import BaseStackedHorizontalBar from "./BaseStackedHorizontalBar";

const data = [
  {
    id: 0,
    label: "I'm excited to see new Design Systems proposals like Joy UI",
    stronglyDisagree: 2.96,
    disagree: 6.01,
    neutral: 41.22,
    agree: 29.48,
    stronglyAgree: 20.33
  },
  {
    id: 1,
    label: 'I\'d like to update my components to "Material You" desgin ASAP',
    stronglyDisagree: 5.96,
    disagree: 11.74,
    neutral: 51.26,
    agree: 16.12,
    stronglyAgree: 14.91
  },
  {
    id: 2,
    label: "I wish I could purchase paid technical support for Core libraries",
    stronglyDisagree: 17.64,
    disagree: 24.79,
    neutral: 43.64,
    agree: 10.77,
    stronglyAgree: 3.16
  },
  {
    id: 3,
    label: "I wish MUI had a community chat server, e.g. discord",
    stronglyDisagree: 6.1,
    disagree: 12.01,
    neutral: 41.5,
    agree: 23.01,
    stronglyAgree: 17.38
  },
  {
    id: 4,
    label: "I like using kitchen sink examples",
    stronglyDisagree: 2.37,
    disagree: 6.24,
    neutral: 44.18,
    agree: 32.36,
    stronglyAgree: 14.87
  }
];

const barProperties = [
  {
    property: "stronglyDisagree",
    label: "Strongly Disagree",
    colorIndex: 10
  },
  {
    property: "disagree",
    label: "Disagree",
    colorIndex: 2
  },
  {
    property: "neutral",
    label: "Neutral",
    colorIndex: 4
  },
  {
    property: "agree",
    label: "Agree",
    colorIndex: 7
  },
  {
    property: "stronglyAgree",
    label: "Strongly Agree",
    colorIndex: 1
  }
];

export default function MUIInitiatives() {
  return (
    <BaseStackedHorizontalBar
      data={data}
      barProperties={barProperties}
      yAxisWidth={160}
    />
  );
}
