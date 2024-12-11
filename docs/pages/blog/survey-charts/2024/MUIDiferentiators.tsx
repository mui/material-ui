import * as React from "react";
import BaseStackedHorizontalBar from "./BaseStackedHorizontalBar";

const data = [
  {
    id: 0,
    label: "I can easily create UIs that look and feel great",
    stronglyDisagree: 1,
    disagree: 2.01,
    neutral: 9.02,
    agree: 44.48,
    stronglyAgree: 43.48
  },
  {
    id: 1,
    label: "I find most of the components I need",
    stronglyDisagree: 0.73,
    disagree: 2.73,
    neutral: 10.2,
    agree: 52.64,
    stronglyAgree: 33.7
  },
  {
    id: 2,
    label:
      "I can easily customize the components to match the desired design and behavior",
    stronglyDisagree: 2.36,
    disagree: 8.45,
    neutral: 21.53,
    agree: 45.41,
    stronglyAgree: 22.25
  },
  {
    id: 3,
    label: "I find the answers to most of my questions in the docs",
    stronglyDisagree: 1.19,
    disagree: 5.2,
    neutral: 14.95,
    agree: 52.96,
    stronglyAgree: 25.71
  },
  {
    id: 4,
    label: "The libraries performance are great",
    stronglyDisagree: 2.1,
    disagree: 6.11,
    neutral: 25.0,
    agree: 45.62,
    stronglyAgree: 21.17
  },
  {
    id: 5,
    label:
      "Whenever I need help, I can find helpful responses (Stack Overflow or GitHub)",
    stronglyDisagree: 1.09,
    disagree: 4.65,
    neutral: 23.27,
    agree: 47.26,
    stronglyAgree: 23.72
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

export default function MUIDiferentiators() {
  return (
    <BaseStackedHorizontalBar
      data={data}
      barProperties={barProperties}
      yAxisWidth={180}
    />
  );
}
