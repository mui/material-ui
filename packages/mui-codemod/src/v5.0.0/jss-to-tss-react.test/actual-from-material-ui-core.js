import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  test: {
    backgroundColor: "purple",
    color: "white",
    "&$qualifier": {
      textDecoration: "underline"
    },
    "&$qualifier$qualifier2": {
      fontStyle: "italic"
    },
    "&$qualifier2 .testStuffInBetween $qualifier": {
      color: "brown"
    },
    "&$qualifier:hover": {
      backgroundColor: "red"
    },
    "&$qualifier2:not(:hover)": {
      fontWeight: 700
    },
  },
  qualifier: {},
  qualifier2: {}
}));

const useStyles2 = makeStyles({
  test2: {
    backgroundColor: "blue",
    color: "lime"
  }
});

function InnerComponent() {
  const classes = useStyles2();
  return <div className={classes.test2}>Inner Test</div>;
}
export default function ComponentUsingStyles(props) {
  const classes = useStyles(props);
  return <>
    <div className={classes.test}>Test<InnerComponent/></div>
    <div className={clsx(classes.test, classes.qualifier)}>Qualifier Test</div>
    <div className={clsx(classes.test, classes.qualifier2)}>Qualifier 2 Test</div>
    <div className={clsx(classes.test, classes.qualifier, classes.qualifier2)}>Qualifier & Qualifier 2 Test</div>
    </>;
}
