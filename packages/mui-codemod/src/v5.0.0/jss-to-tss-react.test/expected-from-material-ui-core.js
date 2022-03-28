import React from "react";
import { makeStyles } from 'tss-react/mui';
import clsx from "clsx";

const useStyles = makeStyles()((_theme, _params, classes) => ({
  test: {
    backgroundColor: "purple",
    color: "white",
    [`&.${classes.qualifier}`]: {
      textDecoration: "underline"
    },
    [`&.${classes.qualifier}:hover`]: {
      backgroundColor: "red"
    },
    [`&.${classes.qualifier2}:not(:hover)`]: {
      fontWeight: 700
    },
  },
  qualifier: {},
  qualifier2: {}
}));

const useStyles2 = makeStyles()({
  test2: {
    backgroundColor: "blue",
    color: "lime"
  }
});

function InnerComponent() {
  const { classes } = useStyles2();
  return <div className={classes.test2}>Inner Test</div>;
}
export default function ComponentUsingStyles(props) {
  const { classes } = useStyles();
  return <>
    <div className={classes.test}>Test<InnerComponent/></div>
    <div className={clsx(classes.test, classes.qualifier)}>Qualifier Test</div>
    <div className={clsx(classes.test, classes.qualifier2)}>Qualifier 2 Test</div>
    </>;
}
