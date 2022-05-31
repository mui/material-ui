import React from "react";
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  '@global': {
    '.sample': {
      backgroundColor: "purple",
      color: "white",
    }
}}));

export default function ComponentUsingStyles(props) {
  useStyles();
  return <div className="sample">Test</div>;
}
