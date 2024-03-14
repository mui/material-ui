import React from "react";
import { makeStyles } from "@material-ui/core/styles";

/*
Sandboxes for verifying correct behavior:
JSS - https://codesandbox.io/p/sandbox/case1-jss-dedp2f?file=/src/App.js
TSS - https://codesandbox.io/p/sandbox/case1-tss-s0z7tx?file=/src/App.js
 */

const useStyles = makeStyles({
  test: {
    backgroundColor: "purple",
    color: "white"
  }
}, { name: "TestName" });

const useStyles2 = makeStyles(() => ({
  test2: {
    backgroundColor: "blue",
    color: "lime"
  }
}));

function InnerComponent() {
  const classes = useStyles2();
  return <div className={classes.test2}>Inner Test</div>;
}
export default function ComponentUsingStyles(props) {
  const classes = useStyles();
  return <div className={classes.test}>Test<InnerComponent/></div>;
}
