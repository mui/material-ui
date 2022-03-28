import React from "react";
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  test: {
    backgroundColor: "purple",
    color: "white"
  }
});

const useStyles2 = makeStyles()((_theme, _params, classes) => ({
  test: {
    backgroundColor: "purple",
    color: "white",
    [`& .${classes.test2}`]: {
      backgroundColor: "lime",
      color: "blue"
    }
  },
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
