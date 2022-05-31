import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
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
