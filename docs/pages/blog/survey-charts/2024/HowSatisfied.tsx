import * as React from "react";
import BaseStackedHorizontalBar from "./BaseStackedHorizontalBar";

const data = [
  {
    id: 0,
    label: "Material UI",
    neverHeardOfIt: 0.79,
    heardOfItAndNotInterested: 0.7,
    heardOfItAndLikeToTry: 4.55,
    usedItAndWouldUseAgain: 89.42,
    usedItAndWouldNotUseAgain: 4.5
  },
  {
    id: 1,
    label: "Joy UI",
    neverHeardOfIt: 41.8,
    heardOfItAndNotInterested: 16.84,
    heardOfItAndLikeToTry: 34.4,
    usedItAndWouldUseAgain: 6.06,
    usedItAndWouldNotUseAgain: 0.89
  },
  {
    id: 2,
    label: "MUI Base",
    neverHeardOfIt: 17.75,
    heardOfItAndNotInterested: 11.69,
    heardOfItAndLikeToTry: 22.39,
    usedItAndWouldUseAgain: 45.94,
    usedItAndWouldNotUseAgain: 2.23
  },
  {
    id: 3,
    label: "MUI X",
    neverHeardOfIt: 13.36,
    heardOfItAndNotInterested: 9.73,
    heardOfItAndLikeToTry: 25.22,
    usedItAndWouldUseAgain: 48.76,
    usedItAndWouldNotUseAgain: 2.92
  },
  {
    id: 4,
    label: "MUI Toolpad",
    neverHeardOfIt: 65.89,
    heardOfItAndNotInterested: 11.73,
    heardOfItAndLikeToTry: 17.99,
    usedItAndWouldUseAgain: 3.31,
    usedItAndWouldNotUseAgain: 1.07
  },
  {
    id: 5,
    label: "MUI System",
    neverHeardOfIt: 22.22,
    heardOfItAndNotInterested: 9.16,
    heardOfItAndLikeToTry: 18.04,
    usedItAndWouldUseAgain: 48.0,
    usedItAndWouldNotUseAgain: 2.58
  }
];

const barProperties = [
  {
    property: "neverHeardOfIt",
    label: "Never Heard of It",
    colorIndex: 10
  },
  {
    property: "heardOfItAndNotInterested",
    label: "Heard of It / Not interested",
    colorIndex: 2
  },
  {
    property: "heardOfItAndLikeToTry",
    label: "Heard of It / Would like to try",
    colorIndex: 4
  },
  {
    property: "usedItAndWouldUseAgain",
    label: "Used it and would use it again",
    colorIndex: 1
  },
  {
    property: "usedItAndWouldNotUseAgain",
    label: "Used it but would NOT use it again",
    colorIndex: 6
  }
];

export default function HowSatisfied() {
  return <BaseStackedHorizontalBar data={data} barProperties={barProperties} />;
}
