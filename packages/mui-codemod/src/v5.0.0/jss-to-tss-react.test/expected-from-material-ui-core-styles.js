import React from "react";
import { makeStyles } from 'tss-react/mui';

/*
Sandboxes for verifying correct behavior:
JSS - https://codesandbox.io/p/sandbox/case1-jss-dedp2f?file=/src/App.js
TSS - https://codesandbox.io/p/sandbox/case1-tss-s0z7tx?file=/src/App.js
 */

const useStyles = makeStyles({ name: "TestName" })({
  test: {
    backgroundColor: "purple",
    color: "white"
  }
});

const useStyles2 = makeStyles()(() => ({
  test2: {
    backgroundColor: "blue",
    color: "lime"
  }
}));

function InnerComponent() {
  const { classes } = useStyles2();
  return <div className={classes.test2}>Inner Test</div>;
}
export default function ComponentUsingStyles(props) {
  const { classes } = useStyles();
  return <div className={classes.test}>Test<InnerComponent/></div>;
}
